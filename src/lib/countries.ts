/**
 * AlmiCV — 193 served countries for the cv-guide expansion.
 *
 * ADDITIVE — does NOT replace `src/lib/country-landing.ts` (196 entries
 * that power existing `/jobs/[country]` SEO). The 196-list intentionally
 * includes 6 hub-only entries (Vatican City, Monaco, Palau, Palestine,
 * North Korea, Syria) that AlmiJob/AlmiSalary/AlmiStudy v2 exclude
 * because they can't reasonably promise "jobs/salaries/universities in
 * X" for those territories. The 193 here mirrors AlmiJob's `lib/countries.ts`
 * canonical served-list so cv-guide cross-product deep links stay
 * slug-compatible.
 *
 * Sync discipline: when `almijob-v2/lib/countries.ts` evolves, mirror here.
 * `primaryLanguage` is the language used for CV convention purposes
 * (often the national language used in formal applications, not
 * necessarily the most-spoken tongue). `region` matches the 14-region
 * grouping AlmiSalary v2 uses in `page-relations.ts:REGION_OF`.
 */

export type Region =
  | "north-america"
  | "central-south-america"
  | "caribbean"
  | "western-europe"
  | "nordic"
  | "eastern-europe"
  | "mena"
  | "gulf"
  | "sub-saharan-africa"
  | "south-asia"
  | "southeast-asia"
  | "east-asia"
  | "central-asia"
  | "oceania";

export type Country = {
  iso: string;             // ISO 3166-1 alpha-2
  name: string;            // canonical display name (matches almijob-v2)
  slug: string;            // kebab-case; matches AlmiJob/Salary/Study v2
  primaryLanguage: string; // language convention for CV purposes
  region: Region;
};

export const COUNTRIES_SERVED: Country[] = [
  // North America
  { iso: "US", name: "United States", slug: "united-states", primaryLanguage: "English", region: "north-america" },
  { iso: "CA", name: "Canada", slug: "canada", primaryLanguage: "English", region: "north-america" },
  { iso: "MX", name: "Mexico", slug: "mexico", primaryLanguage: "Spanish", region: "north-america" },
  // Caribbean
  { iso: "AG", name: "Antigua and Barbuda", slug: "antigua-and-barbuda", primaryLanguage: "English", region: "caribbean" },
  { iso: "BS", name: "Bahamas", slug: "bahamas", primaryLanguage: "English", region: "caribbean" },
  { iso: "BB", name: "Barbados", slug: "barbados", primaryLanguage: "English", region: "caribbean" },
  { iso: "CU", name: "Cuba", slug: "cuba", primaryLanguage: "Spanish", region: "caribbean" },
  { iso: "DM", name: "Dominica", slug: "dominica", primaryLanguage: "English", region: "caribbean" },
  { iso: "DO", name: "Dominican Republic", slug: "dominican-republic", primaryLanguage: "Spanish", region: "caribbean" },
  { iso: "GD", name: "Grenada", slug: "grenada", primaryLanguage: "English", region: "caribbean" },
  { iso: "HT", name: "Haiti", slug: "haiti", primaryLanguage: "French", region: "caribbean" },
  { iso: "JM", name: "Jamaica", slug: "jamaica", primaryLanguage: "English", region: "caribbean" },
  { iso: "KN", name: "Saint Kitts and Nevis", slug: "saint-kitts-and-nevis", primaryLanguage: "English", region: "caribbean" },
  { iso: "LC", name: "Saint Lucia", slug: "saint-lucia", primaryLanguage: "English", region: "caribbean" },
  { iso: "VC", name: "Saint Vincent and the Grenadines", slug: "saint-vincent-and-the-grenadines", primaryLanguage: "English", region: "caribbean" },
  { iso: "TT", name: "Trinidad and Tobago", slug: "trinidad-and-tobago", primaryLanguage: "English", region: "caribbean" },
  // Central + South America
  { iso: "AR", name: "Argentina", slug: "argentina", primaryLanguage: "Spanish", region: "central-south-america" },
  { iso: "BZ", name: "Belize", slug: "belize", primaryLanguage: "English", region: "central-south-america" },
  { iso: "BO", name: "Bolivia", slug: "bolivia", primaryLanguage: "Spanish", region: "central-south-america" },
  { iso: "BR", name: "Brazil", slug: "brazil", primaryLanguage: "Portuguese", region: "central-south-america" },
  { iso: "CL", name: "Chile", slug: "chile", primaryLanguage: "Spanish", region: "central-south-america" },
  { iso: "CO", name: "Colombia", slug: "colombia", primaryLanguage: "Spanish", region: "central-south-america" },
  { iso: "CR", name: "Costa Rica", slug: "costa-rica", primaryLanguage: "Spanish", region: "central-south-america" },
  { iso: "EC", name: "Ecuador", slug: "ecuador", primaryLanguage: "Spanish", region: "central-south-america" },
  { iso: "SV", name: "El Salvador", slug: "el-salvador", primaryLanguage: "Spanish", region: "central-south-america" },
  { iso: "GT", name: "Guatemala", slug: "guatemala", primaryLanguage: "Spanish", region: "central-south-america" },
  { iso: "GY", name: "Guyana", slug: "guyana", primaryLanguage: "English", region: "central-south-america" },
  { iso: "HN", name: "Honduras", slug: "honduras", primaryLanguage: "Spanish", region: "central-south-america" },
  { iso: "NI", name: "Nicaragua", slug: "nicaragua", primaryLanguage: "Spanish", region: "central-south-america" },
  { iso: "PA", name: "Panama", slug: "panama", primaryLanguage: "Spanish", region: "central-south-america" },
  { iso: "PY", name: "Paraguay", slug: "paraguay", primaryLanguage: "Spanish", region: "central-south-america" },
  { iso: "PE", name: "Peru", slug: "peru", primaryLanguage: "Spanish", region: "central-south-america" },
  { iso: "SR", name: "Suriname", slug: "suriname", primaryLanguage: "Dutch", region: "central-south-america" },
  { iso: "UY", name: "Uruguay", slug: "uruguay", primaryLanguage: "Spanish", region: "central-south-america" },
  { iso: "VE", name: "Venezuela", slug: "venezuela", primaryLanguage: "Spanish", region: "central-south-america" },
  // Western Europe
  { iso: "AD", name: "Andorra", slug: "andorra", primaryLanguage: "Catalan", region: "western-europe" },
  { iso: "AT", name: "Austria", slug: "austria", primaryLanguage: "German", region: "western-europe" },
  { iso: "BE", name: "Belgium", slug: "belgium", primaryLanguage: "Dutch", region: "western-europe" },
  { iso: "CY", name: "Cyprus", slug: "cyprus", primaryLanguage: "Greek", region: "western-europe" },
  { iso: "FR", name: "France", slug: "france", primaryLanguage: "French", region: "western-europe" },
  { iso: "DE", name: "Germany", slug: "germany", primaryLanguage: "German", region: "western-europe" },
  { iso: "GR", name: "Greece", slug: "greece", primaryLanguage: "Greek", region: "western-europe" },
  { iso: "IE", name: "Ireland", slug: "ireland", primaryLanguage: "English", region: "western-europe" },
  { iso: "IT", name: "Italy", slug: "italy", primaryLanguage: "Italian", region: "western-europe" },
  { iso: "LI", name: "Liechtenstein", slug: "liechtenstein", primaryLanguage: "German", region: "western-europe" },
  { iso: "LU", name: "Luxembourg", slug: "luxembourg", primaryLanguage: "French", region: "western-europe" },
  { iso: "MT", name: "Malta", slug: "malta", primaryLanguage: "English", region: "western-europe" },
  { iso: "NL", name: "Netherlands", slug: "netherlands", primaryLanguage: "Dutch", region: "western-europe" },
  { iso: "PT", name: "Portugal", slug: "portugal", primaryLanguage: "Portuguese", region: "western-europe" },
  { iso: "SM", name: "San Marino", slug: "san-marino", primaryLanguage: "Italian", region: "western-europe" },
  { iso: "ES", name: "Spain", slug: "spain", primaryLanguage: "Spanish", region: "western-europe" },
  { iso: "CH", name: "Switzerland", slug: "switzerland", primaryLanguage: "German", region: "western-europe" },
  { iso: "GB", name: "United Kingdom", slug: "united-kingdom", primaryLanguage: "English", region: "western-europe" },
  // Nordic
  { iso: "DK", name: "Denmark", slug: "denmark", primaryLanguage: "Danish", region: "nordic" },
  { iso: "FO", name: "Faroe Islands", slug: "faroe-islands", primaryLanguage: "Faroese", region: "nordic" },
  { iso: "FI", name: "Finland", slug: "finland", primaryLanguage: "Finnish", region: "nordic" },
  { iso: "IS", name: "Iceland", slug: "iceland", primaryLanguage: "Icelandic", region: "nordic" },
  { iso: "NO", name: "Norway", slug: "norway", primaryLanguage: "Norwegian", region: "nordic" },
  { iso: "SE", name: "Sweden", slug: "sweden", primaryLanguage: "Swedish", region: "nordic" },
  // Eastern Europe
  { iso: "AL", name: "Albania", slug: "albania", primaryLanguage: "Albanian", region: "eastern-europe" },
  { iso: "BY", name: "Belarus", slug: "belarus", primaryLanguage: "Russian", region: "eastern-europe" },
  { iso: "BA", name: "Bosnia and Herzegovina", slug: "bosnia-and-herzegovina", primaryLanguage: "Bosnian", region: "eastern-europe" },
  { iso: "BG", name: "Bulgaria", slug: "bulgaria", primaryLanguage: "Bulgarian", region: "eastern-europe" },
  { iso: "HR", name: "Croatia", slug: "croatia", primaryLanguage: "Croatian", region: "eastern-europe" },
  { iso: "CZ", name: "Czech Republic", slug: "czech-republic", primaryLanguage: "Czech", region: "eastern-europe" },
  { iso: "EE", name: "Estonia", slug: "estonia", primaryLanguage: "Estonian", region: "eastern-europe" },
  { iso: "HU", name: "Hungary", slug: "hungary", primaryLanguage: "Hungarian", region: "eastern-europe" },
  { iso: "XK", name: "Kosovo", slug: "kosovo", primaryLanguage: "Albanian", region: "eastern-europe" },
  { iso: "LV", name: "Latvia", slug: "latvia", primaryLanguage: "Latvian", region: "eastern-europe" },
  { iso: "LT", name: "Lithuania", slug: "lithuania", primaryLanguage: "Lithuanian", region: "eastern-europe" },
  { iso: "MD", name: "Moldova", slug: "moldova", primaryLanguage: "Romanian", region: "eastern-europe" },
  { iso: "ME", name: "Montenegro", slug: "montenegro", primaryLanguage: "Montenegrin", region: "eastern-europe" },
  { iso: "MK", name: "North Macedonia", slug: "north-macedonia", primaryLanguage: "Macedonian", region: "eastern-europe" },
  { iso: "PL", name: "Poland", slug: "poland", primaryLanguage: "Polish", region: "eastern-europe" },
  { iso: "RO", name: "Romania", slug: "romania", primaryLanguage: "Romanian", region: "eastern-europe" },
  { iso: "RU", name: "Russia", slug: "russia", primaryLanguage: "Russian", region: "eastern-europe" },
  { iso: "RS", name: "Serbia", slug: "serbia", primaryLanguage: "Serbian", region: "eastern-europe" },
  { iso: "SK", name: "Slovakia", slug: "slovakia", primaryLanguage: "Slovak", region: "eastern-europe" },
  { iso: "SI", name: "Slovenia", slug: "slovenia", primaryLanguage: "Slovenian", region: "eastern-europe" },
  { iso: "UA", name: "Ukraine", slug: "ukraine", primaryLanguage: "Ukrainian", region: "eastern-europe" },
  // MENA
  { iso: "DZ", name: "Algeria", slug: "algeria", primaryLanguage: "Arabic", region: "mena" },
  { iso: "EG", name: "Egypt", slug: "egypt", primaryLanguage: "Arabic", region: "mena" },
  { iso: "IR", name: "Iran", slug: "iran", primaryLanguage: "Persian", region: "mena" },
  { iso: "IQ", name: "Iraq", slug: "iraq", primaryLanguage: "Arabic", region: "mena" },
  { iso: "IL", name: "Israel", slug: "israel", primaryLanguage: "Hebrew", region: "mena" },
  { iso: "JO", name: "Jordan", slug: "jordan", primaryLanguage: "Arabic", region: "mena" },
  { iso: "LB", name: "Lebanon", slug: "lebanon", primaryLanguage: "Arabic", region: "mena" },
  { iso: "LY", name: "Libya", slug: "libya", primaryLanguage: "Arabic", region: "mena" },
  { iso: "MA", name: "Morocco", slug: "morocco", primaryLanguage: "Arabic", region: "mena" },
  { iso: "SD", name: "Sudan", slug: "sudan", primaryLanguage: "Arabic", region: "mena" },
  { iso: "TN", name: "Tunisia", slug: "tunisia", primaryLanguage: "Arabic", region: "mena" },
  { iso: "TR", name: "Turkey", slug: "turkey", primaryLanguage: "Turkish", region: "mena" },
  { iso: "YE", name: "Yemen", slug: "yemen", primaryLanguage: "Arabic", region: "mena" },
  // Gulf
  { iso: "BH", name: "Bahrain", slug: "bahrain", primaryLanguage: "Arabic", region: "gulf" },
  { iso: "KW", name: "Kuwait", slug: "kuwait", primaryLanguage: "Arabic", region: "gulf" },
  { iso: "OM", name: "Oman", slug: "oman", primaryLanguage: "Arabic", region: "gulf" },
  { iso: "QA", name: "Qatar", slug: "qatar", primaryLanguage: "Arabic", region: "gulf" },
  { iso: "SA", name: "Saudi Arabia", slug: "saudi-arabia", primaryLanguage: "Arabic", region: "gulf" },
  { iso: "AE", name: "United Arab Emirates", slug: "united-arab-emirates", primaryLanguage: "Arabic", region: "gulf" },
  // Sub-Saharan Africa
  { iso: "AO", name: "Angola", slug: "angola", primaryLanguage: "Portuguese", region: "sub-saharan-africa" },
  { iso: "BJ", name: "Benin", slug: "benin", primaryLanguage: "French", region: "sub-saharan-africa" },
  { iso: "BW", name: "Botswana", slug: "botswana", primaryLanguage: "English", region: "sub-saharan-africa" },
  { iso: "BF", name: "Burkina Faso", slug: "burkina-faso", primaryLanguage: "French", region: "sub-saharan-africa" },
  { iso: "BI", name: "Burundi", slug: "burundi", primaryLanguage: "French", region: "sub-saharan-africa" },
  { iso: "CM", name: "Cameroon", slug: "cameroon", primaryLanguage: "French", region: "sub-saharan-africa" },
  { iso: "CV", name: "Cape Verde", slug: "cape-verde", primaryLanguage: "Portuguese", region: "sub-saharan-africa" },
  { iso: "CF", name: "Central African Republic", slug: "central-african-republic", primaryLanguage: "French", region: "sub-saharan-africa" },
  { iso: "TD", name: "Chad", slug: "chad", primaryLanguage: "French", region: "sub-saharan-africa" },
  { iso: "KM", name: "Comoros", slug: "comoros", primaryLanguage: "French", region: "sub-saharan-africa" },
  { iso: "CG", name: "Republic of the Congo", slug: "republic-of-the-congo", primaryLanguage: "French", region: "sub-saharan-africa" },
  { iso: "CD", name: "Democratic Republic of the Congo", slug: "democratic-republic-of-the-congo", primaryLanguage: "French", region: "sub-saharan-africa" },
  { iso: "CI", name: "Cote d Ivoire", slug: "cote-d-ivoire", primaryLanguage: "French", region: "sub-saharan-africa" },
  { iso: "DJ", name: "Djibouti", slug: "djibouti", primaryLanguage: "French", region: "sub-saharan-africa" },
  { iso: "GQ", name: "Equatorial Guinea", slug: "equatorial-guinea", primaryLanguage: "Spanish", region: "sub-saharan-africa" },
  { iso: "ER", name: "Eritrea", slug: "eritrea", primaryLanguage: "Tigrinya", region: "sub-saharan-africa" },
  { iso: "SZ", name: "Eswatini", slug: "eswatini", primaryLanguage: "English", region: "sub-saharan-africa" },
  { iso: "ET", name: "Ethiopia", slug: "ethiopia", primaryLanguage: "Amharic", region: "sub-saharan-africa" },
  { iso: "GA", name: "Gabon", slug: "gabon", primaryLanguage: "French", region: "sub-saharan-africa" },
  { iso: "GM", name: "Gambia", slug: "gambia", primaryLanguage: "English", region: "sub-saharan-africa" },
  { iso: "GH", name: "Ghana", slug: "ghana", primaryLanguage: "English", region: "sub-saharan-africa" },
  { iso: "GN", name: "Guinea", slug: "guinea", primaryLanguage: "French", region: "sub-saharan-africa" },
  { iso: "GW", name: "Guinea-Bissau", slug: "guinea-bissau", primaryLanguage: "Portuguese", region: "sub-saharan-africa" },
  { iso: "KE", name: "Kenya", slug: "kenya", primaryLanguage: "English", region: "sub-saharan-africa" },
  { iso: "LS", name: "Lesotho", slug: "lesotho", primaryLanguage: "English", region: "sub-saharan-africa" },
  { iso: "LR", name: "Liberia", slug: "liberia", primaryLanguage: "English", region: "sub-saharan-africa" },
  { iso: "MG", name: "Madagascar", slug: "madagascar", primaryLanguage: "French", region: "sub-saharan-africa" },
  { iso: "MW", name: "Malawi", slug: "malawi", primaryLanguage: "English", region: "sub-saharan-africa" },
  { iso: "ML", name: "Mali", slug: "mali", primaryLanguage: "French", region: "sub-saharan-africa" },
  { iso: "MR", name: "Mauritania", slug: "mauritania", primaryLanguage: "Arabic", region: "sub-saharan-africa" },
  { iso: "MU", name: "Mauritius", slug: "mauritius", primaryLanguage: "English", region: "sub-saharan-africa" },
  { iso: "MZ", name: "Mozambique", slug: "mozambique", primaryLanguage: "Portuguese", region: "sub-saharan-africa" },
  { iso: "NA", name: "Namibia", slug: "namibia", primaryLanguage: "English", region: "sub-saharan-africa" },
  { iso: "NE", name: "Niger", slug: "niger", primaryLanguage: "French", region: "sub-saharan-africa" },
  { iso: "NG", name: "Nigeria", slug: "nigeria", primaryLanguage: "English", region: "sub-saharan-africa" },
  { iso: "RW", name: "Rwanda", slug: "rwanda", primaryLanguage: "English", region: "sub-saharan-africa" },
  { iso: "ST", name: "Sao Tome and Principe", slug: "sao-tome-and-principe", primaryLanguage: "Portuguese", region: "sub-saharan-africa" },
  { iso: "SN", name: "Senegal", slug: "senegal", primaryLanguage: "French", region: "sub-saharan-africa" },
  { iso: "SC", name: "Seychelles", slug: "seychelles", primaryLanguage: "English", region: "sub-saharan-africa" },
  { iso: "SL", name: "Sierra Leone", slug: "sierra-leone", primaryLanguage: "English", region: "sub-saharan-africa" },
  { iso: "SO", name: "Somalia", slug: "somalia", primaryLanguage: "Somali", region: "sub-saharan-africa" },
  { iso: "ZA", name: "South Africa", slug: "south-africa", primaryLanguage: "English", region: "sub-saharan-africa" },
  { iso: "SS", name: "South Sudan", slug: "south-sudan", primaryLanguage: "English", region: "sub-saharan-africa" },
  { iso: "TZ", name: "Tanzania", slug: "tanzania", primaryLanguage: "English", region: "sub-saharan-africa" },
  { iso: "TG", name: "Togo", slug: "togo", primaryLanguage: "French", region: "sub-saharan-africa" },
  { iso: "UG", name: "Uganda", slug: "uganda", primaryLanguage: "English", region: "sub-saharan-africa" },
  { iso: "ZM", name: "Zambia", slug: "zambia", primaryLanguage: "English", region: "sub-saharan-africa" },
  { iso: "ZW", name: "Zimbabwe", slug: "zimbabwe", primaryLanguage: "English", region: "sub-saharan-africa" },
  // South Asia
  { iso: "AF", name: "Afghanistan", slug: "afghanistan", primaryLanguage: "Dari", region: "south-asia" },
  { iso: "BD", name: "Bangladesh", slug: "bangladesh", primaryLanguage: "Bengali", region: "south-asia" },
  { iso: "BT", name: "Bhutan", slug: "bhutan", primaryLanguage: "Dzongkha", region: "south-asia" },
  { iso: "IN", name: "India", slug: "india", primaryLanguage: "English", region: "south-asia" },
  { iso: "MV", name: "Maldives", slug: "maldives", primaryLanguage: "Dhivehi", region: "south-asia" },
  { iso: "NP", name: "Nepal", slug: "nepal", primaryLanguage: "Nepali", region: "south-asia" },
  { iso: "PK", name: "Pakistan", slug: "pakistan", primaryLanguage: "Urdu", region: "south-asia" },
  { iso: "LK", name: "Sri Lanka", slug: "sri-lanka", primaryLanguage: "English", region: "south-asia" },
  // Southeast Asia
  { iso: "BN", name: "Brunei", slug: "brunei", primaryLanguage: "Malay", region: "southeast-asia" },
  { iso: "KH", name: "Cambodia", slug: "cambodia", primaryLanguage: "Khmer", region: "southeast-asia" },
  { iso: "ID", name: "Indonesia", slug: "indonesia", primaryLanguage: "Indonesian", region: "southeast-asia" },
  { iso: "LA", name: "Laos", slug: "laos", primaryLanguage: "Lao", region: "southeast-asia" },
  { iso: "MY", name: "Malaysia", slug: "malaysia", primaryLanguage: "Malay", region: "southeast-asia" },
  { iso: "MM", name: "Myanmar", slug: "myanmar", primaryLanguage: "Burmese", region: "southeast-asia" },
  { iso: "PH", name: "Philippines", slug: "philippines", primaryLanguage: "English", region: "southeast-asia" },
  { iso: "SG", name: "Singapore", slug: "singapore", primaryLanguage: "English", region: "southeast-asia" },
  { iso: "TH", name: "Thailand", slug: "thailand", primaryLanguage: "Thai", region: "southeast-asia" },
  { iso: "TL", name: "Timor-Leste", slug: "timor-leste", primaryLanguage: "Portuguese", region: "southeast-asia" },
  { iso: "VN", name: "Vietnam", slug: "vietnam", primaryLanguage: "Vietnamese", region: "southeast-asia" },
  // East Asia
  { iso: "CN", name: "China", slug: "china", primaryLanguage: "Mandarin", region: "east-asia" },
  { iso: "HK", name: "Hong Kong", slug: "hong-kong", primaryLanguage: "English", region: "east-asia" },
  { iso: "JP", name: "Japan", slug: "japan", primaryLanguage: "Japanese", region: "east-asia" },
  { iso: "MN", name: "Mongolia", slug: "mongolia", primaryLanguage: "Mongolian", region: "east-asia" },
  { iso: "KR", name: "South Korea", slug: "south-korea", primaryLanguage: "Korean", region: "east-asia" },
  { iso: "TW", name: "Taiwan", slug: "taiwan", primaryLanguage: "Mandarin", region: "east-asia" },
  // Central Asia + Caucasus
  { iso: "AM", name: "Armenia", slug: "armenia", primaryLanguage: "Armenian", region: "central-asia" },
  { iso: "AZ", name: "Azerbaijan", slug: "azerbaijan", primaryLanguage: "Azerbaijani", region: "central-asia" },
  { iso: "GE", name: "Georgia", slug: "georgia", primaryLanguage: "Georgian", region: "central-asia" },
  { iso: "KZ", name: "Kazakhstan", slug: "kazakhstan", primaryLanguage: "Russian", region: "central-asia" },
  { iso: "KG", name: "Kyrgyzstan", slug: "kyrgyzstan", primaryLanguage: "Russian", region: "central-asia" },
  { iso: "TJ", name: "Tajikistan", slug: "tajikistan", primaryLanguage: "Tajik", region: "central-asia" },
  { iso: "TM", name: "Turkmenistan", slug: "turkmenistan", primaryLanguage: "Turkmen", region: "central-asia" },
  { iso: "UZ", name: "Uzbekistan", slug: "uzbekistan", primaryLanguage: "Uzbek", region: "central-asia" },
  // Oceania
  { iso: "AU", name: "Australia", slug: "australia", primaryLanguage: "English", region: "oceania" },
  { iso: "FJ", name: "Fiji", slug: "fiji", primaryLanguage: "English", region: "oceania" },
  { iso: "KI", name: "Kiribati", slug: "kiribati", primaryLanguage: "English", region: "oceania" },
  { iso: "MH", name: "Marshall Islands", slug: "marshall-islands", primaryLanguage: "English", region: "oceania" },
  { iso: "FM", name: "Micronesia", slug: "micronesia", primaryLanguage: "English", region: "oceania" },
  { iso: "NR", name: "Nauru", slug: "nauru", primaryLanguage: "English", region: "oceania" },
  { iso: "NZ", name: "New Zealand", slug: "new-zealand", primaryLanguage: "English", region: "oceania" },
  { iso: "PG", name: "Papua New Guinea", slug: "papua-new-guinea", primaryLanguage: "English", region: "oceania" },
  { iso: "WS", name: "Samoa", slug: "samoa", primaryLanguage: "English", region: "oceania" },
  { iso: "SB", name: "Solomon Islands", slug: "solomon-islands", primaryLanguage: "English", region: "oceania" },
  { iso: "TO", name: "Tonga", slug: "tonga", primaryLanguage: "English", region: "oceania" },
  { iso: "TV", name: "Tuvalu", slug: "tuvalu", primaryLanguage: "English", region: "oceania" },
  { iso: "VU", name: "Vanuatu", slug: "vanuatu", primaryLanguage: "English", region: "oceania" },
];

export const COUNTRY_BY_SLUG: Map<string, Country> = new Map(
  COUNTRIES_SERVED.map((c) => [c.slug, c]),
);

export function getCountryBySlug(slug: string): Country | undefined {
  return COUNTRY_BY_SLUG.get(slug);
}
