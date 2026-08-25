---
title: "Knockout Questions: The Only Part of the Application That Auto-Rejects"
description: "You can rewrite your CV ten times and the software will never reject it. The yes/no questions you click through in thirty seconds are where documented auto-rejection actually lives."
section: "Applications"
order: 22
cta:
  label: "Browse the templates"
  href: "/templates"
  note: "ATS-safe templates, built into the subscription"
related:
  - label: "The rest of the machine"
    slug: "cv-what-ats-actually-does"
  - label: "The rejection folklore"
    slug: "cv-the-famous-statistics"
  - label: "What recruiters actually search"
    slug: "cv-tailoring"
sources:
  - label: "Greenhouse Support — Auto-reject"
    url: "https://support.greenhouse.io/hc/en-us/articles/360000653472-Auto-reject"
  - label: "Ashby Knowledge Base — Auto-Reject Applications"
    url: "https://docs.ashbyhq.com/auto-reject-applications"
  - label: "Oracle Taleo — Candidate Prescreening"
    url: "https://docs.oracle.com/en/cloud/saas/taleo-enterprise/21b/otrec/candidate-prescreening.html"
  - label: "iCIMS — Pre-screening questions"
    url: "https://www.icims.com/en-gb/blog/pre-screening-interview-questions/"
  - label: "Teamtailor Support — Triggers"
    url: "https://support.teamtailor.com/en/articles/1475768-triggers"
---

People rewrite their CV ten times before applying, terrified a robot will bin it for the wrong
font. Then they hit the application form's dropdown questions and click through them in thirty
seconds. **That is exactly backwards.** No vendor documentation we could find says an ATS rejects
a CV for formatting or missing keywords — but three major vendors document, in their own help
centres, that an answer to a screening question can reject you automatically.

## The failure

The failure is speed in the wrong place. The screening questions — yes/no, single-select,
multi-select — are the one part of the application where major systems are documented to act
without a human. Greenhouse's own support article on its Auto-reject feature says it plainly:

> "based on an applicant's answer to a question, they will automatically be rejected as a
> potential candidate"

Rush those questions, misread one, or answer the question you assumed was being asked rather
than the one on the screen, and no recruiter ever weighs your carefully rewritten CV against it.
Greenhouse even documents that recruiters may never see it happen: "Anyone set up to receive
notifications about new candidate applications will not be notified of auto-rejected applicants."

## What a knockout question is

A knockout question (Taleo calls it a disqualification question, iCIMS calls it a dealbreaker
question) is a structured question on the application form with one acceptable answer, set by the
employer. Oracle's Taleo documentation defines it:

> "A disqualification question is a single-answer question that contains the minimum requirements
> for a candidate to be eligible for a job. A candidate not meeting the required response can be
> instantly exited from the application process."

iCIMS, writing for employers, is blunter about the purpose: dealbreaker questions "aren't really
about getting to know a candidate. They're about eliminating bad fits", and "typically, there is
only one correct answer, at least in terms of moving forward."

They appear on the application form itself — after the CV upload, usually as the dropdowns and
radio buttons near the end. They are not hidden analysis of your CV text. **The system is not
reading between your lines; it is reading your clicks.**

## How each vendor's mechanism works

| Vendor | Documented mechanism | When it runs |
|---|---|---|
| Greenhouse | Employer-configured Auto-reject rules on "Yes / No, Single-select, Multi-select" questions; "Candidates who respond to the question with the designated response will now be auto-rejected". Employers "can also automatically assign a rejection reason and send an email". A paid feature: "Available for Plus and Pro subscription tiers". | On the flagged answer |
| Oracle Taleo | Disqualification questions; the candidate "can be instantly exited from the application process" | Instantly, mid-application |
| Ashby | Rules that "reject candidates whose application submissions match certain conditions automatically" — configured against application-form questions. Employers can "configure the number of business days to delay the rejection email". | Only "at the point of the candidate's application submission" |

Two details in there are worth sitting with. Ashby's delayed rejection email means a rejection
decided by a rule at the moment you clicked Submit can arrive days later, looking considered.
And Greenhouse's suppressed notifications mean an auto-rejected application can vanish without
any human at the company registering it existed.

## What they screen for — illustratively

The vendor documentation describes the mechanism, not the employers' question banks. What Taleo
does say is that these questions carry "the minimum requirements for a candidate to be eligible
for a job" — hard eligibility floors, not preferences. So the *kind* of thing a knockout question
asks — the right to work in a country, a licence or certification the role legally requires, a
non-negotiable minimum — follows from that definition. **Treat these examples as illustrative:
every employer writes and configures its own questions, and most vendors don't publish what
their customers ask.**

Worked example — an illustrative Taleo-style question, read slowly:

> "Do you hold a full, valid driving licence?" — Yes / No

Read fast, you might answer for the licence you're two weeks from getting, or the overseas
licence you haven't converted. The system doesn't know your circumstances; it knows Taleo lets
the employer mark one response as disqualifying and exit you "instantly". If the honest answer
is no, the honest answer is still no — and the thirty seconds you'd spend deciding whether the
question means what you think it means is the highest-leverage thirty seconds in the whole
application.

## The honest advice

**Answer truthfully — a false yes is worse than a rejection.** These questions encode minimum
requirements. If you answer yes to something that is checkable — and eligibility questions
usually are — the discrepancy surfaces later, at reference, offer or onboarding stage, after
you've invested weeks. A knockout rejection costs you one application. A discovered false answer
costs you the offer and the relationship.

**Slow down where the automation actually is.** The documented picture across vendors is that CV
review is a human workflow (Ashby's application review requires "hiring manager privileges or
higher"; Greenhouse says "humans decide how to advance, reject, or follow up with each
candidate"), while structured answers are where employer-configured rules fire. Your CV
formatting deserves care because humans read it — not because software rejects it. The questions
deserve care because software acts on them.

## What is not documented

Honesty about the edges of the record:

- **Lever and SAP SuccessFactors:** their screening mechanics could not be verified from vendor
  documentation (both help sites resisted extraction), so nothing here describes them. Absence
  of a quote is not absence of a feature.
- **Workday:** disqualifying application questionnaires are widely reported, but no Workday
  documentation confirming automatic disqualification was captured — so we don't assert it.
- **iCIMS:** its docs verify scoring and weighting of screening answers for recruiters to view;
  whether answers can automatically change a candidate's status was not verified.
- **One outlier:** Teamtailor documents triggers that "automatically move candidates to another
  stage" based on criteria including "keywords in their resume" — the only vendor-documented
  automation keyed to CV text, admin-activated and employer-configured.
- **Employers configure all of this differently.** Greenhouse's auto-reject is tier-gated and
  opt-in; Taleo's questions are written per job. The same ATS behaves differently at every
  company, so check the employer's own application guidance where it exists.

## What actually costs you

- Clicking through screening questions at speed — that's where documented auto-rejection lives.
- Answering the question you expected instead of the question on the screen.
- A false yes on a checkable eligibility question — discovered later, when it costs more.
- Assuming a days-later rejection email means a human read your CV; Ashby documents the delay.
- Spending all your care on formatting fear while the structured answers carry the automated
  weight.

## Build it

Get the CV part right once — parseable, specific, human-readable — then spend your saved
attention where the automation is.

**[Browse the templates →]** — ATS-safe templates, built into the subscription.
