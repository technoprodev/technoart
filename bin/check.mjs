#!/usr/bin/env node
// alloy-check: lists every class in your markup that Alloy CSS doesn't
// define, so a made-up class (an AI's or your own typo) can't slip through.
//
//   npx alloy-check [paths...] [--css your.css ...] [--allow name,name]
//
// Paths are files or folders (default: the current folder). --css adds the
// classes your own stylesheets define. --allow names classes to skip, such as
// an icon font's. A class written with template syntax (class="{{ x }}",
// <%= %>, {% %}) is skipped, since only the server knows what it becomes.
// Exits 1 when it finds an unknown class.

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const MARKUP = new Set(['.html', '.htm', '.erb', '.php', '.twig', '.jinja', '.j2', '.njk', '.hbs', '.liquid', '.vue', '.svelte', '.jsx', '.tsx', '.astro', '.heex', '.templ']);
const SKIP_DIRS = new Set(['node_modules', '.git', 'vendor', 'dist', 'build', '.next']);

const args = process.argv.slice(2);
const paths = [];
const sheets = [join(dirname(fileURLToPath(import.meta.url)), '../dist/alloy.css')];
const allowed = new Set();
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--css') sheets.push(args[++i]);
  else if (args[i] === '--allow') args[++i].split(',').forEach((name) => allowed.add(name.trim()));
  else if (args[i] === '--help' || args[i] === '-h') {
    console.log('usage: alloy-check [paths...] [--css your.css ...] [--allow name,name]');
    process.exit(0);
  } else paths.push(args[i]);
}
if (!paths.length) paths.push('.');

const CLASS = /\.((?:\\.|[\w-])+)/g;
const defined = new Set();
for (const sheet of sheets) {
  for (const [, name] of readFileSync(sheet, 'utf8').matchAll(CLASS)) defined.add(name.replace(/\\/g, ''));
}

function* files(path) {
  if (statSync(path).isDirectory()) {
    for (const entry of readdirSync(path)) {
      if (!SKIP_DIRS.has(entry) && !entry.startsWith('.')) yield* files(join(path, entry));
    }
  } else if (MARKUP.has(extname(path)) || path.endsWith('.blade.php')) yield path;
}

// class="..." and className="...", in single or double quotes.
const ATTR = /\bclass(?:Name)?\s*=\s*("([^"]*)"|'([^']*)')/g;
const TEMPLATE = /\{\{|\{%|<%|\$\{|@\{|\{#/;

let unknown = 0;
for (const path of paths) {
  for (const file of files(path)) {
    const text = readFileSync(file, 'utf8');
    // A page's own <style> block counts as defined, for that page.
    const local = new Set();
    for (const [, css] of text.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)) {
      for (const [, name] of css.matchAll(CLASS)) local.add(name.replace(/\\/g, ''));
    }
    const seen = new Set();
    for (const match of text.matchAll(ATTR)) {
      const value = match[2] ?? match[3];
      if (TEMPLATE.test(value)) continue;
      const line = text.slice(0, match.index).split('\n').length;
      for (const name of value.split(/\s+/).filter(Boolean)) {
        if (defined.has(name) || local.has(name) || allowed.has(name) || seen.has(`${line} ${name}`)) continue;
        seen.add(`${line} ${name}`);
        console.log(`${file}:${line}  .${name}`);
        unknown++;
      }
    }
  }
}

if (unknown) {
  console.log(`\n${unknown} class${unknown === 1 ? '' : 'es'} Alloy CSS doesn't define. Use a kit class instead (see alloyhtml.com/docs), or pass --css for your own stylesheet.`);
  process.exit(1);
}
console.log('Every class is defined.');
