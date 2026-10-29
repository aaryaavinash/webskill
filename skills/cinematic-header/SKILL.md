---
name: cinematic-header
description: Build navigation and a responsive header for a cinematic WebGL landing page, including section state, anchors, overlay contrast, keyboard access, and mobile menu behavior.
---

# A header orients the visitor inside a changing world

The header can be minimal, but it cannot be careless. A fixed 3D canvas changes brightness as scenes progress; the navigation must remain legible and clickable over each one. The labels name real destinations in the story, and the primary action leads somewhere useful. Review both open and closed states on a phone.

## Decide the role

Choose a navigation model appropriate to the story: small fixed wordmark and section anchors, a progress rail for a journey, a chapter map for destinations, or a compact instrument header. The source pages use nav to move into specific camera stations; a hash jump must set the correct visual state. Avoid a generic glass pill floating over every world. Design a contrasting header style for bright/dark phases if the scene changes dramatically.

## Implement behavior

Use semantic `<header>` and `<nav aria-label="Main navigation">`. Use real anchors with stable IDs. Account for header height via `scroll-margin-top`. Mark the active section with `aria-current="location"` or a similarly meaningful state, updating from section intersection/scroll controller. Ensure deep links, browser Back, and keyboard navigation work. If using Lenis, integrate anchors with its scrolling while preserving URL hash and focus behavior. Links must not rely on clicking the canvas.

For mobile, use a real button with `aria-expanded` and `aria-controls`. The menu opens above the canvas with sufficient contrast, traps no focus unexpectedly, closes on Escape and link selection, and restores focus reasonably. Prevent background scene interactions while the menu is open. Avoid autoplay motion that distracts from choosing a link. Keep the primary action visible or accessible in the menu, with a touch-sized target.

## Match the visual language

An instrument-style page may use grid rules and numeric readouts; a calm editorial page may use a quiet wordmark and sparse type; an industrial page may use a control-strip. Carry the chosen type and material language into nav dividers, hover/focus states, and active indicators. Header motion should be minor: reveal, hide, or theme adaptation only when it improves orientation. Do not build a noisy animated logo while the scene already moves.

## Test

At each scene station, check header contrast and clickability. Test anchor navigation from top and after a mid-page refresh, focus order, Escape, mobile menu, URL hash, browser Back, and a canvas pointer event beneath the header. Reject any page where a nav click scrolls text but leaves the 3D state at the previous station.

