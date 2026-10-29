# Webskill

A focused Agent Skill for cinematic landing pages: an honest loading sequence, authored scroll scenes, a meaningful interaction, accessible fallbacks, and deliberate visual review. The teaching method comes from studying the 20 worlds in [Dioramas](https://github.com/blendi-remade/dioramas); the skill does not copy their brands or assets.

## Install

Install from npm:

```bash
npx @zyrix/webskill@latest install
```

The same installer is also available from GitHub:

```bash
npx --allow-git=all github:aaryaavinash/webskill install
```

The guided setup shows an ASCII title, detects existing skill directories, lets you select agents with the arrow keys and Space, chooses project or global scope, previews every destination, and asks before writing. Existing skill folders are skipped. `--accessible` switches to sequential yes/no prompts. `--dry-run` prints the exact plan without changes.

Built-in destinations: Codex, Claude Code, Antigravity App/IDE, Antigravity CLI, Gemini CLI, Cursor, GitHub Copilot, OpenCode, Windsurf, Cline, Roo Code, Goose, Kiro, Amp, and the universal `.agents/skills` directory. For another Agent Skills-compatible platform, pass its skills directory with `--target`.

```bash
# Review only
npx @zyrix/webskill@latest install --agents codex,claude --scope project --dry-run

# Unattended project install
npx @zyrix/webskill@latest install --agents codex,claude --scope project --dir . --yes

# Any other agent
npx @zyrix/webskill@latest install --target /path/to/agent/skills --yes
```

Restart the selected agent, then ask it to build a cinematic landing page. The entrypoint is [`skills/cinematic-landing/SKILL.md`](skills/cinematic-landing/SKILL.md); five references walk through a concept brief, page/scene architecture, loader and motion, rendered QA, and mechanisms learned from all 20 Dioramas examples.

## What the skill teaches

The agent starts with a complete page and a clear visual story. It chooses an asset that can support the promised design, maps sections to distinct camera and lighting states, builds a loader from real asset readiness, gives the visitor one discoverable interaction, and checks the actual rendered experience on desktop, phone, and reduced motion. It can use Three.js, GSAP, and Lenis when needed without requiring a paid asset service or a particular framework.

## Development

Node.js 20 or later is required. The CLI uses [`@clack/prompts`](https://github.com/bombshell-dev/clack) for the terminal setup flow.

```bash
npm ci
npm test
node bin/webskill.mjs install --agents codex --scope project --dir /tmp/webskill-check --dry-run
```

## Credits and rights

Dioramas is credited as the source of the observed design and engineering patterns. Its original code and visual assets remain in that project under their respective licenses. This repository's instructional text and installer are MIT licensed.
