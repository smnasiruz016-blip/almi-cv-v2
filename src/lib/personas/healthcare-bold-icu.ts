import type { CVData } from "@/lib/cv-types";

/**
 * Maria Santos, BSN RN CCRN — ICU Registered Nurse.
 * Healthcare / Bold — paired with healthcare-bold-icu-nurse-v1.
 *
 * Cultural anchor: Filipino. Filipino nurses are the largest
 * nurse-exporting nationality globally and the most underserved
 * demographic by mainstream CV builders. The persona signals the
 * paid library is built for them; the recipe's `cultural_fit` array
 * extends visibility to Gulf, Singapore, UK, and Ireland — the
 * primary destinations for the Filipino nursing diaspora.
 *
 * Sibling persona to healthcare-bold (Dr. James Okafor, ER Surgeon)
 * — kept separate per Phase 5b Q3.
 */
export const healthcareBoldIcu: CVData = {
  basics: {
    fullName: "Maria Santos",
    role: "ICU Registered Nurse · BSN, RN, CCRN",
    email: "m.santos.rn@inbox.health",
    phone: "+966 11 442 7530",
    location: "Riyadh, SA",
    website: "mariasantos-rn.health",
    linkedIn: "linkedin.com/in/maria-santos-rn",
    photoUrl:
      "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=400&fit=crop&crop=faces",
    summary:
      "Dedicated and compassionate <strong>ICU Registered Nurse</strong> with <em>seven years of critical-care experience</em> across cardiopulmonary, neuro, and post-surgical units. Committed to delivering high-quality patient care while utilising advanced medical knowledge and skills. Looking to leverage expertise in a dynamic healthcare environment to enhance patient outcomes.",
  },
  experience: [
    {
      company: "King Faisal Specialist Hospital & Research Centre",
      role: "ICU Registered Nurse",
      location: "Riyadh, SA",
      startDate: "Jun 2019",
      bullets: [
        "Provide comprehensive care to critically ill patients, collaborating with multidisciplinary teams to ensure optimal treatment plans and timely interventions.",
        "Lead point-of-care for ventilator management, hemodynamic monitoring, and titrated vasopressor therapy across a 22-bed cardiothoracic ICU.",
        "Mentor 4 newly-licensed nurses through orientation; charge nurse rotation 2 nights per week.",
        "Member of the Rapid Response Team — first-call clinician for code-blue events on surgical floors.",
      ],
    },
    {
      company: "Makati Medical Center",
      role: "Emergency Room Nurse",
      location: "Manila, PH",
      startDate: "Aug 2014",
      endDate: "May 2019",
      bullets: [
        "Delivered efficient emergency care, triaging patients and assisting in life-saving procedures while maintaining a calm and supportive environment.",
        "Anchored the night-shift trauma bay during the 2017 Marawi displacement surge — 60+ patients per shift across penetrating-trauma and pediatric cases.",
        "BLS and ACLS instructor for incoming nursing staff; led the unit's annual mass-casualty drill.",
      ],
    },
    {
      company: "Quirino Memorial Medical Center",
      role: "Staff Nurse — Medical-Surgical Unit",
      location: "Quezon City, PH",
      startDate: "Aug 2012",
      endDate: "Jul 2014",
      bullets: [
        "Provided post-operative care for general-surgery and orthopedic patients across a 40-bed ward.",
        "Coordinated discharge planning with social workers and family — reduced 30-day readmission on the unit by 11%.",
      ],
    },
  ],
  education: [
    {
      school: "University of the Philippines Manila",
      degree: "Bachelor of Science in Nursing",
      location: "Manila, PH",
      startDate: "Aug 2008",
      endDate: "May 2012",
      notes: "Intensive care management and patient stabilisation focus.",
    },
  ],
  skills: [
    "Patient care",
    "Medical procedures",
    "Healthcare software",
    "Excellent communication",
    "Critical thinking",
    "Teamwork",
    "Hemodynamic monitoring",
    "Mechanical ventilation",
    "IV therapy & central-line care",
    "Sepsis & rapid-response protocols",
  ],
  certifications: [
    {
      name: "Critical Care Registered Nurse (CCRN)",
      issuer: "American Association of Critical-Care Nurses",
      year: "2021",
    },
    {
      name: "Advanced Cardiovascular Life Support (ACLS)",
      issuer: "American Heart Association",
      year: "2015",
    },
    {
      name: "Basic Life Support (BLS) Instructor",
      issuer: "American Heart Association",
      year: "2017",
    },
    {
      name: "Saudi Council for Health Specialties — Registered Nurse",
      issuer: "Saudi Commission for Health Specialties",
      year: "2019",
    },
    {
      name: "Philippine Nurses Licensure",
      issuer: "Professional Regulation Commission, Philippines",
      year: "2012",
    },
  ],
  languages: [
    { name: "English", level: "C2" },
    { name: "Filipino (Tagalog)", level: "C2" },
    { name: "Arabic", level: "B1" },
  ],
  awards: [
    {
      title: "Nurse of the Quarter — Cardiothoracic ICU",
      issuer: "King Faisal Specialist Hospital",
      year: "2024",
    },
    {
      title: "Patient Safety Champion Award",
      issuer: "Makati Medical Center",
      year: "2018",
    },
  ],
  interests: [
    "Cardiac rehabilitation community programs",
    "Filipino Nurses Association volunteer",
    "Long-distance running",
  ],
};
