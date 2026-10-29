---
name: performance-fallback
description: Keep a cinematic 3D landing page responsive and usable across phones, reduced-motion preferences, weak GPUs, failed assets, and WebGL/context loss.
---

# The experience must survive the real device

A cinematic page fails if the hero only works on a development workstation. Performance and fallback are design decisions: camera framing, asset budgets, effect budgets, content layering, and input alternatives should be planned before final polish.

## Budget before detail

List model bytes, texture bytes, triangle count, draw calls, render targets, shadow maps, and post passes. Bound device pixel ratio by device class and performance observations. Keep render target resolutions proportional to the screen. Use instancing for repeated geometry, precompile important shader variants, and avoid toggling material features or light counts mid-scroll if it causes a hitch. Pause the frame loop when the tab is hidden and when the canvas is fully covered or out of view.

## Progressive scene

The semantic HTML page and core CTA render first. A poster or lightweight scene can cover the loading period. Only show the expensive world after required assets are ready and a first frame has rendered. If a model fails or WebGL is unavailable, reveal the poster and keep all content and controls accessible. Context loss should not leave a permanent blank panel. If the signature interaction cannot run in fallback, offer the same information through DOM text or a simplified control.

## Phone and reduced motion

Do not merely lower font size. Recompose camera stations for portrait, simplify high-cost effects, reduce particle and reflection budgets, and keep text out of the subject. Respect touch scrolling; only prevent default while a deliberate gesture is active. For reduced motion, show authored still states, shorten camera travel, remove constant parallax, and preserve information and action. Test keyboard focus and screen reader labeling separately from the visual scene.

## Measure and decide

Capture frame times while idle, scrolling, and interacting on both desktop and phone. Record slowest asset and total transferred bytes. If the page drops frames, disable the costliest secondary effect first, not the central subject or content. Check cold-cache load, slow network, reload halfway down the page, browser Back, and background tab return. Report what was not measured rather than claiming universal smoothness.

