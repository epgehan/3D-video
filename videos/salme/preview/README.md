# Salme video preview

**Timing version:** This player and MP4 retain the earlier nine-minute fitted-audio edit. Image filenames now describe the original-narration transcript timing; renaming assets does not retime this player. For the new editing schedule, use [the timing review](../TIMING_REVIEW.md) and [image-durations.csv](../image-durations.csv).

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
- The full narration is fitted in sections, with pitch preserved, so all 89 spoken cues land within their assigned image slots. The image starts, ends and durations remain exactly as specified. `assets/narration-timed.mp3` is a browser-friendly 192 kb/s encoding of the fitted audio. See `captions/narration-alignment.json`.
- Captions are ALL CAPS, bold Arial at the user-confirmed readable reference size (72 px at 1080p), white with the current spoken word yellow, with a black outline. All other editorial titles, dates, counts, hypothesis labels and map labels have been removed. Captions were transcribed locally with Whisper and DTW word timings, then reviewed for historical names. The caption SRT is in `captions/Salme_Captions.srt`.
- `shot-schedule.json` contains the exact starts/ends and edit notes. `audio-timing.json` describes the timing adjustment. `verification.json` records the source-image audit and prior Studio checks.
- Camera motion and the image slots follow the brief; outgoing-image backplates are removed so no previous image carries over beyond its allotted duration. The Dnieper overlay uses public-domain Natural Earth reference geometry; route connectors are schematic.
- The reference MP4 could not be inspected because it exceeded the environment's 32 MiB transfer limit. This cut follows the brief's transition notes; the current caption word timings are mapped through the approved narration fitting.
- `hyperframes/index.html` is the authoring source. `frame.html` and `player.js` provide the portable playback surface with the same shot schedule and animation timeline; they are not the HyperFrames editing application.

## Download the finished MP4

Use the Download 1080p MP4 button on the hosted preview. In an embedded preview, wait for the parts to finish downloading, then click “Save MP4 to your computer.” This uses a normal browser download because embedded pages cannot open the system file picker. The full export is 1920 × 1080 at 24 fps, exactly 09:00. Its download is stored in verified parts to fit GitHub file limits. To reconstruct it locally, run `python download-render.py` in this directory; each part and the complete MP4 are checked with SHA-256. The parts are binary storage pieces, not individually playable videos.
