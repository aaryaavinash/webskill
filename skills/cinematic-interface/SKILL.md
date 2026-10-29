---
name: cinematic-interface
description: Design the typography, navigation, buttons, HUD, anchored labels, section copy, and calls to action around a cinematic 3D landing page. Use when the interface must belong to the same world as the scene.
---

# The interface is part of the world

The twenty source pages do not share one UI template. Abyssal uses instrument gauges; Terrarium uses soft editorial tabs; Velocity uses lab measurement; Hangar uses industrial HUD; Monolith uses an architectural grid; Lowfreq uses record controls. Study the subject's materials and language first. Use semantic HTML for all copy, nav, controls, forms, and CTAs; reserve WebGL for the subject and atmosphere.

## Create a page-specific visual grammar

Choose one display face, one readable text face, and optionally one mono/readout face when measurements are part of the concept. Define scale for hero, section heading, body, label, and numeric readout. Assign type roles according to meaning: a measurement is precise, a story sentence can be lyrical, a control must be unambiguous. Keep body lines readable and avoid placing thin type over bloom, reflections, or moving particles. Define background/ink/accent colors for every lighting phase, not just the hero. A scene that shifts from day to night also needs HTML color changes that preserve contrast.

## Compose copy with camera, not after camera

At each camera station, mark a safe text area, the subject's projected bounds, and a transition midpoint. Place headline and CTA in stable DOM regions that do not cover the subject's defining feature. Narrow screens need different scene framing and layout order. An anchored label may use a projected 3D point, but clamp or reposition it when it reaches the viewport edge; hide it if its anchor is behind the camera. Avoid leader lines crossing paragraph text. A pointer lens, spotlight, cursor, or HUD must never make the CTA unreadable.

## Navigation and buttons

The nav should name real page destinations and keep one primary action clear. Hash links must land with the correct visual state; account for fixed headers. Buttons describe the action (`Power up`, `Wipe glass`, `Explore lens`, `Book a visit`) rather than vague `Discover` everywhere. For physical controls, provide visible hover, focus, active, disabled, and completed states. Use sufficiently large hit areas on touch. Do not hide the only control inside a canvas or custom cursor. For a hold gesture, show charge and release states and offer a keyboard equivalent. For a product selector, make the selected item apparent and synchronize its DOM state with the 3D scene.

## Build a complete page

The hero answers what the subject is and why to stay. Middle sections give distinct information; they are not repeated filler cards. The scene's biggest reveal should coincide with the most important explanation. Include real details relevant to the fictional or actual product, a clear CTA, and a footer with useful navigation. If a shop/booking action is only a demo, label it as such; do not make a dead button that looks transactional. The final scene should be calmer than the interaction climax, so a visitor can act.

## Review

Inspect hero, every section midpoint, open navigation, focus rings, hover/pressed state, and mobile portrait. Read every visible sentence aloud against its scene. Reject generic copy, identical repeated heading animation, labels that float without anchors, buttons that do nothing, and tiny pale text over moving imagery.

