---
name: scroll-choreography
description: Connect page scroll to a cinematic 3D scene with authored camera stations, deterministic transitions, section timing, responsive composition, and reverse-scroll behavior. Use when scroll changes the visual world.
---

# Scroll is a scene controller

Use this with `cinematic-landing` for a story page whose canvas persists across sections. The source pattern appears in Abyssal's descent, Gambit's move replay, Atlas's travel, Koen's seasons, Monolith's daylight, and Horologie's exploded movement. Choose one physical or narrative value for the page; do not map all effects to raw `scrollY` independently.

## Map narrative beats to page geometry

Write the section list in visitor language. For each section, define its camera frame, what becomes visible, what changes in the environment, the HTML copy position, and the action the visitor can take. Mark sections that need a dwell/hold so the animation can finish before the next text arrives. The scroll spans should be derived from actual DOM positions and refreshed on resize or content change. Avoid an arbitrary fixed total height that breaks when text wraps on mobile.

Define station progress `s = index + fraction` from 0 to `N-1`. Given a scroll position, find the active section and local fraction, then evaluate every visual property from `s`. Initialize from the current scroll position on load. For discrete narratives such as a chess replay, derive the event index from `floor(s)` and interpolate only the current event. For continuous concepts such as depth or time, map `s` into physical units and drive the gauge, material, lighting, weather, and camera from that value.

```js
function stationAt(progress, stations) {
  const i = Math.min(stations.length - 2, Math.floor(progress));
  const t = Math.max(0, Math.min(1, progress - i));
  const ease = t * t * (3 - 2 * t);
  return { from: stations[i], to: stations[i + 1], t: ease };
}
```

Use an authored transition path. The camera may pull back at the midpoint to clear an object, then ease into the next close shot. Blend position, target, FOV, scene state, and HTML accents together, with intentional overlap. Never create a dead gap where neither old nor new scene reads. If using GSAP ScrollTrigger, let it update one controller value. The render loop consumes that value; GSAP should not also write the same camera transform. If using Lenis, connect its scroll callback to ScrollTrigger, use one requestAnimationFrame/ticker, and keep anchors, keyboard scroll, focus, and browser history working.

## Compose every viewport

The canvas sits behind the DOM, so record text-safe zones at each station. Desktop and portrait screens can have different camera poses and subject scales. On mobile, the subject often belongs above the copy, not simply farther away. Recalculate camera aspect, FOV, and any 3D-anchored labels on resize. Keep CTA links and buttons in semantic DOM, never only on a 3D texture. Control z-index and `pointer-events` so a canvas interaction does not steal links.

## Handle direct input without fighting scroll

Scroll owns the baseline pose. Drag, hover, hold, and pointer parallax add a bounded temporary state. When interaction ends, settle toward the scroll pose without a snap. If direct input changes the current station (Atlas island click, Koen season dial, Monolith sun drag), update or scroll to the matching section and clearly define who owns state while dragging. Do not let a scroll update immediately erase a user selection.

## Test the whole timeline

Inspect the opening, every station, and each midpoint at desktop and phone widths. Test slow forward, fast forward, reverse, direct anchor jump, reload at 50%, keyboard PageDown, and touch scrolling. The same scroll position must reproduce the same essential scene state; random particles may differ, but the subject, camera, material, and story event must not. For reduced motion, shorten paths or jump/crossfade between composed stations while preserving every explanation and action.

