#!/usr/bin/env python3
"""Fills the generated regions of kim-lashawn-first-30-days.html, the PDF deck.

The four weekly plans and the sixteen Rediscovering Her episodes live once, in
the script data of web/guide.html (the approved interactive page). This reads
them from there and writes the series tie-ins, the month-at-a-glance calendar
and the four week pages between the GEN markers in the deck, so the PDF, the
web page and the calendar cannot disagree. Everything outside the markers is
edited by hand in the deck itself.

    python3 scripts/build_deck.py && node scripts/render.mjs --pdf
"""
import html
import json
import pathlib
import re
import subprocess

ROOT = pathlib.Path(__file__).resolve().parent.parent
DECK = ROOT / "kim-lashawn-first-30-days.html"
WEB = ROOT / "web" / "guide.html"

FIRST_WEEK_PAGE = 10  # folio of the Week 1 page; the calendar is the page before
CATS = {
    "becoming": ("Becoming", "var(--p1)"),
    "lifestyle": ("Lifestyle", "var(--p2)"),
    "style": ("Style", "var(--p3)"),
    "safety": ("Safety", "var(--p4)"),
}
DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
WORDS = ["one", "two", "three", "four"]


def load_plan():
    """Evaluates the `weeks` and `episodes` arrays from the web page's script."""
    src = WEB.read_text()
    weeks = re.search(r"var weeks = (\[.*?\n  \]);", src, re.S).group(1)
    episodes = re.search(r"var episodes = (\[.*?\n  \]);", src, re.S).group(1)
    js = f"console.log(JSON.stringify({{weeks: {weeks}, episodes: {episodes}}}))"
    out = subprocess.run(["node", "-e", js], capture_output=True, text=True, check=True).stdout
    data = json.loads(out)
    return data["weeks"], data["episodes"]


def esc(s):
    return html.escape(s, quote=False)


# ---------------------------------------------------------------- series
def planned(weeks):
    """(week, post) pairs that double as a Rediscovering Her episode, in plan order."""
    return [(w, p) for w in weeks for p in w["core"] + w["opt"] if p.get("ep")]


def series_ties(weeks, episodes):
    rows = []
    for w, p in planned(weeks):
        rows.append(f'      <li><span class="w">Week {w["n"]} · {p["day"][:3]}</span>'
                    f'<span class="e"><b>Ep. {p["ep"]}</b> · {esc(episodes[p["ep"] - 1][0])}</span></li>')
    return "\n".join(rows)


def series_more(weeks, episodes):
    used = {p["ep"] for _, p in planned(weeks)}
    titles = [esc(t) for i, (t, *_) in enumerate(episodes, 1) if i not in used]
    return ('      <p style="font-size:17.5px;line-height:1.7;color:var(--soft);margin-top:10px">'
            + " &nbsp;·&nbsp; ".join(titles) + "</p>")


# ---------------------------------------------------------------- calendar
def ev(p, core):
    name, color = CATS[p["cat"]]
    tags = []
    if p.get("ep"):
        tags.append(f'Ep. {p["ep"]}')
    if p.get("style"):
        tags.append("+ Style moment")
    tag = f'<span class="tag">{" · ".join(tags)}</span>' if tags else ""
    return (f'<div><div class="ev {"core" if core else "opt"}" style="--c:{color}">'
            f'<span class="kk">{name}</span><span class="ti">{esc(p["short"])}</span>{tag}</div></div>')


def calendar(weeks):
    rows = []
    for w in weeks:
        by_day = {p["day"]: ev(p, True) for p in w["core"]}
        by_day.update({p["day"]: ev(p, False) for p in w["opt"]})
        cells = [by_day.get(d, '<div><div class="open"><b>Open</b></div></div>') for d in DAYS]
        rows.append(f'      <div class="cal-grid cal-row"><div class="wkl"><b>Week {w["n"]}</b>'
                    f'<span>{esc(w["theme"])}</span><i>{esc(w["em"])}</i></div>{"".join(cells)}</div>')
    return "\n".join(rows)


# ---------------------------------------------------------------- week pages
def core_post(p, episodes):
    name, color = CATS[p["cat"]]
    items = "".join(f"<li>{esc(i)}</li>" for i in p["items"])
    rh = f'<span class="rh">Rediscovering Her · Ep. {p["ep"]}</span>' if p.get("ep") else ""
    style = (f'<div class="tags"><span><b>Style moment</b>{esc(p["style"])}</span></div>'
             if p.get("style") else "")
    return f"""    <article class="post" style="--c:{color}">
      <div class="top"><span class="day">{p["day"]}</span><span class="meta">{esc(p["fmt"])} · <b>{name}</b></span>{rh}<i class="box"></i></div>
      <h3>{esc(p["title"])}</h3>
      <div class="cols"><div><p class="quote">“{esc(p["open"])}”</p><p class="ask"><b>Ask</b>{esc(p["ask"])}</p></div>
      <ul class="dots">{items}</ul></div>{style}
    </article>"""


def extra(p):
    rh = f' <em>· Rediscovering Her, Ep. {p["ep"]}</em>' if p.get("ep") else ""
    return (f'<div class="x"><i class="box"></i><small>{p["day"]} · {esc(p["kind"])}</small>'
            f'<span>{esc(p["title"])}{rh}</span></div>')


def week_page(w, episodes):
    n = w["n"]
    posts = "\n".join(core_post(p, episodes) for p in w["core"])
    extras = "\n      ".join(extra(p) for p in w["opt"])
    return f"""<!-- {FIRST_WEEK_PAGE + n - 1} · Week {n} -->
<section class="page">
  <div class="spine"></div>
  <div class="hud"><span>Shooting Stars · <b>Content Strategy</b></span><span>Week {n} of 4</span></div>
  <div class="content">
    <div class="wk-head">
      <div class="k"><b>07</b>Your four-week plan · Week {n}</div>
      <h2 class="disp title">{esc(w["theme"])} <span class="scr">{esc(w["em"])}</span></h2>
      <p>{esc(w["intent"])}</p>
    </div>
    <div style="margin-top:22px">
{posts}
    </div>
    <div class="extras" style="margin-top:auto">
      <div class="label">Optional, if you have the footage and the energy</div>
      {extras}
    </div>
  </div>
  <div class="folio"><span>Week {WORDS[n - 1]}</span><b>{FIRST_WEEK_PAGE + n - 1}</b></div>
</section>
"""


# ---------------------------------------------------------------- write
def fill(doc, name, body):
    pat = re.compile(rf"(<!-- GEN:{name} -->\n).*?(<!-- /GEN:{name} -->)", re.S)
    assert pat.search(doc), f"GEN:{name} markers missing"
    return pat.sub(lambda m: m.group(1) + body + "\n" + m.group(2), doc)


weeks, episodes = load_plan()
assert len(weeks) == 4 and len(episodes) == 16
assert sum(len(w["core"]) for w in weeks) == 12 and sum(len(w["opt"]) for w in weeks) == 8

doc = DECK.read_text()
doc = fill(doc, "series", series_ties(weeks, episodes))
doc = fill(doc, "more", series_more(weeks, episodes))
doc = fill(doc, "calendar", calendar(weeks))
doc = fill(doc, "weeks", "\n".join(week_page(w, episodes) for w in weeks))
DECK.write_text(doc)
print(f"filled {DECK.name}: series tie-ins, 4 calendar rows, 4 week pages")
