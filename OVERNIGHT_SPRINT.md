# Konekte Overnight Sprint Plan

Generated for Moe on 2026-05-10.

## Current verified state
- Next.js 14 app at `/home/bot/hermes-builds/konekte`.
- Dev server verified locally on `http://127.0.0.1:3000`.
- `npm run lint`: passes with 2 image optimization warnings.
- `npm run build`: passes.
- No git repository initialized in this folder.

## Existing app surface
- Home page: `/`
- Tutor search/listing: `/tuteurs`
- Tutor detail: `/tuteurs/[id]`
- Admin page: `/admin`
- Mock tutor data in `src/lib/mock-data.ts`
- Supabase schema stub in `supabase/schema.sql`
- Bilingual/theme controls exist via app components/scripts.

## Guardrails
- OK to make L1 improvements autonomously: copy cleanup, UX polish, mock data expansion, README/status docs, tests, smoke checks, admin UX placeholders.
- Pause for Moe before L2/L3: architecture changes, production deploy, public preview tunnel, code commits to repo Moe cares about, credentials/security changes, sending business messages, spending money.

## Product direction from Moe
- Long-term: Konekte should become a local services marketplace like Fiverr/Upwork, starting with tutoring and expanding later to photographers/events/weddings and other service categories.
- Initial wedge: wealthy parents/families need tutors for their kids; college students or teachers want to earn money by teaching at homes.
- Trust problem: Konekte must eventually prove providers are valid (school/degree/ID/reference checks, badges, verification levels).
- Monetization concern: users may bypass the app after connecting directly; v1 should test monetization without heavy payments infrastructure.
- Likely connection channel: WhatsApp, at least initially.
- Maria/Mariama is Moe’s sister and can be the face/source partner, but product branding should stay Konekte and not overuse her name.
- Bigger goal: Apple App Store + Google Play Store.

## Recommended overnight scope
1. Reframe Konekte from “tutor directory” into “trusted local services marketplace, starting with tutors.”
   - homepage value proposition should hint at expansion without bloating v1
   - tutor flow remains first category
   - service-category architecture/copy prepared for future photographers/events
2. Build a real lead/request flow concept:
   - Parent selects subject/location/language/budget
   - WhatsApp Konekte concierge or prefilled request starts matching
   - Avoid direct phone-first if monetization/control matters
3. Improve trust/verification UX:
   - provider badges: student tutor, teacher, ID checked, school verified, references available
   - explain “verified profiles” without claiming background checks not done yet
4. Expand realistic mock data:
   - 8–12 tutors
   - neighborhoods across Conakry
   - subjects/languages/prices
   - provider types and verification badges
5. Add monetization-ready product hooks without charging yet:
   - “request through Konekte” concierge CTA
   - lead status/admin language
   - future service fee/success fee copy kept internal or subtle
6. Polish mobile UX:
   - smooth, app-like web experience
   - strong CTAs
   - clean cards and details
7. QA:
   - lint/build
   - browser smoke flow
   - screenshot/recording artifact

## Decisions needed from Moe

### 1. Primary target for v1
Default if no answer: parents in Conakry looking for affordable vetted tutors.
Options:
- A: parents/families
- B: tutors looking for students
- C: schools/institutions
- D: both parents + tutors, parent side first

### 2. Business model
Default: concierge marketplace — collect parent request, match manually, charge commission later.
Options:
- A: free directory first
- B: concierge matching via WhatsApp
- C: paid tutor subscriptions/listing
- D: commission per booked session

### 3. Contact flow
Default: WhatsApp-first.
Options:
- A: WhatsApp tutor directly
- B: WhatsApp Konekte concierge first
- C: in-app booking request form
- D: show phone only after request

### 4. Tutor trust level
Default: “verified profiles” but not claiming background checks yet.
Options:
- A: student tutors verified by school/ID
- B: professional teachers only
- C: mix of students + teachers
- D: all tutors but labeled by verification level

### 5. Brand voice
Default: premium but local: clean, trustworthy, Guinean, family-first.
Options:
- A: warm/community
- B: premium/private-school
- C: youth/startup/energetic
- D: government/NGO/trust-heavy

### 6. Language priority
Default: French primary, English toggle, local language labels where useful.
Options:
- A: French only for v1
- B: French + English
- C: French + English + Pular/Soussou/Maninka tags only

### 7. Launch artifact tomorrow
Default: local verified prototype + screenshots/video, no public URL unless approved.
Options:
- A: polished local prototype
- B: public temporary preview link (requires explicit L2 approval)
- C: GitHub repo + Vercel deploy (requires repo/commit/deploy approval)
- D: pitch/demo page only

## If Moe gives no more detail tonight
Proceed with defaults above and produce:
- changed files summary
- screenshots/recording
- build/lint results
- next approval gates
