/**
 * AlmiCV — origin localization layer for the country CV hubs.
 *
 * Per the AlmiWorld Origin Localization Playbook: searchers from different
 * origins want the SAME destination CV but with a DIFFERENT lead worry. A
 * Pakistani applicant worries about getting shortlisted with no local
 * experience; an Indian applicant thinks ATS + skilled/PR-track targeting; a
 * Filipino nurse needs a registration-aware healthcare CV. So the origin page
 * leads with that worry — not a name-swapped generic body.
 *
 * Route: /cv-guide/[destination]/from-[origin] (mirrors AlmiPTE's
 * /pte-for/[dest]/from-[origin]). Dispatched inside the existing
 * /cv-guide/[country]/[role] route on the "from-" prefix — no role slug starts
 * with "from-", so there is no collision.
 *
 * HONESTY (founder doctrine): no fabricated stats, no "guaranteed job/interview",
 * AI output is review-before-send, and every credential/registration claim names
 * the real authority. "ATS-friendly resume" wording is kept deliberately — it is
 * the real high-volume search term from the network research.
 *
 * This module supplies copy + the index gate for the new page type only. It does
 * NOT change the existing country-hub / role×country canonicals or sitemap rules.
 */

import {
  ORIGINS as SHARED_ORIGINS,
  indefiniteArticle as sharedIndefiniteArticle,
} from "@smnasiruz016-blip/almi-data";

export type CvOrigin = { slug: string; name: string; flag: string };

// The 10 researched origins — identity now READ from the shared data layer
// (@smnasiruz016-blip/almi-data) instead of an inlined copy. Order preserved;
// verified identical to the prior inlined list. The CV ATS copy-templates below
// stay local (product voice); only the shared FACTS move.
export const CV_ORIGINS: CvOrigin[] = SHARED_ORIGINS.map((o) => ({
  slug: o.slug,
  name: o.name,
  flag: o.flag,
}));

// v1 destination markets these origins actually send CVs to (anglophone + Gulf
// + Germany). Origin pages render + index only for these; other served
// countries inherit the same template when promoted (data-only: add a slug).
export const CV_ORIGIN_DESTINATIONS = [
  "united-kingdom",
  "united-states",
  "canada",
  "australia",
  "germany",
  "ireland",
  "new-zealand",
  "saudi-arabia",
  "united-arab-emirates",
  "qatar",
] as const;

type DestMeta = {
  body: string; // "the UK", "Saudi Arabia" — for running prose
  isGulf: boolean;
  // Destination nurse-registration authority (for healthcare origins).
  nurseBody: string;
};

const DEST: Record<string, DestMeta> = {
  "united-kingdom": { body: "the UK", isGulf: false, nurseBody: "the NMC (with the NHS Health and Care Worker visa for sponsored roles)" },
  "united-states": { body: "the US", isGulf: false, nurseBody: "CGFNS and the NCLEX-RN" },
  canada: { body: "Canada", isGulf: false, nurseBody: "NNAS (the National Nursing Assessment Service) and the provincial regulator" },
  australia: { body: "Australia", isGulf: false, nurseBody: "AHPRA" },
  germany: { body: "Germany", isGulf: false, nurseBody: "the state nursing-recognition authority (Anerkennung)" },
  ireland: { body: "Ireland", isGulf: false, nurseBody: "the NMBI" },
  "new-zealand": { body: "New Zealand", isGulf: false, nurseBody: "the Nursing Council of New Zealand" },
  "saudi-arabia": { body: "Saudi Arabia", isGulf: true, nurseBody: "SCFHS (the Saudi Commission for Health Specialties)" },
  "united-arab-emirates": { body: "the UAE", isGulf: true, nurseBody: "the local health authority (DHA, DOH or MOHAP)" },
  qatar: { body: "Qatar", isGulf: true, nurseBody: "QCHP (the Qatar Council for Healthcare Practitioners)" },
};

function destBody(slug: string): string {
  return DEST[slug]?.body ?? slug;
}

export type CvOriginContent = {
  /** Hero sub-paragraph — leads with the origin's worry, destination-aware. */
  subHook: string;
  /** Origin-specific section. */
  heading: string;
  paras: string[];
  bullets: string[];
  /** Honesty edge — no guaranteed interview / scam-awareness. */
  callout: string;
};

// Shared honesty lines.
const NO_GUARANTEE =
  "No CV can guarantee an interview, and no honest service will promise one — what a strong, ATS-friendly CV does is make sure a real human (and the software in front of them) can actually read your experience. AI suggestions here are a draft to review and verify, never something to send unread.";
const NO_FEE_SCAM =
  "A real employer never charges you to apply, and no genuine recruiter asks for a fee to 'guarantee' a job or a visa. Keep your CV honest too — invented titles or dates get caught at reference checks.";

// How to present each origin's home credential on the CV (real authorities).
function presentationLine(originSlug: string, destSlug: string): string {
  const d = destBody(destSlug);
  switch (originSlug) {
    case "pakistan":
      return `Spell out your degree with its awarding university and, where an employer or licensing body asks, note that it is HEC-attested (Higher Education Commission) — that one line saves a back-and-forth when your qualification reaches ${d}.`;
    case "india":
      return `List your degree with the university and, for skilled/PR-track roles, be ready to reference a credential evaluation (e.g. WES) where ${d} employers or immigration ask for one.`;
    case "nigeria":
      return `Show your degree and, where relevant, your NYSC completion and WAEC/NECO results — and be ready for a credential evaluation if a ${d} employer or regulator requests one.`;
    case "bangladesh":
      return `Present your UGC-recognised degree clearly with the institution and dates; for academic or scholarship CVs, list your CGPA and any thesis/publications.`;
    case "nepal":
      return `List your degree (UGC-recognised) with institution and dates; for study-abroad CVs, include your academic record and any research, and note that studying abroad needs an NOC from the Ministry of Education.`;
    case "philippines":
      return `For healthcare roles, put your PRC licence (Professional Regulation Commission) and your registration status front and centre — ${d} health employers look for it first.`;
    case "vietnam":
      return `List your MOET-overseen qualifications with a clear English translation of titles; for healthcare roles, state your licence and clinical hours plainly.`;
    case "china":
      return `Give your degree with the university and, where ${d} admissions or employers ask, note CHSI/CHESICC verification — the Ministry of Education service international evaluators accept.`;
    case "egypt":
      return `Present your degree (overseen by the Supreme Council of Universities) with institution and dates; for academic/scholarship CVs add your grade and any research.`;
    case "sri-lanka":
      return `List your UGC-recognised degree (Sri Lanka's University Grants Commission — not Pakistan's HEC) with institution and dates; for nursing, state your SLMC registration.`;
    default:
      return "";
  }
}

// Destination convention reminder — the page already renders the full
// photo/DOB/length panel, so this just points the reader to the difference.
function conventionLine(destSlug: string): string {
  if (DEST[destSlug]?.isGulf) {
    return `Gulf CVs differ from Western ones: employers in ${destBody(destSlug)} often expect a photo, date of birth and nationality on the CV — the conventions panel below shows exactly what to include.`;
  }
  return `Leave the photo, date of birth and marital status off — screens in ${destBody(destSlug)} judge on experience, and these details can work against you. The conventions panel below has the specifics.`;
}

type Builder = (destSlug: string) => CvOriginContent;

const BUILDERS: Record<string, Builder> = {
  // ── Pakistan: shortlisted with no local experience; present overseas/Gulf work ─
  pakistan: (d) => {
    const body = destBody(d);
    return {
      subHook: `The hardest part of applying to ${body} from Pakistan isn't writing the CV — it's getting shortlisted when you have no local experience. This guide is built around that: an ATS-friendly CV that gets read, and an honest way to present your Pakistani and Gulf experience so it counts.`,
      heading: `Coming from Pakistan: getting shortlisted in ${body}`,
      paras: [
        `Applicants from Pakistan are often filtered out before a human ever reads the CV — either by ATS software that can't parse the layout, or because overseas experience is presented in a way ${body} employers don't recognise. Both are fixable.`,
      ],
      bullets: [
        `Make it ATS-friendly: one clean column, standard headings (Experience, Education, Skills), real text not images, and the exact keywords from the ${body} job description.`,
        `Present your experience in ${body} terms: convert responsibilities into outcomes with numbers (team size, budget, % improvement), and name well-known employers or projects so a recruiter can place you.`,
        `Gulf experience counts: if you've worked in Saudi Arabia, the UAE or Qatar, list it as international experience — it signals you can adapt to a new market.`,
        presentationLine("pakistan", d),
        conventionLine(d),
      ],
      callout: `${NO_GUARANTEE} ${NO_FEE_SCAM}`,
    };
  },

  // ── India: ATS + skilled/PR-track targeting; metrics ─────────────────────────
  india: (d) => {
    const body = destBody(d);
    return {
      subHook: `From India, the CV that works for ${body} is an ATS-friendly, metrics-led resume aimed at the skilled roles that also matter for migration. This guide leads with that: beat the ATS, quantify everything, and target the occupations ${body} actually hires and (where relevant) tracks for PR.`,
      heading: `Coming from India: an ATS-friendly CV for ${body} skilled roles`,
      paras: [
        `Indian applicants tend to write long, duty-heavy CVs; ${body} recruiters and their ATS reward short, quantified, keyword-matched ones. Targeting a recognised skilled occupation also keeps your CV aligned with any PR or work-visa route you're pursuing.`,
      ],
      bullets: [
        `Beat the ATS: single column, standard section names, no tables-as-layout or text-in-images, and the job description's keywords mirrored in your wording.`,
        `Quantify everything: replace "responsible for" lines with outcomes — revenue, users, latency, cost saved, team size. Numbers are what separate shortlisted CVs.`,
        `Target a recognised skilled role: align your title and skills with the occupation you're applying under, so the same CV supports both the job and any ${body} skilled/PR route.`,
        presentationLine("india", d),
        conventionLine(d),
      ],
      callout: `${NO_GUARANTEE} On PR: a CV supports a skilled application, but no document guarantees points or a visa — confirm the real criteria on the official immigration source.`,
    };
  },

  // ── Nigeria: shortlisting + present experience + scam-awareness ('Japa') ──────
  nigeria: (d) => {
    const body = destBody(d);
    return {
      subHook: `For "japa" applicants from Nigeria, the question under every ${body} application is the same: will my CV even get shortlisted? This guide answers it — an ATS-friendly CV that software can read, and an honest way to present Nigerian and overseas experience so it lands.`,
      heading: `Coming from Nigeria: getting shortlisted in ${body}`,
      paras: [
        `Nigerian applicants are frequently filtered by ATS software or passed over because strong experience is described in a way ${body} recruiters don't immediately recognise. A clean format and outcome-led wording fix most of it.`,
      ],
      bullets: [
        `Make it ATS-friendly: one column, standard headings, real text, and the keywords from the ${body} job advert — many CVs are rejected by software before a person sees them.`,
        `Turn duties into results: quantify with numbers and name recognisable employers, NGOs or projects so a ${body} recruiter can gauge your impact.`,
        `International experience helps: any Gulf, UK or remote work belongs near the top as evidence you adapt to new markets.`,
        presentationLine("nigeria", d),
        conventionLine(d),
      ],
      callout: `${NO_GUARANTEE} ${NO_FEE_SCAM}`,
    };
  },

  // ── Bangladesh: scholarship / academic CV + first job abroad ─────────────────
  bangladesh: (d) => {
    const body = destBody(d);
    return {
      subHook: `From Bangladesh, most ${body} applications are either a scholarship/academic CV or a first professional CV abroad. This guide leads with both: a clean academic CV that shows your record, and an ATS-friendly resume for your first role in ${body}.`,
      heading: `Coming from Bangladesh: academic CV and first job in ${body}`,
      paras: [
        `Whether you're applying for a funded place or your first job in ${body}, the same two things decide it: a format the reader (or the ATS) can parse, and an honest, specific account of what you've actually done.`,
      ],
      bullets: [
        `Academic CV: lead with education, CGPA, thesis and any publications or research — and keep it factual; admissions committees check.`,
        `First-job resume: make it ATS-friendly (one column, standard headings, job-description keywords) and turn coursework, internships and projects into concrete, quantified lines.`,
        `Show transferable strengths: language levels, tools, and any volunteering or leadership — useful when formal work history is short.`,
        presentationLine("bangladesh", d),
        conventionLine(d),
      ],
      callout: `${NO_GUARANTEE} A scholarship CV is never a guarantee of funding — present your real record well and apply to the named, free-to-apply scholarships rather than anyone charging a fee.`,
    };
  },

  // ── Nepal: scholarship/academic CV + first job abroad; earn-while-study ──────
  nepal: (d) => {
    const body = destBody(d);
    return {
      subHook: `From Nepal, a ${body} CV is usually for a scholarship, a first job, or part-time work alongside study. This guide leads with that: a clean academic CV and an ATS-friendly resume that present a short work history honestly and well.`,
      heading: `Coming from Nepal: academic CV and first job in ${body}`,
      paras: [
        `For most Nepali applicants the work history is early-stage, so the CV has to make education, projects and part-time experience count — clearly, and in a format ${body} readers and their software can parse.`,
      ],
      bullets: [
        `Academic CV: lead with your degree, record, thesis and research; keep every claim verifiable.`,
        `First-job / part-time resume: ATS-friendly layout, standard headings, and quantified lines from internships, campus roles or part-time work.`,
        `Make limited experience work: highlight tools, languages and responsibilities rather than padding — honest and specific beats long.`,
        presentationLine("nepal", d),
        conventionLine(d),
      ],
      callout: `${NO_GUARANTEE} Part-time work alongside study has legal hour limits in ${body} — confirm the current rule on the official source rather than any agent's promise.`,
    };
  },

  // ── Philippines: healthcare CV, registration-aware (NMC/AHPRA/NNAS) ──────────
  philippines: (d) => {
    const body = destBody(d);
    const nurse = DEST[d]?.nurseBody ?? "the destination health regulator";
    return {
      subHook: `From the Philippines, the strongest route to ${body} is healthcare — and a nurse or caregiver CV is judged differently from an office one. This guide leads with that: a registration-aware healthcare CV that puts your PRC licence, clinical hours and ${body} registration path up front.`,
      heading: `Coming from the Philippines: a registration-aware healthcare CV for ${body}`,
      paras: [
        `Nursing and caregiving are the Philippines' strongest corridors abroad, and ${body} health employers read for specifics: licence, registration status, clinical areas and hours. A general resume buries exactly what they're looking for.`,
      ],
      bullets: [
        `Lead with credentials: PRC licence, your registration path in ${body} (${nurse}), and your English test where the regulator requires one.`,
        `Make clinical experience concrete: ward/unit, patient load, specialties, procedures and total clinical hours — not just "provided patient care".`,
        `Keep it ATS-friendly: one column, standard headings, real text — agency and hospital systems both scan CVs before a person does.`,
        presentationLine("philippines", d),
        conventionLine(d),
      ],
      callout: `${NO_GUARANTEE} Registration with ${nurse} is a real, separate step from the CV — confirm its current requirements on the official source, and treat any agency that charges you a placement fee as a red flag.`,
    };
  },

  // ── Vietnam: healthcare/skilled CV, registration-aware ───────────────────────
  vietnam: (d) => {
    const body = destBody(d);
    const nurse = DEST[d]?.nurseBody ?? "the destination health regulator";
    return {
      subHook: `From Vietnam, many ${body} applications are healthcare or skilled-worker roles where the CV has to clear both a registration check and an ATS. This guide leads with that: a credential- and registration-aware CV with clean English titles employers in ${body} can read.`,
      heading: `Coming from Vietnam: a registration-aware skilled CV for ${body}`,
      paras: [
        `Vietnamese qualifications and job titles often need a clear English rendering before a ${body} employer or regulator can place them — and for healthcare roles, the registration path matters as much as the experience.`,
      ],
      bullets: [
        `Translate titles clearly: give an accurate English equivalent of your role and qualifications (overseen by MOET) so nothing is lost in screening.`,
        `For healthcare: lead with your licence, clinical hours and the ${body} registration path (${nurse}); state specialties plainly.`,
        `Keep it ATS-friendly: one column, standard headings, job-description keywords, quantified outcomes.`,
        presentationLine("vietnam", d),
        conventionLine(d),
      ],
      callout: `${NO_GUARANTEE} Where a role needs registration (${nurse}) or a specific language test, that's a separate step from the CV — confirm it on the official source.`,
    };
  },

  // ── China: competitive admissions / skilled CV; verified credentials ─────────
  china: (d) => {
    const body = destBody(d);
    return {
      subHook: `From China, a ${body} CV is usually for a competitive university place or a skilled role — both decided on a clear, verifiable record. This guide leads with that: a clean academic or professional CV with credentials a ${body} reader can verify, and no inflated claims.`,
      heading: `Coming from China: a verifiable CV for ${body}`,
      paras: [
        `Selective ${body} admissions and employers weigh your whole record and expect to verify it, so the CV's job is clarity and credibility — accurate titles, real outcomes, and credentials they can check.`,
      ],
      bullets: [
        `Academic CV: lead with your degree, GPA/rank, research, publications and any awards — specific and checkable.`,
        `Professional CV: ATS-friendly layout with quantified outcomes and the job description's keywords mirrored honestly.`,
        `Make credentials verifiable: note CHSI/CHESICC verification where ${body} admissions or employers ask for it.`,
        presentationLine("china", d),
        conventionLine(d),
      ],
      callout: `${NO_GUARANTEE} No CV or service can promise admission to a ranked university — present your real record well and let it stand on its own.`,
    };
  },

  // ── Egypt: scholarship/academic CV + Gulf/skilled work ───────────────────────
  egypt: (d) => {
    const body = destBody(d);
    const gulfLine = DEST[d]?.isGulf
      ? `Gulf employers in ${body} are a major corridor from Egypt — a clear, photo-and-nationality CV in their format helps here.`
      : `For ${body}, a Western-style, ATS-friendly resume (no photo) is the norm — keep it lean and outcome-led.`;
    return {
      subHook: `From Egypt, a ${body} CV is often for a funded scholarship or a skilled/Gulf role. This guide leads with both: a clean academic CV for scholarships, and an ATS-friendly resume tuned to how ${body} actually screens.`,
      heading: `Coming from Egypt: academic and skilled CVs for ${body}`,
      paras: [
        `Egyptian applicants split between scholarship/academic CVs and professional resumes for Gulf or skilled roles — and each is read differently, so the format should match the target.`,
      ],
      bullets: [
        `Academic CV: lead with your degree (overseen by the Supreme Council of Universities), grade, thesis and research; keep it factual.`,
        `Skilled resume: ATS-friendly, one column, quantified outcomes, and the job advert's keywords.`,
        gulfLine,
        presentationLine("egypt", d),
        conventionLine(d),
      ],
      callout: `${NO_GUARANTEE} A scholarship CV never guarantees funding — apply to the named, free-to-apply scholarships and let an honest record do the work.`,
    };
  },

  // ── Sri Lanka: scholarship/academic + nursing/skilled; UGC (not HEC) ─────────
  "sri-lanka": (d) => {
    const body = destBody(d);
    const nurse = DEST[d]?.nurseBody ?? "the destination health regulator";
    return {
      subHook: `From Sri Lanka, a ${body} CV is usually for a scholarship, a skilled role, or nursing migration. This guide leads with that — and keeps one detail accurate: your degree is UGC-recognised (Sri Lanka's University Grants Commission), not Pakistan's HEC.`,
      heading: `Coming from Sri Lanka: scholarship, skilled and nursing CVs for ${body}`,
      paras: [
        `Whether it's a funded place, a skilled role or a nursing post in ${body}, the CV has to present a UGC-recognised record clearly and, for healthcare, foreground the registration path.`,
      ],
      bullets: [
        `Academic / scholarship CV: lead with your UGC-recognised degree, grade, research and publications — verifiable throughout.`,
        `Nursing CV: put your SLMC registration, clinical hours and specialties up front, with the ${body} registration path (${nurse}).`,
        `Skilled resume: ATS-friendly layout, quantified outcomes, and the job description's keywords.`,
        presentationLine("sri-lanka", d),
        conventionLine(d),
      ],
      callout: `${NO_GUARANTEE} Registration (${nurse}) and scholarships are separate from the CV — confirm requirements on the official source and avoid any fee-charging "guarantee".`,
    };
  },
};

const ORIGIN_BY_SLUG = new Map(CV_ORIGINS.map((o) => [o.slug, o]));
export function findCvOrigin(slug: string): CvOrigin | undefined {
  return ORIGIN_BY_SLUG.get(slug);
}

// Index gate for the NEW page type: render + index only where the destination
// is a v1 market AND the origin is researched. Everything else 404s (no thin
// pages); promotion is data-only.
export function isCvOriginIndexable(destSlug: string, originSlug: string): boolean {
  return (
    (CV_ORIGIN_DESTINATIONS as readonly string[]).includes(destSlug) &&
    ORIGIN_BY_SLUG.has(originSlug)
  );
}

// Indefinite article — now re-exported from the shared data layer (was
// duplicated 3× across CV/Study/Salary). Same implementation; consumers that
// import { indefiniteArticle } from this module keep working unchanged.
export const indefiniteArticle = sharedIndefiniteArticle;

export function getCvOriginLocalization(
  originSlug: string,
  destSlug: string,
): CvOriginContent | null {
  if (!isCvOriginIndexable(destSlug, originSlug)) return null;
  return BUILDERS[originSlug](destSlug);
}
