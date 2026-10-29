# Webskill

A practical Agent Skill for building cinematic landing pages with real loading animation, scroll-directed scenes, and purposeful 3D interaction. Its method comes from studying the 20 standalone worlds in [Dioramas](https://github.com/blendi-remade/dioramas), then translating their repeated design and engineering lessons into instructions an AI coding agent can follow.

## Install

From a terminal in your project:

```bash
npx --allow-git=all github:aaryaavinash/webskill
```

The installer shows an ASCII menu, asks which agents to target, and installs `cinematic-landing` at project or global scope. It supports Codex, Claude Code, Antigravity App/IDE and CLI, Gemini CLI, Cursor, GitHub Copilot, OpenCode, Windsurf, and Cline. Choose **Other** to enter any agent's skills directory. Project installs use each agent's skill directory; Codex and Antigravity share `.agents/skills`. Existing skill folders are skipped so the installer does not overwrite local work. The `--allow-git=all` option permits npm to fetch this GitHub package on npm versions that disable Git packages by default.

For automation:

```bash
npx --allow-git=all github:aaryaavinash/webskill --agents codex,claude --scope project --dir . --yes
```

Then ask your agent to create a cinematic landing page. The skill entrypoint is [`skills/cinematic-landing/SKILL.md`](skills/cinematic-landing/SKILL.md); its references cover the brief, scene build, loader/motion, QA, and all 20 source patterns. The skill is independent of the original Dioramas runtime and does not ship its models or fictional brands.

## Scope

This first skill is for **single landing pages**. It teaches the agent to plan a visual story, build a readable page, introduce 3D only where it improves the experience, make real asset progress visible, synchronize GSAP and Lenis when used, implement one discoverable interaction, and review rendered desktop/mobile states. It does not require paid asset generation or a particular frontend framework.

## Local development

```bash
node bin/webskill.mjs --help
node bin/webskill.mjs --agents codex --scope project --dir /tmp/webskill-test --yes
```

Node.js 20 or newer is required. The installer has no runtime dependencies.

## Credits and rights

Dioramas is the source of the observed design and engineering patterns; its original code and visual assets remain in that project under their respective licenses. This repository's instructional text and installer are MIT licensed.
