---
name: world-3d
description: Build the three-dimensional subject and environment of a cinematic landing page, including asset choice, scene scale, materials, lighting, camera, rendering, and fallback. Use for real WebGL scenes; not for a CSS illustration.
---

# Build a world, not a floating object

Read this when a page needs a real 3D subject. Read the local project and assets first; use its existing renderer/framework if present. If this skill was installed with `cinematic-landing`, read its `references/06-world-by-world.md` and choose a fitting example mechanism. The finished page must still have semantic HTML text, navigation, and CTA outside the canvas.

## 1. Define the stage in world units

Write a scene map before building geometry: subject bounds, ground plane or surrounding set, origin, camera start, light positions, and collision/interaction planes. Determine where page copy occupies the viewport on desktop and mobile. Place the subject in the remaining visual field; test its projected screen bounds. Do not center a product and then place text over it.

Choose one hero object with a distinctive silhouette. If a suitable GLB exists, inspect its scale, orientation, triangle count, UVs, material maps, and animation clips. Normalize its bounding box once and preserve the source's texture color space. If no suitable asset exists, create a procedural form that relates to the subject; do not claim a torus/sphere is a product model. A premium product page often needs a high-quality source model or photo. If that is unavailable, make the new scene a credible abstract sculpture and describe it honestly.

## 2. Build the environment before post effects

Give reflective materials something to reflect: a floor, backdrop, horizon, softbox panels, architecture, sky, or surrounding objects. Set a motivated key, softer fill, and separation/rim light; each needs a reason in the world. Place shadow receivers and tune near/far shadow planes tightly around the subject. For glass, metal, water, or wet ground, inspect reflections at the real hero camera; an empty environment turns glass white and metal black. Use physically based material maps with correct color space, roughness, metalness, normals, and environment intensity. Look at the unprocessed render before adding bloom, AO, noise, vignette, or depth of field.

Examples from the collection: Reliquary's lantern is the key light; Monolith's draggable sun changes hard shadows and window emission; Nocturne's tall studio strips become the glass highlights; Racer's workshop and neon are visible in wet surfaces; Terrarium's window is legible in the cloche reflection.

## 3. Author camera stations

For each story section, store `position`, `lookAt`, `fov`, subject pose, and important effect values in one station object. Make hero, middle, interaction, and CTA compositions separately. Interpolate the camera position and look target through a path that avoids crossing the subject; a straight line between two good shots can be a bad shot. Keep the subject's projected position stable enough for reading during the handoff. On portrait screens use a different station table or camera offset/lens shift, not merely a smaller canvas. Recompute projection on resize. When the page starts at a mid-scroll position, evaluate the station state immediately before showing the first frame.

```js
// Example state shape; measurements belong to the actual scene.
const stations = [
  { camera: [0, 1.8, 6], look: [0, 1.1, 0], fov: 35, light: 0.8, subjectYaw: -0.3 },
  { camera: [2.4, 1.5, 3], look: [0, 1.0, 0], fov: 42, light: 1.0, subjectYaw: 0.25 },
];
```

Use separate render state objects instead of letting GSAP, scroll code, and a frame loop each write `camera.position` independently. Input may add a small bounded offset after the scroll pose is calculated. Damp input with frame-rate-independent smoothing such as `1 - exp(-lambda * dt)`.

## 4. Make the scene tell the same story as the text

Change more than camera angle. Decide which part is revealed, material state, light temperature, weather, particles, or atmosphere changes at every station. If the page explains a mechanism, make that mechanism visible in 3D: a carbon plate inside a shoe, layers inside a terrarium, gears in an exploded watch. If it sells a place, show environmental progression: descent, dawn, travel, season. Use restrained secondary motion to establish life, and let it settle at the CTA.

## 5. Manage startup, cost, and failure

Load only assets used in the immediate experience. Track real readiness, compile the initial scene and alternate materials, render one frame, then exit the loader. Keep DPR bounded; measure draw calls, triangles, texture memory, FPS, and largest downloads. Reduce particle count, reflection resolution, shadow size, or effects for mobile before sacrificing content. Pause rendering when hidden and dispose geometry, textures, render targets, listeners, and animation frames on teardown. Handle context loss and failed assets with a poster or CSS composition; all HTML remains usable.

## Acceptance frames

Capture hero, every camera transition midpoint, interaction complete, CTA, mobile hero, and mobile interaction. Reject clipped objects, empty reflections, blown highlights, text over busy geometry, camera paths through a set, or a blank WebGL fallback. Compare the rendered frames with the page's written concept, not just with successful compilation.

