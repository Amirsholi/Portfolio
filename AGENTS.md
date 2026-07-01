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
- Do not make UnderFit images clickable for enlarged previews; keep media inside the portfolio flow.
