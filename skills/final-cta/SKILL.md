---
name: final-cta
description: Design the final story scene and conversion action of a cinematic landing page, ensuring visual resolution, truthful action, usable controls, and fallback.
---

# End the story where a visitor can act

The reference worlds do not end with a generic glowing button pasted onto a busy canvas. The camera settles, the subject reaches a resolved state, and the page gives a clear next step: book the dive, visit the atelier, join the salon, reserve a room, or install the skill. The CTA must be truthful for the actual site. A demo cannot imply a live checkout or reservation if none exists.

## Compose the final frame

Choose the subject's resolved state: finished blade, calm pond, lit machine, open geode, dawn lighthouse, assembled watch. Reduce competing particle/light motion. Place text and action in an area that stays stable while the canvas runs. Make the primary action obvious, with one secondary action if it helps. A visitor should understand what happens on activation without reading implementation notes.

## Implement the action

Use a link for navigation/download/installation instructions; use a button only for an in-page action. Make the URL or form destination real. Provide visible focus, touch-sized hit area, and clear success/error handling if the action submits data. If the destination is external, label it when that matters. Keep the CTA available when WebGL is unavailable or reduced motion is enabled.

## Verify the last meter

Load the page directly at the CTA hash, check the 3D scene lands at its final station, then activate the action with keyboard and touch. Test narrow screens, long translated/wrapped copy, and slow assets. No canvas overlay or invisible loader should intercept the control. The footer should give a way back through the story.

