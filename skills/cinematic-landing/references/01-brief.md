# 01 — Brief and art direction

Do this before writing JSX, HTML, shaders, or animation timelines. A weak concept cannot be fixed with bloom.

## One-page brief template

Write down:

1. **Subject and promise:** What is being offered? Who is it for? What should they do after the page? Distinguish real functionality from a fictional concept. Never imply a working checkout, booking, or contact flow if none exists.
2. **One-sentence world:** E.g. “A watch movement is examined under a jeweler's light,” not “premium futuristic 3D website.” The sentence sets camera, materials, sound, typography, and motion.
3. **Hero object:** Identify the object or environment, its visual proof of quality, and available source assets. Decide whether it is a GLB, layered 2D art, CSS/Canvas, or native DOM. A great 2D composition beats a generic 3D primitive.
4. **Signature interaction:** State input, visible response, and reset. Make it understandable in three seconds. Examples: drag the sun to change shadows; hold to crack a geode; wipe condensation; aim a lighthouse beam. Provide a touch and keyboard equivalent.
5. **Narrative stations:** Hero → context/proof → process/details → participation/demo → final offer/CTA. Give each station a different composition and a reason to move there. Four sections is a useful starting point, not a forced count.
6. **Visual system:** Two or three main colors; background treatment; one display and one reading typeface; material vocabulary; image crop; grid; spacing; motion personality. Avoid a default black neon tech aesthetic unless the subject calls for it.
7. **Asset and performance budget:** List each model/image/font/audio file, license, expected size, fallback, and when it loads. Reserve the first-screen essentials; defer optional extras.
8. **Constraints:** Framework, device targets, hosting, existing components, brand rules, browser support, and user-requested technologies.
9. **Acceptance frames:** Describe what the hero, at least two middle stops, final CTA, and phone hero should look like in a screenshot.

## Design the sequence

For every station specify **copy + camera + light + object state + interaction + transition**. Example:

| Station | Copy | Camera and object | Light | Visitor action | Transition |
| --- | --- | --- | --- | --- | --- |
| Hero | Clear product name and promise | Three-quarter silhouette, subject right | Warm key and narrow rim | Hold to wake the object | Slow reveal after loader |
| Detail | Specific feature or provenance | Close-up of one material | Key moves across surface | Drag to inspect | Scroll rotates 35°, eases to stop |
| Proof | Concrete evidence | Wider frame with spatial context | More ambient fill | Tap labeled hotspot | Scene settles while copy enters |
| CTA | Offer and action | Signature final silhouette | Controlled highlight | Open a real destination | Leave canvas calm |

The page should still read in DOM order when the canvas is absent. Give section text specific nouns, numbers, and claims that can be supported. Keep fictional claims clearly framed as concept copy.

## Asset decision tree

- **Good existing model:** inspect orientation, scale, materials, textures, license, and triangle count. Normalize once, then compose lighting around it.
- **Only images available:** use a strong image with depth layers, masking, parallax, or 2D canvas. Do not invent a 3D product when the asset cannot support a close-up.
- **No assets:** make an art-directed geometric or typographic experience only if it suits the subject; otherwise source or create a suitable asset with permission and license clarity.
- **Generated asset service available:** inspect outputs before integrating; optimize GLB and textures. A generation step is optional and must not block building the page.

## What weak agents tend to miss

- A beautiful hero followed by generic unrelated cards.
- All sections using the same camera angle, with only text fading in.
- 3D object and headline competing for the same area.
- A signature interaction hidden behind a custom cursor and unavailable on touch.
- Vague copy, fake data, or a CTA leading nowhere.
- An imported model with default gray lighting and no visual inspection.
- A style borrowed from the examples instead of chosen for the new brief.
