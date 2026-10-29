# Webskill soul — the quality contract

Read this before generating a page. The goal is to help an AI coding agent make a complete cinematic website that feels designed, directed, and usable. The reference collection contains twenty very different examples; their common lesson is **causality**. The visitor does something, or scrolls into a new moment, and the subject, light, material, camera, typography, and interface respond together.

## What a finished page feels like

The first frame is composed like a film still: a recognizable subject, clear visual hierarchy, readable promise, useful action, and light that reveals the form. Scrolling changes the relationship between viewer and subject, not just the opacity of cards. A direct interaction teaches something about the subject or changes its world. The final frame settles enough for the visitor to decide what to do next. The experience remains coherent on a phone, with a keyboard, with reduced motion, and when WebGL fails.

## Ten rules that cannot be bargained away

1. **Subject before effect.** The site's object, place, or process determines the camera, material, motion, and type. Never choose a particle effect first and invent a reason later.
2. **A real visual subject.** Build or source a 3D asset, an authored procedural object, or a compelling photographic world. A generic CSS sphere is not a product world. Use correct rights and credit.
3. **A surrounding world.** Give the subject a floor, horizon, environment, shadow, reflections, atmosphere, or context. A model floating in a dark void is acceptable only when the void is an intentional part of the story and the lighting still describes the form.
4. **Camera states with purpose.** Every section has an authored composition. Camera position, look target, FOV, subject pose, and text-safe zone are reviewed together. A long page of identical views is not cinematic.
5. **One source of truth.** Physical concepts such as depth, time, temperature, charge, season, RPM, or replay position drive all dependent visual and UI systems. Random independent animations do not create a world.
6. **Interaction changes the subject.** Include an affordance, active feedback, consequence, limit, cancel/release handling, and replay/reset. Pointer, touch, and keyboard must have a route.
7. **Loader tells the truth.** Progress comes from real assets and first-frame readiness. Shader compilation and a rendered frame happen before reveal. Failure leaves the page readable and actionable.
8. **HTML carries meaning.** Navigation, copy, controls, forms, and CTA live in semantic DOM. WebGL supplies image, depth, and feedback, not the only path to information.
9. **Art direction includes type and UI.** A page about a watch, forge, pond, or travel destination must not share the same generic hero, nav pill, card grid, and button style. Typography, palette, control language, and layout arise from the subject.
10. **Rendered QA decides completion.** Capture the hero, scene transitions, interaction states, CTA, and mobile layouts. A passing build is merely the beginning of review.

## How to decide what to build

Start with a sentence: “This is a page for **[subject]**; visitors should feel **[emotion]** and understand **[promise]**.” Then describe the one real thing they will see and the one thing they can do. Choose a primary mechanism from the 20-world field guide. The mechanism must fit the subject: a museum may use light to discover, a vessel may use depth, a machine may use charge, a garden may use season. Do not borrow the source's brand or art. If a mechanism only gives cosmetic motion, choose another.

Write the story as a sequence of camera states, not as a list of website features. What does the hero reveal? What does the next frame hide or show? What changes in material or environment? What can the visitor cause? What visual state supports the CTA? The same site can have a quiet ending after a loud middle.

## Definition of “exactly like the quality”

This phrase means matching the reference collection's **quality of direction and implementation**, not copying imagery. It requires an authored subject, real depth, lighting with a source, several distinct scroll compositions, a connected interaction, a specific UI language, and verified fallback. It does not require every page to use the same library, 200,000 particles, paid assets, or all twenty mechanisms.

## If resources are weak

Do not cover weak geometry with bloom, fog, grain, and glowing particles. Improve the asset, composition, and light. If no usable product model exists, use a designed abstract visualization that clearly represents the concept, then say what it is. If a device cannot run the full WebGL scene, show a strong poster or a simpler scene and keep the action path. If there is no browser to inspect the work, disclose that the page has not passed visual review; do not call it finished solely because code compiled.

## The last question

Would a visitor understand and remember the subject after seeing one still frame, one motion beat, and one interaction? If the answer depends on reading a paragraph about the implementation, the visual story is not ready.
