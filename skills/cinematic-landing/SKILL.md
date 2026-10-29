---
name: cinematic-landing
description: Build or substantially improve a single cinematic landing page with a purposeful loading animation, scroll-directed storytelling, and an optional interactive 3D scene. Use when the user asks for a Dioramas-like product world, immersive website, WebGL landing page, GSAP scroll experience, or custom preloader. Do not use for ordinary dashboards or multi-page apps.
---

# Cinematic landing page

Read [SOUL.md](SOUL.md) first. It is the quality contract for every Webskill page.

Create **one complete, usable landing page**, not a WebGL demo with a headline laid over it. The art direction, asset, loader, camera, scroll, typography, and interaction must express the *same concept*. The page must have real content, working navigation and CTA, mobile behavior, reduced-motion behavior, and a reliable path from first paint to interaction.

This skill teaches the method extracted from the 20 Dioramas sites. Do not copy their fictional brands, text, imagery, models, or site code. Make a new design for the user's subject. Do not assume an image-to-3D service, API key, paid asset, or existing model is available.

## Read in this order

1. [Brief and art direction](references/01-brief.md) — **always**. Decide the subject, promise, visual world, page structure, asset plan, and one signature interaction before writing code.
2. [Scene and page architecture](references/02-build.md) — **always**. It includes a concrete DOM/3D split, boot sequence, camera state approach, and implementation order.
3. [Loading and motion](references/03-motion.md) — **always**. Build the real asset loader, GSAP/Lenis scroll mapping, intro, input, and reduced-motion branch.
4. [Quality gate](references/04-qa.md) — **always before delivery**. Capture and inspect desktop/mobile frames, exercise interaction/keyboard/touch, and correct what fails.
5. [Dioramas pattern atlas](references/05-pattern-atlas.md) — when choosing an interaction or solving a specific visual problem. It maps all 20 examples to transferable patterns and pitfalls.

6. [Twenty Worlds source observations](references/06-world-by-world.md) — **always for a 3D storytelling page**. Read every entry, choose one primary mechanism suited to the new subject, and explain which observable scene behavior you will adapt. This file describes the camera, scroll, input, materials, typography, and page structure found in the source.

7. [Implementation blueprint](references/07-implementation-blueprint.md) — **always when writing code**. Follow the concrete scene state, boot, scroll, input, and review contracts, adapting syntax to the project's framework.

## Use the installed specialist skills

Webskill installs companion skills by component and system. Read the folders that match the job before editing: `hero-section`, `story-sections`, `cinematic-header`, `cinematic-buttons`, `cinematic-typography`, `anchored-labels`, and `final-cta` for HTML composition; `scene-assets`, `world-3d`, `lighting-materials`, and `particles-atmosphere` for the rendered world; `scroll-choreography`, `cinematic-loader`, `world-interaction`, `cinematic-motion`, and `scene-audio` for behavior; `performance-fallback` and `cinematic-review` before delivery. `cinematic-interface` integrates the HTML parts. For a full Dioramas-like page, read all relevant parts, then implement one coherent page. Do not substitute a CSS sphere, orbit rings, gradient, or repeated fade-in sections for a 3D world.

## Required build sequence for a full page

1. Study the new subject and the available assets. Identify the real hero object or place; record its scale, surface, distinctive silhouette, and required web formats. If there is no usable 3D asset, create a subject-appropriate procedural scene or obtain a licensed asset. State which route you chose.
2. Write a one-page concept with a visitor promise, an art-direction vocabulary, the 3D set, the exact scroll sections, one signature interaction, a mobile composition, and the CTA. Choose one primary mechanism from `06-world-by-world.md` and one supporting detail; do not mash multiple fictional brands together.
3. Build the semantic HTML page and responsive type system. Every section must say something specific about the subject. Navigation, buttons, forms, and CTA must work without WebGL.
4. Construct the real scene: subject, surrounding set/environment, material response, motivated lights, shadows, and hero camera. Render and inspect the hero before adding post effects or a long scroll timeline.
5. Author a table of scene states for hero, middle beats, interaction, and final CTA. Connect actual section geometry to one progress value. Compose each state around the text at desktop and portrait widths. Test direct jump and reverse scroll before polishing secondary motion.
6. Implement the signature action as a state machine with hint, pointer/touch/keyboard input, visible response in the subject, threshold or limit, cancel/release, and reset. Bind all related light, material, particle, UI, and optional audio changes to the same state value.
7. Build a subject-specific loader from real asset readiness. Compile the scene and important alternate shaders, render a first frame, then transition into the intro. Keep a finite failure path and a useful DOM/poster fallback.
8. Add secondary motion and optional sound only where they strengthen the physical story. Preserve readable text and a calm CTA. Implement reduced motion as composed states with shorter travel.
9. Capture the rendered hero, each station, transition midpoints, interaction states, and mobile frames. Correct framing, surface quality, overlap, performance, access, and failure behavior before delivery. If no browser can be used, disclose that the page has not passed this gate.

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
