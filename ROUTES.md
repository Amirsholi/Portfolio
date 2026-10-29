# Portfolio route map

## Public pages

| Route | Surface | Purpose |
| --- | --- | --- |
| `/` | Portfolio | Short personal introduction and links to independently navigable portfolio pages. |
| `/?file={id}` | Portfolio workspace | Legacy case-study workspace: opens the selected file and brings the editor into view. |
| `/samplex` | SampleX | Product landing, ZIP access, workflow, privacy and lifetime license. |
| `/samplex/success?checkout_id={id}` | SampleX fulfillment | Retrieves and displays the signed license after checkout. |
| `/samplex/privacy` | Legal | SampleX privacy policy. |
| `/samplex/terms` | Legal | SampleX terms. |
| `/samplex/refunds` | Legal | SampleX refund policy. |
| `/samplex/support` | Support | SampleX support and license recovery information. |
| `/admin/samplex` | Private operations | Authenticated SampleX license administration. Not linked publicly. |
| `/api/samplex/events` | Public API | Accepts allowlisted anonymous Demo Trial and checkout-interest counters. |
| `/api/admin/licenses` | Private API | Returns licenses and 30-day product metrics; also issues manual licenses. |

## Workspace deep links

### UnderFit

| File | URL |
| --- | --- |
| `overview.md` | `/?file=overview` |
| `entry-video.demo` | `/?file=entry-video` |
| `cash-dashboard.view` | `/?file=cash-dashboard` |
| `add-member.form` | `/?file=add-member` |
| `renew-subscription.flow` | `/?file=renew-subscription` |
| `access-history.log` | `/?file=access-history` |
| `administration.panel` | `/?file=admin` |
| `system-flow.diagram` | `/?file=system-flow` |

### SampleX workspace case study

| File | URL |
| --- | --- |
| `overview.md` | `/?file=samplex-overview` |
| `recording.demo` | `/?file=samplex-recording` |
| `trimming.demo` | `/?file=samplex-trimming` |
| `processing.view` | `/?file=samplex-processing` |
| `download.flow` | `/?file=samplex-download` |

### Profile

| File | URL |
| --- | --- |
| `contact.md` | `/?file=contact` |
| `education.records` | `/?file=education` |
| `experience.log` | `/?file=experience` |
| `stack.tools` | `/?file=stack` |

## Routing behavior

- Opening a workspace file pushes its URL into browser history.
- Browser Back and Forward restore the selected file and folder state.
- Reloading a deep link preserves the selected file.
- Unknown `file` values safely fall back to `contact.md`.
- Legacy `/#samplex` and `/#buy-samplex` links redirect to `/samplex`.
- Vercel rewrites all routes to `index.html`; React selects the correct surface client-side.

## Redesign preview (2026-10-28)

- `/` now renders the continuous Sawad-style portfolio: profile, projects, experience, tools, education and contact.
- Section links: `/#home`, `/#projects`, `/#experience`, `/#tools`, `/#education`, `/#contact`.
- Existing `/?file={id}` links retain the previous workspace case-study surface during the transition.
- `/samplex`, fulfillment, legal pages and `/admin/samplex` retain their existing routing.
- Contact creates a mailto draft for the visitor to send; it does not submit to a server.

## Short-page portfolio navigation

| URL | Content |
| --- | --- |
| `/` | Personal introduction, working focus and CV |
| `/projects` | UnderFit and SampleX summaries, workflow details and case-study/product links |
| `/experience` | Roles, dates, responsibilities and operational experience |
| `/tools` | Technologies and concrete application areas |
| `/education` | Individual programs, dates, durations and certificate previews |
| `/contact` | Direct email, LinkedIn and contact email draft |

Navigation uses native links with client-side history updates. Back/Forward and refresh restore the page. Old section fragments resolve to the corresponding short page. Legacy `?file=` case studies remain available.


## Shared contact and nested projects (current)

- `/projects/underfit`: independent UnderFit case study with architecture evolution, operational workflows and enlargable captures.
- `/projects/samplex`: independent SampleX case study with capture, trimming, analysis and WAV export details.
- Both are nested under Projects in the main navigation. `/samplex` remains the acquisition landing.
- Contact is a persistent form below all portfolio pages, outside the animated page content; no Contact navigation entry.
- `/contact` is a legacy entry resolving to the homepage with the shared contact form available below.

## Project discovery and persistent navigation

- Projects in the persistent header opens a menu with All projects, UnderFit and SampleX. Home provides direct project cards as well.
- `/projects/samplex` includes the direct public v0.3.0-demo ZIP download, installation summary and product landing link.
- Portfolio header and profile remain sticky in natural page flow; the compact mobile profile also remains visible.
- Current UI palette applies across portfolio, legacy file routes, SampleX acquisition/legal and private admin. Original product captures and social preview imagery retain their original colors.
