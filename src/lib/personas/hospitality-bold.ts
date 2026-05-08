import type { CVData } from "@/lib/cv-types";

/** Carlos Hernandez — Executive Chef. Hospitality / Bold. */
export const hospitalityBold: CVData = {
  basics: {
    fullName: "Carlos Hernández",
    role: "Executive Chef — Modern Mexican",
    email: "chef@carlos-hernandez.kitchen",
    phone: "+52 55 5555 0184",
    location: "Mexico City, MX",
    website: "carloshernandez.kitchen",
    linkedIn: "linkedin.com/in/chef-carlos-hernandez",
    photoUrl:
      "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&h=400&fit=crop&crop=faces",
    summary:
      "<strong>Executive Chef</strong> with 16 years across modern Mexican fine dining and high-volume hotel kitchens. Currently lead a 38-person brigade at a 110-cover destination in Polanco — <em>one Michelin star (2024)</em>, 50 Best Latin America #18.",
  },
  experience: [
    {
      company: "Casa Tlaloc — Polanco",
      role: "Executive Chef",
      location: "Mexico City, MX",
      startDate: "2020",
      bullets: [
        "Lead a 38-person brigade at a 110-cover modern Mexican fine-dining concept.",
        "Earned the restaurant's first Michelin star (2024) and Latin America's 50 Best #18 in 2025.",
        "Designed the seasonal tasting menu — 11 courses, 4 menu changes per year, milpa-rotation sourcing.",
        "Cut food cost from 31% to 26% without compromising menu density through direct producer relationships.",
        "Mentor 4 sous chefs — 2 have moved on to head their own kitchens in CDMX.",
      ],
    },
    {
      company: "Pujol",
      role: "Sous Chef → Senior Sous Chef",
      location: "Mexico City, MX",
      startDate: "2015",
      endDate: "2020",
      bullets: [
        "Sous chef under Enrique Olvera through the period the restaurant held #5–#13 on World's 50 Best.",
        "Owned the mole madre station — the kitchen's signature dish, served continuously for 1,000+ days.",
        "Daily R&D session lead; 14 dishes I co-developed remained on the tasting menu rotation.",
      ],
    },
    {
      company: "Eleven Madison Park",
      role: "Stage → Chef de Partie",
      location: "New York, US",
      startDate: "2011",
      endDate: "2015",
      bullets: [
        "Stagiaire that earned a permanent CDP role in 7 months.",
        "Worked the fish, garde-manger, and pastry stations across 3 ½ years.",
      ],
    },
  ],
  education: [
    {
      school: "Centro Culinario Ambrosía",
      degree: "Diploma — Culinary Arts",
      location: "Mexico City, MX",
      startDate: "2008",
      endDate: "2010",
      notes: "Stage placements at Quintonil and Biko during programme.",
    },
  ],
  skills: [
    "Menu Engineering",
    "Modern Mexican Technique",
    "Brigade Leadership",
    "Cost & Pour Cost Control",
    "Sourcing — Producer-Direct",
    "Tasting-Menu Pacing",
    "Wine & Mezcal Pairing",
    "HACCP",
    "R&D / New-Dish Development",
  ],
  certifications: [
    { name: "ServSafe Manager", issuer: "National Restaurant Association", year: "2023" },
    { name: "Distintivo H — Hygiene Certification", issuer: "SECTUR", year: "2022" },
  ],
  languages: [
    { name: "Spanish", level: "C2" },
    { name: "English", level: "C1" },
    { name: "French", level: "B1" },
  ],
  awards: [
    { title: "Michelin Star — Casa Tlaloc", issuer: "Michelin Guide", year: "2024" },
    { title: "Latin America's 50 Best Restaurants — #18", issuer: "World's 50 Best", year: "2025" },
    { title: "Chef of the Year — Mesamérica", issuer: "Mesamérica", year: "2023" },
  ],
  interests: ["Foraging in the Valle de Bravo", "Vinyl jazz", "Coaching the FC Pumas neighborhood team"],
};
