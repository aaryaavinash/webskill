---
name: particles-atmosphere
description: Build purposeful environmental particles and atmospheric effects for a cinematic page, including sparks, dust, rain, leaves, marine snow, mist, and volumetric beams.
---

# Atmosphere should reveal a force

Particles are evidence of the world, not confetti. Ember's sparks follow a hammer impact and cool; Abyssal's marine snow shows descent; Koen's leaves reveal season and wind; Keeper's rain shows storm direction; Hangar's dust makes floodlight beams visible; Sucre's pastry physics shows gravity. Choose one or two forces that belong to the subject and state them explicitly.

## Plan each system

For every particle type define its emitter, count budget, lifetime, initial velocity, forces, color/size evolution, collision or settle rule, and how it is triggered. Tie emission to a physical state: impact energy, scroll speed, wind, charge, or weather. A spark should originate at contact, stretch along velocity, fall under gravity, bounce or fade, and cool from hot to dark. Rain should follow wind direction and local light, not form a uniformly lit curtain. Leaves should appear from a canopy and accumulate in believable areas.

## Depth and compositing

Use world-space placement and correct depth testing. Soft particles should fade where they intersect geometry. Screen-space haze can be useful but must not flatten the subject. Volumetric beams need a visible source, dust/fog to scatter through, occlusion by the scene, and a destination; a beam that points directly into the camera becomes a glaring disc. Keep the subject and copy readable at the busiest state.

## Budget and fallback

Prefer instancing or GPU simulation for large counts, but do not choose a GPU technique just because one reference did. Start at a lower count and raise only if the frame benefits. Reduce counts and render resolution on mobile. When reduced motion is requested, keep enough atmospheric context to preserve meaning while removing storms and continuous drift. If WebGL fails, use a poster with the same visual state; do not cover it with random CSS particles.

## Review

Capture particles at start, peak, and settle. Check origin, direction, scale, color, depth, and whether they obscure the action. If the scene looks equally meaningful with the particles removed, remove or reduce them.

