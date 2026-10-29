---
name: world-interaction
description: Build a meaningful interactive mechanism inside a cinematic landing page, including pointer, touch, keyboard, feedback, threshold, physical response, and reset. Use for drag, hold, aim, reveal, physics, or object manipulation.
---

# An interaction must change the world

Choose one signature action tied to the page's subject. Examples in the source: aim a lantern to find a relic, wipe condensation from glass, drag daylight over a house, power a mech by holding, rev a motorcycle, crack a geode, scratch a record, guide a boat, or inspect a shoe through a lens. The action matters because it reveals information, changes material, advances a task, or leaves a lasting state. Pointer-follow glitter is insufficient.

## Write the interaction contract before code

For the chosen action, write six facts: **hint, input, active feedback, completion threshold, release/cancel result, replay/reset**. State the equivalent keyboard and touch route. State whether scroll is allowed during input. The hint must appear near the control, remain legible on touch devices, and not live only in a custom cursor. If an object is hit-tested by raycast, also provide an accessible DOM control that triggers the same state transition.

Use a small state machine. Example for hold-to-power: `idle → charging → powered`; `charging → idle` on release before threshold; `powered → reset` via explicit action. Time comes from frame delta rather than frame count. Hold begins only on the intended target, captures the pointer when necessary, and ends on `pointerup`, `pointercancel`, window blur, or component teardown. Keyboard Space/Enter on a focused button runs the same transition. Never hijack Space while the visitor is focused in a form. For drag, distinguish a tap from travel; use a threshold so touch scrolling does not accidentally manipulate a scene.

## Feed one state into multiple visible consequences

A control should have mechanical coherence. In Monolith, time changes sun direction, shadow length, sky, exposure, and text theme. In Racer, RPM changes engine sound, headlight, vibration, tachometer, and exhaust. In Terrarium, wipe modifies glass roughness/transparency, exposes the world, and slowly reforms. In Gambit, moving a chess piece updates the board and notation. Bind these effects to one source value, not independent animations with similar timing.

## Keep the page usable

Use `pointer-events` deliberately so the 3D scene does not intercept nav or CTA. Give pressed/toggled states to DOM controls. Announce a completed action in concise accessible text where needed. Provide mute for sound; create/resume WebAudio only after a user gesture. On mobile, enlarge hit areas and reduce high-cost effects while keeping the core action. A WebGL failure should replace the interaction with a useful image, video, or simplified DOM control and keep the visitor's path to the CTA.

## Verify the physical response

Capture before, during, completed, and reset frames. Test mouse, touch, keyboard, early release, pointer leaving the target, repeated use, and scroll while active. Reject controls whose feedback is confined to a progress ring while the actual subject stays unchanged.

