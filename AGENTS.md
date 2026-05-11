# Konekte agent notes

Konekte is a mobile-first verified local services marketplace for Guinea/Conakry.

Follow these rules when editing:

- Brand: use `Konekte` only, no accent.
- Public UI must be consumer-facing and mobile-first.
- Do not link `/admin` from the public homepage or header.
- Avoid public prototype/internal wording: `preview`, `Supabase`, `admin queue`, `View admin`, etc.
- Prefer `request a match`, `customer request`, and `get matched` over heavy account-registration language.
- Dropdowns should use the custom `SmoothSelect` component, not native `<select>`.
- Keep light/dark theme colors consistent via CSS variables in `src/app/globals.css`.
- Use Black/West African/Guinean-appropriate visuals or neutral placeholders.

Before finishing code changes, run:

```bash
npm run lint
npm run build
```
