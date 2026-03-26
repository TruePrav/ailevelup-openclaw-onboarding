# CONTRACT — ailevelup Personal AI Onboarding Form
*Date: 2026-03-23 | Agent: Zero*

## Goal
Build a standalone multi-step onboarding web form as a new Next.js project. Matches ailevelup.ca's dark aesthetic. Client fills this out after signing up for a personal AI. 7 sections, ~24 questions, each section on its own screen.

## Read First
- `C:\Users\TruePrav\.openclaw\workspace\agents\ailevelup\onboarding\personal-ai-intake-form.md` — full question list, all 7 sections
- Reference site for design: http://localhost:4000 (ailevelup site — dark bg, purple/blue gradients, clean modern)

---

## Tech Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- React Hook Form (for form state)
- shadcn/ui components OR hand-rolled (match ailevelup aesthetic)
- NO database needed — on final submit, save to a JSON file in `/data/submissions/` with timestamp + all answers
- NO auth needed

## Setup
```bash
npx create-next-app@latest ailevelup-onboarding --typescript --tailwind --app --no-src-dir --import-alias "@/*"
cd ailevelup-onboarding
npm install react-hook-form
```

---

## Design Requirements
Match ailevelup.ca aesthetic:
- Background: near-black (`#0a0a0f` or similar)
- Accent: purple/violet (`#7c3aed` or `#8b5cf6`)
- Text: white / white-70
- Cards/sections: subtle dark card with border (`border-white/10`)
- Buttons: purple gradient, white text, rounded
- Font: Inter or Geist (Next.js default)
- Progress bar at top showing which section they're on (1 of 7, etc.)

## Form Structure — Multi-Step

Each section = one screen. Navigation: Back / Next buttons. Progress indicator at top.

### Section 1 — The Basics (5 questions)
- Q1: Name (text input)
- Q2: Preferred messaging app (radio: Telegram / WhatsApp / iMessage / Signal / Other)
- Q3: Phone number with country code (text input)
- Q4: Timezone (text input or dropdown)
- Q5: Active hours (multi-select checkboxes: Early morning / Morning / Afternoon / Evening / Late night)

### Section 2 — Your Life & Work (4 questions)
- Q6: What do you do for work? (textarea)
- Q7: Any businesses or side projects? (textarea)
- Q8: What does a typical weekday look like? (textarea)
- Q9: Top 3 goals right now (3 separate text inputs labeled Goal 1, Goal 2, Goal 3)

### Section 3 — What You Want Your Agent To Do (2 questions)
- Q10: Capabilities checklist (multi-select checkboxes, grouped by category: Daily Ops / Research / Personal / Work & Business / Other with free text)
- Q11: The ONE most important thing (textarea, prominent styling)

### Section 4 — Communication Style (4 questions)
- Q12: How to communicate (radio: Short & direct / Friendly & conversational / Detailed & thorough / Depends — with text field)
- Q13: What your agent should NEVER do (textarea)
- Q14: Desired tone (text input with placeholder examples)
- Q15: Agent name (text input, placeholder "Alfred")

### Section 5 — Integrations (2 questions)
- Q16: Tools to access (multi-select checkboxes: Gmail / Google Calendar / Google Drive / Outlook / Notion / Slack / Shopify / WhatsApp Business / Instagram/TikTok / None yet)
- Q17: Specific monitoring requests (textarea)

### Section 6 — Privacy & Boundaries (3 questions)
- Q18: Things to keep private (textarea, optional — label it "Optional but important")
- Q19: Who else has access (radio: Only me / My assistant / Other — with text field)
- Q20: Proactive or reactive (radio: Reach out when needed / Wait for me / Mix — with description)

### Section 7 — Personality Snapshot (4 questions)
- Q21: Three words that describe how you work best (3 separate text inputs)
- Q22: What motivates you most (textarea)
- Q23: Biggest time waster right now (textarea)
- Q24: Anything else we should know (textarea, optional)

### Final Screen — Confirmation
- Thank you message: "Your agent is being built. We'll be in touch within 48 hours."
- Show summary of key answers (name, messaging app, top priority from Q11)
- "Add to calendar" button placeholder (non-functional for now)

---

## Submission Handler
On submit (after Section 7):
- Save all form data to `/data/submissions/[timestamp]-[name].json`
- Show confirmation screen
- Log to console: "New submission: [name] at [timestamp]"

## Done When
- [ ] Project created and runs with `npm run dev` on port 4001
- [ ] All 7 sections implemented with correct questions
- [ ] Progress bar shows current section (e.g. "Step 2 of 7")
- [ ] Back/Next navigation works
- [ ] Form validation: required fields block progression
- [ ] Final submission saves JSON to `/data/submissions/`
- [ ] Confirmation screen shows after submit
- [ ] Design matches ailevelup dark aesthetic (dark bg, purple accents)
- [ ] `npm run build` passes with zero errors
- [ ] Screenshot of each section saved to `/screenshots/`

## Out of Scope
- No database
- No auth
- No email sending
- No Stripe/payments
- Don't integrate into ailevelup site yet — standalone project only

## Working Directory
`C:\Users\TruePrav\Projects\ailevelup-onboarding`
