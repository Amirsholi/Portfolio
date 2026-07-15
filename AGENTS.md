# Prototype Instructions

Run the local server yourself and open the preview in the in-app browser. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

## Durable Portfolio Design Decisions

- Prioritize load speed, smoothness and usability over decorative technical language or heavy visual effects.
- The hero-to-workspace transition should feel like the hero recedes backward while the VS Code window rises from below/behind and takes the foreground quickly.
- The workspace and footer should be static page elements after the transition, not fixed overlays.
- The terminal footer should be clean, full-width and free of blue radial glow artifacts.
- Contact should remain compact, but empty editor space can be used for small contextual UI that helps visitors understand fit and next steps.
- The VS Code workspace must use a controlled viewport-aware height, and file views should be composed to fit without internal editor scrolling.
- UnderFit files should be ordered as overview, demo/video, then feature modules; provide in-editor next/previous navigation for visitors who do not understand the file-tree metaphor.
- Do not deploy or push major visual changes until responsive behavior, internal scroll and build have been checked.
- The first workspace file should be `contact.md`; on desktop it includes a README-style cover letter, while mobile can simplify/hide that README so the contact view fits without internal scrolling.
- Page scrolling should remain natural; avoid mandatory scroll snapping and avoid competing scroll containers inside the VS Code editor.
- Contact should keep the vertical form layout, with any cover-letter/readme content presented as a separate terminal-like black monospace block.
- Workspace file navigation should be simple text links such as `cash-dashboard.view >`, not large floating arrow buttons.
- The VS Code tab strip must stay dark; avoid white filler panels in the editor chrome.
- Public Vercel portfolio links must not require Vercel login; keep SSO deployment protection disabled for this project.
- The hero should lead with the AmirSholi() identity and use a compact VS Code-style UnderFit pitch panel on the right.
- UnderFit images, video previews and education certificates should open inside a closable in-app media modal, not redirect visitors away from the portfolio.
- UnderFit file views must fit inside the fixed workspace frame; avoid content continuing under the status bar.
- The hero UnderFit CTA should first bring the workspace into view on `contact.md`, then transition the active file to `overview.md`.
- The hero project teaser can use a compact code-like panel with an ASCII dumbbell visual.
- Portfolio SEO metadata, social preview imagery and browser icons should stay in English and use the supplied AmirSholi() blue/green console-style banner as the link preview image, served as an optimized JPG for WhatsApp/Meta compatibility.
- SampleX license administration lives at `/admin/samplex`, is excluded from public navigation, and must remain accessible remotely through email-based administrator authentication.
- SampleX signing keys and Supabase service credentials must remain server-only; the public portfolio and extension may contain only public verification/configuration values.
- SampleX appears as its own project folder in the VS Code explorer; the public `#samplex` link opens its compact product overview directly inside the fixed workspace.
- SampleX project files follow the product flow: overview, recording, trimming, processing and download; recording and trimming use replaceable GIF-ready media slots.
- The hero project access alternates between UnderFit and SampleX in one animated panel; each CTA transitions to its own overview without showing both summaries simultaneously.
- `Buy SampleX` is a standalone top-level workspace file outside `PROJECTS`, with a checkout-ready lifetime-license view and the public deep link `#buy-samplex`.
- UnderFit and SampleX folders are mutually exclusive in the explorer. The featured-project panel switches manually and should not contain product preview images or auto-rotation.
- SampleX checkout presents a US$5 pack of 500 exports and a recommended US$15 permanent lifetime unlock.
- Previous/next navigation sits outside the VS Code frame at its lateral edges, previewing the destination filename on wide screens; do not place these controls inside the editor content.
