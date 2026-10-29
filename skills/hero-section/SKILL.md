---
name: hero-section
description: Design and build the opening frame of a cinematic landing page, including subject framing, title, first 3D motion, primary action, and transition into the story.
---

# The hero is the first composed frame

Open `cinematic-landing/SOUL.md` and the 20-world guide when they are installed. The hero must communicate the new subject in one glance. It is not a standard two-column SaaS hero with a decorative sphere beside copy. The real subject occupies a deliberately framed region; type, light, background, and call to action are placed around that region.

## Design the still before motion

1. Write the subject's name and one promise in plain language. Find one visual fact that can be shown immediately: an illuminated relic, an underwater vessel, a hot blade, a fogged terrarium, a live pond, a shoe whose internals can be revealed, or another subject appropriate to the new page.
2. Sketch three frames: wide desktop, 390 px portrait, and the frame one viewport below the top. Mark safe zones for title, subtitle, action, navigation, and interaction hint. The subject should have a readable silhouette in all three.
3. Define the camera's actual position/look/FOV, subject orientation, key light, fill, shadow surface, and background. Do not write `left:50%` for the subject without checking the projected bounds. A wide desktop may need the subject on the right; a phone may need it above the title.
4. Render that still. If it is weak, fix object quality, light, camera, or type. Do not add orbit rings, particles, grain, or bloom as camouflage.

## Intro sequence

The sequence begins only after assets, fonts needed for the hero, and the first 3D frame are ready. Choose one subject-shaped reveal: a lamp lights the hall, the sub breaks the surface, a blade heats, a condensation streak opens, a machine powers up. Sequence the moment so the visitor sees cause: environment hint → subject reveal → title settles → primary action and interaction hint become available. Set initial state in code before the first render to prevent a flash at the final pose. Provide a reduced-motion version that displays the final composed frame immediately.

Avoid a long intro that blocks navigation. A visitor who scrolls, focuses a nav link, or uses a CTA during the intro should be able to proceed. Keep nav and CTA in semantic HTML. If the scene fails, a subject-specific poster image or designed fallback should occupy the hero while the text stays usable.

## Source mechanisms to learn from

- Reliquary's lantern physically discovers the hero title and relic; the pointer is not just parallax.
- Florae's rose is recognizable at rest before the particle sculpture morphs.
- Hangar's black/red standby state gives a clear before/after for its hold-to-power interaction.
- Terrarium exposes the miniature world through one clear streak, which also teaches visitors to wipe.
- Racer shows the wet bike in a real street set whose lights reflect in the material.

## Review checklist

Freeze the animation at first paint, reveal midpoint, final hero, and first scroll handoff. At each frame verify subject identity, text contrast, action prominence, stable composition, and no clipping. Check 360/390 px portrait and wide desktop. The hero should invite the signature interaction, but the site must also make sense if the visitor never touches the scene.

