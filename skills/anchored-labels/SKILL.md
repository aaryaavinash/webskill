---
name: anchored-labels
description: Position HUD elements, measurements, hotspots, and explanatory labels against 3D subjects across scroll and camera motion without covering content.
---

# Labels should point to something real

The source worlds use annotation when the story requires explanation: Velocity measures plate and foam, Hangar identifies machine systems, Horologie labels movement layers, Abyssal shows depth and contacts, Atlas pins island names. A label is not decorative microcopy. It should reveal a fact about a visible object or orient a visitor in the scene.

## Anchor from 3D to DOM

Store a local-space point on the relevant mesh or a world-space point when the object is static. Each frame after the camera has its final pose, transform the point into clip space and then viewport pixels. Hide or reposition a label whose point is behind the camera or outside the frame. Clamp readable text inside safe margins. On portrait screens, collapse hotspots into a list or lower sheet if projection would collide with copy. Use SVG leader lines only when they clarify the relationship; recalculate them on resize and camera motion.

Do not rely on an arbitrary `top: 34%; left: 72%` for a part that moves. That will drift as FOV, camera target, or device aspect changes. Keep the DOM content and the model's anchor in one data object so a label cannot point to the wrong feature after switching modes or products.

## HUD design

Measurements use tabular numerals and units. Update readouts from the same physical state that drives the scene: depth gauge from descent, RPM from throttle, time from sun angle, power reserve from crown winding. Use enough contrast to remain readable over changing light. A HUD should occupy only the space it needs; rich 3D scenes and paragraphs already compete for attention. If a readout is nonessential, hide it on narrow screens before shrinking it to illegibility.

## Hotspot interaction

Make hotspots real buttons with accessible names and focus treatment. Hover may highlight the corresponding part; click/focus may open a short explanation or move the camera. Keep focus inside visible content and allow closing with Escape when a panel opens. The marker must not sit behind an opaque section or intercept the primary CTA. Provide a DOM list as an alternate way to reach the same information.

## Review

Capture labels at every camera station and transition midpoint. Check occlusion, leader-line crossings, edge clamping, focus, touch hit size, and whether labels appear only when the relevant part is visible. Reject disconnected floating captions, especially those over decorative particles.

