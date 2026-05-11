# Konekte

Konekte is a mobile-first verified local services marketplace for Guinea/Conakry.

It is not just a tutoring site. The product direction is a clean local Fiverr/Upwork-style marketplace for trusted providers, starting with:

- Tutoring
- Photography
- Housekeeping
- Web design
- Website creation

## Product principles

- Public UI should feel clean, simple, premium, trustworthy, and mobile-first.
- Keep the brand as `Konekte` with no accent.
- Do not expose admin/internal dashboards from public navigation or homepage cards.
- Avoid prototype/internal words on public pages: `preview`, `Supabase`, `admin queue`, `View admin`, etc.
- Use customer-friendly language like `request a match`, `customer request`, and `get matched` instead of heavy account registration language.
- Dropdowns should be smooth custom menus, not native browser selects.
- Light and dark mode should both look intentional.
- Use Black/West African/Guinean-appropriate visuals or neutral placeholders.

## Local setup

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## Quality checks

```bash
npm run lint
npm run build
```

Known non-blocking warnings: Next.js warns about using `<img>` in provider cards/detail pages. That is acceptable until image optimization is in scope.

## Key files

- Homepage: `src/app/page.tsx`
- Services listing: `src/app/tuteurs/page.tsx`
- Customer request page: `src/app/compte/page.tsx`
- Provider application page: `src/app/postuler/page.tsx`
- Copy/i18n: `src/lib/i18n.ts`
- Smooth dropdowns: `src/components/SmoothSelect.tsx`
- Theme/styles: `src/app/globals.css`
- Admin route exists at `/admin`, but should remain unlinked from the public UI.
