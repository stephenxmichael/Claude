/*
  Sam & JT · Lake Como · content proposal
  ------------------------------------------------------------------
  EVERY word and EVERY media path in the deck lives in this file.
  Edit here; never touch assets/js/deck.js or the CSS to change copy.

  Media
  - A slot with src: "" shows a styled placeholder with its slot name.
  - To add a file, drop it in /media and set src, for example
      src: "media/kea-photo.jpg"
  - See media/README.md for sizes and aspect ratios.

  Placeholders
  - Anything written as [CONFIRM ...] or [KEA ...] is shown on the page
    with a dashed outline so it is easy to spot. Replace it before sending.
  - PLACEHOLDERS.md lists every one.

  Voice: Kea speaking to Sam & JT. Warm, direct, short sentences.
  No emojis, no em dashes, no guarantees the contract can't keep.
*/
window.CONTENT = {
  meta: {
    title: "Sam & JT · Lake Como",
    description: "A content proposal from Curated by Kea for Sam & JT's wedding weekend at Lake Como, July 9 to 11, 2027.",
  },

  brand: {
    name: "Curated by Kea",
    // Path to the logo (SVG or transparent PNG). Empty shows a typeset lockup.
    logo: "",
    logoLight: "", // optional light version for dark slides
    instagram: "@curatedxkea",
    instagramUrl: "https://instagram.com/curatedxkea",
  },

  // ---------------------------------------------------------------
  // MEDIA · every clip and image in one place. Slides refer to these by name.
  // ---------------------------------------------------------------
  media: {
    "hero-reel":     { kind: "video", aspect: "16:9", src: "", poster: "", alt: "Golden hour over Lake Como" },
    // Sam & JT's own reel, in a phone frame on the cover. Until the file is
    // added, the frame links to the reel on Instagram.
    "couple-reel":   { kind: "video", aspect: "9:16", src: "", poster: "", alt: "Sam and JT's reel", link: "https://www.instagram.com/reel/DW2RKA8GTNm/", linkLabel: "Watch your reel" },
    // Real screenshot of the content plan. Until it's added, a sample plan is drawn in its place.
    "content-plan":  { kind: "image", aspect: "16:10", src: "", alt: "Sam and JT's content plan" },
    "kea-photo":     { kind: "image", aspect: "9:16", src: "", alt: "Kea, founder of Curated by Kea" },
    "stephen-photo": { kind: "image", aspect: "9:16", src: "", alt: "Stephen, cinematic filmmaker and content creator" },
    // Client text screenshots. Any height works; they keep their own shape.
    "love-1": { kind: "image", aspect: "3:4", src: "", alt: "A message from a Curated by Kea couple" },
    "love-2": { kind: "image", aspect: "3:4", src: "", alt: "A message from a Curated by Kea couple" },
    "love-3": { kind: "image", aspect: "3:4", src: "", alt: "A message from a Curated by Kea couple" },
    "love-4": { kind: "image", aspect: "3:4", src: "", alt: "A message from a Curated by Kea couple" },
    "love-5": { kind: "image", aspect: "3:4", src: "", alt: "A message from a Curated by Kea couple" },
  },

  // Typeface: "villa" (Cinzel capitals, Cormorant italic, Tenor Sans).
  // Also available: "couture", "modern", "original" (see README).
  typeface: "villa",
  typePicker: false, // true shows an "Aa" switcher for comparing typefaces

  // The slides, in order.
  order: ["cover", "weekend", "plan", "kea", "stephen", "options", "logistics", "love", "closing"],

  // Names for the progress bar and the Chapters menu.
  labels: {
    cover: "Sam & JT", weekend: "The weekend", plan: "Your content plan", kea: "Meet Kea",
    stephen: "Meet Stephen", options: "Choose your coverage", logistics: "Travel and logistics",
    love: "Client love", closing: "Why us",
  },

  intro: {
    place: "Lago di Como",
    coords: "45.98° N · 9.26° E",
    monogram: "S & JT",
    date: "9 · 10 · 11 luglio 2027",
    skip: "Skip intro",
  },

  cover: {
    headline: [
      { text: "Sam & JT.", style: "roman" },
      { text: "Lake Como.", style: "italic" },
      { text: "The Blackest Wedding in Lake Como.", style: "small" },
    ],
    subline: "A content proposal from Curated by Kea · July 9 to 11, 2027",
    begin: "Begin",
    stamp: "Sam & JT · Lago di Como · MMXXVII · ",
    // Full-bleed background. With no src, a live painted lake at golden hour plays instead.
    video: "hero-reel",
    // Optional still for a slow Ken Burns fallback when there is no hero video.
    fallbackImage: "",
    // The couple's reel in a phone frame beside the headline.
    reel: "couple-reel",
  },

  // What you actually get, event by event.
  weekend: {
    eyebrow: "Il fine settimana · The weekend",
    title: "Three days. One complete story.",
    intro: "From the first toast to the last goodbye, we'll capture the moments you'll want to relive, and the ones you never even saw happen.",
    location: "The villa at Lake Como",
    events: [
      {
        italian: "Venerdì 9 luglio",
        day: "Friday",
        title: "Welcome boat party",
        hours: "Up to 4 hours of coverage",
        items: [
          "Up to 2 edited videos",
          "A curated mini story package, ready to post",
        ],
      },
      {
        italian: "Sabato 10 luglio",
        day: "Saturday",
        title: "The wedding day",
        hours: "Up to 10 hours of coverage",
        featured: true,
        items: [
          "Up to 5 to 6 edited videos",
          "A curated mini story package, ready to post",
          "Final edit concepts chosen together during your content strategy call",
        ],
      },
      {
        italian: "Domenica 11 luglio",
        day: "Sunday",
        title: "Farewell brunch or pool party",
        hours: "Up to 3 hours of coverage",
        items: [
          "Up to 2 edited videos",
          "A curated mini story package, ready to post",
        ],
      },
    ],
    // The raw footage, positioned as their archive. Always "all usable raw footage":
    // never promise a clip count, hours of footage or permanent storage.
    archive: {
      label: "Plus · Your full content archive",
      title: "Your edits are just the beginning.",
      line: "You'll also receive all usable raw footage we capture across all three days, not only the clips that make the edits. It's a library of your weekend you can come back to long after Lake Como.",
      uses: ["An anniversary edit", "A moment you never posted", "A reaction you didn't see happen", "Something to share a year from now"],
      stats: [
        { value: "24 hrs", label: "Raw footage", note: "Our goal, depending on Wi-Fi at the villa." },
        { value: "5 to 7", label: "Business days for edits", note: "After the final event of the weekend." },
      ],
    },
  },

  // The content plan, and what goes in it.
  plan: {
    eyebrow: "Il piano · Your content plan",
    title: "What we'll capture",
    lead: "Before we ever get to Lake Como, we'll build your content plan together. We map the moments you already know you want, the people and vendors who matter to you, and the content we want to make across the weekend. Then we leave room for the moments nobody can plan.",
    library: "And we're planning more than your edits. We're building a library of your weekend, so the moments that don't make the first cut are still yours later.",
    captureLabel: "On the plan",
    capture: [
      "Sam getting ready",
      "JT and his crew",
      "The ceremony and the big emotional moments",
      "Both dresses and the fashion",
      "Your bridal party",
      "Reception energy and the dance floor",
      "Details, florals and the lake itself",
      "The candid moments in between",
      "Vendor features and short interviews",
      "The welcome party and the farewell",
    ],
    // Shown on the sample plan so nobody reads it as final.
    sampleNote: "A sample of how we plan. Yours is built together before the wedding.",
    // The sample plan drawn until media["content-plan"] has a real screenshot.
    sample: {
      path: ["Curated by Kea", "Clients", "Sam & JT"],
      title: "Sam & JT · Content Plan",
      props: [
        ["Dates", "July 9 to 11, 2027"],
        ["Location", "The villa, Lake Como"],
        ["Team", "Kea · Stephen"],
      ],
      views: ["By event", "By creator", "Vendor features"],
      columns: ["Moment", "Event", "Creator", "Focus", "Concept", "Deliverable", "Priority", "Status"],
      rows: [
        ["Guest arrivals on the dock", "Welcome party", "Stephen", "Guests", "Arrivals and first reactions", "Edited video", "High", "Planned"],
        ["Golden-hour couple moments", "Welcome party", "Kea", "Both", "Slow, candid couple reel", "Edited video", "High", "Planned"],
        ["Welcome toast", "Welcome party", "Kea", "Both", "Toast and crowd reactions", "Story-ready", "Medium", "Planned"],
        ["Sam getting ready", "Wedding day", "Kea", "Bride", "Getting ready, dress reveal", "Edited video", "High", "Planned"],
        ["JT getting ready", "Wedding day", "Stephen", "Groom", "JT and his crew", "Edited video", "High", "Planned"],
        ["Bridal party", "Wedding day", "Both", "Both", "Bridesmaids and groomsmen", "Story-ready", "Medium", "Draft"],
        ["Vows and first kiss", "Wedding day", "Both", "Both", "Two angles, wide and close", "Edited video", "High", "Planned"],
        ["Reception entrance", "Wedding day", "Both", "Both", "Entrance energy", "Edited video", "High", "Planned"],
        ["First dance", "Wedding day", "Both", "Both", "Close and wide", "Edited video", "High", "Planned"],
        ["Speeches", "Wedding day", "Kea", "Both", "Reactions around the room", "Archive", "Medium", "Draft"],
        ["Dance floor", "Wedding day", "Stephen", "Groom", "JT on the dance floor", "Edited video", "High", "Planned"],
        ["Vendor features", "Wedding day", "Stephen", "Vendors", "Vendor spotlights", "Edited video", "Medium", "Idea"],
        ["Vendor interviews", "Lead-up", "Kea", "Vendors", "Short interviews, the build", "Story-ready", "Medium", "Idea"],
        ["Pool and goodbyes", "Farewell", "Kea", "Both", "Slow morning recap", "Edited video", "Medium", "Draft"],
      ],
    },
  },

  // Kea's page. The founder and lead creative, so it carries the most weight.
  kea: {
    eyebrow: "La fondatrice · Meet Kea",
    name: "Kea",
    role: "Founder and lead creative · Houston based, available worldwide",
    philosophy: "If you felt it, I want it in the edit.",
    bio: [
      "I've spent three years building Curated by Kea around one idea: when you watch your wedding back, it should feel the way it felt to be there.",
      "I stay close without getting in the way. I pay as much attention to your people as I do to the timeline. And I know how to make content your community actually wants to watch. That's how my work has reached millions of views.",
    ],
    stats: [
      { value: "3 years", label: "Founder of Curated by Kea" },
      { value: "Millions", label: "Of views across my work" },
      { value: "23K+", label: "Community across Instagram and TikTok" },
      { value: "Essence", label: "Featured in Essence, seen on BET" },
    ],
    instagram: "@curatedxkea",
    instagramUrl: "https://instagram.com/curatedxkea",
    photo: "kea-photo",
    next: "Option Two adds Stephen as our second creator. Meet him next.",
  },

  // Stephen's page, right after Kea's. Begins selling Option Two.
  stephen: {
    eyebrow: "Il secondo sguardo · Meet Stephen",
    tag: "Second creator · Option Two",
    name: "Stephen",
    role: "Cinematic filmmaker and content creator",
    lead: "Stephen turns real moments into cinematic stories. Over a decade behind the lens, five years filming weddings and an audience of 40,000+ built on that look.",
    stats: [
      { value: "12+", label: "Years in video production" },
      { value: "40K+", label: "Followers built on cinematic content" },
      { value: "5", label: "Years filming weddings" },
    ],
    partnersLabel: "Brand work with",
    partners: ["Adobe", "Toyota", "Samsung", "Home Depot"],
    also: "Founder of Shooting Stars Content Academy, where he teaches creators to shoot cinematic content.",
    twoTitle: "What a second creator gets you",
    two: [
      { title: "Both of you, at the same time", line: "Sam getting ready and JT with his crew, covered side by side instead of one after the other." },
      { title: "More than one perspective", line: "The vows, the first kiss, the entrances, the first dance. One of us close, one of us wide." },
      { title: "More of the room", line: "Guests, reactions, vendors and details, captured while the two of you stay covered. All of it goes into your archive." },
    ],
    instagram: "@stephenxmichael",
    instagramUrl: "https://instagram.com/stephenxmichael",
    photo: "stephen-photo",
  },

  // Option Two opens selected and is marked as recommended.
  options: {
    eyebrow: "Le opzioni · Choose your coverage",
    title: "The way we'd recommend covering Lake Como.",
    defaultOption: "two",
    priceLabel: "Package investment",
    items: [
      {
        id: "one",
        tab: "Option One",
        who: "Kea",
        title: "One dedicated creator",
        line: "Me, capturing your weekend from a single perspective. It's focused, personal coverage. One creator follows one timeline at a time, so when two moments happen at once, I'm with one of them.",
        points: [
          "Kea across all three events",
          "One perspective, following the timeline as it unfolds",
          "All usable raw footage, your archive from one point of view",
        ],
        price: 2750,
        select: "Choose Option One",
      },
      {
        id: "two",
        tab: "Option Two",
        badge: "Recommended · The full weekend experience",
        who: "Kea + Stephen",
        title: "Two creators. Two perspectives. One complete story.",
        line: "With two of us there, your weekend doesn't have to happen from one point of view. While I'm with Sam, Stephen is with JT. While one of us follows the moment, the other catches the reaction.",
        points: [
          "Sam and JT covered at the same time on the wedding morning",
          "Complementary angles on the ceremony, first kiss, entrances and first dance",
          "Guests, details, vendors and behind the scenes, while you two stay covered",
          "A deeper raw archive: the moment and the reaction, both sides of the room, captured at the same time",
        ],
        closer: "More perspectives now means a richer library later, and a fuller story without pulling either of you away from living it.",
        price: 5250,
        select: "Choose Option Two",
      },
    ],
    footnote: "Your investment covers our content services and the travel already built into the package. Team lodging, the Milan and Lake Como transfers, and transportation during the weekend are separate. You can arrange them, or we can coordinate and invoice them for you. More on the next page.",
  },

  // What sits outside the package. Contract-level terms come later.
  logistics: {
    eyebrow: "Il viaggio · Travel and logistics",
    title: "What we'll need from you.",
    intro: "These sit outside the package investment. You can arrange them, or we can coordinate them and invoice separately. Whatever's easiest for you.",
    items: [
      { icon: "stay", title: "Lodging", line: "A 4 to 5 night stay for the team, depending on final flight schedules. Staying in your room block keeps it simple." },
      { icon: "car", title: "Transfers", line: "Round-trip transfer between Milan and Lake Como for the team and our gear." },
      { icon: "route", title: "Weekend transportation", line: "Rides to and from every scheduled event and required location." },
      { icon: "meal", title: "Meals", line: "One vendor meal per team member at each event, served during guest meal service." },
    ],
    convenience: {
      title: "Rather not manage it?",
      line: "We can coordinate transportation and logistics for you and invoice those costs separately.",
    },
    after: "Timing, terms and the fine print go in your contract once you decide to move forward.",
  },

  // Real client messages. Never write quotes here; add screenshots in media.
  love: {
    eyebrow: "Dalle mie coppie · Client love",
    title: "From the couples who've trusted me.",
    intro: "Straight from my messages.",
    slots: ["love-1", "love-2", "love-3", "love-4", "love-5"],
  },

  // The close. No hard sell.
  closing: {
    eyebrow: "Perché noi · Why us",
    title: "You live it. We'll keep it.",
    paragraphs: [
      "You've already put so much intention into bringing the people you love to Lake Como. Our job is to make sure you don't have to choose between living it and remembering it.",
      "Your photographer and videographer will give you the polished heirlooms. We keep the in-between: what it looked like, sounded like and felt like while it was happening. You'll leave Lake Como with edits to share now and a library of your weekend to come back to for years.",
      "We'll come in with a plan, stay close enough to catch the moments that matter, and leave room for the ones nobody could have planned.",
    ],
    two: "And with two of us there, your story doesn't have to happen from one point of view.",
    last: "If it feels like the right fit, we'd love to be there.",
    signature: "Kea",
    lake: "Ci vediamo al lago.",
  },
};
