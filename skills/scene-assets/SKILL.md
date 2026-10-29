---
name: scene-assets
description: Select, inspect, optimize, license, and integrate 3D models, textures, photos, fonts, and audio for a cinematic web page without hiding weak source material behind effects.
---

# Asset quality sets the ceiling

The twenty projects pair their interaction with a recognizable object: a sword, terrarium, koi, shoe, mech, watch, bike, house, record, or landscape. A generic procedural sphere cannot stand in for all of them. Before implementation, list which assets are already available, their rights, and what the site genuinely needs. Never assume an image-to-3D API, paid model generator, or a private asset path exists in the user's project.

## Inspect the subject

Open each model in a viewer or render a turntable. Check orientation, real bounds, scale, silhouette at the intended camera, geometry holes, UV seams, texture maps, animation clips, and whether interior details needed by the story exist. Normalize to scene units without destroying the model's local pivot. Decide if a source model can survive a macro close-up; if not, keep it at a suitable distance or replace it. For an exploded/inspect experience, verify there are actual separable parts or build explanatory procedural components. Do not promise an X-ray of internals that were never modeled.

Inspect texture color space: color maps use sRGB, normal/roughness/metalness maps remain linear. Use reasonable anisotropy and filtering. Prefer compressed, correctly sized formats where the project pipeline supports them. Track triangle count, draw calls, material count, GPU texture size, and download size. Mobile can use a simpler model or lower texture resolution while retaining the same subject identity.

## Build supporting assets deliberately

A floor texture, studio environment, poster fallback, font, and small sound can improve the page more than thousands of arbitrary particles. Make the background relevant: a forge needs soot/brick and heat, a glass bottle needs softbox reflections, a bike needs wet street light. Every visible reflection implies a surrounding world. If you use generated imagery, make its license and provenance clear and avoid copying the Dioramas reference images.

## Rights and attribution

Keep a list of asset source, creator, license, modifications, and where used. Confirm that fonts, models, textures, photos, and sound permit web distribution. Do not copy Dioramas brand assets or model files into a new site unless the actual license allows it. Its design patterns may be studied; its fictional product names and art remain separate. Preserve required third-party license notices in the shipped repository.

## Fallback

Create a static poster from the final composed scene or an alternate designed image. Keep its color and crop aligned with the HTML so a WebGL failure feels intentional. Never substitute a blank rectangle or hide the copy.

