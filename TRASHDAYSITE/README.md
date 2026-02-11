# TRASH DAY — Band Website

Static site for **TRASH DAY**, ready for free hosting on GitHub Pages.

## What’s included

- **SHOWS** — List upcoming gigs; add/remove dates and ticket links.
- **LISTEN** — Links to Spotify, Apple Music, Bandcamp, YouTube (or any streaming links).
- **PRESS** — Quotes and links to reviews/interviews.

## How to edit

1. **Shows** — Open `index.html` and find the comment `EDIT SHOWS`. Add or remove `<article class="show-card">` blocks. Use `<article class="show-card show-tba">` for “TBA” rows (no ticket link).
2. **Listen** — In `index.html`, find the `section-listen` area and change each `href="..."` to your real Spotify/Apple Music/Bandcamp/YouTube URLs.
3. **Press** — Find `EDIT PRESS` and add/remove `<blockquote class="press-quote">` blocks and the links in `press-links`.
4. **Tagline** — Change the line under the big TRASH DAY title in the hero.
5. **Colors/fonts** — Edit the `:root` block at the top of `styles.css` to change accent color, background, and fonts.

## Put it on GitHub (free hosting)

1. Create a new repo on GitHub (e.g. `trashday` or `trashday-site`).
2. Upload this folder (or push via Git):
   - `index.html`
   - `styles.css`
   - `script.js`
   - (README.md is optional)
3. In the repo: **Settings → Pages**.
4. Under **Source**, choose **Deploy from a branch**.
5. Branch: **main**, folder: **/ (root)**. Save.
6. After a minute or two, the site will be at:  
   `https://<your-username>.github.io/<repo-name>/`

If the repo is named `trashday`, the URL will be:  
`https://yourusername.github.io/trashday/`

No build step or server required — just edit the files and push to update the site.
