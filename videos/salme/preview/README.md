# Salme video preview

A portable browser player and editable HyperFrames project for the nine-minute Salme documentary. All 90 image boundaries match the supplied `Image_Prompts.md`; the revised PNGs are read from the existing `../images/` folder.

## Watch locally

Clone/download the repository, then run this from its root:

```bash
npx --yes http-server . -p 8080
```

Open http://localhost:8080/videos/salme/preview/ . The player supports play/pause, seeking, volume and fullscreen. It loads images ahead of the playhead rather than downloading the entire image collection before playback. Use a server with HTTP byte-range support (such as the command above or GitHub Pages) so audio seeking works. Opening the HTML directly as a `file:` URL can block iframe access or audio.

## Open in HyperFrames Studio

```bash
cd videos/salme/preview/hyperframes
node prepare.mjs
npx hyperframes@0.9.21 preview
```

Open the Studio project URL printed by the command. The project has 90 editable sub-compositions and prepares local copies of the shared images, audio, SVG map and GSAP assets. Generated assets are ignored by Git, so the repository stores each asset once. Keep this directory inside the full repository so preparation can find the shared files. `npm run dev`, `npm run check`, and `npm run render` prepare them automatically. Node 22+ and FFmpeg are required for HyperFrames rendering.

## Hosting

The browser player is static and can be hosted by GitHub Pages or any static HTTP server. If GitHub Pages is enabled for the repository's main branch/root, its path is `/3D-video/videos/salme/preview/`. Committing this folder does not by itself enable GitHub Pages.

## Timing and production notes

- Canvas: 1920 × 1080 (16:9), duration: 09:00, 90 images. Image 083 begins at 08:00.
- The uploaded 553.404-second narration is sped up approximately 3.055% with pitch preserved, with a two-second opening reveal and end padding. The full speech is retained. `assets/narration-timed.mp3` is a browser-friendly 192 kb/s encoding of that timed audio.
- `shot-schedule.json` contains the exact starts/ends and edit notes. `audio-timing.json` describes the timing adjustment. `verification.json` records the source-image audit and prior Studio checks.
- Sparse dates, counts, hypothesis labels, map overlays and camera motion follow the brief. The Dnieper overlay uses public-domain Natural Earth reference geometry; route connectors are schematic.
- The reference MP4 could not be inspected because it exceeded the environment's 32 MiB transfer limit. This cut follows the brief's transition notes; individual spoken-word alignment was not independently verified.
- `hyperframes/index.html` is the authoring source. `frame.html` and `player.js` provide the portable playback surface with the same shot schedule and animation timeline; they are not the HyperFrames editing application.
