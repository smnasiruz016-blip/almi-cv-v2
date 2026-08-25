---
title: "What an ATS Actually Does to Your CV — In the Vendors' Own Words"
description: "Workday says its AI doesn't make hiring decisions. Greenhouse says matching never auto-rejects. The companies that build the software contradict the folklore — here's what their documentation actually says."
section: "Myths and data"
order: 40
cta:
  label: "Browse the templates"
  href: "/templates"
  note: "ATS-safe templates, built into the subscription"
related:
  - label: "Where the famous numbers really come from"
    slug: "cv-the-famous-statistics"
  - label: "What vendors say about PDF"
    slug: "cv-file-format-pdf-or-docx"
  - label: "The content the recruiter searches for"
    slug: "cv-quantified-bullets"
  - label: "LinkedIn vs CV: the other search index"
    slug: "cv-linkedin-vs-cv"
sources:
  - label: "Workday Blog — Demystifying AI in Hiring"
    url: "https://blog.workday.com/en-us/demystifying-ai-hiring-clarifying-how-workdays-recruiting-tools-work.html"
  - label: "Greenhouse Support — Unsuccessful resume parse"
    url: "https://support.greenhouse.io/hc/en-us/articles/200989175-Unsuccessful-resume-parse"
  - label: "Greenhouse Support — Auto-reject"
    url: "https://support.greenhouse.io/hc/en-us/articles/360000653472-Auto-reject"
  - label: "Greenhouse Support — MyGreenhouse FAQ for Candidates"
    url: "https://support.greenhouse.io/hc/en-us/articles/43418495049499-MyGreenhouse-FAQ-for-Candidates"
  - label: "iCIMS — Applicant Tracking System glossary"
    url: "https://www.icims.com/glossary/applicant-tracking-system-ats/"
---

Every CV-prep site describes the same monster: a robot gatekeeper that scans your CV, scores
your keywords, and bins 75% of applicants before a human ever looks. The companies that build
the software describe something much less dramatic. Workday, in its own words: **"Workday AI
does not make hiring decisions."** Greenhouse, in its FAQ written for candidates: Talent
Matching "does not automatically advance or reject candidates."

This page quotes the vendors' own documentation — help centres, admin guides, candidate
FAQs — not the folklore built on top of them.

## The failure

The failure this page prevents is optimising for the wrong machine. People stuff keywords,
buy "ATS-beating" rewrites, and shave their CV into robot-speak — while ignoring the two
things vendor docs say actually matter: whether the CV **parses** cleanly, and how they
answer the **screening questions** on the application form. The robot they fear is not the
one that exists.

## What parsing actually is — and where it breaks

Parsing is data entry, not judgement. iCIMS describes it as software that "extracts data,
usually from a Word or PDF document, and converts it in a structured way" — contact details,
experience, and so on — into a searchable profile. Workday's explainer says parsing can "Pull
critical details from incoming applications without manual data entry, turning documents into
searchable profiles."

It breaks on decoration. Greenhouse's support article "Unsuccessful resume parse" lists the
causes in plain terms: "Resumes that include graphics, photos, or word art"; "Complex resumes
with tables, headers, and footers"; "Resumes with the name and contact information in the
header, footer, or text box"; "Resumes that have a columned layout". Workday's admin guide
agrees: "Resume parsing results can vary based on resume format and order of words. For best
results, use resumes that don't have images or image-based styles."

**Note what a failed parse does NOT do: reject you.** Greenhouse's own consequence is
mundane — "If a resume fails to parse, you'll need to manually input the candidate's details
into the fields." The cost is a messy profile and recruiter friction, not a bin.

Greenhouse also tells candidates directly what to do about it:

> "Resume parsing is designed to save time, but can make mistakes. Be sure to review and edit
> your information before saving your profile and before submitting all applications."

And, from the same candidate FAQ: "Upload a PDF for best results."

### Worked example: what the parser sees (coaching example, not from a vendor doc)

Take a decorative header — the kind templates love:

```
┌────────────┬──────────────────────────────┐
│  [PHOTO]   │   A M I R A   H A S S A N    │
│  ● ● ● ●   │   Text box: amira@ex.com     │
│  skill bar │   ☎ in an icon, no digits    │
└────────────┴──────────────────────────────┘
```

Against Greenhouse's failure list this header scores four hits: a graphic (photo), a columned
layout, contact details in a text box, and icon-based information a text extractor may skip.
Plausible parse result: name split across letter-spacing, no phone captured, email lost with
the text box — a profile the recruiter has to rebuild by hand.

The plain version:

```
Amira Hassan
amira@example.com · +44 7700 900000 · London
```

Three lines of ordinary text, nothing on Greenhouse's list. Same person, clean fields. That —
not keyword density — is what "ATS-friendly" means in the vendors' own documentation.

## Where auto-rejection really comes from

Auto-rejection is real. It just isn't triggered by your CV — it's triggered by your **answers
to structured questions**, under rules the employer switches on.

Greenhouse's "Auto-reject" article: "based on an applicant's answer to a question, they will
automatically be rejected as a potential candidate" — and the rules "can only be configured
for questions of the following type: Yes / No, Single-select, Multi-select". Oracle Taleo
documents the same mechanism: "A disqualification question is a single-answer question that
contains the minimum requirements for a candidate to be eligible for a job. A candidate not
meeting the required response can be instantly exited from the application process." Ashby's
rules likewise "can only be configured to run at the point of the candidate's application
submission", against application-form questions.

So the questions about work authorisation, licences, and location are the actual gate.
**Answer them truthfully — and answer them carefully, because they, not your font, are what
an ATS can reject on.**

## Recruiters search; the system stores

For the CV itself, vendor docs describe retrieval, not filtration. Workday: "Recruiters can
also search profiles manually using filters such as years of experience or required
certifications." LinkedIn Recruiter is built on recruiters who "enter and edit Boolean search
strings" across "40+ advanced search filters". Greenhouse says of its matching AI that
"humans decide how to advance, reject, or follow up with each candidate", and its company
line is blunter still: "We see AI as a co-pilot, not an auto-pilot."

That is why specific, concrete wording matters — not to please a scoring robot, but because a
recruiter typing a search needs your CV to contain the terms they search for.

## The honest tension — and where the 75% came from

Not every vendor page sings the same tune. iCIMS's own ATS glossary claims the system can
"Automatically filter out candidates who are not viable" and that "Your system will
automatically screen out applicants who are not ideal candidates" — the strongest
auto-screening language on any vendor property, sitting in open tension with Workday's
"Workday AI does not make hiring decisions" and Greenhouse's "Talent Matching does not
auto-reject or auto-advance any candidate". The likely reconciliation is that iCIMS is
describing knockout questions and ranking, both employer-configured — but as published, the
vendors contradict each other, and you should know both framings exist.

As for the famous 75%: no study has ever been produced. Recruiter Jan Tegze traced it to a
2014 Forbes contributor piece by "the founder of a resume service", an unsourced 2018 CIO.com
line, and the now-defunct resume-optimisation vendor Preptel. When Enhancv interviewed 25 US
recruiters in 2025, "23 of 25 (92%) said rejections are manual or triggered only by
eligibility filters — never by formatting or missing keywords." The number selling you
ATS-beating services was itself marketing by an ATS-beating service.

## What isn't settled

- Teamtailor is the one vendor whose docs show automation keyed to CV content: triggers can
  move candidates between stages "based on criteria such as … keywords in their resume" — an
  employer-activated add-on. Stage moves, but it exists; the picture is not uniform.
- Lever and SAP SuccessFactors documentation could not be captured for this research, so
  nothing here speaks for them.
- No vendor documentation was found saying a CV is rejected for formatting or missing
  keywords — but absence of documentation is not proof no employer configures aggressively.

## What actually costs you

- A decorative layout that parses into a garbled profile a busy recruiter must fix by hand.
- Skipping the parse-review step Greenhouse explicitly tells candidates to take.
- Vague wording that never matches what a recruiter would type into search.
- Rushed or careless answers to knockout questions — the one place auto-rejection is real.
- Money spent on "beating" a scoring robot the vendors say is not making the decision.

## Build it

Be parseable, be specific, answer the screening questions truthfully. That is the whole
vendor-documented playbook — and it needs a clean template, not a trick.

**[Browse the templates →]** — ATS-safe templates, built into the subscription.
