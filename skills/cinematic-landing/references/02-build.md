# 02 — Page and scene architecture

Use the project's existing framework. The architecture below is a reliable pattern, not a required folder layout.

## Separate responsibilities

- **DOM:** semantic nav, headings, descriptions, CTA, controls, status, preloader, captions, and fallback. DOM owns focus, accessible names, text selection, links, and responsive layout.
- **3D renderer:** object, camera, lights, background, depth, shadows, special effects. A fixed canvas behind/alongside the DOM may persist across sections. Put `pointer-events: none` on noninteractive overlays, and restore it on links/buttons.
- **Motion controller:** one normalized page/section progress value drives target camera, object, and lighting states. Pointer input adds a small offset; it must not overwrite the scroll state.
- **Asset loader:** tracks real promises and exposes ready/error states. Render first frame before removing the loader.

## Build order that prevents a hollow demo

1. Implement the semantic page with nav, hero, content stations, CTA, footer, and static visual fallback. Verify the copy and responsive layout before 3D.
2. Place the available object/image in the hero and find a composed camera angle. Judge a screenshot before adding effects.
3. Add a motivated key, fill, and rim; check material maps and contact shadows. Set color management/tone mapping intentionally. Add AO, bloom, volumetric light, or reflection only to solve a visible need.
4. Define station targets for camera position, look-at, object pose, light values, background, and text placement. Scrub between them.
5. Add one signature interaction and its touch/keyboard route. Show a short hint near the point of interaction.
6. Add actual asset loading and world-specific exit/intro animation. Compile shaders before the loader exits when the renderer supports it.
7. Tune mobile as its own composition: camera distance, lens shift or layout, fewer effects/particles, touch target placement, readable copy.
8. Run the visual quality gate, fix the largest visible flaw, and repeat until each station is intentional.

## Camera state, not accumulated deltas

Store section states explicitly. Each frame derive the target from scroll progress, then smooth current values toward the target using `dt`-aware damping. Do not add `delta` on every scroll callback; that drifts on reverse scroll or refresh.

```js
const states = [
  { cam: [0, 1.2, 7], look: [0, 0.6, 0], turn: 0, light: 2.0 },
  { cam: [2, 1.5, 5], look: [0, 0.4, 0], turn: -0.6, light: 2.8 },
  { cam: [-1, 1.9, 6], look: [0, 0.2, 0], turn: 0.35, light: 1.5 },
];
// Resolve the pair surrounding normalized scroll progress, interpolate targets,
// then ease camera/object/light toward them with 1 - exp(-lambda * dt).
```

Use quaternion interpolation for substantial orientation changes; scalar Euler interpolation can take the long way around. Recalculate camera aspect/projection and any postprocess targets on resize. Keep object transforms and camera state in one controller rather than competing GSAP timelines.

## Three.js scene checklist

- Clamp DPR (often around 1.5–2 desktop, lower on weak/mobile devices); update `renderer.setSize` and camera aspect on resize.
- Set a real scene background when transmission/refraction requires a color behind glass.
- Inspect model orientation and scale; normalize and place it once, then establish floor/contact reference.
- Preserve PBR maps. Use a suitable environment/reflection source when metal or glass matters. Avoid changing roughness/metalness blindly on every mesh.
- Add directional/spot light targets to the scene if the library requires them. Check shadow bias, map size, and whether the shadow is visible at the actual camera angle.
- Keep post effects ordered and tuned against output. Bloom should catch highlights, not wash out the whole object; AO should add contact, not dirty every surface.
- Do not run expensive particle/GPU effects by default. If used, establish a mobile count and fallback.
- Stop or reduce rendering when the page is hidden or the scene is fully obscured. Dispose geometries, materials, textures, and listeners on teardown in apps with navigation.

## Safe boot sequence

`DOM readable → loader visible → start asset promises → build scene → await required assets → compile shaders → render a stable frame → finish loader → play intro → enable interaction`. If an essential asset fails, reveal the static page and an honest fallback; the loader must terminate. Optional assets may continue after first paint.

## Page-level constraints

Do not carry over Dioramas' collection navigation or paths into a standalone site. Use one site at `/`, with internal anchors that work. Keep the canonical source of object and camera state obvious. Document any third-party asset/license included in generated output.
