#!/usr/bin/env python3
"""Fills the generated regions of kim-lashawn-first-30-days.html, the PDF deck.

The month's posts live once, in WEEKS below. The month-at-a-glance calendar
and the four week pages are both written from it, so a post's title is the
same in both places. The calendar says what to post; the week pages say how
to film it. Everything outside the GEN markers is edited by hand in the deck.

    python3 scripts/build_deck.py && node scripts/render.mjs --pdf
"""
import html
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent
DECK = ROOT / "kim-lashawn-first-30-days.html"

FIRST_WEEK_PAGE = 10  # folio of the Week 1 page; the calendar is the page before
COLORS = {"becoming": "var(--p1)", "lifestyle": "var(--p2)", "style": "var(--p3)", "safety": "var(--p4)"}
DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
WORDS = ["one", "two", "three", "four"]


def core(day, cat, title, fmt, direction):
    return dict(day=day, cat=cat, title=title, fmt=fmt, dir=direction)


def opt(day, cat, title):
    return dict(day=day, cat=cat, title=title)


# Monday: becoming. Wednesday: lifestyle, with a brief style moment in weeks
# 2 and 4. Friday: style in weeks 1 and 3, safety in weeks 2 and 4.
# Optional: a Thursday style post and a Saturday reply or extra.
WEEKS = [
    dict(n=1, theme="Introduce", em="your chapter", core=[
        core("Monday", "becoming", "What becoming at 50 means to me", "Camera talk",
             "Share what this chapter means to you and one thing you’re discovering about yourself."),
        core("Wednesday", "lifestyle", "Building my new life in Houston", "Mini vlog",
             "Capture yourself getting ready, visiting one place, and sharing a short reflection afterward."),
        core("Friday", "style", "Getting dressed for this version of me", "Outfit video",
             "Show your full look and explain why one favorite piece feels like you."),
    ], opt=[
        opt("Thursday", "style", "My favorite accessory"),
        opt("Saturday", "becoming", "Reply: starting over"),
    ]),
    dict(n=2, theme="Choose", em="yourself", core=[
        core("Monday", "becoming", "Making room for myself", "Camera talk",
             "Share one habit or block of time you protect while working full-time, and what changes when you keep it."),
        core("Wednesday", "lifestyle", "Pilates after a workday", "Mini vlog",
             "Film heading out after work, a moment in class, and how you feel afterward. "
             "Add a brief style moment: your Pilates look in the mirror before you leave."),
        core("Friday", "safety", "Why I became a firearm instructor", "Camera talk",
             "Tell your story in your own words and what you want women to feel when they learn. "
             "Keep the focus on confidence and qualified instruction."),
    ], opt=[
        opt("Thursday", "style", "Weekend outfit with my husband"),
        opt("Saturday", "safety", "Myths about women and training"),
    ]),
    dict(n=3, theme="Enjoy", em="your life", core=[
        core("Monday", "becoming", "Learning what I enjoy", "Camera talk",
             "Share something you never made time for before and something you’ve discovered you love."),
        core("Wednesday", "lifestyle", "A solo outing in Houston", "Mini vlog",
             "Take yourself somewhere new. Film a wide shot, a few details, and a short reflection."),
        core("Friday", "style", "Get ready with me: date night", "Get ready with me",
             "Film your hair, finishing touches, and the full outfit as you get ready to go out with your husband."),
    ], opt=[
        opt("Thursday", "style", "One piece, styled two ways"),
        opt("Saturday", "becoming", "Reply: enjoying my own company"),
    ]),
    dict(n=4, theme="Grow", em="in confidence", core=[
        core("Monday", "becoming", "Permission I’m giving myself after 50", "Camera talk",
             "Name one thing you’re finally giving yourself permission to do, and what used to hold you back."),
        core("Wednesday", "lifestyle", "A realistic evening reset after work", "Mini vlog",
             "Film coming home and two or three small moments that help you reset. "
             "Add a brief style moment: the comfortable piece you change into."),
        core("Friday", "safety", "What beginner women should know", "Camera talk",
             "Reassure women that it’s okay to start as a complete beginner, and encourage qualified instruction."),
    ], opt=[
        opt("Thursday", "style", "A genuine everyday find"),
        opt("Saturday", "safety", "Reply: how I teach"),
    ]),
]


def esc(s):
    return html.escape(s, quote=False)


# ---------------------------------------------------------------- calendar
def ev(p, kind):
    return (f'<div><div class="ev {kind}" style="--c:{COLORS[p["cat"]]}">'
            f'<span class="ti">{esc(p["title"])}</span></div></div>')


def calendar():
    rows = []
    for w in WEEKS:
        by_day = {p["day"]: ev(p, "core") for p in w["core"]}
        by_day.update({p["day"]: ev(p, "opt") for p in w["opt"]})
        cells = [by_day.get(d, '<div><div class="open"><b>Open</b></div></div>') for d in DAYS]
        rows.append(f'      <div class="cal-grid cal-row"><div class="wkl"><b>Week {w["n"]}</b>'
                    f'<span>{esc(w["theme"])}</span><i>{esc(w["em"])}</i></div>{"".join(cells)}</div>')
    return "\n".join(rows)


# ---------------------------------------------------------------- week pages
def assignment(p):
    return f"""    <article class="asg" style="--c:{COLORS[p["cat"]]}">
      <div class="day">{p["day"]}</div>
      <h3>{esc(p["title"])}</h3>
      <div class="fmt">{esc(p["fmt"])}</div>
      <p>{esc(p["dir"])}</p>
    </article>"""


def week_page(w):
    n = w["n"]
    posts = "\n".join(assignment(p) for p in w["core"])
    later = "".join(f'<li><b>{p["day"]}:</b> {esc(p["title"])}</li>' for p in w["opt"])
    return f"""<!-- {FIRST_WEEK_PAGE + n - 1} · Week {n} -->
<section class="page">
  <div class="spine"></div>
  <div class="hud"><span>Shooting Stars · <b>Content Strategy</b></span><span>Week {n} of 4</span></div>
  <div class="content">
    <div class="wk-head">
      <div class="k"><b>07</b>Your four-week plan · Week {n}</div>
      <h2 class="disp title">{esc(w["theme"])} <span class="scr">{esc(w["em"])}</span></h2>
    </div>
    <div style="margin-top:8px">
{posts}
    </div>
    <div class="later" style="margin-top:auto">
      <div class="label">If you have time</div>
      <ul>{later}</ul>
      <small>These are optional.</small>
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


assert sum(len(w["core"]) for w in WEEKS) == 12 and sum(len(w["opt"]) for w in WEEKS) == 8
for w in WEEKS:
    assert [p["day"] for p in w["core"]] == ["Monday", "Wednesday", "Friday"]
    assert [p["day"] for p in w["opt"]] == ["Thursday", "Saturday"]
    for p in w["core"]:
        assert p["dir"].count(". ") <= 1, f"direction longer than two sentences: {p['title']}"

doc = DECK.read_text()
doc = fill(doc, "calendar", calendar())
doc = fill(doc, "weeks", "\n".join(week_page(w) for w in WEEKS))
DECK.write_text(doc)
print(f"filled {DECK.name}: calendar and 4 week pages (12 core, 8 optional)")
