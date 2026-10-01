#!/usr/bin/env python3
"""Builds build/guide.html: Kim's interactive guide as one ordinary web page.

The Design canvas caps an artboard at 8,000px, which cuts the guide off. This
turns the canvas source (design/Main.dc.html) into a normal, self-contained
page: the template markup is kept, the repeated parts are rendered by a small
script that runs the canvas's own Component logic, and every image is inlined.

    python3 scripts/web_guide.py
"""
import base64
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "design" / "Main.dc.html"
OUT = ROOT / "build" / "guide.html"

# Canvas asset ids -> the same images in this folder.
BLOBS = {
    "c97d0860831df4317d0c7f6b8061a238": "design/kim-portrait.jpg",
    "6321b7c8adba797a0a3fc884b8fd3ce4": "design/kim-camera.jpg",
    "120bf95a274fb74f6446b15674059c29": "design/kim-tiktok.jpg",
    "3f8cc67ffb0a1c415bd7f1c678476f26": "design/kim-instagram.jpg",
    "a15841a2c9166c4bda4b1ea507a91412": "logo-deep.png",
    "64e84cdf7a3b0d4b78e72b51870019a3": "photos/kim-cover.jpg",
    "9a723bef4600e7b96987b3afa1d37330": "photos/ig-glasses-orange.jpg",
    "f2508d7e232904f0004671889625615f": "photos/tile-becoming.jpg",
    "6a2c2880b9a9820995c09b142f7fbfbb": "photos/tile-lifestyle.jpg",
    "7935665658415133cd6f69db40e2183e": "photos/tile-style.jpg",
    "23e36b1602198eb0d68f931fa3c5ec5b": "photos/kim-close.jpg",
}

src = SRC.read_text()
style = re.search(r"<helmet>.*?<style>(.*?)</style>", src, re.S).group(1)
body = src.split("</helmet>", 1)[1].split("</x-dc>", 1)[0]
body = re.sub(r"<helmet>.*?</helmet>", "", body, flags=re.S)  # stray font links from editing
logic = re.search(r'<script type="text/x-dc" data-dc-script[^>]*>(.*?)</script>', src, re.S).group(1)


def cut_scfor(text, marker, replacement):
    """Replace the <sc-for> block that starts at marker, nested blocks included."""
    start = text.index(marker)
    depth, i = 0, start
    while True:
        o = text.find("<sc-for", i)
        c = text.find("</sc-for>", i)
        if o != -1 and o < c:
            depth += 1
            i = o + 7
        else:
            depth -= 1
            i = c + len("</sc-for>")
            if depth == 0:
                return text[:start] + replacement + text[i:]


def swap(text, old, new):
    assert text.count(old) == 1, f"expected one match: {old[:70]}"
    return text.replace(old, new)


body = cut_scfor(body, '<sc-for list="{{toc}}"', "")
body = swap(body, '<nav aria-label="Contents"', '<nav id="toc" aria-label="Contents"')
body = cut_scfor(body, '<sc-for list="{{pillars}}"', "")
body = swap(body, '<div class="auto" style="--min: 440px; --gap: 20px">', '<div id="pillars" class="auto" style="--min: 440px; --gap: 20px">')
body = cut_scfor(body, '<sc-for list="{{cal}}"', '<div id="cal-rows"></div>')
body = cut_scfor(body, '<sc-for list="{{topics}}"', "")
body = swap(body, '<ol style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 340px), 1fr)); column-gap: 48px">',
            '<ol id="topics" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 340px), 1fr)); column-gap: 48px">')
body = cut_scfor(body, '<sc-for list="{{review}}"', "")
body = swap(body, '<ul>\n\n</ul>', '<ul id="review"></ul>') if '<ul>\n\n</ul>' in body else swap(body, '<ul>\n</ul>', '<ul id="review"></ul>')
body = cut_scfor(body, '<sc-for list="{{steps}}"', "")
body = swap(body, '<div class="auto" style="--min: 250px; --gap: 16px">', '<div id="steps" class="auto" style="--min: 250px; --gap: 16px">')

# The four-week plan: everything after its lead paragraph is rendered by script.
s08 = re.search(r'<section id="s08".*?</section>', body, re.S).group(0)
lead_end = s08.index("</p>", s08.index('<p class="lead">')) + 4
wrap_end = s08.rindex("</div>", 0, s08.rindex("</section>"))
body = body.replace(s08, s08[:lead_end] + '\n<div id="plan" style="display: contents"></div>\n' + s08[wrap_end:])

body = swap(body, '<b style="color: #4A2C37">{{doneCore}}</b>', '<b style="color: #4A2C37" data-done>0</b>')
body = re.sub(r' value="\{\{f(Start|End)\}\}" onChange="\{\{set(Start|End)\}\}"', "", body)
body = body.replace("{{accent}}", "#9B524D")
left = re.findall(r"\{\{[^}]*\}\}", body)
assert not left, f"unconverted holes: {left[:5]}"


def data_uri(rel):
    f = ROOT / rel
    mime = "image/png" if f.suffix == ".png" else "image/jpeg"
    return f"data:{mime};base64," + base64.b64encode(f.read_bytes()).decode()


RENDER = r"""
class DCLogic {
  constructor(props) { this.props = props; this.state = {}; }
  setState(patch) { Object.assign(this.state, patch); render(); }
}
__LOGIC__
var comp = null, vals = null;
var CHECK = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5L20 7"></path></svg>';
function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function $(id) { return document.getElementById(id); }

function renderStatic() {
  $('toc').innerHTML = vals.toc.map(function (t) {
    return '<a class="toc-a" href="' + t.href + '"><span class="toc-n" style="font: 400 34px/1 \'Instrument Serif\', serif; color: var(--rose-deep)">' + t.n + '</span><span style="display: flex; flex-direction: column; gap: 3px; min-width: 0"><span class="h3 toc-t" style="font-size: 18px">' + esc(t.title) + '</span><span class="p" style="font-size: 14.5px; line-height: 1.5">' + esc(t.desc) + '</span></span></a>';
  }).join('');

  $('pillars').innerHTML = vals.pillars.map(function (p) {
    var media = p.img
      ? '<figure style="flex: none; display: flex; flex-direction: column; gap: 6px"><img src="' + p.img + '" alt="' + esc(p.alt) + '" style="width: 112px; height: auto; aspect-ratio: 298 / 396; border-radius: 4px"><figcaption class="label" style="font-size: 10.5px; color: #8C7E83">Your TikTok</figcaption></figure>'
      : '<figure style="flex: none; display: flex; flex-direction: column; gap: 6px"><div style="width: 112px; height: 149px; border-radius: 4px; background: #4A2C37; color: #FBF3EF; padding: 12px; display: flex; flex-direction: column; justify-content: space-between"><span class="label" style="font-size: 10.5px; color: #E9B9AF">Week 2 · Friday</span><span style="font: 400 20px/1.1 \'Instrument Serif\', serif">Your first safety video</span></div><figcaption class="label" style="font-size: 10.5px; color: #8C7E83">Coming up</figcaption></figure>';
    var subs = p.subs.map(function (s) { return '<li class="chip"><span class="dot" style="background: ' + p.c + '"></span>' + esc(s) + '</li>'; }).join('');
    var note = p.note ? '<p style="font-size: 14.5px; line-height: 1.5; color: #675A5F; background: #F2EBE3; padding: 10px 14px; border-radius: 4px">' + esc(p.note) + '</p>' : '';
    return '<article class="card" style="padding: clamp(22px,3vw,30px); display: flex; flex-direction: column; gap: 18px; border-top: 4px solid ' + p.c + '"><div style="display: flex; gap: 22px; align-items: flex-start">' + media +
      '<div style="display: flex; flex-direction: column; gap: 6px; min-width: 0"><span style="font: 400 48px/.85 \'Instrument Serif\', serif; color: ' + p.c + '">' + p.n + '</span><h3 class="sub" style="margin-top: 6px">' + esc(p.name) + '</h3><p class="p" style="font-size: 16px; line-height: 1.5">' + esc(p.purpose) + '</p></div></div>' +
      '<ul style="display: flex; flex-wrap: wrap; gap: 8px">' + subs + '</ul>' + note + '</article>';
  }).join('');

  function ev(e, core) {
    var k = core ? '<span class="kk">Core</span>' : '<span class="kk" style="' + e.kStyle + '">Optional</span>';
    var sm = e.styleMoment ? '<span style="font: 600 12px/1.25 \'Inter\', sans-serif; background: rgba(255,255,255,.18); border-radius: 4px; padding: 4px 6px; align-self: flex-start">+ Style moment</span>' : '';
    var ct = core ? '<span class="ct">' + e.cat + '</span>' : '<span class="ct" style="' + e.kStyle + '">' + e.kind + '</span>';
    return '<div><div class="ev" style="' + e.style + '">' + k + '<span class="ti">' + esc(e.short) + '</span>' + sm + ct + '</div></div>';
  }
  var open = '<div><div class="open"><b style="font: 600 12.5px/1.2 \'Inter\', sans-serif; color: #675A5F">Open</b><span style="font: 500 12px/1.3 \'Inter\', sans-serif; color: #8F8286">Film, edit, or rest</span></div></div>';
  $('cal-rows').outerHTML = vals.cal.map(function (r) {
    return '<div class="cal-grid cal-row"><div style="background: #FCFAF8; padding: 16px 12px"><b style="display: block; font: 600 12px/1.2 \'Inter\', sans-serif; letter-spacing: .08em; text-transform: uppercase; color: #8C7E83">Week ' + r.n + '</b><span style="display: block; font: italic 400 21px/1.1 \'Instrument Serif\', serif; color: #4A2C37; margin-top: 8px">' + esc(r.theme) + '</span></div>' +
      ev(r.mon, true) + open + ev(r.wed, true) + ev(r.thu, false) + ev(r.fri, true) + ev(r.sat, false) + open + '</div>';
  }).join('');

  $('topics').innerHTML = vals.topics.map(function (t) {
    return '<li style="display: grid; grid-template-columns: 46px 1fr; gap: 8px; padding: 14px 0; border-top: 1px solid #DCC4BB; font-size: 16.5px"><span style="font: 400 26px/1 \'Instrument Serif\', serif; color: var(--rose-deep)">' + t.n + '</span><span>' + esc(t.t) + '</span></li>';
  }).join('');

  var fs = $('followers-start'), fe = $('followers-end');
  fs.value = vals.fStart; fe.value = vals.fEnd;
  fs.addEventListener('input', function (e) { vals.setStart(e); });
  fe.addEventListener('input', function (e) { vals.setEnd(e); });
}

function renderLive() {
  document.querySelectorAll('[data-done]').forEach(function (el) { el.textContent = vals.doneCore; });
  var wk = vals.wk;
  var tabs = vals.tabs.map(function (t, i) {
    return '<button class="tab" role="tab" aria-selected="' + t.selected + '" data-act="tab" data-i="' + i + '" style="' + t.style + '"><span class="label" style="display: block; font-size: 11px; color: inherit; opacity: .8">Week ' + t.n + '</span><span class="tab-name" style="display: block; font: 400 22px/1.12 \'Instrument Serif\', serif; margin-top: 6px">' + esc(t.name) + '</span><span style="display: block; font: 600 12px/1 \'Inter\', sans-serif; margin-top: 8px; opacity: .75">' + t.count + '/3 filmed</span></button>';
  }).join('');
  var cores = wk.core.map(function (c, i) {
    var items = c.items.map(function (li) { return '<li style="font-size: 15.5px; line-height: 1.42; padding: 7px 0 7px 18px; border-bottom: 1px solid #E7DCD4; position: relative"><span style="position: absolute; left: 0; top: 16px; width: 8px; height: 1.5px; background: ' + c.c + '"></span>' + esc(li) + '</li>'; }).join('');
    var sm = c.styleMoment ? '<p style="background: #F2EBE3; border-radius: 4px; padding: 10px 12px; font-size: 15px; line-height: 1.45"><b class="label" style="font-size: 11px; color: #80613F; display: block; margin-bottom: 2px">Style moment</b>' + esc(c.styleMoment) + '</p>' : '';
    return '<article class="card" style="padding: 22px 22px 20px; display: flex; flex-direction: column; gap: 12px; border-top: 4px solid ' + c.c + '">' +
      '<div style="display: flex; justify-content: space-between; align-items: center; gap: 10px; flex-wrap: wrap"><span style="font: 400 34px/1 \'Instrument Serif\', serif; color: #4A2C37">' + c.day + '</span><span style="display: flex; gap: 6px; align-items: center"><span class="pill" style="' + c.pillStyle + '">Core</span><span class="pill" style="background: #F2EBE3; color: ' + c.c + '">' + c.cat + '</span></span></div>' +
      '<span class="label" style="color: #8C7E83">Format · ' + esc(c.fmt) + '</span><h4 class="h3" style="font-size: 19px">' + esc(c.title) + '</h4>' +
      '<div><div class="label" style="font-size: 11px; margin-bottom: 6px">Open with</div><p class="quote" style="font-size: 20px">“' + esc(c.open) + '”</p></div>' +
      '<div><div class="label" style="font-size: 11px; color: ' + c.c + '">' + c.k + '</div><ul style="margin-top: 4px">' + items + '</ul></div>' + sm +
      '<p style="font-size: 15px; line-height: 1.5"><b class="label" style="font-size: 11px; margin-right: 6px">Invite</b>' + esc(c.ask) + '</p>' +
      '<div style="margin-top: auto; padding-top: 6px"><button class="btn-check" aria-pressed="' + c.done + '" data-act="core" data-i="' + i + '" style="' + c.btnStyle + '"><span class="box">' + (c.done ? CHECK : '') + '</span><span>' + c.btnLabel + '</span></button></div></article>';
  }).join('');
  var opts = wk.opt.map(function (x, i) {
    var note = x.note ? '<p class="p" style="font-size: 13.5px">' + esc(x.note) + '</p>' : '';
    return '<div style="display: flex; gap: 14px; align-items: center"><button class="box" aria-pressed="' + x.done + '" aria-label="' + esc(x.aria) + '" data-act="opt" data-i="' + i + '" style="' + x.boxStyle + '">' + (x.done ? CHECK : '') + '</button><div style="min-width: 0"><span class="label" style="font-size: 10.5px; color: ' + x.c + '">' + x.day + ' · ' + x.kind + '</span><p style="font: 600 16px/1.35 \'Inter\', sans-serif">' + esc(x.title) + '</p>' + note + '</div></div>';
  }).join('');
  $('plan').innerHTML =
    '<div style="display: flex; flex-direction: column; gap: 10px; max-width: 560px"><div style="display: flex; justify-content: space-between; align-items: baseline; gap: 16px"><span class="label">Month progress</span><span class="label" style="color: #675A5F">' + vals.doneCore + ' of 12 core videos filmed</span></div><div style="height: 6px; background: #EBD5CD; border-radius: 3px; overflow: hidden"><div style="' + vals.progressStyle + '"></div></div></div>' +
    '<div role="tablist" aria-label="Weeks" style="display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); border: 1px solid #E7DCD4; border-radius: 6px; overflow: hidden; background: #F2EBE3">' + tabs + '</div>' +
    '<div role="tabpanel" style="display: flex; flex-direction: column; gap: 20px">' +
      '<div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-end; gap: 12px 32px; padding-top: 4px"><div><h3 style="font: 400 clamp(36px,4.8vw,60px)/1.02 \'Instrument Serif\', serif; color: #4A2C37">' + wk.theme + ' <em style="color: var(--rose-deep)">' + wk.em + '</em></h3><p class="p" style="font-size: 16.5px; margin-top: 8px; max-width: 52ch">' + esc(wk.intent) + '</p></div><div style="display: flex; gap: 8px"><span class="pill" style="background: #4A2C37; color: #fff; padding: 8px 10px">3 core posts</span><span class="pill" style="border: 1.5px dashed #C98E86; color: var(--rose-deep); padding: 8px 10px">2 optional</span></div></div>' +
      '<div class="auto" style="--min: 310px; --gap: 18px">' + cores + '</div>' +
      '<div style="border: 1.5px dashed #C98E86; border-radius: 6px; padding: 18px 22px; display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr)); gap: 16px 28px; align-items: center; background: #fff"><div><span class="label">Optional extras</span><p class="p" style="font-size: 14.5px">If you have the footage and the energy.</p></div>' + opts + '</div>' +
    '</div>';

  $('review').innerHTML = vals.review.map(function (r, i) {
    var note = r.note ? '<span class="p" style="font-size: 15px">' + esc(r.note) + '</span>' : '';
    return '<li style="border-top: 1px solid #DCC4BB"><button aria-pressed="' + r.done + '" data-act="review" data-i="' + i + '" style="appearance: none; background: none; border: 0; color: inherit; font: inherit; text-align: left; cursor: pointer; width: 100%; display: grid; grid-template-columns: 40px minmax(0, 1fr); gap: 16px; padding: 20px 0; align-items: start; min-height: 44px"><span class="box" style="' + r.boxStyle + '">' + (r.done ? CHECK : '') + '</span><span style="display: flex; flex-direction: column; gap: 4px"><span class="h3">' + esc(r.q) + '</span>' + note + '</span></button></li>';
  }).join('');

  $('steps').innerHTML = vals.steps.map(function (s, i) {
    return '<button aria-pressed="' + s.done + '" data-act="step" data-i="' + i + '" style="' + s.cardStyle + '"><span style="display: flex; justify-content: space-between; align-items: center"><span style="font: 400 54px/.9 \'Instrument Serif\', serif; color: var(--rose-deep)">' + s.n + '</span><span class="box" style="' + s.boxStyle + '">' + (s.done ? CHECK : '') + '</span></span><span class="h3" style="display: block; margin-top: 14px">' + esc(s.title) + '</span><span class="p" style="display: block; font-size: 15px; line-height: 1.5; margin-top: 8px">' + esc(s.desc) + '</span></button>';
  }).join('');
}

var booted = false;
function render() {
  if (!comp) return;
  vals = comp.renderVals();
  if (!booted) { renderStatic(); booted = true; }
  renderLive();
}

document.addEventListener('click', function (e) {
  var b = e.target.closest('[data-act]');
  if (!b || !vals) return;
  var i = +b.getAttribute('data-i'), act = b.getAttribute('data-act');
  if (act === 'tab') vals.tabs[i].pick();
  else if (act === 'core') vals.wk.core[i].toggle();
  else if (act === 'opt') vals.wk.opt[i].toggle();
  else if (act === 'review') vals.review[i].toggle();
  else if (act === 'step') vals.steps[i].toggle();
});

comp = new Component({});
render();
if (comp.componentDidMount) comp.componentDidMount();
"""

page = f"""<title>Becoming at 50+ · Kim LaShawn</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&amp;family=Inter:wght@400;500;600;700&amp;display=swap">
<style>{style}
html,body{{background:#FAF6F1;margin:0}}
</style>
{body}
<script>{RENDER.replace("__LOGIC__", logic)}</script>
"""
for blob, rel in BLOBS.items():
    page = page.replace(f"/_blob/{blob}", data_uri(rel))
assert "/_blob/" not in page, "an image was not inlined"
OUT.parent.mkdir(exist_ok=True)
OUT.write_text(page)
print(f"wrote {OUT.relative_to(ROOT)} ({len(page) // 1024}KB)")
