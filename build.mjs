// scss/ -> dist/: the kit and each theme, readable and minified.
import { mkdirSync, writeFileSync } from 'node:fs';
import { compile } from 'sass';

const files = {
  alloy: 'scss/index.scss',
  'themes/dark': 'scss/themes/dark.scss',
  'themes/midnight': 'scss/themes/midnight.scss',
};

mkdirSync('dist/themes', { recursive: true });
for (const [name, entry] of Object.entries(files)) {
  for (const style of ['expanded', 'compressed']) {
    const { css } = compile(entry, { style, loadPaths: ['scss'] });
    writeFileSync(`dist/${name}${style === 'compressed' ? '.min' : ''}.css`, css + '\n');
  }
}
console.log('built dist/');
