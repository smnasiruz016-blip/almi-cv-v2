import type { CVData } from "@/lib/cv-types";

/**
 * SAMPLE_CV_DATA — the editable starter content a new CV is seeded with.
 *
 * Why this exists: the editor preview, the form inputs, and the exported
 * PDF all render the *same* stored CVData. Seeding a blank skeleton made a
 * freshly-created CV render as empty section boxes — the design-heavy
 * templates (radar charts, retro windows, two-column layouts) looked
 * "broken" next to their fully-populated gallery thumbnail.
 *
 * Starting from complete, role-neutral sample content instead means the
 * editor opens on the same finished design the gallery shows, and the user
 * just edits the text in place (Canva-style). Every optional section is
 * populated so that whichever template the user picked, its full design is
 * visible from the first render.
 *
 * Plain strings only (no HTML) so RichText sanitize/strip pass through
 * untouched. No photoUrl — templates fall back to initials, which avoids a
 * broken-image placeholder on a brand-new CV.
 */
export const SAMPLE_CV_DATA: CVData = {
  basics: {
    fullName: "Your Name",
    role: "Your Professional Title",
    email: "you@example.com",
    phone: "+1 (555) 000-0000",
    location: "City, Country",
    website: "yourname.com",
    linkedIn: "linkedin.com/in/yourname",
    summary:
      "Write a short professional summary here. Lead with the most impressive thing you've done in the past two years, then say what you're looking for next. Replace this text with your own.",
  },
  experience: [
    {
      company: "Most Recent Company",
      role: "Your Role",
      location: "City, Country",
      startDate: "2022",
      endDate: "Present",
      current: true,
      bullets: [
        "Led a measurable outcome that mattered to the business — replace with your own.",
        "Built or shipped something that scaled to real users, revenue, or impact.",
        "Owned a process or function from end to end.",
      ],
    },
    {
      company: "Previous Company",
      role: "Earlier Role",
      location: "City, Country",
      startDate: "2018",
      endDate: "2022",
      bullets: [
        "An earlier achievement worth highlighting.",
        "A second result you're proud of.",
      ],
    },
  ],
  education: [
    {
      school: "Your University",
      degree: "BSc Your Field of Study",
      location: "City, Country",
      startDate: "2014",
      endDate: "2018",
      notes: "Honours, relevant coursework, or thesis title.",
    },
  ],
  skills: [
    "Skill One",
    "Skill Two",
    "Skill Three",
    "Skill Four",
    "Skill Five",
    "Skill Six",
  ],
  languages: [
    { name: "English", level: "Native" },
    { name: "Second Language", level: "Fluent · C1" },
  ],
  certifications: [
    { name: "Certification Name", issuer: "Issuing Body", year: "2023" },
    { name: "Another Certification", issuer: "Issuing Body", year: "2022" },
  ],
  projects: [
    {
      name: "Project Name",
      description:
        "One line on what the project was and the result it produced.",
      url: "yourname.com/project",
    },
    {
      name: "Second Project",
      description: "Another project or side initiative worth showing.",
    },
  ],
  awards: [
    { title: "Award or Recognition", issuer: "Issuing Body", year: "2023" },
  ],
  interests: ["Interest One", "Interest Two", "Interest Three"],
};

/**
 * True when a CV carries no user content — the signal that a draft should be
 * (re-)seeded with SAMPLE_CV_DATA so the editor opens on a complete design
 * rather than empty section boxes. Checks the required sections only; a CV
 * the user has actually started (a name, a job, a school, or a skill) is
 * never considered blank.
 */
export function isBlankCV(data: unknown): boolean {
  const d = (data ?? {}) as Partial<CVData> & {
    basics?: { fullName?: string };
  };
  return (
    !d.basics?.fullName?.trim() &&
    (d.experience?.length ?? 0) === 0 &&
    (d.education?.length ?? 0) === 0 &&
    (d.skills?.length ?? 0) === 0
  );
}
