# Portfolio route map

## Public pages

| Route | Surface | Purpose |
| --- | --- | --- |
| `/` | Portfolio | Hero and VS Code-style workspace. Defaults to `contact.md`. |
| `/?file={id}` | Portfolio workspace | Opens a specific workspace file and brings the editor into view. |
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
