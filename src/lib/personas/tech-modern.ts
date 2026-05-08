import type { CVData } from "@/lib/cv-types";

/** Jamal Wright — DevOps Lead. Tech / Modern. */
export const techModern: CVData = {
  basics: {
    fullName: "Jamal Wright",
    role: "DevOps & Platform Lead",
    email: "jamal@wright.cloud",
    phone: "+1 512 555 0177",
    location: "Austin, US",
    website: "wright.cloud",
    linkedIn: "linkedin.com/in/jamal-wright-devops",
    photoUrl:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop&crop=faces",
    summary:
      "DevOps lead with 10 years building developer-platform teams that engineers actually like working with. <strong>P50 deploy lead time: 14 minutes.</strong> Multi-region AWS, Terraform-first, and a strong belief that the platform team's job is to make every other team faster.",
  },
  experience: [
    {
      company: "Indigo Labs",
      role: "DevOps & Platform Lead",
      location: "Austin, US",
      startDate: "2021",
      bullets: [
        "Lead a 7-person platform team supporting 240 engineers across 18 product squads.",
        "Cut p50 deploy lead time from 41 to 14 minutes by replacing Jenkins with GitHub Actions + Argo CD.",
        "Designed the multi-region active-active AWS topology (us-east-1, eu-west-1, ap-southeast-2) — RTO 4 min, RPO 30s.",
        "Quarterly DORA scorecards published company-wide; lead time, change-fail rate, MTTR all in 'elite' band since Q3 2022.",
      ],
    },
    {
      company: "Stripe",
      role: "Site Reliability Engineer",
      location: "Remote / SF, US",
      startDate: "2018",
      endDate: "2021",
      bullets: [
        "On-call rotation for the payments API; primary responder for ~12 page-able incidents/quarter.",
        "Authored the team's incident-management runbook adopted across 6 SRE teams.",
        "Reduced PagerDuty noise 38% by tightening alerting thresholds based on historical resolution patterns.",
      ],
    },
    {
      company: "Atlassian",
      role: "Build Engineer → Senior Build Engineer",
      location: "Austin, US",
      startDate: "2014",
      endDate: "2018",
      bullets: [
        "Owned the Bitbucket Server build pipeline — 1,400 builds/day at the peak of the release cycle.",
        "Migrated Jira Cloud build infra from on-prem Bamboo to AWS CodeBuild; saved $1.1M/year.",
      ],
    },
  ],
  education: [
    {
      school: "Georgia Institute of Technology",
      degree: "BSc Computer Engineering",
      location: "Atlanta, US",
      startDate: "2010",
      endDate: "2014",
      notes: "Highest honors. Vice president of the BSU. Hackathon team — 3 wins.",
    },
  ],
  skills: [
    "AWS (EKS, RDS, IAM)",
    "Terraform",
    "Kubernetes / Argo CD",
    "GitHub Actions",
    "Prometheus + Grafana",
    "OpenTelemetry",
    "Incident Management",
    "DORA Metrics",
    "Cost Engineering",
    "Platform Roadmapping",
  ],
  certifications: [
    { name: "AWS Certified Solutions Architect — Professional", issuer: "AWS", year: "2023" },
    { name: "Certified Kubernetes Administrator (CKA)", issuer: "CNCF", year: "2022" },
    { name: "HashiCorp Certified Terraform Associate", issuer: "HashiCorp", year: "2021" },
  ],
  languages: [
    { name: "English", level: "C2" },
    { name: "Spanish", level: "B2" },
  ],
  awards: [
    { title: "Indigo Labs Engineering Impact Award (FY24)", issuer: "Indigo Labs", year: "2024" },
  ],
  interests: ["Mentoring through /dev/color", "Half-marathons", "Vinyl collecting"],
};
