# TRASH DAY — Band Website

Static site for **TRASH DAY**, ready for free hosting on GitHub Pages.  
Content and design are stored in **data/** (JSON) and editable via the Admin (no coding needed).

## What’s included

- **SHOWS** — List upcoming gigs; add/remove dates and ticket links.
- **LISTEN** — Links to Spotify, Apple Music, Bandcamp, YouTube (or any streaming links).
- **PRESS** — Quotes and links to reviews/interviews.
- **Site / Design** — Colors, fonts, hero image, logo, layout options (all editable in Admin).

---

## Edit without coding (Admin)

To edit content and design in a form-based UI:

1. **Deploy this repo to Netlify** (free):
   - Go to [netlify.com](https://www.netlify.com) and sign up / log in.
   - **Add new site → Import an existing project** and connect your **GitHub** account.
   - Choose the repo **TrashDayOfficial/TRASHDAYSITE**, branch **main**, then deploy.
2. **Turn on Identity + Git Gateway** (Netlify: Site configuration → Identity → enable, then Services → Git Gateway).
3. **Invite users** (Identity → Invite users).
4. **Open the Admin:** `https://YOUR-SITE.netlify.app/admin/`

In **Site** you can edit:
- **Content:** Tagline
- **Images:** Hero background image, logo image
- **Colors:** Background light/dark, accent primary/secondary/tertiary, text colors
- **Typography:** Heading and body fonts (Bebas Neue, Oswald, Space Mono, etc.)
- **Layout:** Hero alignment, section spacing, border radius, button style

---

## Edit by changing files (optional)

- **data/site.json** — Tagline, colors, fonts, images, layout.
- **data/shows.json**, **data/listen.json**, **data/press.json** — Content as before.

---

## Hosting

- **GitHub Pages:** `https://trashdayofficial.github.io/trashdaysite/`
- **Netlify:** Use for the Admin; same repo, same content.
