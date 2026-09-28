"""Split the Nectar bird into a static body layer and a movable wings layer."""
import numpy as np
from PIL import Image

LOGO = '/home/user/Claude/output/nectar-logo-white.png'

# Body centerline (source px): tail tip up the back to the head junction.
BODY_LINE = [(170, 412), (166, 300), (167, 240), (178, 205), (195, 166), (214, 136), (226, 121)]
# Back-wing stroke that crosses the body and ends right of it.
WING_TAIL = [(190, 160), (229, 204)]
# Shoulder hinge: the wings fold about this line, so their attachments stay put.
HINGE = ((168, 232), (216, 134))


def seg_dist(px, py, a, b):
    ax, ay = a; bx, by = b
    dx, dy = bx - ax, by - ay
    t = np.clip(((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy), 0, 1)
    return np.hypot(px - (ax + t * dx), py - (ay + t * dy))


def poly_dist(px, py, pts):
    return np.min([seg_dist(px, py, pts[i], pts[i + 1]) for i in range(len(pts) - 1)], axis=0)


def build():
    img = np.array(Image.open(LOGO)).astype(np.float32)
    h, w = img.shape[:2]
    py, px = np.mgrid[0:h, 0:w].astype(np.float32)
    bird = (px < 400) & (img[..., 3] > 0) & ~((px > 300) & (py > 190))  # exclude the "n"

    body = poly_dist(px, py, BODY_LINE) < 9
    # Signed side of the body line: wings sit left of it (interpolate line x at each y).
    ys = np.array([p[1] for p in BODY_LINE][::-1], np.float32)
    xs = np.array([p[0] for p in BODY_LINE][::-1], np.float32)
    line_x = np.interp(py, ys, xs)
    left = (px < line_x) & (py < 245)
    left |= (py <= 136) & (px < 219)
    tail = poly_dist(px, py, WING_TAIL) < 9

    wing = bird & (left | tail)
    wing_only = wing & ~body
    wings = img.copy(); wings[..., 3] *= wing_only
    static = img.copy(); static[..., 3] *= ~wing_only
    return static, wings


if __name__ == '__main__':
    static, wings = build()
    out = '/tmp/claude-0/-home-user-Claude/4b35297c-721c-5ea9-bca3-d7dd3057a2f2/'
    for name, layer in (('static', static), ('wings', wings)):
        im = Image.fromarray(layer.astype(np.uint8)).crop((0, 0, 420, 422))
        bg = Image.new('RGBA', im.size, (20, 24, 40, 255)); bg.alpha_composite(im)
        bg.convert('RGB').save(out + f'mask_{name}.png')
