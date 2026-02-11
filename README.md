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
