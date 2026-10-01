#!/usr/bin/env python3
"""Builds build/artifact.html: the deck as a single web page for sharing.
Fonts and photos are inlined, and each 1080x1350 page
is scaled to fit the viewer's width so it reads on a phone."""
import base64, pathlib, re
root = pathlib.Path(__file__).resolve().parent.parent
s = (root / "kim-lashawn-first-30-days.html").read_text()

title = re.search(r"<title>.*?</title>", s).group(0)
style = re.search(r"<style>(.*?)</style>", s, re.S).group(1)
body = re.search(r"<body>(.*)</body>", s, re.S).group(1)

style = style.replace("html,body{background:#D8CCC4}", "")
def inline(m):
    f = root / m.group(1)
    mime = "image/png" if f.suffix == ".png" else "image/jpeg"
    return f'src="data:{mime};base64,' + base64.b64encode(f.read_bytes()).decode() + '"'
body = re.sub(r'src="((?:photos/|logo)[^"]+)"', inline, body)
body = re.sub(r'(<section class="page[^"]*">.*?</section>)', r'<div class="frame">\1</div>', body, flags=re.S)

web = """
:root{--ground:#E6DCD5;--ground-ink:#5B4552;color-scheme:light}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){--ground:#1E1519;--ground-ink:#C9B3BD;color-scheme:dark}}
:root[data-theme="dark"]{--ground:#1E1519;--ground-ink:#C9B3BD;color-scheme:dark}
html,body{background:var(--ground)}
body{padding-block:32px 48px;padding-inline:16px;color:var(--ground-ink)}
.deck{display:flex;flex-direction:column;align-items:center;gap:28px}
.frame{--s:1;width:calc(1080px*var(--s));height:calc(1350px*var(--s));max-width:100%;border-radius:calc(14px*var(--s));overflow:hidden;box-shadow:0 10px 40px rgba(40,20,32,.18)}
.frame .page{margin:0;transform:scale(var(--s));transform-origin:top left}
"""
script = """<script>
(function(){
  function fit(){
    var w=Math.min(1080,document.querySelector('.deck').clientWidth);
    var s=w/1080;
    document.querySelectorAll('.frame').forEach(function(f){f.style.setProperty('--s',s)});
  }
  fit(); window.addEventListener('resize',fit);
  if(document.fonts&&document.fonts.ready) document.fonts.ready.then(fit);
})();
</script>"""
# Fonts inlined as data URIs so the page never depends on a font fetch.
fcss = (root / "fonts" / "fonts.css").read_text()
fcss = re.sub(r"url\('([^']+\.woff2)'\)", lambda m: "url(data:font/woff2;base64," + base64.b64encode((root / "fonts" / m.group(1)).read_bytes()).decode() + ") format('woff2')", fcss)
fonts = f"<style>{fcss}</style>"
out = f"{title}\n{fonts}\n<style>{style}{web}</style>\n<div class=\"deck\">{body}</div>\n{script}\n"
(root / "build").mkdir(exist_ok=True)
(root / "build" / "artifact.html").write_text(out)
print(f"{len(out)//1024}KB")
