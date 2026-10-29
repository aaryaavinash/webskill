---
name: cinematic-landing
description: Build or substantially improve a single cinematic landing page with a purposeful loading animation, scroll-directed storytelling, and an optional interactive 3D scene. Use when the user asks for a Dioramas-like product world, immersive website, WebGL landing page, GSAP scroll experience, or custom preloader. Do not use for ordinary dashboards or multi-page apps.
---

# Cinematic landing page

Create **one complete, usable landing page**, not a WebGL demo with a headline laid over it. The art direction, asset, loader, camera, scroll, typography, and interaction must express the *same concept*. The page must have real content, working navigation and CTA, mobile behavior, reduced-motion behavior, and a reliable path from first paint to interaction.

This skill teaches the method extracted from the 20 Dioramas sites. Do not copy their fictional brands, text, imagery, models, or site code. Make a new design for the user's subject. Do not assume an image-to-3D service, API key, paid asset, or existing model is available.

## Read in this order

1. [Brief and art direction](references/01-brief.md) — **always**. Decide the subject, promise, visual world, page structure, asset plan, and one signature interaction before writing code.
2. [Scene and page architecture](references/02-build.md) — **always**. It includes a concrete DOM/3D split, boot sequence, camera state approach, and implementation order.
3. [Loading and motion](references/03-motion.md) — **always**. Build the real asset loader, GSAP/Lenis scroll mapping, intro, input, and reduced-motion branch.
4. [Quality gate](references/04-qa.md) — **always before delivery**. Capture and inspect desktop/mobile frames, exercise interaction/keyboard/touch, and correct what fails.
5. [Dioramas pattern atlas](references/05-pattern-atlas.md) — when choosing an interaction or solving a specific visual problem. It maps all 20 examples to transferable patterns and pitfalls.

## Working contract

- Start by inspecting the existing project, assets, dependencies, scripts, and constraints. If the user supplies a reference, study it before designing. Use the existing framework; add Three.js, GSAP, or Lenis only when the requested effect needs them.
- Write a short concept brief using `01-brief.md`. If details are missing, choose a coherent direction and state the assumption. Do not stall over optional taste questions.
- Build a readable, complete page first. Its content and CTA must still work if WebGL fails, assets load slowly, or reduced motion is requested.
- Make **one signature interaction** discoverable and meaningful. Scroll may reveal the world; pointer/touch/keyboard should change something visible. Decorative particles do not count.
- Use the 3D scene across the narrative if it earns that role. For a page that needs only a strong hero, keep 3D confined to the hero. Do not force a costly full-page canvas into every task.
- Design the loader around the subject and actual readiness. Never show fake percentage progress. Do not let a broken asset strand the visitor behind the loader.
- Map sections to distinct composed visual states; move the camera or subject intentionally between them. Keep scroll progress deterministic so reverse scrolling and refresh at mid-page work.
- Treat text as part of the composition: hierarchy, contrast, line lengths, margins, and CTA placement must be reviewed against the rendered scene at several scroll stops.
- Ship responsive behavior, accessible controls, reduced motion, error/fallback states, and acceptable performance. Follow `04-qa.md`; report any check you could not perform.

## Definition of done

A visitor can see the purpose and primary action immediately, understand the loader, scroll through distinct scenes without jumps, discover and use the signature interaction, reach the CTA, and do all of that on phone and keyboard. A real screenshot review shows intentional framing at hero, middle, CTA, and mobile—not merely a successful build.
