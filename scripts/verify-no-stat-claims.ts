// THE UNSOURCED-STATISTIC GATE.
//
//   npx tsx scripts/verify-no-stat-claims.ts
//
// Offline. No database, no network, no key. Armed in `prebuild`.
//
// -- WHY ----------------------------------------------------------------------
// PR #96 removed the debunked "around 75% of resumes are filtered out by ATS"
// line from two marketing surfaces. Its sweep then found 31 more of the same
// shape in src/lib/role-cv-content.ts, including FOUR mutually contradictory
// ATS-adoption figures - 97%+, 95%+, 75%+ and 62% - in one file. Four numbers
// for one fact cannot all be right, and that is what retired the file's claim to
// being sourced. This PR strips them.
//
// Stripping them once is worth very little. The next role entry someone writes
// will reach for a percentage because percentages feel authoritative, and nobody
// will notice for a year. So the CLASS is gated, not the instances: a number
// asserted about employers, recruiters, postings or ATS fails the build unless a
// source URL travels with it.
//
// -- WHAT COUNTS, AND WHY THE EXCLUSIONS ARE CONTEXTUAL, NOT AN ALLOWLIST ------
// A string of banned phrases would be worthless: it catches the last defect and
// nothing else (the AlmiPTE lesson - a banned-string scan passed on all 91 tips
// that named their own answers). So the rule is structural.
//
// A finding is a number that QUANTIFIES A POPULATION of employers, recruiters or
// postings - "97%+ of companies", "appear in 85%+ of nursing job descriptions",
// "recruiters scan the first 7 seconds" - or an invented threshold about how ATS
// software behaves. See RULES below; each rule is a shape, not a phrase.
//
// That shape test is what excludes the four false-positive classes PR #96
// identified, and it excludes them by what they ARE rather than by naming them:
//
//   1. CSS/SVG values, and sample CV content inside template previews -> those
//      files are not scanned at all. SCANNED lists exactly what is, and why.
//   2. Quantified-bullet EXAMPLES showing a user how to write ("cut design time
//      25%", "coordinated 60+ meetings/week ... with 99% accuracy") -> the number
//      quantifies the reader's own achievement, so no population follows it.
//   3. Our own product copy ("this usually takes 5-15 seconds", "25% of our sales
//      go to the Shamool Foundation") -> same mechanism; "our sales" is not a
//      population of employers, and the timing line names no recruiter.
//   4. Comments -> a comment is not shipped copy, and this gate's own header
//      quotes the retired figures. A check that fires on its own explanation of
//      the defect is a check that gets deleted (the "fire on the defect, not the
//      disclosure" rule).
//
// An accompanying source URL on the same line is the documented escape hatch:
// the objection is to unsourced numbers, not to numbers.

import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOT = resolve(__dirname, "..");

/** The copy-bearing surfaces. Adding a file here is how the gate grows; a file
 *  NOT here is out of scope on purpose and the reason is recorded next to it. */
const SCANNED: ReadonlyArray<{ file: string; why: string }> = [
  { file: "src/lib/role-cv-content.ts", why: "role guidance rendered on every /cv-guide and role-hub page" },
  { file: "src/lib/free-cv-content.ts", why: "free-tier CV guidance, same surfaces" },
  { file: "src/lib/cv-conventions.ts", why: "country convention notes rendered on /cv-guide/[country]/[role]" },
  { file: "src/app/page.tsx", why: "the homepage - where the 75% claim lived" },
  { file: "src/components/cv-master.tsx", why: "shared marketing sections on every pSEO page" },
];

/** The /learn corpus is scanned as a DIRECTORY, not a fixed list: the whole
 *  point of that system is that guide 26 needs no code change, so a gate that
 *  named its files would go stale the first time one landed. */
const SCANNED_DIRS: ReadonlyArray<{ dir: string; ext: string; why: string }> = [
  { dir: "content/learn", ext: ".md", why: "the /learn guides — long-form pages that quote statistics on purpose" },
];

/** THE RULES. Each is a SHAPE - a number bound to a population of employers,
 *  postings or recruiters - not a phrase anybody has to remember.
 *
 *  A first version of this gate used proximity instead: a number within 90
 *  characters of a world word. It went red on eleven quantified-bullet examples
 *  ("coordinated 60+ meetings/week ... with 99% accuracy" sits on the same line
 *  as the word "postings") while its controls stayed green, because the fixtures
 *  did not contain that state. Proximity cannot tell "90% of postings" from "90%
 *  accuracy"; what separates them is whether the number quantifies a POPULATION.
 *  Hence `of <world-noun>` rather than "near a world noun". */
const WORLD_POPULATION =
  /(employer|recruiter|compan|firm|carrier|insurer|organi[sz]ation|posting|job description|role|resume|résumé|hiring manager|applicant)/i;

type Rule = { name: string; test: (line: string) => RegExpMatchArray | null };

const RULES: readonly Rule[] = [
  {
    // "97%+ of companies filter with ATS", "appear in 85%+ of nursing job
    // descriptions", "on 90% of rejected physician resumes", "62% of employers".
    // The share of a POPULATION. "numbers in 70%+ of bullets" is not one: bullets
    // are the reader's own document, so no world noun follows `of`.
    name: "share-of-a-population",
    test: (line) => {
      const re = /\d+\s*%\+?\s*of\s+([\w ,/'-]{0,45})/gi;
      let m: RegExpExecArray | null;
      while ((m = re.exec(line)) !== null) {
        if (WORLD_POPULATION.test(m[1])) return m;
      }
      return null;
    },
  },
  {
    // "ATS clears when keyword overlap ... is ~70%+", "15-25 keywords at 60-80%
    // coverage", "parsers penalize density above ~1.5%" - invented thresholds
    // asserted about how the software behaves.
    name: "invented-threshold-about-ATS-behaviour",
    test: (line) => line.match(/(overlap|coverage|density|parsers?\s+penali[sz]e)[^.]{0,40}?~?\d+\s*%/i)
      ?? line.match(/~?\d+\s*%[^.]{0,20}?(overlap|coverage|density)/i),
  },
  {
    // "Recruiters scan the first 7 seconds", "visible in the first 6 seconds".
    // Our own product timing ("this usually takes 5-15 seconds") has no recruiter
    // or ATS in it, so it is not a finding.
    name: "recruiter-attention-in-N-seconds",
    test: (line) => {
      // No word-boundary escape here: an earlier write halved it and it reached disk as a literal
      // BACKSPACE, so this pattern matched nothing and the control below went red.
      const m = line.match(/\d+\s*seconds?/i);
      if (!m) return null;
      return /(recruiter|hiring manager|employer|ATS|skim|first \d+\s*seconds)/i.test(line) ? m : null;
    },
  },
];

/** Evidence that the number is sourced. A URL on the line is enough. */
const HAS_SOURCE = /https?:\/\//i;

/** Strip comments so the gate never fires on an explanation of the defect.
 *  Line comments and block comments both go; offsets and line count are kept. */
export function stripComments(src: string): string {
  const NL = String.fromCharCode(10);
  // Built from a character code, not a backslash escape. An earlier revision of
  // this file was written through a shell heredoc that halved the escape, so the
  // newline landed in the source as a real line break and split the regex in two.
  const notNL = new RegExp("[^" + NL + "]", "g");
  const blanked = src.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(notNL, " "));
  const lineComment = new RegExp("(^|[^:])\\/\\/[^" + NL + "]*", "g");
  return blanked.replace(lineComment, (m, p1) => p1 + " ".repeat(m.length - p1.length));
}

export type Finding = { file: string; line: number; rule: string; hit: string; context: string };

/** The detector, exported so the controls below can drive it on fixtures. */
/** ATTRIBUTION, for prose.
 *
 *  The /learn guides quote statistics ON PURPOSE — one of them exists to trace
 *  the "75% of resumes are rejected" myth to a 2014 Forbes contributor piece and
 *  say where it came from. Banning numbers there would ban the article.
 *
 *  What separates that from the defect this gate was built for is ATTRIBUTION:
 *  the guide says who claims the number. So for markdown the unit of judgement
 *  is the PARAGRAPH, not the line — these files are hard-wrapped, so a
 *  line-based scan reads "48% of employers filtering middle-skills" with the
 *  words "The report says" sitting on the line above, invisible to it.
 *
 *  A paragraph is attributed when it quotes, links, or names who says it. That
 *  last clause is a list of cues, and a list of cues is the thing this file
 *  elsewhere argues against — so be honest about it: attribution is a linguistic
 *  act and there is no purely structural test for it. The cues are kept few and
 *  each is controlled below. A bare assertion carries none of them, which is the
 *  case that matters. */
const ATTRIBUTION: readonly RegExp[] = [
  /["“”]/,                                   // a quotation
  /^\s*>/m,                                            // a blockquote
  /\[[^\]]+\]\(https?:\/\//,                          // a markdown link
  /https?:\/\//,                                       // a bare URL
  /\b(according to|per)\s+[A-Z]/,                      // "according to Workday"
  /\b(survey|surveyed|study|studies|report|reports|reported|data|figures|research|headline|traced|analysis)\b/i,
  /\b[A-Z][\w.'-]*(?:\s+[A-Z][\w.'-]*)*\s+(?:says|said|found|finds|notes|puts|estimates|puts it)\b/,
];

export function isAttributed(block: string): boolean {
  return ATTRIBUTION.some((re) => re.test(block));
}

/** Blank-line-separated blocks, with the 1-based line number each starts on. */
export function paragraphs(src: string): Array<{ text: string; line: number }> {
  const NL = String.fromCharCode(10);
  const lines = src.split(NL);
  const out: Array<{ text: string; line: number }> = [];
  let buf: string[] = [];
  let start = 1;
  lines.forEach((l, i) => {
    if (l.trim() === "") {
      if (buf.length) { out.push({ text: buf.join(" "), line: start }); buf = []; }
    } else {
      if (!buf.length) start = i + 1;
      buf.push(l);
    }
  });
  if (buf.length) out.push({ text: buf.join(" "), line: start });
  return out;
}

export function findStatClaims(file: string, src: string): Finding[] {
  const out: Finding[] = [];
  const isProse = file.endsWith(".md");
  const units = isProse
    ? paragraphs(src)
    : stripComments(src).split(String.fromCharCode(10)).map((text, i) => ({ text, line: i + 1 }));

  for (const { text, line } of units) {
    if (HAS_SOURCE.test(text)) continue;
    if (isProse && isAttributed(text)) continue;
    for (const rule of RULES) {
      const m = rule.test(text);
      if (!m) continue;
      const at = m.index ?? 0;
      out.push({
        file, line, rule: rule.name, hit: m[0].trim(),
        context: text.slice(Math.max(0, at - 70), Math.min(text.length, at + m[0].length + 70)).trim(),
      });
    }
  }
  return out;
}

let pass = 0, fail = 0;
function check(name: string, ok: boolean, detail = "") {
  if (ok) { pass++; console.log(`  ok   ${name}`); }
  else { fail++; console.log(`  FAIL ${name}${detail ? ` - ${detail}` : ""}`); }
}

console.log("CONTROLS (the detector must fire on a defect and stay silent on the four excluded classes)");
check("FIRES on a planted adoption claim",
  findStatClaims("fixture", 'atsNote: "87% of recruiters filter with ATS first.",').length === 1);
const SECONDS_FIXTURE = 'atsNote: "Recruiters scan the first 7 seconds for your title.",';
check("FIRES on a planted N-seconds claim about recruiters",
  findStatClaims("fixture", SECONDS_FIXTURE).length === 1,
  JSON.stringify(findStatClaims("fixture", SECONDS_FIXTURE)));
check("FIRES on a keywords-in-N%-of-postings claim",
  findStatClaims("fixture", 'atsNote: "These appear in 90%+ of nursing postings.",').length === 1);
check("FIRES on an invented ATS threshold",
  findStatClaims("fixture", 'atsNote: "ATS clears when keyword overlap is ~70%+.",').length === 1);
check("FIRES on a share-of-roles claim",
  findStatClaims("fixture", 'atsNote: "70% of structural roles require it.",').length === 1);
// The five below are the states that actually broke the FIRST version of this
// gate: each sits on a line that also contains a world word, and each went red
// while the then-controls stayed green. They are fixtures now.
check("SILENT on a quantified-bullet EXAMPLE (the number quantifies the reader)",
  findStatClaims("fixture", 'atsNote: "quantify (e.g. cut design time 25%).",').length === 0);
check("SILENT on a bullet example sharing a line with the word postings",
  findStatClaims("fixture",
    'atsNote: "These run through admin postings - quantify (e.g. coordinated 60+ meetings/week for 5 executives with 99% accuracy).",').length === 0);
check("SILENT on a bullet example sharing a line with the word ATS",
  findStatClaims("fixture",
    'atsNote: "avoid icons/skill-bars ATS cannot read, and quantify (e.g. organic traffic +35%, ad ROI +25%).",').length === 0);
check("SILENT on document-position advice (the reader's own CV, not the world)",
  findStatClaims("fixture", 'length: "ATS parses top-to-bottom - put credentials in the first 20%.",').length === 0);
check("SILENT on advice about the share of the reader's OWN bullets",
  findStatClaims("fixture", 'atsNote: "put numbers in at least 70% of bullets.",').length === 0);
check("SILENT on a bullet example sharing a line with hiring managers",
  findStatClaims("fixture",
    'atsNote: "Show proof (Reduced material waste 15%); hiring managers want on-time delivery.",').length === 0);
check("SILENT on our own product timing",
  findStatClaims("fixture", '<p>This usually takes 5-15 seconds.</p>').length === 0);
check("SILENT on the Shamool commitment (subject is our sales)",
  findStatClaims("fixture", '<span>25% of our sales go to the Shamool Foundation in Lahore</span>').length === 0);
check("SILENT on a CSS/SVG value",
  findStatClaims("fixture", 'const seg = [["18%", "#FF4D9D"], ["12%", "#7C5CFF"]];').length === 0);
// -- prose (.md) controls: attribution is what separates a quoted statistic from
// -- an asserted one, and a bare assertion must still fire.
const BARE_MD = "Recruiters are ruthless. 87% of recruiters filter with ATS before a human sees your CV.";
check("PROSE: FIRES on a bare unattributed statistic in a .md paragraph",
  findStatClaims("content/learn/x.md", BARE_MD).length === 1);
check("PROSE: SILENT once the same claim is quoted",
  findStatClaims("content/learn/x.md",
    'The vendor guide asserts "87% of recruiters filter with ATS before a human sees your CV."').length === 0);
check("PROSE: SILENT once the same claim is attributed to a named source",
  findStatClaims("content/learn/x.md",
    "HR.com reports that 87% of recruiters filter with ATS before a human sees your CV.").length === 0);
check("PROSE: SILENT once the same claim carries a markdown link",
  findStatClaims("content/learn/x.md",
    "87% of recruiters filter with ATS ([HR.com](https://www.hr.com/x)).").length === 0);
// The hard-wrap case: this is why prose is judged per PARAGRAPH. Line-by-line,
// the number and its attribution sit on different lines and the attribution is
// invisible — which is exactly how the real guides read.
const WRAPPED = [
  "The report says \"Almost half the companies surveyed weeded out resumes",
  "that present such a work gap.\" Its figures put that at 48% of employers",
  "filtering middle-skills candidates on gaps of more than six months.",
].join(String.fromCharCode(10));
check("PROSE: SILENT on a hard-wrapped attributed claim (the line-based scan flagged this)",
  findStatClaims("content/learn/x.md", WRAPPED).length === 0);
check("PROSE: a bare claim hard-wrapped the same way STILL fires",
  findStatClaims("content/learn/x.md",
    ["Keyword-stuff to beat the robot. 87% of recruiters", "filter with ATS first."].join(String.fromCharCode(10))
  ).length === 1);
check("PROSE: paragraphs() splits on blank lines and keeps line numbers",
  (() => { const ps = paragraphs(["a", "", "b", "c"].join(String.fromCharCode(10)));
    return ps.length === 2 && ps[1].line === 3; })());
// A .ts file must keep the LINE-based behaviour: it is not prose, and attribution
// cues must not buy a role-content string an exemption.
check("CODE: a .ts statistic is NOT excused by the word 'survey' on the line",
  findStatClaims("src/lib/x.ts",
    'atsNote: "Our survey shows 87% of employers filter with ATS.",').length === 1);
check("SILENT on a claim that carries a source URL",
  findStatClaims("fixture", 'note: "92% of recruiters say ATS do not auto-reject (https://www.hr.com/x)",').length === 0);
check("SILENT on a line comment that quotes a retired figure",
  findStatClaims("fixture", '// this file once claimed 97% of firms use ATS').length === 0);
check("SILENT on a block comment that quotes a retired figure",
  findStatClaims("fixture", '/** carried 97%+, 95%+, 75%+ and 62% with no source */').length === 0);
check("stripComments preserves line numbering",
  stripComments("a\n/* x\n y */\nb").split("\n").length === 4);

console.log("\nSCANNED SURFACES");
const findings: Finding[] = [];
for (const { file, why } of SCANNED) {
  const abs = join(ROOT, file);
  if (!existsSync(abs)) { check(`${file} exists`, false, "listed in SCANNED but not on disk"); continue; }
  const f = findStatClaims(file, readFileSync(abs, "utf8"));
  findings.push(...f);
  check(`${file} carries no unsourced world-statistic  (${why})`, f.length === 0,
    f.map((x) => `line ${x.line} [${x.rule}]: "${x.hit}" in ...${x.context}...`).join("  |  "));
}
for (const { dir, ext, why } of SCANNED_DIRS) {
  const abs = join(ROOT, dir);
  if (!existsSync(abs)) { check(`${dir}/ exists`, false, "listed in SCANNED_DIRS but not on disk"); continue; }
  const files = readdirSync(abs).filter((f) => f.endsWith(ext)).sort();
  check(`${dir}/ has files to scan — ${files.length}  (${why})`, files.length > 0,
    "a zero here is an empty corpus, not a clean one");
  for (const f of files) {
    const hits = findStatClaims(`${dir}/${f}`, readFileSync(join(abs, f), "utf8"));
    findings.push(...hits);
    check(`${dir}/${f}`, hits.length === 0,
      hits.map((x) => `line ${x.line} [${x.rule}]: "${x.hit}"`).join("  |  "));
  }
}
check("the scan looked at files at all", SCANNED.length + SCANNED_DIRS.length > 0,
  `${SCANNED.length} files + ${SCANNED_DIRS.length} directories`);

if (findings.length) {
  console.log("\nFINDINGS");
  for (const f of findings) console.log(`  ${f.file}:${f.line}  [${f.rule}]  "${f.hit}"
      ...${f.context}...`);
  console.log("\nEach is a number asserted about employers, recruiters, postings or ATS with no");
  console.log("source. Rewrite the sentence to carry the advice without the number, or put a");
  console.log("source URL on the line. Do not invent one.");
}

console.log(`\n${fail === 0 ? "PASS" : "FAIL"} - ${pass} passed, ${fail} failed`);
process.exit(fail === 0 ? 0 : 1);
