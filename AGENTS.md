# Prototype Instructions

Run the local server yourself and open the preview in the in-app browser. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

## Durable Portfolio Design Decisions

- Initial replacement version must look and feel like the Sawad reference, matching its composition, proportions, hierarchy and scrolling behavior closely. Personal visual refinements come afterward; do not reinterpret the first version as a different design direction.

- Portfolio reformulation (2026-10-28): use https://sawad.framer.website/ as the structural reference for information placement and hierarchy. The user wants a new portfolio format; colors, photographs and copy remain independent choices. Earlier VS Code-specific layout decisions describe the previous design and should not constrain exploration of the replacement.

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
- SampleX appears as its own project folder in the VS Code explorer; its public product CTA opens the dedicated `/samplex` route, while `/?file=samplex-overview` opens the compact workspace case study.
- SampleX project files follow the product flow: overview, recording, trimming, processing and download; recording and trimming use replaceable GIF-ready media slots.
- The hero project access alternates between UnderFit and SampleX in one animated panel; each CTA transitions to its own overview without showing both summaries simultaneously.
- SampleX acquisition lives on the dedicated public route `/samplex`; do not create a separate `Buy SampleX` workspace file or hash-based purchase route.
- UnderFit and SampleX folders are mutually exclusive in the explorer. The featured-project panel switches manually and should not contain product preview images or auto-rotation.
- SampleX includes 75 free WAV exports and sells only one public product: a one-time permanent lifetime unlock. Promo licenses are internal-only for private testers and support.
- Previous/next navigation sits outside the VS Code frame at its lateral edges, previewing the destination filename on wide screens; do not place these controls inside the editor content.
- SampleX deep links and its hero CTA must use the same staged `contact.md` to overview transition as UnderFit.
- Workspace navigation controls attach to the lateral edges of the VS Code frame as compact directional tabs; hovering or focusing reveals the destination filename inside a terminal-style tooltip.
- The SampleX purchase view uses the supplied waveform selection image as a tightly sized horizontal preview above two aligned plan cards; never place it inside a tall empty media column.
- Purchase-page workspace navigation uses circular lateral arrow controls with destination tooltips, and the SampleX preview is presented alone in a compact elevated frame without explanatory caption text.
- Workspace navigation continues from `Buy SampleX` to `contact.md`; clicking the UnderFit or SampleX project folder opens that project and selects its overview immediately.
- The SampleX purchase button uses the public Polar Checkout Link for the lifetime license; Polar product IDs are public routing identifiers, never secrets.
- SampleX does not request feedback, surveys or extra customer data. Acquisition may use anonymous daily counters for allowlisted CTA events, but never cookies, IP storage, device identifiers, browsing history or audio data.
- When free exports reach zero, recording, trimming, playback and analysis remain available. Only WAV export opens the restrained license form, and successful activation resumes the pending export without extra notifications.
- License recovery is manual: the customer contacts support and the administrator verifies the Polar order in `/admin/samplex`, then recovers or replaces the signed key.
- On short mobile screens, the VS Code window must expand with its content and rely on natural page scrolling; never clip information or introduce an internal editor scrollbar.
- The standalone `/samplex` route should read as a complete product landing page rather than a compact checkout card: lead with the producer workflow and real interface, explain local processing and the 75-export trial, then present the single Lifetime license.
- The standalone SampleX landing should use real, lazy-loaded product captures as proof of the capture, trimming, analysis and export workflow; keep the visual system restrained, dark and product-led, with local processing explained as a dedicated trust section before pricing.
- Featured project cards must keep matching internal geometry across UnderFit and SampleX, the explorer must visibly separate PROJECTS from PROFILE, and the portfolio terminal summary must use current product information with its outer columns aligned to opposite edges.
- Featured projects on the hero are presented as two static editorial rows, avoiding carousel-style lateral transitions.
- The standalone SampleX page leads with ZIP access and installation, and keeps lifetime pricing as the final product section before the footer.
- SampleX uses one primary acquisition CTA in the product hero; installation guidance stays compact beneath it instead of occupying a separate banner.
- The SampleX footer reuses the portfolio terminal language and always includes a clear route back to `AmirSholi()`.
- On notebook-sized viewports, recover space by compacting navigation and VS Code chrome before reducing readable content typography; short screens must never let editor content disappear beneath the status bar.
- Every VS Code workspace file has a stable `/?file={id}` deep link. File changes participate in browser history, reloads preserve selection, and `ROUTES.md` is the canonical route map.

- The replacement portfolio uses a continuous Sawad-style public homepage. Previous VS Code case studies remain temporarily accessible through existing `?file=` deep links. The initial implementation uses the owner's existing portrait, project images, work history and certificates in the reference composition.

- Portfolio content direction (2026-10-28): evolve the Sawad-inspired visual system into short, separately navigable pages rather than a long vertical homepage. Provide specific, factual information about Amir's responsibilities, project workflows, technical skills and education using the existing portfolio and LinkedIn when accessible. Keep the common identity/profile and add visible navigation labels and independent URLs.

- Contact is a shared form below every portfolio page; remove it from the main navigation. Projects contains independent UnderFit and SampleX case-study pages (`/projects/underfit`, `/projects/samplex`). Keep `/samplex` as the acquisition landing. Transitions should use short, smooth exit/enter fades with subtle movement and respect reduced motion.
- LinkedIn verified on 2026-10-28: UnderFit operates at two Uruguay gym locations; evolved from JavaScript/Electron/SQLite toward C#/.NET and PostgreSQL, with instructor tablets, migration, backups, remote updates and cross-location access. Member mobile access is a next stage, not a shipped feature. Analista Programador coursework/exams completed at CTC in partnership with CLAEH; thesis pending, expected December 2026. Alorica content moderation was in Portuguese, on-site. English MicroFleX B1+ certificate: Alianza, October 2026. Spanish/Portuguese native; English intermediate.
- SampleX acquisition calls the first public demo package a `Demo Trial`; its instructions live in the dedicated download section. Measure only anonymous daily Demo Trial and checkout-interest counters, and surface them in the private administration overview.
- Describe SampleX publicly as an audio sampler for the browser, not as a Chrome-only sampler. Chrome may still be named where installation steps or current extension-platform compatibility require it.
- The SampleX social preview keeps the product name small in a corner, gives the real product interface visual priority, labels the release as `PRIMERA DEMO`, and uses the concise workflow copy `Graba · Recorta · Analiza y descarga (.wav)`. Do not mention the 75-export allowance in the social preview artwork.
- Optimize the SampleX social preview for small Discord link cards: use the feature-rich real interface capture with the waveform selection and analysis values visible, make the workflow line the main readable copy, and include a compact circular Discord profile image with the `SHULEYBER` signature.
- The SampleX social preview must feel sober, safe and credible like a GitHub release card: prefer a light neutral background, ordinary system typography, thin gray borders and the unembellished real interface capture. Avoid neon, glows, oversized all-caps, dramatic gradients and aggressive download-ad styling.
- At Discord-card scale, the SampleX preview headline and workflow copy should be comfortably large. Add depth only through subtle light-neutral background layers and soft shadows, while preserving the calm GitHub-like trust signal.
- On the public `/samplex` page, downloading the current demo is the dominant above-the-fold action and the first conversion path visitors encounter. Keep the version, package size and compact three-step installation guidance adjacent to that CTA; product proof and privacy follow afterward.
- The SampleX administration view distinguishes portfolio landing-button clicks from actual GitHub release-asset downloads. Before navigating to the release asset, the public CTA waits for its anonymous landing-click request to finish; download failure must never be caused by metrics failure.


- Current visual palette for the entire app: black `#000000`, off-white `#DFDEDC`, charcoal `#464545`, teal `#00ACAC`, gray `#A6A7A2`. Apply to UI chrome and all routes; preserve original product imagery colors.
- Header navigation and profile card remain visible while reading (sticky in normal page flow, compact on mobile). Avoid extra editor scrolling.
- Projects must be discoverable directly from Home and from the Projects navigation menu, with clear descriptions and uncropped interface previews. SampleX has a direct Demo Trial download in its case study as well as the product landing.
- UnderFit uses the four current full-size LinkedIn images (administration, classes, products by location and architecture). Its case study draws on “Documentar el proyecto completo”; distinguish the deployed desktop/tablet operation from locally validated 2.6.0 mobile/admin candidate and pending rollout. Never present old screenshots as the current UI.
- Palette refinement: the pure-black implementation felt too flat. Use a charcoal canvas, darker media wells and visibly separate raised navigation/content surfaces, restrained edge highlights and soft shadows. Keep the teal softer and mainly on actions/active states; avoid making large headings solid teal. The five-color reference is a starting point, not a restriction against tonal depth.

- Visual refinement (2026-10-29): use the orange/petrol reference as inspiration, with warm orange actions, rich teal surfaces and warm readable text. Palette is not a restriction. Keep the profile card sticky while reading, and give languages and Uruguay/Brazil dual nationality visible prominence with real flag assets.
- Restore a terminal-style, full-width portfolio footer. Contact contains name, email and message only; no budget field.
- Public portfolio copy supports Spanish, Portuguese and English through a visible, persistent language selector; preserve route and form values when switching. Original product screenshots, qualifications and certificates retain their source language.
- English certificate supplied by owner: Alianza MicroFleX Intermediate Online Course, CEFR B1+, issued October 29, 2026. Provide an in-app image preview and the original PDF.

- Content accuracy: Alorica was on-site Portuguese content moderation in Montevideo, May 2024–October 2025, with SLA/AHT/UR; never expand UR or imply software testing/supervision. Distinguish practical project skills from coursework and specific supporting uses. Use Under-Fit branding, preserve existing route/repository identifiers, date historical test results and link their source. Shared API/PostgreSQL operation requires server/connectivity; do not claim system-wide offline support. CTC period is 2021–present with thesis pending and expected completion separately. Certificate durations require source support; IBEC certificate states no duration.

- User rejected the comprehensive editorial redesign and requested restoring the preceding portfolio as the basis for incremental improvements (2026-10-29). Keep the prior profile-card layout, Poppins and existing navigation structure. Current improvement priority: colors and typography. Refine contrast, accent intensity and text hierarchy without another structural redesign; preserve all verified content and ES/PT/EN behavior.
