#!/usr/bin/env python3
"""Builds kim-lashawn-first-30-days.html, the 22-page PDF deck.

The four weekly plans live once, in WEEKS below. The month-at-a-glance
calendar and the four detailed week pages are both generated from it, so
they cannot disagree.

    python3 scripts/build_deck.py && node scripts/render.mjs --pdf
"""
import html
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "kim-lashawn-first-30-days.html"

CATS = {
    "becoming": ("Becoming", "var(--c-becoming)"),
    "lifestyle": ("Lifestyle", "var(--c-lifestyle)"),
    "style": ("Style", "var(--c-style)"),
    "safety": ("Safety", "var(--c-safety)"),
}

# ---------------------------------------------------------------- the plan
# Each core post: day, cat, fmt, title, short (calendar), open, k, items, ask, style
# Each optional post: day, cat, kind, title, short, note
WEEKS = [
    dict(n=1, theme="Introduce", em="your chapter",
         intent="Let people meet you: who you are, where you are, and what you’re building.",
         core=[
             dict(day="Monday", cat="becoming", fmt="Talk to camera",
                  title="What becoming at 50 means to me", short="What becoming at 50 means to me",
                  open="Let me tell you what ‘becoming’ means to me at this stage of my life.",
                  k="Say", items=["What this chapter looks like for you right now",
                                  "One thing you’re learning about yourself",
                                  "Why you’re choosing to share it here"],
                  ask="If you’re in a new chapter too, what are you becoming?"),
             dict(day="Wednesday", cat="lifestyle", fmt="Mini vlog",
                  title="A day building my new life in Houston", short="A day building my Houston life",
                  open="Come spend a day with me while I build a new life in Houston.",
                  k="Capture", items=["Getting ready at home, with your view",
                                      "One place you’re getting to know",
                                      "A closing thought on what feels like home so far"],
                  ask="Houston ladies, where should I go next?"),
             dict(day="Friday", cat="style", fmt="Get-dressed video",
                  title="Getting dressed for this version of me", short="Getting dressed for this version of me",
                  open="This is how I’m getting dressed for this version of me.",
                  k="Capture", items=["The full look, in good light",
                                      "One or two pieces, and why they feel like you",
                                      "Your hair as part of the look"],
                  ask="What’s one piece that makes you feel most like yourself?"),
         ],
         opt=[
             dict(day="Thursday", cat="style", kind="Style post",
                  title="A favorite accessory and how I wear it", short="Favorite accessory, how I wear it",
                  note="A photo carousel works too."),
             dict(day="Saturday", cat="becoming", kind="Audience reply",
                  title="Reply to a comment about starting over", short="Reply: starting over", note=""),
         ]),
    dict(n=2, theme="Choose", em="yourself",
         intent="Show what it looks like to make room for yourself in a full, real life.",
         core=[
             dict(day="Monday", cat="becoming", fmt="Talk to camera",
                  title="Making room for myself while working full-time", short="Making room for myself",
                  open="I work full-time, so making room for myself has to be on purpose.",
                  k="Say", items=["One habit or block of time you protect",
                                  "What changes when you keep it, or skip it",
                                  "Encouragement for women with full schedules"],
                  ask="When do you make time for yourself in a busy week?"),
             dict(day="Wednesday", cat="lifestyle", fmt="Mini vlog",
                  title="Pilates after a workday", short="Pilates after work",
                  open="It’s been a full workday, and I’m heading to Pilates anyway.",
                  k="Capture", items=["Heading out after work",
                                      "Arriving, plus a detail: your mat, shoes, or bag",
                                      "You after class, sharing how you feel"],
                  ask="What kind of movement makes you feel good these days?",
                  style="Show your Pilates look in the mirror before you head out."),
             dict(day="Friday", cat="safety", fmt="Talk to camera",
                  title="Why I became a firearm instructor", short="Why I became an instructor",
                  open="Some of you don’t know this about me yet: I’m a firearm instructor. Here’s why.",
                  k="Say", items=["Why you became an instructor, in your words",
                                  "What you want women to feel when they learn",
                                  "Why learning from qualified instruction matters"],
                  ask="What would you want to learn first?"),
         ],
         opt=[
             dict(day="Thursday", cat="style", kind="Style post",
                  title="What I wore for a weekend with my husband", short="Weekend outfit with my husband",
                  note="A photo carousel works too."),
             dict(day="Saturday", cat="safety", kind="Extra",
                  title="A misconception about women who pursue firearm training",
                  short="Myths about women and training", note=""),
         ]),
    dict(n=3, theme="Enjoy", em="your life",
         intent="Lean into the joy: what you love, where you go, and how you show up.",
         core=[
             dict(day="Monday", cat="becoming", fmt="Talk to camera",
                  title="Learning what I enjoy in this chapter", short="Learning what I enjoy",
                  open="One of the best parts of this chapter has been finding out what I actually enjoy.",
                  k="Say", items=["Something you put off or never made time for",
                                  "Something you’ve found you love",
                                  "Permission for viewers to explore, too"],
                  ask="What’s something you’ve discovered you love lately?"),
             dict(day="Wednesday", cat="lifestyle", fmt="Mini vlog",
                  title="A solo outing in Houston", short="A solo Houston outing",
                  open="Today I’m taking myself out.",
                  k="Capture", items=["A wide shot of where you are",
                                      "Details: the menu, the art, the view",
                                      "You enjoying it, then a short reflection"],
                  ask="Where would you take yourself on a solo date?"),
             dict(day="Friday", cat="style", fmt="Get ready with me",
                  title="Get ready with me for date night", short="Get ready with me: date night",
                  open="Get ready with me. It’s date night with my husband.",
                  k="Capture", items=["Hair and finishing touches",
                                      "The outfit, start to finish",
                                      "What you enjoy about getting ready"],
                  ask="What’s your go-to date night look?"),
         ],
         opt=[
             dict(day="Thursday", cat="style", kind="Style post",
                  title="One favorite piece, styled two ways", short="One piece, styled two ways",
                  note="A photo carousel works too."),
             dict(day="Saturday", cat="becoming", kind="Audience reply",
                  title="Reply to a question about enjoying your own company",
                  short="Reply: enjoying my own company", note=""),
         ]),
    dict(n=4, theme="Grow", em="in confidence",
         intent="Close the month with permission, real routines, and your expertise.",
         core=[
             dict(day="Monday", cat="becoming", fmt="Talk to camera",
                  title="Something I’m giving myself permission to do after 50",
                  short="Permission I’m giving myself",
                  open="Here’s something I’m finally giving myself permission to do.",
                  k="Say", items=["The permission, and why it matters to you",
                                  "What used to hold you back",
                                  "A gentle nudge for the woman watching"],
                  ask="What are you giving yourself permission to do this year?"),
             dict(day="Wednesday", cat="lifestyle", fmt="Mini vlog",
                  title="A realistic evening reset after work", short="My evening reset",
                  open="This is what a real evening reset looks like after a full workday.",
                  k="Capture", items=["Coming home and setting things down",
                                      "Two or three small moments that reset you",
                                      "You settling in, with a closing thought"],
                  ask="What’s one thing that helps you reset after work?",
                  style="Show the comfortable piece you change into, or an item you reach for every evening."),
             dict(day="Friday", cat="safety", fmt="Talk to camera",
                  title="What I want beginner women to know", short="What beginner women should know",
                  open="If you’ve been curious about firearm education but don’t know where to start, this is for you.",
                  k="Say", items=["It’s okay to start as a complete beginner",
                                  "Look for qualified instruction, and ask questions",
                                  "Responsible ownership means ongoing learning"],
                  ask="Would you like updates when I start offering classes in Houston?"),
         ],
         opt=[
             dict(day="Thursday", cat="style", kind="Style post",
                  title="A genuine find from my everyday routine", short="A genuine everyday find",
                  note="A photo carousel works too."),
             dict(day="Saturday", cat="safety", kind="Audience reply",
                  title="Answer a question about my background or how I teach",
                  short="Reply: how I teach", note=""),
         ]),
]

FIRST_WEEK_PAGE = 12  # page number of Week 1; the calendar is the page before

# ---------------------------------------------------------------- styles
CSS = r"""
/* Shooting Stars Content Strategy · student edition.
   Light editorial system: ivory ground, blush and sand panels, one deep
   mulberry for headings and emphasis. Two families: Instrument Serif for
   headlines, Inter for everything a reader has to read. */
:root{
  --ivory:#FAF6F1; --paper:#FFFFFF; --blush:#F4E6E0; --blush2:#EBD5CD; --sand:#F2EBE3;
  --rose:#C98E86; --rose-deep:#9B524D; --deep:#4A2C37; --ink:#2A2024; --muted:#675A5F; --line:#E7DCD4;
  --c-becoming:#5B2F3E; --c-lifestyle:#9B524D; --c-style:#80613F; --c-safety:#46606F;
  --serif:'Instrument Serif',Georgia,serif; --sans:'Inter',system-ui,sans-serif;
}
@page{size:1080px 1350px;margin:0}
*{box-sizing:border-box;margin:0;padding:0}
html,body{background:#CFC4BC}
body{font-family:var(--sans);color:var(--ink);font-size:19px;line-height:1.55;-webkit-font-smoothing:antialiased}
ul,ol{list-style:none}
img{display:block}
@media print{html,body{background:none}.page{margin:0!important}}

.page{width:1080px;height:1350px;position:relative;overflow:hidden;background:var(--ivory);margin:0 auto 40px;break-after:page}
.page.sand{background:var(--sand)}
.page.blush{background:var(--blush)}

/* running head and foot */
.rh{position:absolute;top:44px;left:80px;right:80px;display:flex;justify-content:space-between;font:500 13.5px/1 var(--sans);color:var(--muted);letter-spacing:.01em}
.rh b{font-weight:600;color:var(--deep)}
.ft{position:absolute;bottom:40px;left:80px;right:80px;display:flex;justify-content:space-between;align-items:center;font:500 13px/1 var(--sans);color:var(--muted)}
.ft .pn{font:600 15px/1 var(--sans);color:var(--deep);font-variant-numeric:tabular-nums}
.content{position:absolute;top:112px;left:80px;right:80px;bottom:96px;display:flex;flex-direction:column}

/* type */
.eyebrow{display:flex;align-items:center;gap:10px;font:600 13.5px/1.3 var(--sans);letter-spacing:.07em;text-transform:uppercase;color:var(--rose-deep)}
.eyebrow .n{color:var(--deep)}
.t{font:400 78px/1 var(--serif);letter-spacing:-.012em;color:var(--deep);margin-top:16px;text-wrap:balance}
.t em,.sub em,.quote em{font-style:italic;color:var(--rose-deep)}
.lead{font-size:22px;line-height:1.55;color:var(--ink);max-width:800px;margin-top:18px}
.sub{font:400 36px/1.1 var(--serif);color:var(--deep)}
.h4{font:600 20px/1.3 var(--sans);color:var(--ink)}
.p{font-size:17.5px;line-height:1.55;color:var(--muted)}
.label{font:600 12.5px/1.3 var(--sans);letter-spacing:.07em;text-transform:uppercase;color:var(--rose-deep)}
.quote{font:italic 400 24px/1.3 var(--serif);color:var(--deep)}

/* surfaces */
.card{background:var(--paper);border:1px solid var(--line);border-radius:18px}
.panel{background:var(--blush);border-radius:18px}
.panel.sand{background:var(--sand)}
.deep{background:var(--deep);color:#FBF3EF;border-radius:18px}
.deep .label{color:#E9B9AF}
.deep .p{color:#E8D9DD}
.chip{display:inline-flex;align-items:center;gap:8px;font:500 15px/1.2 var(--sans);padding:8px 14px;border-radius:999px;background:var(--sand);color:var(--ink)}
.page.sand .chip{background:var(--paper)}
.dot{width:9px;height:9px;border-radius:50%;flex:none}
.rows>li{padding:14px 0;border-top:1px solid var(--line)}
.rows>li:last-child{border-bottom:1px solid var(--line)}
.two{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.three{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.pill{display:inline-flex;align-items:center;gap:6px;font:600 12px/1 var(--sans);letter-spacing:.05em;text-transform:uppercase;border-radius:999px;padding:6px 10px}
.pill.core{background:var(--c);color:#fff}
.pill.optl{border:1.5px dashed var(--c);color:var(--c);background:var(--paper)}

/* ---------- cover ---------- */
.cover .wash{position:absolute;left:500px;top:170px;right:0;bottom:64px;background:var(--blush)}
.cover .photo{position:absolute;left:546px;top:104px;width:534px;height:1068px}
.cover .kicker{position:absolute;left:80px;top:72px;font:600 13.5px/1 var(--sans);letter-spacing:.07em;text-transform:uppercase;color:var(--muted)}
.cover .block{position:absolute;left:80px;top:360px;width:430px}
.cover .name{font:600 17px/1 var(--sans);letter-spacing:.14em;text-transform:uppercase;color:var(--rose-deep)}
.cover h1{font:400 122px/.94 var(--serif);letter-spacing:-.015em;color:var(--deep);margin-top:26px}
.cover h1 em{font-style:italic;color:var(--rose-deep);display:block}
.cover .subtitle{font:500 27px/1.3 var(--sans);color:var(--ink);margin-top:30px}
.cover .rule{width:56px;height:2px;background:var(--rose);margin-top:34px}
.cover .tag{font-size:19px;line-height:1.55;color:var(--muted);margin-top:26px;max-width:380px}
.cover .credit{position:absolute;left:80px;bottom:70px;width:420px;display:flex;flex-direction:column;gap:14px}
.cover .credit img{width:150px}
.cover .credit p{font-size:15px;line-height:1.5;color:var(--muted)}
.cover .credit b{font-weight:600;color:var(--ink)}

/* ---------- weekly pages ---------- */
.wk-top{display:flex;justify-content:space-between;align-items:flex-end;gap:24px}
.wk-top .t{font-size:66px}
.wk-count{display:flex;gap:8px;flex:none;padding-bottom:8px}
.wk-count span{font:600 13px/1 var(--sans);padding:9px 13px;border-radius:999px}
.wk-count .a{background:var(--deep);color:#fff}
.wk-count .b{border:1.5px dashed var(--rose);color:var(--rose-deep)}
.post{padding:16px 24px 18px}
.post .top{display:flex;align-items:center;gap:12px;padding-bottom:10px;border-bottom:1px solid var(--line)}
.post .day{font:400 32px/1 var(--serif);color:var(--deep)}
.post .cat{font:600 14px/1 var(--sans);color:var(--c)}
.post .fmt{margin-left:auto;font-size:15px;color:var(--muted)}
.post .fmt b{font-weight:600;color:var(--ink)}
.post .title{font:600 22px/1.25 var(--sans);color:var(--ink);margin-top:10px}
.post .grid{display:grid;grid-template-columns:1.05fr .95fr;gap:28px;margin-top:10px}
.post .quote{font-size:20px}
.post .k{font:600 12px/1.3 var(--sans);letter-spacing:.07em;text-transform:uppercase;color:var(--rose-deep);margin-bottom:4px}
.post li{font-size:16.5px;line-height:1.38;padding:5px 0 5px 16px;position:relative;border-top:1px solid var(--line)}
.post li:first-child{border-top:0;padding-top:0}
.post li::before{content:"";position:absolute;left:0;top:13px;width:7px;height:7px;border-radius:50%;background:var(--c)}
.post li:first-child::before{top:8px}
.post .ask{font-size:16.5px;line-height:1.45;color:var(--ink);margin-top:10px}
.post .ask b{font:600 12px/1 var(--sans);letter-spacing:.07em;text-transform:uppercase;color:var(--rose-deep);margin-right:6px}
.post .stylem{margin-top:12px;display:flex;gap:10px;align-items:baseline;background:var(--sand);border-radius:10px;padding:9px 12px;font-size:16px;line-height:1.4}
.post .stylem b{font:600 12px/1 var(--sans);letter-spacing:.07em;text-transform:uppercase;color:var(--c-style);flex:none}
.opts{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.opt{border:1.5px dashed var(--rose);border-radius:16px;padding:14px 20px;background:rgba(255,255,255,.55);display:flex;flex-direction:column;gap:8px}
.opt .top{display:flex;align-items:center;gap:10px}
.opt .day{font:400 26px/1 var(--serif);color:var(--deep)}
.opt .title{font:600 18px/1.3 var(--sans);color:var(--ink)}
.opt .note{font-size:14.5px;color:var(--muted)}

/* ---------- calendar ---------- */
.legend{display:flex;flex-wrap:wrap;gap:10px 22px;align-items:center;font:500 14.5px/1 var(--sans);color:var(--ink)}
.legend span{display:inline-flex;align-items:center;gap:8px}
.legend .sw{width:14px;height:14px;border-radius:4px}
.legend .core{width:30px;height:16px;border-radius:5px;background:var(--deep)}
.legend .optn{width:30px;height:16px;border-radius:5px;border:1.5px dashed var(--deep);background:var(--paper)}
.legend .sep{width:1px;height:20px;background:var(--line)}
.cal{background:var(--paper);border:1px solid var(--line);border-radius:22px;box-shadow:0 22px 50px rgba(74,44,55,.10),0 2px 8px rgba(74,44,55,.05);overflow:hidden}
.cal-grid{display:grid;grid-template-columns:104px minmax(0,1.25fr) minmax(0,.68fr) minmax(0,1.25fr) minmax(0,1.15fr) minmax(0,1.25fr) minmax(0,1.15fr) minmax(0,.68fr)}
.cal-head>div{padding:15px 10px 13px;font:600 15px/1 var(--sans);color:var(--muted);border-bottom:1px solid var(--line);background:#FCFAF8}
.cal-head>div.wk{color:transparent}
.cal-row>div{padding:10px 8px;border-bottom:1px solid var(--line);border-left:1px solid var(--line);min-height:194px}
.cal-row:last-child>div{border-bottom:0}
.cal-row>div:first-child{border-left:0}
.cal-row .wkl{padding:16px 12px 10px 16px;background:#FCFAF8}
.cal-row .wkl b{display:block;font:600 16px/1.2 var(--sans);color:var(--deep)}
.cal-row .wkl i{display:block;font:italic 400 20px/1.1 var(--serif);color:var(--rose-deep);margin-top:8px}
.ev{border-radius:12px;padding:10px 11px 11px;height:100%;display:flex;flex-direction:column;gap:6px}
.ev .k{font:700 10.5px/1.2 var(--sans);letter-spacing:.07em;text-transform:uppercase}
.ev .ti{font:600 15.5px/1.28 var(--sans);overflow-wrap:break-word}
.ev .ct{font:500 12.5px/1.2 var(--sans);margin-top:auto}
.ev .sm{font:600 12px/1.25 var(--sans);border-radius:6px;padding:4px 6px;align-self:flex-start;margin-top:2px}
.ev.core{background:var(--c);color:#fff}
.ev.core .k,.ev.core .ct{color:rgba(255,255,255,.86)}
.ev.core .sm{background:rgba(255,255,255,.18);color:#fff}
.ev.opt{border:1.5px dashed var(--c);background:#fff;color:var(--ink)}
.ev.opt .k,.ev.opt .ct{color:var(--c)}
.open{height:100%;display:flex;flex-direction:column;gap:6px;align-items:center;justify-content:center;text-align:center;border-radius:10px;background:repeating-linear-gradient(135deg,#FBF8F5 0 8px,#F5EFE9 8px 16px)}
.open b{font:600 13px/1.2 var(--sans);color:var(--muted)}
.open span{font:500 12px/1.3 var(--sans);color:#8F8286}
.week-strip{display:grid;grid-template-columns:repeat(7,1fr);gap:8px}
.week-strip div{border-radius:12px;padding:12px 10px;text-align:center;display:flex;flex-direction:column;gap:4px}
.week-strip b{font:600 15px/1 var(--sans)}
.week-strip span{font:600 11px/1.2 var(--sans);letter-spacing:.06em;text-transform:uppercase}
"""

# ---------------------------------------------------------------- helpers
def esc(s):
    return html.escape(s, quote=False)


def page(num, section, inner, cls=""):
    return f"""
<section class="page {cls}">
  <div class="rh"><span><b>Kim LaShawn</b> · Your First 30 Days of Content</span><span>{section}</span></div>
  <div class="content">
{inner}
  </div>
  <div class="ft"><span>Shooting Stars Content Academy</span><span class="pn">{num:02d}</span></div>
</section>"""


def eyebrow(n, text):
    return f'<div class="eyebrow"><span class="n">{n}</span><span>·</span><span>{text}</span></div>'


def cat_color(c):
    return CATS[c][1]


# ---------------------------------------------------------------- pages
pages = []

# 1 · Cover ----------------------------------------------------------------
pages.append("""
<section class="page cover">
  <div class="wash"></div>
  <img class="photo" src="photos/kim-cover.jpg" alt="Kim LaShawn smiling in a strapless print dress with a gold chain and crossbody bag">
  <div class="kicker">Content Strategy · Month One</div>
  <div class="block">
    <div class="name">Kim LaShawn</div>
    <h1>Becoming<em>at 50+</em></h1>
    <div class="subtitle">Your First 30 Days of Content</div>
    <div class="rule"></div>
    <p class="tag">A plan for building a life you love, with confidence, joy, and intention, and sharing it as you go.</p>
  </div>
  <div class="credit">
    <img src="logo-deep.png" alt="Shooting Stars Content Academy">
    <p>Prepared by <b>Stephen Michael</b><br>Shooting Stars Content Academy</p>
  </div>
</section>""")

# 2 · Letter -----------------------------------------------------------------
pages.append(page(2, "A note from your coach", """
    <div style="display:grid;grid-template-columns:350px 1fr;gap:60px;margin-top:20px">
      <figure style="display:flex;flex-direction:column;gap:14px">
        <img src="photos/kim-letter.jpg" alt="Kim talking to the camera" style="width:350px;height:462px;border-radius:16px">
        <figcaption class="p" style="font-size:15px">You on camera, already doing what this plan is built around.</figcaption>
      </figure>
      <div style="display:flex;flex-direction:column;gap:20px">
        <div class="eyebrow"><span>A note from your coach</span></div>
        <h2 class="t" style="margin-top:0">Proud of <em>you</em></h2>
        <div style="display:flex;flex-direction:column;gap:18px;font-size:20px;line-height:1.66">
          <p>Kim,</p>
          <p>I’m proud of you for taking this first step. Choosing to show up on camera, consistently, in a new city, while working full-time, takes real courage. And you’ve already started.</p>
          <p>This guide gives your first month some structure. More than that, it’s a repeatable system: four pillars you can come back to, each with subtopics underneath, and a weekly rhythm that tells you what to film next. Whenever you’re not sure what to post, open this up and start from here.</p>
          <p>Thank you for trusting me as your content coach. I’m grateful to be part of this chapter with you, and I can’t wait to see what you create.</p>
        </div>
        <div style="margin-top:6px">
          <div style="font:italic 400 44px/1 var(--serif);color:var(--deep)">Stephen Michael</div>
          <div class="p" style="font-size:15px;margin-top:8px">Your content coach · Shooting Stars Content Academy</div>
        </div>
      </div>
    </div>"""))

# 3 · Contents -------------------------------------------------------------
toc = [
    ("01", "Your brand direction", "The story every video comes back to", 4),
    ("02", "Where you’re starting", "Your profiles and your first milestone", 5),
    ("03", "Who you’re talking to", "Your audience, and why they’ll come back", 6),
    ("04", "Your content pillars", "Four topics and the subtopics under each", 7),
    ("05", "Your style, every week", "Why style shows up in every week", 9),
    ("06", "Your weekly rhythm", "Three core posts, two optional", 10),
    ("07", "Your month at a glance", "The whole month on one calendar", 11),
    ("08", "Your four-week plan", "Every post, week by week", 12),
    ("09", "Women’s safety education", "Introducing your expertise", 16),
    ("10", "Filming and editing", "Simple rules for talks and vlogs", 17),
    ("11", "One vlog, start to finish", "The Pilates example, beat by beat", 18),
    ("12", "Your weekly workflow", "How it fits around a full-time job", 19),
    ("13", "Trust before monetization", "Your milestone and TikTok Shop", 20),
    ("14", "Your first-month review", "What to look at before Month 2", 21),
    ("15", "Your first three steps", "What to do this week", 22),
]
toc_rows = "\n".join(
    f'<li style="display:grid;grid-template-columns:52px 1fr 40px;gap:12px;align-items:baseline;padding:15px 0;border-top:1px solid var(--line)">'
    f'<span style="font:400 28px/1 var(--serif);color:var(--rose-deep)">{n}</span>'
    f'<span><span class="h4" style="font-size:18.5px;display:block">{t}</span><span class="p" style="font-size:15px;display:block;margin-top:2px">{d}</span></span>'
    f'<span style="font:600 15px/1 var(--sans);color:var(--deep);text-align:right">{p}</span></li>'
    for n, t, d, p in toc)
pages.append(page(3, "Contents", f"""
    <div class="eyebrow"><span>What’s inside</span></div>
    <h2 class="t">Your <em>guide</em></h2>
    <ol style="display:grid;grid-template-columns:1fr 1fr;column-gap:48px;margin-top:34px">
{toc_rows}
    </ol>
    <div class="panel" style="margin-top:auto;padding:24px 28px;display:grid;grid-template-columns:auto 1fr;gap:22px;align-items:center">
      <span class="sub" style="font-size:32px">Start here</span>
      <p style="font-size:18px">Ready to film? Your month at a glance is on page 11, and each week’s details begin on page 12.</p>
    </div>""", "sand"))

# 4 · Brand direction ----------------------------------------------------------
pages.append(page(4, "Your brand direction", """
    """ + eyebrow("01", "Your brand direction") + """
    <h2 class="t">Becoming at 50+</h2>
    <p style="font:400 60px/1.08 var(--serif);color:var(--deep);margin-top:34px;max-width:860px">Building a life you love, with <em style="color:var(--rose-deep)">confidence, joy,</em> and <em style="color:var(--rose-deep)">intention.</em></p>
    <p class="p" style="margin-top:18px">This is the idea every video comes back to. You don’t need separate brands; each topic is another way into the same story.</p>
    <div class="two" style="margin-top:auto">
      <div class="card" style="padding:32px 32px"><div class="label">Foundation</div><h3 class="sub" style="font-size:30px;margin-top:10px">Lifestyle is the foundation.</h3><p class="p" style="margin-top:10px">Your everyday life in Houston, from Pilates and outings to family time and moments with your husband, is what people come to see.</p></div>
      <div class="card" style="padding:32px 32px"><div class="label">Meaning</div><h3 class="sub" style="font-size:30px;margin-top:10px">Your conversations give it meaning.</h3><p class="p" style="margin-top:10px">Your motivational talks turn ordinary moments into something women can carry into their own lives.</p></div>
      <div class="card" style="padding:32px 32px"><div class="label">Expression</div><h3 class="sub" style="font-size:30px;margin-top:10px">Your style shows who you are.</h3><p class="p" style="margin-top:10px">Your clothes, accessories, and hair express your personality, and show people your taste.</p></div>
      <div class="card" style="padding:32px 32px"><div class="label">Depth</div><h3 class="sub" style="font-size:30px;margin-top:10px">Your safety expertise adds depth.</h3><p class="p" style="margin-top:10px">Women’s safety education brings real professional knowledge, and another kind of confidence.</p></div>
    </div>"""))

# 5 · Where you're starting ------------------------------------------------------
pages.append(page(5, "Where you’re starting", """
    """ + eyebrow("02", "Where you’re starting") + """
    <h2 class="t">Your story already <em>started</em></h2>
    <div style="display:grid;grid-template-columns:1fr 430px;gap:44px;margin-top:30px;align-items:start">
      <div>
        <p class="lead" style="margin-top:0;font-size:21px">Your profiles already say what this plan is about. Now we give it a rhythm.</p>
        <ol class="rows" style="margin-top:22px">
          <li><div class="h4" style="font-size:18px">Your bios speak to your audience.</div><p class="p" style="font-size:16.5px">“Women 50+” and “Rewriting your story.” Becoming at 50+ builds right on that.</p></li>
          <li><div class="h4" style="font-size:18px">You already make Monday videos.</div><p class="p" style="font-size:16.5px">“It’s not too late. You can start over at 50+” and “choose yourself” are exactly what Mondays are for.</p></li>
          <li><div class="h4" style="font-size:18px">Your life and style are already on screen.</div><p class="p" style="font-size:16.5px">Fragrance shopping, dinners out, outfits, and travel become your Wednesdays, Fridays, and style posts.</p></li>
          <li><div class="h4" style="font-size:18px">What changes now.</div><p class="p" style="font-size:16.5px">A steady weekly rhythm, so your audience knows what to expect from you.</p></li>
        </ol>
      </div>
      <div style="display:flex;gap:18px;align-items:flex-start">
        <figure style="display:flex;flex-direction:column;gap:10px;align-items:center"><div style="padding:7px;background:var(--ink);border-radius:30px"><img src="photos/kim-tiktok.jpg" alt="Kim’s TikTok profile" style="width:192px;height:389.8px;border-radius:24px"></div><figcaption class="p" style="font-size:13.5px">TikTok</figcaption></figure>
        <figure style="display:flex;flex-direction:column;gap:10px;align-items:center;margin-top:36px"><div style="padding:7px;background:var(--ink);border-radius:30px"><img src="photos/kim-instagram.jpg" alt="Kim’s Instagram profile" style="width:192px;height:389.8px;border-radius:24px"></div><figcaption class="p" style="font-size:13.5px">Instagram</figcaption></figure>
      </div>
    </div>
    <div class="deep" style="margin-top:auto;padding:30px 34px;display:grid;grid-template-columns:250px 1fr;gap:30px;align-items:center">
      <div><div class="label">Your first milestone</div><div style="font:400 50px/1 var(--serif);margin-top:10px">1,000</div><div style="font:500 16px/1.3 var(--sans);margin-top:6px">TikTok followers</div></div>
      <p style="font-size:17.5px;line-height:1.6;color:#F3E6E8">Reaching 1,000 followers is your short-term growth goal, with the plan to apply for TikTok Shop creator access once your account is eligible. It’s a milestone to work toward, not a guarantee of approval, income, or a particular timeline. Consistency and your style posts are how you get there.</p>
    </div>"""))

# 6 · Audience -------------------------------------------------------------------
pages.append(page(6, "Who you’re talking to", """
    """ + eyebrow("03", "Who you’re talking to") + """
    <h2 class="t">Women ready for their <em>next chapter</em></h2>
    <p class="lead">Black women 50+ who are navigating new chapters and discovering new ways to enjoy life, express themselves, stay active, build confidence, and care for themselves.</p>
    <div class="panel" style="margin-top:34px;padding:38px 42px;display:grid;grid-template-columns:1fr 1fr;gap:36px;align-items:center">
      <p style="font:italic 400 44px/1.1 var(--serif);color:var(--deep)">You don’t need to have it all figured out.</p>
      <p style="font-size:18px;line-height:1.65">You’re sharing what you’re learning while you live it. That’s what makes you relatable: women can watch you try things, reflect, and grow, and see room for themselves in the story.</p>
    </div>
    <div class="label" style="margin-top:38px">Why they’ll come back</div>
    <div class="two" style="gap:0 44px;margin-top:6px">
      <div style="padding:16px 0;border-bottom:1px solid var(--line)"><div class="h4">They see real life.</div><p class="p" style="font-size:16.5px">Your routines, outings, and style choices feel reachable, not staged.</p></div>
      <div style="padding:16px 0;border-bottom:1px solid var(--line)"><div class="h4">They leave encouraged.</div><p class="p" style="font-size:16.5px">Your talks offer a perspective they can use the same day.</p></div>
      <div style="padding:16px 0"><div class="h4">They feel invited in.</div><p class="p" style="font-size:16.5px">You ask questions and answer comments, so it feels like a conversation.</p></div>
      <div style="padding:16px 0"><div class="h4">They know what to expect.</div><p class="p" style="font-size:16.5px">A steady weekly rhythm makes you easy to come back to.</p></div>
    </div>
    <div class="card" style="margin-top:auto;padding:22px 26px;display:grid;grid-template-columns:200px 1fr;gap:24px;align-items:baseline">
      <div class="label">Your story, your pace</div>
      <p style="font-size:17px">Your divorce and remarriage are part of your story, and they’re yours to share when they serve a message. You don’t need to keep revisiting them to grow.</p>
    </div>"""))


# 7–8 · Pillars --------------------------------------------------------------------
def pillar(n, cat, name, purpose, subs, img=None, alt="", note="", tile_text=None):
    c = cat_color(cat)
    if img:
        media = f'<figure style="flex:none;display:flex;flex-direction:column;gap:8px"><img src="photos/{img}" alt="{alt}" style="width:132px;height:175.4px;border-radius:12px"><figcaption class="p" style="font-size:13px">From your TikTok</figcaption></figure>'
    else:
        media = f'<figure style="flex:none;display:flex;flex-direction:column;gap:8px"><div style="width:132px;height:175px;border-radius:12px;background:var(--sand);padding:14px;display:flex;flex-direction:column;justify-content:space-between"><span class="label" style="color:{c}">Week 2 · Friday</span><span style="font:400 22px/1.1 var(--serif);color:var(--deep)">{tile_text}</span></div><figcaption class="p" style="font-size:13px">Coming up</figcaption></figure>'
    chips = "".join(f'<span class="chip"><i class="dot" style="background:{c}"></i>{s}</span>' for s in subs)
    note_html = f'<p class="p" style="font-size:15.5px;background:var(--sand);border-radius:10px;padding:10px 14px">{note}</p>' if note else ""
    return f"""
      <article class="card" style="padding:28px 30px;display:flex;flex-direction:column;gap:18px;flex:1">
        <div style="display:flex;gap:26px;align-items:flex-start">
          {media}
          <div>
            <div class="label" style="color:{c}">Pillar {n}</div>
            <h3 class="sub" style="font-size:40px;margin-top:8px">{name}</h3>
            <p class="p" style="margin-top:10px;font-size:18px">{purpose}</p>
          </div>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:8px">{chips}</div>
        {note_html}
      </article>"""


pages.append(page(7, "Your content pillars", """
    """ + eyebrow("04", "Your content pillars") + """
    <h2 class="t">Four pillars, <em>one story</em></h2>
    <p class="lead" style="font-size:20px">Each pillar is a different way into the same message. The subtopics are your idea bank: when you don’t know what to film, pick a pillar, then a subtopic.</p>
    <div style="display:flex;flex-direction:column;gap:18px;margin-top:28px;flex:1">""" +
    pillar(1, "becoming", "Becoming &amp; Confidence", "Give everyday experiences meaning through honest, encouraging conversation.",
           ["Lessons from this chapter", "Choosing yourself", "Permission and new beginnings", "Confidence you can practice"],
           "tile-becoming.jpg", "Kim’s TikTok: It’s not too late. You can start over at 50+") +
    pillar(2, "lifestyle", "Lifestyle, Movement &amp; Joy", "Invite women into the life you’re building in Houston.",
           ["Your Pilates routine and how it feels", "Outings, solo dates, and new places", "Family time and time with your husband", "Real routines and evening resets"],
           "tile-lifestyle.jpg", "Kim’s TikTok: fall fragrance shopping",
           note="<b style=\"font-weight:600;color:var(--ink)\">Keep it personal.</b> Share your own routines and experiences rather than medical or fitness advice.") +
    """
    </div>"""))

pages.append(page(8, "Your content pillars", """
    """ + eyebrow("04", "Your content pillars, continued") + """
    <h2 class="t">Confidence you can <em>see and learn</em></h2>
    <p class="lead" style="font-size:20px">Your style shows who you’re becoming. Your safety education shares what you know. They take turns on Fridays.</p>
    <div style="display:flex;flex-direction:column;gap:18px;margin-top:28px;flex:1">""" +
    pillar(3, "style", "Personal Style", "Let your clothes, accessories, and hair express who you’re becoming.",
           ["Getting dressed for real life", "Date night and occasion looks", "One piece, styled more than one way", "Accessories and genuine finds"],
           "tile-style.jpg", "Kim’s TikTok: an outfit in front of a floral display") +
    pillar(4, "safety", "Women’s Safety &amp; Preparedness", "Introduce your expertise and make safety education feel approachable.",
           ["Your instructor story", "Beginner questions and concerns", "Common misconceptions", "Responsible learning, at a high level"],
           tile_text="Your first safety video") +
    """
    </div>
    <div style="margin-top:20px;display:grid;grid-template-columns:170px repeat(3,1fr);border-top:1px solid var(--line);border-bottom:1px solid var(--line)">
      <div class="label" style="padding:16px 0">Where each pillar lives</div>
      <div style="padding:14px 18px;border-left:1px solid var(--line)"><div class="sub" style="font-size:26px">Monday</div><p class="p" style="font-size:15px">Becoming &amp; Confidence</p></div>
      <div style="padding:14px 18px;border-left:1px solid var(--line)"><div class="sub" style="font-size:26px">Wednesday</div><p class="p" style="font-size:15px">Lifestyle, with style moments</p></div>
      <div style="padding:14px 18px;border-left:1px solid var(--line)"><div class="sub" style="font-size:26px">Friday</div><p class="p" style="font-size:15px">Style and Safety, alternating</p></div>
    </div>"""))

# 9 · Style every week ----------------------------------------------------------------
pages.append(page(9, "Your style, every week", """
    """ + eyebrow("05", "Your style, every week") + """
    <h2 class="t">Show your taste, <em>every week</em></h2>
    <p class="lead" style="font-size:21px">Your outfits, accessories, and genuine finds show people your taste. Over time, they teach your audience what they can trust you to recommend.</p>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:28px">
      <figure><img src="photos/tile-style.jpg" alt="Kim in a grey jumpsuit in front of a floral display" style="width:100%;height:376px;object-fit:fill;border-radius:14px"></figure>
      <figure><img src="photos/ig-glasses-orange.jpg" alt="Kim in amber sunglasses and hoop earrings" style="width:100%;height:376px;border-radius:14px"></figure>
      <figure><img src="photos/kim-cover.jpg" alt="Kim in a print dress with a gold chain and crossbody bag" style="width:100%;height:376px;border-radius:14px;object-fit:cover;object-position:center 30%"></figure>
    </div>
    <p class="p" style="font-size:14.5px;margin-top:10px">From your TikTok and Instagram. Sunglasses, hoops, gold chains, and statement bags are already part of your look.</p>
    <div class="two" style="margin-top:22px;align-items:stretch">
      <div class="card" style="padding:24px 26px">
        <div class="label">How style shows up</div>
        <ul class="rows" style="margin-top:8px">
          <li style="font-size:16.5px"><b style="font-weight:600">Weeks 1 and 3:</b> a dedicated Friday style video.</li>
          <li style="font-size:16.5px"><b style="font-weight:600">Weeks 2 and 4:</b> a short style moment inside Wednesday’s lifestyle vlog.</li>
          <li style="font-size:16.5px"><b style="font-weight:600">Every week:</b> an optional Thursday post for an outfit, accessory, or genuine find.</li>
        </ul>
      </div>
      <div class="panel" style="padding:24px 26px;display:flex;flex-direction:column;gap:12px">
        <div class="label">Capture it where you already are</div>
        <div style="display:flex;flex-wrap:wrap;gap:8px"><span class="chip" style="background:var(--paper)">Before work</span><span class="chip" style="background:var(--paper)">Before Pilates</span><span class="chip" style="background:var(--paper)">Before dinner</span><span class="chip" style="background:var(--paper)">Before an outing</span></div>
        <p style="font-size:16.5px">A style moment takes a minute by the mirror or the door. It fits into your day; it doesn’t need its own production day.</p>
        <p style="font-size:16.5px"><b style="font-weight:600">Short on time?</b> A photo carousel of the outfit or the find works for your optional Thursday post.</p>
      </div>
    </div>"""))

# 10 · Weekly rhythm -----------------------------------------------------------------
def rhythm_core(day, cat, series, fmt, text, extra=""):
    c = cat_color(cat)
    return f"""
      <div class="card" style="padding:26px 26px 24px;display:flex;flex-direction:column;gap:10px;border-top:4px solid {c}">
        <div style="display:flex;justify-content:space-between;align-items:center"><span class="sub" style="font-size:34px">{day}</span><span class="pill core" style="--c:{c}">Core</span></div>
        <div class="h4" style="font-size:19px">{series}</div>
        <div class="p" style="font-size:15px">{fmt}</div>
        <p style="font-size:16.5px;line-height:1.5">{text}</p>
        {extra}
      </div>"""


pages.append(page(10, "Your weekly rhythm", """
    """ + eyebrow("06", "Your weekly rhythm") + """
    <h2 class="t">Three core posts. <em>Two optional.</em></h2>
    <p class="lead" style="font-size:21px">Three posts a week is your baseline. The fourth and fifth are there when you have the material and the energy. They’re never required.</p>
    <div class="three" style="margin-top:30px">""" +
    rhythm_core("Monday", "becoming", "Becoming at 50+", "Talk to camera",
                "A motivational conversation built around one idea from this chapter of your life.") +
    rhythm_core("Wednesday", "lifestyle", "Living This New Chapter", "Mini vlog",
                "A short look at something you’re already doing, with a reflection at the end.",
                '<p class="p" style="font-size:15px">Weeks 2 and 4 include a quick style moment.</p>') +
    rhythm_core("Friday", "style", "Confidence in Practice", "Style or safety",
                "Personal style in weeks 1 and 3. Women’s safety education in weeks 2 and 4.") +
    """
    </div>
    <div class="two" style="margin-top:18px">
      <div class="opt"><div class="top"><span class="day">Thursday</span><span class="pill optl" style="--c:var(--c-style)">Optional</span></div><div class="title">A style post</div><p style="font-size:16px">An outfit, an accessory, or a genuine find. A photo carousel works too.</p></div>
      <div class="opt"><div class="top"><span class="day">Saturday</span><span class="pill optl" style="--c:var(--rose-deep)">Optional</span></div><div class="title">An audience reply</div><p style="font-size:16px">Answer a comment or question, or share one more relevant idea.</p></div>
    </div>
    <div class="panel sand" style="margin-top:18px;padding:18px 24px;display:flex;gap:18px;align-items:baseline">
      <span class="h4" style="font-size:17px;flex:none">Tuesday and Sunday</span><span style="font-size:16.5px">Open days for filming, editing, or rest.</span>
    </div>
    <div class="label" style="margin-top:34px">A typical week</div>
    <div class="week-strip" style="margin-top:12px">
      <div style="background:var(--c-becoming);color:#fff"><b>Mon</b><span>Core</span></div>
      <div style="background:var(--paper);border:1px solid var(--line);color:var(--muted)"><b>Tue</b><span>Open</span></div>
      <div style="background:var(--c-lifestyle);color:#fff"><b>Wed</b><span>Core</span></div>
      <div style="border:1.5px dashed var(--c-style);color:var(--c-style);background:var(--paper)"><b>Thu</b><span>Optional</span></div>
      <div style="background:var(--c-style);color:#fff"><b>Fri</b><span>Core</span></div>
      <div style="border:1.5px dashed var(--rose-deep);color:var(--rose-deep);background:var(--paper)"><b>Sat</b><span>Optional</span></div>
      <div style="background:var(--paper);border:1px solid var(--line);color:var(--muted)"><b>Sun</b><span>Open</span></div>
    </div>
    <p class="p" style="margin-top:auto;font-size:16px">The days organize your workflow. They aren’t a claim about the best times to post; we’ll learn when your audience is most active as the month goes on.</p>"""))


# 11 · Calendar ------------------------------------------------------------------------
def ev_core(p):
    c = cat_color(p["cat"])
    sm = '<span class="sm">+ Style moment</span>' if p.get("style") else ""
    return f'<div class="ev core" style="--c:{c}"><span class="k">Core</span><span class="ti">{p["short"]}</span>{sm}<span class="ct">{CATS[p["cat"]][0]}</span></div>'


def ev_opt(p):
    c = cat_color(p["cat"])
    kind = "Style" if p["cat"] == "style" else ("Reply" if p["kind"] == "Audience reply" else "Extra")
    return f'<div class="ev opt" style="--c:{c}"><span class="k">Optional</span><span class="ti">{p["short"]}</span><span class="ct">{kind}</span></div>'


cal_rows = []
for w in WEEKS:
    c = {p["day"]: p for p in w["core"]}
    o = {p["day"]: p for p in w["opt"]}
    cells = [
        f'<div class="wkl"><b>Week {w["n"]}</b><i>{w["theme"]} {w["em"]}</i></div>',
        f'<div>{ev_core(c["Monday"])}</div>',
        '<div><div class="open"><b>Open</b><span>Film, edit, or rest</span></div></div>',
        f'<div>{ev_core(c["Wednesday"])}</div>',
        f'<div>{ev_opt(o["Thursday"])}</div>',
        f'<div>{ev_core(c["Friday"])}</div>',
        f'<div>{ev_opt(o["Saturday"])}</div>',
        '<div><div class="open"><b>Open</b><span>Film, edit, or rest</span></div></div>',
    ]
    cal_rows.append('<div class="cal-grid cal-row">' + "".join(cells) + "</div>")

pages.append(page(11, "Your month at a glance", """
    """ + eyebrow("07", "Your month at a glance") + """
    <h2 class="t">Your month <em>at a glance</em></h2>
    <p class="lead" style="font-size:21px;margin-top:14px"><b style="font-weight:600">Start with three posts each week. Add a fourth or fifth when your schedule allows.</b></p>
    <div class="legend" style="margin-top:22px">
      <span><i class="sw" style="background:var(--c-becoming)"></i>Becoming</span>
      <span><i class="sw" style="background:var(--c-lifestyle)"></i>Lifestyle</span>
      <span><i class="sw" style="background:var(--c-style)"></i>Style</span>
      <span><i class="sw" style="background:var(--c-safety)"></i>Safety</span>
      <i class="sep"></i>
      <span><i class="core"></i>Core</span>
      <span><i class="optn"></i>Optional</span>
    </div>
    <div class="cal" style="margin-top:20px">
      <div class="cal-grid cal-head"><div class="wk">Week</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div><div>Sun</div></div>
""" + "\n".join(cal_rows) + """
    </div>
    <p class="p" style="margin-top:auto;font-size:15.5px">The full details for every post, with opening lines and what to capture, are on pages 12 to 15.</p>""", "sand"))


# 12–15 · Weekly plans ---------------------------------------------------------------------
def core_card(p):
    c = cat_color(p["cat"])
    items = "".join(f"<li>{i}</li>" for i in p["items"])
    style = f'<div class="stylem"><b>Style moment</b><span>{p["style"]}</span></div>' if p.get("style") else ""
    return f"""
      <article class="card post" style="--c:{c}">
        <div class="top">
          <span class="day">{p["day"]}</span>
          <span class="pill core" style="--c:{c}">Core</span>
          <span class="cat">{CATS[p["cat"]][0]}</span>
          <span class="fmt"><b>Format:</b> {p["fmt"]}</span>
        </div>
        <div class="title">{p["title"]}</div>
        <div class="grid">
          <div><div class="k">Open with</div><p class="quote">“{p["open"]}”</p><p class="ask"><b>Invite</b>{p["ask"]}</p></div>
          <div><div class="k">{p["k"]}</div><ul>{items}</ul></div>
        </div>
        {style}
      </article>"""


def opt_card(p):
    c = cat_color(p["cat"])
    note = f'<span class="note">{p["note"]}</span>' if p["note"] else ""
    return f"""
      <div class="opt">
        <div class="top"><span class="day">{p["day"]}</span><span class="pill optl" style="--c:{c}">Optional</span><span class="label" style="color:{c};margin-left:auto">{p["kind"]}</span></div>
        <div class="title">{p["title"]}</div>
        {note}
      </div>"""


for i, w in enumerate(WEEKS):
    num = FIRST_WEEK_PAGE + i
    cores = "".join(core_card(p) for p in w["core"])
    opts = "".join(opt_card(p) for p in w["opt"])
    pages.append(page(num, f"Week {w['n']} of 4", f"""
    {eyebrow("08", f"Your four-week plan · Week {w['n']}")}
    <div class="wk-top">
      <h2 class="t">{w["theme"]} <em>{w["em"]}</em></h2>
      <div class="wk-count"><span class="a">3 core posts</span><span class="b">2 optional</span></div>
    </div>
    <p class="p" style="font-size:18px;margin-top:10px">{w["intent"]}</p>
    <div style="display:flex;flex-direction:column;gap:10px;margin-top:16px">{cores}
    </div>
    <div class="label" style="margin-top:16px;color:var(--muted)">If you have the time and the footage</div>
    <div class="opts" style="margin-top:10px">{opts}
    </div>"""))

# 16 · Safety ----------------------------------------------------------------------------
pages.append(page(16, "Women’s safety education", """
    """ + eyebrow("09", "Women’s safety education") + """
    <h2 class="t">Approachable, responsible, <em>and yours</em></h2>
    <div style="display:grid;grid-template-columns:1.05fr .95fr;gap:40px;margin-top:28px;align-items:start">
      <div style="display:flex;flex-direction:column;gap:16px">
        <p style="font-size:21px;line-height:1.55">Your firearm instructor background is an important part of your expertise. Your Houston business is still being established, so this month is about introduction, not promotion.</p>
        <p class="p">The goal: help women get to know your perspective and your teaching approach, address beginner concerns, and make the subject feel approachable.</p>
      </div>
      <div class="deep" style="padding:28px 30px;display:flex;flex-direction:column;gap:10px">
        <div class="label">This month</div>
        <h3 class="sub" style="font-size:34px;color:#FBF3EF">Talk to the camera</h3>
        <p class="p" style="font-size:16.5px">Your story, your perspective, and the questions beginners have are enough. Class footage can become content once your Houston business is operating.</p>
      </div>
    </div>
    <div class="label" style="margin-top:32px">Topics to grow into</div>
    <ol style="display:grid;grid-template-columns:1fr 1fr;column-gap:40px;margin-top:6px">
      <li style="display:grid;grid-template-columns:40px 1fr;padding:13px 0;border-top:1px solid var(--line);font-size:17.5px"><span style="font:400 24px/1 var(--serif);color:var(--rose-deep)">01</span><span>Your instructor story and your qualifications, stated accurately</span></li>
      <li style="display:grid;grid-template-columns:40px 1fr;padding:13px 0;border-top:1px solid var(--line);font-size:17.5px"><span style="font:400 24px/1 var(--serif);color:var(--rose-deep)">02</span><span>Common concerns beginners have</span></li>
      <li style="display:grid;grid-template-columns:40px 1fr;padding:13px 0;border-top:1px solid var(--line);font-size:17.5px"><span style="font:400 24px/1 var(--serif);color:var(--rose-deep)">03</span><span>Misconceptions about women and firearm education</span></li>
      <li style="display:grid;grid-template-columns:40px 1fr;padding:13px 0;border-top:1px solid var(--line);font-size:17.5px"><span style="font:400 24px/1 var(--serif);color:var(--rose-deep)">04</span><span>What responsible ownership involves, at a high level</span></li>
      <li style="display:grid;grid-template-columns:40px 1fr;padding:13px 0;border-top:1px solid var(--line);border-bottom:1px solid var(--line);font-size:17.5px"><span style="font:400 24px/1 var(--serif);color:var(--rose-deep)">05</span><span>Why safe storage and ongoing education matter</span></li>
      <li style="display:grid;grid-template-columns:40px 1fr;padding:13px 0;border-top:1px solid var(--line);border-bottom:1px solid var(--line);font-size:17.5px"><span style="font:400 24px/1 var(--serif);color:var(--rose-deep)">06</span><span>An introduction to firearm care, from you as a qualified instructor</span></li>
    </ol>
    <div class="two" style="margin-top:auto">
      <div class="panel" style="padding:24px 26px;display:flex;flex-direction:column;gap:10px">
        <div class="label">Invitations that fit right now</div>
        <p class="quote" style="font-size:22px">“What would you want to learn first?”</p>
        <p class="quote" style="font-size:22px">“Would you like updates when I start offering classes in Houston?”</p>
        <p class="p" style="font-size:15px">Invite interest in what’s coming, without suggesting classes are open for booking yet.</p>
      </div>
      <div class="card" style="padding:24px 26px;display:flex;flex-direction:column;gap:10px">
        <div class="label">Keep it educational</div>
        <ul class="rows" style="font-size:16px;line-height:1.45">
          <li>These are content topics, not technical or weapon-handling instruction.</li>
          <li>Plan and verify any future care demonstration yourself, using the manufacturer’s guidance.</li>
          <li>Check each platform’s current rules on firearm-related content before posting.</li>
        </ul>
      </div>
    </div>"""))

# 17 · Filming ----------------------------------------------------------------------------
def rl(h, p):
    return f'<li><div class="h4" style="font-size:18px">{h}</div><p class="p" style="font-size:16px">{p}</p></li>'


pages.append(page(17, "Filming and editing", """
    """ + eyebrow("10", "Filming and editing made simple") + """
    <h2 class="t">Keep it focused. <em>Keep it you.</em></h2>
    <div class="two" style="margin-top:32px">
      <div class="card" style="padding:26px 28px">
        <div class="label">Mondays and safety Fridays</div>
        <h3 class="sub" style="font-size:36px;margin:8px 0 12px">Camera talks</h3>
        <ul class="rows">""" +
    rl("Begin with your main point.", "Skip the long introduction. Your first sentence is the reason to keep watching.") +
    rl("One idea per video.", "If you have a second idea, save it for another week.") +
    rl("Sound like yourself.", "You’re already comfortable on camera. Editing should tighten you, not change you.") +
    rl("Test 30 to 60 seconds.", "Go longer when the story genuinely needs it.") + """
        </ul>
      </div>
      <div class="card" style="padding:26px 28px">
        <div class="label">Wednesdays</div>
        <h3 class="sub" style="font-size:36px;margin:8px 0 12px">Mini vlogs</h3>
        <ul class="rows">""" +
    rl("A beginning.", "Set up the moment in a sentence: where you are, or what you almost didn’t do.") +
    rl("An experience.", "Short clips of the activity itself.") +
    rl("A reflection.", "One honest thought at the end that ties it back to this chapter.") +
    rl("Three kinds of shots.", "A wider view, a detail, and you taking part.") + """
        </ul>
      </div>
    </div>
    <div class="three" style="margin-top:22px;gap:0;border-top:1px solid var(--line);border-bottom:1px solid var(--line)">
      <div style="padding:20px 20px 20px 0"><div class="h4" style="font-size:18px">Trim the extras</div><p class="p" style="font-size:16px">Cut repetition, long pauses, and unnecessary setup.</p></div>
      <div style="padding:20px;border-left:1px solid var(--line)"><div class="h4" style="font-size:18px">Caption clearly</div><p class="p" style="font-size:16px">Readable captions, placed where they don’t cover your face.</p></div>
      <div style="padding:20px 0 20px 20px;border-left:1px solid var(--line)"><div class="h4" style="font-size:18px">Keep music low</div><p class="p" style="font-size:16px">Your voice should always be easy to hear.</p></div>
    </div>
    <div class="panel" style="margin-top:auto;padding:22px 26px;display:grid;grid-template-columns:repeat(3,1fr);gap:24px">
      <div><div class="label">Record vertically</div><p style="font-size:16px;margin-top:6px">Hold your phone upright for every clip.</p></div>
      <div><div class="label">Wipe your lens</div><p style="font-size:16px;margin-top:6px">A quick clean before you film makes a visible difference.</p></div>
      <div><div class="label">Face your light</div><p style="font-size:16px;margin-top:6px">Use window light or your own light, in front of you.</p></div>
    </div>"""))

# 18 · Vlog ---------------------------------------------------------------------------------
def beat(n, name, title, say, text, bg="var(--paper)"):
    return f"""
      <div style="background:{bg};padding:36px 30px;display:flex;flex-direction:column;gap:14px">
        <div style="display:flex;align-items:baseline;gap:12px"><span style="font:400 64px/.8 var(--serif);color:var(--rose-deep)">{n}</span><span class="label" style="color:var(--muted)">{name}</span></div>
        <div class="h4">{title}</div>
        <p class="quote" style="font-size:25px">“{say}”</p>
        <p class="p" style="font-size:17px">{text}</p>
      </div>"""


pages.append(page(18, "One vlog, start to finish", """
    """ + eyebrow("11", "One vlog, start to finish") + """
    <h2 class="t">The Pilates you <em>almost skipped</em></h2>
    <p class="lead" style="font-size:21px">Here’s how a single after-work Pilates class becomes a complete mini vlog, in three short beats.</p>
    <div style="margin-top:30px;display:grid;grid-template-columns:repeat(3,1fr);border:1px solid var(--line);border-radius:18px;overflow:hidden">""" +
    beat("1", "Beginning", "Almost skipping", "I almost talked myself out of Pilates today.", "One quick clip after work. Be honest about the tired part.") +
    beat("2", "Experience", "Choosing to go", "But I went anyway.", "Your outfit on the way in, a detail or two, and a few seconds of you in class, filmed with the studio’s permission.", "var(--sand)") +
    beat("3", "Reflection", "How it felt after", "Here’s why I’m glad I came.", "One short clip afterward, in your own words. That’s your ending.", "var(--blush)") + """
    </div>
    <div style="margin-top:24px;display:grid;grid-template-columns:180px repeat(3,1fr);border-top:1px solid var(--line);border-bottom:1px solid var(--line)">
      <div class="label" style="padding:18px 0">Your shot recipe</div>
      <div style="padding:16px 18px;border-left:1px solid var(--line)"><div class="h4" style="font-size:18px">Wide</div><p class="p" style="font-size:15.5px">The studio, the street, or the room you’re in.</p></div>
      <div style="padding:16px 18px;border-left:1px solid var(--line)"><div class="h4" style="font-size:18px">Detail</div><p class="p" style="font-size:15.5px">Your mat, your shoes, your outfit.</p></div>
      <div style="padding:16px 18px;border-left:1px solid var(--line)"><div class="h4" style="font-size:18px">You</div><p class="p" style="font-size:15.5px">Taking part, not just narrating.</p></div>
    </div>
    <div class="two" style="margin-top:auto">
      <div class="card" style="padding:24px 26px"><div class="label">Your setup today</div><p style="font-size:17.5px;margin-top:8px">Your phone and the light you already own are enough to start. Film near a window when you can.</p></div>
      <div class="card" style="padding:24px 26px"><div class="label">A microphone</div><p style="font-size:17.5px;margin-top:8px">I’m considering the DJI Mic Mini for you. Before buying, we’ll confirm the right connection for your phone.</p></div>
    </div>"""))

# 19 · Workflow -----------------------------------------------------------------------------
def step(when, small, title, text):
    return f"""
      <li style="display:grid;grid-template-columns:240px 1fr;gap:28px;padding:28px 0;border-top:1px solid var(--line)">
        <div><div class="sub" style="font-size:30px">{when}</div><div class="p" style="font-size:14.5px;margin-top:4px">{small}</div></div>
        <div><div class="h4">{title}</div><p style="font-size:17.5px;margin-top:4px">{text}</p></div>
      </li>"""


pages.append(page(19, "Your weekly workflow", """
    """ + eyebrow("12", "A realistic weekly workflow") + """
    <h2 class="t">Made to fit <em>a full-time life</em></h2>
    <ol style="margin-top:28px;border-bottom:1px solid var(--line)">""" +
    step("The weekend", "About 45 to 60 minutes", "One filming session", "Record Monday’s camera talk and Friday’s video back to back, while your setup is already in place.") +
    step("During the week", "A few minutes at a time", "Capture as you live", "Film short clips during something you already planned: Pilates, an outing, an evening at home. Grab your style moment on the way out the door.") +
    step("One evening", "A short session", "Edit your vlog", "Assemble Wednesday’s clips, trim them, and add captions, separate from your filming day.") +
    step("Always", "Your backup plan", "Save your extras", "Keep leftover clips and outfit photos in an album for optional posts, or for a busy week when filming isn’t possible.") + """
    </ol>
    <div class="panel" style="margin-top:auto;padding:30px 32px">
      <div class="label">Work smarter</div>
      <h3 class="sub" style="font-size:42px;margin-top:8px">One outing, <em>three posts</em></h3>
      <div class="three" style="margin-top:20px;gap:14px">
        <div class="card" style="padding:20px 22px"><div class="label" style="color:var(--c-style)">Before you leave</div><div class="h4" style="margin-top:6px">An outfit post</div><p class="p" style="font-size:15.5px;margin-top:4px">Show the look you chose and why.</p></div>
        <div class="card" style="padding:20px 22px"><div class="label" style="color:var(--c-lifestyle)">While you’re out</div><div class="h4" style="margin-top:6px">A lifestyle vlog</div><p class="p" style="font-size:15.5px;margin-top:4px">Wide, detail, and you, enjoying it.</p></div>
        <div class="card" style="padding:20px 22px"><div class="label" style="color:var(--c-becoming)">Afterward</div><div class="h4" style="margin-top:6px">A reflection</div><p class="p" style="font-size:15.5px;margin-top:4px">One thought the day gave you.</p></div>
      </div>
    </div>"""))

# 20 · Trust ---------------------------------------------------------------------------------
def rung(n, title, text, indent, last=False):
    bg = "background:var(--deep);color:#FBF3EF;border:0" if last else ""
    pc = "color:#E8D9DD" if last else ""
    return f"""
      <li class="card" style="margin-left:{indent}px;padding:18px 24px;display:grid;grid-template-columns:48px 1fr;gap:16px;align-items:baseline;{bg}">
        <span style="font:400 38px/1 var(--serif);color:{'#E9B9AF' if last else 'var(--rose-deep)'}">{n}</span>
        <div><div class="h4" style="{'color:#FBF3EF' if last else ''}">{title}</div><p class="p" style="font-size:16px;{pc}">{text}</p></div>
      </li>"""


pages.append(page(20, "Trust before monetization", """
    """ + eyebrow("13", "Build trust before monetization") + """
    <h2 class="t">Recommendations start <em>with trust</em></h2>
    <p class="lead" style="font-size:20.5px">People buy what you recommend when they already believe you. That belief comes from watching you genuinely use and enjoy what you share, which is why style shows up every week.</p>
    <ol style="margin-top:26px;display:flex;flex-direction:column;gap:10px">""" +
    rung(1, "Show what you use", "Clothing, accessories, and everyday products that are really part of your life.", 0) +
    rung(2, "Let it appear naturally", "In your outfits, routines, and vlogs, without a sales pitch.", 36) +
    rung(3, "Notice the questions", "“Where’s that from?” is a signal. Keep a running list of what people ask about.", 72) +
    rung(4, "Recommend, when it fits", "Later, through TikTok Shop or other ways, for items your audience already trusts you on.", 108, True) + """
    </ol>
    <div class="panel" style="margin-top:22px;padding:24px 28px;display:grid;grid-template-columns:200px 1fr;gap:26px;align-items:center">
      <div><div class="label">Your milestone</div><div style="font:400 44px/1 var(--serif);color:var(--deep);margin-top:8px">1,000</div><div style="font:500 15px/1.3 var(--sans);margin-top:4px">TikTok followers</div></div>
      <p style="font-size:17px;line-height:1.6">Your short-term goal is 1,000 TikTok followers, then applying for TikTok Shop creator access once your account is eligible. TikTok sets and changes the requirements, so we’ll confirm what’s current before you apply. Reaching the milestone doesn’t guarantee approval, income, or a timeline.</p>
    </div>
    <div class="two" style="margin-top:auto">
      <div class="card" style="padding:22px 26px"><div class="label">About TikTok Shop</div><p style="font-size:16.5px;margin-top:8px">It’s a future opportunity, not a guaranteed income. Until then, every genuine recommendation builds the trust it depends on.</p></div>
      <div class="card" style="padding:22px 26px"><div class="label">About replacing your income</div><p style="font-size:16.5px;margin-top:8px">That’s a longer-term business goal. It comes from consistent revenue over time, not from reaching a particular follower count.</p></div>
    </div>"""))

# 21 · Review ---------------------------------------------------------------------------------
def q(n, text, hint=""):
    h = f'<p class="p" style="font-size:15.5px;margin-top:2px">{hint}</p>' if hint else ""
    return f"""
      <li style="display:grid;grid-template-columns:44px 1fr;gap:14px;padding:18px 0;border-top:1px solid var(--line)">
        <span style="font:400 30px/1 var(--serif);color:var(--rose-deep)">{n}</span>
        <div><div class="h4">{text}</div>{h}<div style="height:34px;border-bottom:1px solid var(--blush2)"></div></div>
      </li>"""


pages.append(page(21, "Your first-month review", """
    """ + eyebrow("14", "Your first-month review") + """
    <h2 class="t">Look back <em>before you plan ahead</em></h2>
    <p class="lead" style="font-size:20.5px">At the end of the month, set aside some quiet time with your TikTok analytics and these questions.</p>
    <div class="card" style="margin-top:26px;padding:24px 28px;display:grid;grid-template-columns:1fr 1fr;gap:28px">
      <div><div class="label">Starting TikTok followers</div><div style="height:46px;border-bottom:1.5px solid var(--rose);margin-top:6px"></div></div>
      <div><div class="label">Ending TikTok followers</div><div style="height:46px;border-bottom:1.5px solid var(--rose);margin-top:6px"></div></div>
    </div>
    <ol style="margin-top:14px;border-bottom:1px solid var(--line)">""" +
    q(1, "Which posts generated new followers?") +
    q(2, "Which prompted meaningful comments or shares?") +
    q(3, "Which generated outfit, accessory, or product questions?", "These point toward your future recommendations.") +
    q(4, "Which generated interest in safety education?") +
    q(5, "Did three posts a week feel sustainable?", "What you can keep doing matters as much as what performs.") + """
    </ol>
    <div class="deep" style="margin-top:auto;padding:26px 30px;display:grid;grid-template-columns:280px 1fr;gap:28px;align-items:center">
      <div style="font:400 36px/1.1 var(--serif)">Then, <em style="color:#E9B9AF">repeat what worked.</em></div>
      <p style="font-size:17px;line-height:1.6;color:#F3E6E8">Your answers shape Months 2 and 3. We’ll keep and improve your strongest formats and plan the next two months together once this review is done.</p>
    </div>"""))

# 22 · Close ------------------------------------------------------------------------------------
def first(n, title, text):
    return f"""
      <div class="card" style="padding:26px 24px;display:flex;flex-direction:column;gap:10px">
        <span style="font:400 54px/.9 var(--serif);color:var(--rose-deep)">{n}</span>
        <div class="h4">{title}</div>
        <p class="p" style="font-size:16.5px">{text}</p>
      </div>"""


pages.append(page(22, "Your first three steps", """
    """ + eyebrow("15", "Your first three steps") + """
    <div style="display:grid;grid-template-columns:1fr 290px;gap:40px;align-items:center;margin-top:18px">
      <div>
        <h2 class="t" style="font-size:96px;margin-top:0">Kim, <em>just begin.</em></h2>
        <p style="font-size:20px;line-height:1.6;margin-top:24px">You bring warmth, style, and real conversation to the camera, and you’re living a chapter many women are curious about. This month isn’t about getting everything right. It’s about showing up three times a week and learning what feels most like you.</p>
      </div>
      <img src="photos/kim-close.jpg" alt="Kim LaShawn smiling" style="width:290px;height:290px;border-radius:50%;border:8px solid var(--blush)">
    </div>
    <div class="three" style="margin-top:44px">""" +
    first("1", "Choose your filming window", "Pick one 45 to 60 minute block this weekend and put it on your calendar.") +
    first("2", "Record your first conversation", "“What becoming at 50 means to me.” One take is a fine place to start.") +
    first("3", "Choose one ordinary activity", "Something already on your schedule becomes your first vlog. Grab an outfit moment on the way out.") + """
    </div>
    <div class="card" style="margin-top:28px;padding:24px 28px">
      <div class="label">What to film first: Week 1</div>
      <div class="three" style="margin-top:12px;gap:24px">
        <div><div class="sub" style="font-size:26px">Monday</div><p style="font-size:16.5px;margin-top:4px">What becoming at 50 means to me</p></div>
        <div><div class="sub" style="font-size:26px">Wednesday</div><p style="font-size:16.5px;margin-top:4px">A day building my new life in Houston</p></div>
        <div><div class="sub" style="font-size:26px">Friday</div><p style="font-size:16.5px;margin-top:4px">Getting dressed for this version of me</p></div>
      </div>
    </div>
    <div style="margin-top:auto;display:flex;justify-content:space-between;align-items:flex-end;border-top:1px solid var(--blush2);padding-top:28px">
      <div><div style="font:italic 400 46px/1 var(--serif);color:var(--deep)">Stephen Michael</div><div class="p" style="font-size:15px;margin-top:8px">Your content coach · Shooting Stars Content Academy</div></div>
      <img src="logo-deep.png" alt="Shooting Stars Content Academy" style="width:170px">
    </div>""", "blush"))

# ---------------------------------------------------------------- write
doc = f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Becoming at 50+ · Kim LaShawn</title>
<link rel="stylesheet" href="fonts/fonts.css">
<style>{CSS}</style>
</head>
<body>
{"".join(pages)}
</body>
</html>
"""
OUT.write_text(doc)
core = sum(len(w["core"]) for w in WEEKS)
opt = sum(len(w["opt"]) for w in WEEKS)
style_weeks = sum(any(p["cat"] == "style" or p.get("style") for p in w["core"]) for w in WEEKS)
print(f"wrote {OUT.name}: {len(pages)} pages, {core} core, {opt} optional, style in core content {style_weeks}/4 weeks")
