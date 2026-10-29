# 05 — Dioramas pattern atlas

These are **design mechanisms**, not templates to clone. The original `/home/kevin/Projects/dioramas` contains the full examples when available, but an installed skill must work without that local folder. Each row states what to borrow conceptually and what can go wrong.

| Original world | Transferable mechanism | Typical failure |
| --- | --- | --- |
| Reliquary | Lantern-guided museum; photographing a relic changes its illumination and the story | Dark scene without a discoverable light/action loop |
| Abyssal | Scroll depth mapped to environmental color, pressure, light and camera stations | One continuous blue gradient instead of distinct depth zones |
| Ember | Heat, hammer strike and sparks connect input to material change | Particles mask an unchanged object |
| Terrarium | Wipe condensation to reveal a living object | Pointer-only wipe; no touch route |
| Koi | Ripples and food make a calm pond respond to touch | Ripple effect without believable water or restraint |
| Florae | Flower-point cloud morphs between specimens; a pointer breeze perturbs particles | Unreadable morph, costly particle count, fake loader progress |
| Velocity | X-ray/thermal/CAD lens reveals layers of a product | A filter that changes color but reveals no information |
| Hangar | Hold-to-power charges a mech and light system | Hold gesture lacks feedback/threshold/reset |
| Sucre | Pastries use physics as part of the brand world | Physics creates clutter or blocks the CTA |
| Monolith | Dragging a sun changes the architecture's light and shadow | Sun moves but the scene lighting does not |
| Lowfreq | Record play/scratch joins motion, sound, and a physical object | Autoplay audio or no mute/gesture requirement |
| Gambit | Chess replay is synchronized to scroll, then offers direct play | Scrubbing skips pieces or direct control fights scroll state |
| Atlas | Camera flies among floating islands while the map and copy stay oriented | Travel motion causes nausea or loses the subject |
| Lithos | Hold-to-crack transforms an object in stages | Instant swap with no buildup/material consequence |
| Artemis | Rigged walking and lunar camera journey | Animation without grounded contact or readable landmarks |
| Keeper | Lighthouse beam aims through storm and volumetric atmosphere | Volumetric haze washes out the entire frame |
| Koen | One bonsai changes through seasonal states | Palette swap without meaningful form/texture change |
| Nocturne | Perfume bottle and liquid respond to drag and light | Glass refracts empty white because scene background is missing |
| Racer | Hold-to-rev connects speed, rain, sound and motor response | Audio/blur overpower the product and text |
| Horologie | Watch assembly/disassembly reveals the movement's precision | Pieces fly apart but have no explanatory hierarchy |

## Recurring engineering lessons from the collection

- Every world pairs a subject-specific loader with a composed opening frame; the loader is not a generic spinner.
- Each example compiles the WebGL scene before hiding the loader, then starts the intro.
- Real PBR surfaces need environment, controlled highlights and shadows; postprocessing cannot rescue weak base lighting.
- A fixed canvas can carry the page, while semantic HTML carries readable content and links.
- Scroll controls state, while pointer/keyboard adds bounded interaction. One must not erase the other.
- Mobile often needs a different camera and fewer effects, not just smaller type.
- The original gallery's `worldNav` and source path assumptions are collection-specific; omit them in standalone sites.
