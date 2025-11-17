## Goal
Add a "Featured Work" section immediately after the Services section on the homepage, matching the provided design while maintaining site colors and existing patterns.

## Placement
- File: `app/page.tsx`
- Insert new section right after the Services section end (`app/page.tsx:1271–1274`), before the footer.

## Design & Layout
- Background: `bg-black` with subtle neutral/gray surfaces (`bg-gray-900/50`, `border-gray-800`) to match current site.
- Accent: Use `bg-primary` (`#fffc36`) and black text for CTAs, consistent with site.
- Header row:
  - Left: small label "Featured Work" with icon/marker and a CTA button `Explore all Projects`.
  - Right: heading "Showcasing My Work for Your Inspiration" and a short descriptive paragraph.
- Grid: 2×2 responsive grid of cards (mobile 1 column) with:
  - Grayscale images (`filter grayscale`, `hover:grayscale-0`), aspect ratio `aspect-video`.
  - Title and short description below each image.
  - One card includes a yellow `View Project` button.

## Data Source
- Reuse existing `projects` array in `app/page.tsx` for content.
- Pick 4 items with existing public assets: `vital.png`, `culture.png`, `jome.png`, plus a safe fallback image (e.g., `vsstudio.png`) for the fourth card.
- Title/description pulled from each project’s `title` and `description`.

## Interactions
- Clicking a card or the `View Project` button calls `setSelectedProject(index)` to open the existing Project Modal (`app/page.tsx:1411–1507`).
- CTA `Explore all Projects` links to `/#projects` (keeps URL stable; can re-point later to a dedicated list).

## Implementation Notes
- Use `next/image` with `unoptimized` for local assets.
- Tailwind classes mirror the Services section style: rounded-2xl, border, subtle gradient overlay on hover, concise typography.
- Maintain accessibility: alt text on images, button roles, focus states.

## Verification
- Run the site locally and scroll past Services:
  - Confirm the header, CTA, and 4-card grid render.
  - Confirm grayscale/hover transitions and colors match.
  - Click a card and ensure the project modal opens with the correct content.
  - Check responsiveness at mobile/desktop.

## Future-Friendly Hooks
- If you prefer another destination for `Explore all Projects`, I can point it to `gallery/` or add a full projects list section later.