---
name: story-sections
description: Build the middle and final sections of a cinematic page as distinct story beats connected to scene states, substantive copy, labels, and a working CTA.
---

# Sections are scenes, not repeated containers

Use this with `scroll-choreography`. A section earns space by changing what the visitor learns or sees. The twenty sites use very different structures: Abyssal names depth zones; Gambit replays moves; Terrarium exposes layers; Velocity reveals shoe systems; Koen changes seasons; Horologie separates movement components. Copy, camera, and material are authored together.

## Build a section contract

For each section write:

- **Question answered:** What does a visitor know afterward that was not known before?
- **Visual evidence:** What is shown in the 3D world to support that answer?
- **Camera state:** Position, target, FOV, subject size, and safe text area.
- **World state:** Material, lighting, atmosphere, particles, or moving parts.
- **UI state:** Heading, body, measurement, label, selected tab, or active nav item.
- **Input:** Whether the visitor can do something here, and how it behaves on pointer/touch/keyboard.
- **Entry and exit:** What is visible during the transition, including direct jumps and reverse scroll.

Place this information in one table or scene-state object so implementation cannot drift. For a product feature section, show the actual feature: if copy says “carbon plate,” reveal a plate; if copy says “72-hour reserve,” expose the barrel/reserve. Do not merely rotate the same object while changing headings.

## Section geometry and pacing

Give a transformation enough scroll distance to read; give static explanation less. Pinned sections are useful only when visual progress continues while text advances. A long pinned blank canvas is a failure. The next section should begin before the previous story is visually dead; overlap camera and light handoffs intentionally. Keep meaningful DOM headings and anchor IDs so users can navigate with hash links and assistive technology.

The middle should have contrast: wide establishing frame, close explanatory frame, active interaction, then rest. If every section is a full-viewport centered heading over the same object, the page loses rhythm. A final CTA scene should resolve the visual story and calm motion. Supporting content can be a readable editorial block while the WebGL canvas recedes or pauses.

## Responsive structure

On a phone, do not shrink a desktop pinned timeline until text and subject overlap. Recompose camera stations; place the subject above or between copy blocks; shorten excessive pin spans; make anchored labels stack into a normal list if necessary. Preserve the sequence and action. A portrait layout may need different hero-to-middle framing, not only media-query font sizes.

## Source examples

In Abyssal, each zone changes depth, color, pressure, creatures, and floodlight behavior. In Ember, the process sections move the sword and show heating, strike, quench, and polish. In Sucre, menu hover changes the counter, then the gift-box section becomes a task. In Atlas, destination tickets arrive when the camera settles at each island. In Horologie, exploded components and labels preserve mechanical order.

## Accept only meaningful differences

Capture the center and both transition edges of every section. Compare consecutive frames without reading the headings: can a viewer tell that the story advanced? Then read the copy and check that the visible mechanism actually proves it. Fix any section that exists only to lengthen the page.

