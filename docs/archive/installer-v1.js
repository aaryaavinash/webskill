// ORIGINAL (preserved, not deleted — disabled by comment): installer v1 before guided setup redesign.
// #!/usr/bin/env node
// import { cp, mkdir, stat } from 'node:fs/promises';
// import { homedir } from 'node:os';
// import { dirname, join, resolve } from 'node:path';
// import { fileURLToPath } from 'node:url';
// import { createInterface } from 'node:readline/promises';
// 
// const here = dirname(fileURLToPath(import.meta.url));
// const skill = 'cinematic-landing';
// const source = resolve(here, '..', 'skills', skill);
// const agents = [
//   ['codex', 'Codex', '.agents/skills', '.agents/skills'],
//   ['claude', 'Claude Code', '.claude/skills', '.claude/skills'],
//   ['antigravity', 'Antigravity App / IDE', '.agents/skills', '.gemini/config/skills'],
//   ['antigravity-cli', 'Antigravity CLI', '.agents/skills', '.gemini/antigravity-cli/skills'],
//   ['gemini', 'Gemini CLI', '.gemini/skills', '.gemini/skills'],
//   ['cursor', 'Cursor', '.cursor/skills', '.cursor/skills'],
//   ['copilot', 'GitHub Copilot', '.github/skills', '.copilot/skills'],
//   ['opencode', 'OpenCode', '.opencode/skills', '.opencode/skills'],
//   ['windsurf', 'Windsurf', '.windsurf/skills', '.windsurf/skills'],
//   ['cline', 'Cline', '.cline/skills', '.cline/skills'],
// ];
// const argv = process.argv.slice(2);
// const value = key => { const i = argv.indexOf(key); return i < 0 ? null : argv[i + 1]; };
// const flag = key => argv.includes(key);
// if (flag('--help') || flag('-h')) {
//   console.log('webskill [--agents codex,claude,...] [--scope project|global] [--dir PATH] [--target SKILLS_DIR] [--yes]');
//   console.log('Install cinematic-landing for selected AI coding agents. Existing skills are left untouched.');
//   process.exit(0);
// }
// const art = String.raw`
//  ╦ ╦╔═╗╔╗ ╔═╗╦╔═╦╦  ╦
//  ║║║║╣ ╠╩╗╚═╗╠╩╗║║  ║
//  ╚╩╝╚═╝╚═╝╚═╝╩ ╩╩╩═╝╩═╝
//   CINEMATIC WEB SKILLS  /  01
// `;
// console.log(art);
// let selected = value('--agents')?.split(',').map(x => x.trim()).filter(Boolean);
// let scope = value('--scope');
// let customTarget = value('--target');
// const project = resolve(value('--dir') || process.cwd());
// const interactive = !flag('--yes') && process.stdin.isTTY;
// const rl = interactive ? createInterface({ input: process.stdin, output: process.stdout }) : null;
// try {
//   if (!selected && !customTarget) {
//     if (!rl) throw new Error('Pass --agents when running without a terminal.');
//     console.log('Choose agents (numbers separated by commas):');
//     agents.forEach((a, i) => console.log(` ${String(i + 1).padStart(2)}  ${a[1]}`));
//     console.log(' 11  Other (custom skills directory)');
//     console.log('  A  All listed agents');
//     const answer = (await rl.question('Agents [1,2]: ')).trim();
//     selected = answer.toLowerCase() === 'a' ? agents.map(a => a[0]) : answer.split(',').map(n => n.trim() === '11' ? 'custom' : agents[Number(n) - 1]?.[0]);
//   }
//   if (selected?.includes('custom') && !customTarget) customTarget = rl ? (await rl.question('Custom skills directory path: ')).trim() : null;
//   if ((!selected?.length && !customTarget) || selected?.some(a => a !== 'custom' && !agents.some(x => x[0] === a))) throw new Error('Invalid agent selection. Use --help for valid options.');
//   if (selected?.includes('custom') && !customTarget) throw new Error('Custom selection requires --target SKILLS_DIR.');
//   if (!scope) scope = rl ? (await rl.question('Install to (p)roject or (g)lobal? [p]: ')).trim().toLowerCase() : 'project';
//   scope = scope === 'g' ? 'global' : scope === 'p' || scope === '' ? 'project' : scope;
//   if (!['project', 'global'].includes(scope)) throw new Error('Scope must be project or global.');
//   await stat(join(source, 'SKILL.md'));
//   const targets = [...new Set([...(selected || []).filter(id => id !== 'custom').map(id => {
//     const row = agents.find(a => a[0] === id);
//     return join(scope === 'global' ? homedir() : project, row[scope === 'global' ? 3 : 2], skill);
//   }), ...(customTarget ? [join(resolve(customTarget), skill)] : [])])];
//   console.log(`\nSkill: ${skill}  ·  Scope: ${scope}`);
//   targets.forEach(t => console.log(`  → ${t}`));
//   if (rl && (await rl.question('Install? [Y/n]: ')).trim().toLowerCase() === 'n') process.exit(0);
//   for (const target of targets) {
//     try { await stat(target); console.log(`SKIP  ${target} (already exists)`); continue; }
//     catch (error) { if (error.code !== 'ENOENT') throw error; }
//     await mkdir(dirname(target), { recursive: true });
//     await cp(source, target, { recursive: true, errorOnExist: true, force: false });
//     console.log(`DONE  ${target}`);
//   }
//   console.log('\nAsk your agent to build a cinematic landing page, or invoke /cinematic-landing where supported.');
// } catch (error) {
//   console.error(`\nwebskill: ${error.message}`);
//   process.exitCode = 1;
// } finally { rl?.close(); }
