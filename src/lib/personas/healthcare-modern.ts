import type { CVData } from "@/lib/cv-types";

/** Sarah Chen — Telehealth Clinical Coordinator. Healthcare / Modern. */
export const healthcareModern: CVData = {
  basics: {
    fullName: "Sarah Chen, RN, BSN",
    role: "Telehealth Clinical Coordinator",
    email: "schen@bayhealth.virtual",
    phone: "+1 415 555 0186",
    location: "San Francisco, US",
    website: "sarahchen.health",
    linkedIn: "linkedin.com/in/sarah-chen-rn",
    photoUrl:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=faces",
    summary:
      "Registered Nurse with 9 years across acute care and digital health. I run the <strong>Bay Health virtual care service</strong> serving 14,000 patients — built the triage rubric, trained the 38-nurse team, and lifted patient-NPS from 41 to 72 in 18 months.",
  },
  experience: [
    {
      company: "Bay Health Virtual Care",
      role: "Telehealth Clinical Coordinator",
      location: "San Francisco, US",
      startDate: "2021",
      bullets: [
        "Run a 38-nurse virtual triage team supporting 14,000 patients across primary and urgent care lines.",
        "Authored the company's clinical decision rubric (60 chief-complaint pathways) — adopted org-wide and reduced unnecessary ER referrals by 31%.",
        "Patient-NPS climbed from 41 → 72 over 18 months under my coordination.",
        "Liaison between clinical staff and the engineering team for the Epic integration; cut documentation time per encounter from 7 to 3 minutes.",
      ],
    },
    {
      company: "UCSF Medical Center",
      role: "Charge Nurse, Medical-Surgical Unit",
      location: "San Francisco, US",
      startDate: "2018",
      endDate: "2021",
      bullets: [
        "Charge nurse on a 32-bed med-surg floor, managing 8–12 RNs per shift.",
        "Led the unit's transition to bedside shift report; HCAHPS communication scores rose 14 points.",
        "Preceptor for 22 new graduate nurses — retention at 12 months was 91% (system avg: 78%).",
      ],
    },
    {
      company: "Stanford Hospital",
      role: "Staff RN, Cardiac Telemetry",
      location: "Palo Alto, US",
      startDate: "2015",
      endDate: "2018",
      bullets: [
        "Cared for cardiac step-down patients — average acuity 3.5, ratio 1:4.",
        "Captain of the rapid-response committee; co-authored the unit's sepsis-recognition checklist.",
      ],
    },
  ],
  education: [
    {
      school: "University of California, San Francisco",
      degree: "BSN — Bachelor of Science in Nursing",
      location: "San Francisco, US",
      startDate: "2011",
      endDate: "2015",
      notes: "Magna cum laude. Sigma Theta Tau honor society.",
    },
  ],
  skills: [
    "Virtual Triage",
    "Epic / EHR",
    "Clinical Protocol Authoring",
    "Telehealth Workflow Design",
    "RN Preceptorship",
    "Quality Improvement",
    "Patient Education",
    "ACLS / BLS / PALS",
    "Motivational Interviewing",
  ],
  certifications: [
    { name: "RN — California Board of Nursing", issuer: "CA BRN", year: "2015" },
    { name: "ACLS Provider", issuer: "American Heart Association", year: "2024" },
    { name: "Telehealth Clinical Excellence (TCE)", issuer: "AAACN", year: "2022" },
  ],
  languages: [
    { name: "English", level: "C2" },
    { name: "Mandarin", level: "C1" },
    { name: "Spanish", level: "B1" },
  ],
  awards: [
    {
      title: "DAISY Award for Extraordinary Nurses",
      issuer: "DAISY Foundation",
      year: "2020",
    },
  ],
  interests: ["Long-distance running", "Health-tech podcasts", "Volunteer free clinics"],
};
