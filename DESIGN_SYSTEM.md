# Portfolio editorial design system

## Direction and scope

Owner brief: comprehensive visual refactor supplied 2026-10-29. It supersedes the earlier permanent profile card and Sawad composition. The site remains the same React application with existing routes, localization, product acquisition, media and factual content.

## Foundations

- Canvas `#071113`; necessary media/input surfaces `#101B1E`; main type `#EDEBE5`; secondary type `#A0ADB0`; separators `#2B383C`; single primary accent `#E99530`. Secondary text is lighter than the suggested starting value to improve small-text contrast.
- Manrope variable, hosted locally as a 54 KB WOFF2. Original Google Fonts OFL license included. A single variable file avoids multiple weight downloads. Consolas is reserved for small terminal details.
- Fluid display, page, section and project scales are defined in `portfolio.css`; 16px body, 1.7 line height, limited reading widths. Sentence case replaces the previous all-capital split titles.
- 1200px content maximum, 12-column grid, fluid gutters and a 4/8/12/16/24/32/48/64/96 spacing scale. Mobile changes composition instead of retaining the desktop sidebar.

## Compositional decisions

- Header: compact name, plain navigation and ES/PT/EN. One underline indicates the active route. Mobile uses a labelled disclosure menu rather than tiny icon labels. Project links remain directly discoverable.
- Home: name, specialty, short introduction and contact/CV actions balance the actual portrait. Projects follow directly. Background and language information live below the work rather than repeating above it.
- Projects: wide real screenshots with a reading column. Client software and personal product have distinct metadata/actions and alternate image placement. Media backgrounds separate original screenshots from the page, without card chrome or invented previews.
- Case studies: headline, factual metadata and full-width image establish the software first. Section headings and reading copy share a grid. Architecture remains at a sensible source-image size. Production/local/pending states and dated verification evidence remain explicit.
- Experience: date column and responsibility column; h2 roles support scanning without identical cards.
- Capabilities: five application areas with project context; logos no longer substitute for evidence of use. Coursework remains explicitly distinguished.
- Education: primary qualification and pending thesis separated from completed course/certificate chronology. Modal evidence and original English PDF remain available.
- Contact: direct business email and LinkedIn lead; optional form creates the same mailto draft. No budget field or large colored container.
- Footer: restrained terminal identity retained, without repeating the entire profile, nationality, stack and languages.

## Interaction

Short opacity transitions only; no layout movement, image zoom or animated decoration. Native details disclosures, visible focus indicators, Escape closure for mobile navigation, reduced-motion support and normal page scrolling. Original product visuals retain their colors.
