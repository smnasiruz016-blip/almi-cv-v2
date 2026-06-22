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
  argentina: {
    localTerm: "currículum vitae (CV)",
    currency: "the Argentine peso (ARS, $)",
    searchContext:
      "In Argentina a CV is a currículum vitae, usually just CV. A free maker matters to students, recent graduates, and people changing fields who want a clean document without paying for a template in a high-inflation economy.",
    jobMarket:
      "Argentina's economy centres on services, agriculture and agribusiness, energy, and a growing technology and software-export sector, alongside a large informal workforce and persistent inflation.",
    cities: ["Buenos Aires", "Córdoba", "Rosario", "Mendoza", "La Plata"],
    formatNotes: [
      "A CV is usually one to two pages and reverse-chronological.",
      "A photo is common and generally well-regarded if it is a neutral, professional headshot.",
      "The DNI (national ID) is optional, and date of birth is optional though many recruiters still expect it.",
      "PDF is the usual format for sending, unless an employer asks for Word.",
      "Contact details and city of residence go at the top.",
    ],
    workRouteNote:
      "Internationals typically work through a residence permit, including Mercosur residency for nationals of member states — check official sources before relying on any route.",
    localJobSites: ["Bumeran", "ZonaJobs", "Computrabajo", "LinkedIn", "Indeed"],
  },
  brazil: {
    localTerm: "currículo",
    currency: "the Brazilian real (BRL, R$)",
    searchContext:
      "In Brazil a CV is a currículo. A free maker matters most to students, first-job seekers, and people re-entering the formal market who want a tidy document without paying for software.",
    jobMarket:
      "Brazil has Latin America's largest economy, spanning agribusiness, manufacturing, mining, services, and a sizable technology sector, alongside a very large informal workforce.",
    cities: ["São Paulo", "Rio de Janeiro", "Brasília", "Belo Horizonte", "Curitiba", "Porto Alegre"],
    formatNotes: [
      "A currículo is usually one to two pages and reverse-chronological.",
      "It often opens with a short professional objective or summary.",
      "The CPF is best kept off a CV sent to many employers and shared only at the contracting stage.",
      "Personal details such as neighbourhood or age still appear in some local currículos, though this is fading.",
      "Many large employers hire through the Gupy platform, which adds automated tests and assessments.",
    ],
    workRouteNote:
      "Foreign workers generally need an employer-sponsored work visa — check official Brazilian government sources before relying on any route.",
    localJobSites: ["Catho", "Vagas.com.br", "Gupy", "LinkedIn", "Indeed"],
  },
  chile: {
    localTerm: "currículum vitae (CV)",
    currency: "the Chilean peso (CLP, $)",
    searchContext:
      "In Chile a CV is a currículum vitae, usually just CV. A free maker helps students, recent graduates, and career-changers applying across Santiago's competitive services and professional market.",
    jobMarket:
      "Chile's economy is driven by copper and mining, agriculture and wine, retail, financial services, and a developing technology scene, with relatively strong formal employment by regional standards.",
    cities: ["Santiago", "Valparaíso", "Concepción", "Viña del Mar", "Antofagasta"],
    formatNotes: [
      "One page is preferred for under five years of experience, two at most for senior profiles.",
      "It is reverse-chronological, with month and year and a few concrete accomplishments per role.",
      "The RUT, date of birth, marital status, and photo are no longer expected unless the posting asks.",
      "PDF is preferred to avoid layout problems.",
    ],
    workRouteNote:
      "Internationals usually work via a work or residence visa — check the official Servicio Nacional de Migraciones before relying on any route.",
    localJobSites: ["Laborum", "Trabajando.com", "Computrabajo", "LinkedIn", "Indeed"],
  },
  colombia: {
    localTerm: "hoja de vida",
    currency: "the Colombian peso (COP, $)",
    searchContext:
      "In Colombia a CV is almost always called a hoja de vida. A free maker matters to students, recent graduates, and the many applicants who keep a hoja de vida for both private-sector and public-sector roles.",
    jobMarket:
      "Colombia's economy spans services, oil and mining, agriculture (notably coffee), manufacturing, and a fast-growing technology and outsourcing sector, alongside high informal employment.",
    cities: ["Bogotá", "Medellín", "Cali", "Barranquilla", "Cartagena", "Bucaramanga"],
    formatNotes: [
      "A hoja de vida is usually one to two pages and reverse-chronological.",
      "It opens with contact details and a three-to-five-line professional profile.",
      "Recruiters and AI filters scan in seconds, so a clear, keyword-aware structure helps.",
      "Public-sector roles often use the standardized formato único de hoja de vida.",
      "A photo and the cédula are traditionally included, though privacy practice is shifting.",
    ],
    workRouteNote:
      "Internationals generally need a Migrant (M) or other work-authorising visa — check the official Migración Colombia before relying on any route.",
    localJobSites: ["Computrabajo", "Magneto", "Elempleo", "LinkedIn", "Indeed"],
  },
  peru: {
    localTerm: "currículum vitae (CV)",
    currency: "the Peruvian sol (PEN, S/)",
    searchContext:
      "In Peru a CV is a currículum vitae, usually just CV; the documented version is often called CV documentado. A free maker helps students, recent graduates, and applicants moving toward formal employment.",
    jobMarket:
      "Peru's economy is anchored by mining (copper, gold), fishing, agriculture and agro-exports, tourism, and commerce, with one of the highest informal-employment rates in the region.",
    cities: ["Lima", "Arequipa", "Trujillo", "Chiclayo", "Cusco", "Piura"],
    formatNotes: [
      "A CV is usually one to two pages and reverse-chronological.",
      "The DNI and date of birth are not mandatory in the header and take up useful space.",
      "A CV documentado, with supporting certificates attached, is requested for some roles.",
      "It is best to avoid decorative fonts and a redundant 'Curriculum Vitae' title.",
    ],
    workRouteNote:
      "Internationals typically work under a foreign-worker contract and corresponding immigration status — check the official Migraciones before relying on any route.",
    localJobSites: ["Bumeran", "Computrabajo", "Aptitus", "LinkedIn", "Indeed"],
  },
  ecuador: {
    localTerm: "hoja de vida",
    currency: "the US dollar (USD, $)",
    searchContext:
      "In Ecuador a CV is commonly called a hoja de vida (currículum vitae is also used). A free maker matters to students, recent graduates, and applicants moving toward formal employment.",
    jobMarket:
      "Ecuador's economy relies on oil, agriculture (bananas, shrimp, flowers, cacao), and commerce, with a large informal workforce; the US dollar is the official currency.",
    cities: ["Quito", "Guayaquil", "Cuenca", "Santo Domingo", "Ambato"],
    formatNotes: [
      "A hoja de vida is usually one to two pages and reverse-chronological.",
      "It conventionally includes more personal data than a UK or US CV — date of birth, nationality, the cédula or passport number, marital status, and a professional photo.",
      "A typical structure is datos personales, perfil, experiencia, formación, cursos, habilidades, and referencias.",
      "Public-sector applications often follow standardized formats.",
    ],
    workRouteNote:
      "Foreign workers generally need a work visa tied to an employer — check official Ecuadorian government sources before relying on any route.",
    localJobSites: ["Multitrabajos", "Computrabajo", "LinkedIn", "Indeed"],
  },
  bolivia: {
    localTerm: "hoja de vida",
    currency: "the Bolivian boliviano (BOB, Bs)",
    searchContext:
      "In Bolivia a CV is commonly called a hoja de vida (currículum vitae is also understood). A free maker matters to students, recent graduates, and applicants moving from informal work toward formal employment.",
    jobMarket:
      "Bolivia's economy is built on mining and natural gas, agriculture, and commerce, with one of the largest informal-sector shares in the region.",
    cities: ["La Paz", "Santa Cruz de la Sierra", "Cochabamba", "El Alto", "Sucre"],
    formatNotes: [
      "A hoja de vida averages one to two pages, the longer length only for 10-plus years of experience.",
      "It is reverse-chronological, with clear margins, bullets, and readable typography.",
      "Sections usually cover personal data, objective, experience, education, courses, and references.",
      "A recent professional photo is commonly included.",
      "The carnet de identidad (CI) number is often listed in personal data.",
    ],
    workRouteNote: null,
    localJobSites: ["Computrabajo", "Trabajopolis", "Multitrabajos", "LinkedIn"],
  },
  "costa-rica": {
    localTerm: "currículum vitae (CV)",
    currency: "the Costa Rican colón (CRC, ₡)",
    searchContext:
      "In Costa Rica a CV is a currículum vitae, commonly just CV. A free maker helps students, recent graduates, and applicants targeting the country's services, tourism, and multinational-services employers.",
    jobMarket:
      "Costa Rica's economy combines tourism, agriculture (coffee, bananas, pineapple), and a large base of multinational services, medical-device manufacturing, and business-process outsourcing.",
    cities: ["San José", "Heredia", "Alajuela", "Cartago", "Liberia"],
    formatNotes: [
      "A CV is usually one to two pages and reverse-chronological.",
      "The personal-data section commonly lists the cédula number and place of residence.",
      "It opens with a brief personal summary, then education and work experience.",
      "English proficiency is often highlighted, given the multinational job market.",
      "A cover letter is normally expected alongside the CV.",
    ],
    workRouteNote:
      "Internationals typically work via a residence or work permit through the Dirección General de Migración — check official sources before relying on any route.",
    localJobSites: ["Computrabajo", "Encuentra24", "elempleo", "LinkedIn", "Indeed"],
  },
  panama: {
    localTerm: "hoja de vida (currículum vitae)",
    currency: "the US dollar (USD, $), used alongside the balboa (PAB)",
    searchContext:
      "In Panama a CV is commonly called a hoja de vida or currículum vitae. A free maker helps students, recent graduates, and applicants targeting the country's banking, logistics, and services sectors.",
    jobMarket:
      "Panama's economy is service-driven, anchored by the Panama Canal and logistics, banking and finance, the Colón Free Zone, and construction, with the US dollar in everyday use.",
    cities: ["Panama City", "San Miguelito", "David", "Colón", "La Chorrera"],
    formatNotes: [
      "A CV is best kept to one page, since many employers screen with automated filters.",
      "It opens with a short professional profile or objective.",
      "Sensitive data such as the ID number, marital status, or a photo is left off unless the posting asks.",
      "Bilingual Spanish-English CVs are common in finance and multinational roles.",
    ],
    workRouteNote:
      "Internationals typically work via a work permit and corresponding immigration category — check official sources before relying on any route.",
    localJobSites: ["Konzerta", "Computrabajo", "Encuentra24", "LinkedIn"],
  },
  uruguay: {
    localTerm: "currículum vitae (CV)",
    currency: "the Uruguayan peso (UYU, $)",
    searchContext:
      "In Uruguay a CV is a currículum vitae, usually just CV. A free maker helps students, recent graduates, and career-changers applying across Montevideo's services and professional market.",
    jobMarket:
      "Uruguay's economy is service-oriented and relatively formalized, with strengths in agriculture and agribusiness (beef, soy, dairy), software and IT services, and tourism.",
    cities: ["Montevideo", "Salto", "Ciudad de la Costa", "Paysandú", "Las Piedras"],
    formatNotes: [
      "A CV is usually one to two pages and reverse-chronological.",
      "A photo is commonly included.",
      "Clean, readable fonts and standard margins are expected.",
      "It is usually in Spanish, though international roles may accept English.",
      "A cover letter is usually expected.",
    ],
    workRouteNote:
      "Internationals often work via a residence permit, including Mercosur residency for nationals of member states — check official sources before relying on any route.",
    localJobSites: ["Computrabajo", "Gallito", "Buscojobs", "LinkedIn"],
  },
  venezuela: {
    localTerm: "currículum vitae (CV)",
    currency: "the Venezuelan bolívar (VES, Bs)",
    searchContext:
      "In Venezuela a CV is a currículum vitae, often just CV (hoja de vida is also used). A free maker matters to students, recent graduates, and the many people preparing applications both locally and for work abroad.",
    jobMarket:
      "Venezuela's economy is dominated by the oil sector and has been shaped by prolonged crisis, high informality, and large-scale emigration, with commerce and services employing much of the remaining formal workforce.",
    cities: ["Caracas", "Maracaibo", "Valencia", "Barquisimeto", "Maracay"],
    formatNotes: [
      "A CV is usually one to two pages and reverse-chronological.",
      "A clean, classic design without heavy colour or graphics is preferred.",
      "It opens with a concise professional summary.",
      "It is written in Spanish, or in English for the increasingly globalized market.",
      "Many applicants also prepare CVs aimed at jobs in other countries.",
    ],
    workRouteNote: null,
    localJobSites: ["Computrabajo", "Bumeran", "Buscojobs", "LinkedIn"],
  },
  guatemala: {
    localTerm: "currículum vitae (CV)",
    currency: "the Guatemalan quetzal (GTQ, Q)",
    searchContext:
      "In Guatemala a CV is a currículum vitae, commonly just CV. A free maker matters to students, recent graduates, and applicants moving from informal work into formal commerce and services roles.",
    jobMarket:
      "Guatemala has Central America's largest economy, built on agriculture (coffee, sugar, bananas), textiles and apparel, commerce, and services, with a very large informal sector.",
    cities: ["Guatemala City", "Mixco", "Villa Nueva", "Quetzaltenango", "Escuintla"],
    formatNotes: [
      "A CV is written in Spanish and is usually one to two pages, commonly with a photo.",
      "Recruiters tend to prioritise work experience, so it is usually placed before education.",
      "The national ID (DPI) is often listed in personal data.",
      "References are frequently included at the end.",
    ],
    workRouteNote: null,
    localJobSites: ["Computrabajo", "Tecoloco", "LinkedIn", "OLX"],
  },
  "el-salvador": {
    localTerm: "currículum vitae (CV)",
    currency: "the US dollar (USD, $)",
    searchContext:
      "In El Salvador a CV is a currículum vitae, often just CV. A free maker helps students, recent graduates, and applicants targeting call centres, services, and manufacturing roles.",
    jobMarket:
      "El Salvador's economy is driven by services, remittances, light manufacturing and textiles (maquila), commerce, and a sizable call-centre and outsourcing sector, with significant informality.",
    cities: ["San Salvador", "Santa Ana", "San Miguel", "Soyapango", "Santa Tecla"],
    formatNotes: [
      "A CV is usually one to two pages and reverse-chronological.",
      "It is the first filter in most hiring, so it should be clear and concise.",
      "Careful spelling matters, as errors can decide a shortlist.",
      "It is usually in Spanish, with English used for some roles.",
      "Bilingual English-Spanish CVs are common for call-centre roles.",
    ],
    workRouteNote: null,
    localJobSites: ["Computrabajo", "Tecoloco", "LinkedIn", "OLX"],
  },
  paraguay: {
    localTerm: "currículum vitae (CV)",
    currency: "the Paraguayan guaraní (PYG, ₲)",
    searchContext:
      "In Paraguay a CV is a currículum vitae, often just CV (hoja de vida is also understood). A free maker matters to students, recent graduates, and applicants moving from informal work into formal jobs.",
    jobMarket:
      "Paraguay's economy is led by agriculture and agribusiness (soy, beef), hydroelectric energy, and commerce, with a large informal workforce.",
    cities: ["Asunción", "Ciudad del Este", "San Lorenzo", "Luque", "Encarnación"],
    formatNotes: [
      "A CV is concise, no more than two pages.",
      "A common order is contact, professional summary, experience, academic training, skills, and optional courses or languages.",
      "A professional photo is commonly included.",
      "Language skills (English, Portuguese, Guaraní) are valued and worth listing.",
    ],
    workRouteNote:
      "Internationals often work via a residence permit, including Mercosur residency for nationals of member states — check official sources before relying on any route.",
    localJobSites: ["Clasipar", "Computrabajo", "LinkedIn"],
  },
  honduras: {
    localTerm: "currículum vitae (CV)",
    currency: "the Honduran lempira (HNL, L)",
    searchContext:
      "In Honduras a CV is a currículum vitae, often just CV. A free maker helps students, recent graduates, and applicants targeting maquila, services, and call-centre employment.",
    jobMarket:
      "Honduras's economy relies on agriculture (coffee, bananas), textiles and apparel maquila, remittances, and a growing call-centre sector, with high informality.",
    cities: ["Tegucigalpa", "San Pedro Sula", "Choloma", "La Ceiba", "Comayagua"],
    formatNotes: [
      "A CV is usually one to two pages and reverse-chronological.",
      "Many employers use tracking systems, so clean fonts and a simple layout help.",
      "It is worth tailoring the CV to each offer.",
      "A photo is commonly included.",
      "Bilingual English-Spanish CVs are common for call-centre roles.",
    ],
    workRouteNote: null,
    localJobSites: ["Computrabajo", "Tecoloco", "Encuentra24", "LinkedIn"],
  },
  nicaragua: {
    localTerm: "currículum vitae (CV)",
    currency: "the Nicaraguan córdoba (NIO, C$)",
    searchContext:
      "In Nicaragua a CV is a currículum vitae, commonly just CV. A free maker matters to students, recent graduates, and applicants moving toward formal commerce and services jobs.",
    jobMarket:
      "Nicaragua's economy is based on agriculture (coffee, beef, sugar), textiles and apparel (maquila in free-trade zones), commerce, and remittances, with a large informal sector.",
    cities: ["Managua", "León", "Masaya", "Chinandega", "Granada"],
    formatNotes: [
      "A CV is usually one to two pages and reverse-chronological.",
      "It is common to include personal details such as marital status and a photo.",
      "The CV remains the first filter in most hiring.",
      "Word or PDF are both accepted.",
    ],
    workRouteNote: null,
    localJobSites: ["Computrabajo", "Tecoloco", "Encuentra24", "LinkedIn"],
  },
  belize: {
    localTerm: "CV (résumé is also used)",
    currency: "the Belize dollar (BZD, $), pegged to the US dollar at about two to one",
    searchContext:
      "Belize is English-speaking, so applicants use the term CV or résumé. A free maker helps the many people applying into tourism and government roles, and those preparing applications for work abroad.",
    jobMarket:
      "Belize's economy leans heavily on tourism and hospitality, agriculture (sugar, citrus, bananas), and a public sector that is a major employer, with a small private formal job market.",
    cities: ["Belize City", "Belmopan", "San Ignacio", "Orange Walk", "Dangriga"],
    formatNotes: [
      "A CV is typically one to two pages and reverse-chronological.",
      "Both UK and US conventions appear, given Belize's history and regional ties.",
      "English is the working language.",
      "References are commonly listed or offered on request.",
    ],
    workRouteNote:
      "Foreign nationals generally need a work permit issued by the Labour Department — check official sources before relying on any route.",
    localJobSites: ["the Government of Belize Public Service portal", "JobIsland.com", "Belize Job Hub", "CaribbeanJobs.com", "Indeed"],
  },
  guyana: {
    localTerm: "CV (résumé is also used)",
    currency: "the Guyanese dollar (GYD, $)",
    searchContext:
      "Guyana is English-speaking, so applicants use the term CV or résumé. A free maker is useful as the oil-driven economy expands and more people apply into newly created formal roles.",
    jobMarket:
      "Guyana's economy has grown rapidly on offshore oil and gas, alongside gold and bauxite mining, agriculture (rice, sugar), and a fast-growing construction and services sector.",
    cities: ["Georgetown", "Linden", "New Amsterdam", "Bartica"],
    formatNotes: [
      "A CV uses a reverse-chronological format with a short three-to-four-line professional summary.",
      "Clean, tracking-system-friendly layouts read better than creative designs.",
      "For oil-and-gas roles, safety certifications (such as OSHA) and field experience are worth highlighting.",
      "UK-style conventions are common, and a photo is not usually expected.",
    ],
    workRouteNote:
      "Foreign nationals generally need a work permit arranged through an employer — check official sources before relying on any route.",
    localJobSites: ["SkilledGuyanese.com", "Careers.gy", "Indeed", "LinkedIn", "Airswift (oil and gas)"],
  },
  suriname: {
    localTerm: "cv (in Dutch)",
    currency: "the Surinamese dollar (SRD, $)",
    searchContext:
      "Suriname's official language is Dutch, so a CV is simply a cv. A free maker is useful for applicants into the mining and oil sectors and for those preparing applications regionally, given the small formal market.",
    jobMarket:
      "Suriname's economy depends on mining (gold, bauxite) and a growing oil sector, alongside agriculture and a public sector that is a significant employer.",
    cities: ["Paramaribo", "Lelydorp", "Nieuw Nickerie", "Moengo"],
    formatNotes: [
      "A cv is usually written in Dutch, following Dutch conventions.",
      "It is typically one to two pages and reverse-chronological.",
      "Dutch proficiency is often required for the role itself.",
      "A photo is sometimes included, following European practice.",
    ],
    workRouteNote:
      "Foreign nationals generally need a work and residence authorization — check official sources before relying on any route.",
    localJobSites: ["Vacaturebank.sr", "Jobs.sr", "Werkstraat.com", "Vacatures.sr", "Indeed"],
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
