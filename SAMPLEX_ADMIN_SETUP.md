# SampleX administration setup

The private interface is available at `/admin/samplex`. It uses Supabase email-and-password authentication, a Vercel Function for authorization and signing, and the `samplex_licenses` table for the registry.

## 1. Supabase

1. Create a Supabase project.
2. Open the SQL editor and run `supabase/schema.sql`.
3. In Authentication > Providers, keep Email enabled.
4. In Authentication > Users, create the administrator user `amirsholi999@gmail.com` with a strong unique password.
5. Copy the project URL, public publishable key and private secret key.

The table has Row Level Security enabled and grants no browser role direct access. Administrative reads and writes go through the server function.

Running the schema also creates `samplex_metrics` and the server-only `increment_samplex_metric` function. Metrics are anonymous daily counters for Demo Trial and checkout interest; no IP address, cookie, device identifier or audio information is stored.

## 2. Local configuration

Copy the variable names from `.env.example` into `.env.local`. Do not commit `.env.local`.

The value of `SAMPLEX_PRIVATE_KEY` must be the same P-256 private key used by the extension generator at `C:\Users\Usuario\.samplex\license-private.pem`, represented on one line with `\n` between PEM lines.

## 3. Vercel configuration

Add the same variables in the portfolio project under Settings > Environment Variables. Mark these as sensitive:

- `SUPABASE_SECRET_KEY`
- `SAMPLEX_PRIVATE_KEY`
- `POLAR_WEBHOOK_SECRET`

Apply the public `VITE_*` values to the build environment and all server values to Production. Redeploy after adding or changing variables.

## 4. Access

Visit `https://amirsholi.vercel.app/admin/samplex` and sign in with `amirsholi999@gmail.com` and the password created in Supabase. The session refreshes automatically while the panel remains open and ends when that browser tab/session is closed or you select Sign out.

The server independently checks the authenticated email. Changing the visible email field or frontend code does not grant administrative API access.

## 5. Polar automatic delivery

1. Run `supabase/schema.sql` again after deploying this version. The migration adds Polar order fields without removing existing licenses.
2. In Polar, create a webhook endpoint named `SampleX production` with URL `https://amirsholi.vercel.app/api/polar/webhook`.
3. Select the raw format and subscribe to `order.paid` and `order.refunded`.
4. Copy the generated signing secret to the Vercel variable `POLAR_WEBHOOK_SECRET` for Production and Preview, then redeploy.
5. Set the checkout success URL to `https://amirsholi.vercel.app/samplex/success?checkout_id={CHECKOUT_ID}`.

The webhook verifies Polar's signature before writing anything. Each Polar order ID and checkout ID is unique in Supabase, so webhook retries return the already-issued permanent license instead of creating extra codes. The checkout return page polls the registry briefly and shows the signed code as soon as fulfillment finishes.

## 6. Optional email delivery

Automatic delivery on the checkout success page works without an email provider. To also email each new code, verify a sending domain with Resend and add these sensitive Vercel variables:

- `RESEND_API_KEY`
- `SAMPLEX_FROM_EMAIL` (for example, `SampleX <licenses@samplex.example>`)

Redeploy after adding them. If email delivery fails, Polar retries the webhook; the existing order is reused and no duplicate license is created.

## 7. Manual recovery

Customers recover a lost license by contacting support with the email used at Polar checkout and, when available, the order or checkout reference. Verify the paid, non-refunded order in `/admin/samplex`. Prefer returning the existing key. Generate a replacement only when necessary, mark the previous record as replaced and document the reason in the registry. No public recovery form or additional customer-data collection is used.

## 8. Demo and checkout metrics

Run `supabase/schema.sql` again before deploying the metrics dashboard. The public product page sends only the event name to `/api/samplex/events`; the server converts it into a daily aggregate in Supabase. The authenticated administration view reads the last 30 days through `/api/admin/licenses` and displays Demo Trial interest, checkout clicks and the resulting intent ratio.
