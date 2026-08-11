# Double Eagle Financial — Website

Production-ready static site. No frameworks, no npm install, no build step required
to deploy — the `site/` folder is the finished website.

---

## Deploy right now (5 minutes)

1. Go to [app.netlify.com/drop](https://app.netlify.com/drop) (or Cloudflare Pages / Vercel).
2. Drag the **`site`** folder onto the page.
3. It's live. Point your domain at it in the host's DNS settings.

That's it. Everything works on arrival except the two integrations below.

---

## Before you take real traffic — 2 required steps

Open **`site/assets/js/config.js`** and fill in two values:

```js
formEndpoint: "",   // ← REQUIRED. Where form submissions go.
bookingUrl:   "",   // ← Optional. Your Calendly / Cal.com / SavvyCal link.
```

### `formEndpoint` — required, or you receive no leads

Until this is set, every form shows a visible configuration error instead of
silently discarding the submission. That is deliberate: a form that appears to
work but throws leads away is worse than one that clearly says it isn't wired up.

Easiest options (all accept a JSON POST):

| Service | Setup |
|---|---|
| **Formspree** | Create a form, paste the endpoint URL. Free tier is fine to start. |
| **Basin** | Same idea, generous free tier. |
| **Make.com / Zapier** | Create a "Catch Hook" webhook, paste its URL. Lets you route leads straight into your CRM or a Google Sheet. |

The site POSTs JSON with these keys: `name`, `email`, `business_name`, `phone`,
`business_type`, `annual_revenue`, `current_situation`, `biggest_problem`,
`desired_outcome`, `message`, `consent`, `form_name`, `submitted_at`, `source_page`.

**Test it:** submit each of the three forms once and confirm the lead arrives.

### `bookingUrl` — optional

Set it and the "Open the calendar" button on `/book-a-call.html` routes to your
real scheduling link. Leave it empty and the on-page qualification form handles
booking (it works fine — you just reply with times manually).

---

## Also update before launch

- **Domain.** `src/build.py` line ~20: change `BASE_URL` to your real domain, then
  rebuild (see below). This fixes canonical URLs, Open Graph tags and the sitemap.
- **Email.** `hello@doubleeaglefinancial.com` appears in the footer, contact page,
  privacy policy and terms. Search and replace if yours differs.
- **Legal review.** `privacy.html` and `terms.html` are drafted and contain notes
  addressed to you. Have a Tennessee attorney review both. Make sure the on-time
  guarantee wording matches your actual engagement letter.
- **Proof placeholders.** Three dashed-border boxes on the homepage and one on the
  About page. They are clearly labelled and intentionally empty — no fake
  testimonials, logos or case studies were invented. Replace them as real proof
  arrives (and get written permission before using any client's name or logo).

---

## Editing the site

The header, footer, nav and `<head>` live in **one** place so they can't drift
apart across pages. Page content lives in fragments.

```
src/
  templates/base.html   ← header, footer, nav, meta tags, sticky CTA
  pages/*.html          ← the content of each page
  build.py              ← renders fragments into the template
  qa.py                 ← static checks (links, ARIA, SEO, labels)
  browser_test.py       ← real Chromium tests at 5 viewports
site/                   ← THE OUTPUT. This is what you deploy.
```

**To change page content:** edit the matching file in `src/pages/`, then rebuild:

```bash
python3 src/build.py
```

**To change titles, meta descriptions or the nav:** edit the `PAGES` dictionary at
the top of `src/build.py`, then rebuild.

**To change colours, type or spacing:** edit the token block at the top of
`site/assets/css/styles.css`. Note that `--brass` is decorative only (borders,
rules, icons); `--brass-text` is the accessible variant used for text and button
fills. Don't swap one for the other without re-checking contrast.

You can also edit files in `site/` directly if you prefer — just know that running
`build.py` again will overwrite the HTML files (assets and CSS are untouched).

### Running the tests

```bash
python3 src/qa.py            # static: broken links, ARIA, SEO, form labels
python3 src/browser_test.py  # needs playwright + chromium installed
```

---

## What's on the site

| Page | File |
|---|---|
| Home | `index.html` |
| Offer | `the-core-four.html` |
| Pricing | `pricing.html` |
| About | `about.html` |
| Book a call | `book-a-call.html` |
| Lead magnet | `profit-leak-audit.html` |
| Thank you | `thank-you.html` (noindex) |
| Contact | `contact.html` |
| FAQ | `faq.html` |
| Privacy | `privacy.html` |
| Terms | `terms.html` |

Plus `sitemap.xml` and `robots.txt`, generated automatically.

---

## Analytics

Conversion events are already firing into `window.dataLayer`. Add GA4, Google Tag
Manager or Plausible and they'll be picked up without touching the site code.

Events tracked: `page_view`, `cta_click`, `book_a_call_click`, `lead_magnet_submit`,
`booking_request_submit`, `contact_submit`, `lead_submit`, `lead_confirmed`,
`faq_open`, `form_error`, `form_submit_failed`.

Set `window.DE_DEBUG = true` in the browser console to watch events fire live.

---

## SEO checklist after launch

1. Submit `sitemap.xml` in Google Search Console.
2. Create a Google Business Profile for Memphis (local SEO matters for this niche).
3. Structured data (`AccountingService` schema with your three offers) is already
   on the homepage — validate it at [search.google.com/test/rich-results](https://search.google.com/test/rich-results).

---

## Security notes

- `config.js` holds only public endpoint URLs. **Never put API keys or credentials
  in it** — it's served to every visitor.
- All forms have a honeypot field and client-side validation. Add server-side
  validation and rate limiting at whatever endpoint you choose; client-side checks
  are for usability, not security.
- Your host should force HTTPS. Netlify, Cloudflare Pages and Vercel all do by
  default.

---

## One thing I couldn't verify

The site loads Fraunces, Inter and IBM Plex Mono from Google Fonts. The
environment this was built in blocks that domain, so every screenshot I took shows
the fallback font stack. Layout and spacing hold up correctly in fallback, but
**check the typography yourself on first deploy** — that's the one visual detail
I couldn't confirm.
