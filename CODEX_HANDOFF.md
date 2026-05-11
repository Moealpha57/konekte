# Codex handoff prompt for Konekte

Use this as the first prompt in Codex Desktop:

```text
You are working on Konekte, a mobile-first verified local services marketplace for Guinea/Conakry.

The product is not just a tutoring site. It should feel like a clean local Fiverr/Upwork-style marketplace for trusted local providers. Launch categories are tutoring, photography, housekeeping, web design, and website creation.

The target users are everyday customers/families in Guinea who want to find reliable service providers. The app should feel simple, premium, trustworthy, and easy to use on a phone.

Important product direction:
- Keep the public UI clean and consumer-facing.
- Do not expose admin/internal dashboards or prototype language on public pages.
- Avoid words like “preview,” “Supabase,” “admin queue,” or anything that makes the site feel unfinished.
- Use “customer request,” “request a match,” or “get matched” instead of heavy account registration language.
- Admin routes can exist privately, but should not be linked from the public homepage/navigation.
- Dropdowns should be smooth custom menus, not ugly browser-native selects.
- The site should work well in light and dark mode.
- Keep the brand name as “Konekte” with no accent.
- Keep the design minimal, smooth, modern, and mobile-first.
- Use Black/West African/Guinean-appropriate visuals or neutral placeholders, not random generic white stock photos.

Your first task:
Audit the current app for public-facing UX problems, especially mobile layout, dropdown layering, theme/color issues, admin/internal wording, and prototype copy. Then fix the highest-impact issues without changing the overall app architecture.

After changes:
- Run npm run lint
- Run npm run build
- Summarize exactly what files changed and what was fixed.
```
