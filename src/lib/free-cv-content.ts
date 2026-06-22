/**
 * AlmiCV — "Free CV maker in [country]" localized content.
 *
 * Per-country prose for the /free-cv-maker/[country] surface. This is the
 * transactional / tool-intent companion to /cv-guide/[country] (the
 * informational guide surface) — same audience, different search query.
 * Each entry is hand-sourced from public, verifiable facts: the local term
 * for a CV, the real job-market picture, major hiring cities, the official
 * work-entry routes for internationals, and the real local job boards.
 *
 * DOCTRINE #6 — real data only. A country gets an entry ONLY when its facts
 * are sourced. Countries without an entry are noindex (real-data-or-noindex);
 * see lib/free-cv-content gate `hasFreeCvContent`. Structured CV norms (page
 * length, photo, DOB, references) come from lib/cv-conventions.ts — not
 * duplicated here.
 */

export type FreeCvContent = {
  /** Local-language word for a CV (e.g. "Lebenslauf"). Falls back to "CV". */
  localTerm: string;
  /** Currency phrase, e.g. "the euro (EUR, €)". */
  currency: string;
  /** 1–2 sentences: why a free CV maker matters locally / how people search. */
  searchContext: string;
  /** 1–2 sentences: the local job-market reality (honest, sourced). */
  jobMarket: string;
  /** Major cities / hiring hubs. */
  cities: string[];
  /** Country-specific format points beyond the convention table. */
  formatNotes: string[];
  /** Honest note on the main work-entry route(s) for internationals. null when none is well-known. */
  workRouteNote?: string | null;
  /** Real local job boards / portals where the CV actually gets used. */
  localJobSites: string[];
};

export const FREE_CV_CONTENT: Record<string, FreeCvContent> = {
  germany: {
    localTerm: "Lebenslauf",
    currency: "the euro (EUR, €)",
    searchContext:
      "In Germany a CV is a Lebenslauf, and a clean, correctly formatted one is expected for almost every application. A free maker matters most to students, career-changers, and people arriving from abroad who don't want to pay for a template they'll edit dozens of times.",
    jobMarket:
      "Germany has Europe's largest economy and a well-documented skilled-worker shortage (Fachkräftemangel) in fields such as healthcare, engineering, IT, and the skilled trades — which has opened several formal routes for international applicants.",
    cities: ["Berlin", "Munich", "Hamburg", "Frankfurt", "Cologne", "Stuttgart"],
    formatNotes: [
      "A German Lebenslauf is usually reverse-chronological and runs one to two pages, with clear sections for personal details, work history, and education.",
      "A photo (Bewerbungsfoto) was once standard; since the 2006 Equal Treatment Act (AGG) it is optional and increasingly left off, though many applicants still include one.",
      "More personal detail is normal than in the US or UK — date of birth is commonly listed, and place of birth or nationality sometimes appears.",
      "The document is often dated and signed at the bottom (Ort, Datum, Unterschrift).",
      "A full German application (Bewerbung) frequently includes attached certificates and previous employers' written references (Arbeitszeugnisse).",
    ],
    workRouteNote:
      "International applicants commonly enter through the Skilled Immigration Act, the EU Blue Card for higher earners, or the Opportunity Card (Chancenkarte) — a points-based job-seeker route introduced in 2024. Check the official Make it in Germany portal for current rules before relying on any route.",
    localJobSites: [
      "StepStone",
      "Indeed Germany",
      "Xing",
      "LinkedIn",
      "the Federal Employment Agency board (Arbeitsagentur)",
      "the official Make it in Germany portal",
    ],
  },
  "united-states": {
    localTerm: "résumé (the longer CV is reserved for academia)",
    currency: "the US dollar (USD, $)",
    searchContext:
      "In the United States most jobs ask for a résumé, not a CV, and a free maker matters to students, recent graduates, hourly workers, and career-changers who apply to many roles and don't want a subscription for one document.",
    jobMarket:
      "The US has the world's largest economy, with heavy hiring in healthcare, technology, retail, logistics, finance, and professional services. Hiring is overwhelmingly online and applicant-tracking systems are standard.",
    cities: ["New York", "Los Angeles", "Chicago", "Houston", "Atlanta", "Dallas"],
    formatNotes: [
      "A US résumé is usually one page (two for experienced candidates) and reverse-chronological.",
      "No photo, date of birth, or marital status is included, largely for anti-discrimination reasons.",
      "Most employers screen with applicant-tracking systems, so a clean, single-column layout reads best.",
      "A short summary or skills section near the top is common, with skills tied to concrete results.",
      "References are normally given on request rather than listed on the document.",
    ],
    workRouteNote:
      "International applicants usually need an employer-sponsored visa such as the H-1B or an employment-based green card — check the official USCIS and US Department of State sources before relying on any route.",
    localJobSites: ["Indeed", "LinkedIn", "Glassdoor", "ZipRecruiter", "Monster", "USAJOBS (federal roles)"],
  },
  canada: {
    localTerm: "résumé (or CV in French-speaking Quebec)",
    currency: "the Canadian dollar (CAD, C$)",
    searchContext:
      "In Canada the document is usually called a résumé, and a free maker matters to students, newcomers, and people moving between provinces who need a Canadian-style layout quickly.",
    jobMarket:
      "Canada has documented labour shortages in healthcare, the skilled trades, technology, and transport, and runs active immigration programs to fill them.",
    cities: ["Toronto", "Montreal", "Vancouver", "Calgary", "Ottawa", "Edmonton"],
    formatNotes: [
      "A Canadian résumé is typically one to two pages and reverse-chronological.",
      "No photo, age, or marital status is expected, in line with human-rights and anti-discrimination norms.",
      "It is conventionally written in the third person, without 'I' or 'me'.",
      "Quebec applications are often in French and may use the term CV.",
      "Newcomers often highlight Canadian experience, credentials, and volunteer work, and many employers use applicant-tracking systems.",
    ],
    workRouteNote:
      "International workers commonly enter through Express Entry or an employer-specific work permit — check the official Immigration, Refugees and Citizenship Canada (IRCC) site before relying on any route.",
    localJobSites: ["Job Bank (Government of Canada)", "Indeed Canada", "LinkedIn", "Workopolis", "Glassdoor"],
  },
  mexico: {
    localTerm: "currículum vitae (CV)",
    currency: "the Mexican peso (MXN, $)",
    searchContext:
      "In Mexico the document is the currículum vitae, and a free maker matters to students, recent graduates, and workers in a large, competitive market who apply to many positions online.",
    jobMarket:
      "Mexico has a large manufacturing base (notably automotive and electronics), plus growth in services, logistics, tourism, and nearshoring-driven industry near the US border.",
    cities: ["Mexico City", "Guadalajara", "Monterrey", "Puebla", "Tijuana", "Querétaro"],
    formatNotes: [
      "A Mexican CV is usually one to two pages and reverse-chronological.",
      "A photo was traditionally included, but 2026 guidance increasingly omits it unless the posting asks, partly because tracking systems can't read it.",
      "Only city and state of residence are listed, not a full street address.",
      "Date of birth is sometimes still shown, though this is gradually fading.",
      "Bilingual Spanish-English CVs are common for multinational and border-region employers.",
    ],
    workRouteNote:
      "Foreign workers generally need a work-authorised residence permit tied to an employer — check the official Instituto Nacional de Migración (INM) before relying on any route.",
    localJobSites: ["OCC Mundial", "Computrabajo", "Indeed Mexico", "LinkedIn"],
  },
  jamaica: {
    localTerm: "CV (more common than résumé for formal roles)",
    currency: "the Jamaican dollar (JMD, J$)",
    searchContext:
      "In Jamaica the document is usually called a CV, and a free maker matters to students, graduates, and workers applying across tourism, services, and the public sector.",
    jobMarket:
      "Jamaica's economy is led by tourism, business-process outsourcing (call centres), agriculture, bauxite mining, and remittances from a large diaspora, which is honest context for the local market.",
    cities: ["Kingston", "Montego Bay", "Spanish Town", "Portmore", "Ocho Rios"],
    formatNotes: [
      "A Jamaican CV often runs two to three pages, with room to detail certifications and technical skills.",
      "It is reverse-chronological, starting with the most recent role.",
      "Jamaican (British-influenced) English spelling is expected.",
      "Customer-service and BPO experience is often highlighted, given the size of that sector.",
      "CXC/CAPE qualifications are usually listed, and references are commonly offered.",
    ],
    workRouteNote:
      "Foreign nationals generally need a work permit arranged through an employer — check the official Ministry of Labour and Social Security before relying on any route.",
    localJobSites: ["CaribbeanJobs.com", "Go-Jamaica (Splash Jamaica)", "LinkedIn", "Indeed", "eJamJobs"],
  },
  "trinidad-and-tobago": {
    localTerm: "CV (résumé is also used)",
    currency: "the Trinidad and Tobago dollar (TTD, TT$)",
    searchContext:
      "In Trinidad and Tobago both CV and résumé are used, and a free maker matters to students, graduates, and workers across energy, services, and the public sector.",
    jobMarket:
      "Trinidad and Tobago has the Caribbean's most industrialised economy, anchored by oil, natural gas, and petrochemicals, alongside finance, manufacturing, and services. Tobago leans more on tourism.",
    cities: ["Port of Spain", "San Fernando", "Chaguanas", "Arima", "Scarborough"],
    formatNotes: [
      "A CV here is usually kept to about two pages, with numbered pages and consistent spacing.",
      "Photo, date of birth, ethnicity, and marital status are deliberately left off.",
      "It is reverse-chronological, typically opening with work history.",
      "Energy-sector and technical qualifications are often emphasised, given the industry base.",
      "English is standard, and references are commonly offered.",
    ],
    workRouteNote:
      "Foreign nationals generally need a work permit arranged through an employer — check the official Immigration Division / Ministry of National Security before relying on any route.",
    localJobSites: ["CaribbeanJobs.com", "TTJobs.com", "LinkedIn", "Indeed", "the National Employment Service"],
  },
  "dominican-republic": {
    localTerm: "currículum vitae (CV)",
    currency: "the Dominican peso (DOP, RD$)",
    searchContext:
      "In the Dominican Republic the document is the currículum vitae, and a free maker matters to students, graduates, and workers in one of the Caribbean's largest, fast-growing markets.",
    jobMarket:
      "The economy is led by tourism, free-trade-zone manufacturing, construction, mining, and services, with hiring concentrated around Santo Domingo and Santiago.",
    cities: ["Santo Domingo", "Santiago de los Caballeros", "La Romana", "Puerto Plata", "San Pedro de Macorís"],
    formatNotes: [
      "A Dominican CV is written in Spanish and is usually one to two pages, reverse-chronological.",
      "A clear header with name, profession, and contact details is expected at the top.",
      "A photo and personal details are commonly included.",
      "Bilingual Spanish-English CVs are valued by tourism and free-zone employers.",
      "References are often listed or offered on request.",
    ],
    workRouteNote:
      "Foreign workers generally need a residence and work permit tied to an employer — check the official Dirección General de Migración before relying on any route.",
    localJobSites: ["Computrabajo", "Empleos.do", "BuscoJobs", "LinkedIn", "Indeed"],
  },
  bahamas: {
    localTerm: "CV (résumé is also used)",
    currency: "the Bahamian dollar (BSD, B$), pegged one-to-one to the US dollar",
    searchContext:
      "In The Bahamas both CV and résumé are used, and a free maker matters to students, hospitality and financial-services workers, and people applying across the islands.",
    jobMarket:
      "The economy is led by tourism and offshore financial services, with construction, retail, and government also significant. Employment is concentrated in Nassau and Freeport.",
    cities: ["Nassau", "Freeport", "Marsh Harbour", "George Town"],
    formatNotes: [
      "A Bahamian CV is written in English and is usually one to two pages, reverse-chronological.",
      "A common structure is heading, objective, education, experience, skills, and references.",
      "Years rather than months are often used for roles, to avoid drawing attention to short gaps.",
      "A cover letter is normally expected alongside the CV.",
      "References are commonly listed or offered on request.",
    ],
    workRouteNote:
      "Foreign workers generally need an employer-sponsored work permit — check the official Bahamas Department of Immigration before relying on any route.",
    localJobSites: ["CaribbeanJobs.com", "EmployBahamians.com", "BahamasLocal.com", "LinkedIn", "Indeed"],
  },
  barbados: {
    localTerm: "CV",
    currency: "the Barbadian dollar (BBD, Bds$), pegged to the US dollar",
    searchContext:
      "In Barbados the document is usually called a CV, and a free maker matters to students, graduates, and workers across tourism, services, and the public sector.",
    jobMarket:
      "Barbados relies on tourism, international business and financial services, retail, and government employment. It is one of the more diversified small Caribbean economies.",
    cities: ["Bridgetown", "Speightstown", "Oistins", "Holetown"],
    formatNotes: [
      "A Barbadian CV is kept concise, usually no more than two pages.",
      "It opens with contact details and a brief personal statement, then education and experience.",
      "English is the working language, though listing other languages can be an advantage.",
      "Local or Caribbean knowledge is often valued and worth signalling.",
      "References are commonly included or offered.",
    ],
    workRouteNote:
      "Foreign nationals generally need a work permit arranged through an employer — check the official Barbados Immigration Department before relying on any route.",
    localJobSites: ["Jobs.bb", "the Barbados Job Register", "CaribbeanJobs.com", "LinkedIn", "Indeed"],
  },
  "antigua-and-barbuda": {
    localTerm: "CV",
    currency: "the East Caribbean dollar (XCD, EC$)",
    searchContext:
      "In Antigua and Barbuda the document is usually called a CV, and a free maker matters to students, hospitality workers, and people applying across the small local market and to regional employers.",
    jobMarket:
      "The economy is heavily tourism-dependent, with hospitality, retail, construction, and government among the main employers; financial services also play a role.",
    cities: ["St. John's", "All Saints", "Liberta"],
    formatNotes: [
      "A CV here typically runs one to two pages and is reverse-chronological.",
      "British and Caribbean conventions influence layout and spelling.",
      "References are commonly listed, reflecting the small, network-driven market.",
      "Hospitality and customer-service experience is often emphasised.",
    ],
    workRouteNote:
      "Foreign nationals generally need a work permit arranged through an employer — check the official Antigua and Barbuda Labour Department before relying on any route.",
    localJobSites: ["CaribbeanJobs.com", "LinkedIn", "Indeed"],
  },
  cuba: {
    localTerm: "currículum vitae (CV)",
    currency: "the Cuban peso (CUP, $)",
    searchContext:
      "In Cuba the document is the currículum vitae, though the labour market is unusual because the state remains the dominant employer and roles are often found through personal connections.",
    jobMarket:
      "Cuba has a state-led economy, with the largest activity in healthcare, education, tourism, agriculture, and construction. A growing but still limited private sector exists, and tourism is where most new openings appear.",
    cities: ["Havana", "Santiago de Cuba", "Camagüey", "Holguín", "Santa Clara"],
    formatNotes: [
      "A Cuban CV is usually written in Spanish, with English accepted for international-sector roles.",
      "It is reverse-chronological and formally laid out.",
      "The personal section is detailed, commonly listing full name, date of birth, and national ID number.",
      "Academic qualifications and professional titles are emphasised, reflecting a highly credentialed workforce.",
    ],
    workRouteNote: null,
    localJobSites: ["LinkedIn", "the UN jobs portal (for international-organisation roles)"],
  },
  haiti: {
    localTerm: "CV (curriculum vitæ), usually in French",
    currency: "the Haitian gourde (HTG, G)",
    searchContext:
      "In Haiti the document is the CV, written mainly in French, and a free maker matters to students, professionals, and people working with NGOs and the diaspora.",
    jobMarket:
      "Haiti's formal job market is limited and concentrated in the capital, with NGOs, international organisations, trade, agriculture, and light manufacturing among the main employers. Remittances from the diaspora are a major part of the economy, which is honest context for any jobseeker.",
    cities: ["Port-au-Prince", "Cap-Haïtien", "Les Cayes", "Gonaïves"],
    formatNotes: [
      "A Haitian CV follows French conventions and is usually written in French.",
      "It is reverse-chronological, with dates typically given as MM/YYYY.",
      "A photo is commonly placed in the top right, following French practice.",
      "French — and often Haitian Creole or English — language skills are highlighted, which matter for NGO and international work.",
      "A4 is the standard page size.",
    ],
    workRouteNote: null,
    localJobSites: ["LinkedIn", "Indeed", "NGO and UN job portals"],
  },
  "saint-lucia": {
    localTerm: "CV",
    currency: "the East Caribbean dollar (XCD, EC$)",
    searchContext:
      "In Saint Lucia the document is usually called a CV, and a free maker matters to students and workers in a tourism-dependent economy where employers often fill roles quickly.",
    jobMarket:
      "Saint Lucia relies heavily on tourism, with agriculture (bananas), retail, construction, and government also employing people. Tourism dependence makes the market sensitive to seasonal and global swings.",
    cities: ["Castries", "Vieux Fort", "Soufrière", "Gros Islet"],
    formatNotes: [
      "A Saint Lucian CV typically runs one to two pages and is reverse-chronological.",
      "British and Caribbean conventions shape layout and spelling.",
      "It is worth tailoring the CV to each role, since many vacancies are filled fast.",
      "Hospitality and customer-service experience is often highlighted.",
      "References are commonly offered.",
    ],
    workRouteNote:
      "Foreign nationals generally need a work permit arranged through an employer — check the official Government of Saint Lucia / Labour Department before relying on any route.",
    localJobSites: ["CaribbeanJobs.com", "HiredCaribbean", "Jobs St Lucia", "LinkedIn", "Indeed"],
  },
  grenada: {
    localTerm: "CV",
    currency: "the East Caribbean dollar (XCD, EC$)",
    searchContext:
      "In Grenada the document is usually called a CV, and a free maker matters to students and workers in a small tourism- and agriculture-based economy.",
    jobMarket:
      "Grenada relies on tourism, agriculture (notably nutmeg and spices), education (including a large offshore medical university), and construction. The market is small and diaspora links matter.",
    cities: ["St. George's", "Gouyave", "Grenville"],
    formatNotes: [
      "A Grenadian CV typically runs one to two pages and is reverse-chronological.",
      "A neat, clean, easy-to-read layout is expected.",
      "British and Caribbean conventions shape spelling and structure.",
      "CXC/CAPE qualifications are usually stated clearly.",
      "References are commonly listed in the small local market.",
    ],
    workRouteNote:
      "Foreign nationals generally need a work permit arranged through an employer — check the official Government of Grenada sources before relying on any route.",
    localJobSites: ["CaribbeanJobs.com", "Jobs In Grenada", "LinkedIn", "Indeed"],
  },
  dominica: {
    localTerm: "CV",
    currency: "the East Caribbean dollar (XCD, EC$)",
    searchContext:
      "In Dominica the document is usually called a CV, and a free maker matters to students and workers in a small economy where many also look toward regional jobs.",
    jobMarket:
      "Dominica's economy rests on agriculture, eco-tourism, and government employment, and it is exposed to hurricane damage. Remittances from the diaspora are an honest part of household income.",
    cities: ["Roseau", "Portsmouth", "Marigot"],
    formatNotes: [
      "A CV here is usually in English, though French is also accepted given the island's Francophone heritage.",
      "It runs one to two pages and is reverse-chronological.",
      "A clean, scannable layout without a headshot reads best.",
      "Hospitality and eco-tourism or environmental skills are increasingly valued.",
      "References are commonly offered.",
    ],
    workRouteNote:
      "Foreign nationals generally need a work permit arranged through an employer — check the official Government of Dominica sources before relying on any route.",
    localJobSites: ["CaribbeanJobs.com", "JobsInDominica.com", "LinkedIn", "Indeed"],
  },
  "saint-kitts-and-nevis": {
    localTerm: "CV",
    currency: "the East Caribbean dollar (XCD, EC$)",
    searchContext:
      "In Saint Kitts and Nevis the document is usually called a CV, and a free maker matters to students and workers in a small tourism-led economy.",
    jobMarket:
      "The economy draws on tourism, financial services, construction, healthcare, and public administration. It is one of the smallest economies in the Americas, so the formal market is limited; nursing and teaching roles are persistently in demand.",
    cities: ["Basseterre", "Charlestown", "Sandy Point Town"],
    formatNotes: [
      "A CV here typically runs one to two pages and is reverse-chronological.",
      "British and Caribbean conventions shape layout and spelling.",
      "Tourism and hospitality experience is often emphasised.",
      "References are commonly listed in the small, network-driven market.",
    ],
    workRouteNote:
      "Foreign nationals generally need a work permit arranged through an employer — check the official Government of St. Kitts and Nevis sources before relying on any route.",
    localJobSites: ["CaribbeanJobs.com", "SKNVibes", "Jobs St Kitts and Nevis", "LinkedIn", "Indeed"],
  },
  "saint-vincent-and-the-grenadines": {
    localTerm: "CV",
    currency: "the East Caribbean dollar (XCD, EC$)",
    searchContext:
      "In Saint Vincent and the Grenadines the document is usually called a CV, and a free maker matters to students and workers in a small tourism- and agriculture-based economy.",
    jobMarket:
      "The economy rests on tourism, agriculture, financial services, and government, with the Argyle International Airport supporting tourism growth and emerging renewable-energy roles. The formal market is small and diaspora links matter.",
    cities: ["Kingstown", "Georgetown", "Port Elizabeth"],
    formatNotes: [
      "A CV here typically runs one to two pages and is reverse-chronological.",
      "British and Caribbean conventions shape layout and spelling.",
      "CXC/CAPE qualifications are usually stated.",
      "Hospitality and technical roles are commonly advertised.",
      "References are commonly listed in the small local market.",
    ],
    workRouteNote:
      "Foreign nationals generally need a work permit arranged through an employer — check the official Department of Labour before relying on any route.",
    localJobSites: ["CaribbeanJobs.com", "About SVG", "LinkedIn", "Indeed"],
  },
};

export function getFreeCvContent(slug: string): FreeCvContent | undefined {
  return FREE_CV_CONTENT[slug];
}

/**
 * True when this country has a hand-sourced entry. Gates indexing:
 * sourced → self-canonical + indexed; otherwise noindex.
 */
export function hasFreeCvContent(slug: string): boolean {
  return Boolean(FREE_CV_CONTENT[slug]);
}
