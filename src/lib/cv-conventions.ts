/**
 * AlmiCV — CV conventions per country.
 *
 * Static deterministic table covering all 193 served countries. Drives
 * the `/cv-guide/[country]/[role]` page's "Common in {Country}" section.
 *
 * HONESTY DOCTRINE: copy on the page must read "Common in {Country}: …"
 * — NEVER "{Country} CVs MUST include …". These are convention defaults,
 * not rules. The page directs visitors to verify with their target
 * employer for each application.
 *
 * Where a country isn't individually verified, we use the regional
 * default for its 14-region bucket (see `lib/countries.ts:Region`) and
 * mark the entry `// regional default`. Country-specific overrides
 * each carry a `sources` array; see the note above COUNTRY_OVERRIDES for
 * why every one of them is currently empty.
 */

import type { Region } from "./countries";
import { COUNTRIES_SERVED } from "./countries";

export type PageLength = "1-page" | "2-page" | "flexible";
export type PhotoConvention = "required" | "optional" | "avoid";
export type AddressConvention = "full" | "city-only" | "avoid";
export type DOBConvention = "common" | "avoid";
export type GPAConvention = "common" | "optional" | "avoid";
export type ReferenceConvention = "list" | "available-on-request" | "avoid";

/** A hand-verified country entry. `sources` is REQUIRED and must not be empty —
 *  scripts/verify-conventions.ts fails on an entry without one. Regional defaults
 *  are exempt: they are labelled defaults on the page, and claim nothing about a
 *  specific country. */
export type VerifiedCountryConvention = CountryConvention & { sources: string[] };

export type CountryConvention = {
  pageLength: PageLength;
  includePhoto: PhotoConvention;
  includeAddress: AddressConvention;
  includeDOB: DOBConvention;
  includeGPA: GPAConvention;
  referenceSection: ReferenceConvention;
  /** One line, "Common in {Country}" framing for the page. */
  notes: string;
};

/**
 * Regional defaults — best-effort grounding for the 14 regions.
 * Country-specific knowledge (US, UK, Gulf, Germany, Japan, etc.) overrides.
 */
const REGIONAL_DEFAULTS: Record<Region, CountryConvention> = {
  "north-america": {
    pageLength: "1-page",
    includePhoto: "avoid",
    includeAddress: "city-only",
    includeDOB: "avoid",
    includeGPA: "optional",
    referenceSection: "available-on-request",
    notes: "Common in the region: 1-page CV, no photo or DOB, references available on request.",
  },
  caribbean: {
    pageLength: "1-page",
    includePhoto: "avoid",
    includeAddress: "city-only",
    includeDOB: "avoid",
    includeGPA: "optional",
    referenceSection: "available-on-request",
    notes: "Common in the region: 1-page CV, no photo, US-influenced format.",
  },
  "central-south-america": {
    pageLength: "flexible",
    includePhoto: "optional",
    includeAddress: "city-only",
    includeDOB: "common",
    includeGPA: "optional",
    referenceSection: "list",
    notes: "Common in the region: 1-2 page CV, photo often included, DOB common.",
  },
  "western-europe": {
    pageLength: "2-page",
    includePhoto: "optional",
    includeAddress: "city-only",
    includeDOB: "avoid",
    includeGPA: "optional",
    referenceSection: "available-on-request",
    notes: "Common in the region: 2-page CV, photo optional, DOB avoided under EU equal-opportunity norms.",
  },
  nordic: {
    pageLength: "2-page",
    includePhoto: "avoid",
    includeAddress: "city-only",
    includeDOB: "avoid",
    includeGPA: "optional",
    referenceSection: "available-on-request",
    notes: "Common in the region: 2-page CV, no photo, no DOB, concise factual format.",
  },
  "eastern-europe": {
    pageLength: "2-page",
    includePhoto: "optional",
    includeAddress: "city-only",
    includeDOB: "common",
    includeGPA: "optional",
    referenceSection: "list",
    notes: "Common in the region: 2-page CV, photo often included, DOB common.",
  },
  mena: {
    pageLength: "2-page",
    includePhoto: "optional",
    includeAddress: "full",
    includeDOB: "common",
    includeGPA: "optional",
    referenceSection: "list",
    notes: "Common in the region: 2-page CV, photo often included, full address and DOB common.",
  },
  gulf: {
    pageLength: "2-page",
    includePhoto: "required",
    includeAddress: "full",
    includeDOB: "common",
    includeGPA: "optional",
    referenceSection: "list",
    notes: "Common in the Gulf: 2-page CV with photo, full personal details (DOB, nationality, marital status) and references list.",
  },
  "sub-saharan-africa": {
    pageLength: "flexible",
    includePhoto: "optional",
    includeAddress: "city-only",
    includeDOB: "common",
    includeGPA: "optional",
    referenceSection: "list",
    notes: "Common in the region: 1-2 page CV, photo optional, DOB and references list common.",
  },
  "south-asia": {
    pageLength: "flexible",
    includePhoto: "optional",
    includeAddress: "city-only",
    includeDOB: "common",
    includeGPA: "common",
    referenceSection: "list",
    notes: "Common in the region: 1-2 page CV, photo optional, DOB and references commonly included.",
  },
  "southeast-asia": {
    pageLength: "1-page",
    includePhoto: "optional",
    includeAddress: "city-only",
    includeDOB: "common",
    includeGPA: "common",
    referenceSection: "list",
    notes: "Common in the region: 1-page CV, photo often included, DOB common.",
  },
  "east-asia": {
    pageLength: "1-page",
    includePhoto: "required",
    includeAddress: "full",
    includeDOB: "common",
    includeGPA: "common",
    referenceSection: "available-on-request",
    notes: "Common in the region: 1-page CV with required photo, full personal details, DOB common.",
  },
  "central-asia": {
    pageLength: "2-page",
    includePhoto: "optional",
    includeAddress: "city-only",
    includeDOB: "common",
    includeGPA: "optional",
    referenceSection: "list",
    notes: "Common in the region: 2-page CV, photo often included, DOB and references common.",
  },
  oceania: {
    pageLength: "2-page",
    includePhoto: "avoid",
    includeAddress: "city-only",
    includeDOB: "avoid",
    includeGPA: "optional",
    referenceSection: "available-on-request",
    notes: "Common in the region: 1-2 page CV, no photo or DOB, references available on request.",
  },
};

/**
 * Country-specific overrides — verified knowledge per country.
 * Anything NOT in this map falls through to REGIONAL_DEFAULTS.
 */
/** Re-sourced from scratch on 2026-08-25 (wave R).
 *
 *  Every entry below now carries at least two independent sources, quoted
 *  per-field in the research packs. This replaces the state PR #99's gate
 *  found and recorded: 29 entries with `sources: []`, because the header's
 *  claim that they "come from public career-guidance sources cited in PR
 *  description" was not true — PR #34 cited none.
 *
 *  Conventions in this block:
 *    * a `// COULD-NOT-VERIFY` comment means research could not establish that
 *      field for that country, so it holds the country's REGIONAL default and
 *      is not a country-specific claim.
 *    * a sourcing-quality comment (tertiary / platform-only / template-grade /
 *      inferred) marks a field whose sources are weaker than the rest of its
 *      entry. It is a flag for the next research pass, not a defect.
 *    * scripts/verify-conventions.ts is armed in the build and fails on any
 *      entry that loses its sources. */
const COUNTRY_OVERRIDES: Record<string, VerifiedCountryConvention> = {
  "united-states": {
    pageLength: "1-page",
    includePhoto: "avoid",
    includeAddress: "city-only",
    includeDOB: "avoid",
    includeGPA: "common",
    referenceSection: "avoid",
    notes: "Common in the United States: the document is a one-page \"résumé\" (a \"CV\" means a long academic document); GPA is listed by students/new grads (≥3.5 rule of thumb), and federal USAJOBS resumes are a separate 2-page format that expects GPA and detailed hours-per-week.",
    sources: [
      "https://capd.mit.edu/resources/resumes/",
      "https://som.yale.edu/sites/default/files/2022-01/Yale%20SOM%20CDO%20Resume%20Writing%20Guide-1(1",
      "https://help.usajobs.gov/faq/application/documents/resume/what-to-include",
      "https://careerservices.fas.harvard.edu/resources/create-a-strong-resume/",
      "https://cdn-careerservices.fas.harvard.edu/wp-content/uploads/sites/161/2026/02/HES-Resume-samples-combined.pdf",
    ],
  },
  "united-kingdom": {
    pageLength: "2-page",
    includePhoto: "avoid",
    includeAddress: "city-only",
    includeDOB: "avoid",
    includeGPA: "avoid",
    referenceSection: "available-on-request",
    notes: "Common in the United Kingdom: the document is a \"CV\" (never \"resume\") of at most two sides of A4, showing degree classification (e.g. 2:1) rather than GPA, with age/DOB/marital status omitted per the government's National Careers Service guidance.",
    sources: [
      "https://careers.ox.ac.uk/cvs",
      "https://www.prospects.ac.uk/careers-advice/cvs-and-cover-letters/how-to-write-a-cv",
      "https://nationalcareers.service.gov.uk/careers-advice/cv-sections",
    ],
  },
  canada: {
    pageLength: "2-page",
    includePhoto: "avoid",
    includeAddress: "city-only",
    includeDOB: "avoid",
    includeGPA: "optional", // COULD-NOT-VERIFY in re-sourcing — north-america regional default
    referenceSection: "avoid",
    notes: "Common in Canada: \"never include your Social Insurance Number in your resume\" (Job Bank); two-page resumes are the federal Job Bank norm, and references are omitted entirely rather than \"on request.\"",
    sources: [
      "https://www.jobbank.gc.ca/findajob/resources/write-good-resume",
      "https://www.utsc.utoronto.ca/aacc/resume",
      "https://www.utm.utoronto.ca/careers/resume-and-cover-letter-tips-international-students",
      "https://students.ubc.ca/career/career-resources/resumes-cover-letters/",
    ],
  },
  germany: {
    pageLength: "2-page",
    includePhoto: "optional",
    includeAddress: "full",
    includeDOB: "common",
    includeGPA: "optional",
    referenceSection: "available-on-request", // COULD-NOT-VERIFY in re-sourcing — western-europe regional default
    notes: "Common in Germany: the tabellarischer Lebenslauf („Stelle den Lebenslauf als Tabelle dar\" — BA) traditionally closed with „Ort, Datum und Unterschrift\" (place, date, signature — BA worksheet), though BA now says signing „ist nicht unbedingt notwendig\"; photo has become voluntary since the AGG anti-discrimination act.",
    sources: [
      "https://www.arbeitsagentur.de/bildung/bewerbung/lebenslauf",
      "https://www.arbeitsagentur.de/bildung/datei/arbeitsblatt-so-sollte-lebenslauf-aussehen_ba022063.pdf",
      "https://cms-cdn.lmu.de/media/lmu/downloads/career-service/musterlebenslauf_deutsch-2.pdf",
    ],
  },
  france: {
    pageLength: "1-page",
    includePhoto: "optional",
    includeAddress: "city-only",
    includeDOB: "avoid",
    includeGPA: "optional", // COULD-NOT-VERIFY in re-sourcing — western-europe regional default
    referenceSection: "available-on-request", // platform-only — see the pack
    notes: "Common in France: the CV fits on a single page (\"Ne dépassez pas 1 page !\" — Sorbonne) with a compact \"état civil\" header where photo and age are strictly optional; references are rarely listed, unlike Anglo-Saxon CVs.",
    sources: [
      "https://www.francetravail.fr/candidat/vos-recherches/preparer-votre-candidature/cv-lettre-de-motivation-e-mail/comment-rediger-un-cv-efficace-e.html",
      "https://www.pantheonsorbonne.fr/sites/default/files/inline-files/155-cv.pdf",
      "https://www.cidj.com/travailler/decrocher-un-emploi/comment-rediger-son-cv-pour-trouver-un-emploi",
      "https://www.cv.fr/conseils/reference-cv",
    ],
  },
  netherlands: {
    pageLength: "2-page",
    includePhoto: "optional",
    includeAddress: "city-only",
    includeDOB: "common",
    includeGPA: "optional",
    referenceSection: "available-on-request",
    notes: "Common in the Netherlands: a sober, compact cv of at most two A4 (\"beperken tot maximaal twee A4\" — Radboud) with the standing formula \"referenties op aanvraag\" / \"indien gewenst beschikbaar\" instead of named referees.",
    sources: [
      "https://www.werk.nl/werkzoekenden/solliciteren/tips/cv/index.aspx",
      "https://inspiratie.uwv.nl/loopbaan/maak-een-uniek-cv",
      "https://www.ru.nl/sites/default/files/2024-10/Hand-out_Cv.pdf",
      "https://careerzone.universiteitleiden.nl/ontwikkel-je-skills/sollicitatie-skills/cv/kdkdkdk",
    ],
  },
  spain: {
    pageLength: "flexible",
    includePhoto: "optional",
    includeAddress: "full",
    includeDOB: "common",
    includeGPA: "optional", // COULD-NOT-VERIFY in re-sourcing — western-europe regional default
    referenceSection: "available-on-request",
    notes: "Common in Spain: a \"fotografía reciente y de tamaño carné\" (recent ID-card-size photo — UA GIPE) still heads the datos personales block, though universities note it is \"cada vez más opcional\"; references are offered \"en caso de que me las soliciten\" rather than listed.",
    sources: [
      "https://coeceuta.sepe.es/coe-ceuta/servicios/recursos/2025/como-crear-tu-curriculum.html",
      "https://www.sepe.es/SiteSepe/contenidos/personas/encontrar_empleo/encontrar_empleo_europa/pdf/2023/Fichas-CV/2023_CV_Carta_Espa-a.pdf",
      "https://web.unican.es/unidades/coie/orientacion/curriculum-vitae",
      "https://www.gipe.ua.es/orientacion-laboral/como-hacer-curriculum-vitae-ejemplo.asp",
      "https://www.ucm.es/data/cont/docs/24-2015-02-17-EL%20CURR%C3%8DCULUM%20VITAE.pdf",
      "https://www.unirioja.es/servicios/sepe/Pautas_CV.pdf",
      "https://orientacion-laboral.infojobs.net/datos-personales-cv/",
    ],
  },
  italy: {
    pageLength: "2-page",
    includePhoto: "optional",
    includeAddress: "full",
    includeDOB: "common",
    includeGPA: "optional", // platform-only — see the pack
    referenceSection: "list", // template-grade — see the pack
    notes: "Common in Italy: the closing privacy-authorization clause — «Autorizzo il trattamento dei dati personali contenuti nel mio curriculum vitae in base all'art. 13 del D. Lgs. 196/2003 e all'art. 13 del Regolamento UE 2016/679» (\"I authorise the processing of the personal data in my CV per Legislative Decree 196/2003 art. 13 and GDPR art. 13\") — quoted verbatim on Cliclavoro; the Europass format remains widespread.",
    sources: [
      "https://www.cliclavoro.gov.it/guide/orientamento-al-lavoro/come-scrivere-il-curriculum-vitae?language_content_entity=it",
      "https://www.unicusano.it/blog/universita/come-si-fa-il-curriculum-vitae/",
      "https://zety.it/blog/voto-di-laurea-nel-cv",
    ],
  },
  ireland: {
    pageLength: "2-page",
    includePhoto: "optional", // COULD-NOT-VERIFY in re-sourcing — western-europe regional default
    includeAddress: "full",
    includeDOB: "avoid", // COULD-NOT-VERIFY in re-sourcing — western-europe regional default
    includeGPA: "common",
    referenceSection: "available-on-request",
    notes: "Common in Ireland: include Leaving Certificate (not Junior Certificate) results on graduate CVs, keep to 1–2 A4 pages, and keep a references section — Trinity notes that naming referees \"adds weight\" where space allows, unlike UK advice to drop the section.",
    sources: [
      "https://jobsireland.ie/en-US/TipsandAdvicePage",
      "https://www.tcd.ie/media/tcd/careers/pdfs/Your-Guide-to-Making-Great-Applications.pdf",
      "https://careerbldr.com/blog/cv-guide-ireland/",
      "https://www.citizensinformation.ie/en/employment/starting-work-and-changing-job/training-and-looking-for-work/finding-and-getting-a-job/",
    ],
  },
  "saudi-arabia": {
    pageLength: "2-page",
    includePhoto: "optional",
    includeAddress: "full", // COULD-NOT-VERIFY in re-sourcing — gulf regional default
    includeDOB: "common",
    includeGPA: "optional", // COULD-NOT-VERIFY in re-sourcing — gulf regional default
    referenceSection: "available-on-request",
    notes: "Common in Saudi Arabia: state iqama status (e.g. \"Iqama Status: Transferable\") — under Nitaqat/Saudization only Platinum/Green-rated firms can hire expats, so expat CVs must show specialized expertise.",
    sources: [
      "https://www.visualcv.com/international/saudi-arabia-cv/",
      "https://stylingcv.com/gcc-guide/resume-tips-saudi-arabia/",
      "https://jobera.com/saudi-cv-writing-guide/",
    ],
  },
  "united-arab-emirates": {
    pageLength: "2-page",
    includePhoto: "optional",
    includeAddress: "city-only",
    includeDOB: "common",
    includeGPA: "optional",
    referenceSection: "available-on-request",
    notes: "Common in UAE: state visa status up front (UAE resident / visit visa / employment visa / dependent / overseas applicant) plus passport nationality — a key screen in the Emiratisation-quota era.",
    sources: [
      "https://www.bayt.com/en/blog/32538/cv-format-for-uae-jobs-the-complete-2026-guide/",
      "https://www.gulftalent.com/resources/dubai-jobs-guide/building-your-profile",
      "https://www.visualcv.com/international/uae-resume/",
    ],
  },
  qatar: {
    pageLength: "2-page",
    includePhoto: "optional",
    includeAddress: "city-only", // weak — see the pack
    includeDOB: "common", // weak — see the pack
    includeGPA: "optional", // COULD-NOT-VERIFY in re-sourcing — gulf regional default
    referenceSection: "available-on-request",
    notes: "Common in Qatar: state QID/residency status (residents) or visa status (international applicants) — Qatarisation, Qatar's nationalization initiative, shapes screening of expat vs national candidates.",
    sources: [
      "https://www.expatica.com/qa/working/finding-a-job/interviews-and-cvs-in-qatar-72612/",
      "https://www.visualcv.com/international/qatar-resume/",
      "https://menajobs.me/cv-format/qatar",
    ],
  },
  kuwait: {
    pageLength: "flexible",
    includePhoto: "optional", // weak — see the pack
    includeAddress: "city-only",
    includeDOB: "common",
    includeGPA: "optional", // COULD-NOT-VERIFY in re-sourcing — gulf regional default
    referenceSection: "available-on-request",
    notes: "Common in Kuwait: state your visa article — \"Article 18 (Work Visa): employer-sponsored\" vs \"Article 22 (Dependent Visa)\" — a Kuwait-specific residency taxonomy; Kuwaitization drives national-vs-expat screening in government and oil sectors.",
    sources: [
      "https://jobera.com/kuwait-cv-writing-guide/",
      "https://menajobs.me/cv-format/kuwait",
    ],
  },
  bahrain: {
    pageLength: "2-page",
    includePhoto: "optional",
    includeAddress: "full",
    includeDOB: "common",
    includeGPA: "optional", // COULD-NOT-VERIFY in re-sourcing — gulf regional default
    referenceSection: "list",
    notes: "Common in Bahrain: state residency/visa status including Bahrain-specific categories (Work Visa, Flexi Permit, Golden Residency, self-sponsored); Bahrainisation quotas shape national-vs-expat screening.",
    sources: [
      "https://www.visualcv.com/international/bahrain-cv/",
      "https://resume-example.com/cv/bahrain-cv-country",
      "https://menajobs.me/cv-format/bahrain",
    ],
  },
  oman: {
    pageLength: "2-page",
    includePhoto: "optional",
    includeAddress: "full", // weak — see the pack
    includeDOB: "common", // weak — see the pack
    includeGPA: "optional", // COULD-NOT-VERIFY in re-sourcing — gulf regional default
    referenceSection: "list",
    notes: "Common in Oman: state visa/NOC status (e.g. \"Currently in Oman on Employment Visa — NOC available / transferable\") and nationality — critical under Omanisation, the Sultanate's nationalization policy that shapes every hiring decision.",
    sources: [
      "https://resume-example.com/cv/oman-cv-country",
      "https://menajobs.me/cv-format/oman",
    ],
  },
  egypt: {
    pageLength: "flexible",
    includePhoto: "optional",
    includeAddress: "city-only",
    includeDOB: "common",
    includeGPA: "optional",
    referenceSection: "available-on-request",
    notes: "Common in Egypt: a personal-data (البيانات الشخصية) block with date of birth, nationality and often marital status, plus — uniquely — الموقف من التجنيد (military service status: أدى الخدمة/معاف/مؤجل) for male candidates, which \"many Egyptian employers consider an essential part of personal information\" (「يعتبرها العديد من أصحاب العمل في مصر جزءًا أساسيًا من المعلومات الشخصية」, S3; corroborated by S2's \"military status for male candidates\").",
    sources: [
      "https://careercenter.aucegypt.edu/students/career-readiness/resume-writing",
      "https://careercenter.aucegypt.edu/alumni/career-toolkit",
      "https://blog.edraak.org/كيفية-كتابة-السيرة-الذاتية-cv/",
      "https://www.prosumely.com/blogs/egyptian-resume-format-guide",
      "https://www.cvpromaker.com/ar/blog/writing-military-service-status-in-egyptian-cv",
    ],
  },
  pakistan: {
    pageLength: "2-page",
    includePhoto: "optional",
    includeAddress: "full",
    includeDOB: "common",
    includeGPA: "common",
    referenceSection: "list",
    notes: "\"Common in Pakistan: CNIC number and father's name in the personal-details block, and a light-blue-background passport photo in the traditional format; CNIC and domicile are expected for government applications.\"",
    sources: [
      "https://gotest.com.pk/articles/best-new-cv-formats-design-in-pakistan",
      "https://pakjobbazar.com/professional-cv-for-jobs-in-pakistan/",
      "https://www.rozee.pk/site/picturePolicy",
      "https://ilm.com.pk/learning-articles/best-cv-format-in-pakistan/",
    ],
  },
  india: {
    pageLength: "flexible",
    includePhoto: "optional",
    includeAddress: "full",
    includeDOB: "common",
    includeGPA: "common",
    referenceSection: "available-on-request",
    notes: "\"Common in India: a signed declaration statement ('I hereby declare that all the information provided in my resume is true…') with date, place and signature at the bottom — still required for PSU, government and campus-placement resumes.\"",
    sources: [
      "https://www.naukri.com/campus/career-guidance/biodata-format-for-job",
      "https://www.kickresume.com/en/blog/indian-resume-format-guide/",
      "https://www.rezup.in/resume-guide-india",
      "https://www.naukri.com/campus/career-guidance/photo-on-resume",
      "https://www.naukri.com/campus/career-guidance/declaration-for-resume-for-freshers",
    ],
  },
  bangladesh: {
    pageLength: "2-page",
    includePhoto: "required",
    includeAddress: "full",
    includeDOB: "common",
    includeGPA: "common",
    referenceSection: "list",
    notes: "\"Common in Bangladesh: NID number, father's AND mother's name, blood group and religion in the personal-details block, plus the full SSC/HSC-to-degree academic chain with GPA in table form.\"",
    sources: [
      "https://www.banglacv.net/en/cv-tips/how-to-write-cv-bangladesh",
      "https://cvwriterbd.com/standard-cv-format-download/",
      "https://resume-example.com/cv/bangladesh-country",
    ],
  },
  japan: {
    pageLength: "2-page",
    includePhoto: "required",
    includeAddress: "full",
    includeDOB: "common",
    includeGPA: "common", // COULD-NOT-VERIFY in re-sourcing — east-asia regional default
    referenceSection: "available-on-request", // COULD-NOT-VERIFY in re-sourcing — east-asia regional default
    notes: "Common in Japan: applications use the government-standardized rirekisho form (厚生労働省履歴書様式例, successor to the JIS form) with a 4×3cm photo, date of birth and full address, plus a separate 2-page shokumukeirekisho; since 2021 the gender box is optional and commute-time/dependants columns are abolished for fair hiring (公正な採用選考).",
    sources: [
      "https://kouseisaiyou.mhlw.go.jp/assets/pdf/methods/04.pdf",
      "https://jsite.mhlw.go.jp/tochigi-roudoukyoku/newpage_01671.html",
      "https://www.hellowork.mhlw.go.jp/doc/kouroushourirekisho.pdf",
      "https://next.rikunabi.com/tenshokuknowhow/rirekisho/photo01/",
      "https://next.rikunabi.com/tenshokuknowhow/shokurekisho/style03/",
    ],
  },
  "south-korea": {
    pageLength: "1-page", // COULD-NOT-VERIFY in re-sourcing — east-asia regional default
    includePhoto: "optional",
    includeAddress: "full",
    includeDOB: "common",
    includeGPA: "common",
    referenceSection: "available-on-request", // COULD-NOT-VERIFY in re-sourcing — east-asia regional default
    notes: "Common in South Korea: standardized 이력서 with photo, 생년월일 and GPA on a 4.5 scale remains the private-sector norm, while NCS-based blind hiring (블라인드 채용, mandatory for public institutions since July 2017 and backed by Fair Hiring Procedure Act Art. 4-3) bans photos, height/weight, region of origin and family details from public-sector applications.",
    sources: [
      "https://m.work24.go.kr/wk/r/d/1110/resumeSelfIntroGuide1.do",
      "https://natlex.ilo.org/dyn/natlex2/natlex2/files/download/112162/KOR112162%20Eng%202020.pdf",
      "https://www.law.go.kr/법령/채용절차의공정화에관한법률",
      "https://www.sunykorea.ac.kr/en/html/sub04/040405.html?mode=V&no=60598b80b2da56f10be0b0ae2c2f67e5&GotoPage=1",
      "https://www.khan.co.kr/article/201707052243025",
      "https://www.korea.kr/news/policyNewsView.do?newsId=148839085",
      "https://www.jobkorea.co.kr/goodjob/tip/view?News_No=16615",
      "https://m.saramin.co.kr/help-word/view?idx=345",
      "https://k-labor.co.kr/main/klabor_04_view.html?pgubun=14&lang=ko&find=&chapter_idx=803&items_idx=6419",
    ],
  },
  china: {
    pageLength: "1-page",
    includePhoto: "optional",
    includeAddress: "city-only",
    includeDOB: "common",
    includeGPA: "common",
    referenceSection: "available-on-request", // COULD-NOT-VERIFY in re-sourcing — east-asia regional default
    notes: "Common in China: one-page structured 简历 for 校招 with a formal 证件照, 出生年月 and grade ranking, and — uniquely — a 政治面貌 (political status) line, which Liaocheng University's guide (S2) advises including only if you are a CPC party member, especially when applying to state-owned enterprises (paraphrase of S2's 政治面貌 item; see also S1's list quote above naming 政治面貌 among discretionary personal fields).",
    sources: [
      "https://tyxy.jsu.edu.cn/zsjy/bysxx/3351e98788d14e8baf2f33f6cff02f74.htm",
      "https://hjxy.lcu.edu.cn/zsjy/jyzd/jqfd/292071.htm",
      "https://www.zzcit.edu.cn/jyc/jyzd/jyzdn/2023/11/adbb81b6c5544ab981499ba59e1ab6e2.htm",
      "https://landing.zhaopin.com/resume-templates/100602006",
    ],
  },
  australia: {
    pageLength: "flexible",
    includePhoto: "avoid",
    includeAddress: "city-only",
    includeDOB: "avoid",
    includeGPA: "optional",
    referenceSection: "list",
    notes: "Common in Australia: government (APS/state) applications require addressing \"key selection criteria\" in a separate statement, resumes run 2–3 pages, academic results are given as a WAM rather than GPA, and 2–3 named referees (one a supervisor/manager) are expected on the resume.",
    sources: [
      "https://www.sydney.edu.au/careers/students/applying-for-jobs/how-to-write-a-resume.html",
      "https://www.rmit.edu.au/content/dam/rmit/rmit-images/students/Life-and-work-opportunities/Jobs-and-career-advice/Careers-Resume-2018.pdf",
      "https://www.ses.vic.gov.au/documents/8655930/8865157/CandidateApplicationGuide.pdf/45f198e2-2b8f-5b50-34a1-5c55f03ece3c?t=1658108389230",
      "https://www.vep.veterans.nsw.gov.au/veterans/your-application/your-resume",
      "https://www.apsc.gov.au/working-aps/joining-aps/cracking-code",
    ],
  },
  "new-zealand": {
    pageLength: "2-page",
    includePhoto: "avoid",
    includeAddress: "city-only", // weak — see the pack
    includeDOB: "avoid",
    includeGPA: "optional", // COULD-NOT-VERIFY in re-sourcing — oceania regional default
    referenceSection: "list",
    notes: "Common in New Zealand: a short 2-page tailored CV — \"New Zealand employers expect you to adjust your CV to suit each job\" (Immigration NZ) — with no photo or date of birth and a referees section naming at least two referees, per the government's Tahatū Career Navigator (successor to careers.govt.nz).",
    sources: [
      "https://tahatu.govt.nz/work/applying-for-a-job/how-to-write-a-cv",
      "https://tahatu.govt.nz/work/applying-for-a-job/using-ai-to-create-a-cv-or-cover-letter",
      "https://tahatu.govt.nz/api/documents/serve/233/Applying_for_jobs_CVs_cover_letters_and_more_workbook.pdf",
      "https://www.live-work.immigration.govt.nz/work-in-new-zealand/finding-applying-for-jobs/develop-a-nz-style-cv",
      "https://www.seek.co.nz/career-advice/article/how-to-make-a-resume",
    ],
  },
  "south-africa": {
    pageLength: "2-page",
    includePhoto: "avoid",
    includeAddress: "city-only",
    includeDOB: "avoid",
    includeGPA: "optional",
    referenceSection: "available-on-request",
    notes: "Common in South Africa: the 13-digit ID number that older CV templates included is now explicitly warned against (identity theft/POPIA era); EE/B-BBEE designations appear in job ads but need not be volunteered on the CV, and \"References available on request\" replaces listing referees' contact details.",
    sources: [
      "https://online.wits.ac.za/blogs/land-the-job-you-deserve",
      "https://sajobmarket.co.za/cv-guide.html",
      "https://www.headhunt.co.za/blog/posts/46",
      "https://careers.uct.ac.za/students-making-applications-cv-cover-letters-and-linkedin/creating-great-cv",
    ],
  },
  brazil: {
    pageLength: "2-page",
    includePhoto: "avoid",
    includeAddress: "city-only",
    includeDOB: "avoid",
    includeGPA: "optional", // COULD-NOT-VERIFY in re-sourcing — central-south-america regional default
    referenceSection: "list",
    notes: "Common in Brazil: LGPD and Lei 9.029/1995 are actively reshaping the currículo — foto, RG/CPF numbers and idade/data de nascimento are now advised out (some firms adopt \"currículo cego\"/blind CVs), while Catho-style lists still show legacy fields like idade; keep it to no máximo duas páginas.",
    sources: [
      "https://prefeitura.sp.gov.br/web/desenvolvimento/w/dicas/preparar_um_curriculo/619",
      "https://www.estacio.br/blog/carreiras/como-montar-um-curriculo",
      "https://napratica.org.br/noticias/precisa-colocar-idade-no-curriculo-em-2026",
      "https://www.migalhas.com.br/depeso/362862/solicitacao-e-envio-de-fotos-em-curriculos-e-a-lgpd",
      "https://www.catho.com.br/carreira-sucesso/curriculo-guia-completo/",
      "https://www.roberthalf.com/br/pt/insights/buscar-recolocacao/quantas-paginas-meu-curriculo-deve-ter",
    ],
  },
  mexico: {
    pageLength: "1-page",
    includePhoto: "optional",
    includeAddress: "city-only",
    includeDOB: "avoid",
    includeGPA: "optional",
    referenceSection: "available-on-request", // COULD-NOT-VERIFY in re-sourcing — north-america regional default
    notes: "Common in Mexico: length is counted in \"cuartillas\" (one is the ideal per UNAM), a professional photo remains widespread and rewarded by recruiters (OCC: ~3x more views), and detailed personal data (full address, edad, estado civil) traditionally shown on CVs is now advised against — it belongs on the separate \"solicitud de empleo\" form if an employer requires it.",
    sources: [
      "https://repositorio-uapa.cuaed.unam.mx/repositorio/moodle/pluginfile.php/2515/mod_resource/content/4/UAPA-curriculum-efectivo/index.html",
      "https://conecta.tec.mx/es/noticias/nacional/educacion/como-elaborar-un-curriculum",
      "https://blog-candidatos.occ.com.mx/fotografia-en-el-cv/",
      "https://mx.indeed.com/orientacion-profesional/cv-cartas-presentacion/poner-datos-personales-curriculum",
      "https://www.empleo.gob.mx/assets/solicitud_empleo/SNE_SOLICITUD_DE_EMPLEO_PLANTILLA_PDF.pdf",
    ],
  },
  philippines: {
    pageLength: "2-page",
    includePhoto: "optional",
    includeAddress: "full",
    includeDOB: "common",
    includeGPA: "optional",
    referenceSection: "list",
    notes: "\"Common in the Philippines: character references (a distinctly Filipino section), a 2x2 passport-style photo for local employers, and the PRC license number for licensed professions.\"",
    sources: [
      "https://globalresumehub.com/philippines/",
      "https://stylingcv.com/how-to-make-resume-philippines-2026-guide/",
      "https://ph.jobstreet.com/career-advice/article/curriculum-vitae-sample",
      "https://ph.jobstreet.com/career-advice/article/the-different-parts-of-a-resume-explained",
    ],
  },
  singapore: {
    pageLength: "2-page",
    includePhoto: "avoid",
    includeAddress: "avoid",
    includeDOB: "avoid",
    includeGPA: "optional",
    referenceSection: "available-on-request",
    notes: "\"Common in Singapore: fair-hiring norms under the MOM-linked Tripartite Guidelines (TAFEP) — employers are told to remove age, photo, marital-status and NRIC fields from applications, so CVs omit them; NRIC numbers are specifically flagged because they reveal age.\"",
    sources: [
      "https://www.careertracks.edu.sg/career-skills-and-advice/resume-dos-and-donts/",
      "https://www.resumewriter.sg/blog/how-to-write-a-winning-resume-your-ultimate-cv-guide/",
      "https://www.tal.sg/tafep/employment-practices/recruitment/preparing-job-application-forms",
      "https://content.mycareersfuture.gov.sg/write-cv-changes-life/",
    ],
  },

  // ---- WAVE 1 (promoted 2026-08-25) ----------------------------------------
  // 20 countries researched in wave 1. Same rules as the block above: a field the
  // pack could not verify holds this country's REGIONAL default and says so, and a
  // weaker sourcing tier is recorded on the entry rather than only in a handoff.

  austria: {
    pageLength: "2-page",
    includePhoto: "optional",
    includeAddress: "full",
    includeDOB: "common",
    includeGPA: "optional", // includeGPA: regional default — pack could not verify (western-europe)
    referenceSection: "list",
    notes: "Common in Austria: 1–2 page tabellarischer Lebenslauf with a professional photo, full postal address, and usually date of birth; strictly no religion, politics, health or similar sensitive data.",
    sources: [
      "https://www.ams.at/arbeitsuchende/richtig-bewerben/ansprechender-lebenslauf",
      "https://www.karriere.at/c/a/lebenslauf-persoenliche-daten",
    ],
  },
  belgium: {
    pageLength: "2-page",
    includePhoto: "optional",
    includeAddress: "city-only",
    includeDOB: "common",
    includeGPA: "optional", // includeGPA: regional default — pack could not verify (western-europe)
    referenceSection: "available-on-request",
    notes: "Common in Belgium: 1–2 page CV with name, date of birth and place of residence in the header; photo only if the vacancy asks; Wallonia (Forem) leans one page and full address while Flanders (VDAB) accepts city-only.",
    sources: [
      "https://www.vdab.be/jobs/solliciteren/cv/tips-en-voorbeelden",
      "https://www.vdab.be/opdracht/cv1/hoe_maak_ik_een_CV.pdf",
      "https://www.actiris.brussels/fr/citoyens/mes-outils-pour-postuler/rediger-mon-cv/",
      "https://www.leforem.be/actualites/les-indispensables-reussir-cv.html",
    ],
  },
  denmark: {
    pageLength: "2-page",
    includePhoto: "optional",
    includeAddress: "city-only", // includeAddress: regional default — pack could not verify (nordic)
    includeDOB: "common",
    includeGPA: "optional", // includeGPA: regional default — pack could not verify (nordic)
    referenceSection: "available-on-request",
    notes: "Common in Denmark: a personal \"About me\" block — age, family situation and spare-time interests — because employers read it as a signal of how you will thrive and stay in the job (workindenmark.dk).",
    sources: [
      "https://www.studerende.aau.dk/valg-undervejs-og-job/job-og-praktiksoegning/cv",
      "https://studerende.au.dk/studier/fagportaler/arts/artskarriere/soeg-jobbet/cv",
      "https://www.hk.dk/karriere/jobsoegningen/maalrettet-cv",
      "https://www.workindenmark.dk/job-search-in-denmark/your-cv/personal-details-in-your-cv",
    ],
  },
  finland: {
    pageLength: "2-page",
    includePhoto: "optional",
    includeAddress: "city-only",
    includeDOB: "avoid",
    includeGPA: "optional", // includeGPA: regional default — pack could not verify (nordic)
    referenceSection: "list",
    notes: "Common in Finland: 1–2 page CV with an optional smiling professional photo; omit home address, age and marital status, and end with 1–3 named referees (or \"references on request\").",
    sources: [
      "https://studies.helsinki.fi/system/files/inline-files/tyonhaun-opas.pdf",
      "https://duunitori.fi/tyoelama/tyonhakuopas/ansioluettelo/hyva-ansioluettelo",
      "https://duunitori.fi/tyoelama/turhat-tiedot-cv",
      "https://tyomarkkinatori.fi/blogit/asiantuntijan-cv-vinkit",
      "https://tyomarkkinatori.fi/uutiset/kolme-vinkkia-ansioluettelon-tayttamiseen-2026",
    ],
  },
  ghana: {
    pageLength: "2-page",
    includePhoto: "avoid",
    includeAddress: "city-only",
    includeDOB: "common", // includeDOB: regional default — pack could not verify (sub-saharan-africa)
    includeGPA: "optional", // includeGPA: regional default — pack could not verify (sub-saharan-africa)
    referenceSection: "available-on-request",
    notes: "Common in Ghana: closing the CV with \"References available upon request\" (2–3 referees supplied when asked); photos are unnecessary outside media/modelling roles, and location is given as suburb + city (e.g. \"East Legon, Accra\") rather than a full home address.",
    sources: [
      "https://samuelboadu.com/2025/10/11/how-to-write-a-professional-cv-in-ghana/",
      "https://resume-example.com/cv/ghana-country",
      "https://resumeflex.com/how-to-write-a-professional-cv-for-ghana-job-market/",
      "https://www.jobsearchgh.com/article/5/how-write-cv-ghana-for-job-employment/",
      "https://www.jobberman.com.gh/discover/cv-references",
      "https://www.builtfound.org/builtfound-gh/curriculum-vitae-sample-ghana-cv-examples-hire-professional/",
    ],
  },
  indonesia: {
    pageLength: "flexible",
    includePhoto: "optional",
    includeAddress: "city-only",
    includeDOB: "avoid",
    includeGPA: "optional",
    referenceSection: "list", // referenceSection: regional default — pack could not verify (southeast-asia)
    notes: "Common in Indonesia: a photo is still customary (lumrah) for personal branding, address is given as domisili city only, full date of birth/NIK is now avoided for privacy, and fresh graduates list IPK if above ~3.5.",
    // sources: established local platforms only — no government/university source located (wave 1)
    sources: [
      "https://www.cake.me/resources/resume/contoh-cv-lamaran-kerja",
      "https://www.cake.me/resources/resume/foto-cv-lamaran-kerja",
      "https://glints.com/id/lowongan/contoh-cv-lamaran-kerja/",
      "https://glints.com/id/lowongan/informasi-sensitif-di-cv/",
      "https://glints.com/id/lowongan/mencantumkan-ipk-di-cv/",
      "https://news.detik.com/berita/d-8079469/cara-bikin-cv-di-siapkerja-kemnaker-ini-tahapannya",
    ],
  },
  kenya: {
    pageLength: "2-page",
    includePhoto: "avoid",
    includeAddress: "city-only",
    includeDOB: "avoid",
    includeGPA: "optional",
    referenceSection: "list",
    notes: "Common in Kenya: a closing \"Referees\" section naming 2–3 contacts (typically including a former supervisor); photos, ID numbers, date of birth and full home addresses are left off.",
    sources: [
      "https://www.atomcareer.co.ke/best-cv-format-in-kenya/",
      "https://hrpulse.co.ke/a-perfect-cv-format-best-examples-for-the-kenyan-job-market/",
      "https://www.corporatestaffing.co.ke/2016/06/sample-cv-for-a-fresh-graduate-in-kenya/",
      "https://www.corporatestaffing.co.ke/2019/12/cv-samples-in-kenyacv-samples-in-kenya/",
    ],
  },
  malaysia: {
    pageLength: "2-page",
    includePhoto: "optional",
    includeAddress: "full",
    includeDOB: "common",
    includeGPA: "optional",
    referenceSection: "list",
    notes: "Common in Malaysia: 1–2 page resume with a personal-particulars block (DOB, nationality, address), an optional photo, CGPA shown if above ~3.4, and 2–3 named referees.",
    sources: [
      "https://cem.upm.edu.my/article/resume-68509",
      "https://www.visualcv.com/international/malaysia/",
      "https://my.jobstreet.com/career-advice/article/the-role-of-a-photo-on-a-resume",
      "https://my.jobstreet.com/career-advice/article/best-resume-formats-examples-faqs",
      "https://my.jobstreet.com/career-advice/article/how-to-list-education-on-resume",
    ],
  },
  morocco: {
    pageLength: "2-page",
    includePhoto: "optional",
    includeAddress: "city-only",
    includeDOB: "common",
    includeGPA: "optional",
    referenceSection: "list", // referenceSection: regional default — pack could not verify (mena)
    notes: "Common in Morocco: French-style CV norms — a professional photo and état civil (date de naissance, often nationality) are generally expected, address is city-only, honours/mentions act as differentiators, and CVs are often prepared in French (with Arabic/English versions for some employers).",
    sources: [
      "https://lepetitjournal.com/casablanca/emploi/pratique-comment-rediger-un-cv-marocain-73402",
      "https://www.jobsquare.ma/blog/52/guide-du-cv-parfait-au-maroc-structure-a-eviter-et-conseils-par-secteur/",
      "https://africarrieres.com/morocco/en/guide/pratique/writing-cv",
      "https://tailormycv.app/maroc",
      "https://vizirio.com/modele-cv-maroc/",
    ],
  },
  nepal: {
    pageLength: "2-page",
    includePhoto: "optional",
    includeAddress: "full",
    includeDOB: "common",
    includeGPA: "optional",
    referenceSection: "list",
    notes: "Common in Nepal: 1–2 page CV listing both permanent and temporary/current address, date of birth matching legal documents, percentage/CGPA in education, and named references (with permission); photo passport-style only when requested.",
    // sources: established local platforms only — no government/university source located (wave 1)
    sources: [
      "https://www.kumarijob.com/blog/career-tips/how-to-make-a-cv-for-a-job-in-nepal",
      "https://www.necojobs.com.np/blogs/career-tips/how-to-make-a-cv-for-a-job-in-nepal",
      "https://froxjob.com/blog/building-a-professional-cv-a-step-by-step-guide-for-job-seekers-in-nepal",
      "https://merojob.com/blog/guide-to-completing-your-profile-at-merojob/",
    ],
  },
  nigeria: {
    pageLength: "2-page",
    includePhoto: "avoid",
    includeAddress: "city-only",
    includeDOB: "avoid",
    includeGPA: "optional",
    referenceSection: "list",
    notes: "Common in Nigeria: listing 2–3 named referees with contact details directly on the CV; photos, date of birth, religion, marital status and state of origin are increasingly left off (except for some government roles).",
    sources: [
      "https://www.jobberman.com/discover/cv-writing",
      "https://www.mycvcreator.com/blog/how-to-write-a-cv-for-jobs-in-nigeria-a-comprehensive-guide",
      "http://nairametrics.com/2021/10/31/7-things-not-needed-on-your-resume-in-nigeria/",
      "https://nigerianqueries.com/how-to-write-a-cv-in-nigeria/",
    ],
  },
  norway: {
    pageLength: "2-page",
    includePhoto: "optional",
    includeAddress: "full",
    includeDOB: "common",
    includeGPA: "optional", // includeGPA: regional default — pack could not verify (nordic)
    referenceSection: "available-on-request",
    notes: "Common in Norway: personalia block with fødselsdato and full adresse under the name, and \"Referanser oppgis på forespørsel\" unless the job ad asks for named referees.",
    sources: [
      "https://www.ntnu.no/karriere/skrive-cv",
      "https://utdanning.no/utdanningsvalg_artikkel_slik_skriver_du_cv",
      "https://arbeidsplassen.nav.no/slik-skriver-du-en-god-cv",
    ],
  },
  poland: {
    pageLength: "flexible",
    includePhoto: "optional",
    includeAddress: "city-only",
    includeDOB: "avoid",
    includeGPA: "optional", // includeGPA: regional default — pack could not verify (eastern-europe)
    referenceSection: "available-on-request",
    notes: "Common in Poland: CV must end with the RODO consent clause (\"Wyrażam zgodę na przetwarzanie moich danych osobowych… w celu prowadzenia rekrutacji\") — without it recruiters cannot lawfully process the application.",
    sources: [
      "https://zielonalinia.gov.pl/CV-w-pigulce-Prosta-recepta-na-zatrudnienie-735",
      "https://cv.pracuj.pl/poradniki/ile-stron-cv-przygotowac-dowiedz-sie-czy-zyciorys-moze-zajmowac-wiecej-niz-jedna-strone",
      "https://zielonalinia.gov.pl/zdjecie-w-cv-koniecznosc-czy-zbedna-formalnosc/",
      "https://interviewme.pl/blog/dane-personalne",
      "https://cv.pracuj.pl/poradniki/czy-data-urodzenia-w-cv-jest-konieczna",
      "https://wupkatowice.praca.gov.pl/porady-dla-planujacych-kariere-zawodowa/-/asset_publisher/YXo1gyKQfrEg/content/947977-referencje-dodatek-do-cv-czy-cenne-rekomendacje-",
      "https://zielonalinia.gov.pl/klauzula-cv-2024-czyli-zgoda-na-przetwarzanie-danych-osobowych/",
    ],
  },
  portugal: {
    pageLength: "flexible",
    includePhoto: "optional",
    includeAddress: "full",
    includeDOB: "common",
    includeGPA: "common",
    referenceSection: "avoid",
    notes: "Common in Portugal: Europass-style CVs with full personal data — photo slot, full morada, date of birth, nationality and final degree classification (média) are all standard fields.",
    sources: [
      "https://www.biblioteca.fct.unl.pt/sites/www.biblioteca.fct.unl.pt/files/documents/pdf/Guias/curriculum_vitae.pdf",
      "https://www.europass.pt/wp-content/uploads/2024/04/EUROPASS-CV-Guia-de-preenchimento.pdf",
      "https://www.cvmaker.pt/blog/curriculum-vitae/referencias-num-curriculum-vitae-obrigatorias-ou-opcionais",
    ],
  },
  "sri-lanka": {
    pageLength: "2-page",
    includePhoto: "optional",
    includeAddress: "full",
    includeDOB: "common",
    includeGPA: "optional",
    referenceSection: "list",
    notes: "Common in Sri Lanka: 1–2 page CV with personal particulars (DOB, sometimes NIC), full address, degree class/GPA, and two named non-related referees; photo only for client-facing roles.",
    // sources: established local platforms only — no government/university source located (wave 1)
    sources: [
      "https://profession.lk/blog/how-to-write-a-cv-for-sri-lankas-job-market-2025-guide/54",
      "https://blog.ikman.lk/en/what-to-include-in-a-cv-format-in-sri-lanka/",
      "https://jobmarket.lk/include-a-photo-on-my-cv-for-sri-lankan-jobs/",
      "https://itpro.lk/resume-guide/",
    ],
  },
  sweden: {
    pageLength: "2-page",
    includePhoto: "optional",
    includeAddress: "full",
    includeDOB: "avoid",
    includeGPA: "optional", // includeGPA: regional default — pack could not verify (nordic)
    referenceSection: "available-on-request",
    notes: "Common in Sweden: end the CV with \"Referenser lämnas på begäran\" (references on request) rather than naming referees, and keep it to 1–2 pages.",
    sources: [
      "https://arbetsformedlingen.se/other-languages/english-engelska/cv-application-and-interview/writing-a-cv",
      "https://cvmall.se/skriva-cv/personuppgifter",
      "https://arbetsformedlingen.se/other-languages/english-engelska/cv-application-and-interview/job-references",
    ],
  },
  switzerland: {
    pageLength: "flexible",
    includePhoto: "optional",
    includeAddress: "full",
    includeDOB: "common",
    includeGPA: "optional",
    referenceSection: "available-on-request",
    notes: "Common in Switzerland: 2–3 page Lebenslauf with professional photo, full postal address, date of birth (and often place of birth/nationality); references are held back and given on request.",
    sources: [
      "https://www.secoalv.admin.ch/secoalv/en/home/menue/stellensuchende/fuer-die-stellensuche/bewerbungstipps.html",
      "https://www.careerservices.uzh.ch/de/ratgeber/bewerbung/bewerbungsdossier/Lebenslauf.html",
      "https://www.jobs.ch/de/job-coach/bewerbungsfoto-fuer-den-lebenslauf/",
    ],
  },
  thailand: {
    pageLength: "1-page",
    includePhoto: "optional",
    includeAddress: "city-only",
    includeDOB: "common",
    includeGPA: "optional",
    referenceSection: "available-on-request",
    notes: "Common in Thailand: short 1-page resume (max 2), photo customary but no longer required, age/DOB still widely listed, city-level address, GPA for fresh graduates; references given on request except in government applications.",
    // sources: established local platforms only — no government/university source located (wave 1)
    sources: [
      "https://th.jobsdb.com/career-advice/article/resume-template",
      "https://www.trueplookpanya.com/learning/detail/17369",
      "https://iapp.co.th/blog/thai-job-seekers-cv-guide-2026",
      "https://www.ajarn.com/blogs/stephen-louw/a-suitable-resume",
    ],
  },
  turkey: {
    pageLength: "2-page",
    includePhoto: "optional",
    includeAddress: "full",
    includeDOB: "common",
    includeGPA: "optional",
    referenceSection: "list",
    notes: "Common in Turkey: a formal professional photo (suit, plain background) and personal details such as doğum tarihi (date of birth) on the özgeçmiş, with about two named referees; 2 pages max, though academic CVs may run longer.",
    sources: [
      "https://www.kariyer.net/kariyer-rehberi/ozgecmis-hazirlama-tuyolari-ve-cv-ornegi/",
      "https://stylingcv.com/blog/cv-hazirlama-2026-turkiyede-profesyonel-ozgecmis-olusturmanin-bastan-sona-rehberi/",
      "https://resume-example.com/cv/turkish-language",
    ],
  },
  vietnam: {
    pageLength: "1-page",
    includePhoto: "required",
    includeAddress: "full",
    includeDOB: "common",
    includeGPA: "optional",
    referenceSection: "list",
    notes: "Common in Vietnam: 1-page CV with a formal photo, date of birth and home address in the personal-info block, GPA for fresh graduates, and named referees with phone/email.",
    // sources: established local platforms only — no government/university source located (wave 1)
    sources: [
      "https://www.vietnamworks.com/hrinsider/nha-tuyen-dung-co-danh-gia-cao-cv-tren-2-trang-hay-khong.html",
      "https://blog.topcv.vn/huong-dan-viet-cv-chi-tiet/",
      "https://www.vietnamworks.com/hrinsider/huong-dan-viet-va-tai-mau-cv-xin-viec-noi-bat.html",
      "https://www.topcv.vn/viet-cv-the-nao-cho-chuan",
      "https://www.vietnamworks.com/hrinsider/cach-viet-trinh-do-hoc-van-trong-cv.html",
    ],
  },

  // ---- WAVE 2 (promoted 2026-08-25) ----------------------------------------
  // 20 countries researched in wave 2. Same rules as the blocks above: a field the
  // pack could not verify holds this country's REGIONAL default and says so, and a
  // weaker sourcing tier is recorded on the entry rather than only in a handoff.
  // includeGPA fell to the regional default for 13 of these 20 — grade conventions
  // are simply not documented by most national career services.

  algeria: {
    pageLength: "2-page",
    includePhoto: "optional",
    includeAddress: "full",
    includeDOB: "common",
    includeGPA: "optional",
    referenceSection: "available-on-request",
    notes: "Common in Algeria: detailed French-language chronological CVs with full address, date and place of birth, marital status, and often a photo. French-influence note: confirmed — S2: \"Il est également préférable d'écrire votre CV en français\" (preferable to write the CV in French); structure follows French conventions, though longer (2–3 pages tolerated) than the French one-page ideal.",
    // sources: established local platforms / career media only — no government/university source located per-field (wave 2)
    sources: [
      "https://africarrieres.com/algerie/fr/guide/pratique/rediger-cv",
      "https://modeles-cv.fr/exemples-de-cv/algerie-pays",
      "https://resume-example.com/cv/algeria",
    ],
  },
  bulgaria: {
    pageLength: "2-page", // pageLength: regional default — pack could not verify (eastern-europe)
    includePhoto: "optional",
    includeAddress: "city-only", // includeAddress: regional default — pack could not verify (eastern-europe)
    includeDOB: "avoid",
    includeGPA: "optional",
    referenceSection: "list",
    notes: "Common in Bulgaria: Europass CV format recommended (especially for public institutions), passport-style photo widely expected though not mandatory, date of birth/EGN omitted unless requested, references from previous employers listed at the end. No Polish-style GDPR consent clause found in any Bulgarian source.",
    // sources: established local platforms / career media only — no government/university source located per-field (wave 2)
    sources: [
      "https://www.glbulgaria.bg/bg/node/12849",
      "https://www.karieri.bg/news/34880_kakvo_triabva_da_sudurja_uspeshnoto_cv",
      "https://bulgariawantsyou.com/bg/news/kak-da-napishete-cv-za-blgarskiya-pazar-na-truda",
      "https://eures.europa.eu/living-and-working/living-and-working-conditions-europe/living-and-working-conditions-bulgaria_en",
    ],
  },
  croatia: {
    pageLength: "2-page",
    includePhoto: "optional",
    includeAddress: "full",
    includeDOB: "common",
    includeGPA: "optional", // includeGPA: regional default — pack could not verify (eastern-europe)
    referenceSection: "available-on-request",
    notes: "Common in Croatia: 1–2 page CVs, often in Europass/tabular format promoted by the state employment service HZZ; photo optional, full postal address and date of birth customary, references \"na zahtjev\" (on request).",
    sources: [
      "https://www.hzz.hr/usluge/zamolba-i-zivotopis/",
      "https://razvojkarijere.hzz.hr/zamolba-i-zivotopis/",
      "https://webarhiv.hzz.hr/print-id-11146.html?id=11146",
      "https://www.hzz.hr/app/uploads/2022/08/CVInstructions.pdf:",
      "https://usrk.net.efzg.hr/blog/pripremi-svoj-%C5%BEivotopis:",
      "https://zivotopis.com.hr/korisni-savjeti/stavljanje-slike-u-zivotopis",
    ],
  },
  "czech-republic": {
    pageLength: "2-page",
    includePhoto: "optional",
    includeAddress: "city-only",
    includeDOB: "avoid",
    includeGPA: "optional", // includeGPA: regional default — pack could not verify (eastern-europe)
    referenceSection: "list",
    notes: "Common in the Czech Republic (Czechia): structured 1–2 page CV (\"strukturovaný životopis\"), city-only address, photo only if the ad asks, contactable references from previous employers listed, and birth date increasingly omitted; overly personal data (marital status, children) discouraged. No Polish-style GDPR consent clause found in any Czech source.",
    sources: [
      "https://kariera.muni.cz/co-nabizime/e-learningove-kurzy/zivotopis-prakticky/struktura-zivotopisu",
      "https://jobs.pef.czu.cz/jak-spravne-napsat-zivotopis",
      "https://europass.cz/rady-a-tipy/jak-napsat-zivotopis/co-do-zivotopisu-nepatri",
      "https://eures.europa.eu/living-and-working/living-and-working-conditions-europe/living-and-working-conditions-czechia_en",
      "https://kariera.muni.cz/co-nabizime/e-learningove-kurzy/zivotopis-prakticky/sekce-zivotopisu",
    ],
  },
  estonia: {
    pageLength: "2-page",
    includePhoto: "optional",
    includeAddress: "city-only",
    includeDOB: "common",
    includeGPA: "optional", // includeGPA: regional default — pack could not verify (eastern-europe)
    referenceSection: "list",
    notes: "Common in Estonia: compact 1–2 page CV listing \"elukoht\" as city/county only (exact address and personal ID code discouraged), date of birth still present in standard templates, photo optional, and a \"soovitajad\" (recommenders) section with 2–3 named contacts.",
    sources: [
      "https://teadmiseks.ee/dokumendid/cv-koostamine-naidis/:",
      "https://hr.cv.ee/cv/naidis:",
      "https://www.cvkeskus.ee/karjaarikeskus/cv-koostamine-samm-sammult-tasuta-cv-naidis:",
      "https://www.tootukassa.ee/web/sites/default/files/2022-01/cv_naidis_keskharidus%20(2",
    ],
  },
  ethiopia: {
    pageLength: "flexible",
    includePhoto: "optional",
    includeAddress: "full",
    includeDOB: "common",
    includeGPA: "optional",
    referenceSection: "list",
    notes: "Common in Ethiopia: longer 2–3 page CVs with comprehensive personal details (date of birth, gender, full address) and 2–3 named references listed on the CV.",
    // sources: established local platforms / career media only — no government/university source located per-field (wave 2)
    sources: [
      "https://africarrieres.com/ethiopia/en/guide/pratique/writing-cv",
      "https://resume-example.com/cv/ethiopia-cv-country",
    ],
  },
  georgia: {
    pageLength: "2-page",
    includePhoto: "optional",
    includeAddress: "city-only",
    includeDOB: "common",
    includeGPA: "optional", // includeGPA: regional default — pack could not verify (central-asia)
    referenceSection: "list",
    notes: "Common in Georgia: date of birth still appears in the personal-info block, but Georgian HR advice now explicitly drops Soviet-era baggage — no marital status (\"არ არის აუცილებელი ჩვენი ოჯახური მდგომარეობის… მითითება\"), no personal ID number, no precise home address, photo optional, and ideally two named recommenders.",
    // sources: established local platforms / career media only — no government/university source located per-field (wave 2)
    sources: [
      "https://www.marketer.ge/rogor-davcerot-cv/",
      "https://www.marketer.ge/rogor-davcerot-cv1/",
      "https://polux.ge/cv-shecdomebi/",
    ],
  },
  greece: {
    pageLength: "2-page",
    includePhoto: "optional",
    includeAddress: "full",
    includeDOB: "avoid", // includeDOB: regional default — pack could not verify (western-europe)
    includeGPA: "optional",
    referenceSection: "list",
    notes: "Common in Greece: short 1–2 page CV (DYPA/Europass templates widely used), full contact details, optional photo, grades only if advantageous, and 2–3 named references with contact details are acceptable. No Polish-style GDPR consent clause found in any Greek source.",
    sources: [
      "https://www.dypa.gov.gr/en/psakhno-ghiabioghrafiko-simioma-1",
      "https://eures.europa.eu/living-and-working/living-and-working-conditions-europe/living-and-working-conditions-greece_en",
      "https://career.uoa.gr/viografiko-simeioma/",
      "https://www.kariera.gr/career-guide/cv-structure",
    ],
  },
  hungary: {
    pageLength: "2-page",
    includePhoto: "optional",
    includeAddress: "full",
    includeDOB: "common",
    includeGPA: "optional", // includeGPA: regional default — pack could not verify (eastern-europe)
    referenceSection: "list",
    notes: "Common in Hungary: 1–2 page CV in Hungarian (plus English for some posts), passport-style photo widely expected though not mandatory, personal data including birth year/place and home address traditionally listed, hand-signed one-page cover letter for paper applications. No Polish-style GDPR consent clause verified as a Hungarian CV convention (profession.hu notes CV items \"személyes adatnak számít\" — count as personal data — but prescribes no applicant-side clause).",
    sources: [
      "https://eures.europa.eu/living-and-working/living-and-working-conditions-europe/living-and-working-conditions-hungary_en",
      "https://u-szeged.hu/karriernapok/oneletrajz",
      "https://btk.ppke.hu/az-oneletrajz-keszites-13-mesterfogasa",
      "https://www.profession.hu/cikk/tevhitek-az-oneletrajzrol",
      "https://karrier.sze.hu/allaskeresesi-tippek/az-oneletrajzrol",
    ],
  },
  jordan: {
    pageLength: "flexible",
    includePhoto: "optional",
    includeAddress: "city-only",
    includeDOB: "common",
    includeGPA: "optional", // includeGPA: regional default — pack could not verify (mena)
    referenceSection: "list",
    notes: "Common in Jordan: 1–2 page CVs (Arabic or English) that carry personal details such as date of birth and a named-references section, with photos optional.",
    // sources: established local platforms / career media only — no government/university source located per-field (wave 2)
    sources: [
      "https://resume-example.com/cv/jordan-country",
      "https://s3.amazonaws.com/akhtaboot_public/mini_cv_guide/CVguide-whitepaper-EN.pdf",
      "https://resumeflex.com/how-to-write-a-professional-cv-for-jordan-job-market/",
    ],
  },
  kazakhstan: {
    pageLength: "2-page",
    includePhoto: "optional",
    includeAddress: "full",
    includeDOB: "common",
    includeGPA: "optional", // includeGPA: regional default — pack could not verify (central-asia)
    referenceSection: "list",
    notes: "Common in Kazakhstan: Russian-style резюме norms largely hold — photo and date of birth are expected (the state portal enbek.kz even nudges against photo-less resumes), but enbek.kz now advises dropping marital status (\"Удаляй семейный статус, он интересует только посетителей сайтов знакомств\").",
    sources: [
      "https://finance.kz/articles/obrazets-rezyume-na-rabotu-v-rk",
      "https://merke.hh.kz/article/kak-sostavit-rezyume",
      "https://www.enbek.kz/ru/node/2227",
      "https://tou.edu.kz/arm/storage/files/6374c1c8cefca6.78173666.pdf",
    ],
  },
  lebanon: {
    pageLength: "flexible",
    includePhoto: "optional",
    includeAddress: "city-only",
    includeDOB: "common", // includeDOB: regional default — pack could not verify (mena)
    includeGPA: "optional",
    referenceSection: "available-on-request",
    notes: "Common in Lebanon: concise 1–2 page CVs written in English, French, or Arabic, often with a photo, city-level address, and references kept for on-request. French-influence note: multilingual market — S3: \"le CV peut être rédigé en arabe, en français ou en anglais\"; Anglo-American norms (LAU/AUB) coexist with French-style CVs.",
    sources: [
      "https://proresumes.io/resume-guidelines-for-job-seekers-in-lebanon/",
      "https://www.lau.edu.lb/experience/career-guidance/cv-interview.php",
      "https://modeles-cv.fr/exemples-de-cv/liban-cv-pays",
    ],
  },
  lithuania: {
    pageLength: "2-page",
    includePhoto: "optional",
    includeAddress: "city-only",
    includeDOB: "common",
    includeGPA: "optional", // includeGPA: regional default — pack could not verify (eastern-europe)
    referenceSection: "available-on-request",
    notes: "Common in Lithuania: short 1–2 page \"gyvenimo aprašymas\" with a businesslike photo optional, residence given as city, date of birth still customary in the personal-data block, references on request or omitted.",
    sources: [
      "https://lsmu.lt/wp-content/uploads/2022/08/kp_gyvenimo_aprasymas-3.pdf:",
      "https://cvmarket.lt/karjeros-centras/karjeros-pradzia/cv-gyvenimo-aprasymas/kaip-rasyti-cv-gyvenimo-aprasyma:",
      "https://uzt.lt/jaunimui/patarimai-ieskantiems-darbo/103:",
      "https://cvekas.lt/kaip-rasyti-cv/:",
      "https://eures.uzt.lt/...keturi-patarimai",
    ],
  },
  romania: {
    pageLength: "flexible",
    includePhoto: "optional",
    includeAddress: "full",
    includeDOB: "common",
    includeGPA: "optional", // includeGPA: regional default — pack could not verify (eastern-europe)
    referenceSection: "list", // referenceSection: regional default — pack could not verify (eastern-europe)
    notes: "Common in Romania: CV in Romanian, Europass format recommended by the public employment network; photo optional; full address and date of birth traditionally included; no Polish-style GDPR consent clause verified as a CV convention. GDPR check (verify-don't-assume): no source showed a standardized applicant consent clause like Poland's; Romanian GDPR commentary discusses only general consent principles (e.g. StartGDPR: \"Acordul trebuie să fie liber, specific, explicit, informat…\" — general principle, not a CV clause; https://startgdpr.ro/blog/gdpr-prelucrare-date-cu-sau-fara-consimtamant/), and Romanian legal press advises employers away from consent as a processing basis (juridice.ro). Do NOT add a consent clause by default.",
    sources: [
      "https://snspa.ro/studenti/cariera/consiliere-in-cariera/pregatirea-cv-ului/",
      "https://www.hipo.ro/locuri-de-munca/vizualizareArticol/3809/model-cv",
      "https://www.hipo.ro/locuri-de-munca/vizualizareArticol/111/Model-de-CV",
      "https://eures.europa.eu/living-and-working/living-and-working-conditions-europe/living-and-working-conditions-romania_en",
      "https://startgdpr.ro/blog/gdpr-prelucrare-date-cu-sau-fara-consimtamant/",
    ],
  },
  serbia: {
    pageLength: "2-page",
    includePhoto: "optional",
    includeAddress: "full",
    includeDOB: "common",
    includeGPA: "optional",
    referenceSection: "list",
    notes: "Common in Serbia: 1–2 page \"radna biografija\" with photo optional, full home address and date of birth in the personal-data block, GPA only if above 8.00, and two named referees.",
    sources: [
      "https://poslovi.infostud.com/saveti/Proverite-da-li-ste-pravilno-napisali-biografiju/36:",
      "https://careers.singidunum.ac.rs/radna-biografija/:",
      "https://poslovi.infostud.com/saveti/Kako-napisati-CV-biografiju/34:",
      "https://www.nsz.gov.rs/live/digitalAssets/0/319_radna_sveska_atp1.pdf:",
    ],
  },
  tanzania: {
    pageLength: "2-page",
    includePhoto: "optional",
    includeAddress: "full",
    includeDOB: "common",
    includeGPA: "optional", // includeGPA: regional default — pack could not verify (sub-saharan-africa)
    referenceSection: "list",
    notes: "Common in Tanzania: CVs list 2-3 named referees with contacts upfront (the government Ajira portal has a mandatory Referees section), and personal details such as date of birth, nationality and marital status remain customary — though modern private-sector guides increasingly advise trimming them.",
    sources: [
      "https://resume-example.com/cv/tanzania-country",
      "https://www.cvchapchap.com/blog/how-to-write-cv-tanzania-2026",
      "https://resumeflex.com/how-to-write-a-professional-cv-for-tanzania-job-market/",
      "https://www.ajira.go.tz/baseattachments/generalinfoattachments/2020_02_14_15_56_50Recruitment%20Portal%20User%20Guide%20v%202.1.pdf",
    ],
  },
  tunisia: {
    pageLength: "1-page",
    includePhoto: "optional",
    includeAddress: "avoid",
    includeDOB: "common",
    includeGPA: "optional",
    referenceSection: "available-on-request",
    notes: "Common in Tunisia: one-page French-style CVs in French or Arabic, stating age, listing diploma honours (\"mention\") when good, references on request. French-influence note: confirmed — S3: \"most recruiters expect CVs written in French or Arabic\"; one-page ideal and \"mention\" grading mirror French CV norms.",
    // sources: established local platforms / career media only — no government/university source located per-field (wave 2)
    sources: [
      "https://www.tanitjobs.com/blog/5/comment-r%C3%A9diger-son-cv-pour-un-emploi-en-tunisie/",
      "https://blog.afariat.com/guides-et-conseils/comment-rediger-un-cv.html",
      "https://resume-example.com/cv/tunisia-country",
    ],
  },
  uganda: {
    pageLength: "2-page",
    includePhoto: "optional",
    includeAddress: "city-only",
    includeDOB: "common",
    includeGPA: "optional", // includeGPA: regional default — pack could not verify (sub-saharan-africa)
    referenceSection: "available-on-request",
    notes: "Common in Uganda: 1–2 page CVs headed with city/district only (not a full address), no photo unless the employer asks, and a referee line that may now simply read \"Referees available on request\" — a notable shift from the older East African habit of listing referees with full contacts.",
    sources: [
      "https://protechuganda.com/how-to-write-a-cv-in-uganda/",
      "https://www.brightermonday.co.ug/discover/how-to-write-a-cv-in-uganda",
      "https://resume-example.com/cv/uganda-country",
    ],
  },
  ukraine: {
    pageLength: "2-page",
    includePhoto: "optional",
    includeAddress: "city-only",
    includeDOB: "common",
    includeGPA: "optional", // includeGPA: regional default — pack could not verify (eastern-europe)
    referenceSection: "list",
    notes: "Common in Ukraine: 1–2 page resume with date of birth in the personal-data block, city of residence rather than full street address, photo a personal choice, and a recommendations section naming past managers or mentors.",
    sources: [
      "https://www.ukrinform.ua/rubric-kyiv/3365130-stolicna-sluzba-zajnatosti-dala-poradi-ak-napisati-rezume-dla-posuku-roboti.html:",
      "https://ode.dcz.gov.ua/publikaciya/rezyume-yak-dzherelo-samoreklamy:",
      "https://kha.dcz.gov.ua/publikaciya/skladannya-rezyume-praktychni-porady:",
      "https://www.work.ua/articles/resume/1888/:",
    ],
  },
  uzbekistan: {
    pageLength: "2-page",
    includePhoto: "optional",
    includeAddress: "city-only",
    includeDOB: "common",
    includeGPA: "optional", // includeGPA: regional default — pack could not verify (central-asia)
    referenceSection: "available-on-request",
    notes: "Common in Uzbekistan: Russian-style резюме structure holds — a \"личные данные\" block with date of birth and marital status is standard and a business-style photo is welcomed though not obligatory; keep it under 2 pages with references prepared separately.",
    sources: [
      "https://ancor.co.uz/vacancy/advice/kak-pravilno-sostavit-rezyume-struktura-i-sovety/",
      "https://www.spot.uz/ru/2021/01/08/resume/",
    ],
  },

  // ---- WAVE 3 (promoted 2026-08-25) ----------------------------------------
  // 20 countries researched in wave 3. Same rules as the blocks above: a field the
  // pack could not verify holds this country's REGIONAL default and says so, and a
  // weaker sourcing tier is recorded on the entry rather than only in a handoff.
  // includeGPA fell to the regional default for 12 of these 20 — grade conventions
  // are simply not documented by most national career services.

  albania: {
    pageLength: "2-page",
    includePhoto: "optional", // includePhoto: regional default — pack could not verify (eastern-europe)
    includeAddress: "full",
    includeDOB: "common",
    includeGPA: "optional", // includeGPA: regional default — pack could not verify (eastern-europe)
    referenceSection: "available-on-request",
    notes: "Common in Albania: the CV opens with a \"Të dhënat personale\" block carrying datëlindja (date of birth) and adresa e vendbanimit (residential address), Europass-style — duapune.com / merrjep.com.",
    // sources: established local platforms / career media only — no government/university source located per-field (wave 3)
    sources: [
      "https://www.duapune.com/blog/keshilla-mbi-cv/si-te-shkruajme-nje-cv-profesionale",
      "https://www.merrjep.com/blog/si-te-shkruajme-nje-cv",
      "https://duapune.com/blog/keshilla-mbi-cv/cfare-perfshihet-ne-nje-shembull-cv",
      "https://www.portalipunes.al/blogs/2",
    ],
  },
  argentina: {
    pageLength: "2-page",
    includePhoto: "optional",
    includeAddress: "full",
    includeDOB: "common",
    includeGPA: "optional", // includeGPA: regional default — pack could not verify (central-south-america)
    referenceSection: "available-on-request",
    notes: "Common in Argentina: a max-two-page CV whose datos personales traditionally carry DNI number, date of birth, marital status and nationality per the national employment portal, with photo explicitly optional; references are supplied on request rather than listed, and specialists now push city-only address and DOB-free formats.",
    sources: [
      "https://www.argentina.gob.ar/trabajo/preparate",
      "https://www.perfil.com/noticias/economia/que-poner-en-el-curriculum-datos-obligatorios-recomendaciones-actuales-y-que-conviene-omitir-a35.phtml",
      "https://www.bumeran.com.ar/blog/buscar-trabajo/curriculum-sin-experiencia-que-poner-y-como-destacarte/",
    ],
  },
  armenia: {
    pageLength: "2-page",
    includePhoto: "optional",
    includeAddress: "avoid",
    includeDOB: "avoid",
    includeGPA: "optional", // includeGPA: regional default — pack could not verify (central-asia)
    referenceSection: "list", // referenceSection: regional default — pack could not verify (central-asia)
    notes: "Common in Armenia: the market's de-facto style guide is staff.am — a Western-leaning one-to-two-page CV (often in English) whose structure ends at skills/hobbies, with age and home address explicitly kept off (\"տան հասցեն հարկավոր չէ ընդգրկել\" — job.am), unlike classic post-Soviet резюме.",
    // sources: established local platforms / career media only — no government/university source located per-field (wave 3)
    sources: [
      "https://staffmedia.am/career/how-to-write-a-professional-cv",
      "https://job.am/en/blog/941/inch-grel-rezyumeum-xorhurdner-ashxatanqayin-pordz-chunecogh-usanoghnerin",
      "https://www.internest.am/1489/ինչպե՞ս-կազմել-ճիշտ-ռեզյումե/",
      "https://www.accountant.am/ռեզյումեի-օրինակ-․-ինչպե՞ս-կազմել-ռեզ/",
      "https://www.internest.am/3120/հայերեն-ռեզյումեի-օրինակներ/",
      "https://job.am/en/blog/941/…",
      "https://www.internest.am/1489/…",
    ],
  },
  azerbaijan: {
    pageLength: "2-page",
    includePhoto: "optional",
    includeAddress: "full",
    includeDOB: "common",
    includeGPA: "optional",
    referenceSection: "list",
    notes: "Common in Azerbaijan: the traditional CV still opens with a personal-data block giving date AND place of birth (\"Anadan olma tarixi və doğulduğunuz yer\" — banco.az), and the State Employment Agency pushes jobseekers to its free national builder cv.dma.gov.az (\"CV yarat\"), with CVs circulating in Azerbaijani, Russian or English by employer.",
    sources: [
      "https://dma.gov.az/layiheler/sosial-layiheler/cv-yarat",
      "https://cv.dma.gov.az",
      "http://unec.edu.az/karyera-merkezi-teqdim-edir-sizin-marketinq-materiallarinizin-hazirlanmasi/",
      "https://banco.az/az/news/yaxsi-cv-ni-nece-hazirlamaq-olar",
      "https://qebulol.az/cv/",
      "https://upperedu.az/ugurlu-cv-yazmaq-ucun-numuneler",
    ],
  },
  "bosnia-and-herzegovina": {
    pageLength: "2-page",
    includePhoto: "optional",
    includeAddress: "full",
    includeDOB: "common",
    includeGPA: "optional",
    referenceSection: "available-on-request",
    notes: "Common in Bosnia and Herzegovina: CVs follow the Europass-style \"biografija\" promoted by entity employment services (RS service page \"Европски формат биографије / CV\"), and the grade average is quoted on the 10-point scale — YEP's rule of thumb is to list it only above 8.00 for domestic applications (9.00 for abroad).",
    // sources: established local platforms / career media only — no government/university source located per-field (wave 3)
    sources: [
      "http://www.zzzrs.net/index.php/nezaposleni/savjeti/evropski_format_biografije_cv/",
      "https://cvk.apeiron-uni.eu/content/kako-napisati-cv-biografiju",
      "https://yep.ba/kako-napisati-cv/",
      "https://www.poslovi.ba/advice/pisanje-biografije-36",
    ],
  },
  cameroon: {
    pageLength: "2-page",
    includePhoto: "required",
    includeAddress: "full",
    includeDOB: "common",
    includeGPA: "optional",
    referenceSection: "list",
    notes: "Common in Cameroon: FNE-style identification block with date de naissance, situation de famille (incl. number of children) and adresse complète, plus an expected ID-format photo; CVs run more detailed than international norms.",
    sources: [
      "https://hubafrica.co/blog/comment-faire-un-cv-au-cameroun/",
      "https://africarrieres.com/cameroon/en/guide/pratique/writing-cv",
      "https://www.fnecm.org/index.php/fr/demarche-de-recherche-dun-emploi/rediger-son-profil",
    ],
  },
  chile: {
    pageLength: "flexible",
    includePhoto: "optional",
    includeAddress: "avoid",
    includeDOB: "avoid",
    includeGPA: "optional", // includeGPA: regional default — pack could not verify (central-south-america)
    referenceSection: "list", // referenceSection: regional default — pack could not verify (central-south-america)
    notes: "Common in Chile: CV length scales with experience (one page early-career, two beyond ~5 years); guidance is split on the photo — PUC's career guide calls it \"muy importante\" while recruiters advise \"sin foto\" — and modern advice strips RUT, address, marital status and age, in line with Ley 19.739's ban on age/sex conditions in job offers.",
    sources: [
      "https://www.ing.uc.cl/vinculacion-con-el-medio/desarrollo-laboral/potencia-tu-carrera/guia-transicion-laboral/herramientas/",
      "https://www.biobiochile.cl/noticias/servicios/explicado/2023/11/29/sin-foto-y-al-grano-5-consejos-para-un-curriculum-ganador.shtml",
      "https://www.biobiochile.cl/noticias/servicios/toma-nota/2026/07/13/sence-entrega-10-claves-para-que-tu-curriculum-destaque-en-la-bne-y-otros-portales-laborales.shtml",
    ],
  },
  colombia: {
    pageLength: "flexible",
    includePhoto: "optional",
    includeAddress: "full",
    includeDOB: "common",
    includeGPA: "optional", // includeGPA: regional default — pack could not verify (central-south-america)
    referenceSection: "list",
    notes: "Common in Colombia: the CV is called \"hoja de vida\", traditionally up to 3 pages, closed with work AND personal references plus the candidate's signature and date; government guidance (SENA) still lists DOB/ID/address while university guidance (Uniandes) now drops photo, address and marital data.",
    sources: [
      "https://ape.sena.edu.co/personas/Paginas/OrientacionHojaDeVida%20(1",
      "https://agora.uniandes.edu.co/como-hacer-una-hoja-de-vida-efectiva/",
    ],
  },
  "cote-d-ivoire": {
    pageLength: "2-page",
    includePhoto: "required",
    includeAddress: "city-only",
    includeDOB: "common",
    includeGPA: "optional",
    referenceSection: "available-on-request",
    notes: "Common in Cote d Ivoire (Côte d'Ivoire): CV opens with an état-civil block (situation matrimoniale, date/lieu de naissance) and a near-obligatory professional photo; address given as quartier + ville, e.g. \"Cocody, Abidjan\".",
    sources: [
      "https://simoon-cv.com/blog/comment-creer-cv-professionnel-cote-ivoire-2026/",
      "https://modeles-cv.fr/exemples-de-cv/cote-divoire-pays-1ab20",
      "https://news.educarriere.ci/news-6539-les-5-infos-qu-il-faut-gommer-de-votre-cv.html",
      "https://www.tresor.gouv.ci/tres/wp-content/uploads/2021/10/CV-DGA-sanogo-correct-2.pdf",
    ],
  },
  ecuador: {
    pageLength: "flexible",
    includePhoto: "avoid",
    includeAddress: "city-only",
    includeDOB: "avoid",
    includeGPA: "optional", // includeGPA: regional default — pack could not verify (central-south-america)
    referenceSection: "list",
    notes: "Common in Ecuador: the document is a \"hoja de vida\" of one page (two with experience) ending in three named references — professors count for first-timers per ESPOL — while 2026 guidance strips photo, full address, birth date and marital status down to city/province and professional data only.",
    sources: [
      "https://empleabilidad.espol.edu.ec/archivos/MANUAL_HOJA_DE_VIDA.pdf",
      "https://ceproem.espol.edu.ec/archivos/MANUAL_HOJA_DE_VIDA.pdf",
      "https://www.multitrabajos.com/blog/buscar-trabajo/como-armar-una-hoja-de-vida-en-ecuador-y-que-tener-en-cuenta/",
      "https://www.expreso.ec/tramites-y-servicios/hoja-vida-2026-datos-eliminar-mejorarla-conseguir-empleo-ecuador-291265.html",
    ],
  },
  kyrgyzstan: {
    pageLength: "1-page",
    includePhoto: "avoid",
    includeAddress: "full",
    includeDOB: "common",
    includeGPA: "optional", // includeGPA: regional default — pack could not verify (central-asia)
    referenceSection: "list",
    notes: "Common in Kyrgyzstan: the Russian-style одностраничное резюме — the state employment portal tells jobseekers to fit everything on one sheet with date of birth and full postal address, warning that employers skim rather than read each resume (zanyatost.kg).",
    sources: [
      "https://zanyatost.kg/Page/PageShow/1010",
      "https://www.auca.kg/en/career_resumewriting/",
    ],
  },
  latvia: {
    pageLength: "2-page",
    includePhoto: "optional",
    includeAddress: "full",
    includeDOB: "common",
    includeGPA: "optional", // includeGPA: regional default — pack could not verify (eastern-europe)
    referenceSection: "available-on-request",
    notes: "Common in Latvia: the CV shows dzimšanas gads (birth year) but never the personas kods (state personal ID code), and anything \"kas kaut kādā mērā var būt diskriminējoša\" (in any way potentially discriminatory) is left out (lvportals.lv).",
    sources: [
      "https://www.nva.gov.lv/en/registration-cv",
      "https://lvportals.lv/skaidrojumi/256670-dzives-apraksts-jeb-cv-ka-to-veidot-2013",
      "https://www.prakse.lv/article/610/5-padomi-ka-uzrakstit-cv-un-motivacijas-vestuli",
    ],
  },
  moldova: {
    pageLength: "2-page",
    includePhoto: "optional",
    includeAddress: "full",
    includeDOB: "common",
    includeGPA: "optional",
    referenceSection: "available-on-request",
    notes: "Common in Moldova: traditional institutional templates still carry a full personal-data block — \"Data naşterii\", \"Starea civilă\" and full \"Adresă\" (UTM/UPSC models) — while CVs circulate in Romanian or Russian depending on the employer, and grade averages are cited on Moldova's 10-point scale (list only above 8).",
    sources: [
      "https://www.cariera.anofm.md/",
      "https://utm.md/acte_normative/interne/cautareLocMunca.pdf",
      "https://www.delucru.md/articles/ghid-complet-cum-sa-ti-faci-un-cv-profesionist",
      "https://piatamuncii.md/ro/blog/sfaturi-utile-pentru-scrierea-unui-curriculum-vitae-cv",
      "https://old.upsc.md/wp-content/uploads/2017/02/subdiv_centru_ccgc_cv.pdf",
    ],
  },
  "north-macedonia": {
    pageLength: "2-page",
    includePhoto: "avoid",
    includeAddress: "full",
    includeDOB: "common", // includeDOB: regional default — pack could not verify (eastern-europe)
    includeGPA: "optional", // includeGPA: regional default — pack could not verify (eastern-europe)
    referenceSection: "list",
    notes: "Common in North Macedonia: AVRM (Агенција за вработување) steers jobseekers to the standard European CV format — \"Европскиот формат на CV Ви овозможува Вашите знаења и вештини да ги презентирате во стандардна форма\" (\"The European CV format enables you to present your knowledge and skills in a standard form\") — https://av.gov.mk/makedonski-ns_article-rabotna-biografija-cv.nspx Supporting exclusion quote (vrabotuvanje.com.mk): \"Во биографијата не наведувајте брачен статус, вероисповед и останати небитни податоци\" (\"Do not state marital status, religion and other irrelevant data in the CV\").",
    sources: [
      "https://www.vrabotuvanje.com.mk/Sovet/5810/13-tajni-za-100-sovrsheno-CV/51/",
      "https://www.apliciraj.mk/korisni-soveti-za-sekoj-segmet-na-vasheto-cv/",
      "https://24hr.mk/11-chekori-za-uspeshno-sostavuvanje-na-kratka-biografija-koi-kje-vi-pomognat-da-ja-dobiete-rabotata-koja-ja-sakate/",
      "https://www.vrabotuvanje.com.mk/Sovet/426/Eve-shto-NE-SMEE-da-stoi-vo-Vasheto-CV/56/",
      "https://www.vrabotuvanje.com.mk/Sovet/20739/Vaka-se-pishuva-CV-koga-nemate-rabotno-iskustvo/56/",
      "https://av.gov.mk/makedonski-ns_article-rabotna-biografija-cv.nspx",
    ],
  },
  peru: {
    pageLength: "2-page",
    includePhoto: "optional",
    includeAddress: "full",
    includeDOB: "avoid",
    includeGPA: "optional",
    referenceSection: "list",
    notes: "Common in Peru: a max-two-page \"CV\" with photo optional per the Ministry of Labour, three named references, and academic standing shown as \"tercio/quinto superior\" (class-rank bands employers often require); modern guidance (PUCP, platforms) says omit age, marital status and DNI to avoid bias.",
    sources: [
      "https://elcomercio.pe/economia/personal/mpte-como-elaborar-un-curriculum-vitae-eficiente-efectivo-y-ganador-noticia/",
      "https://www.gob.pe/institucion/mtpe/noticias/683144-el-mpte-te-asesora-para-elaborar-un-curriculum-vitae-eficiente-efectivo-y-ganador",
      "https://cdn01.pucp.education/btpucp/2019/07/19163243/manual_del_usuario1.pdf",
      "https://www.bumeran.com.pe/blog/buscar-trabajo/que-no-poner-en-tu-curriculum-si-buscas-trabajo/",
      "https://www.utp.edu.pe/blog/que-significa-decimo-quinto-tercio-superior",
      "https://investigacion.pucp.edu.pe/wp-content/uploads/2019/08/ejemplo-cv.pdf",
    ],
  },
  senegal: {
    pageLength: "2-page",
    includePhoto: "optional",
    includeAddress: "full",
    includeDOB: "common",
    includeGPA: "optional", // includeGPA: regional default — pack could not verify (sub-saharan-africa)
    referenceSection: "available-on-request",
    notes: "Common in Senegal: French-style CV with an \"état civil\" block first (age/marital status often shown), an optional but widespread photo, two pages maximum (one page preferred for jeunes diplômés), and references given on request rather than listed.",
    // sources: established local platforms / career media only — no government/university source located per-field (wave 3)
    sources: [
      "https://www.sencampus.com/rediger-cv-efficace/",
      "https://fournisseursdeservices.com/comment-rediger-un-cv-qui-attire-lattention-des-recruteurs-senegalais-2/",
      "https://www.emploidakar.com/comment-rediger-son-cv/",
      "https://modeles-cv.fr/exemples-de-cv/senegal-pays",
    ],
  },
  slovakia: {
    pageLength: "2-page",
    includePhoto: "optional",
    includeAddress: "city-only",
    includeDOB: "common",
    includeGPA: "optional", // includeGPA: regional default — pack could not verify (eastern-europe)
    referenceSection: "available-on-request",
    notes: "Common in Slovakia: photo and dátum narodenia are still routinely included on CVs sent via profesia.sk, even though ÚPSVaR's EURES guidance treats both as optional and warns against marital-status/nationality details. Supporting exclusion quote (eures.sk): \"Do životopisu nepatria: informácie o rodinnom stave, sexuálnej orientácii, náboženskom presvedčení… zdravotnom stave, tehotenstve\" (\"The CV should not contain: marital status, sexual orientation, religious belief… health status, pregnancy\").",
    sources: [
      "https://www.eures.sk/vzor-zivotopisu-a-prakticke-rady-pri-pisani/",
      "https://blog.profesia.sk/6-najvacsich-chyb-v-zivotopise/",
      "https://www.profesia.sk/kariera-v-kocke/zivotopis/ako-napisat-dobry-zivotopis/",
      "https://www.profesia.sk/kariera-v-kocke/zivotopis/referencie/",
    ],
  },
  slovenia: {
    pageLength: "2-page",
    includePhoto: "optional",
    includeAddress: "full",
    includeDOB: "common",
    includeGPA: "optional", // includeGPA: regional default — pack could not verify (eastern-europe)
    referenceSection: "list",
    notes: "Common in Slovenia: ZRSZ's eSvetovanje stresses \"Ne obstaja ena in edina pravilna oblika življenjepisa\" (no single correct CV format) — a 1–2 page življenjepis with full naslov, optional photo and optional named reference section is the norm.",
    sources: [
      "https://esvetovanje.ess.gov.si/KakoKandidiramNaDelovnaMesta/Zivljenjepis/",
      "https://www.ess.gov.si/iskalci-zaposlitve/delo-v-evropi-eures/iskanje-zaposlitve-v-evropi/mednarodni-zivljenjepis/",
      "https://www.kariera.si/sl/blog/kako-napisati-zivljenjepis",
      "https://www.optius.com/iskalci/karierna-svetovalnica/fotografija-v-zivljenjepisu-da-ali-ne/",
    ],
  },
  zambia: {
    pageLength: "2-page",
    includePhoto: "avoid",
    includeAddress: "city-only",
    includeDOB: "common", // includeDOB: regional default — pack could not verify (sub-saharan-africa)
    includeGPA: "optional",
    referenceSection: "list",
    notes: "Common in Zambia: employers (including government, e.g. the Judiciary) ask for a CV with \"three traceable referees\" — named, contactable references are the norm, often alongside certified copies of certificates.",
    sources: [
      "https://gozambiajobs.com/blog/the-ultimate-guide-to-writing-a-resume-in-zambia",
      "https://cczambia.com/your-cv/",
      "https://gozambiajobs.com/cv-basics-2/",
      "https://jobsmuzambia.com/how-to-write-a-winning-cv-for-the-zambian-job-market/",
      "https://www.greatzambiajobs.com/jobs/job-detail/job-2-General-Worker-Grounds-jss-01-job-at-The-Judiciary-of-Zambia-64530",
    ],
  },
  zimbabwe: {
    pageLength: "2-page",
    includePhoto: "avoid",
    includeAddress: "city-only",
    includeDOB: "common",
    includeGPA: "optional",
    referenceSection: "list",
    notes: "Common in Zimbabwe: named referees on the CV (institutions like the University of Zimbabwe demand \"three contactable referees\"), O-/A-Level subjects and grades listed when there is no degree, and public-sector applications still expecting date of birth and National I.D. number.",
    sources: [
      "https://www.everydayvacancies.co.zw/articles/mastering_the_zimbabwean_cv_guide/",
      "https://uripapi.com/how-to-write-a-professional-cv-that-gets-you-noticed-in-zimbabwe/",
      "https://resumeflex.com/how-to-write-a-professional-cv-for-zimbabwe-job-market/",
      "https://applynow.co.zw/2026/08/18/university-of-zimbabwe-10/",
    ],
  },
};

/**
 * Build CV_CONVENTIONS — one entry per served country.
 * Country override wins; falls through to the country's regional default.
 * Notes the source ("regional default") inline for transparency.
 */
function buildConventions(): Record<string, CountryConvention> {
  const out: Record<string, CountryConvention> = {};
  for (const country of COUNTRIES_SERVED) {
    const override = COUNTRY_OVERRIDES[country.slug];
    if (override) {
      out[country.slug] = override;
    } else {
      const def = REGIONAL_DEFAULTS[country.region];
      out[country.slug] = {
        ...def,
        notes: `Common in ${country.name}: ${def.notes.replace(/^Common in (the )?region: /, "")} (regional default — verify with target employer)`,
      };
    }
  }
  return out;
}

export const CV_CONVENTIONS: Record<string, CountryConvention> = buildConventions();

export function getConvention(countrySlug: string): CountryConvention | undefined {
  return CV_CONVENTIONS[countrySlug];
}

/**
 * True when this country has a hand-verified entry (not a regional default).
 * Used to flag "verified" badge on the page vs the "regional default" note.
 */
/** The hand-verified country slugs, in declaration order. Exported so the gate
 *  iterates the SAME object the page reads rather than a second list that can
 *  drift from it. */
export const COUNTRY_OVERRIDE_SLUGS: readonly string[] = Object.keys(COUNTRY_OVERRIDES);

/** The raw override, sources and all. getConvention() deliberately does not
 *  expose these — the page needs the seven fields, the gate needs the sources. */
export function getVerifiedOverride(countrySlug: string): VerifiedCountryConvention | undefined {
  return COUNTRY_OVERRIDES[countrySlug];
}

export function hasVerifiedConvention(countrySlug: string): boolean {
  return Boolean(COUNTRY_OVERRIDES[countrySlug]);
}
