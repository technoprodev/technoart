# Technoart

A constrained CSS utility library. Not a framework, a discipline.

The constraint is the product. Spacing follows a 4pt grid. Breakpoints are fixed. Base components are structural. Colors, brand tokens, and visual opinions belong to your team.

Technoart ships two things: a compiled CSS file, and a philosophy. Use the file, or use just the idea.

Full build is ~125kb. With [PurgeCSS](https://purgecss.com) in production, real-world usage drops this to a few kb.

---

## Get Started

**Use the file** - drop in and go.

**CDN:**
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/technoart/dist/technoart.css" />
```

**npm:**
```bash
npm install technoart
```
```css
@import 'technoart/dist/technoart.css';
```

After dropping in the CSS, define your color tokens once in your own stylesheet. Technoart ships no colors. That's intentional. Here's a common starting point:

```css
/* your stylesheet, loaded after technoart.css */
:root {
  --color-primary: hsl(182, 70%, 40%);
  --color-text: hsl(235, 12%, 20%);
  --color-bg: hsl(210, 30%, 98%);
  --color-surface: #fff;
  --color-border: hsl(210, 17%, 88%);
  --color-muted: hsl(208, 17%, 55%);
}
body {
  color: var(--color-text);
  background: var(--color-bg);
  font-family: system-ui, sans-serif;
}
```

These aren't Technoart's variables. They're yours. Change the names, change the values, add or remove. The library works with whatever you define. See `demo/index.html` for a working example of this pattern.

---

**Use the idea** - fork and own.

```
index.scss           ← entry point
_variable.scss       ← shared variables (spacing scale, breakpoints)
_mixin.scss          ← mixins
core/                ← individual utility files
demo/index.html      ← visual reference for every utility
```

```bash
git clone https://github.com/yourusername/technoart
npm install
npm run build        # compile to dist/technoart.css
npm run dev          # watch mode
```

Modify `_variable.scss` to adjust the spacing scale, breakpoints, or structural defaults. A team that forks Technoart now owns their system. That's the intended outcome.

---

## Breakpoints

Three fixed breakpoints. **Breakpoint suffix = that size and below** (`max-width`).

| Suffix | Value  | Applies when              |
|--------|--------|---------------------------|
| `-sm`  | 640px  | ≤ 640px                   |
| `-md`  | 768px  | ≤ 768px                   |
| `-lg`  | 1024px | ≤ 1024px                  |

```html
<!-- 32px padding on desktop, 16px on mobile -->
<div class="padding-32 padding-16-sm">...</div>

<!-- Row on desktop, column on mobile -->
<div class="flex flex-row flex-column-sm">...</div>
```

One direction only. Base styles are your default (typically desktop). Breakpoint suffixes are overrides for smaller screens. The only exception is [Hidden](#hidden), which supports both directions by design.

**Why desktop-first and not mobile-first?**

Tailwind and most utility frameworks default to mobile-first, where `md:` means 768px and above. Technoart defaults to desktop-first, where `-md` means 768px and below.

Web apps are primarily desktop experiences. The base style is what most users see most of the time. Mobile is an override. Desktop-first reads naturally for app UIs: "this is the layout, on smaller screens it adapts." Mobile-first makes more sense for content sites where the reading experience starts on phone. For app development, write the default first, add breakpoint suffixes as exceptions.

---

## Spacing

4pt grid. Responsive: yes

Values: `0, 2, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 80, 100, 120, 140`

> `2` is a deliberate exception, outside the 4pt grid, useful for hairline gaps and micro-nudges.

| Class | CSS |
|-------|-----|
| `.margin-{n}` | `margin: {n}px` |
| `.margin-x-{n}` | `margin-left + margin-right: {n}px` |
| `.margin-y-{n}` | `margin-top + margin-bottom: {n}px` |
| `.margin-top-{n}` | `margin-top: {n}px` |
| `.margin-right-{n}` | `margin-right: {n}px` |
| `.margin-bottom-{n}` | `margin-bottom: {n}px` |
| `.margin-left-{n}` | `margin-left: {n}px` |
| `.margin-auto` | `margin: auto` |
| `.margin-x-auto` | `margin-left: auto; margin-right: auto` |
| `.margin-y-auto` | `margin-top: auto; margin-bottom: auto` |
| `.margin-{top\|right\|bottom\|left}-auto` | single side auto |
| `.padding-{n}` | `padding: {n}px` |
| `.padding-x-{n}` | `padding-left + padding-right: {n}px` |
| `.padding-y-{n}` | `padding-top + padding-bottom: {n}px` |
| `.padding-top-{n}` | `padding-top: {n}px` |
| `.padding-right-{n}` | `padding-right: {n}px` |
| `.padding-bottom-{n}` | `padding-bottom: {n}px` |
| `.padding-left-{n}` | `padding-left: {n}px` |

```html
<div class="padding-x-24 padding-x-16-sm margin-bottom-32 margin-bottom-16-sm">...</div>
```

---

## Size

Same 4pt grid for fixed pixel sizes. Responsive: yes

Pixel values: `0, 2, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 80, 100, 120, 140`

| Class | CSS |
|-------|-----|
| `.size-{n}px` | `width: {n}px; height: {n}px` |
| `.width-{n}px` | `width: {n}px` |
| `.height-{n}px` | `height: {n}px` |
| `.icon-{n}` | `font-size: {n}px` (for icon fonts) |

Percentage values: `0, 10, 20, 25, 30, 40, 50, 60, 70, 75, 80, 90, 100`

| Class | CSS |
|-------|-----|
| `.width-{n}` | `width: {n}%` |
| `.height-{n}` | `height: {n}%` |
| `.width-1-3` / `.width-2-3` | `width: 33.33%` / `width: 66.66%` |
| `.height-1-3` / `.height-2-3` | `height: 33.33%` / `height: 66.66%` |
| `.width-100v` / `.height-100v` | `width: 100vw` / `height: 100vh` |
| `.width-auto` / `.height-auto` | `width: auto` / `height: auto` |
| `.min-width-0` / `.min-width-100` | `min-width: 0` / `min-width: 100%` |
| `.max-width-0` / `.max-width-100` | `max-width: 0` / `max-width: 100%` |
| `.min-height-0` / `.min-height-100` | `min-height: 0` / `min-height: 100%` |
| `.max-height-0` / `.max-height-100` | `max-height: 0` / `max-height: 100%` |
| `.min-width-100v` / `.max-width-100v` | viewport units |
| `.min-height-100v` / `.max-height-100v` | viewport units |

---

## Typography

Heading and body size utilities. Apply to any element. Responsive: yes

| Class | font-size | line-height |
|-------|-----------|-------------|
| `.h1` | 40px | 44px |
| `.h2` | 32px | 36px |
| `.h3` | 28px | 32px |
| `.h4` | 24px | 28px |
| `.h5` | 20px | 24px |
| `.h6` | 18px | 22px |
| `.text-body-1` | 16px | 24px |
| `.text-body-2` | 14px | 20px |
| `.text-body-3` | 12px | 16px |
| `.text-body-4` | 10px | 16px |

**Alignment** - Responsive: yes

`.text-left` `.text-center` `.text-right` `.text-justify`

**Wrapping** - Responsive: yes

`.text-wrap` `.text-nowrap` `.text-ellipsis`

**Decoration** - Responsive: yes

`.text-line-none` `.text-strike` `.text-underline` `.hover-text-underline` `.hover-text-line-none` `.hover-text-strike`

**Weight** - Responsive: yes

`.font-weight-100` through `.font-weight-800`, `.font-weight-normal`, `.font-weight-bold`

**Transform / Style** - Responsive: no

`.text-uppercase` `.text-lowercase` `.text-capitalize` `.font-style-italic` `.font-style-normal`

**Other** - Responsive: no

`.line-height-1` `.letter-spacing-2` `.cursor-pointer` `.cursor-default` `.cursor-progress` `.cursor-not-allowed` `.ul-square` `.ul-unstyled`

```html
<h2 class="h4 h5-sm font-weight-bold">Responsive heading size</h2>
<p class="text-body-2 text-body-3-sm">Smaller on mobile</p>
```

---

## Flex

Responsive: yes

**Container**

`.flex` `.inline-flex`

**Direction**

`.flex-row` `.flex-column` `.flex-row-reverse` `.flex-column-reverse`

**Wrap**

`.flex-wrap` `.flex-nowrap`

**Justify Content** (main axis)

`.flex-justify-start` `.flex-justify-end` `.flex-justify-center` `.flex-justify-between` `.flex-justify-around`

**Align Items** (cross axis)

`.flex-items-start` `.flex-items-end` `.flex-items-center` `.flex-items-baseline` `.flex-items-stretch`

**Align Content** (multi-row)

`.flex-content-start` `.flex-content-end` `.flex-content-center` `.flex-content-between` `.flex-content-around` `.flex-content-stretch`

**Gutter** - values: `0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40`

`.flex-gutter-{n}` `.flex-gutter-x-{n}` `.flex-gutter-y-{n}`

> Gutter uses negative margin on the container + padding on children. Don't add padding to children separately.

**Align Self** (on children)

`.align-auto` `.align-start` `.align-end` `.align-center` `.align-baseline` `.align-stretch`

**Grow / Shrink**

`.grow-0` `.grow-1` `.shrink-0` `.shrink-1`

**Fill**

`.fill`: `flex: 1 1 auto` (fills available space)
`.equal`: `flex: 1 0 0%` (equal width with siblings)

**Order**

`.order-min-1` `.order-0` `.order-1` `.order-2` `.order-3` `.order-4` `.order-5`

```html
<div class="flex flex-justify-between flex-items-center flex-gutter-16 flex-column-sm">
  <div class="grow-1">...</div>
  <div class="shrink-0">...</div>
</div>
```

---

## Border

Responsive: yes

| Class | CSS |
|-------|-----|
| `.border` | `border: 1px solid currentColor` |
| `.border-x` | left + right |
| `.border-y` | top + bottom |
| `.border-top` | `border-top: 1px solid currentColor` |
| `.border-right` | `border-right: 1px solid currentColor` |
| `.border-bottom` | `border-bottom: 1px solid currentColor` |
| `.border-left` | `border-left: 1px solid currentColor` |
| `.border-none` | `border: none` |
| `.border-width-2` / `-3` / `-4` | `border-width: 2px / 3px / 4px` |

Border color follows `currentColor`. Set `color` on the element and the border matches automatically. Source users can replace `currentColor` directly in `core/_border.scss` with any value: a CSS variable, a hex, a token from their own system.

---

## Border Radius

Responsive: no

Values: `0, 4, 8, 16, 9999`

| Class | CSS |
|-------|-----|
| `.rounded-{n}` | `border-radius: {n}px` |
| `.circle` | `border-radius: 50%` |

> `9999` is the pill value, fully rounded ends on any element regardless of height. Base only, no individual corners, no responsive variants.

---

## Opacity

Responsive: yes

`.opacity-02` `.opacity-04` `.opacity-06` `.opacity-08` `.opacity-1`

---

## Overflow

Responsive: yes

`.overflow-auto` `.overflow-x-auto` `.overflow-y-auto`
`.overflow-hidden` `.overflow-x-hidden` `.overflow-y-hidden`
`.overflow-visible` `.overflow-x-visible` `.overflow-y-visible`
`.overflow-scroll-hidden`

---

## Positioning

Responsive: yes

**Display**: `.block` `.inline-block` `.inline`

**Position**: `.static` `.relative` `.absolute` `.fixed` `.sticky`

**Offset**: `.top-0` `.right-0` `.bottom-0` `.left-0` `.top-100` `.right-100` `.bottom-100` `.left-100` `.top-auto` `.right-auto` `.bottom-auto` `.left-auto`

**Center shortcuts**: `.center-x` (horizontal) `.center-y` (vertical) `.center` (both)

**Z-index**: `.z-min-2` `.z-min-1` `.z-0` `.z-1` `.z-2` `.z-3` `.z-4` `.z-5` `.z-6` `.z-7` `.z-8` `.z-9` `.z-max` `.z-unset`

---

## Shadow

Responsive: yes

| Class | |
|-------|-|
| `.shadow-none` | removes shadow |
| `.shadow-1` `.shadow-2` `.shadow-3` `.shadow-4` | increasing elevation |
| `.hover-shadow-1` through `.hover-shadow-4` | on `:hover` |
| `.active-shadow-1` through `.active-shadow-4` | on `:active` |

---

## Hidden

**Breakpoint suffix = that size and below** (max-width, same as all utilities).
**`-greater` suffix = that size and above** (min-width, exception for visibility control only).

| Class | Applies when |
|-------|--------------|
| `.hidden` | always |
| `.hidden-sm` | ≤ 640px |
| `.hidden-md` | ≤ 768px |
| `.hidden-lg` | ≤ 1024px |
| `.hidden-sm-greater` | ≥ 640px |
| `.hidden-md-greater` | ≥ 768px |
| `.hidden-lg-greater` | ≥ 1024px |
| `.hidden-print` | when printing |
| `.hidden-screen` | when on screen |

```html
<!-- Show on mobile only -->
<div class="hidden-sm-greater">Mobile only</div>

<!-- Show on desktop only -->
<div class="hidden-sm">Desktop only</div>
```

No `.visible-*` class exists or is needed. Use `hidden` on the element that should disappear, not on the one that should appear.

---

## Scroll Locked

Locks body scroll. Use for modals, drawers, overlays.

```html
<body class="scroll-locked">...</body>
```

---

## Container

Centered, max-width containers.

| Class | Max-width |
|-------|-----------|
| `.container-1320` | 1320px |
| `.container-960` | 960px |

---

## Button

Structural base only. No color, no size, no padding. Those are yours.

```html
<button class="button">Label</button>
<a class="button" href="#">Link styled as button</a>
```

Provides: `display: inline-block`, `text-align: center`, `text-decoration: none`, `user-select: none`, `background-color: transparent`, `border: 1px solid currentColor`, `border-radius: 4px`, `cursor: pointer`, disabled state.

`border: 1px solid currentColor` means the border always matches the element's `color`. Set `color` on the button and the border follows, no separate override needed. On a blank page this renders as black (browser default), which is correct and intentional.

Your team defines size, color, shape, and variants.

---

## Form

Structural base for form controls. No color, no visual opinion.

| Element | Class |
|---------|-------|
| Text input | `.form-text` |
| Textarea | `.form-textarea` |
| Select / Dropdown | `.form-dropdown` |
| Checkbox (stroke style) | `.form-checkbox.form-checkbox-stroke` |
| Checkbox (fill style) | `.form-checkbox.form-checkbox-fill` |
| Radio (stroke style) | `.form-radio.form-radio-stroke` |
| Radio (fill style) | `.form-radio.form-radio-fill` |
| Toggle | `.form-toggle` |

```html
<input class="form-text" type="text" placeholder="Text input" />
<div class="form-checkbox form-checkbox-stroke">
  <label><input type="checkbox" /> Option</label>
</div>
```

---

## Table

| Class | Description |
|-------|-------------|
| `.table` | Base table |
| `.table.table-compact` | Reduced cell padding |
| `.table.table-bordered` | All cell borders |
| `.table.table-border-none` | No borders |
| `.table.table-striped` | Alternating row background |
| `.table.table-hovered` | Row highlight on hover |
| `.table .th-shrink` | Column shrinks to content width |
| `.table .th-expand` | Column expands to fill available space |

---

## Skeleton

Apply `.skeleton` to leaf elements inside the component being loaded, not a separate skeleton component.

```html
<!-- The same ArticleCard component, in loading state -->
<div class="article-card">
  <div class="skeleton article-card__image"></div>
  <div class="skeleton article-card__title"></div>
  <div class="skeleton article-card__body"></div>
</div>
```

**Why not a separate skeleton component?** A separate `ArticleCardSkeleton` has a different DOM structure than the real `ArticleCard`. When real content loads and the skeleton swaps out, the layout shifts, which is a CLS (Cumulative Layout Shift) regression. Using `.skeleton` on the same component structure guarantees an identical layout, so the shift is zero.

Skeleton exposes two CSS custom properties:

| Property | Default | Description |
|---|---|---|
| `--skeleton-bg` | `#E7E7E7` | Base background color |
| `--skeleton-shimmer` | `rgba(255,255,255,0.35)` | Shimmer highlight, expects an rgba value |

```css
:root {
  --skeleton-bg: #D8D8D8;
  --skeleton-shimmer: rgba(255, 255, 255, 0.5);
}
```

Source users can override `$skeleton-animation-duration` (default `3s`) before import.

---

## Animate

Usage pattern: attach `.animate` as a base, then add animation and modifier classes:

```html
<div class="animate fade-in-up delay-1s">...</div>
```

**Animation types**: `fade-in`, `fade-in-down`, `fade-in-left`, `fade-in-right`, `fade-in-up`, `fade-out`, `fade-out-down`, `fade-out-left`, `fade-out-right`, `fade-out-up`, `slide-in-down`, `slide-in-left`, `slide-in-right`, `slide-in-up`, `slide-out-*`, `zoom-in`, `zoom-out`

**Modifiers**: `.repeat-1` `.repeat-2` `.repeat-3` / `.delay-1s` `.delay-2s` `.delay-3s` / `.speed-02s` `.speed-04s` `.speed-06s` `.speed-08s` `.speed-2s` `.speed-3s`

---

## Group-Show

Behavioral utility. Shows child elements conditionally when a parent is hovered or focused.

```html
<div class="group">
  <button>Hover me</button>
  <div class="group-hover-show">Visible only on parent hover</div>
</div>
```

Classes: `.group-hover-show` `.group-focus-show` `.group-show` (hover + focus)

Two caveats: `.group-focus-show` uses `:not(:focus)`. For this to work on a non-interactive element like a `div`, add `tabindex="0"`. And because visibility is toggled with `display:none`, it cannot be CSS-transitioned, so combining with `.animate` will not produce a fade-in.

---

## Contributing

Technoart is deliberately opinionated. PRs that add utility values, breakpoints, or configuration options are unlikely to be merged. The constraint is the product.

Bug fixes, documentation improvements, and demo page additions are welcome.

---

## License

MIT
