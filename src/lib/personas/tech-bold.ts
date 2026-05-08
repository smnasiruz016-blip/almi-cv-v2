import type { CVData } from "@/lib/cv-types";

/** Alex Volkov — Senior Backend Engineer. Tech / Bold. */
export const techBold: CVData = {
  basics: {
    fullName: "Alex Volkov",
    role: "Senior Backend Engineer — Distributed Systems",
    email: "alex@volkov.dev",
    phone: "+49 30 555 0149",
    location: "Berlin, DE",
    website: "volkov.dev",
    linkedIn: "linkedin.com/in/alex-volkov-eng",
    photoUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces",
    summary:
      "Senior backend engineer with 11 years building <strong>high-throughput distributed systems</strong>. I own the payments infrastructure at Klarna serving 1.4M req/min — Go, Rust, Kafka, and a strong opinion that boring tech wins.",
  },
  experience: [
    {
      company: "Klarna",
      role: "Senior Backend Engineer — Payments Infrastructure",
      location: "Berlin, DE",
      startDate: "2021",
      bullets: [
        "Tech lead on the order-orchestration service handling 1.4M req/min at peak with p99 = 38ms.",
        "Drove the migration of the legacy authorization service from Java/Spring to Go; 64% lower infra cost, 3.2× throughput.",
        "Author of the team's exactly-once messaging pattern over Kafka — adopted by 4 other payment teams.",
        "Mentor 3 mid-level engineers; one promoted to senior in 14 months.",
      ],
    },
    {
      company: "N26",
      role: "Backend Engineer → Senior Backend Engineer",
      location: "Berlin, DE",
      startDate: "2017",
      endDate: "2021",
      bullets: [
        "Owned the card-transaction processor — 4M+ daily transactions across SEPA and Mastercard rails.",
        "Designed and shipped the real-time fraud-rules engine; reduced fraud losses 27% in 6 months.",
        "Co-author of the engineering org's incident-review template (postmortems > 200 across the org).",
      ],
    },
    {
      company: "Yandex",
      role: "Software Engineer",
      location: "Moscow, RU",
      startDate: "2014",
      endDate: "2017",
      bullets: [
        "Worked on the Yandex Search ranking pipeline — protobuf, MapReduce, C++.",
        "Filed 2 patents on incremental-index update algorithms.",
      ],
    },
  ],
  education: [
    {
      school: "Moscow Institute of Physics and Technology",
      degree: "MSc — Computer Science",
      location: "Moscow, RU",
      startDate: "2012",
      endDate: "2014",
      notes: "Distinction. Thesis on consistent-hashing variants for distributed caches.",
    },
    {
      school: "Moscow Institute of Physics and Technology",
      degree: "BSc — Applied Mathematics & Physics",
      location: "Moscow, RU",
      startDate: "2008",
      endDate: "2012",
    },
  ],
  skills: [
    "Go",
    "Rust",
    "Kafka",
    "PostgreSQL",
    "Distributed Systems Design",
    "Kubernetes",
    "gRPC / Protobuf",
    "Observability (Prometheus / OpenTelemetry)",
    "Incident Response",
    "Code Review & Mentoring",
  ],
  projects: [
    {
      name: "go-saga",
      description:
        "Open-source saga-orchestration library for Go used inside Klarna and ~40 external orgs (4.1k GitHub stars).",
      url: "github.com/avolkov/go-saga",
    },
  ],
  certifications: [
    { name: "Certified Kubernetes Application Developer (CKAD)", issuer: "CNCF", year: "2022" },
  ],
  languages: [
    { name: "English", level: "C2" },
    { name: "Russian", level: "C2" },
    { name: "German", level: "B2" },
  ],
  awards: [
    { title: "Klarna Engineering Excellence — H2 2023", issuer: "Klarna", year: "2023" },
  ],
  interests: ["Chess (FIDE 2120)", "Long-distance cycling", "Open-source maintenance"],
};
