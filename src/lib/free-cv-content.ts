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
  france: {
    localTerm: "CV (curriculum vitæ)",
    currency: "the euro (EUR, €)",
    searchContext:
      "In France the document is the CV, and a free maker matters to students, recent graduates, and people changing fields who want a clean, correctly formatted document without paying for a template.",
    jobMarket:
      "France has a large, diversified economy spanning services, industry, technology, tourism, health, and engineering, with separate hiring tracks for executives (cadres) and other roles.",
    cities: ["Paris", "Lyon", "Marseille", "Toulouse", "Lille", "Bordeaux"],
    formatNotes: [
      "A French CV is on A4 and usually kept to one page, even for experienced candidates, and at most one and a half.",
      "A photo in the top corner is standard practice but optional, and increasingly left off in modern hiring.",
      "It is reverse-chronological with a short profile near the top.",
      "The lettre de motivation (cover letter) is typically a separate document.",
    ],
    workRouteNote:
      "Internationals commonly use the EU Blue Card or a talent-passport work permit — check official French government sources before relying on any route.",
    localJobSites: ["France Travail", "APEC", "Indeed", "LinkedIn"],
  },
  "united-kingdom": {
    localTerm: "CV",
    currency: "the pound sterling (GBP, £)",
    searchContext:
      "In the UK the document is the CV, and a free maker matters to students, graduates, and career-changers who want a clean two-page CV without paying for a builder.",
    jobMarket:
      "The UK has a services-led economy, with strong hiring in finance, technology, healthcare (the NHS), creative industries, and professional services.",
    cities: ["London", "Manchester", "Birmingham", "Leeds", "Glasgow", "Bristol"],
    formatNotes: [
      "A UK CV typically runs to two pages, fuller than the US one-page norm.",
      "No photo, date of birth, or marital status is included, in line with the Equality Act 2010.",
      "It opens with a tailored personal statement, then reverse-chronological experience.",
      "Word (.docx) uploads tend to parse cleanly on the big job boards.",
    ],
    workRouteNote:
      "The Skilled Worker visa is the main route and requires a licensed sponsor — check the official GOV.UK guidance before relying on any route.",
    localJobSites: ["Reed", "TotalJobs", "Indeed", "CV-Library", "LinkedIn"],
  },
  italy: {
    localTerm: "curriculum vitae (CV)",
    currency: "the euro (EUR, €)",
    searchContext:
      "In Italy the document is the curriculum vitae, and a free maker matters to students, graduates, and career-changers who want a tidy CV without paying for one.",
    jobMarket:
      "Italy's economy spans manufacturing, fashion and design, tourism, agriculture and food, and services, with a strong contrast between the industrial north and the south.",
    cities: ["Rome", "Milan", "Naples", "Turin", "Florence", "Bologna"],
    formatNotes: [
      "A CV runs one to two pages; the Europass template is common for public-sector and EU-funded roles.",
      "Milan startups and international firms tend to prefer a cleaner, modern layout over Europass.",
      "A photo, date of birth, and place of birth are commonly included.",
      "A data-processing consent clause (GDPR) at the bottom is expected, and many HR teams require it.",
    ],
    workRouteNote:
      "Internationals commonly use the EU Blue Card or a work permit under the annual Decreto Flussi quota — check official Italian government sources before relying on any route.",
    localJobSites: ["Indeed", "LinkedIn", "Monster", "the public employment centres (Centri per l'Impiego)"],
  },
  spain: {
    localTerm: "currículum vitae (CV)",
    currency: "the euro (EUR, €)",
    searchContext:
      "In Spain the document is the currículum vitae, and a free maker matters to students, graduates, and the many applicants in a competitive market with high youth unemployment.",
    jobMarket:
      "Spain's economy is led by services and tourism, manufacturing, agriculture, and a growing technology scene, with notably high youth unemployment.",
    cities: ["Madrid", "Barcelona", "Valencia", "Seville", "Bilbao", "Málaga"],
    formatNotes: [
      "A CV is usually one to two pages and reverse-chronological.",
      "A photo is not legally required but is culturally expected, and most recruiters still prefer one.",
      "A short professional profile at the top is common.",
      "It is written in Spanish unless the role is international.",
    ],
    workRouteNote:
      "Internationals commonly use the EU Blue Card or a national work authorisation — check official Spanish government sources before relying on any route.",
    localJobSites: ["InfoJobs", "Infoempleo", "LinkedIn", "Indeed"],
  },
  netherlands: {
    localTerm: "cv",
    currency: "the euro (EUR, €)",
    searchContext:
      "In the Netherlands the document is simply a cv, and a free maker matters to students, graduates, and internationals applying into a heavily English-speaking job market.",
    jobMarket:
      "The Netherlands has an open, trade-oriented economy — logistics, agriculture and horticulture, technology, finance, and a large international-business sector, with English common in many workplaces.",
    cities: ["Amsterdam", "Rotterdam", "The Hague", "Utrecht", "Eindhoven"],
    formatNotes: [
      "A Dutch cv is on A4 and runs one to two pages.",
      "A photo is optional and increasingly omitted, especially in tech and at GDPR-conscious employers.",
      "Some client-facing sectors still expect a photo.",
      "The style is factual and concise, in reverse-chronological order.",
    ],
    workRouteNote:
      "Internationals commonly use the Highly Skilled Migrant scheme or EU Blue Card via a recognised sponsor — check the official IND before relying on any route.",
    localJobSites: ["Indeed", "Nationale Vacaturebank", "LinkedIn"],
  },
  switzerland: {
    localTerm: "CV (Lebenslauf in German, CV in French)",
    currency: "the Swiss franc (CHF)",
    searchContext:
      "In Switzerland the document is a CV (or Lebenslauf), and a free maker matters to students, graduates, and internationals navigating a detailed, dossier-based application culture.",
    jobMarket:
      "Switzerland is a high-wage economy with strengths in banking and finance, pharmaceuticals and life sciences, machinery, watchmaking, and IT, across German-, French-, and Italian-speaking regions.",
    cities: ["Zurich", "Geneva", "Basel", "Bern", "Lausanne"],
    formatNotes: [
      "A CV is on A4 and runs one to two pages, with a clean layout and no heavy graphics.",
      "A professional photo is strongly expected.",
      "It commonly states work-permit type (B, C, G, or L), date of birth, nationality, and language levels with CEFR ratings.",
      "Applications are usually a full dossier including the cover letter, diplomas, and employment certificates (Arbeitszeugnisse).",
    ],
    workRouteNote:
      "Non-EU/EFTA nationals face quota-based permits arranged by the employer — check official Swiss government sources before relying on any route.",
    localJobSites: ["jobs.ch", "jobup.ch", "LinkedIn", "Indeed"],
  },
  ireland: {
    localTerm: "CV",
    currency: "the euro (EUR, €)",
    searchContext:
      "In Ireland the document is the CV, and a free maker matters to students, graduates, and internationals applying into a market full of multinational employers.",
    jobMarket:
      "Ireland hosts many multinational technology and pharmaceutical employers, plus finance, healthcare, and agri-food, with strong demand in Dublin's tech and professional-services sector.",
    cities: ["Dublin", "Cork", "Galway", "Limerick", "Waterford"],
    formatNotes: [
      "A concise two-page CV is the standard, though a strong one page works for early-career applicants.",
      "No photo is used for most professional roles, following British and EU norms.",
      "It opens with a short profile, then reverse-chronological experience.",
      "Page two should add real evidence rather than filler.",
    ],
    workRouteNote:
      "Internationals commonly use the Critical Skills or General Employment Permit — check the official Irish government (DETE) guidance before relying on any route.",
    localJobSites: ["IrishJobs.ie", "Jobs.ie", "Indeed.ie", "LinkedIn", "Recruit Ireland"],
  },
  austria: {
    localTerm: "Lebenslauf (CV)",
    currency: "the euro (EUR, €)",
    searchContext:
      "In Austria the document is a Lebenslauf, and a free maker matters to students, graduates, and people arriving from abroad who want a correctly formatted CV.",
    jobMarket:
      "Austria's economy is led by services, tourism, manufacturing, and a strong skilled-trades sector; German is important for most roles.",
    cities: ["Vienna", "Graz", "Linz", "Salzburg", "Innsbruck"],
    formatNotes: [
      "Two pages is standard, one for junior roles and three only for senior or academic profiles.",
      "A professional photo (Lichtbild) at the top is standard, around 4 x 5 cm.",
      "Personal details usually include date of birth and nationality.",
      "Languages are listed with CEFR levels, with German especially valued.",
    ],
    workRouteNote:
      "The Red-White-Red Card is the main skilled-worker route — check official Austrian government sources before relying on any route.",
    localJobSites: ["karriere.at", "StepStone", "LinkedIn", "Indeed"],
  },
  belgium: {
    localTerm: "CV",
    currency: "the euro (EUR, €)",
    searchContext:
      "In Belgium the document is the CV, and a free maker matters to students, graduates, and internationals navigating a trilingual job market.",
    jobMarket:
      "Belgium's economy spans services, the EU institutions, logistics (the port of Antwerp), chemicals, and finance, across a multilingual labour market.",
    cities: ["Brussels", "Antwerp", "Ghent", "Charleroi", "Liège"],
    formatNotes: [
      "The CV language follows the region — Dutch in Flanders, French in Wallonia, French and/or Dutch (often English) in Brussels.",
      "The Europass format is common, and the CV is usually up to two pages.",
      "Languages should always be listed with fluency levels.",
      "It is reverse-chronological with relevant experience emphasised.",
    ],
    workRouteNote:
      "Internationals commonly use the single permit (work and residence) or the EU Blue Card — check the relevant regional authority and official sources before relying on any route.",
    localJobSites: ["VDAB", "Le Forem", "Actiris", "StepStone", "Indeed", "LinkedIn"],
  },
  portugal: {
    localTerm: "currículo (CV)",
    currency: "the euro (EUR, €)",
    searchContext:
      "In Portugal the document is a currículo, and a free maker matters to students, graduates, and the many people preparing applications both locally and abroad.",
    jobMarket:
      "Portugal's economy is led by services and tourism, manufacturing, and a growing tech and startup scene in Lisbon and Porto, alongside significant outward and return migration.",
    cities: ["Lisbon", "Porto", "Braga", "Coimbra", "Faro"],
    formatNotes: [
      "The Europass model is widely valued.",
      "A currículo runs one to two pages and is reverse-chronological.",
      "A photo is commonly included, following southern-European practice.",
      "Languages and their levels are worth listing.",
    ],
    workRouteNote:
      "Internationals commonly use an EU Blue Card or a national work visa / residence permit — check official Portuguese (AIMA) sources before relying on any route.",
    localJobSites: ["Net-Empregos", "SAPO Emprego", "the IEFP portal", "Indeed", "LinkedIn"],
  },
  greece: {
    localTerm: "CV (βιογραφικό)",
    currency: "the euro (EUR, €)",
    searchContext:
      "In Greece the document is a βιογραφικό (CV), and a free maker matters to students, graduates, and applicants in a market with high youth unemployment.",
    jobMarket:
      "Greece's economy rests on tourism and shipping, alongside agriculture, food, and a recovering services sector; youth unemployment has been high.",
    cities: ["Athens", "Thessaloniki", "Patras", "Heraklion", "Larissa"],
    formatNotes: [
      "A CV runs one to two pages and is reverse-chronological.",
      "The Europass format is common.",
      "A photo is often included, following southern-European practice.",
      "Languages are worth listing with levels.",
    ],
    workRouteNote:
      "Internationals commonly use an EU Blue Card or a national work permit — check official Greek government sources before relying on any route.",
    localJobSites: ["Skywalker.gr", "Kariera.gr", "LinkedIn", "Indeed"],
  },
  luxembourg: {
    localTerm: "CV",
    currency: "the euro (EUR, €)",
    searchContext:
      "In Luxembourg the document is the CV, and a free maker matters to the heavily cross-border, multilingual workforce applying into finance, law, and IT.",
    jobMarket:
      "Luxembourg is a finance and EU-institutions hub with a heavily cross-border, multilingual workforce; demand is strong in finance, law, IT, and audit.",
    cities: ["Luxembourg City", "Esch-sur-Alzette", "Differdange"],
    formatNotes: [
      "Tailor the CV to the language of the posting — official languages are Luxembourgish, German, and French, with English common in finance.",
      "List all languages and their levels, since this is decisive in a multilingual market.",
      "Keywords matter, as employers use automatic search software.",
      "Keep it clear and targeted to the role.",
    ],
    workRouteNote:
      "Internationals commonly use an EU Blue Card or a salaried-worker authorisation — check official Luxembourg (ADEM / Guichet.lu) sources before relying on any route.",
    localJobSites: ["Moovijob", "jobs.lu", "ADEM", "Monster.lu", "LinkedIn"],
  },
  malta: {
    localTerm: "CV",
    currency: "the euro (EUR, €)",
    searchContext:
      "In Malta the document is the CV, and a free maker matters to students, graduates, and the many internationals working in iGaming, finance, and tourism.",
    jobMarket:
      "Malta's hiring is driven by iGaming, financial services, tourism and hospitality, IT, and maritime services.",
    cities: ["Valletta", "Sliema", "St. Julian's", "Birkirkara", "Mosta"],
    formatNotes: [
      "A Maltese CV is reverse-chronological.",
      "English is essential, while Maltese helps for government or customer-facing roles and Italian or German can help in tourism.",
      "Using keywords from the posting helps.",
      "It is best to focus on relevant achievements rather than a full career history.",
    ],
    workRouteNote:
      "Non-EU nationals generally need a single permit (work and residence) — check official Maltese (Identità / Jobsplus) sources before relying on any route.",
    localJobSites: ["Jobsplus", "Keepmeposted", "jobsinmalta.com", "Indeed", "LinkedIn"],
  },
  cyprus: {
    localTerm: "CV (βιογραφικό)",
    currency: "the euro (EUR, €)",
    searchContext:
      "In Cyprus the document is a CV, and a free maker matters to students, graduates, and internationals applying into a competitive, services-led market.",
    jobMarket:
      "Cyprus has a services-led economy — tourism, shipping, financial and professional services, and a growing technology sector — concentrated around Nicosia and Limassol.",
    cities: ["Nicosia", "Limassol", "Larnaca", "Paphos", "Famagusta"],
    formatNotes: [
      "A CV runs one to two pages and is reverse-chronological.",
      "Greek and English are both commonly accepted.",
      "A detail-oriented, tailored CV is valued by local recruiters.",
      "Languages are worth listing with levels.",
    ],
    workRouteNote:
      "Non-EU nationals commonly use an EU Blue Card or a national work permit — check official Cypriot government sources before relying on any route.",
    localJobSites: ["Ergodotisi", "Carierista", "Golden Careers", "LinkedIn", "Indeed"],
  },
  andorra: {
    localTerm: "CV (currículum)",
    currency: "the euro (EUR, €)",
    searchContext:
      "In Andorra the document is a CV, and a free maker matters to seasonal and year-round workers in a small, tourism-driven market.",
    jobMarket:
      "Andorra has a small economy built on tourism (especially the ski season), retail, and construction, with many seasonal roles and hospitality in high demand.",
    cities: ["Andorra la Vella", "Escaldes-Engordany", "Encamp", "Sant Julià de Lòria"],
    formatNotes: [
      "The CV is usually in Catalan (the official language), Spanish, or French, depending on the sector.",
      "It is reverse-chronological.",
      "Recommendation letters are sometimes added.",
      "Languages are worth listing, since the market is multilingual.",
    ],
    workRouteNote:
      "A work and residence permit is required, often tied to a seasonal or annual quota — check official Andorran government sources before relying on any route.",
    localJobSites: ["the government Treball portal (treball.ad)", "Buscofeina", "Indeed", "LinkedIn"],
  },
  liechtenstein: {
    localTerm: "Lebenslauf (CV)",
    currency: "the Swiss franc (CHF)",
    searchContext:
      "In Liechtenstein the document is a Lebenslauf, and a free maker matters to the many cross-border workers applying into finance and precision manufacturing.",
    jobMarket:
      "Liechtenstein is a wealthy economy with more jobs than residents — a strong banking and financial sector, precision manufacturing, and services — with many workers commuting from Switzerland and Austria.",
    cities: ["Vaduz", "Schaan", "Triesen", "Balzers"],
    formatNotes: [
      "German is the official language and expected for most roles.",
      "A structured CV with a cover letter is standard.",
      "Clean, readable fonts are preferred.",
      "Languages and qualifications are worth listing clearly.",
    ],
    workRouteNote:
      "Non-EEA and non-Swiss nationals need a work permit, which is quota-limited — check official Liechtenstein sources before relying on any route.",
    localJobSites: ["Indeed", "LinkedIn", "the national administration jobs portal (llv.li)"],
  },
  "san-marino": {
    localTerm: "curriculum vitae (CV)",
    currency: "the euro (EUR, €)",
    searchContext:
      "In San Marino the document is the curriculum vitae, and a free maker matters to workers in a small economy closely tied to the surrounding Italian region.",
    jobMarket:
      "San Marino has a small economy based on tourism, finance, manufacturing, and retail, closely tied to the surrounding Italian region.",
    cities: ["City of San Marino", "Borgo Maggiore", "Serravalle", "Dogana"],
    formatNotes: [
      "A CV is usually written in Italian, with English for some roles.",
      "It runs one to two pages and is reverse-chronological.",
      "Following Italian conventions, a photo and personal details are commonly included.",
      "Languages are worth listing.",
    ],
    workRouteNote:
      "A work permit is required for non-residents — check official San Marino government sources before relying on any route.",
    localJobSites: ["Indeed", "Jooble", "LinkedIn"],
  },
  sweden: {
    localTerm: "CV",
    currency: "the Swedish krona (SEK, kr)",
    searchContext:
      "In Sweden the document is the CV, and a free maker matters to students, graduates, and internationals applying into a heavily English-speaking tech and engineering market.",
    jobMarket:
      "Sweden's economy is strong in technology and startups, manufacturing and engineering, life sciences, and a large public sector, with widespread English in many workplaces.",
    cities: ["Stockholm", "Gothenburg", "Malmö", "Uppsala", "Linköping"],
    formatNotes: [
      "A concise one-page A4 CV is the aim, though this is flexible by role.",
      "The personnummer (personal ID number) is left off the CV and shared later if needed.",
      "The style is clean and factual, in reverse-chronological order.",
      "Skills and quantified results read better than long descriptions.",
    ],
    workRouteNote:
      "Non-EU nationals need a work permit tied to a job offer — check the official Swedish Migration Agency (Migrationsverket) before relying on any route.",
    localJobSites: ["Platsbanken (Arbetsförmedlingen)", "Indeed", "LinkedIn", "Blocket Jobb"],
  },
  denmark: {
    localTerm: "CV",
    currency: "the Danish krone (DKK, kr)",
    searchContext:
      "In Denmark the document is the CV, and a free maker matters to students, graduates, and internationals applying into life sciences, shipping, and tech.",
    jobMarket:
      "Denmark is strong in life sciences and pharma, shipping and logistics, renewable energy, IT, and design, with many international roles around Copenhagen.",
    cities: ["Copenhagen", "Aarhus", "Odense", "Aalborg", "Esbjerg"],
    formatNotes: [
      "A Danish CV focuses on projects and results, not just titles and degrees.",
      "It runs one to two pages.",
      "A photo can be included, though some major platforms hide it from recruiters.",
      "The style is concise and factual, in reverse-chronological order.",
    ],
    workRouteNote:
      "Skilled workers commonly use the Pay Limit or Positive List schemes — check the official Workindenmark / SIRI sources before relying on any route.",
    localJobSites: ["Jobindex", "JobNet", "Workindenmark", "LinkedIn", "Indeed"],
  },
  norway: {
    localTerm: "CV",
    currency: "the Norwegian krone (NOK, kr)",
    searchContext:
      "In Norway the document is the CV, and a free maker matters to students, graduates, and internationals applying into a high-wage market.",
    jobMarket:
      "Norway's economy is built on oil and gas, maritime, seafood, renewable energy, and a large public sector, with high wages and strong work-life balance.",
    cities: ["Oslo", "Bergen", "Trondheim", "Stavanger", "Drammen"],
    formatNotes: [
      "A CV runs one to two pages and is concise and direct.",
      "It is normal to include date of birth and nationality, and a professional photo is common though not mandatory.",
      "Norwegian culture values honesty, so it is best to avoid embellishment.",
      "A short interests section is common.",
    ],
    workRouteNote:
      "Non-EU/EEA nationals need a skilled-worker residence permit — check the official UDI (Norwegian Directorate of Immigration) before relying on any route.",
    localJobSites: ["Finn.no", "NAV Arbeidsplassen", "Jobbnorge", "LinkedIn", "Indeed"],
  },
  finland: {
    localTerm: "CV",
    currency: "the euro (EUR, €)",
    searchContext:
      "In Finland the document is the CV, and a free maker matters to students, graduates, and internationals applying into technology and engineering roles.",
    jobMarket:
      "Finland is strong in technology and gaming, forestry and paper, engineering, and a large public sector, with English common in tech.",
    cities: ["Helsinki", "Espoo", "Tampere", "Vantaa", "Oulu"],
    formatNotes: [
      "A CV is no more than two pages and easy to read.",
      "It is reverse-chronological, covering employment, education, computer, and language skills.",
      "Quantified achievements read better than vague descriptions.",
      "Finnish workplaces value teamwork, so framing wins as collective efforts helps.",
    ],
    workRouteNote:
      "Non-EU nationals need a residence permit for an employed person — check the official Finnish Immigration Service (Migri) before relying on any route.",
    localJobSites: ["Duunitori", "the public employment service (Työmarkkinatori)", "Oikotie", "LinkedIn", "Indeed"],
  },
  iceland: {
    localTerm: "CV (ferilskrá)",
    currency: "the Icelandic króna (ISK, kr)",
    searchContext:
      "In Iceland the document is the CV, and a free maker matters to students, graduates, and internationals applying into tourism, fisheries, and tech.",
    jobMarket:
      "Iceland's economy is led by tourism, fisheries and seafood, renewable energy, aluminium, and a growing tech sector, with many companies operating in English.",
    cities: ["Reykjavík", "Kópavogur", "Hafnarfjörður", "Akureyri"],
    formatNotes: [
      "Icelandic employers prefer brevity — both the CV and cover letter are often kept to one page each.",
      "A small photo is common and seen as professional.",
      "References are frequently checked, so up-to-date contacts help.",
      "English is widely used, though interest in Icelandic is appreciated.",
    ],
    workRouteNote:
      "Non-EEA nationals need a work permit tied to a job — check the official Directorate of Immigration (Útlendingastofnun) before relying on any route.",
    localJobSites: ["Alfred.is", "Job.is", "Tvinna (creative and tech roles)", "LinkedIn", "Indeed"],
  },
  "faroe-islands": {
    localTerm: "CV",
    currency: "the Faroese króna, used at par with the Danish krone (DKK)",
    searchContext:
      "In the Faroe Islands the document is the CV, and a free maker matters in a small market where many roles are tied to fisheries, shipping, and the public sector.",
    jobMarket:
      "The Faroese economy is dominated by fisheries and salmon farming, alongside shipping, public services, and a small but growing tech and tourism sector.",
    cities: ["Tórshavn", "Klaksvík", "Runavík", "Tvøroyri"],
    formatNotes: [
      "A concise, factual CV in line with Nordic norms is expected.",
      "Faroese or Danish is usual, with English accepted in some roles.",
      "It runs one to two pages, in reverse-chronological order.",
      "References are commonly checked.",
    ],
    workRouteNote:
      "Nordic citizens can work freely; others, including EU citizens, need a work and residence permit — check official Faroese sources before relying on any route.",
    localJobSites: ["starv.fo (ALS)", "JobIsland.com", "EURAXESS (research roles)", "Indeed"],
  },
  poland: {
    localTerm: "CV",
    currency: "the Polish złoty (PLN, zł)",
    searchContext:
      "In Poland the document is the CV, and a free maker matters to students, graduates, and the many people applying into IT, shared-services, and manufacturing roles.",
    jobMarket:
      "Poland has a large EU economy with major IT and shared-services centres, manufacturing, logistics, and a big outsourcing sector.",
    cities: ["Warsaw", "Kraków", "Wrocław", "Poznań", "Gdańsk", "Łódź"],
    formatNotes: [
      "The top lists name, contact, city (no full address), and a LinkedIn link.",
      "A photo in the top-right is widely expected (about 3 x 4 cm), though not legally required.",
      "The RODO (GDPR) data-processing consent clause at the bottom is effectively mandatory — employers cannot process a CV without it.",
      "It is reverse-chronological.",
    ],
    workRouteNote:
      "Non-EU nationals generally need a work permit and national (D) visa — check official Polish government sources before relying on any route.",
    localJobSites: ["Pracuj.pl", "OLX Praca", "LinkedIn", "Indeed"],
  },
  russia: {
    localTerm: "résumé (резюме)",
    currency: "the Russian rouble (RUB, ₽)",
    searchContext:
      "In Russia the document is a résumé (резюме), and a free maker matters to students, graduates, and workers in a large, largely Russian-language market.",
    jobMarket:
      "Russia's economy spans energy, manufacturing, IT, and services, with a hiring market that is largely domestic and Russian-language.",
    cities: ["Moscow", "Saint Petersburg", "Novosibirsk", "Yekaterinburg", "Kazan"],
    formatNotes: [
      "A résumé is usually detailed and written in Russian, with English for international firms.",
      "A photo and date of birth are commonly included.",
      "It uses a clear, concise structure with skills and experience.",
      "References are sometimes expected.",
    ],
    workRouteNote:
      "Internationals usually need a work permit or Highly Qualified Specialist (HQS) permit arranged by the employer — check official Russian sources before relying on any route.",
    localJobSites: ["hh.ru (HeadHunter)", "SuperJob", "Avito Rabota", "Rabota.ru"],
  },
  ukraine: {
    localTerm: "CV (резюме)",
    currency: "the Ukrainian hryvnia (UAH, ₴)",
    searchContext:
      "In Ukraine the document is a CV (резюме), and a free maker matters to students, graduates, and the large IT and remote-work workforce.",
    jobMarket:
      "Ukraine's economy is strong in IT and software outsourcing, agriculture, and services; the war has reshaped the market, with significant remote and diaspora work.",
    cities: ["Kyiv", "Kharkiv", "Lviv", "Dnipro", "Odesa"],
    formatNotes: [
      "Europass is recognised, but employers expect a detailed two-to-three-page document.",
      "A professional, passport-style photo is standard.",
      "It is typically written in the past tense.",
      "Measurable, quantifiable results are emphasised.",
    ],
    workRouteNote:
      "Internationals generally need a work permit arranged by the employer — check official Ukrainian sources before relying on any route.",
    localJobSites: ["Work.ua", "Robota.ua", "Djinni (IT roles)", "LinkedIn"],
  },
  "czech-republic": {
    localTerm: "CV (životopis)",
    currency: "the Czech koruna (CZK, Kč)",
    searchContext:
      "In the Czech Republic the document is a CV (životopis), and a free maker matters to students, graduates, and internationals applying into manufacturing, IT, and services.",
    jobMarket:
      "The Czech economy is strong in manufacturing (automotive), IT and shared services, engineering, and tourism, with low unemployment.",
    cities: ["Prague", "Brno", "Ostrava", "Plzeň", "Olomouc"],
    formatNotes: [
      "A clear, predictable structure helps recruiters and tracking systems scan quickly.",
      "Personal information often includes date of birth, a photo, and nationality.",
      "A three-to-five-sentence professional summary follows the personal details.",
      "A Language Skills section with proficiency levels is expected; the CV is reverse-chronological.",
    ],
    workRouteNote:
      "Non-EU nationals generally need an Employee Card or EU Blue Card — check official Czech sources before relying on any route.",
    localJobSites: ["Jobs.cz", "Prace.cz", "Profesia.cz", "LinkedIn", "Indeed"],
  },
  romania: {
    localTerm: "CV",
    currency: "the Romanian leu (RON)",
    searchContext:
      "In Romania the document is the CV, and a free maker matters to students, graduates, and the large IT and outsourcing workforce.",
    jobMarket:
      "Romania's economy is strong in IT and outsourcing, automotive manufacturing, agriculture, and services, with a notable tech sector in Bucharest, Cluj-Napoca, and Timișoara.",
    cities: ["Bucharest", "Cluj-Napoca", "Timișoara", "Iași", "Constanța"],
    formatNotes: [
      "Europass is expected for entry-level and public-sector roles.",
      "Many private recruiters find Europass dated and prefer a cleaner, mobile-friendly layout.",
      "A CV runs one to two pages and is reverse-chronological.",
      "Languages are worth listing with levels.",
    ],
    workRouteNote:
      "Non-EU nationals generally need a work permit and long-stay visa — check official Romanian (IGI) sources before relying on any route.",
    localJobSites: ["eJobs", "BestJobs", "OLX Locuri de Muncă", "LinkedIn", "Indeed"],
  },
  hungary: {
    localTerm: "CV (önéletrajz)",
    currency: "the Hungarian forint (HUF, Ft)",
    searchContext:
      "In Hungary the document is a CV (önéletrajz), and a free maker matters to students, graduates, and internationals applying into manufacturing and shared-services roles.",
    jobMarket:
      "Hungary's economy is led by automotive and manufacturing, shared-services centres, IT, and tourism, with many international firms around Budapest.",
    cities: ["Budapest", "Debrecen", "Szeged", "Miskolc", "Győr"],
    formatNotes: [
      "A CV is no more than two pages.",
      "Most HR specialists expect a photo and may find its absence odd.",
      "Nationality and work-permit status are worth including where relevant.",
      "Language skills are valued, and modest, error-free phrasing matters.",
    ],
    workRouteNote:
      "Non-EU nationals generally need a work / residence permit (or EU Blue Card) — check official Hungarian sources before relying on any route.",
    localJobSites: ["Profession.hu", "CVonline.hu", "LinkedIn", "Indeed"],
  },
  bulgaria: {
    localTerm: "CV",
    currency: "the euro (EUR, €), which replaced the Bulgarian lev on 1 January 2026",
    searchContext:
      "In Bulgaria the document is the CV, and a free maker matters to students, graduates, and the growing IT and outsourcing workforce.",
    jobMarket:
      "Bulgaria's economy is strong in IT and outsourcing, manufacturing, tourism, and agriculture, with a growing tech sector in Sofia and Plovdiv.",
    cities: ["Sofia", "Plovdiv", "Varna", "Burgas", "Ruse"],
    formatNotes: [
      "The Europass format is recommended and commonly expected.",
      "A brief cover letter is usually requested alongside the CV.",
      "A CV runs one to two pages and is reverse-chronological.",
      "Languages are worth listing with levels.",
    ],
    workRouteNote:
      "Non-EU nationals generally need a work / single permit (or EU Blue Card) — check official Bulgarian sources before relying on any route.",
    localJobSites: ["jobs.bg", "zaplata.bg", "JobTiger", "LinkedIn", "Indeed"],
  },
  croatia: {
    localTerm: "CV (životopis)",
    currency: "the euro (EUR, €)",
    searchContext:
      "In Croatia the document is a CV (životopis), and a free maker matters to students, graduates, and the many workers in a tourism-heavy economy.",
    jobMarket:
      "Croatia's economy leans on tourism as a major pillar, alongside shipbuilding, manufacturing, IT, and agriculture.",
    cities: ["Zagreb", "Split", "Rijeka", "Osijek", "Zadar"],
    formatNotes: [
      "The Europass format is commonly used.",
      "A CV runs one to two pages and is reverse-chronological.",
      "A photo is often included, following regional practice.",
      "Languages are worth listing with levels.",
    ],
    workRouteNote:
      "Non-EU nationals generally need a residence and work permit — check official Croatian sources before relying on any route.",
    localJobSites: ["MojPosao", "Posao.hr", "LinkedIn", "Indeed"],
  },
  slovakia: {
    localTerm: "CV (životopis)",
    currency: "the euro (EUR, €)",
    searchContext:
      "In Slovakia the document is a CV (životopis), and a free maker matters to students, graduates, and internationals applying into manufacturing and shared-services roles.",
    jobMarket:
      "Slovakia is a major automotive manufacturer (one of the largest car producers per capita), with strengths also in electronics, IT, and shared services.",
    cities: ["Bratislava", "Košice", "Žilina", "Nitra", "Prešov"],
    formatNotes: [
      "The Europass or Profesia CV template is commonly used.",
      "A brief, one-page cover letter usually accompanies the CV.",
      "It is reverse-chronological.",
      "Languages are worth listing with levels.",
    ],
    workRouteNote:
      "Non-EU nationals generally need a single permit or EU Blue Card — check official Slovak sources before relying on any route.",
    localJobSites: ["Profesia.sk", "LinkedIn", "Indeed"],
  },
  slovenia: {
    localTerm: "CV (življenjepis)",
    currency: "the euro (EUR, €)",
    searchContext:
      "In Slovenia the document is a CV (življenjepis), and a free maker matters to students, graduates, and internationals applying into manufacturing, pharma, and IT.",
    jobMarket:
      "Slovenia's economy is strong in manufacturing, automotive components, pharmaceuticals, IT, and tourism.",
    cities: ["Ljubljana", "Maribor", "Celje", "Kranj", "Koper"],
    formatNotes: [
      "The Europass format is commonly used.",
      "Applications are usually in Slovenian, with some employers open to English, German, or Italian.",
      "A CV plus cover letter is expected.",
      "It is reverse-chronological.",
    ],
    workRouteNote:
      "Non-EU nationals generally need a single residence-and-work permit or EU Blue Card — check official Slovenian sources before relying on any route.",
    localJobSites: ["MojeDelo", "the public employment service (ZRSZ)", "LinkedIn", "Indeed"],
  },
  estonia: {
    localTerm: "CV",
    currency: "the euro (EUR, €)",
    searchContext:
      "In Estonia the document is the CV, and a free maker matters to students, graduates, and internationals applying into a digital-first tech economy.",
    jobMarket:
      "Estonia has a digital-first economy with a strong tech and startup sector (e-Estonia), plus manufacturing, logistics, and services.",
    cities: ["Tallinn", "Tartu", "Narva", "Pärnu"],
    formatNotes: [
      "Estonian CVs value efficiency, clarity, and directness.",
      "A professional headshot is common and often expected, unlike in the UK or US.",
      "Apply in the language of the advertisement.",
      "List languages (Estonian, English, Russian); the CV is reverse-chronological.",
    ],
    workRouteNote:
      "Non-EU nationals generally need a work-eligible residence permit or EU Blue Card — check official Estonian sources before relying on any route.",
    localJobSites: ["CV Keskus", "CV.ee", "the public employment fund (Töötukassa)", "LinkedIn"],
  },
  lithuania: {
    localTerm: "CV",
    currency: "the euro (EUR, €)",
    searchContext:
      "In Lithuania the document is the CV, and a free maker matters to students, graduates, and internationals applying into fintech and shared-services roles.",
    jobMarket:
      "Lithuania's economy is strong in fintech and shared services, manufacturing, logistics, and a growing tech sector in Vilnius and Kaunas.",
    cities: ["Vilnius", "Kaunas", "Klaipėda", "Šiauliai", "Panevėžys"],
    formatNotes: [
      "Europass is widely accepted, and the CV runs up to two pages.",
      "A photo is optional.",
      "A separate language-skills section is valued.",
      "English suits international firms and Lithuanian local employers; the CV is reverse-chronological.",
    ],
    workRouteNote:
      "Non-EU nationals generally need a work permit or EU Blue Card — check official Lithuanian sources before relying on any route.",
    localJobSites: ["CVbankas", "CV-Online (cvonline.lt)", "CVmarket", "LinkedIn"],
  },
  latvia: {
    localTerm: "CV",
    currency: "the euro (EUR, €)",
    searchContext:
      "In Latvia the document is the CV, and a free maker matters to students, graduates, and internationals applying into services, logistics, and IT around Riga.",
    jobMarket:
      "Latvia's economy is led by services, logistics and transit, manufacturing, IT, and finance, centred on Riga.",
    cities: ["Riga", "Daugavpils", "Liepāja", "Jelgava", "Jūrmala"],
    formatNotes: [
      "Adapt the CV to Latvian and European (Europass) norms.",
      "It runs up to two pages and is reverse-chronological.",
      "List languages (Latvian, Russian, English).",
      "A photo is commonly included, following regional practice.",
    ],
    workRouteNote:
      "Non-EU nationals generally need a work-eligible residence permit or EU Blue Card — check official Latvian (NVA / OCMA) sources before relying on any route.",
    localJobSites: ["CV.lv (CV-Online)", "VisiDarbi.lv", "the State Employment Agency (NVA)", "LinkedIn"],
  },
  serbia: {
    localTerm: "CV (biografija)",
    currency: "the Serbian dinar (RSD)",
    searchContext:
      "In Serbia the document is a CV (biografija), and a free maker matters to students, graduates, and the fast-growing IT and outsourcing workforce.",
    jobMarket:
      "Serbia's economy is strong in IT and outsourcing (a fast-growing sector), manufacturing, agriculture, and services.",
    cities: ["Belgrade", "Novi Sad", "Niš", "Kragujevac", "Subotica"],
    formatNotes: [
      "A CV is usually a PDF, often in English for international and IT roles.",
      "It runs one to two pages and is reverse-chronological.",
      "A photo is commonly included, following regional practice.",
      "Languages are worth listing with levels.",
    ],
    workRouteNote:
      "Non-nationals generally need a work permit and temporary residence — check official Serbian sources before relying on any route.",
    localJobSites: ["Poslovi Infostud", "HelloWorld.rs (IT roles)", "LinkedIn", "Indeed"],
  },
  albania: {
    localTerm: "CV",
    currency: "the Albanian lek (ALL, L)",
    searchContext:
      "In Albania the document is the CV, and a free maker matters to students, graduates, and workers moving into services, tourism, and outsourcing roles.",
    jobMarket:
      "Albania's economy is led by services, tourism, agriculture, textiles and footwear, and a growing call-centre and outsourcing sector.",
    cities: ["Tirana", "Durrës", "Vlorë", "Shkodër", "Elbasan"],
    formatNotes: [
      "A CV is usually written in Albanian, though English is valued in the business community.",
      "It is reverse-chronological and runs one to two pages.",
      "Qualifications, skills, internships, and volunteer work are worth emphasising.",
      "Languages are worth listing with levels.",
    ],
    workRouteNote:
      "Non-nationals generally need a work and residence permit — check official Albanian sources before relying on any route.",
    localJobSites: ["Duapune.com", "Kastori", "the National Employment Agency (puna.gov.al)", "LinkedIn"],
  },
  belarus: {
    localTerm: "résumé (рэзюмэ)",
    currency: "the Belarusian rouble (BYN, Br)",
    searchContext:
      "In Belarus the document is a résumé, and a free maker matters to students, graduates, and workers in IT, manufacturing, and services.",
    jobMarket:
      "Belarus has a notable IT and software export sector, alongside manufacturing, agriculture, and services, in a largely Russian-language market.",
    cities: ["Minsk", "Gomel", "Mogilev", "Vitebsk", "Brest"],
    formatNotes: [
      "A résumé is formatted for A4, the standard size.",
      "Belarusian and Russian are official languages, and proficiency in either is an advantage.",
      "A clear, professional structure is expected.",
      "It is reverse-chronological.",
    ],
    workRouteNote:
      "Foreigners generally need a work permit arranged by the employer — check official Belarusian sources before relying on any route.",
    localJobSites: ["rabota.by", "praca.by", "Jooble"],
  },
  "bosnia-and-herzegovina": {
    localTerm: "CV",
    currency: "the convertible mark (BAM, KM)",
    searchContext:
      "In Bosnia and Herzegovina the document is the CV, and a free maker matters to students, graduates, and a workforce with strong diaspora ties.",
    jobMarket:
      "The economy spans services, manufacturing and metals, agriculture, and a growing IT and outsourcing sector, with significant diaspora remittances.",
    cities: ["Sarajevo", "Banja Luka", "Tuzla", "Zenica", "Mostar"],
    formatNotes: [
      "Bosnian, Croatian, or Serbian is an advantage, though English is widely accepted in multinationals.",
      "A CV runs one to two pages and is reverse-chronological.",
      "A photo is commonly included.",
      "Languages are worth listing with levels.",
    ],
    workRouteNote:
      "Non-nationals generally need a work permit and residence — check official sources before relying on any route.",
    localJobSites: ["Posao.ba", "MojPosao.ba", "Poslovi Infostud", "LinkedIn"],
  },
  kosovo: {
    localTerm: "CV",
    currency: "the euro (EUR, €)",
    searchContext:
      "In Kosovo the document is the CV, and a free maker matters to a young population facing high unemployment and many first-time jobseekers.",
    jobMarket:
      "Kosovo has a young population with high unemployment; services, trade, construction, agriculture, and a growing IT sector lead hiring, and diaspora remittances are significant.",
    cities: ["Pristina", "Prizren", "Peja", "Gjakova", "Mitrovica"],
    formatNotes: [
      "A CV is usually in Albanian, with English valued for international roles.",
      "It runs one to two pages and is reverse-chronological.",
      "Given the young workforce, skills and any internships are worth emphasising.",
      "Languages are worth listing with levels.",
    ],
    workRouteNote:
      "Non-nationals generally need a work permit — check official Kosovo sources before relying on any route.",
    localJobSites: ["KosovaJob", "Kastori", "Portal Pune", "LinkedIn"],
  },
  moldova: {
    localTerm: "CV",
    currency: "the Moldovan leu (MDL, L)",
    searchContext:
      "In Moldova the document is the CV, and a free maker matters to students, graduates, and a workforce shaped by significant labour emigration.",
    jobMarket:
      "Moldova's economy is led by agriculture and food processing, services, a growing IT sector, and significant labour emigration with remittances.",
    cities: ["Chișinău", "Bălți", "Tiraspol", "Cahul"],
    formatNotes: [
      "A CV is usually in Romanian or Russian, with English for international and IT roles.",
      "It runs one to two pages and is reverse-chronological.",
      "The main job boards offer free, tracking-system-friendly templates.",
      "Languages are worth listing with levels.",
    ],
    workRouteNote:
      "Non-nationals generally need a work and residence permit — check official Moldovan sources before relying on any route.",
    localJobSites: ["Rabota.md", "Delucru.md", "999.md", "LinkedIn"],
  },
  montenegro: {
    localTerm: "CV (biografija)",
    currency: "the euro (EUR, €)",
    searchContext:
      "In Montenegro the document is a CV, and a free maker matters to workers in a small, tourism-driven economy.",
    jobMarket:
      "Montenegro's economy is dominated by tourism, alongside construction, IT, healthcare, and trade.",
    cities: ["Podgorica", "Nikšić", "Herceg Novi", "Bar", "Budva"],
    formatNotes: [
      "A full application typically includes a cover (motivation) letter, a CV with a photo, and supporting documents.",
      "Diplomas, references, and language certificates are often attached.",
      "For creative roles, a more visual format is accepted.",
      "It is reverse-chronological.",
    ],
    workRouteNote:
      "Non-nationals generally need a work and residence permit — check official Montenegrin sources (and the Employment Agency, zzzcg.org) before relying on any route.",
    localJobSites: ["the Employment Agency of Montenegro (zzzcg.org)", "Jooble", "LinkedIn"],
  },
  "north-macedonia": {
    localTerm: "CV",
    currency: "the Macedonian denar (MKD)",
    searchContext:
      "In North Macedonia the document is the CV, and a free maker matters to students, graduates, and workers in manufacturing, IT, and services.",
    jobMarket:
      "North Macedonia's economy is led by manufacturing, agriculture, textiles, and a growing IT and services sector, with foreign-investment manufacturing zones around Skopje.",
    cities: ["Skopje", "Bitola", "Kumanovo", "Tetovo", "Ohrid"],
    formatNotes: [
      "A CV is usually in the European (Europass) format, translated into Macedonian or English.",
      "It runs one to two pages and is reverse-chronological.",
      "Languages are worth listing with levels.",
      "A photo is commonly included, following regional practice.",
    ],
    workRouteNote:
      "Non-nationals generally need a work permit — check official North Macedonian sources before relying on any route.",
    localJobSites: ["Vrabotuvanje.com.mk", "MojPosao", "LinkedIn"],
  },
  egypt: {
    localTerm: "CV (السيرة الذاتية)",
    currency: "the Egyptian pound (EGP, E£)",
    searchContext:
      "In Egypt the document is the CV, and a free maker matters to a large, young labour force — students, graduates, and many people preparing applications for the Gulf.",
    jobMarket:
      "Egypt has a large, young labour market spanning tourism, manufacturing, construction, and a growing tech and outsourcing sector, plus significant work migration to the Gulf.",
    cities: ["Cairo", "Alexandria", "Giza", "Port Said", "Mansoura"],
    formatNotes: [
      "A CV is reverse-chronological.",
      "A photo and personal details such as date of birth are commonly included, following regional practice.",
      "English CVs are common for multinationals and tech, Arabic for local and blue-collar roles.",
      "The leading platforms build a structured profile from an uploaded CV.",
    ],
    workRouteNote: null,
    localJobSites: ["Wuzzuf", "Forasna (blue-collar roles)", "LinkedIn", "Bayt", "Indeed Egypt"],
  },
  morocco: {
    localTerm: "CV",
    currency: "the Moroccan dirham (MAD, DH)",
    searchContext:
      "In Morocco the document is the CV, and a free maker matters to students, graduates, and workers in manufacturing, offshoring, and tourism.",
    jobMarket:
      "Morocco's economy is strong in automotive and aeronautics manufacturing, offshoring and call centres, tourism, agriculture, and phosphates.",
    cities: ["Casablanca", "Rabat", "Marrakesh", "Tangier", "Fès"],
    formatNotes: [
      "A CV is concise, often one page.",
      "It is usually in French or Arabic, with English appreciated in IT and tourism; translating into French or Arabic is advisable.",
      "A formal, professional tone is preferred.",
      "Languages are worth listing with levels.",
    ],
    workRouteNote:
      "Foreigners generally need a work contract approved by the labour authority (ANAPEC) — check official Moroccan sources before relying on any route.",
    localJobSites: ["ReKrute", "Emploi.ma", "MarocAnnonces", "Indeed", "LinkedIn"],
  },
  turkey: {
    localTerm: "CV (özgeçmiş)",
    currency: "the Turkish lira (TRY, ₺)",
    searchContext:
      "In Turkey the document is a CV (özgeçmiş), and a free maker matters to a large young workforce applying into manufacturing, tourism, and tech.",
    jobMarket:
      "Turkey's economy spans manufacturing, textiles, tourism, construction, and a growing tech sector, with a large young workforce.",
    cities: ["Istanbul", "Ankara", "İzmir", "Bursa", "Antalya"],
    formatNotes: [
      "A CV is one to two pages, one for early-career applicants.",
      "A photo is generally expected.",
      "Only city and country are listed, not a full address.",
      "Modern sans-serif fonts and data-driven content are favoured; the CV is reverse-chronological.",
    ],
    workRouteNote:
      "Foreigners generally need a work permit arranged by the employer — check official Turkish sources before relying on any route.",
    localJobSites: ["Kariyer.net", "Yenibiriş", "LinkedIn", "Indeed"],
  },
  israel: {
    localTerm: "CV (קורות חיים)",
    currency: "the Israeli new shekel (ILS, ₪)",
    searchContext:
      "In Israel the document is the CV, and a free maker matters to students, graduates, and the large high-tech workforce.",
    jobMarket:
      "Israel is a high-tech hub with strong demand in software, cybersecurity, and R&D, plus finance, health, and academia.",
    cities: ["Tel Aviv", "Jerusalem", "Haifa", "Be'er Sheva", "Herzliya"],
    formatNotes: [
      "A CV is concise — usually one page, two for senior profiles.",
      "It focuses on recent, relevant roles, often cutting older ones.",
      "A local phone number, professional email, city, and date of birth are commonly included.",
      "Direct action verbs are preferred over personal pronouns; cover letters are uncommon unless requested.",
    ],
    workRouteNote:
      "Foreigners generally need a work visa (such as B/1) arranged by the employer — check official Israeli sources before relying on any route.",
    localJobSites: ["AllJobs", "Drushim", "LinkedIn", "the Israeli Employment Service"],
  },
  jordan: {
    localTerm: "CV (السيرة الذاتية)",
    currency: "the Jordanian dinar (JOD, JD)",
    searchContext:
      "In Jordan the document is the CV, and a free maker matters to students, graduates, and workers in services, IT, and the large NGO sector.",
    jobMarket:
      "Jordan's economy spans services, IT and digital, healthcare, education, tourism, and a large public sector, and it hosts many regional NGOs.",
    cities: ["Amman", "Zarqa", "Irbid", "Aqaba"],
    formatNotes: [
      "It is worth tailoring the CV to each role.",
      "A CV is reverse-chronological.",
      "A photo and personal details are commonly included, following regional practice.",
      "English CVs are common for multinationals and NGOs, Arabic for local roles.",
    ],
    workRouteNote:
      "Foreigners generally need a work permit arranged by the employer — check official Jordanian sources before relying on any route.",
    localJobSites: ["Akhtaboot", "Bayt", "LinkedIn", "Indeed"],
  },
  algeria: {
    localTerm: "CV",
    currency: "the Algerian dinar (DZD, DA)",
    searchContext:
      "In Algeria the document is the CV, and a free maker matters to a large young workforce applying into hydrocarbons, construction, and services.",
    jobMarket:
      "Algeria's economy is dominated by oil and gas, with construction, agriculture, and services, a large young workforce, and high public-sector employment.",
    cities: ["Algiers", "Oran", "Constantine", "Annaba", "Blida"],
    formatNotes: [
      "A CV can be in Arabic, French, or English depending on the sector.",
      "Government and traditional sectors prefer Arabic; international and tech roles prefer French or English.",
      "A photo, marital status, and nationality are commonly included.",
      "Bilingual Arabic-French proficiency is valued.",
    ],
    workRouteNote:
      "Foreigners generally need a work permit arranged by the employer — check official Algerian sources before relying on any route.",
    localJobSites: ["Emploitic", "EmploiPartner", "Indeed", "LinkedIn"],
  },
  tunisia: {
    localTerm: "CV",
    currency: "the Tunisian dinar (TND, DT)",
    searchContext:
      "In Tunisia the document is the CV, and a free maker matters to students, graduates, and workers in manufacturing, offshoring, and tourism.",
    jobMarket:
      "Tunisia's economy is built on manufacturing (textiles, components), offshoring and call centres, tourism, agriculture, and a growing IT sector.",
    cities: ["Tunis", "Sfax", "Sousse", "Kairouan", "Bizerte"],
    formatNotes: [
      "A CV is usually in Arabic or French, with English accepted in business and tourism.",
      "It is concise and reverse-chronological.",
      "A photo is commonly included.",
      "Languages are worth listing with levels.",
    ],
    workRouteNote:
      "Foreigners generally need a work contract approved by the labour authority — check official Tunisian sources before relying on any route.",
    localJobSites: ["Tanitjobs", "Keejob", "LinkedIn", "Indeed"],
  },
  lebanon: {
    localTerm: "CV",
    currency: "the Lebanese pound (LBP), with the US dollar widely used in practice",
    searchContext:
      "In Lebanon the document is the CV, and a free maker matters to students, graduates, and the many people preparing applications amid economic crisis and emigration.",
    jobMarket:
      "Lebanon's market has been shaped by economic crisis, with NGOs and international organisations, banking, services, and tech among the main employers, and significant emigration.",
    cities: ["Beirut", "Tripoli", "Sidon", "Jounieh", "Zahlé"],
    formatNotes: [
      "A CV is reverse-chronological.",
      "English or French CVs are common alongside Arabic.",
      "Startups and NGOs value proof of initiative and portfolios.",
      "It should be concise and clearly formatted; list languages.",
    ],
    workRouteNote:
      "Foreigners generally need a work permit arranged by the employer — check official Lebanese sources before relying on any route.",
    localJobSites: ["Bayt", "HireLebanese.com", "Daleel Madani (NGO roles)", "LinkedIn"],
  },
  iraq: {
    localTerm: "CV (السيرة الذاتية)",
    currency: "the Iraqi dinar (IQD)",
    searchContext:
      "In Iraq the document is the CV, and a free maker matters to students, graduates, and workers in oil, construction, and the large humanitarian sector.",
    jobMarket:
      "Iraq's economy is dominated by oil and gas, alongside construction, hospitality, IT, and a large humanitarian and NGO sector, with Erbil and Basra as key hubs.",
    cities: ["Baghdad", "Basra", "Erbil", "Mosul", "Najaf"],
    formatNotes: [
      "A CV is reverse-chronological.",
      "English CVs are common for international firms and NGOs, Arabic for local roles.",
      "A photo and personal details are commonly included.",
      "Languages are worth listing with levels.",
    ],
    workRouteNote:
      "Foreigners generally need a work permit and residence arranged by the employer — check official Iraqi sources before relying on any route.",
    localJobSites: ["Bayt", "Tanqeeb", "Iraq Jobs Scout", "LinkedIn"],
  },
  iran: {
    localTerm: "CV (رزومه)",
    currency: "the Iranian rial (IRR)",
    searchContext:
      "In Iran the document is the CV (رزومه), and a free maker matters to a young, educated workforce applying into oil, manufacturing, and a growing tech scene.",
    jobMarket:
      "Iran's economy spans oil and gas, manufacturing, and agriculture, with a young, educated workforce and a growing tech and startup scene in Tehran.",
    cities: ["Tehran", "Mashhad", "Isfahan", "Karaj", "Shiraz"],
    formatNotes: [
      "A photo is standard practice.",
      "A clear objective tailored to each role is expected.",
      "Education is listed from the highest degree, with well-known universities an advantage.",
      "English or other foreign languages are a major asset; Persian is used for roles needing it.",
    ],
    workRouteNote:
      "Foreigners generally need a work permit arranged by the employer — check official Iranian sources before relying on any route.",
    localJobSites: ["IranTalent", "Jobinja", "Jobvision", "IranJob"],
  },
  libya: {
    localTerm: "CV (السيرة الذاتية)",
    currency: "the Libyan dinar (LYD, LD)",
    searchContext:
      "In Libya the document is the CV, and a free maker matters to workers in oil, services, and post-conflict rebuilding.",
    jobMarket:
      "Libya's economy is dominated by oil refining and services amid post-conflict rebuilding, with demand in engineering, healthcare, and IT, concentrated in Tripoli and Benghazi.",
    cities: ["Tripoli", "Benghazi", "Misrata", "Zawiya"],
    formatNotes: [
      "A CV is reverse-chronological.",
      "Arabic or English is used, depending on the employer.",
      "A photo and personal details are commonly included.",
      "It should be concise and professional; list languages.",
    ],
    workRouteNote:
      "Foreigners generally need a work permit and residence arranged by the employer — check official Libyan sources before relying on any route.",
    localJobSites: ["Bayt", "Libyanjobs.ly", "Tanqeeb", "LinkedIn"],
  },
  sudan: {
    localTerm: "CV (السيرة الذاتية)",
    currency: "the Sudanese pound (SDG)",
    searchContext:
      "In Sudan the document is the CV, and a free maker matters to workers in a market where NGOs, the UN, and the public sector are among the main formal employers.",
    jobMarket:
      "Sudan's market has been shaped by conflict, with agriculture, the public sector, and a large humanitarian, NGO, and UN presence among the main formal employers.",
    cities: ["Khartoum", "Omdurman", "Port Sudan", "Kassala"],
    formatNotes: [
      "A CV is written in Arabic (official) or English (business and NGO roles).",
      "A formal tone with no spelling errors is valued.",
      "It is reverse-chronological.",
      "Formal education and certifications are emphasised.",
    ],
    workRouteNote: null,
    localJobSites: ["Sudancareers.com", "Sudanjob.net", "ReliefWeb (NGO and UN roles)", "LinkedIn"],
  },
  yemen: {
    localTerm: "CV (السيرة الذاتية)",
    currency: "the Yemeni rial (YER)",
    searchContext:
      "In Yemen the document is the CV, and a free maker matters in a market shaped by conflict, where humanitarian and relief work is a large part of formal employment.",
    jobMarket:
      "Yemen's market has been shaped by prolonged conflict, with a large humanitarian, NGO, and UN sector alongside trade and services; many roles are local or relief-focused.",
    cities: ["Sana'a", "Aden", "Taiz", "Al Hudaydah", "Mukalla"],
    formatNotes: [
      "Include full name, a Yemeni phone number, and governorate, as some employers prioritise local candidates.",
      "Age, marital status, and a conservative professional photo are optional but common.",
      "Arabic is essential, with English an advantage for multinational employers.",
      "Clear, concise formatting focused on achievements is preferred.",
    ],
    workRouteNote: null,
    localJobSites: ["Tanqeeb", "YemenHires", "Yemen HR", "ReliefWeb (relief roles)"],
  },
  "united-arab-emirates": {
    localTerm: "CV",
    currency: "the UAE dirham (AED, Dh)",
    searchContext:
      "In the UAE the document is the CV, and a free maker matters to the heavily expatriate workforce applying into finance, construction, logistics, and hospitality.",
    jobMarket:
      "The UAE is a regional business hub — finance, real estate and construction, logistics and aviation, tourism and hospitality, and tech — with a heavily expatriate workforce.",
    cities: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Al Ain"],
    formatNotes: [
      "A single-column, tracking-system-friendly layout with standard headings reads best.",
      "Visa status is a mandatory field, placed near the top.",
      "A professional passport-style photo is common, but omit it on government portals (Dubai Careers, TAMM), which reject images.",
      "PDF preserves layout across recruiter devices.",
    ],
    workRouteNote:
      "An employer-sponsored work visa and Emirates ID are required — check the official UAE government channels (and free-zone authorities) before relying on any route.",
    localJobSites: ["Bayt", "GulfTalent", "NaukriGulf", "LinkedIn", "Indeed"],
  },
  "saudi-arabia": {
    localTerm: "CV (السيرة الذاتية)",
    currency: "the Saudi riyal (SAR, SR)",
    searchContext:
      "In Saudi Arabia the document is the CV, and a free maker matters to a young workforce and many expatriates applying amid rapid Vision-2030 growth.",
    jobMarket:
      "Saudi Arabia's economy combines oil and petrochemicals with rapid Vision-2030 diversification into tourism, entertainment, construction, and tech; Saudization (Nitaqat) shapes hiring.",
    cities: ["Riyadh", "Jeddah", "Dammam", "Mecca", "Medina"],
    formatNotes: [
      "A CV is a maximum of two pages with clear headings.",
      "A professional photo in conservative business attire is expected.",
      "Relevant Arabic keywords help, as recruiters often search in Arabic first.",
      "Stating visa or Iqama status is useful.",
    ],
    workRouteNote:
      "An employer-sponsored work visa and Iqama (residence permit) are required; government roles flow through Jadarat and Taqat — check official Saudi sources before relying on any route.",
    localJobSites: ["Bayt", "GulfTalent", "Jadarat (government roles)", "NaukriGulf", "LinkedIn"],
  },
  qatar: {
    localTerm: "CV",
    currency: "the Qatari riyal (QAR, QR)",
    searchContext:
      "In Qatar the document is the CV, and a free maker matters to the heavily expatriate workforce applying into gas, construction, and hospitality.",
    jobMarket:
      "Qatar's economy is driven by natural gas, construction and infrastructure, finance, aviation, and hospitality, with a heavily expatriate workforce.",
    cities: ["Doha", "Al Rayyan", "Al Wakrah", "Al Khor"],
    formatNotes: [
      "A single-column, reverse-chronological CV with personal details (nationality, visa status, date of birth) near the top is expected.",
      "It runs one to two pages for freshers and two to three for experienced professionals.",
      "State visa status — for example, open to relocation if applying from abroad.",
      "Avoid two-column layouts, which break tracking systems.",
    ],
    workRouteNote:
      "An employer-sponsored work visa and residence permit (QID) are required — check official Qatari sources before relying on any route.",
    localJobSites: ["Bayt", "GulfTalent", "NaukriGulf", "LinkedIn"],
  },
  kuwait: {
    localTerm: "CV",
    currency: "the Kuwaiti dinar (KWD, KD)",
    searchContext:
      "In Kuwait the document is the CV, and a free maker matters to the heavily expatriate workforce applying into oil, finance, and services.",
    jobMarket:
      "Kuwait's economy is dominated by oil, alongside finance, construction, and services; Kuwaitization shapes hiring and the workforce is heavily expatriate.",
    cities: ["Kuwait City", "Al Ahmadi", "Hawalli", "Salmiya", "Jahra"],
    formatNotes: [
      "A GCC-standard CV runs two to three pages, longer for oil and government roles.",
      "Include full personal details — nationality, visa status, date of birth, and a photo.",
      "Arabic proficiency matters more than in the UAE or Qatar.",
      "Include Arabic keywords where the role is bilingual.",
    ],
    workRouteNote:
      "An employer-sponsored work visa and residence (Civil ID) are required — check official Kuwaiti sources before relying on any route.",
    localJobSites: ["Bayt", "GulfTalent", "Indeed", "LinkedIn"],
  },
  bahrain: {
    localTerm: "CV",
    currency: "the Bahraini dinar (BHD, BD)",
    searchContext:
      "In Bahrain the document is the CV, and a free maker matters to the expatriate-heavy workforce applying into finance, industry, and tourism.",
    jobMarket:
      "Bahrain is a regional financial-services centre, alongside aluminium, oil, and a growing tech and tourism sector, with an expatriate-heavy workforce.",
    cities: ["Manama", "Riffa", "Muharraq", "Hamad Town", "Isa Town"],
    formatNotes: [
      "A CV runs one to two pages, one for freshers.",
      "A single-column layout that mirrors the job posting's keywords reads best.",
      "Following Gulf norms, personal details and a photo are commonly included.",
      "PDF is preferred.",
    ],
    workRouteNote:
      "An employer-sponsored work visa and residence permit are required — check official Bahraini sources before relying on any route.",
    localJobSites: ["Bayt", "GulfTalent", "Tanqeeb", "LinkedIn"],
  },
  oman: {
    localTerm: "CV",
    currency: "the Omani rial (OMR, RO)",
    searchContext:
      "In Oman the document is the CV, and a free maker matters to the expatriate workforce and Omani graduates applying into oil, logistics, and tourism.",
    jobMarket:
      "Oman's economy spans oil and gas, logistics and ports, tourism, fisheries, and mining; Omanization shapes hiring.",
    cities: ["Muscat", "Salalah", "Sohar", "Nizwa", "Sur"],
    formatNotes: [
      "A concise CV, ideally one page, customised to each job's keywords.",
      "A single-column layout reads best for tracking systems.",
      "A photo is common though not mandatory.",
      "Include nationality and visa status.",
    ],
    workRouteNote:
      "An employer-sponsored work visa and residence card are required — check official Omani sources before relying on any route.",
    localJobSites: ["Bayt", "GulfTalent", "NaukriGulf", "Gulf Jobs", "LinkedIn"],
  },
  india: {
    localTerm: "CV / résumé (a 'biodata' in some traditional sectors)",
    currency: "the Indian rupee (INR, ₹)",
    searchContext:
      "In India the document is the CV or résumé, and a free maker matters to a vast pool of students, graduates, and career-changers applying online at scale.",
    jobMarket:
      "India has a vast market spanning IT and software services, business-process outsourcing, finance, manufacturing, and a fast-growing startup scene.",
    cities: ["Bengaluru", "Mumbai", "Delhi", "Hyderabad", "Pune", "Chennai"],
    formatNotes: [
      "Contact details (with +91 and city/state) belong in the body, not headers, which tracking systems often skip.",
      "Use a summary for experienced candidates and an objective for freshers.",
      "Skip the photo for IT, MNCs, and startups; include it only when a government or traditional role asks.",
      "It is reverse-chronological.",
    ],
    workRouteNote: null,
    localJobSites: ["Naukri", "Foundit", "Shine", "LinkedIn", "Indeed"],
  },
  pakistan: {
    localTerm: "CV",
    currency: "the Pakistani rupee (PKR, Rs)",
    searchContext:
      "In Pakistan the document is the CV, and a free maker matters to students, graduates, and the many people preparing applications for local roles and the Gulf.",
    jobMarket:
      "Pakistan's economy spans textiles, agriculture, a growing IT and freelancing export sector, banking, and telecoms, with many workers also employed in the Gulf.",
    cities: ["Karachi", "Lahore", "Islamabad", "Faisalabad", "Rawalpindi"],
    formatNotes: [
      "English is the primary language of business and preferred for CVs, though Urdu is the national language.",
      "Customise the CV to each job with keywords from the posting.",
      "It is reverse-chronological.",
      "Many roles are filled through references even when posted online.",
    ],
    workRouteNote: null,
    localJobSites: ["Rozee.pk", "Mustakbil.com", "BrightSpyre", "LinkedIn", "Indeed"],
  },
  bangladesh: {
    localTerm: "CV",
    currency: "the Bangladeshi taka (BDT, ৳)",
    searchContext:
      "In Bangladesh the document is the CV, and a free maker matters to students, graduates, and a large workforce in garments, IT, and services.",
    jobMarket:
      "Bangladesh's exports are led by ready-made garments, alongside agriculture, a growing IT and freelancing sector, banking, and NGOs.",
    cities: ["Dhaka", "Chattogram", "Khulna", "Sylhet", "Rajshahi"],
    formatNotes: [
      "A CV should be precise and clear, since recruiters spend seconds on each.",
      "One to two pages is enough for freshers.",
      "Use a career summary for experienced candidates and a career objective for freshers.",
      "Bengali or English is used depending on the role; give accurate information only.",
    ],
    workRouteNote: null,
    localJobSites: ["Bdjobs.com", "LinkedIn", "Indeed", "Jagojobs"],
  },
  "sri-lanka": {
    localTerm: "CV",
    currency: "the Sri Lankan rupee (LKR, Rs)",
    searchContext:
      "In Sri Lanka the document is the CV, and a free maker matters to students, graduates, and the many people in apparel, tourism, and overseas employment.",
    jobMarket:
      "Sri Lanka's economy spans apparel and textiles, tourism, tea and agriculture, IT and BPO, and finance, with significant overseas employment.",
    cities: ["Colombo", "Dehiwala-Mount Lavinia", "Moratuwa", "Negombo", "Kandy"],
    formatNotes: [
      "Tailor the CV to the role, highlighting both hard and soft skills.",
      "It runs one to two pages and is reverse-chronological.",
      "English is widely used for professional roles.",
      "The main portals let you upload a CV, photo, and credentials.",
    ],
    workRouteNote: null,
    localJobSites: ["topjobs.lk", "ikman.lk", "XpressJobs", "LinkedIn"],
  },
  nepal: {
    localTerm: "CV",
    currency: "the Nepalese rupee (NPR, Rs)",
    searchContext:
      "In Nepal the document is the CV, and a free maker matters to students, graduates, and a workforce shaped by large outward labour migration.",
    jobMarket:
      "Nepal's economy spans agriculture, tourism, remittance-driven services, banking, NGOs and INGOs, and a growing IT sector, with large outward labour migration.",
    cities: ["Kathmandu", "Pokhara", "Lalitpur", "Biratnagar", "Birgunj"],
    formatNotes: [
      "Keep the CV short (one to two pages), clean, and simple.",
      "It is usually in English unless stated otherwise.",
      "Include contact, objective, education, experience, skills, and references.",
      "A keyword-aware, tracking-system-friendly layout helps on the portals.",
    ],
    workRouteNote: null,
    localJobSites: ["MeroJob", "Kumari Job", "JobsNepal", "LinkedIn"],
  },
  afghanistan: {
    localTerm: "CV",
    currency: "the afghani (AFN, Af)",
    searchContext:
      "In Afghanistan the document is the CV, and a free maker matters in a market where NGOs, the UN, and international organisations are major employers.",
    jobMarket:
      "Afghanistan has a limited formal market — agriculture, trade, and a large share of jobs tied to NGOs, the UN, and international organisations.",
    cities: ["Kabul", "Herat", "Kandahar", "Mazar-i-Sharif", "Jalalabad"],
    formatNotes: [
      "A CV is written in Dari or Pashto, or in English for NGO and international roles.",
      "A cover letter is usually required.",
      "It is reverse-chronological.",
      "Tailor it to the role with the most relevant qualifications.",
    ],
    workRouteNote: null,
    localJobSites: ["Jobs.af", "ACBAR", "Rozee.af", "the UN jobs portal"],
  },
  maldives: {
    localTerm: "CV",
    currency: "the Maldivian rufiyaa (MVR)",
    searchContext:
      "In the Maldives the document is the CV, and a free maker matters most to people applying into the resort and hospitality sector.",
    jobMarket:
      "The Maldives is dominated by luxury tourism (over half of GDP) — resorts, diving, and hospitality — plus fisheries and public services.",
    cities: ["Malé", "Hulhumalé", "Addu City", "Fuvahmulah"],
    formatNotes: [
      "A concise one-to-two-page CV is usual for private-sector roles.",
      "It often opens with a short career objective, useful for tourism roles.",
      "A professional headshot is common and often expected in tourism and hospitality.",
      "English is sufficient for many roles, with basic Dhivehi an advantage locally.",
    ],
    workRouteNote:
      "Foreigners generally need a work permit and employment approval arranged by the employer — check official Maldivian sources before relying on any route.",
    localJobSites: ["Job-Maldives.com", "Jobsicle.mv", "Career-Maldives.com", "LinkedIn"],
  },
  bhutan: {
    localTerm: "CV",
    currency: "the ngultrum (BTN, Nu)",
    searchContext:
      "In Bhutan the document is the CV, and a free maker matters to graduates and workers in a small but growing market.",
    jobMarket:
      "Bhutan's economy is small but growing — high-value tourism, hydropower, agriculture, education, and a developing IT sector, with a large civil service.",
    cities: ["Thimphu", "Phuntsholing", "Paro", "Gelephu"],
    formatNotes: [
      "A comprehensive, detailed CV highlighting relevant skills and qualifications is expected.",
      "English is predominant for business, with Dzongkha used for some roles.",
      "It is reverse-chronological.",
      "Applications are usually a professional email with the CV attached.",
    ],
    workRouteNote:
      "Foreigners generally need a work permit; civil-service roles go through the Zhiyog Recruitment System — check official Bhutanese sources before relying on any route.",
    localJobSites: ["DziSeldra.com", "the Zhiyog Recruitment System (civil service)", "Indeed", "LinkedIn"],
  },
  china: {
    localTerm: "résumé (简历, jiǎnlì)",
    currency: "the Chinese yuan (renminbi, CNY, ¥)",
    searchContext:
      "In China the document is a résumé (简历), and a free maker matters to a vast, intensely competitive pool of graduates and jobseekers.",
    jobMarket:
      "China is the world's second-largest economy, spanning manufacturing, tech and e-commerce, finance, and services, with intense competition especially among graduates.",
    cities: ["Shanghai", "Beijing", "Shenzhen", "Guangzhou", "Chengdu", "Hangzhou"],
    formatNotes: [
      "A photo in ID-photo style, top-right, is standard.",
      "Use standard Chinese section headers, with keywords in both Chinese and English.",
      "PDF with a proper text layer parses best in the platforms' tracking systems.",
      "It is reverse-chronological.",
    ],
    workRouteNote:
      "Foreigners generally need a Z work visa and work permit arranged by the employer — check official Chinese sources before relying on any route.",
    localJobSites: ["Zhaopin", "Boss Zhipin", "Liepin", "51job"],
  },
  "hong-kong": {
    localTerm: "CV (履歷)",
    currency: "the Hong Kong dollar (HKD, HK$)",
    searchContext:
      "In Hong Kong the document is the CV, and a free maker matters to students, graduates, and professionals in a bilingual, finance-led market.",
    jobMarket:
      "Hong Kong is a global financial centre — banking and finance, trade and logistics, professional services, and tech — with bilingual English and Chinese workplaces.",
    cities: ["Central", "Kowloon", "Causeway Bay", "Tsim Sha Tsui", "Sha Tin"],
    formatNotes: [
      "A CV is concise and reverse-chronological, usually one to two pages and longer only for senior professionals.",
      "A strong summary, achievements with impact, and keywords from the ad help with tracking systems.",
      "It is written in English or bilingually.",
      "A photo is not generally required.",
    ],
    workRouteNote:
      "Foreigners generally need an employment visa (such as the GEP) sponsored by the employer — check official Hong Kong Immigration sources before relying on any route.",
    localJobSites: ["JobsDB", "LinkedIn", "Indeed", "CTgoodjobs"],
  },
  japan: {
    localTerm: "rirekisho (履歴書), paired with a shokumu-keirekisho work-history CV",
    currency: "the Japanese yen (JPY, ¥)",
    searchContext:
      "In Japan the document is the rirekisho, and a free maker matters to graduates and the growing number of foreigners entering a market with labour shortages.",
    jobMarket:
      "Japan is a large economy spanning manufacturing, electronics and automotive, tech, finance, and services, with labour shortages opening more roles to foreigners.",
    cities: ["Tokyo", "Osaka", "Yokohama", "Nagoya", "Fukuoka"],
    formatNotes: [
      "The rirekisho is a fixed, government-standardised (JIS) form — creativity in formatting is a disqualifier, not a differentiator.",
      "A formal photo (chest-up, plain background, jacket) is expected.",
      "A second document, the shokumu-keirekisho, details work history.",
      "Some international tech firms accept a single English CV — confirm before applying.",
    ],
    workRouteNote:
      "Foreigners generally need a work visa in an eligible status arranged by the employer — check the official Immigration Services Agency before relying on any route.",
    localJobSites: ["Rikunabi", "Mynavi", "Doda", "GaijinPot (English-friendly roles)"],
  },
  mongolia: {
    localTerm: "CV",
    currency: "the Mongolian tögrög (MNT, ₮)",
    searchContext:
      "In Mongolia the document is the CV, and a free maker matters to graduates and workers in mining, construction, and a growing IT sector.",
    jobMarket:
      "Mongolia's economy is dominated by mining (a major export), with agriculture, construction, tourism, and a growing IT sector.",
    cities: ["Ulaanbaatar", "Erdenet", "Darkhan", "Choibalsan"],
    formatNotes: [
      "A CV is reverse-chronological.",
      "It is usually in Mongolian, with English for international and mining-sector roles.",
      "Tailor it to the role and use the portals' CV builders.",
      "Keep it concise and clear.",
    ],
    workRouteNote:
      "Foreigners generally need a work permit and visa arranged by the employer — check official Mongolian sources before relying on any route.",
    localJobSites: ["Zangia", "Unegui (jobs section)", "LinkedIn", "Indeed"],
  },
  "south-korea": {
    localTerm: "résumé (이력서, iryeokseo)",
    currency: "the South Korean won (KRW, ₩)",
    searchContext:
      "In South Korea the document is a résumé (이력서), and a free maker matters to graduates and internationals applying into tech, manufacturing, and services.",
    jobMarket:
      "South Korea is a tech and manufacturing powerhouse — electronics, automotive, shipbuilding, IT, and entertainment — with large conglomerates (chaebol) alongside a strong SME sector.",
    cities: ["Seoul", "Busan", "Incheon", "Daegu", "Daejeon"],
    formatNotes: [
      "Public-sector and many public enterprises use a blind-hiring standard form (표준이력서) that bans photos, school names, age, and family background.",
      "Private-sector traditional resumes often include a photo.",
      "HWP is the safe file format for Korean SMEs, PDF for multinationals and tech.",
      "The major boards have built-in resume builders.",
    ],
    workRouteNote:
      "Foreigners generally need a work visa (such as E-7) sponsored by the employer — check official Korean (Hi Korea) sources before relying on any route.",
    localJobSites: ["Saramin", "JobKorea", "LinkedIn", "Albamon (part-time)"],
  },
  taiwan: {
    localTerm: "résumé (履歷, lǚlì), often with a 自傳 self-introduction essay",
    currency: "the New Taiwan dollar (TWD, NT$)",
    searchContext:
      "In Taiwan the document is a résumé (履歷), and a free maker matters to graduates and internationals applying into electronics, IT, and services.",
    jobMarket:
      "Taiwan is a global semiconductor and electronics hub, plus machinery, IT, and services.",
    cities: ["Taipei", "New Taipei", "Taichung", "Kaohsiung", "Tainan"],
    formatNotes: [
      "It is written in traditional Chinese characters.",
      "Most applications flow through 104 Job Bank's structured templates.",
      "A professional photo is a standard component and notably boosts responses.",
      "Many employers also require a 自傳 — a one-to-two-page self-introduction essay.",
    ],
    workRouteNote:
      "Foreigners generally need a work permit sponsored by the employer — check official Taiwanese sources before relying on any route.",
    localJobSites: ["104 Job Bank", "1111 Job Bank", "JobsDB", "LinkedIn"],
  },
  indonesia: {
    localTerm: "CV",
    currency: "the Indonesian rupiah (IDR, Rp)",
    searchContext:
      "In Indonesia the document is the CV, and a free maker matters to a large young workforce applying into manufacturing, services, and the digital economy.",
    jobMarket:
      "Indonesia has a large economy — manufacturing, commodities, a fast-growing digital and startup sector, and services — with a big young workforce.",
    cities: ["Jakarta", "Surabaya", "Bandung", "Medan", "Bekasi"],
    formatNotes: [
      "A CV is reverse-chronological and runs one to two pages.",
      "A photo is commonly included, following regional practice.",
      "Completing a full profile matters, as recruiters assess profile completeness on the platforms.",
      "A keyword-aware layout helps with the platforms' matching tools.",
    ],
    workRouteNote:
      "Foreigners generally need an employer-sponsored work permit (RPTKA) and KITAS — check official Indonesian sources before relying on any route.",
    localJobSites: ["Jobstreet", "Glints", "Kalibrr", "LinkedIn", "Indeed"],
  },
  philippines: {
    localTerm: "résumé (CV is used for academic and research roles)",
    currency: "the Philippine peso (PHP, ₱)",
    searchContext:
      "In the Philippines the document is the résumé, and a free maker matters to graduates, BPO workers, and the many overseas Filipino workers preparing applications.",
    jobMarket:
      "The Philippines is a global business-process outsourcing hub, alongside services, healthcare, IT, and significant overseas Filipino worker (OFW) migration.",
    cities: ["Manila", "Quezon City", "Cebu", "Davao", "Makati"],
    formatNotes: [
      "A résumé typically runs two to three pages.",
      "Fresh graduates list their OJT (on-the-job training).",
      "Licensed professions name the PRC license with its validity.",
      "It commonly ends with three character references.",
    ],
    workRouteNote:
      "Foreigners coming in generally need an Alien Employment Permit (AEP) and work visa — check official Philippine sources before relying on any route.",
    localJobSites: ["JobStreet", "Kalibrr", "LinkedIn", "Indeed", "Bossjob"],
  },
  vietnam: {
    localTerm: "CV",
    currency: "the Vietnamese đồng (VND, ₫)",
    searchContext:
      "In Vietnam the document is the CV, and a free maker matters to a young workforce in a fast-growing manufacturing and tech economy.",
    jobMarket:
      "Vietnam is a fast-growing manufacturing and export hub (electronics, textiles), plus IT, tourism, and services.",
    cities: ["Ho Chi Minh City", "Hanoi", "Da Nang", "Hai Phong", "Can Tho"],
    formatNotes: [
      "A CV is reverse-chronological and runs one to two pages.",
      "A passport-sized photo is a major requirement — professional, dark attire, no beauty filters.",
      "Vietnamese is expected for local roles, English for international ones.",
      "Save it as a PDF to preserve formatting.",
    ],
    workRouteNote:
      "Foreigners generally need a work permit arranged by the employer — check official Vietnamese sources before relying on any route.",
    localJobSites: ["VietnamWorks", "TopCV", "LinkedIn", "Indeed"],
  },
  thailand: {
    localTerm: "résumé",
    currency: "the Thai baht (THB, ฿)",
    searchContext:
      "In Thailand the document is the résumé, and a free maker matters to graduates and workers in tourism, manufacturing, and services.",
    jobMarket:
      "Thailand's economy spans tourism and hospitality, manufacturing (automotive, electronics), agriculture, and services.",
    cities: ["Bangkok", "Nonthaburi", "Chiang Mai", "Pattaya", "Phuket"],
    formatNotes: [
      "A résumé is reverse-chronological and runs one to two pages.",
      "A professional photo is commonly included, following regional practice.",
      "Thai is used for local roles, English for international and tourism roles.",
      "The major boards offer tracking-system-friendly templates.",
    ],
    workRouteNote:
      "Foreigners generally need a work permit and Non-B visa arranged by the employer — check official Thai sources before relying on any route.",
    localJobSites: ["JobsDB", "JobThai", "LinkedIn", "Indeed"],
  },
  malaysia: {
    localTerm: "resume (CV for academic roles)",
    currency: "the Malaysian ringgit (MYR, RM)",
    searchContext:
      "In Malaysia the document is the resume, and a free maker matters to a multilingual workforce applying into electronics, finance, and shared services.",
    jobMarket:
      "Malaysia's economy spans manufacturing (electronics), palm oil and commodities, finance, shared services, and tourism, with a multilingual workforce.",
    cities: ["Kuala Lumpur", "George Town", "Johor Bahru", "Ipoh", "Kuching"],
    formatNotes: [
      "A resume is no more than two pages, one for new graduates.",
      "A photo is generally expected, though it is optional.",
      "English is widely used, with Malay common for local roles.",
      "It is reverse-chronological.",
    ],
    workRouteNote:
      "Foreigners generally need an Employment Pass sponsored by the employer — check official Malaysian sources before relying on any route.",
    localJobSites: ["JobStreet", "Maukerja", "LinkedIn", "Indeed"],
  },
  singapore: {
    localTerm: "résumé (CV is used interchangeably)",
    currency: "the Singapore dollar (SGD, S$)",
    searchContext:
      "In Singapore the document is the résumé, and a free maker matters to a heavily international workforce in finance, tech, and professional services.",
    jobMarket:
      "Singapore is a global business and finance hub — banking, tech, biotech, logistics, and professional services — and heavily international.",
    cities: ["Central Business District", "Jurong", "Tampines", "Woodlands", "Changi"],
    formatNotes: [
      "A résumé is concise, one to two pages, and a little more detailed than US resumes.",
      "A professional photo is common practice, unlike many Western markets.",
      "Tailor it to the role with keywords from the posting.",
      "PDF is the usual format.",
    ],
    workRouteNote:
      "Foreigners generally need an Employment Pass or S Pass sponsored by the employer; employers must advertise on MyCareersFuture for 14 days first — check official MOM sources before relying on any route.",
    localJobSites: ["MyCareersFuture", "JobStreet", "LinkedIn", "Indeed"],
  },
  myanmar: {
    localTerm: "CV",
    currency: "the Myanmar kyat (MMK, K)",
    searchContext:
      "In Myanmar the document is the CV, and a free maker matters to graduates and workers in a market where NGOs and international organisations are notable employers.",
    jobMarket:
      "Myanmar's economy spans agriculture, manufacturing (garments), trade, and services; the formal market has been disrupted, with NGOs and international organisations among employers.",
    cities: ["Yangon", "Mandalay", "Naypyidaw", "Bago", "Mawlamyine"],
    formatNotes: [
      "A CV is reverse-chronological.",
      "English or Burmese is used depending on the role — a Burmese version can help.",
      "It runs one to two pages.",
      "Keep it concise and clear.",
    ],
    workRouteNote: null,
    localJobSites: ["JobNet.com.mm", "MyJobs.com.mm", "JobsInYangon.com", "LinkedIn"],
  },
  brunei: {
    localTerm: "CV",
    currency: "the Brunei dollar (BND, B$), interchangeable with the Singapore dollar",
    searchContext:
      "In Brunei the document is the CV, and a free maker matters to graduates and workers in oil, the public sector, and services.",
    jobMarket:
      "Brunei's economy is dominated by oil and gas, alongside a large public sector, Islamic finance, and services.",
    cities: ["Bandar Seri Begawan", "Kuala Belait", "Seria", "Tutong"],
    formatNotes: [
      "A CV is in English or Malay, depending on the role.",
      "It details education, work history, skills, and achievements.",
      "References from previous employers or character referees are commonly included.",
      "It is reverse-chronological.",
    ],
    workRouteNote:
      "Foreigners generally need an employment pass / work permit arranged by the employer — check official Bruneian sources before relying on any route.",
    localJobSites: ["JobCentre Brunei", "JobsBrunei.com", "BruneiWork.com", "LinkedIn"],
  },
  cambodia: {
    localTerm: "CV",
    currency: "the Cambodian riel (KHR), with the US dollar widely used",
    searchContext:
      "In Cambodia the document is the CV, and a free maker matters to graduates and workers in garments, tourism, and services.",
    jobMarket:
      "Cambodia's economy is led by garments and footwear manufacturing, tourism, construction, agriculture, and a growing services sector.",
    cities: ["Phnom Penh", "Siem Reap", "Battambang", "Sihanoukville"],
    formatNotes: [
      "A CV is reverse-chronological.",
      "Include only key personal details (name, phone, professional email) and avoid marital status or age unless requested.",
      "English is common for international and NGO roles, Khmer for local ones.",
      "List relevant skills and achievements.",
    ],
    workRouteNote:
      "Foreigners generally need a work permit and employment card arranged by the employer — check official Cambodian sources before relying on any route.",
    localJobSites: ["CamHR", "Pelprek", "Bong Thom", "LinkedIn"],
  },
  laos: {
    localTerm: "CV",
    currency: "the Lao kip (LAK)",
    searchContext:
      "In Laos the document is the CV, and a free maker matters to graduates and workers in hydropower, tourism, and development organisations.",
    jobMarket:
      "Laos's economy is built on hydropower, mining, agriculture, tourism, and a growing services sector, with many roles tied to regional investment and development organisations.",
    cities: ["Vientiane", "Pakse", "Savannakhet", "Luang Prabang"],
    formatNotes: [
      "A CV is reverse-chronological.",
      "Lao is used for local roles, English for international and ASEAN-facing employers.",
      "Keep it concise and clear.",
      "List languages and relevant skills.",
    ],
    workRouteNote:
      "Foreigners generally need a work permit and stay permit arranged by the employer — check official Lao sources before relying on any route.",
    localJobSites: ["108.jobs", "CVConnect", "LinkedIn"],
  },
  "timor-leste": {
    localTerm: "CV",
    currency: "the US dollar (USD, $)",
    searchContext:
      "In Timor-Leste the document is the CV, and a free maker matters in a market where oil, the public sector, and NGOs are the main employers.",
    jobMarket:
      "Timor-Leste's economy rests on oil and gas, agriculture (notably coffee), the public sector, and a large NGO, UN, and development presence.",
    cities: ["Dili", "Baucau", "Maliana", "Suai"],
    formatNotes: [
      "Employers often expect a photo, marital status, and sometimes religion for certain roles.",
      "Hiring leans on relationships, so the references section matters.",
      "Fluency in Tetum or Portuguese is valued for government and community roles.",
      "Applications often include a cover letter and certificates.",
    ],
    workRouteNote:
      "Foreigners generally need a work visa and permit arranged by the employer — check official Timor-Leste sources before relying on any route.",
    localJobSites: ["Timor.Work", "JobsInTimorLeste.com", "UN Jobs (international roles)", "ReliefWeb"],
  },
  kazakhstan: {
    localTerm: "résumé (резюме)",
    currency: "the Kazakhstani tenge (KZT, ₸)",
    searchContext:
      "In Kazakhstan the document is a résumé, and a free maker matters to graduates and workers in oil, mining, finance, and a growing tech sector.",
    jobMarket:
      "Kazakhstan's economy is led by oil and gas and mining, with finance, agriculture, logistics, and a growing tech sector; Russian-English bilingualism is valued.",
    cities: ["Almaty", "Astana", "Shymkent", "Karaganda", "Aktobe"],
    formatNotes: [
      "A résumé is reverse-chronological.",
      "Russian-English bilingualism is among the most sought-after skills.",
      "The market is relationship-driven, so referrals matter alongside the CV.",
      "Keep it clear and concise.",
    ],
    workRouteNote:
      "Foreigners generally need an employer-sponsored work permit — check official Kazakhstani sources before relying on any route.",
    localJobSites: ["hh.kz", "Enbek.kz", "Rabota.kz", "LinkedIn"],
  },
  uzbekistan: {
    localTerm: "résumé (rezyume)",
    currency: "the Uzbekistani soʻm (UZS)",
    searchContext:
      "In Uzbekistan the document is a résumé, and a free maker matters to a young workforce applying into manufacturing, gas, and a growing IT sector.",
    jobMarket:
      "Uzbekistan's economy spans cotton and textiles, natural gas, manufacturing, and a growing IT sector (the IT Park initiative), with a young workforce.",
    cities: ["Tashkent", "Samarkand", "Namangan", "Andijan", "Bukhara"],
    formatNotes: [
      "A professional passport-style headshot is expected, usually top-right.",
      "CVs often include more personal detail than Western ones — full name (with patronymic), nationality, and marital status.",
      "Post-Soviet formality is common.",
      "List languages with levels.",
    ],
    workRouteNote:
      "Foreigners generally need an employer-sponsored work permit — check official Uzbek sources before relying on any route.",
    localJobSites: ["hh.uz", "UzJobs", "RESUME.UZ", "LinkedIn"],
  },
  georgia: {
    localTerm: "CV",
    currency: "the Georgian lari (GEL, ₾)",
    searchContext:
      "In Georgia the document is the CV, and a free maker matters to graduates, workers, and the many remote workers based in Tbilisi.",
    jobMarket:
      "Georgia's economy spans tourism, agriculture and wine, logistics and transit, banking, and a growing IT sector, with Tbilisi a regional hub for remote workers.",
    cities: ["Tbilisi", "Batumi", "Kutaisi", "Rustavi"],
    formatNotes: [
      "A CV is reverse-chronological.",
      "Georgian and English are both commonly used, and the main boards offer English versions.",
      "Keep it concise and clear.",
      "List languages with levels.",
    ],
    workRouteNote:
      "Nationals of many countries can stay and work relatively easily, but rules vary — check official Georgian sources before relying on any route.",
    localJobSites: ["HR.ge", "Jobs.ge", "CV.ge", "LinkedIn"],
  },
  azerbaijan: {
    localTerm: "CV",
    currency: "the Azerbaijani manat (AZN, ₼)",
    searchContext:
      "In Azerbaijan the document is the CV, and a free maker matters to graduates and workers in oil, construction, and services.",
    jobMarket:
      "Azerbaijan's economy is dominated by oil and gas, with construction, agriculture, logistics, and a growing services sector.",
    cities: ["Baku", "Ganja", "Sumqayit", "Mingachevir"],
    formatNotes: [
      "A CV is reverse-chronological.",
      "Fluency in Azerbaijani or Russian is a major advantage for local firms, with English valued internationally.",
      "A concise, scannable format with metrics reads best.",
      "It is best to avoid boastful language.",
    ],
    workRouteNote:
      "Foreigners generally need an employer-sponsored work permit — check official Azerbaijani sources before relying on any route.",
    localJobSites: ["HelloJob.az", "Boss.az", "JobSearch.az", "LinkedIn"],
  },
  armenia: {
    localTerm: "CV",
    currency: "the Armenian dram (AMD, ֏)",
    searchContext:
      "In Armenia the document is the CV, and a free maker matters to graduates and workers in a fast-growing tech sector and a strong diaspora network.",
    jobMarket:
      "Armenia has a fast-growing IT and tech sector, alongside services, manufacturing, agriculture, and tourism, with a strong diaspora network.",
    cities: ["Yerevan", "Gyumri", "Vanadzor", "Vagharshapat"],
    formatNotes: [
      "A CV is reverse-chronological.",
      "Armenian and English are used, often alongside Russian.",
      "The main portals offer online CV builders.",
      "Keep it concise and clear; list languages.",
    ],
    workRouteNote:
      "Foreigners generally need a residence and work permit — check official Armenian sources before relying on any route.",
    localJobSites: ["Staff.am", "Job.am", "CareerCenter.am", "LinkedIn"],
  },
  kyrgyzstan: {
    localTerm: "résumé (резюме)",
    currency: "the Kyrgyzstani som (KGS)",
    searchContext:
      "In Kyrgyzstan the document is a résumé, and a free maker matters to a young workforce in agriculture, mining, and services.",
    jobMarket:
      "Kyrgyzstan's economy spans agriculture, mining (notably gold), services, and remittances from workers abroad, with a young workforce.",
    cities: ["Bishkek", "Osh", "Jalal-Abad", "Karakol"],
    formatNotes: [
      "CVs often include marital status, passport details, and a photo, unlike Western resumes.",
      "Russian or Kyrgyz fluency is a major plus.",
      "Networking matters, so listing two or three local referees with mobile numbers helps.",
      "It is reverse-chronological.",
    ],
    workRouteNote:
      "Foreigners generally need a work permit arranged by the employer — check official Kyrgyz sources before relying on any route.",
    localJobSites: ["headhunter.kg", "Lalafo", "LinkedIn"],
  },
  tajikistan: {
    localTerm: "résumé (резюме)",
    currency: "the Tajikistani somoni (TJS)",
    searchContext:
      "In Tajikistan the document is a résumé, and a free maker matters in a market shaped by hydropower, agriculture, and large-scale labour migration.",
    jobMarket:
      "Tajikistan's economy is powered by hydropower and agriculture, which employs much of the workforce, with significant labour migration and remittances.",
    cities: ["Dushanbe", "Khujand", "Bokhtar", "Kulob"],
    formatNotes: [
      "A reverse-chronological but formal, text-heavy format with clear section headers is preferred.",
      "CVs traditionally include personal details such as age and marital status.",
      "Russian fluency is often essential.",
      "List languages with levels.",
    ],
    workRouteNote:
      "Foreigners generally need a work permit arranged by the employer — check official Tajik sources before relying on any route.",
    localJobSites: ["Indeed", "the UN jobs portal", "DevelopmentAid (development roles)", "LinkedIn"],
  },
  turkmenistan: {
    localTerm: "résumé (резюме)",
    currency: "the Turkmenistani manat (TMT)",
    searchContext:
      "In Turkmenistan the document is a résumé, and a free maker matters to workers in oil, gas, construction, and the large state sector.",
    jobMarket:
      "Turkmenistan's economy is dominated by oil, gas, and a large state sector, with construction, agriculture (cotton), and education; demand spans specialists, drivers, and laborers.",
    cities: ["Ashgabat", "Türkmenabat", "Daşoguz", "Mary"],
    formatNotes: [
      "A structured one-to-two-page format with clear sections is preferred.",
      "Include a professional headshot, birthdate, marital status, and nationality, which are standard expectations.",
      "Use full job titles and formal language.",
      "Sector-specific terms (for example, the Galkynysh gas field) signal local awareness.",
    ],
    workRouteNote:
      "Foreigners generally need a work permit arranged by the employer — check official Turkmen sources before relying on any route.",
    localJobSites: ["Business Turkmenistan (business.com.tm)", "the government employment portal", "Indeed", "LinkedIn"],
  },
  australia: {
    localTerm: "resume (CV is used interchangeably)",
    currency: "the Australian dollar (AUD, A$)",
    searchContext:
      "In Australia the document is the resume, and a free maker matters to students, graduates, and skilled migrants applying into a services-led market.",
    jobMarket:
      "Australia has a services-led economy — healthcare, education, construction, mining, and finance — with a strong skilled-migration program.",
    cities: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"],
    formatNotes: [
      "A resume runs two to three pages.",
      "No photo, date of birth, or marital status is included, partly for anti-discrimination compliance.",
      "It is reverse-chronological and lists referees.",
      "A tracking-system-friendly layout with standard fonts and keywords reads best.",
    ],
    workRouteNote:
      "Non-citizens generally need a skilled or employer-sponsored visa — check the official Department of Home Affairs before relying on any route.",
    localJobSites: ["Seek", "Indeed", "LinkedIn", "Jora"],
  },
  "new-zealand": {
    localTerm: "CV",
    currency: "the New Zealand dollar (NZD, NZ$)",
    searchContext:
      "In New Zealand the document is the CV, and a free maker matters to students, graduates, and migrants applying into services, agriculture, and construction.",
    jobMarket:
      "New Zealand's economy spans services, agriculture and food, construction, healthcare, and tourism, with active skilled-migration pathways.",
    cities: ["Auckland", "Wellington", "Christchurch", "Hamilton", "Tauranga"],
    formatNotes: [
      "A CV is reverse-chronological.",
      "A cover letter is expected unless you are told otherwise.",
      "No photo is included, following British and EU-style norms.",
      "Save it as a PDF and list referees.",
    ],
    workRouteNote:
      "Non-citizens generally need a skilled or accredited-employer work visa — check the official Immigration New Zealand before relying on any route.",
    localJobSites: ["Seek", "Trade Me Jobs", "LinkedIn", "Indeed"],
  },
  fiji: {
    localTerm: "CV",
    currency: "the Fijian dollar (FJD, FJ$)",
    searchContext:
      "In Fiji the document is the CV, and a free maker matters to graduates and workers in tourism, services, and the regional Pacific market.",
    jobMarket:
      "Fiji's largest sector is tourism, alongside sugar and agriculture, services, and a regional hub role for the Pacific.",
    cities: ["Suva", "Lautoka", "Nadi", "Labasa"],
    formatNotes: [
      "A CV is usually a maximum of two pages.",
      "Capture employment history with dates, duration, and reasons for leaving.",
      "References go at the end, and irrelevant earlier work is best dropped.",
      "Certified copies of qualifications are often required with applications.",
    ],
    workRouteNote:
      "Foreigners generally need a work permit arranged by the employer — check official Fijian (Immigration) sources before relying on any route.",
    localJobSites: ["My Jobs Fiji", "HRmonise", "the Fiji Government Recruitment Portal", "LinkedIn"],
  },
  "papua-new-guinea": {
    localTerm: "CV",
    currency: "the Papua New Guinean kina (PGK, K)",
    searchContext:
      "In Papua New Guinea the document is the CV, and a free maker matters to graduates and workers in mining, energy, and the public sector.",
    jobMarket:
      "Papua New Guinea's economy is led by mining, oil and gas (LNG), agriculture, and a large public and NGO sector; it is the South Pacific's largest economy by population.",
    cities: ["Port Moresby", "Lae", "Mount Hagen", "Madang"],
    formatNotes: [
      "A CV is in English or Tok Pisin depending on the role.",
      "It includes personal details, an objective, education, employment, skills, and references.",
      "A photo is not commonly included.",
      "Bulleted achievements make it easier to read.",
    ],
    workRouteNote:
      "Foreigners generally need a work permit and entry visa arranged by the employer — check official PNG sources before relying on any route.",
    localJobSites: ["PNGworkForce.com", "PngJobSeek", "Wan PNG", "LinkedIn"],
  },
  samoa: {
    localTerm: "CV",
    currency: "the Samoan tala (WST, T)",
    searchContext:
      "In Samoa the document is the CV, and a free maker matters to graduates and workers in agriculture, tourism, and the public sector.",
    jobMarket:
      "Samoa's economy spans agriculture, fishing, tourism, and a large public sector, with significant remittances from the diaspora.",
    cities: ["Apia", "Vaitele", "Salelologa"],
    formatNotes: [
      "A recently updated CV (within the last 12 months) is expected.",
      "Provide three referees with full contact details.",
      "Certified copies of qualifications are often required.",
      "It is reverse-chronological and concise.",
    ],
    workRouteNote:
      "Foreigners generally need a work permit or foreign-employment approval — check official Samoan sources before relying on any route.",
    localJobSites: ["My Jobs Samoa", "the Samoa Public Service Commission (psc.gov.ws)", "LinkedIn"],
  },
  tonga: {
    localTerm: "CV",
    currency: "the Tongan paʻanga (TOP, T$)",
    searchContext:
      "In Tonga the document is the CV, and a free maker matters to graduates and workers in agriculture, tourism, and the public sector.",
    jobMarket:
      "Tonga's economy spans agriculture, fishing, tourism, and a large public sector, and remittances are a major part of the economy.",
    cities: ["Nuku'alofa", "Neiafu", "Haveluloto"],
    formatNotes: [
      "A CV is reverse-chronological and usually emailed with a cover letter.",
      "It includes education, experience, skills, and referees.",
      "Keep it concise.",
      "Certified copies of qualifications are often required.",
    ],
    workRouteNote:
      "Foreigners generally need a work permit arranged by the employer — check official Tongan sources before relying on any route.",
    localJobSites: ["Tonga Employment Network (jobseektonga.gov.to)", "Matangi Tonga (vacancies)", "the Public Service Commission", "JobIsland.com"],
  },
  vanuatu: {
    localTerm: "CV",
    currency: "the Vanuatu vatu (VUV, VT)",
    searchContext:
      "In Vanuatu the document is the CV, and a free maker matters to workers in tourism, agriculture, and seasonal labour schemes to Australia and New Zealand.",
    jobMarket:
      "Vanuatu's economy spans tourism, agriculture, and offshore financial services, with a large public and NGO sector and significant seasonal labour migration to Australia and New Zealand.",
    cities: ["Port Vila", "Luganville"],
    formatNotes: [
      "English (or French) resumes are widely accepted.",
      "Include personal details, education, employment history, skills, and references.",
      "Tailor it to the role and update it regularly.",
      "It is reverse-chronological.",
    ],
    workRouteNote:
      "Foreigners generally need a work permit and residence permit arranged by the employer — check official Vanuatu sources before relying on any route.",
    localJobSites: ["Vanuatu Wok", "Wok i Kik", "VatuJobs", "Employment Vanuatu"],
  },
  "solomon-islands": {
    localTerm: "CV",
    currency: "the Solomon Islands dollar (SBD, SI$)",
    searchContext:
      "In the Solomon Islands the document is the CV, and a free maker matters in a small market built on agriculture, fishing, and a sizeable development sector.",
    jobMarket:
      "The Solomon Islands economy rests on agriculture, fishing, and forestry, with tourism, retail, and services, and a significant NGO and development presence.",
    cities: ["Honiara", "Auki", "Gizo", "Munda"],
    formatNotes: [
      "English (or Solomon Islands Pijin) resumes are accepted, and should be well-written and error-free.",
      "It is reverse-chronological.",
      "Networking is crucial in the local market.",
      "For IT roles, tracking-system-friendly keywords help.",
    ],
    workRouteNote:
      "Foreigners generally need a work permit and visa arranged by the employer — check official Solomon Islands sources before relying on any route.",
    localJobSites: ["Pasifiki HR", "the SIG Services vacancies portal", "the UN jobs portal", "LinkedIn"],
  },
  kiribati: {
    localTerm: "CV",
    currency: "the Australian dollar (AUD, A$)",
    searchContext:
      "In Kiribati the document is the CV, and a free maker matters in a small market where the public sector and overseas seafaring work are central.",
    jobMarket:
      "Kiribati has a small economy based on fishing licences, copra, the public sector, and overseas seasonal work and seafaring, with remittances an important part of income.",
    cities: ["South Tarawa", "Betio", "Bairiki"],
    formatNotes: [
      "A CV is reverse-chronological.",
      "English is widely used for formal applications.",
      "Keep it concise, with education, experience, and referees.",
      "The government portal is the main route for local roles.",
    ],
    workRouteNote:
      "Foreigners generally need a work permit arranged by the employer — check official Kiribati (Ministry of Employment) sources before relying on any route.",
    localJobSites: ["Employment Kiribati (employment.gov.ki)", "the UN jobs portal", "LinkedIn"],
  },
  "marshall-islands": {
    localTerm: "résumé / CV",
    currency: "the US dollar (USD, $)",
    searchContext:
      "In the Marshall Islands the document is the résumé or CV, and a free maker matters in a small market with strong US ties.",
    jobMarket:
      "The Marshall Islands economy rests on fishing and marine resources, the public sector, US-linked roles (notably on Kwajalein Atoll), education, and healthcare.",
    cities: ["Majuro", "Ebeye", "Kwajalein"],
    formatNotes: [
      "A résumé is reverse-chronological.",
      "English is standard, and US-style conventions are common given close US ties.",
      "Government roles use standard application forms.",
      "Keep it concise.",
    ],
    workRouteNote:
      "Work eligibility varies — US citizens have specific access under the Compact of Free Association, while others need a permit — check official Marshall Islands sources before relying on any route.",
    localJobSites: ["PSC RMI (pscrmi.net)", "the Marine Resources Authority (MIMRA) vacancies", "Indeed", "Jooble"],
  },
  micronesia: {
    localTerm: "résumé / CV",
    currency: "the US dollar (USD, $)",
    searchContext:
      "In the Federated States of Micronesia the document is the résumé or CV, and a free maker matters in a small, public-sector-led market with strong US ties.",
    jobMarket:
      "Micronesia's economy rests on the public sector, fishing and marine resources, education, and US-linked roles under the Compact of Free Association.",
    cities: ["Palikir", "Kolonia", "Weno", "Tofol"],
    formatNotes: [
      "A résumé is reverse-chronological.",
      "English is standard.",
      "Government roles follow standard application procedures through the Personnel Office.",
      "UN roles use the P11 form rather than a CV; keep it concise.",
    ],
    workRouteNote:
      "Work eligibility varies by nationality, with specific access for US citizens under the Compact — check official FSM sources before relying on any route.",
    localJobSites: ["the FSM Personnel Office (personnel.gov.fm)", "the College of Micronesia jobs portal", "Indeed", "the UN jobs portal"],
  },
  nauru: {
    localTerm: "CV",
    currency: "the Australian dollar (AUD, A$)",
    searchContext:
      "In Nauru the document is the CV, and a free maker matters in a very small market centred on the public sector.",
    jobMarket:
      "Nauru has a very small economy centred on the public sector, phosphate-related activity, fishing licences, and regional processing arrangements.",
    cities: ["Yaren", "Denigomodu", "Aiwo"],
    formatNotes: [
      "A CV is reverse-chronological.",
      "English is standard.",
      "Government roles use downloadable application forms emailed with supporting documents.",
      "Keep it concise, with referees.",
    ],
    workRouteNote:
      "Foreigners generally need a work permit arranged by the employer — check official Nauru sources before relying on any route.",
    localJobSites: ["the Nauru Department of Human Resources (nauruhr.gov.nr)", "Indeed", "the UN jobs portal"],
  },
  tuvalu: {
    localTerm: "CV",
    currency: "the Australian dollar (AUD, A$), used alongside Tuvaluan coins",
    searchContext:
      "In Tuvalu the document is the CV, and a free maker matters in one of the world's smallest economies, where the public sector and seafaring dominate.",
    jobMarket:
      "Tuvalu has a very small economy (population around 11,000) built on fishing and maritime industries, the public sector, seafaring, and emerging climate-adaptation projects.",
    cities: ["Funafuti", "Vaiaku"],
    formatNotes: [
      "Clear contact details, including a local address or P.O. box, help.",
      "For government roles, a voter ID or national registration number may be needed.",
      "It is reverse-chronological.",
      "Keep it concise and aligned to local priorities.",
    ],
    workRouteNote:
      "Foreigners generally need a work permit arranged by the employer — check official Tuvaluan sources before relying on any route.",
    localJobSites: ["JobIsland.com", "the UN jobs portal", "DevelopmentAid (development roles)", "Indeed"],
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
