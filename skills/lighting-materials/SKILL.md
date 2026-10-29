---
name: lighting-materials
description: Art-direct 3D lighting and physical materials across a cinematic page, including glass, metal, water, wet ground, shadows, environment maps, and scene-state transitions.
---

# Light explains the material and the story

Before effects, decide what emits or reflects light in the scene. A lantern, forge, window, sun, projector, neon sign, headlight, or studio strip can motivate the image. The reference pages change light with the narrative: Abyssal loses sunlight with depth, Monolith turns the sun, Hangar powers bay lights, Keeper searches with a beam, Ember heats steel, Racer raises headlight power with RPM.

## Lighting pass

Start with one motivated key. Place a weaker fill to retain form and a rim/back light only where it separates the subject. Set shadow maps around the actual geometry; avoid huge shadow frustums with muddy resolution. Test a neutral clay material first to verify composition, then restore product materials. Tune exposure and tone mapping once the base light works. Postprocessing may enhance atmosphere but cannot create missing shape.

## Material pass

Inspect the real surface under the actual hero camera. Metal needs high-contrast environment reflections and controlled roughness; glass needs thickness, IOR, absorption/attenuation, and meaningful objects behind it; water needs depth, normals, reflection/refraction, shoreline or contact; wet asphalt needs irregular roughness/puddles and nearby lights; glowing heat needs emissive intensity and color variation, plus local environmental response. A material should change with input where the story demands it. For example, a heated sword changes emission and nearby light; a wiped cloche changes roughness and transparency; a day-night house changes windows and pool at night.

## Scene-state table

Store light color, direction, intensity, fog, exposure, and relevant material uniforms per station. Interpolate from one normalized story value. Keep the number of visible light objects stable when possible to avoid shader recompilation mid-scroll; vary power instead. Update CSS contrast for overlays when the scene switches bright/dark. Test the exact transition midpoint, not only both endpoints.

## Performance

Use reflection resolution and volumetric effects proportionally to screen size. Test without AO/bloom/DOF first; turn on one effect at a time and check its cost. Do not run a full-screen reflection at maximum resolution on a phone if a lower-resolution surface reads the same. Pause offscreen rendering.

## Review

At every station ask: where is the key, what material fact is visible, what casts and receives shadow, what does the reflective surface show, and can the text be read? If an object only reads because of bloom or a bright outline, rebuild the base lighting.

