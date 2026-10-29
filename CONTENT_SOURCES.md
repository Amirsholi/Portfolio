# Content sources and release status

Updated: 2026-10-28.

## Personal profile

Source: https://www.linkedin.com/in/amirsholi/, read in the owner's open Chrome session.

- Software Developer (Independent), UnderFit, June 2025–present; hybrid, Montevideo.
- Content Moderator at Alorica, May 2024–October 2025; Portuguese-language work, on-site in Montevideo. Policy application, information validation, quality and productivity criteria.
- CTC / Universidad CLAEH Analista Programador: coursework and exams completed, thesis pending, expected December 2026.
- Alianza MicroFleX Intermediate English B1+ certification, October 2026. Spanish and Portuguese native; English intermediate.
- ARI Informática Operador PC (2015) and Operador PC Plus (2016).
- Existing portfolio certificates supply IBEC, React and Next.js program details.

## UnderFit

Sources: LinkedIn Experience, its four full-size public project images, and the user-authorized chat **Documentar el proyecto completo** (`01a15efb-5573-7f82-9c03-db2300461817`). Supporting local documentation was read from the chat's managed worktree: `docs/CASE_STUDY.md` and `docs/MOBILE_ACCESS.md`.

Current demo captures are stored in `public/assets/underfit/current/`: administration, classes, products by location and architecture. They replace the old portfolio case-study images. These LinkedIn captures are explicitly described as demonstration environments with fictional data.

The case study separates:

1. Confirmed daily use: desktop and instructor tablet workflows with shared API/PostgreSQL, two gym locations.
2. Local 2.6.0 candidate: administrator/member web access, tested locally, plus dependency maintenance and packaged-build validation.
3. Pending rollout: installation, credentials, HTTPS and real-phone validation in the gym.

The architecture image predates the local member-access candidate; its caption explains the difference. No production-adoption claim is inferred from a local build or a GitHub release. No invented business-impact percentages or testimonials.

## SampleX

Sources: existing public product landing, LinkedIn Projects and the existing workflow GIFs.

- The cropped `processing.gif` is no longer used in the active case study or product landing. Analysis uses the full `samplex-photo2.png` interface capture.
- All product images preserve their actual dimensions and use contain sizing. Original imagery colors are preserved independently of the website palette.
- Demo download uses the existing v0.3.0-demo GitHub release asset, verified HTTP 200, 411989 bytes.
- Download interaction uses only the existing anonymous allowlisted `demo_interest` counter and remains independent of metrics success.

## English certificate supplied October 29, 2026

Owner supplied `Certificado-amir-sholi (1).pdf`. Rendered and visually checked: Alianza Cultural Uruguay–Estados Unidos, MicroFleX Intermediate Online Course, CEFR B1+, issued October 29, 2026. The original is preserved at `/assets/certificates/english-b1.pdf`, with a raster preview for the in-app modal.

Flag assets: flagcdn.com/uy.svg and flagcdn.com/br.svg, stored locally.

## Content verification — 2026-10-29

- Alorica details (including SLA, AHT and UR): directly confirmed by the owner in this chat. UR is retained without expanding the acronym. No numerical performance, supervision or software-testing responsibilities are inferred.
- Under-Fit: re-read local docs/ARCHITECTURE.md, OPERATIONS.md, MOBILE_ACCESS.md and release-notes/2.6.0.md. Latest managed-worktree revision reviewed: 8c84909 (2026-10-27). Mobile test environment is isolated and local; actual gym installation/HTTPS/device validation remain pending.
- Historical results: docs/DEPENDENCY_SECURITY.md, revision 913669d, final validation completed 2026-10-26: 141 JavaScript, 29 .NET unit and 27 integration/security tests. Published a readable, attributed excerpt at public/assets/documents/under-fit-validation-2026-10-26.txt. This is a source record, not a new execution or production measurement.
- SQLite: current documentation explicitly says API/PostgreSQL shared operations introduce server/connectivity dependency. SQLite local mode remains for compatibility/migration; no shared offline fallback is claimed.
- Python: scripts/prepare-integration-copy.py uses SQLite backup, integrity/foreign-key checks, row counts and a SHA-256 manifest. test/test_integration_copy.py verifies a WAL-consistent copy and prevents overwriting original/target. Presented as a specific supporting use, not a main product language.
- SampleX: public v0.3.0-demo release specifies source 95c22f3. Asset is 411989 bytes. Its LEEME.txt confirms 75 WAV exports; its manifest declares minimum_chrome_version 116, MV3, tabCapture and offscreen. Release source src/license/license.ts sets FREE_EXPORTS=75; src/App.tsx gates download, leaving recording/editing/analysis outside that gate. No fresh compatibility run was performed on Edge/Brave/Firefox/Safari. Installation instructions in ZIP are for Chrome.
- SampleX practical TypeScript: SelectionRange, AnalysisWorkerRequest and AnalysisWorkerResponse. Vitest evidence: src/audio/exportWav.test.ts (PCM16 header, DC removal, fades, quiet cut boundaries) and analyzeSelection.test.ts (synthetic 120 BPM click, 440 Hz signal, C major chord). Tests were inspected, not rerun as part of this copy update.
- Certificate images visually read: React 2023-11-07, 30 hours / 8 weeks; Next.js 2023-12-11, 14 hours / 7 weeks; IBEC Artificial Intelligence 2024-03-13, no duration printed. Removed unsupported six-month duration. Alianza displayed month/year per owner request; original PDF still preserves issue date.
- CTC institutional name and 2021–present period: directly supplied by owner. Expected December 2026 completion is separate from enrollment period.
