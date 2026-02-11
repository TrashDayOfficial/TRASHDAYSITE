<<<<<<< HEAD
# TRASH DAY — Band Website

Static site for **TRASH DAY**, ready for free hosting on GitHub Pages.  
Content is stored in **data/** (JSON) and can be edited **without coding** via the Admin (see below).

## What’s included

- **SHOWS** — List upcoming gigs; add/remove dates and ticket links.
- **LISTEN** — Links to Spotify, Apple Music, Bandcamp, YouTube (or any streaming links).
- **PRESS** — Quotes and links to reviews/interviews.

---

## Edit without coding (Admin)

To edit shows, listen links, press, and the tagline in a form-based UI (no HTML/JSON):

1. **Deploy this repo to Netlify** (free):
   - Go to [netlify.com](https://www.netlify.com) and sign up / log in.
   - **Add new site → Import an existing project** and connect your **GitHub** account.
   - Choose the repo **TrashDayOfficial/TRASHDAYSITE**, branch **main**, then deploy.
2. **Turn on Identity + Git Gateway** (so the Admin can save to GitHub):
   - In Netlify: **Site settings → Identity**, click **Enable Identity**.
   - Under **Registration**, set it to **Invite only** (recommended).
   - Go to **Site settings → Identity → Services** and enable **Git Gateway**.
   - Invite yourself (and bandmates) via **Identity → Invite users** (they’ll get an email to set a password).
3. **Open the Admin:**
   - Go to **https://YOUR-NETLIFY-SITE.netlify.app/admin/** (replace with your Netlify URL).
   - Log in with the email/password you set from the invite.
   - Edit **Site**, **Shows**, **Listen**, and **Press** and click **Publish**. Changes are saved to GitHub; your GitHub Pages site will update on the next deploy (Netlify and GitHub both use the same repo).

You can keep using **https://trashdayofficial.github.io/trashdaysite/** as your main URL; the Admin is just the place you go to edit content.

### If Netlify deployment fails

1. **Build log in Netlify** — In the Netlify dashboard go to **Deploys**, click the failed deploy, and open **Deploy log** (or **Build log**). That shows the exact error (e.g. missing command, wrong path, dependency failure).
2. **Deploy log file** — After a successful deploy, open **https://YOUR-SITE.netlify.app/deploy-log.txt** in your browser. It’s written by `scripts/build.sh` and shows time, directory, and Node version so you can confirm the build step ran.
3. **No build needed** — This site is static. If you prefer to skip the build step, in Netlify go to **Site settings → Build & deploy → Build settings** and set **Build command** to empty; set **Publish directory** to `.` so Netlify just publishes the repo as-is.

---

## Edit by changing files (optional)

Content lives in the **data/** folder:

- **data/site.json** — Tagline under the band name.
- **data/shows.json** — List of shows (date, venue, city, notes, ticket URL).
- **data/listen.json** — List of streaming links (label + URL).
- **data/press.json** — Press quotes and press links.

Edit these JSON files in GitHub (or in your editor and push) and the live site will reflect the changes.  
**Colors/fonts** are in **styles.css** (the `:root` block at the top).

---

## Hosting on GitHub Pages

1. Push this folder to a repo (e.g. **TrashDayOfficial/TRASHDAYSITE**).
2. In the repo: **Settings → Pages**.
3. **Source:** Deploy from a branch. **Branch:** `main`. **Folder:** `/ (root)`.
4. Site URL: `https://trashdayofficial.github.io/trashdaysite/`  
   *(Use lowercase `trashdaysite` in the URL.)*

Make sure **index.html**, **styles.css**, **script.js**, **.nojekyll**, and the **data/** folder are in the **root** of the repo.

No build step — the site loads the JSON and renders in the browser.
=======
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

**This repo:**  
`https://trashdayofficial.github.io/trashdaysite/`  
*(Use lowercase `trashdaysite` in the URL — GitHub lowercases repo names.)*

### If the site doesn’t load

- **Use the lowercase URL:** `https://trashdayofficial.github.io/trashdaysite/`
- **Include the trailing slash** when you type the URL.
- In the repo go to **Settings → Pages** and confirm:
  - **Source:** Deploy from a branch
  - **Branch:** `main` (or `master` if that’s your default)
  - **Folder:** `/ (root)`
- Ensure **index.html**, **styles.css**, **script.js**, and **.nojekyll** are in the **root** of the repo (not inside a folder).
- Wait 2–5 minutes after a push; sometimes Pages takes a moment to update.
- Check **Settings → Pages** for a green “Your site is live at…” message.

No build step or server required — just edit the files and push to update the site.
>>>>>>> b11f6abbf7cdcebfbbeeec43bfba55cb27ef4416
