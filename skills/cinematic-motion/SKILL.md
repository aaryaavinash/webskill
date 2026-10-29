---
name: cinematic-motion
description: Choreograph loader exit, camera movement, object response, text reveals, particles, light, and optional sound for a cinematic landing page. Use when motion must express one physical narrative rather than decorate sections.
---

# Motion follows cause

Choose a motion vocabulary from the subject. A descent has pressure and drift; a forge has impact and heat; a bonsai has seasonal settling; a watch has precise mechanical ratios. Define which motion is caused by page load, scroll, direct input, environment, or sound. Keep these owners separate so the render loop does not overwrite a scroll or interaction state.

## Stage a complete beat

Every major beat has anticipation, action, consequence, and settle. For a hammer strike: hand/hammer lifts, accelerates to contact, the blade flashes and emits sparks, then the hammer rebounds and heat settles. For island travel: destination is selected, the camera leaves the current orbit, banks through clouds, then arrives and the destination ticket becomes readable. For a product reveal: the loader exposes the object, camera takes its hero pose, light finds its surface, then the interaction hint appears. Write these stages on a timeline before coding; use timing based on perceived weight and distance rather than applying one easing curve to everything.

## Link systems to one parameter

Define physical state (`heat`, `depth`, `rpm`, `charge`, `season`, `liquidTilt`, `dayTime`) and derive all visible reactions from it. Materials, lights, particles, camera shake, HUD, and sound should not drift independently. For scroll, calculate a deterministic target state and damp only the optional secondary response. For direct input, apply bounds and clear ownership. If using GSAP for HTML and Three.js for the scene, keep one update loop and let GSAP drive controller values, not object transforms that the render loop also owns.

## Particles and effects have a job

Sparks show impact direction and cooling; marine snow shows descent speed; leaves show season and gravity; dust reveals a beam. Emit at a world position tied to the event, move with plausible forces, and fade or settle. Use bloom only for emissive parts. Use depth of field to guide attention, not to hide weak geometry. Keep the hero readable when motion is at its busiest. Make optional sound spatially and rhythmically connected, but require a user gesture and provide mute/off. The silent page remains visually complete.

## Motion health

Respect `prefers-reduced-motion`: retain composed states and task outcomes, but shorten camera travel, remove continuous parallax, reduce particle storms, and use direct state changes or restrained crossfades. Pause nonessential loops in background tabs and when canvas is out of view. Test 30 and 60 FPS, repeated input, scroll reversal, resize during motion, and leaving/reentering a section. Never let a late animation continue fighting the visitor's current state.

