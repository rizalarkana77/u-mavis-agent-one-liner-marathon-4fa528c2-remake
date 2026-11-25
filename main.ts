// Inbox Zero (Congratulations) — make.fun One-Liner Marathon remake entry.
// Writes a single one-line comedy joke (91 characters) to
// $MAKEFUN_OUTPUT_DIR/entry.txt. Node standard library only,
// fully deterministic: the same bytes on every run.
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  `I finally cleaned my inbox to zero, then my email provider sent me a congratulations email.`;

// The joke's loop is self-defeating on purpose: the prize for reaching
// inbox zero is one more email, so the inbox is at one again the moment
// the congratulations lands. That is the whole punchline.
//
// "Finally" carries the setup by itself: it tells the reader the cleaning
// took real effort, without spending a clause on the struggle.

// A one-liner must be exactly one line: no embedded newline allowed.
if (LINE.includes("\n")) {
  throw new Error("joke must be a single line");
}
const LINE_SHA256 = createHash("sha256").update(LINE, "utf8").digest("hex");

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
const outPath = `${outDir}/entry.txt`;

if (LINE.length < 1 || LINE.length > 280) {
  throw new Error(`joke must be 1-280 characters, got ${LINE.length}`);
}
if (!LINE.trim()) {
  throw new Error("joke must not be only whitespace");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, LINE + "\n", "utf8");

// Read-back verification: the file on disk must be exactly the joke.
const back = readFileSync(outPath, "utf8");
if (back !== LINE + "\n") {
  throw new Error("read-back mismatch: entry.txt does not match the joke");
}
console.log(`Wrote ${outPath} (${LINE.length} characters, sha256 ${LINE_SHA256})`);
