// The repo now builds two products from one design language. Each has its own
// src/ tree, output file and page geometry; the scripts take a product key so
// `node build.mjs` and friends keep behaving exactly as they did.
export const PRODUCTS = {
  framework: {
    key: "framework",
    name: "Shooting Stars — Content Framework",
    src: "src",
    out: "dist/shooting-stars-ebook.html",
    pdf: "dist/Shooting-Stars-Content-Framework.pdf",
    standalone: "dist/Shooting-Stars-Content-Framework.html",
    screens: "build/screens",
    probe: "CONTENT FRAMEWORK 0123",
    geom: { left: 74, right: 74, hud: 56, spine: 34 },
  },
  iphone: {
    key: "iphone",
    name: "The iPhone Creator Guide",
    src: "src-iphone",
    out: "dist/iphone-creator-guide.html",
    pdf: "dist/The-iPhone-Creator-Guide.pdf",
    standalone: "dist/The-iPhone-Creator-Guide.html",
    screens: "build/screens-iphone",
    probe: "IPHONE CREATOR GUIDE 0123",
    geom: { left: 64, right: 64, hud: 52, spine: 34 },
  },
};

// Pulls a product key out of argv without disturbing positional args.
// Accepts `iphone`, `--iphone` or `--product=iphone`; defaults to framework.
export function pickProduct(argv) {
  const rest = [];
  let key = "framework";
  for (const a of argv) {
    const m = /^--product=(.+)$/.exec(a);
    if (m && PRODUCTS[m[1]]) { key = m[1]; continue; }
    if (PRODUCTS[a.replace(/^--/, "")]) { key = a.replace(/^--/, ""); continue; }
    rest.push(a);
  }
  return { product: PRODUCTS[key], rest };
}
