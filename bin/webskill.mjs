#!/usr/bin/env node
import { cp, stat, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { intro, outro, note, multiselect, select, confirm, text, spinner, cancel, isCancel } from '@clack/prompts';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const skill = 'cinematic-landing';
const source = join(root, 'skills', skill);
const home = homedir();
const clients = [
  { id: 'codex', name: 'Codex', project: '.agents/skills', global: '.agents/skills' },
  { id: 'claude', name: 'Claude Code', project: '.claude/skills', global: '.claude/skills' },
  { id: 'antigravity', name: 'Antigravity App / IDE', project: '.agents/skills', global: '.gemini/config/skills' },
  { id: 'antigravity-cli', name: 'Antigravity CLI', project: '.agents/skills', global: '.gemini/antigravity-cli/skills' },
  { id: 'gemini', name: 'Gemini CLI', project: '.gemini/skills', global: '.gemini/skills' },
  { id: 'cursor', name: 'Cursor', project: '.cursor/skills', global: '.cursor/skills' },
  { id: 'copilot', name: 'GitHub Copilot', project: '.github/skills', global: '.copilot/skills' },
  { id: 'opencode', name: 'OpenCode', project: '.opencode/skills', global: '.config/opencode/skills' },
  { id: 'windsurf', name: 'Windsurf', project: '.windsurf/skills', global: '.codeium/windsurf/skills' },
  { id: 'cline', name: 'Cline', project: '.cline/skills', global: '.cline/skills' },
  { id: 'roo', name: 'Roo Code', project: '.roo/skills', global: '.roo/skills' },
  { id: 'goose', name: 'Goose', project: '.goose/skills', global: '.config/goose/skills' },
  { id: 'kiro', name: 'Kiro', project: '.kiro/skills', global: '.kiro/skills' },
  { id: 'amp', name: 'Amp', project: '.agents/skills', global: '.config/agents/skills' },
  { id: 'universal', name: 'Universal Agent Skills', project: '.agents/skills', global: '.config/agents/skills' },
];
const argv = process.argv.slice(2);
const command = argv[0]?.startsWith('-') ? 'install' : argv.shift() || 'install';
const option = key => { const i = argv.indexOf(key); return i < 0 ? null : argv[i + 1]; };
const has = key => argv.includes(key);
const help = () => {
  console.log('webskill install [--agents codex,claude,...|all] [--scope project|global] [--dir PATH] [--target SKILLS_DIR] [--yes] [--dry-run] [--accessible]');
  console.log('Guided setup for cinematic-landing. Existing skill folders are never overwritten.');
};
if (has('--help') || has('-h') || command === 'help') { help(); process.exit(0); }
if (command !== 'install' && command !== 'setup') { help(); process.exit(1); }
const color = (s, code) => process.stdout.isTTY && !process.env.NO_COLOR ? `\x1b[${code}m${s}\x1b[0m` : s;
const banner = `\n${color('  ██╗    ██╗███████╗██████╗', '31')}\n${color('  ██║    ██║██╔════╝██╔══██╗', '31')}\n${color('  ██║ █╗ ██║█████╗  ██████╔╝', '31')}  ${color('SKILL', '1')}\n${color('  ██║███╗██║██╔══╝  ██╔══██╗', '31')}\n${color('  ╚███╔███╔╝███████╗██████╔╝', '31')}\n${color('   ╚══╝╚══╝ ╚══════╝╚═════╝', '31')}\n${color('  CINEMATIC LANDING PAGES  /  SETUP', '90')}\n`;
console.log(banner);
const interactive = process.stdin.isTTY && !has('--yes') && !has('--dry-run');
const project = resolve(option('--dir') || process.cwd());
let ids = option('--agents')?.split(',').map(x => x.trim()).filter(Boolean);
let scope = option('--scope');
let custom = option('--target');
const exitCancel = () => { cancel('No files changed.'); process.exit(0); };
const checked = async prompt => { const value = await prompt; if (isCancel(value)) exitCancel(); return value; };
try {
  await stat(join(source, 'SKILL.md'));
  if (interactive) {
    intro('Install cinematic-landing');
    note('A focused skill for cinematic landing pages, honest loaders, scroll choreography and interactive 3D.', 'What you are installing');
    if (!ids && !custom) {
      const detected = clients.filter(c => existsSync(join(project, c.project)) || existsSync(join(home, c.global))).map(c => c.id);
      note(detected.length ? detected.map(id => clients.find(c => c.id === id).name).join(', ') : 'No existing skill directories found. Every supported agent is selectable.', 'Existing skill directories');
      if (has('--accessible')) {
        ids = [];
        for (const c of clients) if (await checked(confirm({ message: `Install for ${c.name}?`, initialValue: false }))) ids.push(c.id);
      } else ids = await checked(multiselect({ message: 'Which agents should use Webskill?', options: clients.map(c => ({ value: c.id, label: c.name, hint: detected.includes(c.id) ? 'skill directory found' : undefined })), initialValues: [], required: false, maxItems: 9 }));
      if (!ids.length) exitCancel();
    }
    if (!scope) scope = await checked(select({ message: 'Where should the skill be installed?', options: [
      { value: 'project', label: 'This project', hint: project },
      { value: 'global', label: 'All projects', hint: home },
    ] }));
    if (ids?.includes('custom') && !custom) custom = await checked(text({ message: 'Custom skills directory', placeholder: '/path/to/agent/skills', validate: v => v?.trim() ? undefined : 'Enter a directory.' }));
  }
  if (ids?.includes('all')) ids = clients.map(c => c.id);
  if (!ids?.length && !custom) throw new Error('Choose agents with --agents, or pass --target.');
  if (ids?.some(id => id !== 'custom' && !clients.some(c => c.id === id))) throw new Error('Unknown agent. Run --help or use --target for a custom agent.');
  if (ids?.includes('custom') && !custom) throw new Error('Custom agent requires --target SKILLS_DIR.');
  scope ||= 'project';
  if (!['project', 'global'].includes(scope)) throw new Error('Scope must be project or global.');
  const targetMap = new Map();
  for (const id of ids || []) {
    if (id === 'custom') continue;
    const c = clients.find(c => c.id === id);
    const target = join(scope === 'project' ? project : home, c[scope], skill);
    targetMap.set(target, [...(targetMap.get(target) || []), c.name]);
  }
  if (custom) {
    const target = join(resolve(custom), skill);
    targetMap.set(target, [...(targetMap.get(target) || []), 'Custom agent']);
  }
  const plan = [];
  for (const [target, names] of targetMap) {
    let existing = false;
    try { existing = (await stat(target)).isDirectory(); if (!existing) throw new Error(`Target is a file: ${target}`); }
    catch (e) { if (e.code !== 'ENOENT') throw e; }
    plan.push({ target, names, existing });
  }
  const description = plan.map(p => `${p.existing ? 'SKIP' : 'ADD '}  ${p.names.join(' + ')}\n      ${p.target}`).join('\n\n');
  if (interactive) {
    note(description, 'Review changes');
    if (!await checked(confirm({ message: `Install to ${plan.filter(p => !p.existing).length} new location(s)?`, initialValue: true }))) exitCancel();
  } else console.log(`Plan (${scope}):\n${description}\n`);
  if (has('--dry-run')) { outro('Dry run complete. No files changed.'); process.exit(0); }
  const spin = interactive ? spinner() : null;
  spin?.start('Installing skill');
  let installed = 0;
  for (const p of plan) {
    if (p.existing) continue;
    await mkdir(dirname(p.target), { recursive: true });
    await cp(source, p.target, { recursive: true, force: false, errorOnExist: true });
    installed++;
  }
  spin?.stop('Installation complete');
  outro(`${installed} installed · ${plan.length - installed} already present. Restart your agent, then ask it to build a cinematic landing page.`);
} catch (error) {
  console.error(`webskill: ${error.message}`);
  process.exitCode = 1;
}
