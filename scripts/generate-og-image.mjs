// One-off generator for the default Open Graph / social preview image.
// Run: node scripts/generate-og-image.mjs
import sharp from "sharp";
import path from "node:path";

const width = 1200;
const height = 630;

const svg = `<svg width="${width}" height="${height}" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#101316"/>

  <rect x="0" y="0" width="1200" height="10" fill="#0f766e"/>

  <circle cx="1080" cy="120" r="220" fill="#0f766e" opacity="0.14"/>
  <circle cx="90" cy="560" r="260" fill="#0f766e" opacity="0.10"/>

  <text x="600" y="255" text-anchor="middle" font-family="Arial" font-size="92" font-weight="bold" fill="#ffffff">Mazad Yaghi</text>
  <text x="600" y="352" text-anchor="middle" font-family="Arial" font-size="58" font-weight="bold" fill="#0f766e">مزاد ياغي</text>

  <text x="600" y="448" text-anchor="middle" font-family="Arial" font-size="34" fill="#b9c2c9">Live auction lots — browse items and auction terms</text>

  <rect x="540" y="490" width="120" height="6" rx="3" fill="#0f766e"/>
</svg>`;

await sharp(Buffer.from(svg))
  .png({ compressionLevel: 9 })
  .toFile(path.join(process.cwd(), "public", "og-default.png"));

console.log("Wrote public/og-default.png");
