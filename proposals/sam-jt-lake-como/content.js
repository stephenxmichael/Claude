/*
  Sam & JT · Lake Como · content proposal
  ------------------------------------------------------------------
  EVERY word and EVERY media path in the deck lives in this file.
  Edit here; never touch assets/js/deck.js or the CSS to change copy.

  Media
  - A slot with src: "" shows a styled placeholder with its slot name.
  - To add a clip, drop the file in /media and set src, for example
      src: "media/hero-reel.mp4", poster: "media/hero-reel.jpg"
  - See media/README.md for sizes and aspect ratios.

  Placeholders
  - Anything written as [CONFIRM ...] or [KEA ...] is shown on the page
    with a dashed outline so it is easy to spot. Replace it before sending.
  - PLACEHOLDERS.md lists every one.

  Voice rules: short sentences, warm, no emojis, no em dashes.
*/
window.CONTENT = {
  meta: {
    title: "Sam & JT · Lake Como",
    description: "A content proposal from Curated by Kea for Sam & JT's wedding weekend at Lake Como, July 9 to 11, 2027.",
  },

  brand: {
    name: "Curated by Kea",
    // Path to the logo (SVG or transparent PNG). Empty shows a wordmark placeholder.
    logo: "",
    logoLight: "", // optional light version for dark slides
    instagram: "@curatedxkea",
    instagramUrl: "https://instagram.com/curatedxkea",
  },

  // ---------------------------------------------------------------
  // MEDIA · every clip and image in one place. Slides refer to these by name.
  // src: "media/hero-reel.mp4"   poster: "media/hero-reel.jpg"
  // ---------------------------------------------------------------
  media: {
    "hero-reel":     { kind: "video", aspect: "16:9", src: "", poster: "", alt: "Golden hour over Lake Como" },
    "day-welcome":   { kind: "video", aspect: "9:16", src: "", poster: "", alt: "Welcome boat party at golden hour" },
    "day-wedding":   { kind: "video", aspect: "9:16", src: "", poster: "", alt: "Sam and JT's wedding day at the villa" },
    "day-farewell":  { kind: "video", aspect: "9:16", src: "", poster: "", alt: "Farewell morning by the pool" },
    "bts-reel":      { kind: "video", aspect: "16:9", src: "", poster: "", alt: "Behind the scenes on the wedding morning" },
    "vendor-reel":   { kind: "video", aspect: "9:16", src: "", poster: "", alt: "A vendor interview at the villa" },
    "kea-reel":      { kind: "video", aspect: "9:16", src: "", poster: "", alt: "Kea's portfolio reel" },
    "stephen-reel":  { kind: "video", aspect: "9:16", src: "", poster: "", alt: "Stephen's portfolio reel" },
    "closing-reel":  { kind: "video", aspect: "16:9", src: "", poster: "", alt: "Closing reel from the weekend" },
    "vision-getting-ready": { kind: "image", aspect: "4:5", src: "", alt: "Getting ready on the wedding morning" },
    "vision-vendors":       { kind: "image", aspect: "4:5", src: "", alt: "Vendors at work at the villa" },
    "vision-bride":         { kind: "image", aspect: "4:5", src: "", alt: "Sam in her wedding dress" },
    "vision-party":         { kind: "image", aspect: "4:5", src: "", alt: "JT on the dance floor" },
    "vision-details":       { kind: "image", aspect: "4:5", src: "", alt: "Florals and table details in blush and plum" },
    "vision-grounds":       { kind: "image", aspect: "3:4", src: "", alt: "The villa grounds in summer light" },
  },

  // ---------------------------------------------------------------
  // TYPE · the display and text faces for the whole deck.
  //   "couture"  Rozha One headlines, Playfair italic accents, Jost text
  //   "villa"    Cinzel Roman capitals, Cormorant italic accents, Tenor Sans text
  //   "modern"   Syne headlines, Instrument Serif italic accents, Manrope text
  //   "original" Bodoni Moda and Jost (the first version)
  // typePicker shows an "Aa" switcher in the header so you can compare them
  // live. Set it to false before sending the link.
  // ---------------------------------------------------------------
  typeface: "couture",
  typePicker: true,

  // ---------------------------------------------------------------
  // DECK · which version to show.
  //   "condensed" 10 slides, built to win a side-by-side comparison
  //   "full"      all 21 slides
  // Reorder or remove ids to change a version.
  // ---------------------------------------------------------------
  deck: "condensed",
  orders: {
    condensed: ["cover", "us", "days", "vision", "vendors", "why", "team", "options", "logistics", "reserve"],
    full: [
      "cover", "contents", "story", "quote",
      "weekend", "friday", "saturday", "sunday",
      "vision", "bts", "vendors", "interviews", "bride-party", "details",
      "team", "options", "deliverables", "needs", "terms", "reserve", "closing",
    ],
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
      { text: "The party only you two could throw.", style: "small" },
    ],
    subline: "A content proposal from Curated by Kea · July 9 to 11, 2027",
    begin: "Begin",
    stamp: "Sam & JT · Lago di Como · MMXXVII · ",
    // Full-bleed background. With no src, a live painted lake at golden hour plays instead.
    video: "hero-reel",
    // Optional still for a slow Ken Burns fallback when there is no hero video.
    fallbackImage: "",
  },

  contents: {
    eyebrow: "Indice · Inside",
    title: "Your weekend, in chapters",
    note: "Tap any chapter to jump there. Use the arrows, swipe or your keyboard to move through.",
    // Chapters not in the current deck are skipped automatically.
    chapters: [
      { label: "Your story", to: "story" },
      { label: "Your story", to: "us" },
      { label: "The weekend", to: "weekend" },
      { label: "The weekend", to: "days" },
      { label: "The content vision", to: "vision" },
      { label: "The vendors behind the magic", to: "vendors" },
      { label: "Meet the team", to: "team" },
      { label: "Coverage options", to: "options" },
      { label: "Why Curated by Kea", to: "why" },
      { label: "Deliverables and turnaround", to: "deliverables" },
      { label: "What we'll need from you", to: "needs" },
      { label: "Good to know", to: "terms" },
      { label: "Logistics and fine print", to: "logistics" },
      { label: "Reserve your dates", to: "reserve" },
    ],
  },

  story: {
    eyebrow: "La vostra storia · Your story",
    title: "Best friends at fourteen. Everything since.",
    bigNumber: "14",
    bigNumberCaption: "The age you became best friends",
    paragraphs: [
      "You met at fourteen. You fell for each other in high school. You've been each other's plus-one ever since.",
      "Minnesota raised you. DC is home now. And the world has been your shared passport, one trip at a time.",
      "You've been to Lake Como three times. This time, it's the wedding.",
    ],
    journey: [
      { place: "Minnesota", note: "Where it started" },
      { place: "Washington, DC", note: "Home now" },
      { place: "Lake Como", note: "Trip no. 4. The wedding." },
    ],
  },

  quote: {
    text: "There is nothing like a Sam and JT party.",
    attribution: "Your words. We'll prove it on camera.",
  },

  // ---- Condensed deck: slides that combine sections of the full deck ----

  // Your story + the pull quote, on one slide.
  us: {
    eyebrow: "La vostra storia · Your story",
    beats: [
      { big: "14", label: "Best friends since", line: "You met at fourteen and fell for each other in high school." },
      { big: "MN · DC", label: "Where you've been", line: "Minnesota raised you. DC is home now. The world has been your shared passport." },
      { big: "No. 4", label: "Trips to Lake Como", line: "Three trips to the lake already. This time, it's the wedding." },
    ],
  },

  // The three days on one slide. Days, dates and clips come from weekend.days.
  days: {
    eyebrow: "Il fine settimana · The weekend",
    title: "Three days. One villa. Every moment.",
  },

  // Why hire us over another creator, with turnaround and deliverables.
  why: {
    eyebrow: "Perché noi · Why Curated by Kea",
    title: "Your heirlooms are covered. We capture the weekend as it happens.",
    body: "Mesus.studios and Unleashed Visuals will give you the photos and film you keep forever. We add the layer in between: the real-time, social-first story of your weekend, in your hands while you're still at the lake.",
  },

  // What we'll need + the terms, on one slide.
  logistics: {
    eyebrow: "Il necessario · What we'll need",
    title: "The logistics, simply.",
    columns: [
      {
        title: "Stay",
        lead: "One private hotel room. Check in July 7, check out July 12, 2027. Five nights.",
        items: [
          "Private bathroom, reliable Wi-Fi, climate control and a secure spot for gear",
          "All hotel and city taxes, plus early check-in or luggage storage if needed",
          "Ideally in your hotel block, approved by Curated by Kea before booking",
          "Option Two: Kea and Stephen share one room",
        ],
      },
      {
        title: "Getting around",
        lead: "Private transfers for the whole team and our gear.",
        items: [
          "Malpensa to the hotel, and to our departure point on July 12",
          "To, from and between every event and location",
          "A late-night ride home after the wedding",
          "Ideally, a dedicated media vehicle on the wedding day",
        ],
      },
      {
        title: "Meals",
        lead: "One vendor meal per team member at the welcome party, wedding and farewell, served during guest meal service.",
        items: [],
      },
    ],
    termsTitle: "Good to know",
  },

  weekend: {
    eyebrow: "Il fine settimana · The weekend",
    title: "Three days. One villa. Every moment.",
    intro: "Your weekend has a rhythm. Here's how we'll follow it, from the first toast on the water to the last goodbye by the pool.",
    location: "The villa at Lake Como",
    days: [
      {
        id: "friday",
        italian: "Venerdì 9 luglio",
        date: "Friday, July 9",
        title: "Welcome boat party",
        line: "Golden hour on the water. Arrivals, first toasts and the whole crew together for the first time.",
        capture: ["Golden hour on the lake", "Arrivals", "First toasts", "The crew together"],
        video: "day-welcome",
      },
      {
        id: "saturday",
        italian: "Sabato 10 luglio",
        date: "Saturday, July 10",
        title: "The wedding",
        line: "Getting ready. Both dresses. The bridal party of 18. The ceremony, the reception and JT on the dance floor.",
        capture: ["Getting ready", "Both dresses", "The bridal party of 18", "The ceremony", "The reception", "JT on the dance floor"],
        video: "day-wedding",
      },
      {
        id: "sunday",
        italian: "Domenica 11 luglio",
        date: "Sunday, July 11",
        title: "Farewell brunch or pool party",
        line: "Slow morning energy, poolside moments and the goodbyes nobody wants to say.",
        capture: ["Slow mornings", "Poolside moments", "Goodbyes"],
        video: "day-farewell",
      },
    ],
  },

  vision: {
    eyebrow: "La visione · The content vision",
    title: "What we'll capture",
    intro: "Six threads run through all three days. Together they tell the full story of your weekend.",
    pillars: [
      {
        id: "bts",
        title: "Behind the scenes and getting ready",
        line: "Everyone, both sides. The laughter, the nerves and the real moments before anyone is ready.",
        image: "vision-getting-ready",
      },
      {
        id: "vendors",
        title: "The vendors behind the magic",
        line: "A feature on each vendor and where in the world they came from.",
        image: "vision-vendors",
      },
      {
        id: "interviews",
        title: "Vendor interviews and the lead-up",
        line: "Short interviews before the wedding, and the build to the day.",
        image: "vendor-reel",
      },
      {
        id: "bride",
        title: "Bride-centered storytelling",
        line: "Sam first, always.",
        image: "vision-bride",
      },
      {
        id: "party",
        title: "The party",
        line: "The dancing, the energy and JT's personality at full volume.",
        image: "vision-party",
      },
      {
        id: "details",
        title: "The details",
        line: "The palette, the florals, both dresses and the villa grounds.",
        image: "vision-details",
      },
    ],
  },

  bts: {
    eyebrow: "Dietro le quinte · Behind the scenes",
    title: "The best footage happens before anyone is ready.",
    body: "Both getting-ready rooms. All 18 of your bridal party. The hands, the laughs, the quiet minute before the doors open. We'll be there for the real moments, on both sides.",
    video: "bts-reel",
  },

  vendors: {
    eyebrow: "La squadra · The vendors behind the magic",
    title: "A global team of Black vendors. One lake.",
    body: "You reached out to Black vendors from all over the world and built a team that looks like your community. We'll feature every one of them, and trace how each found their way to Lake Como.",
    mapNote: "Every pin lights a path to the lake.",
    destination: { name: "Lake Como", lat: 45.99, lng: 9.26 },
    // Where the couple's story began. Drawn as a dashed route to the lake.
    route: [
      { name: "Minnesota", note: "Where it started", lat: 46.0, lng: -94.3, label: "left" },
      { name: "Washington, DC", note: "Home now", lat: 38.9, lng: -77.0, label: "right" },
    ],
    // Add lat and lng for each vendor's home base to light their pin.
    // A vendor without coordinates is listed but not pinned.
    // Optional label: "left" | "right" | "below" | "above" if two names collide.
    list: [
      { name: "ellybevents", role: "U.S. planner", home: "United States [CONFIRM city]", lat: 38.0, lng: -97.0, label: "below" },
      { name: "moments_labs", role: "Italy planner", home: "Italy [CONFIRM city]", lat: 43.0, lng: 12.5, label: "below" },
      { name: "Unleashed Visuals", role: "Videography", home: "[CONFIRM home base]", lat: null, lng: null },
      { name: "Mesus.studios", role: "Photography", home: "[CONFIRM home base]", lat: null, lng: null },
      { name: "Winnie Couture", role: "Wedding dress", home: "[CONFIRM home base]", lat: null, lng: null },
      { name: "Vainglorious Brides", role: "Second dress", home: "[CONFIRM home base]", lat: null, lng: null },
    ],
  },

  interviews: {
    eyebrow: "Il conto alla rovescia · The lead-up",
    title: "Meet the makers before the magic.",
    body: "Short interviews with your vendors in the days before the wedding. The florals arriving, the tables going up, the villa becoming yours. By Saturday, your story has a cast.",
    video: "vendor-reel",
  },

  brideParty: {
    eyebrow: "Lei e la festa · Her and the party",
    bride: {
      title: "Sam first, always.",
      body: "This is a bride-centered weekend, and the edit follows. Both dresses. Her people. Her moments, front and center.",
    },
    party: {
      title: "Then JT turns it up.",
      body: "The dancing. The energy. The big personality that makes it a Sam and JT party.",
    },
  },

  details: {
    eyebrow: "I dettagli · The details",
    title: "Summer in Italy, in blush and plum.",
    body: "Classic from every angle. Bridesmaids in blush and prosecco, groomsmen in black, a deep plum running through it all. The florals, both dresses and grounds big enough to get lost in.",
    palette: [
      { name: "Blush", token: "blush" },
      { name: "Prosecco", token: "prosecco" },
      { name: "Deep plum", token: "plum" },
      { name: "Black tie", token: "ink" },
      { name: "Ivory", token: "ivory" },
    ],
    dresses: "Winnie Couture · Vainglorious Brides",
    images: ["vision-details", "vision-grounds"],
  },

  team: {
    eyebrow: "Chi siamo · Meet the team",
    title: "The eye behind your weekend",
    kea: {
      name: "Kea",
      role: "Content creator · Curated by Kea",
      bio: "[KEA BIO: two or three sentences on your style, how you work on a wedding day and why this weekend matters to you.]",
      instagram: "@curatedxkea",
      instagramUrl: "https://instagram.com/curatedxkea",
      video: "kea-reel",
    },
    optionTwoNote: "Choosing Option Two adds Stephen to the team. Meet him on the next slide.",
  },

  options: {
    eyebrow: "Le opzioni · Coverage options",
    title: "Choose your coverage",
    priceLabel: "Flat travel investment",
    note: "No separate content package fee. Your investment covers the team's travel to Lake Como.",
    items: [
      {
        id: "one",
        tab: "Option One",
        title: "Kea, your content creator",
        line: "One creator, fully devoted to your weekend and your story.",
        price: 2750,
      },
      {
        id: "two",
        tab: "Option Two",
        title: "Kea and Stephen, a two-creator team",
        line: "More angles and more moments covered at once. While one of us is with Sam, the other can be on the dance floor with JT.",
        price: 5250,
      },
    ],
    stephen: {
      name: "Stephen",
      role: "Cinematic filmmaker and content creator",
      bio: "12+ years in video production. [KEA: add a line or two on Stephen's style.]",
      instagram: "@stephenxmichael",
      instagramUrl: "https://instagram.com/stephenxmichael",
      video: "stephen-reel",
    },
    hoursTitle: "Proposed coverage",
    hoursLabel: "To be finalized together",
    hours: [
      { event: "Welcome party", hours: 4 },
      { event: "Wedding day", hours: 10 },
      { event: "Farewell", hours: 3 },
    ],
  },

  deliverables: {
    eyebrow: "Le consegne · Deliverables and turnaround",
    title: "Fast footage. Finished stories.",
    stats: [
      { value: "24", unit: "hours", label: "Raw footage", note: "Our goal for delivery, depending on Wi-Fi and connectivity at the villa." },
      { value: "5 to 7", unit: "business days", label: "Edited content", note: "After the final event of the weekend." },
    ],
    listTitle: "What you'll receive",
    // Replace each [CONFIRM] with the real deliverable, count and format.
    rows: [
      { item: "Welcome boat party", detail: "[CONFIRM deliverable, count and format]" },
      { item: "Wedding day", detail: "[CONFIRM deliverable, count and format]" },
      { item: "Farewell", detail: "[CONFIRM deliverable, count and format]" },
      { item: "Vendor features and interviews", detail: "[CONFIRM deliverable, count and format]" },
      { item: "Raw footage", detail: "[CONFIRM delivery method]" },
    ],
  },

  needs: {
    eyebrow: "Il necessario · What we'll need from you",
    title: "A few things keep us rested, connected and ready.",
    columns: [
      {
        title: "Stay",
        lead: "One private hotel room. Check in Wednesday, July 7. Check out Monday, July 12, 2027. Five nights.",
        items: [
          "Private bathroom",
          "Reliable Wi-Fi",
          "A secure spot for equipment",
          "Climate control",
          "All hotel and city taxes",
          "Early check-in or luggage storage if needed",
          "Ideally within your hotel block, approved by Curated by Kea before booking",
          "Option Two: Kea and Stephen share one room",
        ],
      },
      {
        title: "Getting around",
        lead: "Private transfers for the whole team and our gear.",
        items: [
          "Malpensa to the hotel",
          "To and from each event",
          "Between getting-ready, ceremony and reception locations",
          "A late-night ride home after the wedding",
          "A ride to the team's departure point on July 12",
          "Ideal: a dedicated vehicle for the media team on the wedding day",
        ],
      },
      {
        title: "Meals",
        lead: "One vendor meal per team member at each event, served during guest meal service.",
        items: ["Welcome party", "Wedding", "Farewell"],
      },
    ],
  },

  terms: {
    eyebrow: "Da sapere · Good to know",
    title: "The fine print, kept short.",
    items: [
      { title: "If the day runs long", body: "Overtime or schedule delays past the contracted time are $350 per hour, plus extended private transportation." },
      { title: "If a transfer falls through", body: "If a promised transfer falls through, the team books a reasonable replacement and the added cost is billed to you." },
      { title: "If travel is disrupted", body: "Flight delays or cancellations are handled through travel insurance first. Necessary costs outside insurance may be billed separately." },
      { title: "If the ceremony is in a church", body: "Any filming permits, credentials or fees are covered by the couple. We'll confirm filming rules in advance." },
      { title: "After the weekend", body: "The team's personal travel after July 12 is never billed to you." },
    ],
  },

  reserve: {
    eyebrow: "Prenota · Reserve your dates",
    title: "Two steps to the lake.",
    schedules: {
      one: [
        { when: "At signing", amount: 1500, what: "Nonrefundable reservation retainer" },
        { when: "May 10, 2027", amount: 1250, what: "Remaining balance" },
      ],
      two: [
        { when: "At signing", amount: 3000, what: "Nonrefundable reservation retainer" },
        { when: "May 10, 2027", amount: 2250, what: "Remaining balance" },
      ],
    },
    note: "Your retainer secures the dates and books airfare. Card and portal payments include a 3.5% processing fee. Zelle is available with no fee.",
    cta: "Reserve Sam & JT's weekend",
    // Shown under the button in the condensed deck, which has no closing slide.
    signoff: "Ci vediamo al lago.",
    // Booking or contact link. Leave empty until it's ready; the button is flagged.
    ctaUrl: "",
  },

  closing: {
    eyebrow: "A presto · See you soon",
    line: "Ci vediamo al lago.",
    translation: "See you at the lake.",
    signoff: "Curated by Kea.",
    footer: "A content proposal prepared for Sam & JT · The villa at Lake Como · July 9 to 11, 2027",
    video: "closing-reel",
  },
};
