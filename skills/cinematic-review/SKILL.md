---
name: cinematic-review
description: Review and finish a 3D storytelling landing page by inspecting rendered desktop/mobile states, interactions, performance, reduced motion, keyboard access, and fallback behavior. Use before delivering a cinematic page.
---

# Inspect the rendered experience

Compilation is not visual QA. A cinematic page must be observed at the camera and scroll states a visitor sees. Take screenshots or browser observations at the hero, every section station, every transition midpoint, signature interaction before/active/complete, CTA, mobile hero, and mobile CTA. If browser tooling is unavailable, state that limitation and do not claim visual verification.

## The first pass: composition

For each frame, ask whether the subject has a distinctive silhouette, motivated highlights, readable scale, and a clear relationship to the text. Check the visual hierarchy without relying on animation: could a still frame explain the section? Check surface quality: glass has a world to refract, metal has bright and dark reflections, water has depth and contact, wet ground shows local light. Check whether the scene changes meaningfully between sections; twenty small camera nudges do not equal a narrative.

## The second pass: motion and state

Run slow and fast scroll, reverse, refresh at 50%, anchor navigation, and window resize at a mid station. Camera, model pose, lights, materials, HUD, and copy must agree on the active scene. Exercise the signature action with pointer, touch, and keyboard; test early release, cancellation, repeat, and reset. Check the loader on cold and warm cache and on a failed asset. The page must never strand the visitor behind an overlay.

## The third pass: access and performance

Inspect 360 px, 390 px, tablet portrait, laptop, and a wide desktop. Validate visible focus, reachable nav and CTA, semantic headings, useful control names, adequate text contrast, and a working reduced-motion path. Measure frame rate while scrolling and interacting; count draw calls, triangles, texture memory, total download, and long tasks. Use adaptive DPR and mobile effect budgets rather than rendering a high-resolution desktop scene on every phone. Test WebGL unavailable and context loss; keep the content and action path accessible.

## Delivery standard

Fix the material issues in the actual render before declaring completion. Report what was reviewed, what changed, and any untested device/browser or asset limitation. A polished hero alone is incomplete if the middle scroll frames, interaction, or mobile experience fail.

