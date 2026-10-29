---
name: cinematic-buttons
description: Build purposeful CTA, toggle, tab, hold, and scene-control buttons for cinematic landing pages with complete states, accessible input, and 3D feedback.
---

# Controls are promises

A button's label promises an outcome. In the twenty worlds, controls power a mech, crack a stone, change a climate, play a record, select an X-ray mode, rev an engine, wind a watch, or reserve a visit. The action must visibly happen, and its state must agree with the 3D scene. A button that only triggers an unrelated glow breaks trust.

## Choose the correct element

Use `<a>` for navigation and `<button>` for state changes. Use real form controls for data input. Give buttons a verb plus object: `Power up`, `Reveal plate`, `Change climate`, `Play record`, `Add to box`. Avoid multiple identical “Explore” buttons with different behaviors. Preserve default keyboard activation unless a hold interaction needs explicit press/release handling.

## Implement all visible states

Design idle, hover on fine pointers, focus-visible, pressed, loading/charging, completed, disabled, and error where relevant. A toggle exposes `aria-pressed`; tabs use tab roles/selection or a simple button group with an evident selected state; a menu button exposes `aria-expanded`. Animation should not be the only indicator of selection. The active state can change a gauge, material, lighting, and label together. Button text should remain legible in every scene lighting phase.

For hold actions, use a state machine rather than CSS `:active` alone. Pointerdown begins charge; pointerup/cancel/blur ends it; keyboard keydown and keyup on the focused button drive the same value; touch uses the same pointer events when supported. Prevent accidental scrolling only while an intentional drag or hold is active. Show the threshold before completion. An early release should settle to idle or a documented partial state, not leave a half-powered machine.

## Physical feedback

Use feedback that fits the world. A throttle button might compress and brighten while RPM climbs; a glass wipe control could show a clearing stroke; a watch winding button could produce one measured ratchet tick. Avoid adding magnetic movement or spring bounce to every button. Keep UI animation brief enough that the visitor can make repeated choices without waiting. For reduced motion, retain color, text, and state changes without large travel.

## Verify

Activate every button with mouse, touch, Enter, and Space. Check disabled behavior, repeated activation, rapid cancellation, WebGL failure, and scene changes during a hold. Confirm the element has a useful accessible name and its visible label matches the actual result.

