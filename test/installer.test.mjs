import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const bin = resolve('bin/webskill.mjs');
test('installs selected project skills, shares common target, and preserves an existing install', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'webskill-'));
  try {
    const args = [bin, '--agents', 'codex,claude,antigravity', '--scope', 'project', '--dir', dir, '--yes'];
    let run = spawnSync(process.execPath, args, { encoding: 'utf8' });
    assert.equal(run.status, 0, run.stderr);
    const codex = join(dir, '.agents/skills/cinematic-landing/SKILL.md');
    const claude = join(dir, '.claude/skills/cinematic-landing/SKILL.md');
    assert.match(await readFile(codex, 'utf8'), /name: cinematic-landing/);
    assert.equal(await readFile(codex, 'utf8'), await readFile(claude, 'utf8'));
    run = spawnSync(process.execPath, args, { encoding: 'utf8' });
    assert.equal(run.status, 0, run.stderr);
    assert.match(run.stdout, /SKIP/);
    assert.equal((await readFile(codex, 'utf8')).includes('name: cinematic-landing'), true);
  } finally { await rm(dir, { recursive: true, force: true }); }
});

test('installs to a custom agent directory', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'webskill-custom-'));
  try {
    const target = join(dir, 'my-agent', 'skills');
    const run = spawnSync(process.execPath, [bin, '--target', target, '--yes'], { encoding: 'utf8' });
    assert.equal(run.status, 0, run.stderr);
    assert.match(await readFile(join(target, 'cinematic-landing', 'SKILL.md'), 'utf8'), /name: cinematic-landing/);
  } finally { await rm(dir, { recursive: true, force: true }); }
});
