# 03 — Loader, scroll, interaction, and accessible motion

## Loader that tells the truth

A loader is an opening scene, not an arbitrary timer. Dioramas uses subject-shaped loaders: Florae draws florets as assets prepare; Abyssal marks a dive checklist; Horologie stages the watch's assembly. Transfer the principle, not the visuals.

Implement three states: `loading`, `ready`, and `failed`. Start the critical asset promises, count settled bytes/items or use loader progress events, and reserve a small final stage for shader compilation if that is measurable. Smooth the display value toward actual progress, but never show 100% before the first frame is ready. A short minimum display time can prevent flashing; it must not create an indefinite wait. Add a timeout/error path, keep the page accessible, and give the loader a text status (`role="status"`, `aria-live="polite"`).

A correct exit sequence: required assets settled → model materials and camera composed → shader compile/first render → show 100% → animate loader out → make it inert/removed → intro timeline begins. `renderer.compile(scene, camera)` is used in the Dioramas examples before `engine.start()` and `loader.finish()` to avoid first-interaction hitch. A 3D failure should display the readable DOM and a fallback visual, not a permanent 0% screen.

## GSAP + Lenis, when the project uses them

Keep one clock. The original engine connects Lenis and ScrollTrigger like this:

```js
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({ lerp: 0.085, smoothWheel: true, syncTouch: false });
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add(time => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```

Use the installed versions' current APIs. Keep native anchor and keyboard behavior. If a smooth-scroll library breaks focus, hashes, touch, or back navigation, fix that or use native scroll. Clean up ticker/listeners on teardown. Respect `prefers-reduced-motion: reduce` by skipping smooth scroll and nonessential scrubbed motion.

## Scroll choreography

- Give each station a scroll span and a target state. Use ScrollTrigger `scrub` or an equivalent normalized progress mapper. Bind one progress stream to the scene controller.
- Initialize from actual scroll position on load/refresh; do not assume the visitor starts at zero.
- Test forward, reverse, fast wheel, trackpad, touch, and direct anchor navigation. End states must be exact and stable.
- A DOM reveal is subordinate to the scene. Do not run every heading through the same generic split-text animation. Choose one or two reveal motifs related to the world.
- Crossfades, rotations, and camera moves should overlap intentionally. Avoid a blank frame between stations.
- Design the CTA station as a calm final composition so the primary action is easy to see and click.

## Signature interaction contract

Every interaction needs `hint → input → response → limit → reset`. Example: “Hold to crack” appears by the object, holding visibly charges it, cracking has a defined threshold, releasing early settles safely, and replay is possible. The input must be available without a mouse (button/keyboard and touch). Use pointer capture if a drag must continue outside the target. If audio is used, start its context only after a user gesture and provide mute/off.

## Reduced motion and fallback

`matchMedia('(prefers-reduced-motion: reduce)')` is not just a CSS toggle. Show the finished composition immediately, shorten/disable loader flourish, avoid continuous camera drift and parallax, and let sections reveal with no or simple opacity transitions. Keep the interaction meaningful through discrete state changes. If WebGL is unavailable, use a poster image or CSS composition and preserve all copy, controls, links, and CTA. Do not hide essential text in canvas pixels.

## Common motion failures to catch

- Loader percentage is a setInterval independent of real assets.
- Intro starts under the loader; the first useful frame is missed.
- ScrollTrigger owns one transform while a render loop overwrites it.
- Camera jumps on resize or mid-page refresh.
- Constant pointer-follow motion makes text hard to read.
- Cursor hint is the only instruction and disappears on touch.
- Pinning traps focus or creates a huge empty gap on mobile.
- Disabled motion also disables information or the CTA.
