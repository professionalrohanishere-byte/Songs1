# My Jukebox

A simple, good-looking music player site. No backend, no database — just files
in a folder, playable from any browser.

## Folder structure

```
index.html      the page
style.css       the look
player.js       the player logic (don't need to touch this)
songs.js        <-- YOUR SONG LIST. Edit this to add/remove songs.
audio/          put your song files here (.mp3 works everywhere)
covers/         put square cover images here (optional)
```

## Put it on GitHub Pages (free hosting, no coding needed)

1. Create a new repository on GitHub (Settings → make it Public).
2. Upload every file and folder in this project to the repo
   (drag-and-drop on the "Add file → Upload files" screen works fine).
3. Go to the repo's **Settings → Pages**.
4. Under "Build and deployment", set **Source** to "Deploy from a branch",
   branch `main`, folder `/ (root)`. Save.
5. Wait a minute, then your site will be live at:
   `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`

That link is what you share. Anyone who opens it can listen — no sign-in,
no app, it just plays.

## Adding or removing songs later

1. Open `songs.js` in this repo (GitHub lets you edit files right in the
   browser — click the pencil icon).
2. Copy an existing block to add a new song, or delete a block to remove one.
3. Upload the matching audio file into `/audio` (and a cover into `/covers`
   if you want one).
4. Save / commit. GitHub Pages updates automatically within a minute or two.

Only you can do this, since it means editing files in your own repo — there's
no public upload button on the site itself.

## File size

GitHub itself is fine with 100MB+ across many files (just keep each
individual file under 100MB — a normal MP3 is only a few MB, so this won't
be an issue even with 20-30 songs). If a repo gets large over time, GitHub
may ask you to use Git LFS for very large files, but for MP3s at normal
quality you're unlikely to hit that.

## Adding comments later (optional)

A real comment section needs something GitHub Pages alone doesn't provide,
but there's a well-known free option built for exactly this kind of static
site: **giscus** (https://giscus.app). It lets visitors comment using their
GitHub account, is free, and is added with a couple of pasted lines — happy
to wire it in whenever you're ready.

## Notes

- Works on desktop and mobile browsers.
- Keyboard: space bar toggles play/pause.
- If a cover image isn't set for a song, a plain record shows instead —
  that's expected, not a bug.
