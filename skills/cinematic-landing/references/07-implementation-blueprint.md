# Implementation blueprint: from blank repo to a directed world

This is a teaching plan for an agent that needs explicit steps. Adapt it to the user's framework and existing code. It is not permission to replace a working app, import Dioramas art, or force Three.js where a simpler page meets the brief. For a requested Dioramas-level 3D landing page, the minimum is a real subject/world, multiple scene states, a connected direct interaction, a truthful load, semantic content, and rendered QA.

## 0. Inspect before creating

Read the package scripts, framework, public asset folder, existing visual tokens, route structure, and deployment path. Identify where the landing page belongs. List the assets already present. Confirm rights for every third-party model, image, font, audio file, and texture. If the user supplied a reference or screenshot, describe its subject, camera, color, lighting, type, pacing, and interaction before using it. A screenshot reveals only one state; inspect the live reference or source when available for behavior.

Write a short evidence note:

```text
Subject: what the page presents
Available asset: model/photo/procedural source, size, rights, quality
Framework: existing renderer, build system, deployment base path
Reference behavior: what was observed, not guessed
Missing: what must be created or approximated honestly
```

## 1. Write a concept that can be built

Use one primary physical/narrative variable. Examples: `depth`, `heat`, `season`, `dayTime`, `charge`, `rpm`, `replayPly`, `liquidTilt`. Choose one action that changes it or reveals a related part. State three things a visitor will remember: opening image, most important transition, result of their action. Define a real CTA destination and content sections.

Make a shot list:

| Beat | Visitor learns | Camera | World/material | HTML | Action |
| --- | --- | --- | --- | --- | --- |
| Hero | core promise | framing A | baseline light | title + CTA | hint |
| Explain | first proof | framing B | reveal part | concrete copy | inspect |
| Transform | key change | framing C | change physical state | evidence/readout | signature input |
| Resolve | outcome | framing D | calmer final state | CTA | convert |

Add sections only if they introduce a new fact or visual state. For each shot, sketch text-safe and subject-safe screen areas on a 1440×900 desktop and 390×844 phone. Write the palette and type roles, including how text contrast changes if the scene becomes light or dark.

## 2. Build semantic content before scene polish

Create `<header>`, `<nav>`, `<main>`, named `<section>` elements, real headings, button/link controls, a working CTA, and `<footer>`. Ensure the page reads from top to bottom with WebGL disabled. Give each section an ID. Use links for navigation and buttons for state changes. Add a skip link and visible focus state. Set `scroll-margin-top` for anchor targets. Make the hero title and paragraph specific to the subject. Do not use the same CTA label for different actions.

The canvas is a background/image layer (`aria-hidden="true"` when it conveys no unique accessible information). The DOM explains any visual fact needed to use or understand the page. If the 3D object is interactive, put an equivalent named DOM button near it. The canvas must not intercept header, text links, or forms.

## 3. Build the hero scene as a still

Create renderer, scene, camera, environment, subject, ground/context, and lights. Resize at the actual container size; cap device pixel ratio. Inspect one rendered frame before animation. Use the scene's coordinate system consistently. For a GLB, load it, calculate bounds, normalize size, and keep a group for intentional pivot/orientation. For a procedural subject, design geometry that carries the new concept rather than using a default sphere/torus. Give the subject a plausible environment: shadow surface, sky/horizon, backdrop, panels, architecture, or atmospheric depth.

**Lighting pass:** key describes the form; fill keeps dark side readable; rim separates it; environment gives reflective materials a reason to shine. **Material pass:** base color/roughness/metalness/normal maps in correct color spaces. For glass, show what it refracts. For wet material, show light and surface variation. For emissive parts, let nearby objects respond. Turn post effects off until the base frame looks good.

If the still frame does not explain the site, stop here and revise. Animation will not fix a weak object or camera.

## 4. Define scene-state ownership

Use a controller object that holds **targets**, **live values**, and **transient input**. Scroll derives the target; input adds a bounded offset or temporarily takes control; the frame loop applies live values to Three objects and DOM readouts. Avoid multiple writers to the same transform.

```js
const state = {
  story: 0,             // section index + local 0..1 fraction
  targetStory: 0,
  physical: 0,          // subject-specific value: depth, heat, time, etc.
  pointer: { x: 0, y: 0 },
  interaction: { phase: 'idle', amount: 0 },
  reducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches,
};

const stations = [
  { cam: [0, 2, 7], look: [0, 1, 0], fov: 38, subjectYaw: -0.2, light: 0.6, fog: 0.0 },
  { cam: [2, 1.5, 4], look: [0, 1, 0], fov: 44, subjectYaw: 0.3, light: 1.0, fog: 0.1 },
];
```

The numbers above are illustrative, never copied blindly. Compute them from the real scene. Keep a separate portrait station table when framing changes materially.

Per frame: read one scroll target; derive station endpoints and local fraction; interpolate baseline camera/subject/light/fog; compute physical value; apply input/idle behavior within bounds; update anchored labels/HUD; render. Clamp `dt` after long background pauses and use time-based damping (`1 - Math.exp(-rate * dt)`). On reduced motion, jump or quickly crossfade between composed stations while keeping information visible.

## 5. Connect DOM scroll to scene state

Measure actual section positions. For the active interval, compute a normalized `t` from DOM rectangles or use ScrollTrigger scrub to update a single controller value. On resize, refresh measurements and evaluate the current scroll position immediately. Do not assume every section is exactly one viewport tall; text wrapping changes heights.

```js
function progressWithin(section) {
  const rect = section.getBoundingClientRect();
  const travel = Math.max(1, rect.height - innerHeight);
  return Math.max(0, Math.min(1, -rect.top / travel));
}
```

This simple function works for a tall section; short sections need a different start/end interval. The important rule is that DOM geometry and scene-state mapping agree. For a discrete replay, derive the exact event index and event-local fraction from progress; never advance by wheel-event counts. For a physical journey, map progress to units such as meters or hours, then derive every effect from that unit.

If using Lenis and GSAP ScrollTrigger, connect Lenis's scroll callback to `ScrollTrigger.update` and let one ticker advance Lenis. Anchors, focus, browser history, and touch scrolling must still work. If smooth scroll is not essential, native scroll is acceptable; the cinematic quality comes from scene direction rather than the library name.

## 6. Build one direct interaction

Write the interaction contract before handlers:

```text
Hint: visible instruction near object/control
Input: mouse, touch, keyboard equivalents
Active feedback: what changes every moment
Threshold/limit: how completion is reached
Cancel/release: what happens if stopped early
Outcome: what permanent or temporary change remains
Reset: how to replay or undo
```

Implement a state machine; do not use a dozen booleans that can contradict each other. For a hold, track elapsed seconds from real frame time. For a drag, capture the pointer and compute a world-space ray/plane hit; use a movement threshold to distinguish tap from drag. Handle `pointercancel`, `blur`, and teardown. The same state value should drive the DOM gauge and 3D response. If the object itself is not pickable on touch, provide an adjacent DOM control.

Examples: `charge` powers bay lights and reveals the mech; `dayTime` rotates sun, changes shadows and windows; `heat` changes steel emission, coals, and sparks; `lensMode` changes the render pass and explanatory labels. Decorative cursor movement is not enough.

## 7. Design truthful loading and exit

Track promises/events for the first frame's required assets. Show a status message and a progress representation only when it reflects real work. Prepare the scene at the correct starting scroll state, compile initial and soon-visible shader variants, and render a covered first frame. Then finish the loader and begin the hero intro. A warm cache may finish quickly; do not force a long fake delay. If load or compile fails, remove the overlay and reveal the DOM and poster; include a concise recovery message if the core visual is unavailable.

Never call the loader finished before the viewer can see a stable frame. Never let a failed asset trap the page. Sound should not block visual readiness unless sound is essential to the requested experience.

## 8. Integrate typography, labels, and controls

Treat each station like a designed spread. Position text relative to the subject's **projected** bounds. Update world-anchored labels after camera motion. Keep measurement data sourced from the same physical value as the scene. Make nav active state and anchor position agree. Maintain contrast as lights and background colors change. A CTA can be calm and bright even if the story's interaction was dramatic.

Use an explicit mobile composition. On portrait screens, shift the camera target, FOV, or subject group so the subject sits above/beside copy. Reflow labels into a list if projection is crowded. Do not make core type tiny to rescue the 3D frame.

## 9. Add atmospheric detail, then cut excess

Particles and post effects should explain the world's forces. Sparks follow impact velocity; leaves follow season and gravity; rain follows wind and light; dust defines beams; marine snow exposes descent. Give every system a count budget, emitter, lifetime, and settle rule. Add AO, bloom, DOF, reflections, and noise one by one, comparing against the clean render. Remove an effect that does not make the subject or action easier to read.

If audio exists, start after user gesture, link it to the physical state, expose mute, and keep the silent variant complete.

## 10. Rendered acceptance gate

Do not finish at `npm run build`. Capture:

1. Cold load and first visible frame.
2. Final hero frame at desktop and 390 px portrait.
3. The middle of every section and the midpoint of every camera transition.
4. Signature interaction idle, active, complete, early release, and reset.
5. CTA frame at desktop and portrait.
6. Reduced-motion and WebGL-failure variants.

Then operate links, buttons, keyboard focus, touch gestures, direct anchors, browser Back, fast scroll, reverse scroll, and refresh in the middle. Check frame time and download size. Correct visual problems found in screenshots; do not claim that a code review substitutes for seeing the page. If no browser is available, report exactly which visual checks remain unverified.

## Common failure diagnosis

| Symptom | Likely cause | First fix |
| --- | --- | --- |
| “Looks like a CSS mockup” | no real subject/world or lighting | build/obtain geometry and a composed environment before motion |
| “3D object just spins” | no section states | author several camera/material/lighting beats with distinct information |
| “Motion feels random” | independent animation loops | derive effects from one physical state and stage cause/consequence |
| “Scene looks flat” | missing environment, shadows, or surface detail | inspect clean PBR render under a motivated key and reflection source |
| “Loader is dishonest” | timer-driven percentage | connect progress to assets, compilation, and first frame |
| “Mobile loses the subject” | desktop camera reused unchanged | make portrait camera poses and label layout |
| “Click doesn't matter” | UI animates but subject does not | bind the control to material, light, geometry, or narrative state |
| “CTA cannot be used” | canvas/overlay intercepts input | fix layering, remove loader, keep action in DOM |
