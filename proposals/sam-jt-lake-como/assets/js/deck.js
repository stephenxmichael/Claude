/* Sam & JT · Lake Como · deck engine
   Renders every slide from window.CONTENT, then runs navigation, motion,
   video and the interactive pieces. Copy and media live in content.js. */
(() => {
  "use strict";

  const C = window.CONTENT;
  const M = C.media || {};
  const gsap = window.gsap;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ------------------------------------------------------------ helpers */
  const esc = (s = "") => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  // Escapes text and outlines any [BRACKETED] placeholder so it can't be missed.
  const t = (s = "") => esc(s).replace(/\[([^\]]+)\]/g, '<span class="flag">[$1]</span>');
  const money = (n) => "$" + Number(n).toLocaleString("en-US");
  const words = (s, cls = "w") => esc(s).split(/(\s+)/).map((p) => (/^\s+$/.test(p) || !p ? p : `<span class="${cls}">${p}</span>`)).join("");
  const pad = (n) => String(n).padStart(2, "0");

  const ICON = {
    prev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>',
    next: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    play: '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true"><circle cx="20" cy="20" r="19"/><path d="M16 13.5v13l10-6.5z" fill="currentColor" stroke="none"/></svg>',
    image: '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true"><rect x="4" y="8" width="32" height="24" rx="1"/><path d="M4 27l9-8 7 6 5-4 11 8"/><circle cx="27" cy="15" r="2.5"/></svg>',
    muted: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M17 9l5 6M22 9l-5 6"/></svg>',
    sound: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M17 8.5a5 5 0 0 1 0 7M19.5 6a8.5 8.5 0 0 1 0 12"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.4"/></svg>',
    ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".9" fill="currentColor"/></svg>',
    stay: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.1" aria-hidden="true"><path d="M4 24V9M4 18h24v6M28 18v-3a4 4 0 0 0-4-4H14v7"/><circle cx="9" cy="14" r="2.5"/></svg>',
    car: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.1" aria-hidden="true"><path d="M5 20v-4l3-6h16l3 6v4z"/><path d="M5 20v3h3v-3M24 20v3h3v-3M5 16h22"/><circle cx="10" cy="18" r=".8" fill="currentColor"/><circle cx="22" cy="18" r=".8" fill="currentColor"/></svg>',
    meal: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.1" aria-hidden="true"><path d="M10 4h8l-.6 6a3.4 3.4 0 0 1-6.8 0z"/><path d="M14 13.5V26M10 26h8"/><path d="M22 4v22M22 4c2.5 1.5 3 5 3 8h-3"/></svg>',
  };

  /* ------------------------------------------------------------ media slot */
  // One component for every slot: 16:9 or 9:16 (phone frame), video or image,
  // poster, lazy src, muted autoplay while its slide is on screen, tap to unmute.
  // An empty slot renders a styled placeholder with its name and ratio.
  function media(slot, { phone = false, mask = true } = {}) {
    const m = M[slot] || { kind: "image", aspect: "16:9", src: "", alt: slot };
    const [a, b] = (m.aspect || "16:9").split(":");
    const empty = !m.src;
    const alt = esc(m.alt || slot);
    let inner = `<div class="m__ph" aria-hidden="true">${m.kind === "video" ? ICON.play : ICON.image}<span class="slot">${esc(slot)}</span><span class="spec">${esc(m.aspect)} · ${m.kind === "video" ? "video" : "image"}</span></div>`;
    if (!empty && m.kind === "video") {
      inner += `<video muted loop playsinline preload="none"${m.poster ? ` poster="${esc(m.poster)}"` : ""} data-src="${esc(m.src)}" aria-label="${alt}"></video>`;
      inner += `<button class="m__sound" type="button" aria-pressed="false" aria-label="Unmute: ${alt}">${ICON.muted}</button>`;
    } else if (!empty) {
      inner += `<img src="${esc(m.src)}" alt="${alt}" loading="lazy" decoding="async">`;
    }
    const link = empty && m.link;
    if (link) inner += `<a class="m__link" href="${esc(m.link)}" target="_blank" rel="noopener">${ICON.play}<span>${esc(m.linkLabel || "Watch")}</span><small>on Instagram</small></a>`;
    const role = empty && !link ? ` role="img" aria-label="${alt}. Placeholder for ${esc(slot)}."` : "";
    const el = `<div class="m${empty ? " is-empty" : ""}${link ? " has-link" : ""}" style="--ar:${a} / ${b}" data-slot="${esc(slot)}"${mask ? " data-mask" : ""}${role}>${inner}</div>`;
    return phone ? `<div class="phone" data-a>${el}</div>` : el;
  }

  const logo = (light) => {
    const src = light ? C.brand.logoLight || C.brand.logo : C.brand.logo;
    return src
      ? `<img src="${esc(src)}" alt="${esc(C.brand.name)}">`
      : `<span class="wordmark" aria-label="${esc(C.brand.name)}"><b>Curated</b><small>by Kea</small></span>`;
  };
  const eyebrow = (s) => `<p class="eyebrow" data-a>${t(s)}</p>`;
  const ig = (handle, url) => `<a class="ig" href="${esc(url)}" target="_blank" rel="noopener">${ICON.ig}<span>${esc(handle)}</span></a>`;

  /* ------------------------------------------------------------ slides */
  const order = C.order.filter((id) => id);
  const numOf = (id) => order.indexOf(id) + 1;

  const S = {};
  const chapterOf = C.labels || {};
  const toneOf = {
    cover: "film", us: "plum", days: "ivory", vision: "blush-soft", vendors: "plum-deep",
    why: "ivory-deep", team: "ivory", stephen: "plum-deep", options: "blush-soft", logistics: "ivory", reserve: "ivory-deep",
  };

  S.cover = () => {
    const c = C.cover, v = M[c.video] || {};
    const bg = v.src
      ? `<video class="kb-off" muted loop playsinline autoplay preload="auto"${v.poster ? ` poster="${esc(v.poster)}"` : ""} src="${esc(v.src)}" aria-label="${esc(v.alt)}"></video>`
      : c.fallbackImage
        ? `<img class="kb" src="${esc(c.fallbackImage)}" alt="${esc(v.alt || "")}">`
        : `<canvas class="kb" id="lake" role="img" aria-label="${esc(v.alt || "Lake Como at golden hour")}"></canvas>`;
    const lines = c.headline.map((l) => `<span class="line ${l.style}">${words(l.text)}</span>`).join("");
    return `
      <div class="cover__bg">${bg}</div>
      <div class="cover__scrim"></div>
      <div class="cover__reel${c.reel ? "" : " no-reel"}">
      ${c.reel ? `<div class="cover__phone">${media(c.reel, { phone: true, mask: false })}</div>` : ""}
      <div class="stamp" aria-hidden="true">
        <svg viewBox="0 0 120 120"><defs><path id="stampPath" d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0"/></defs>
        <circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" stroke-width=".6" opacity=".6"/>
        <circle cx="60" cy="60" r="36" fill="none" stroke="currentColor" stroke-width=".6" opacity=".6"/>
        <text><textPath href="#stampPath">${esc(c.stamp.repeat(2))}</textPath></text></svg>
        <span class="core">VII</span>
      </div>
      </div>
      <div class="slide__body"><div class="wrap cover__content">
        <h1 class="cover__h">${lines}</h1>
        <p class="cover__sub" data-a>${t(c.subline)}</p>
        <a class="cover__begin" href="#${order[1] || "cover"}" data-next data-a>${esc(c.begin)}<span class="line"></span></a>
      </div></div>`;
  };

  S.vision = () => {
    const v = C.vision;
    return `<div class="slide__body"><div class="wrap">
      <div class="vision__head"><div>${eyebrow(v.eyebrow)}<h2 class="display" data-a>${esc(v.title)}</h2></div><p class="lead" data-a>${esc(v.intro)}</p></div>
      <ol class="pillars">${v.pillars.map((p, i) => {
        const to = p.id === "vendors" && order.includes("vendors") ? "vendors" : null;
        const inner = `${p.image ? media(p.image) : ""}<span class="n">${pad(i + 1)}</span><span class="t">${esc(p.title)}</span><span class="l">${t(p.line)}</span>`;
        return `<li data-a>${to ? `<a href="#${to}">${inner}</a>` : inner}</li>`;
      }).join("")}</ol>
    </div></div>`;
  };

  S.vendors = () => {
    const v = C.vendors;
    return `<div class="slide__body"><div class="wrap vendors">
      <div>${eyebrow(v.eyebrow)}<h2 class="display" data-a>${esc(v.title)}</h2><p class="body" data-a>${t(v.body)}</p>
        <ul class="vlist" data-a>${v.list.map((x) => `<li class="${x.lat == null ? "unpinned" : ""}"><i aria-hidden="true"></i><b>${esc(x.name)}</b><span>${esc(x.role)} · ${t(x.home)}</span></li>`).join("")}</ul>
      </div>
      <div class="map" data-a><div class="map__svg"></div><p class="label map__note">${esc(v.mapNote)}</p></div>
    </div></div>`;
  };

  S.team = () => {
    const k = C.team.kea;
    return `<div class="slide__body"><div class="wrap">
      <div class="team">
        <div class="phone-col">${media(k.video, { phone: true })}</div>
        <div>${eyebrow(C.team.eyebrow)}
          <h2 class="team__name" data-a>${esc(k.name)}</h2>
          <p class="label team__role" data-a>${esc(k.role)}</p>
          ${k.tagline ? `<p class="team__tag" data-a>${esc(k.tagline)}</p>` : ""}
          <p class="body" data-a>${t(k.bio)}</p>
          ${statRow(k.stats)}
          <div data-a>${ig(k.instagram, k.instagramUrl)}</div>
          ${order.includes("stephen") ? `<p class="team__next" data-a><a href="#stephen">${t(C.team.optionTwoNote)}</a></p>` : ""}
        </div>
      </div>
    </div></div>`;
  };

  const statRow = (stats = []) => stats.length ? `<ul class="creds" data-a>${stats.map((x) => `<li><b>${esc(x.value)}</b><span class="label">${esc(x.label)}</span></li>`).join("")}</ul>` : "";

  S.stephen = () => {
    const p = C.stephen;
    return `<div class="slide__body"><div class="wrap">
      <div class="team team--second">
        <div>${eyebrow(p.eyebrow)}
          <p class="mate__tag" data-a>${esc(p.tag)}</p>
          <h2 class="team__name" data-a>${esc(p.name)}</h2>
          <p class="label team__role" data-a>${esc(p.role)}</p>
          <p class="body" data-a>${t(p.lead)}</p>
          ${statRow(p.stats)}
          <p class="partners" data-a><span class="label">${esc(p.partnersLabel)}</span>${p.partners.map((x) => `<b>${esc(x)}</b>`).join('<i aria-hidden="true">·</i>')}</p>
          <p class="second__also" data-a>${t(p.also)}</p>
          <div data-a>${ig(p.instagram, p.instagramUrl)}</div>
        </div>
        <div class="second__side">
          <div class="phone-col">${media(p.video, { phone: true })}</div>
          <div class="two" data-a><p class="label">${esc(p.twoTitle)}</p>
            <ol>${p.two.map((x, i) => `<li><span class="two__n">${i + 1}</span><div><b>${esc(x.title)}</b><p>${t(x.line)}</p></div></li>`).join("")}</ol>
          </div>
        </div>
      </div>
    </div></div>`;
  };

  const rollHTML = (n) => {
    const s = Number(n).toLocaleString("en-US");
    return `<span class="cur">$</span>` + [...s].map((ch) => /\d/.test(ch)
      ? `<span class="roll" data-d="${ch}"><span style="transform:translateY(-${ch}em)">${"0123456789".split("").map((d) => `<span>${d}</span>`).join("")}</span></span>`
      : `<span>${ch}</span>`).join("");
  };
  const toggle = (name) => `<div class="toggle" role="group" aria-label="Coverage option" data-toggle="${name}" data-sel="one" data-a>
      <span class="toggle__pill" aria-hidden="true"></span>
      ${C.options.items.map((o, i) => `<button type="button" data-opt="${o.id}" aria-pressed="${i === 0}">${esc(o.tab)}</button>`).join("")}
    </div>`;

  S.options = () => {
    const o = C.options, k = C.team.kea;
    const st = { ...C.stephen, role: "Second shooter · Cinematic filmmaker", bio: "12+ years in video production. 40K+ followers built on cinematic content" };
    const mate = (p, tag, reel) => `<div class="mate">
        <div class="phone">${media(reel, { mask: false })}</div>
        <div>${tag ? `<span class="mate__tag">${esc(tag)}</span>` : ""}<p class="mate__name">${esc(p.name)}</p><p>${t(p.role)}${p.bio && tag ? `. ${t(p.bio)}` : ""}</p>${ig(p.instagram, p.instagramUrl)}</div>
      </div>`;
    const max = Math.max(...o.hours.map((h) => h.hours));
    return `<div class="slide__body"><div class="wrap opts">
      <div>
        ${eyebrow(o.eyebrow)}<h2 class="display" data-a>${esc(o.title)}</h2>
        ${toggle("options")}
        <div class="price" data-a><div class="price__num" aria-live="polite" aria-atomic="true"><span class="sr-only" data-price-sr>${money(o.items[0].price)}</span><span aria-hidden="true" data-price>${rollHTML(o.items[0].price)}</span></div><span class="label">${esc(o.priceLabel)}</span></div>
        <p class="opts__note" data-a>${esc(o.note)}</p>
      </div>
      <div>
        <div class="panels" data-a>
          ${o.items.map((it, i) => `<div class="panel" data-panel="${it.id}" aria-hidden="${i !== 0}">
            <p class="label panel__tab">${esc(it.tab)} · <span class="panel__price">${money(it.price)}</span></p>
            <h3 class="panel__title">${esc(it.title)}</h3><p class="panel__line">${t(it.line)}</p>
            ${it.id === "two" ? mate(st, "Joins in Option Two", st.video) : mate(k, "", k.video)}
          </div>`).join("")}
        </div>
        <div class="hours" data-a>
          <h3>${esc(o.hoursTitle)}</h3><span class="label">${esc(o.hoursLabel)}</span>
          <ul>${o.hours.map((h) => `<li><span class="ev">${esc(h.event)}</span><span class="hr">Up to ${h.hours} hours</span><span class="bar"><i style="--w:${(h.hours / max) * 100}%"></i></span></li>`).join("")}</ul>
          <div class="scale" aria-hidden="true"><span>0</span><span>${max / 2} hrs</span><span>${max} hrs</span></div>
        </div>
      </div>
    </div></div>`;
  };

  const accordion = (items, key) => items.map((it, i) => `<div class="acc" data-a><h3><button type="button" aria-expanded="false" aria-controls="${key}-${i}" id="${key}-b-${i}">${esc(it.title)}<span class="pm" aria-hidden="true"></span></button></h3>
        <div class="acc__panel" id="${key}-${i}" role="region" aria-labelledby="${key}-b-${i}"><div><p>${t(it.body)}</p></div></div></div>`).join("");

  S.us = () => {
    const u = C.us;
    const html = words(u.quote).replace(/class="w">(Sam|JT)</g, 'class="w hl">$1<');
    return `<div class="slide__body"><div class="wrap us">
      ${eyebrow(u.eyebrow)}
      <figure class="quote" style="margin:0"><blockquote><p>${html}</p></blockquote><footer data-a>${esc(u.attribution)}</footer></figure>
      <ol class="beats">${u.beats.map((b) => `<li data-a><b>${esc(b.big)}</b><span class="label">${esc(b.label)}</span><p>${t(b.line)}</p></li>`).join("")}</ol>
    </div></div>`;
  };

  S.days = () => {
    const d = C.days;
    return `<div class="slide__body"><div class="wrap days">
      <div class="days__head">${eyebrow(d.eyebrow)}<h2 class="display" data-a>${esc(d.title)}</h2>
        <p class="where" data-a>${ICON.pin}<span>${esc(d.location)}</span></p></div>
      <ol class="days__list">${d.days.map((x) => `<li class="dayc">
        <div class="dayc__phone">${media(x.video, { phone: true })}</div>
        <div data-a><p class="label">${esc(x.date)}</p><h3 class="dayc__it">${esc(x.italian)}</h3><p class="dayc__title">${esc(x.title)}</p><p class="dayc__line">${t(x.line)}</p></div>
      </li>`).join("")}</ol>
    </div></div>`;
  };

  S.why = () => {
    const y = C.why, d = C.why;
    return `<div class="slide__body"><div class="wrap why">
      <div>${eyebrow(y.eyebrow)}<h2 class="display" data-a>${esc(y.title)}</h2><p class="lead" data-a>${t(y.body)}</p>
        <div class="stats">${d.stats.map((x) => `<div class="stat" data-a><div class="stat__v"><b>${esc(x.value)}</b><span>${esc(x.unit)}</span></div><span class="label">${esc(x.label)}</span><p>${t(x.note)}</p></div>`).join("")}</div>
      </div>
      <div class="dlist" data-a><h3>${esc(d.listTitle)}</h3><ul>${d.rows.map((r) => `<li><b>${t(r.item)}</b><span>${t(r.detail)}</span></li>`).join("")}</ul></div>
    </div></div>`;
  };

  S.logistics = () => {
    const l = C.logistics, icons = [ICON.stay, ICON.car, ICON.meal];
    return `<div class="slide__body"><div class="wrap logistics">
      <div class="logistics__head">${eyebrow(l.eyebrow)}<h2 class="display" data-a>${esc(l.title)}</h2></div>
      <div class="logistics__needs">${l.columns.map((c, i) => `<section class="need" data-a><span class="col__icon">${icons[i] || ""}</span><div><h3>${esc(c.title)}</h3><p class="need__lead">${t(c.lead)}</p>${c.items.length ? `<ul>${c.items.map((x) => `<li>${t(x)}</li>`).join("")}</ul>` : ""}</div></section>`).join("")}</div>
      <div class="logistics__terms"><p class="label" data-a>${esc(l.termsTitle)}</p>${accordion(l.terms, "terms")}</div>
    </div></div>`;
  };

  S.reserve = () => {
    const r = C.reserve;
    const sched = (id) => {
      const s = r.schedules[id], opt = C.options.items.find((o) => o.id === id);
      const total = s.reduce((a, x) => a + x.amount, 0);
      return `<div data-sched="${id}" aria-hidden="${id !== "one"}">
        <p class="label sched__name">${esc(opt ? opt.tab : id)}</p>
        <ol class="steps"><span class="link" aria-hidden="true"></span>${s.map((x, i) => `<li><span class="dot">${i + 1}</span><span class="label when">${esc(x.when)}</span><span class="amt">${money(x.amount)}</span><span class="what">${t(x.what)}</span></li>`).join("")}</ol>
        <p class="total"><span class="label">Total travel investment</span><b>${money(total)}</b></p>
      </div>`;
    };
    const has = !!r.ctaUrl;
    return `<div class="slide__body"><div class="wrap reserve">
      <div>${eyebrow(r.eyebrow)}<h2 class="display" data-a>${esc(r.title)}</h2>${toggle("reserve")}</div>
      <div>
        <div class="sched" data-a>${Object.keys(r.schedules).map(sched).join("")}</div>
        <p class="reserve__note" data-a>${t(r.note)}</p>
        <div data-a><a class="cta${has ? "" : " is-placeholder"}" href="${has ? esc(r.ctaUrl) : "#reserve"}"${has ? ' target="_blank" rel="noopener"' : ""}><span>${esc(r.cta)}</span>${ICON.next}</a>
        ${has ? "" : `<span class="cta__flag">${t("[CONFIRM booking or contact link in content.js]")}</span>`}</div>
        ${r.signoff ? `<div class="signoff" data-a><span class="signoff__line">${esc(r.signoff)}</span><span class="logo">${logo(false)}</span><a class="ig" href="${esc(C.brand.instagramUrl)}" target="_blank" rel="noopener">${ICON.ig}<span>${esc(C.brand.instagram)}</span></a></div>` : ""}
      </div>
    </div></div>`;
  };

  /* ------------------------------------------------------------ type */
  // Typeface comes from content.js; the review switcher (typePicker) can
  // override it for this browser only.
  const TYPES = [["couture", "Couture"], ["villa", "Villa"], ["modern", "Modern"], ["original", "Original"]];
  let typeface = C.typeface || "couture";
  if (C.typePicker) { try { typeface = localStorage.getItem("sjt-type") || typeface; } catch (e) { /* storage blocked */ } }
  if (!TYPES.some((x) => x[0] === typeface)) typeface = "couture";
  document.documentElement.dataset.type = typeface;
  const typeBtn = $("#typeBtn");
  if (C.typePicker && typeBtn) {
    typeBtn.hidden = false;
    const label = () => { typeBtn.querySelector("span").textContent = TYPES.find((x) => x[0] === typeface)[1]; };
    label();
    typeBtn.addEventListener("click", () => {
      typeface = TYPES[(TYPES.findIndex((x) => x[0] === typeface) + 1) % TYPES.length][0];
      document.documentElement.dataset.type = typeface;
      try { localStorage.setItem("sjt-type", typeface); } catch (e) { /* storage blocked */ }
      label();
      dispatchEvent(new Event("resize"));
    });
  }

  /* ------------------------------------------------------------ mount */
  document.title = C.meta.title;
  const deck = $("#deck");
  deck.innerHTML = order.filter((id) => S[id]).map((id, i) =>
    `<section class="slide s-${id} tone-${toneOf[id] || "ivory"}" id="${id}" data-id="${id}" tabindex="-1" aria-roledescription="slide" aria-label="${i + 1} of ${order.length}: ${esc(chapterOf[id] || id)}">
      ${S[id]()}
      <div class="folio" aria-hidden="true">
        <span class="folio__nav">${i > 0 ? `<a href="#${order[i - 1]}">Previous</a>` : ""}${id !== "contents" && order.includes("contents") ? `<a href="#contents">Contents</a>` : ""}</span>
        <span>${esc(C.meta.title)}</span>
        <span class="folio__nav"><span>${pad(i + 1)} / ${pad(order.length)}</span>${i < order.length - 1 ? `<a href="#${order[i + 1]}">Next</a>` : `<a href="#cover">Back to the start</a>`}</span>
      </div>
    </section>`).join("");
  const slides = $$(".slide", deck);
  const ids = slides.map((s) => s.id);
  const isDark = (s) => /tone-(plum|plum-deep|film)/.test(s.className);

  $("#logo").innerHTML = logo(false);
  const menuChapters = ids.filter((id) => id !== "cover").map((id) => ({ to: id, label: chapterOf[id] || id }));
  $("#menuList").innerHTML = `<ol class="chapters">${menuChapters.map((ch, i) =>
    `<li><a href="#${esc(ch.to)}"><span class="n">${pad(i + 1)}</span><span class="t">${esc(ch.label)}</span><span class="p">p. ${pad(ids.indexOf(ch.to) + 1)}</span></a></li>`).join("")}</ol>`;
  $("#ticks").innerHTML = slides.map((s, i) => `<button type="button" aria-label="Go to slide ${i + 1}: ${esc(chapterOf[s.id] || s.id)}"></button>`).join("");
  const ticks = $$("#ticks button");

  /* ------------------------------------------------------------ navigation */
  let cur = -1, busy = false, pending = null;
  const counter = $("#counter"), title = $("#progressTitle"), prevBtn = $("#prev"), nextBtn = $("#next"), live = $("#live");

  function chrome(i) {
    document.body.dataset.tone = isDark(slides[i]) ? "dark" : "light";
    document.body.style.setProperty("--chrome-bg", getComputedStyle(slides[i]).backgroundColor);
    counter.innerHTML = `<b>${pad(i + 1)}</b> / ${pad(slides.length)}`;
    title.textContent = chapterOf[slides[i].id] || "";
    ticks.forEach((b, k) => { b.classList.toggle("is-past", k < i); b.classList.toggle("is-current", k === i); b.setAttribute("aria-current", k === i ? "step" : "false"); });
    prevBtn.disabled = i === 0;
    nextBtn.disabled = i === slides.length - 1;
    live.textContent = `Slide ${i + 1} of ${slides.length}: ${chapterOf[slides[i].id] || ""}`;
    slides.forEach((s, k) => { s.inert = k !== i; s.setAttribute("aria-hidden", k !== i); });
    try { history.replaceState(null, "", "#" + slides[i].id); } catch (e) { /* file:// or sandbox */ }
  }

  function go(i, { instant = false, focus = false } = {}) {
    i = Math.max(0, Math.min(slides.length - 1, i));
    if (i === cur) return;
    if (busy) { pending = i; return; }
    const from = slides[cur], to = slides[i], dir = i > cur ? 1 : -1;
    cur = i;
    to.scrollTop = 0;
    to.classList.add("is-active");
    chrome(i);
    Media.activate(i);
    const done = () => {
      if (from) { from.classList.remove("is-leaving"); if (gsap) gsap.set(from, { clearProps: "transform,opacity" }); }
      if (gsap) gsap.set(to, { clearProps: "clipPath" });
      busy = false;
      if (focus) to.focus({ preventScroll: true });
      if (pending !== null) { const p = pending; pending = null; go(p); }
    };
    if (from) { from.classList.remove("is-active"); from.classList.add("is-leaving"); }
    if (!from || instant || reduced || !gsap) { done(); enter(to, 0); return; }
    busy = true;
    gsap.timeline({ onComplete: done })
      .fromTo(to, { clipPath: dir > 0 ? "inset(0% 0% 0% 100%)" : "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.05, ease: "expo.inOut" }, 0)
      .to(from, { xPercent: -7 * dir, opacity: .3, duration: 1.05, ease: "expo.inOut" }, 0);
    enter(to, .45);
  }
  const next = () => go((busy && pending !== null ? pending : cur) + 1);
  const prev = () => go((busy && pending !== null ? pending : cur) - 1);

  prevBtn.addEventListener("click", prev);
  nextBtn.addEventListener("click", next);
  ticks.forEach((b, k) => b.addEventListener("click", () => go(k)));
  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-next]")) { next(); return; }
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute("href").slice(1);
    const k = ids.indexOf(id);
    if (k < 0) return;
    e.preventDefault();
    closeMenu();
    go(k, { focus: true });
  });

  document.addEventListener("keydown", (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (!menu.hidden) { if (e.key === "Escape") closeMenu(); return; }
    if (intro.active) { if (["Escape", "Enter", " ", "ArrowRight"].includes(e.key)) { e.preventDefault(); intro.skip(); } return; }
    const tag = (e.target.tagName || "").toLowerCase();
    if (tag === "input" || tag === "textarea") return;
    const onButton = tag === "button" || tag === "a";
    if (e.key === "ArrowRight" || e.key === "PageDown" || (e.key === " " && !onButton)) { e.preventDefault(); next(); }
    else if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); prev(); }
    else if (e.key === "Home") { e.preventDefault(); go(0); }
    else if (e.key === "End") { e.preventDefault(); go(slides.length - 1); }
  });

  // Swipe left/right to move; vertical drags scroll inside a tall slide.
  let tx = 0, ty = 0, tt = 0;
  deck.addEventListener("touchstart", (e) => { const p = e.touches[0]; tx = p.clientX; ty = p.clientY; tt = Date.now(); }, { passive: true });
  deck.addEventListener("touchend", (e) => {
    const p = e.changedTouches[0], dx = p.clientX - tx, dy = p.clientY - ty;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.4 && Date.now() - tt < 800) (dx < 0 ? next : prev)();
  }, { passive: true });

  // Wheel and trackpad: advance only once a tall slide has been read to its edge.
  let acc = 0, lockUntil = 0;
  deck.addEventListener("wheel", (e) => {
    const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    const s = slides[cur];
    const scrollable = s.scrollHeight > s.clientHeight + 4;
    const atEnd = s.scrollTop + s.clientHeight >= s.scrollHeight - 2, atTop = s.scrollTop <= 1;
    if (scrollable && Math.abs(e.deltaY) >= Math.abs(e.deltaX) && ((d > 0 && !atEnd) || (d < 0 && !atTop))) { acc = 0; return; }
    const now = Date.now();
    if (now < lockUntil) return;
    acc += d;
    if (Math.abs(acc) > 70) { (acc > 0 ? next : prev)(); acc = 0; lockUntil = now + 1150; }
  }, { passive: true });

  /* ------------------------------------------------------------ menu */
  const menu = $("#menu"), menuBtn = $("#menuBtn");
  function openMenu() {
    menu.hidden = false; menuBtn.setAttribute("aria-expanded", "true");
    if (gsap && !reduced) {
      gsap.fromTo(menu, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: .8, ease: "expo.inOut" });
      gsap.fromTo($$(".chapters li", menu), { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: .8, stagger: .04, ease: "expo.out", delay: .35 });
    }
    const a = $(`a[href="#${slides[cur].id}"]`, menu) || $("a", menu);
    a && a.focus();
  }
  function closeMenu() {
    if (menu.hidden) return;
    menu.hidden = true; menuBtn.setAttribute("aria-expanded", "false"); menuBtn.focus({ preventScroll: true });
  }
  menuBtn.addEventListener("click", openMenu);
  $("#menuClose").addEventListener("click", closeMenu);

  /* ------------------------------------------------------------ enter motion */
  // Every element's resting state is its CSS state; motion only plays *from*
  // a hidden state on entry, so print, PDF and no-JS always show the full slide.
  const hooks = {};
  function enter(slide, delay) {
    if (!gsap || reduced) { (hooks[slide.id] || (() => {}))(slide, null, delay); return; }
    const els = $$("[data-a]", slide).filter((el) => !el.closest(".phone") || el.classList.contains("phone"));
    gsap.killTweensOf(els);
    gsap.fromTo(els, { opacity: 0, y: 26, filter: "blur(8px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.15, ease: "expo.out", stagger: .075, delay, clearProps: "filter,transform" });
    $$(".m[data-mask]", slide).forEach((m, k) => {
      gsap.fromTo(m, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "expo.inOut", delay: delay + .15 + k * .09, clearProps: "clipPath" });
      const inner = m.querySelector("img,video,.m__ph");
      inner && gsap.fromTo(inner, { scale: 1.18 }, { scale: 1, duration: 1.9, ease: "expo.out", delay: delay + .15 + k * .09, clearProps: "transform" });
    });
    (hooks[slide.id] || (() => {}))(slide, gsap, delay);
  }

  const blurWords = (els, delay, stagger = .12) => gsap.fromTo(els, { opacity: 0, filter: "blur(14px)", y: 12 }, { opacity: 1, filter: "blur(0px)", y: 0, duration: 1.4, ease: "power2.out", stagger, delay, clearProps: "filter,transform" });

  hooks.cover = (s, g, d) => { if (g) blurWords($$(".cover__h .w", s), d + .1, .11); };
  hooks.options = (s, g, d) => { if (g) g.fromTo($$(".hours .bar i", s), { scaleX: 0 }, { scaleX: 1, duration: 1.4, ease: "expo.inOut", stagger: .12, delay: d + .5, clearProps: "transform" }); };
  hooks.us = (s, g, d) => { if (g) blurWords($$(".quote .w", s), d + .1, .07); };
  hooks.days = (s, g, d) => { if (g) g.fromTo($$(".dayc .phone", s), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.3, ease: "expo.out", stagger: .12, delay: d + .2, clearProps: "transform" }); };
  hooks.reserve = (s, g, d) => { if (g) g.fromTo($$(".steps .link", s), { scaleX: 0 }, { scaleX: 1, duration: 1.4, ease: "expo.inOut", delay: d + .6, clearProps: "transform" }); };
  hooks.vendors = (s, g, d) => WorldMap.play(g, d);

  /* ------------------------------------------------------------ video */
  const Media = (() => {
    const vids = $$(".m video");
    vids.forEach((v) => {
      v.addEventListener("error", () => v.closest(".m").classList.add("is-empty"), true);
      v.addEventListener("loadeddata", () => v.closest(".m").classList.remove("is-empty"));
    });
    const load = (v) => { if (!v.getAttribute("src") && v.dataset.src) { v.src = v.dataset.src; v.preload = "auto"; } };
    const setIcon = (btn, v) => {
      btn.innerHTML = v.muted ? ICON.muted : ICON.sound;
      btn.setAttribute("aria-pressed", String(!v.muted));
      btn.setAttribute("aria-label", (v.muted ? "Unmute: " : "Mute: ") + (v.getAttribute("aria-label") || "video"));
    };
    document.addEventListener("click", (e) => {
      const btn = e.target.closest(".m__sound");
      if (!btn) return;
      e.preventDefault(); e.stopPropagation();
      const v = btn.parentElement.querySelector("video");
      const unmute = v.muted;
      vids.forEach((o) => { if (o !== v && !o.muted) { o.muted = true; const b = o.parentElement.querySelector(".m__sound"); b && setIcon(b, o); } });
      v.muted = !unmute;
      if (v.paused) v.play().catch(() => {});
      setIcon(btn, v);
    });
    return {
      activate(i) {
        slides.forEach((s, k) => {
          $$("video", s).forEach((v) => {
            if (Math.abs(k - i) <= 1) load(v);
            if (k === i && !reduced) { load(v); v.play().catch(() => {}); }
            else if (!v.paused) { v.pause(); if (!v.muted) { v.muted = true; const b = v.parentElement.querySelector(".m__sound"); b && setIcon(b, v); } }
          });
        });
        Lake.toggle(slides[i].id === "cover");
      },
    };
  })();

  /* ------------------------------------------------------------ options */
  let sel = "one";
  function setOption(id) {
    sel = id;
    const it = C.options.items.find((o) => o.id === id);
    $$("[data-toggle]").forEach((tg) => { tg.dataset.sel = id; $$("button", tg).forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.opt === id))); });
    $$("[data-panel]").forEach((p) => p.setAttribute("aria-hidden", String(p.dataset.panel !== id)));
    $$("[data-sched]").forEach((p) => p.setAttribute("aria-hidden", String(p.dataset.sched !== id)));
    const price = $("[data-price]");
    if (price && it) {
      const s = Number(it.price).toLocaleString("en-US");
      const rolls = $$(".roll", price);
      if (rolls.length === s.replace(/\D/g, "").length) {
        [...s.replace(/\D/g, "")].forEach((d, k) => {
          const strip = rolls[k].firstElementChild;
          strip.style.transitionDelay = reduced ? "0s" : `${k * .05}s`;
          strip.style.transform = `translateY(-${d}em)`;
        });
      } else price.innerHTML = rollHTML(it.price);
      $("[data-price-sr]").textContent = money(it.price);
    }
    if (cur >= 0) Media.activate(cur);
  }
  document.addEventListener("click", (e) => { const b = e.target.closest("[data-opt]"); if (b) setOption(b.dataset.opt); });

  /* ------------------------------------------------------------ accordions */
  $$(".acc button").forEach((b) => b.addEventListener("click", () => b.setAttribute("aria-expanded", String(b.getAttribute("aria-expanded") !== "true"))));

  /* ------------------------------------------------------------ vendor map */
  const WorldMap = (() => {
    const W = window.WORLD_DOTS, v = C.vendors, host = $(".map__svg");
    if (!W || !host) return { play() {} };
    const CELL = 10;
    const X = (lng) => ((lng - W.lng0) / W.step) * CELL;
    const Y = (lat) => ((W.lat0 - lat) / W.step) * CELL + CELL / 2;
    let d = "";
    W.rows.forEach((hex, r) => {
      const bits = [...hex].map((h) => parseInt(h, 16).toString(2).padStart(4, "0")).join("");
      for (let c = 0; c < W.cols; c++) if (bits[c] === "1") d += `M${c * CELL + CELL / 2} ${r * CELL + CELL / 2}h0`;
    });
    const dest = v.destination;
    const pins = [
      ...v.route.map((p) => ({ ...p, kind: "route" })),
      ...v.list.filter((p) => p.lat != null && p.lng != null).map((p) => ({ ...p, kind: "vendor" })),
    ];
    const DX = X(dest.lng), DY = Y(dest.lat);
    const arc = (x1, y1, x2, y2) => {
      const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, dist = Math.hypot(x2 - x1, y2 - y1);
      return `M${x1.toFixed(1)} ${y1.toFixed(1)}Q${mx.toFixed(1)} ${(my - dist * .32).toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`;
    };
    // The couple's route runs pin to pin (Minnesota, DC, the lake); vendors fly straight in.
    const routePts = [...v.route, dest];
    const routeArcs = routePts.slice(1).map((p, k) => arc(X(routePts[k].lng), Y(routePts[k].lat), X(p.lng), Y(p.lat)));
    const vendorArcs = pins.filter((p) => p.kind === "vendor").map((p) => arc(X(p.lng), Y(p.lat), DX, DY));
    const allX = [...pins.map((p) => X(p.lng)), DX], allY = [...pins.map((p) => Y(p.lat)), DY];

    // Label side: set `label: "left" | "right" | "below" | "above"` on a pin in content.js, or leave it to the layout.
    const pinSVG = (p, cls) => {
      const x = X(p.lng), y = Y(p.lat);
      const side = p.label || (cls === "home" ? "right" : x < DX - 40 ? "left" : "right");
      return `<g class="pin ${cls}" data-side="${side}" transform="translate(${x.toFixed(1)} ${y.toFixed(1)})">
        <circle class="ring" r="5"/><circle class="dot" r="5"/><text class="pin__t">${esc(p.name)}</text></g>`;
    };
    host.innerHTML = `<svg role="img" aria-label="World map. Pins for ${esc(pins.map((p) => p.name).join(", "))}, each connected to Lake Como.">
      <path class="dots" d="${d}"/>
      ${routeArcs.map((a) => `<path class="arc route" d="${a}"/>`).join("")}
      ${vendorArcs.map((a) => `<path class="arc vendor" d="${a}" pathLength="1"/>`).join("")}
      ${pins.map((p) => pinSVG(p, p.kind)).join("")}
      ${pinSVG(dest, "home")}
    </svg>`;
    const svg = $("svg", host);

    // Frame the pins with room for the continents around them.
    function frame() {
      const wide = host.clientWidth >= 560;
      const px = wide ? 190 : 110, x0 = Math.max(0, Math.min(...allX) - px), x1 = Math.min(W.cols * CELL, Math.max(...allX) + px * (wide ? 1 : 1.9));
      const w = x1 - x0, h = w * (wide ? .56 : .72), cy = (Math.min(...allY) + Math.max(...allY)) / 2;
      const vb = [x0, Math.max(0, cy - h * .48), w, h];
      svg.setAttribute("viewBox", vb.map((n) => n.toFixed(0)).join(" "));
      const k = vb[2] / Math.max(host.clientWidth, 1); // svg units per css px
      svg.querySelector(".dots").style.strokeWidth = Math.min(CELL * .5, 3 * k).toFixed(2);
      $$(".pin", svg).forEach((g) => {
        const home = g.classList.contains("home"), r = (home ? 5 : 3.6) * k;
        g.querySelector(".dot").setAttribute("r", r);
        g.querySelector(".ring").setAttribute("r", r);
        g.querySelector(".ring").style.strokeWidth = k;
        const tx = g.querySelector("text"), fs = (home ? 15 : 9) * k, off = (home ? 10 : 8) * k;
        tx.style.fontSize = fs + "px";
        const side = g.dataset.side;
        tx.setAttribute("text-anchor", side === "left" ? "end" : side === "right" ? "start" : "middle");
        tx.setAttribute("x", side === "left" ? -off : side === "right" ? off : 0);
        tx.setAttribute("y", side === "below" ? off + fs * .8 : side === "above" ? -off : fs * .34);
      });
      $$(".arc", svg).forEach((a) => (a.style.strokeWidth = (a.classList.contains("route") ? 1.3 : 1.1) * k));
      $$(".arc.route", svg).forEach((a) => (a.style.strokeDasharray = `${2 * k} ${6 * k}`));
    }
    frame();
    addEventListener("resize", frame);

    return {
      play(g, d) {
        frame();
        if (!g) return;
        const dots = svg.querySelector(".dots");
        const routeArcs = $$(".arc.route", svg), vArcs = $$(".arc.vendor", svg);
        const routePins = $$(".pin.route", svg), vPins = $$(".pin.vendor", svg), home = $(".pin.home", svg);
        const tl = g.timeline({ delay: d });
        tl.fromTo(dots, { opacity: 0 }, { opacity: 1, duration: 1.4, ease: "power2.out" }, 0)
          .fromTo(home, { opacity: 0, scale: 0, transformOrigin: "center" }, { opacity: 1, scale: 1, duration: .8, ease: "back.out(2)" }, .5)
          .fromTo(routePins, { opacity: 0 }, { opacity: 1, duration: .6, stagger: .35 }, .9)
          .fromTo(routeArcs, { opacity: 0, clipPath: "inset(0 100% 0 0)" }, { opacity: 1, clipPath: "inset(0 0% 0 0)", duration: 1.4, stagger: .5, ease: "power2.inOut", clearProps: "clipPath" }, 1.1);
        vPins.forEach((p, k) => {
          tl.fromTo(p, { opacity: 0 }, { opacity: 1, duration: .6, ease: "power2.out" }, 2 + k * .55);
          tl.fromTo(vArcs[k], { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.2, ease: "power2.inOut" }, 2.1 + k * .55);
        });
      },
    };
  })();

  /* ------------------------------------------------------------ painted lake (hero fallback) */
  // A slow golden-hour lake: layered ridges, a low sun and glints on the water.
  const Lake = (() => {
    const cv = $("#lake");
    if (!cv) return { toggle() {} };
    const ctx = cv.getContext("2d");
    let w = 0, h = 0, dpr = 1, hz = 0, sunX = 0, ridges = [], glints = [], raf = 0, on = false, last = 0;
    let seed = 7;
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    function build() {
      dpr = Math.min(2, devicePixelRatio || 1);
      w = cv.clientWidth; h = cv.clientHeight;
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      hz = h * (w < h ? .56 : .6);
      sunX = w * (w < h ? .62 : .64);
      seed = 7;
      const layers = [
        { base: .15, amp: .06, col: "rgba(150, 84, 110, .55)", f: [1.3, 3.1, 7.7] },
        { base: .10, amp: .07, col: "rgba(92, 36, 70, .85)", f: [1.9, 4.3, 9.1] },
        { base: .05, amp: .06, col: "rgba(46, 14, 36, 1)", f: [2.6, 5.9, 12.3] },
      ];
      ridges = layers.map((L) => {
        const ph = [rnd() * 6, rnd() * 6, rnd() * 6], pts = [];
        for (let x = -10; x <= w + 10; x += 6) {
          const u = x / w, env = .35 + 1.3 * Math.pow(Math.abs(u - (sunX / w)) , 1.1); // lower near the sun: the lake opens up
          const n = Math.sin(u * L.f[0] * 3.1 + ph[0]) * .55 + Math.sin(u * L.f[1] * 3.1 + ph[1]) * .3 + Math.sin(u * L.f[2] * 3.1 + ph[2]) * .15;
          pts.push([x, hz - h * (L.base * env + L.amp * env * (n + 1) * .5)]);
        }
        return { pts, col: L.col };
      });
      glints = Array.from({ length: Math.round(w * .28) }, () => {
        const d = Math.pow(rnd(), 1.8), y = hz + 4 + d * (h - hz);
        const spread = 40 + (y - hz) * .9;
        const near = rnd() < .6;
        return { x: near ? sunX + (rnd() - .5) * spread * 2 : rnd() * w, y, len: 4 + d * 38 * (.5 + rnd()), ph: rnd() * 6.28, sp: .6 + rnd() * 1.6, near };
      });
    }
    function draw(tm) {
      const s = tm / 1000;
      const sky = ctx.createLinearGradient(0, 0, 0, hz);
      sky.addColorStop(0, "#2a0c1f"); sky.addColorStop(.38, "#6a2a4c"); sky.addColorStop(.74, "#c67a88"); sky.addColorStop(1, "#f1c79e");
      ctx.fillStyle = sky; ctx.fillRect(0, 0, w, hz + 1);
      const sy = hz - h * .045, glow = ctx.createRadialGradient(sunX, sy, 0, sunX, sy, h * .55);
      glow.addColorStop(0, "rgba(255, 232, 196, .75)"); glow.addColorStop(.25, "rgba(246, 190, 160, .28)"); glow.addColorStop(1, "rgba(246, 190, 160, 0)");
      ctx.fillStyle = glow; ctx.fillRect(0, 0, w, hz);
      ctx.beginPath(); ctx.arc(sunX, sy, Math.max(10, h * .028), 0, 7); ctx.fillStyle = "rgba(255, 240, 214, .95)"; ctx.fill();
      ridges.forEach((r) => {
        ctx.beginPath(); ctx.moveTo(-10, hz + 2);
        r.pts.forEach(([x, y]) => ctx.lineTo(x, y));
        ctx.lineTo(w + 10, hz + 2); ctx.closePath(); ctx.fillStyle = r.col; ctx.fill();
      });
      const haze = ctx.createLinearGradient(0, hz - h * .05, 0, hz + 2);
      haze.addColorStop(0, "rgba(241, 199, 158, 0)"); haze.addColorStop(1, "rgba(241, 199, 158, .35)");
      ctx.fillStyle = haze; ctx.fillRect(0, hz - h * .05, w, h * .05 + 2);
      const water = ctx.createLinearGradient(0, hz, 0, h);
      water.addColorStop(0, "#b9707f"); water.addColorStop(.3, "#5d2447"); water.addColorStop(1, "#1d0817");
      ctx.fillStyle = water; ctx.fillRect(0, hz, w, h - hz);
      const col = ctx.createLinearGradient(sunX - w * .12, 0, sunX + w * .12, 0);
      col.addColorStop(0, "rgba(255, 214, 170, 0)"); col.addColorStop(.5, "rgba(255, 214, 170, .22)"); col.addColorStop(1, "rgba(255, 214, 170, 0)");
      ctx.fillStyle = col; ctx.fillRect(sunX - w * .12, hz, w * .24, h - hz);
      ctx.lineCap = "round";
      glints.forEach((g) => {
        const a = Math.max(0, Math.sin(s * g.sp + g.ph)) * (g.near ? .75 : .28);
        if (a < .02) return;
        const x = g.x + Math.sin(s * .25 + g.ph) * 5;
        ctx.strokeStyle = `rgba(255, 232, 205, ${a.toFixed(3)})`;
        ctx.lineWidth = g.y > hz + (h - hz) * .5 ? 1.4 : 1;
        ctx.beginPath(); ctx.moveTo(x - g.len / 2, g.y); ctx.lineTo(x + g.len / 2, g.y); ctx.stroke();
      });
    }
    function loop(tm) { if (!on) return; if (tm - last > 33) { draw(tm); last = tm; } raf = requestAnimationFrame(loop); }
    build(); draw(1200);
    addEventListener("resize", () => { build(); draw(performance.now()); });
    addEventListener("beforeprint", () => { build(); draw(1200); });
    return {
      toggle(v) {
        if (reduced) return;
        if (v && !on) { on = true; raf = requestAnimationFrame(loop); }
        else if (!v && on) { on = false; cancelAnimationFrame(raf); }
      },
    };
  })();

  /* ------------------------------------------------------------ opening graphic */
  // Lake Como draws itself as an inverted Y, the monogram resolves from blur,
  // then the curtain parts onto the cover.
  const intro = { active: false, skip() {} };
  function smooth(pts) {
    let d = `M${pts[0][0]} ${pts[0][1]}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
      d += `C${(p1[0] + (p2[0] - p0[0]) / 6).toFixed(1)} ${(p1[1] + (p2[1] - p0[1]) / 6).toFixed(1)} ${(p2[0] - (p3[0] - p1[0]) / 6).toFixed(1)} ${(p2[1] - (p3[1] - p1[1]) / 6).toFixed(1)} ${p2[0]} ${p2[1]}`;
    }
    return d;
  }
  function runIntro(onDone) {
    const el = $("#intro");
    if (!gsap || reduced) { el.remove(); onDone(); return; }
    const I = C.intro;
    const north = [[128, 12], [125, 38], [118, 66], [111, 94], [106, 122], [101, 148], [100, 158]];
    const west = [[100, 158], [90, 167], [77, 177], [65, 191], [55, 209], [47, 229], [41, 247], [34, 264]];
    const east = [[100, 158], [107, 173], [113, 193], [117, 215], [121, 239], [127, 264]];
    const paths = [north, west, east].map(smooth);
    el.innerHTML = `
      <div class="intro__panel intro__panel--top"></div><div class="intro__panel intro__panel--bottom"></div>
      <div class="intro__grain"></div>
      <div class="intro__stage">
        <p class="intro__coords" style="margin:0">${esc(I.coords)}</p>
        <svg class="intro__lake" viewBox="0 0 200 280" aria-hidden="true">
          ${paths.map((p) => `<path class="water" d="${p}" pathLength="1"/>`).join("")}
          ${paths.map((p) => `<path class="shore" d="${p}" pathLength="1"/>`).join("")}
          <circle class="town" cx="34" cy="264" r="2.2"/><text x="26" y="266" text-anchor="end">Como</text>
          <circle class="town" cx="127" cy="264" r="2.2"/><text x="135" y="266">Lecco</text>
          <circle class="town" cx="100" cy="158" r="2.2"/><text x="110" y="156">Bellagio</text>
        </svg>
        <p class="intro__mono">${esc(I.monogram).replace("&amp;", "<span>&amp;</span>")}</p>
        <p class="intro__place">${esc(I.place)}</p>
        <p class="intro__date" style="margin:0">${esc(I.date)}</p>
      </div>
      <button class="intro__skip" type="button">${esc(I.skip)}</button>`;
    const stage = $(".intro__stage", el), top = $(".intro__panel--top", el), bottom = $(".intro__panel--bottom", el);
    const shores = $$(".shore", el), waters = $$(".water", el);
    intro.active = true;
    let finished = false;
    const finish = () => {
      if (finished) return; finished = true;
      intro.active = false; el.remove(); onDone();
    };
    const tl = gsap.timeline({ onComplete: finish });
    tl.set([shores, waters], { strokeDasharray: 1, strokeDashoffset: 1 })
      .from(".intro__coords", { opacity: 0, letterSpacing: ".6em", duration: 1.4, ease: "expo.out" }, .1)
      .to(shores[0], { strokeDashoffset: 0, duration: 1.1, ease: "power2.inOut" }, .25)
      .to([shores[1], shores[2]], { strokeDashoffset: 0, duration: 1.1, ease: "power2.inOut" }, 1.05)
      .to(waters, { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut", stagger: .15 }, .7)
      .from($$(".town, .intro__lake text", el), { opacity: 0, duration: .6, stagger: .08 }, 1.7)
      .from(".intro__mono", { opacity: 0, filter: "blur(16px)", y: 10, duration: 1.3, ease: "power2.out" }, 1.55)
      .from([".intro__place", ".intro__date"], { opacity: 0, y: 8, duration: .9, ease: "expo.out", stagger: .12 }, 1.95)
      .to(stage, { opacity: 0, y: -14, filter: "blur(6px)", duration: .7, ease: "power2.in" }, 3.35)
      .to(".intro__grain", { opacity: 0, duration: .5 }, 3.35)
      .add(() => { el.style.pointerEvents = "none"; enter(slides[0], .35); }, 3.75)
      .to(top, { yPercent: -100, duration: 1.2, ease: "expo.inOut" }, 3.75)
      .to(bottom, { yPercent: 100, duration: 1.2, ease: "expo.inOut" }, 3.75);
    let seen = false; try { seen = sessionStorage.getItem("sjt-intro") === "1"; sessionStorage.setItem("sjt-intro", "1"); } catch (e) { /* storage blocked */ }
    if (seen) tl.timeScale(1.8);
    intro.skip = () => { if (tl.time() < 3.3) tl.seek(3.3); };
    $(".intro__skip", el).addEventListener("click", intro.skip);
    el.addEventListener("click", (e) => { if (!e.target.closest(".intro__skip")) intro.skip(); });
  }

  /* ------------------------------------------------------------ boot */
  setOption("one");
  const startId = (location.hash || "").slice(1);
  const start = Math.max(0, ids.indexOf(startId));
  if (start === 0) {
    // Show the cover underneath the curtain, then let the intro hand off to it.
    cur = 0; slides[0].classList.add("is-active"); chrome(0); Media.activate(0);
    if (gsap && !reduced) gsap.set($$(".cover__h .w, .s-cover [data-a]"), { opacity: 0 });
    runIntro(() => { if (!gsap || reduced) enter(slides[0], 0); });
  } else {
    $("#intro").remove();
    go(start, { instant: true });
  }
  document.documentElement.classList.add("is-ready");
})();
