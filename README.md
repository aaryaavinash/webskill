# Webskill

A library of 20 Agent Skills for cinematic landing pages: real 3D worlds, authored scroll scenes, truthful loading, meaningful interactions, distinctive interface components, and rendered review. The teaching method comes from studying the 20 worlds in [Dioramas](https://github.com/blendi-remade/dioramas); the skills do not copy their brands or assets.

[Explore the Webskill story](https://aaryaavinash.github.io/webskill/) — a static, interactive introduction to the method, hosted from [`docs/`](docs/index.html) on GitHub Pages.

## Install

Install from npm:

```bash
npx @zyrix/webskill@latest install
```

The same installer is also available from GitHub:

```bash
npx --allow-git=all github:aaryaavinash/webskill install
```

The guided setup shows an ASCII title, detects existing skill directories, lets you select agents with the arrow keys and Space, chooses project or global scope, previews every destination, and asks before writing. It installs all 20 component and system skills. Existing skill folders are skipped. `--accessible` switches to sequential yes/no prompts. `--dry-run` prints the exact plan without changes.

Built-in destinations: Codex, Claude Code, Antigravity App/IDE, Antigravity CLI, Gemini CLI, Cursor, GitHub Copilot, OpenCode, Windsurf, Cline, Roo Code, Goose, Kiro, Amp, and the universal `.agents/skills` directory. For another Agent Skills-compatible platform, pass its skills directory with `--target`.

```bash
# Review only
npx @zyrix/webskill@latest install --agents codex,claude --scope project --dry-run

# Unattended project install
npx @zyrix/webskill@latest install --agents codex,claude --scope project --dir . --yes

# Any other agent
npx @zyrix/webskill@latest install --target /path/to/agent/skills --yes
```

Restart the selected agent, then ask it to build a cinematic landing page. The entrypoint is [`skills/cinematic-landing/SKILL.md`](skills/cinematic-landing/SKILL.md), with [its quality contract](skills/cinematic-landing/SOUL.md), [20-world source field guide](skills/cinematic-landing/references/06-world-by-world.md), and [implementation blueprint](skills/cinematic-landing/references/07-implementation-blueprint.md).

## Skill library

| Part | Skills |
| --- | --- |
| Page composition | [`hero-section`](skills/hero-section/SKILL.md), [`story-sections`](skills/story-sections/SKILL.md), [`cinematic-header`](skills/cinematic-header/SKILL.md), [`cinematic-buttons`](skills/cinematic-buttons/SKILL.md), [`cinematic-typography`](skills/cinematic-typography/SKILL.md), [`anchored-labels`](skills/anchored-labels/SKILL.md), [`final-cta`](skills/final-cta/SKILL.md), [`cinematic-interface`](skills/cinematic-interface/SKILL.md) |
| Rendered world | [`scene-assets`](skills/scene-assets/SKILL.md), [`world-3d`](skills/world-3d/SKILL.md), [`lighting-materials`](skills/lighting-materials/SKILL.md), [`particles-atmosphere`](skills/particles-atmosphere/SKILL.md) |
| Movement and input | [`scroll-choreography`](skills/scroll-choreography/SKILL.md), [`cinematic-loader`](skills/cinematic-loader/SKILL.md), [`world-interaction`](skills/world-interaction/SKILL.md), [`cinematic-motion`](skills/cinematic-motion/SKILL.md), [`scene-audio`](skills/scene-audio/SKILL.md) |
| Finish | [`performance-fallback`](skills/performance-fallback/SKILL.md), [`cinematic-review`](skills/cinematic-review/SKILL.md) |

The 20th skill, `cinematic-landing`, coordinates the full page. A focused request can load one component skill; a full 3D story page uses the relevant parts together.

## What the skill teaches

The agent starts with a complete page and a clear visual story. It chooses an asset that can support the promised design, maps sections to distinct camera and lighting states, builds a loader from real asset readiness, gives the visitor one discoverable interaction, and checks the actual rendered experience on desktop, phone, and reduced motion. The field guide turns each of the 20 source worlds into concrete camera, material, input, type, and page lessons. It can use Three.js, GSAP, and Lenis when needed without requiring a paid asset service or a particular framework.

## Development

Node.js 20 or later is required. The CLI uses [`@clack/prompts`](https://github.com/bombshell-dev/clack) for the terminal setup flow.
The website is plain HTML, CSS, and JavaScript in `docs/`, with a vendored MIT-licensed Three.js module; it has no build step. Its 3D scene changes camera and lighting on scroll, and the sun slider changes the scene directly.

```bash
npm ci
npm test
node bin/webskill.mjs install --agents codex --scope project --dir /tmp/webskill-check --dry-run
```

## Credits and rights

Dioramas is credited as the source of the observed design and engineering patterns. Its original code and visual assets remain in that project under their respective licenses. The demo site's Three.js license is preserved in [`docs/vendor/THREE-LICENSE.txt`](docs/vendor/THREE-LICENSE.txt). This repository's instructional text and installer are MIT licensed.
