"""Render the Nectar end-card: hummingbird wings flutter, lettering stays still.

Outputs 1920x1080 @ 30fps:
  nectar-endcard-alpha.mov  ProRes 4444 with transparency (for editing timelines)
  nectar-endcard.mp4        H.264 on brand navy (for preview / direct use)
"""
import subprocess
import numpy as np
from PIL import Image
import imageio_ffmpeg
from masks import build, HINGE

W, H, FPS, DURATION = 1920, 1080, 30, 6.0
SUBFRAMES = 4                      # temporal supersampling -> light motion blur
BG = (4, 19, 51)                   # navy from the original lettering
OUT = '/home/user/Claude/output/'

# (start s, flap count, flap period s, amplitude 0-1)
BURSTS = [(0.6, 4, 0.26, 1.0), (3.4, 2, 0.26, 0.6)]
FOLD = 0.62                        # how far wings fold toward the body at full amplitude
SWEEP = 0.38                       # how far wing tips swing tailward on the downstroke
HOVER = 5.0                        # px the bird lifts while fluttering


def ease(x):
    x = min(max(x, 0.0), 1.0)
    return x * x * (3 - 2 * x)


def flap_state(t):
    """Return (flap 0..1, hover 0..1) at time t."""
    flap, hover = 0.0, 0.0
    for start, n, period, amp in BURSTS:
        length = n * period
        local = t - start
        if 0 <= local < length:
            phase = local / period * 2 * np.pi
            # soften the first and last flap so the burst eases in and out
            env = min(1.0, local / (0.6 * period), (length - local) / (0.6 * period))
            flap = amp * max(env, 0.0) * (1 - np.cos(phase)) / 2
        # lift rises with the burst and settles after it
        rise = ease((local + 0.1) / 0.35) - ease((local - length + 0.05) / 0.5)
        hover = max(hover, amp * rise)
    return flap, hover


def wing_matrix(flap):
    """Affine map that folds the wings about the hinge line (hinge stays fixed)."""
    (x0, y0), (x1, y1) = HINGE[1], HINGE[0]          # top -> tail direction
    d = np.array([x1 - x0, y1 - y0], float); d /= np.linalg.norm(d)
    n = np.array([-d[1], d[0]])                      # perpendicular
    s, k = 1 - FOLD * flap, SWEEP * flap
    # in hinge coords (u along d, v along n): u' = u + k v, v' = s v
    B = np.column_stack([d, n])
    A = B @ np.array([[1, k], [0, s]]) @ B.T
    o = np.array([x0, y0], float)
    M = np.eye(3); M[:2, :2] = A; M[:2, 2] = o - A @ o
    return M


def transform(layer, M):
    inv = np.linalg.inv(M)
    return layer.transform(layer.size, Image.AFFINE, tuple(inv[:2].ravel()),
                           resample=Image.BICUBIC)


def main():
    static, wings = build()
    static = Image.fromarray(static.astype(np.uint8))
    wings = Image.fromarray(wings.astype(np.uint8))
    lw, lh = static.size
    ox, oy = (W - lw) // 2, (H - lh) // 2

    # Split the static layer so the lettering never moves while the bird hovers.
    s_np = np.array(static)
    body_np, text_np = s_np.copy(), s_np.copy()
    body_np[:, 300:, 3] = np.where(
        (np.arange(lw)[300:] < 400) & (np.arange(lh)[:, None] < 190), s_np[:, 300:, 3], 0)
    text_np[..., 3] -= body_np[..., 3]
    body, text = Image.fromarray(body_np), Image.fromarray(text_np)

    ff = imageio_ffmpeg.get_ffmpeg_exe()
    raw = ['-f', 'rawvideo', '-pix_fmt', 'rgba', '-s', f'{W}x{H}', '-r', str(FPS), '-i', '-']
    mov = subprocess.Popen([ff, '-y', '-loglevel', 'error', *raw, '-c:v', 'prores_ks',
                            '-profile:v', '4444', '-pix_fmt', 'yuva444p10le',
                            OUT + 'nectar-endcard-alpha.mov'], stdin=subprocess.PIPE)
    mp4 = subprocess.Popen([ff, '-y', '-loglevel', 'error', *raw, '-c:v', 'libx264',
                            '-crf', '16', '-preset', 'slow', '-pix_fmt', 'yuv420p',
                            '-movflags', '+faststart', OUT + 'nectar-endcard.mp4'],
                           stdin=subprocess.PIPE)
    navy = np.zeros((H, W, 3), np.float32); navy[:] = BG

    for f in range(int(DURATION * FPS)):
        acc = np.zeros((H, W, 4), np.float32)          # premultiplied accumulation
        for sub in range(SUBFRAMES):
            t = (f + sub / SUBFRAMES) / FPS
            flap, hover = flap_state(t)
            dy = -HOVER * hover
            frame = Image.new('RGBA', (W, H))
            frame.alpha_composite(text, (ox, oy))
            bird = Image.new('RGBA', (lw, lh))
            bird.alpha_composite(body)
            bird.alpha_composite(transform(wings, wing_matrix(flap)))
            bird = bird.transform(bird.size, Image.AFFINE, (1, 0, 0, 0, 1, -dy),
                                  resample=Image.BICUBIC)
            frame.alpha_composite(bird, (ox, oy))
            px = np.asarray(frame, np.float32)
            a = px[..., 3:4] / 255
            acc[..., :3] += px[..., :3] * a
            acc[..., 3:4] += a
        acc /= SUBFRAMES
        alpha = acc[..., 3:4]
        rgb = np.where(alpha > 0, acc[..., :3] / np.maximum(alpha, 1e-6), 0)
        rgba = np.concatenate([rgb, alpha * 255], -1).clip(0, 255).astype(np.uint8)
        mov.stdin.write(rgba.tobytes())
        flat = (acc[..., :3] + navy * (1 - alpha)).clip(0, 255).astype(np.uint8)
        mp4.stdin.write(np.dstack([flat, np.full((H, W), 255, np.uint8)]).tobytes())

    for p in (mov, mp4):
        p.stdin.close(); p.wait()


if __name__ == '__main__':
    main()
