---
name: scene-audio
description: Add optional, gesture-started sound that follows a cinematic page's physical state, with mute controls and a complete silent experience.
---

# Sound can reinforce cause, never carry the page alone

The source worlds use sound only when it belongs to an event: a hammer strike, record groove, wet engine, watch ratchet, wind and surf. Do not autoplay audio to make a weak visual page feel cinematic. The visitor may never enable sound, and the page must still communicate its story.

## Audio contract

Choose the event or state that produces sound. A short transient follows an impact or click; a continuous layer follows a physical variable such as RPM, speed, weather, or playback. Document which control starts audio, how it is muted, and what happens when the tab hides. Create or resume `AudioContext` only after a user gesture. Provide a visible control with `aria-pressed` and clear label. Store mute preference only if the product needs it and disclose persistence appropriately.

## Synchronize

Use the same state variable as the visual system. A turntable's rotation and playback rate come from one deck state; a revving bike's engine pitch and headlight response come from RPM. Do not fake synchronization with two unrelated loops. For a transient, dispatch the sound at the same event that emits sparks, moves a piece, or starts the ratchet, rather than after a timeout guessed from animation duration.

## Shape the sound

Keep levels conservative and avoid clipping. Fade continuous layers in/out to prevent pops. Stop or suspend when hidden or after a scene exits. Use spatial panning only where it supports an actual object position. If using recorded files, record source and license; if synthesizing, keep it simple and intentional. On mobile, verify audio unlock and mute behavior with real touch.

## Review

Test muted first. Then test enable, repeated actions, quick disable, browser tab hide, page exit, and reduced-motion mode. The silent variant must remain complete.

