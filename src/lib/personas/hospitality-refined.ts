import type { CVData } from "@/lib/cv-types";

/** Sophia Martinelli — Pastry Chef. Hospitality / Refined. */
export const hospitalityRefined: CVData = {
  basics: {
    fullName: "Sophia Martinelli",
    role: "Head Pastry Chef",
    email: "sophia@martinelli-patisserie.it",
    phone: "+39 02 555 0148",
    location: "Milan, IT",
    website: "martinelli-patisserie.it",
    linkedIn: "linkedin.com/in/sophia-martinelli-pastry",
    photoUrl:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop&crop=faces",
    summary:
      "Pastry Chef with 13 years across <em>two-Michelin-starred</em> kitchens in Milan and Paris. I lead the pastry brigade at Atelier dei Bianchi and run the dessert programme for the group's tasting menus — quiet technique, French method, Italian heart.",
  },
  experience: [
    {
      company: "Atelier dei Bianchi",
      role: "Head Pastry Chef",
      location: "Milan, IT",
      startDate: "2021",
      bullets: [
        "Run the pastry programme for a two-Michelin-starred restaurant — 60 covers, 8-course tasting menu.",
        "Designed 4 seasonal tasting menus per year; 11 desserts featured in Identità Golose's annual roundup.",
        "Lead a 6-person pastry brigade — three from my team have gone on to head their own pastry sections.",
        "Co-developed the restaurant's chocolate program with a single Piedmontese cocoa importer.",
      ],
    },
    {
      company: "Pierre Hermé Paris",
      role: "Sous-Chef Pâtissière",
      location: "Paris, FR",
      startDate: "2017",
      endDate: "2021",
      bullets: [
        "Sous-chef on the macaron line and seasonal collections at the rue Bonaparte boutique.",
        "Co-developed the 2019 'Jardin de l'Atlas' collection — featured in Le Figaro Magazine.",
        "Trained 22 commis on macaron technique and tempering during my tenure.",
      ],
    },
    {
      company: "Le Cinq, Four Seasons Paris",
      role: "Demi Chef de Partie — Pastry",
      location: "Paris, FR",
      startDate: "2014",
      endDate: "2017",
      bullets: [
        "Pastry team at a three-Michelin-starred restaurant under Christian Le Squer.",
        "Worked plated desserts, petit fours, and pre-desserts; promoted from commis within 14 months.",
      ],
    },
  ],
  education: [
    {
      school: "École Ferrandi Paris",
      degree: "Diplôme de Pâtisserie — Programme Intensif",
      location: "Paris, FR",
      startDate: "2012",
      endDate: "2014",
      notes: "Stages at Pierre Hermé and Hôtel Plaza Athénée during programme.",
    },
    {
      school: "Università degli Studi di Milano",
      degree: "Laurea — Scienze e Tecnologie Alimentari",
      location: "Milan, IT",
      startDate: "2008",
      endDate: "2012",
      notes: "110 e lode. Tesi sulla cristallizzazione del cioccolato.",
    },
  ],
  skills: [
    "Plated Dessert Composition",
    "Chocolate Tempering & Bonbons",
    "Sugar Work",
    "Viennoiserie",
    "Recipe R&D",
    "Brigade Mentorship",
    "HACCP",
    "Producer Sourcing",
  ],
  certifications: [
    { name: "Diplôme de Pâtisserie — École Ferrandi Paris", issuer: "École Ferrandi", year: "2014" },
    { name: "HACCP Manager — IT", issuer: "Regione Lombardia", year: "2022" },
  ],
  languages: [
    { name: "Italian", level: "C2" },
    { name: "French", level: "C2" },
    { name: "English", level: "C1" },
  ],
  awards: [
    {
      title: "Identità Golose — Pastry Chef of the Year",
      issuer: "Identità Golose",
      year: "2024",
    },
  ],
  interests: ["Botanical illustration", "Volunteer baking with Pane Quotidiano", "Hiking the Dolomites"],
};
