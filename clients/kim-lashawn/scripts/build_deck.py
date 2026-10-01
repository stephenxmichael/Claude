#!/usr/bin/env python3
"""Fills the generated regions of kim-lashawn-first-30-days.html, the PDF deck.

The four weekly plans and the sixteen Rediscovering Her episodes live once, in
the script data of web/guide.html (the approved interactive page). This reads
them from there and writes the episode grid, the month-at-a-glance calendar
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

FIRST_WEEK_PAGE = 15  # folio of the Week 1 page; the calendar is the page before
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


def ep_tag(n, episodes):
    return f'<span class="ep">Rediscovering Her · Ep. {n} · {esc(episodes[n - 1][0])}</span>'


# ---------------------------------------------------------------- episodes
def episode_cards(weeks, episodes):
    planned = {}
    for w in weeks:
        for p in w["core"] + w["opt"]:
            if p.get("ep"):
                planned[p["ep"]] = f'In your plan · Week {w["n"]} · {p["day"]}'
    cards = []
    for i, (title, concept, fmt, hook) in enumerate(episodes, 1):
        cls = "epc in" if i in planned else "epc"
        hk = f'<p class="hk">{esc(hook)}</p>' if hook else ""
        pl = f'<span class="pl">{planned[i]}</span>' if i in planned else ""
        cards.append(f"""      <div class="{cls}">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px"><span class="n">{i:02d}</span><span class="f">{esc(fmt)}</span></div>
        <h4>{esc(title)}</h4><p>{esc(concept)}</p>{hk}{pl}
      </div>""")
    return "\n".join(cards)


# ---------------------------------------------------------------- calendar
def ev(p, core):
    name, color = CATS[p["cat"]]
    parts = [f'<span class="kk">{name}</span>', f'<span class="ti">{esc(p["short"])}</span>']
    if p.get("ep"):
        parts.append(f'<span class="sr">RH · Ep. {p["ep"]}</span>')
    if p.get("style"):
        parts.append('<span class="sm">+ Style moment</span>')
    parts.append(f'<span class="ct">{esc(p["fmt"] if core else p["kind"])}</span>')
    return f'<div><div class="ev {"core" if core else "opt"}" style="--c:{color}">{"".join(parts)}</div></div>'


def calendar(weeks):
    rows = []
    for w in weeks:
        by_day = {p["day"]: ev(p, True) for p in w["core"]}
        by_day.update({p["day"]: ev(p, False) for p in w["opt"]})
        cells = [by_day.get(d, '<div><div class="open"><b>Open</b><span>Film, edit or rest</span></div></div>')
                 for d in DAYS]
        rows.append(f'      <div class="cal-grid cal-row"><div class="wkl"><b>Week {w["n"]}</b>'
                    f'<span>{esc(w["theme"])}</span><i>{esc(w["em"])}</i></div>{"".join(cells)}</div>')
    return "\n".join(rows)


# ---------------------------------------------------------------- week pages
def core_card(p, episodes):
    name, color = CATS[p["cat"]]
    items = "".join(f"<li>{esc(i)}</li>" for i in p["items"])
    ep = ""
    if p.get("ep"):
        note = f'<span class="muted" style="font-size:13.5px;line-height:1.35">{esc(p["epNote"])}</span>' if p.get("epNote") else ""
        ep = f'<div style="display:flex;flex-direction:column;align-items:flex-start;gap:5px;margin-top:10px">{ep_tag(p["ep"], episodes)}{note}</div>'
    style = f'<p class="stylem"><b>Style moment</b>{esc(p["style"])}</p>' if p.get("style") else ""
    return f"""      <article class="card core" style="--c:{color}">
        <div class="top"><span class="day">{p["day"]}</span><span class="fmt">{esc(p["fmt"])}</span><span class="chip"><i class="dot" style="background:{color}"></i>{name}</span><span class="filmed"><i class="box"></i>Filmed</span></div>
        <h4>{esc(p["title"])}</h4>
        <div class="row"><div><p class="quote">“{esc(p["open"])}”</p><p class="ask"><b>Ask</b>{esc(p["ask"])}</p>{ep}</div>
        <div><span class="lk">{esc(p["k"])}</span><ul>{items}</ul></div></div>{style}
      </article>"""


def extra(i, p, episodes):
    ep = f'<div style="margin-top:6px">{ep_tag(p["ep"], episodes)}</div>' if p.get("ep") else ""
    note = f'<span class="muted" style="display:block;font-size:13.5px;margin-top:3px">{esc(p["note"])}</span>' if p.get("note") else ""
    return (f'<div class="x"><i class="box"></i><div><small>{p["day"]} · {esc(p["kind"])}</small>'
            f'<b>{esc(p["title"])}</b>{note}{ep}</div></div>')


def week_page(w, episodes):
    n = w["n"]
    cores = "\n".join(core_card(p, episodes) for p in w["core"])
    extras = "\n      ".join(extra(i, p, episodes) for i, p in enumerate(w["opt"], 4))
    return f"""<!-- {FIRST_WEEK_PAGE + n - 1} · Week {n} -->
<section class="page bone">
  <div class="spine"><span>09 · Your four-week plan</span></div>
  <div class="hud"><span>Shooting Stars · <b>Content Strategy</b></span><span>Week 0{n} of 04</span></div>
  <div class="content">
    <div class="wk-head">
      <div><div class="k"><b>09</b> Your four-week plan · Week {n}</div><h2 class="disp">{esc(w["theme"])} <span class="scr">{esc(w["em"])}</span></h2></div>
      <p>{esc(w["intent"])}</p>
    </div>
    <div class="cores">
{cores}
    </div>
    <div class="dash extras">
      <div><span class="mono" style="color:var(--accent)">Optional extras</span><p class="muted" style="font-size:15px;line-height:1.4">If you have the footage and the energy.</p></div>
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
doc = fill(doc, "episodes", episode_cards(weeks, episodes))
doc = fill(doc, "calendar", calendar(weeks))
doc = fill(doc, "weeks", "\n".join(week_page(w, episodes) for w in weeks))
DECK.write_text(doc)
print(f"filled {DECK.name}: 16 episodes, 4 calendar rows, 4 week pages")
