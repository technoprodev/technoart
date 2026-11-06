# Alloy CSS

One stylesheet for HTML your server renders. Utilities, plus the parts you'd
usually pull in a JavaScript library for: dialogs, menus, drawers, tabs,
tooltips and toasts, all working with scripts turned off.

Dark mode is included: two dark themes, ready to link.

The kit holds the structure: spacing, sizes, breakpoints and the parts. Your
taste (colours, fonts, corner radius) goes in one small file of your own.

No build step and no framework. It fits Rails, Django, Laravel, htmx or a
folder of HTML files as it is.

Docs, with every class and a live example: **[alloyhtml.com/docs](https://alloyhtml.com/docs)**

## Install

From a CDN:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@alloyhtml/css@1/dist/alloy.min.css">
```

Or from npm:

```
npm install @alloyhtml/css
```

and link `node_modules/@alloyhtml/css/dist/alloy.min.css`, or import the Sass
source with `@use "@alloyhtml/css/scss/index"`.

`dist/` has each file readable (`alloy.css`) and minified (`alloy.min.css`,
about 24KB gzipped).

## A first page

```html
<div class="container-960 padding-y-40">
  <div class="bg-raised border border-subtle rounded-8 padding-24">
    <h1 class="h4 font-weight-700 text-primary margin-bottom-8">Settings</h1>
    <p class="text-body-2 text-secondary margin-bottom-20">Changes save when you press the button.</p>
    <button type="button" commandfor="saved" command="show-modal"
        class="button bg-primary-1 border-primary-1 text-white hover-bg-primary-2 hover-border-primary-2">Save</button>
  </div>
</div>

<dialog id="saved" closedby="any" class="dialog bg-raised rounded-8 padding-24">
  <p class="text-body-1 text-primary margin-bottom-16">Saved.</p>
  <button type="button" commandfor="saved" command="close" class="button bg-surface border-subtle text-primary">Close</button>
</dialog>
```

The button opens the dialog, and Esc or a click outside closes it. There's
no script on the page.

## Make it yours

Put your taste in one file, linked after the kit. Every colour, font and
corner radius in the kit reads from these tokens, so the markup never
changes:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@alloyhtml/css@1/dist/alloy.min.css">
<link rel="stylesheet" href="/my-brand.css">
```

```css
/* my-brand.css */
:root {
  /* Your brand: buttons, fills and brand text. 2 is hover, 3 pressed. */
  --brand-primary-1: hsl(158, 80%, 29%);
  --brand-primary-2: hsl(158, 82%, 25%);
  --brand-primary-3: hsl(158, 85%, 21%);

  /* Your fonts: load them yourself, then name them here. */
  --font-family-base: 'Inter', system-ui, sans-serif;
  --font-family-heading: 'Inter', system-ui, sans-serif;

  /* Fields and buttons: their corners. 999px makes pills. */
  --control-radius: 8px;
}
```

That's the short version: a full brand also sets its tints and its
dark-mode shades. Skip the file and you get the kit's defaults: a violet brand, the system
font (Plus Jakarta Sans, if you load it) and 8px corners. The
[Themes & Brands](https://alloyhtml.com/docs#themes-brands) page lists every
token, and the theme builder at [alloyhtml.com/themes](https://alloyhtml.com/themes)
writes the file for you.

### Dark mode

Two dark themes come in the package, in `dist/themes/`: `dark`, a soft
graphite, and `midnight`, a soft navy. Link one after the kit.

To follow the visitor's device:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@alloyhtml/css@1/dist/themes/dark.min.css" media="(prefers-color-scheme: dark)">
```

Always dark, in midnight:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@alloyhtml/css@1/dist/themes/midnight.min.css">
```

A theme is a file of token values, like your brand file. To make your own,
copy one of these and change the values.

### Icons

Icons aren't included. The sizes (`icon-16`, `icon-24`) work with any icon
font.

## With AI

Without Alloy, ask AI for ten pages and you get ten ideas of what a button
is. With it, every page is written from the same classes and values.

`ai/alloy-css/` is a Claude skill: the rules in `SKILL.md`, and every class
with examples in `reference.md`. Copy it into your project:

```
cp -r node_modules/@alloyhtml/css/ai/alloy-css .claude/skills/
```

Other tools (Cursor, Copilot, Codex) can read the same two files. Point your
`AGENTS.md` or rules file at `ai/alloy-css/SKILL.md`.

Then check what was written. `alloy-check` lists every class the kit
doesn't define, with its file and line, and fails when it finds one:

```
npx -p @alloyhtml/css alloy-check templates/
```

`--css your.css` adds your own stylesheet's classes, and `--allow name`
skips one, such as an icon font's.

## Browsers

Chrome and Edge 123, Firefox 125, Safari 17.5, and anything newer. The
interactive parts are built on popover, `:has()`, `color-mix()` and
`light-dark()`, which older browsers don't have.

## Pages built with it

[Alloy](https://alloyhtml.com) is 82 pages built only with this kit: a shop
and its back office, a blog, e-learning, news, healthcare booking, event
tickets, a job portal and a company site. They're sold separately; the CSS
is free.

## Licence

MIT. See [LICENSE](LICENSE).
