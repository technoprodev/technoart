// Runs alloy-check the way people do, on a few files in a temp folder.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const cli = fileURLToPath(new URL('../bin/check.mjs', import.meta.url));

function check(files, ...args) {
  const dir = mkdtempSync(join(tmpdir(), 'alloy-check-'));
  for (const [name, text] of Object.entries(files)) writeFileSync(join(dir, name), text);
  const run = spawnSync(process.execPath, [cli, dir, ...args], { encoding: 'utf8', cwd: dir });
  const unknown = [...run.stdout.matchAll(/:\d+ {2}\.(\S+)/g)].map((m) => m[1]);
  return { code: run.status, unknown, stdout: run.stdout, dir };
}

test('kit classes pass, a made-up one fails with its file and line', () => {
  const ok = check({ 'a.html': '<div class="flex padding-16">x</div>' });
  assert.equal(ok.code, 0, ok.stdout);

  const bad = check({ 'a.html': '<p>x</p>\n<div class="flex padding-16 button-cart">x</div>' });
  assert.equal(bad.code, 1);
  assert.deepEqual(bad.unknown, ['button-cart']);
  assert.match(bad.stdout, /a\.html:2 {2}\.button-cart/);
});

test('JSX className gets checked', () => {
  assert.deepEqual(check({ 'a.jsx': 'const A = () => <div className="flex not-a-kit-class" />;' }).unknown, ['not-a-kit-class']);
});

test(':class and x-bind:class are skipped', () => {
  const vue = `<template>
  <div :class="{ hidden: !open }" class="flex">a</div>
  <div v-bind:class="[size, 'padding-8']">b</div>
  <div x-bind:class="open ? 'block' : 'hidden'">c</div>
  <div class:hidden={!open} class="flex">d</div>
</template>`;
  const result = check({ 'a.vue': vue });
  assert.deepEqual(result.unknown, []);
  assert.equal(result.code, 0, result.stdout);
});

test('a plain class next to :class still gets checked', () => {
  assert.deepEqual(check({ 'a.vue': '<div :class="{ hidden: !open }" class="flex made-up">a</div>' }).unknown, ['made-up']);
});

test('.5rem, photo.png and strings in a stylesheet are not classes', () => {
  const css = `/* .from-a-comment */
.real-class { margin: .5rem; background: url(images/photo.png); }
.other::after { content: ".from-a-string"; }`;
  const html = '<div class="real-class png 5rem from-a-comment from-a-string">x</div>';
  const result = check({ 'a.html': html, 'own.css': css }, '--css', 'own.css');
  assert.deepEqual(result.unknown.sort(), ['5rem', 'from-a-comment', 'from-a-string', 'png']);
});

test('escaped names like .w-1\\/2 still match', () => {
  const result = check({ 'a.html': '<div class="w-1/2 md:flex">x</div>', 'own.css': '.w-1\\/2 { width: 50% } .md\\:flex { display: flex }' }, '--css', 'own.css');
  assert.deepEqual(result.unknown, []);
});
