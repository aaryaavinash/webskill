---
name: cinematic-loader
description: Design a subject-specific loading sequence for a 3D landing page, tied to real asset and shader readiness with a safe exit and fallback. Use when the opening transition must introduce the world.
---

# The loader is the first scene

The loader should teach the visitor the page's visual language while preparing the actual experience. Florae can assemble a bloom, Abyssal can descend through a depth instrument, Horologie can align watch components. Choose a metaphor from the new subject, not a generic spinner. Keep it short enough that a fast connection does not feel punished.

## Define truthful readiness

List critical assets required for the first meaningful frame: model, environment, fonts, textures, sound only if sound is essential, and any alternate shader that appears immediately. Use loader events or settled promises to calculate progress; do not increment a fake percentage on a timer. A display value may ease toward real progress, but it cannot exceed completed work. Separate `loading`, `ready-to-compile`, `ready-to-reveal`, and `failed` states. Treat 100% as **first frame ready**, not merely file downloads complete.

Boot order: show semantic page shell and loader status; begin asset requests; create the scene; prepare materials and camera; compile relevant shader programs; render a first frame while loader covers it; update status; animate the loader away; enable interaction and intro. If compilation fails, reveal the DOM and fallback image. A minimum display time may prevent flashing, but set a finite timeout and never hold a visitor in an endless loop.

The actual loading UI must contain readable text (`role="status"`, `aria-live="polite"`) and a way through a failure. Keep the nav/CTA available if the 3D layer fails. The loader exit should remove or inert its overlay so it cannot block clicks. If a user asks for reduced motion, show a brief static brand frame and reveal the finished composition without a large animated sweep.

## Choreograph one transition into the hero

The final loader shape should relate spatially to the first scene. A gauge can become the page HUD; a line can align with a horizon; a shutter can open to expose the subject. Sequence it explicitly: loader reaches ready → overlay departs → hero camera/light/subject intro begins → input hint appears. Do not start the intro hidden underneath the loader. Use one master timeline or one state machine. Test a fast cache hit and slow throttled load; both should reveal a composed frame.

## Failure cases to exercise

Test a missing model URL, unsupported WebGL, shader compile failure, font delay, context loss, tab hidden during loading, and reload at mid-page. In each case, people can read the page and reach the primary CTA. Record the failure in console or status; never pretend the 3D scene loaded.

