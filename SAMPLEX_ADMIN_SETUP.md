# SampleX administration setup

The private interface is available at `/admin/samplex`. It uses Supabase email-and-password authentication, a Vercel Function for authorization and signing, and the `samplex_licenses` table for the registry.

## 1. Supabase

1. Create a Supabase project.
2. Open the SQL editor and run `supabase/schema.sql`.
3. In Authentication > Providers, keep Email enabled.
4. In Authentication > Users, create the administrator user `amirsholi999@gmail.com` with a strong unique password.
5. Copy the project URL, public publishable key and private secret key.

The table has Row Level Security enabled and grants no browser role direct access. Administrative reads and writes go through the server function.

## 2. Local configuration

Copy the variable names from `.env.example` into `.env.local`. Do not commit `.env.local`.

The value of `SAMPLEX_PRIVATE_KEY` must be the same P-256 private key used by the extension generator at `C:\Users\Usuario\.samplex\license-private.pem`, represented on one line with `\n` between PEM lines.

## 3. Vercel configuration

Add the same variables in the portfolio project under Settings > Environment Variables. Mark these as sensitive:

- `SUPABASE_SECRET_KEY`
- `SAMPLEX_PRIVATE_KEY`

Apply the public `VITE_*` values to the build environment and all server values to Production. Redeploy after adding or changing variables.

## 4. Access

Visit `https://portfolio-i9t5r1e36-amirs-projects-ceb3ce3f.vercel.app/admin/samplex` and sign in with `amirsholi999@gmail.com` and the password created in Supabase. The session refreshes automatically while the panel remains open and ends when that browser tab/session is closed or you select Sign out.

The server independently checks the authenticated email. Changing the visible email field or frontend code does not grant administrative API access.
