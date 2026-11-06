# Alloy CSS reference

Every class, value and pattern, as the docs at alloyhtml.com/docs list them.
Generated from the docs; do not edit by hand.

## Make It Yours

### Themes & Brands

Two kinds of small stylesheet, linked after the kit's. A theme sets the page's colours: the kit is light, and Dark (a soft graphite) and Midnight (a soft navy) ship with it. A brand sets a product's colour and the shape of its fields and buttons. The theme builder (/themes) writes both files for you.

#### Stylesheets

```html
<!-- Fonts. Required, or the text falls back to system fonts. Add your own typeface here. -->
<link rel="stylesheet" href="/fonts/fonts.css">

<!-- Icons: Google's Material Icons (Apache 2.0), not part of the kit. Swap this one file for another icon set. -->
<link rel="stylesheet" href="/fonts/icons.css"> <!-- or your own icon set -->

<!-- The kit. Required. -->
<link rel="stylesheet" href="/assets/css/index.css">

<!-- The brand. Optional: edit it to rebrand. -->
<link rel="stylesheet" href="/assets/css/brands/cedar-health.css"> <!-- or my-brand.css -->

<!-- The theme. Optional: one of these two, or none for light only. -->
<!-- Follows the visitor's device: -->
<link rel="stylesheet" href="/assets/css/themes/dark.css" media="(prefers-color-scheme: dark)"> <!-- or midnight.css, or my-theme.css -->
<!-- Always dark: -->
<link rel="stylesheet" href="/assets/css/themes/dark.css"> <!-- or midnight.css, or my-theme.css -->
```

A light-only page downloads none of the dark styles. The brand and the theme can go in either order.

#### Theme

Surfaces, text and borders. Solid palette colours such as red stay the same in every theme. A dark theme of your own goes after themes/dark.css, so it keeps the dark extras (soft tints, lifted coloured text, dark form fields).

```html
/* my-theme.css: link it after the kit's stylesheet and themes/dark.css. */
:root {
  --color-bg-base: #242427;         /* the page */
  --color-bg-surface: #080808;      /* buttons, icon tiles, table heads */
  --color-bg-raised: #404045;       /* cards */
  --color-border-subtle: #4e4e54;   /* dividers */
  --color-border-strong: #8a8a8f;   /* field edges: keep 3:1 */
  --color-text-primary: #f4f4f5;
  --color-text-secondary: #cdcdd4;
  --color-text-muted: #ababb1;      /* keep 4.5:1 on cards */
}
```

#### Brand

Each product page links its brand file, assets/css/brands/<name>.css (cedar-health.css, stagepass.css …). Edit that one file to rebrand a product, or link your own in its place: every page and every theme follows.

```html
/* my-brand.css: link it after the kit's stylesheet. */
:root {
  --brand-primary-1: hsl(158, 80%, 29%);       /* buttons, fills, brand text */
  --brand-primary-2: hsl(158, 82%, 25%);       /* hover */
  --brand-primary-3: hsl(158, 85%, 21%);       /* pressed */
  --brand-primary-light-1: hsl(150, 70%, 97%); /* tints behind badges */
  --brand-primary-light-2: hsl(150, 70%, 94%);
  --brand-primary-light-3: hsl(150, 70%, 90%);
  --brand-primary-dark-1: hsl(158, 85%, 22%);  /* brand text on a tint */
  --brand-primary-dark-2: hsl(158, 90%, 16%);
  --brand-primary-dark-3: hsl(158, 95%, 12%);

  /* The dark themes: lighter, so brand text reads on dark cards. */
  --brand-dark-primary-1: hsl(158, 55%, 50%);
  --brand-dark-primary-2: hsl(158, 60%, 58%);
  --brand-dark-primary-3: hsl(158, 65%, 66%);
  --brand-dark-on-primary: hsl(160, 30%, 10%); /* text on a brand fill */

  /* Links and the focus outline don't follow the brand on their own. */
  --color-link: hsl(158, 80%, 26%);
  --color-focus-ring: hsl(158, 80%, 26%);

  /* Type: the headings' font, and the one for everything else. */
  --font-family-heading: 'Merriweather', Georgia, serif;
  --font-family-base: 'Plus Jakarta Sans', system-ui, sans-serif;

  /* Fields and buttons: their corner radius (999px makes pills). */
  --control-radius: 12px;
}
```

Keep white button text readable: at least 4.5:1 against primary-1, about 40% lightness for most hues and darker for green and yellow. Fonts: Plus Jakarta Sans and Merriweather ship in fonts/fonts.css; for another font, add its @font-face there and name it here. --font-family-heading styles the h1 to h6 elements (the .h1 to .h6 classes keep the base font), and --font-family-serif the .font-family-serif class.

#### Theme switch

Optional, and the only part that needs a script. Give the theme link an id, point it at the chosen file, and remember the choice. Run the restore part in the <head>, so the page never flashes the wrong theme.

```html
<link id="theme" rel="stylesheet" href="/assets/css/themes/dark.css" media="(prefers-color-scheme: dark)">
<script>
  function setTheme(name) {
    var link = document.getElementById('theme');
    if (name === 'light') link.media = 'not all';
    else { link.href = '/assets/css/themes/' + name + '.css'; link.media = 'all'; }
    try { localStorage.setItem('theme', name); } catch (e) {}
  }
  try { var saved = localStorage.getItem('theme'); if (saved) setTheme(saved); } catch (e) {}
</script>
```

## Quick Reference

### Cheatsheet

Every value the utilities are built from, on one page.

No breakpoint versions: the same at every width.

#### Browsers

| Browser | From version (desktop and phone) |
|---|---|
| Chrome | 123 |
| Edge | 123 |
| Firefox | 125 |
| Safari | 17.5 |

Menus, dialogs, tabs and filters are built on popover, :has(), color-mix() and light-dark(), which older browsers do not have.

#### Breakpoints

A suffixed class applies at that width and below: .padding-16-xs is 16px of padding on a phone. Put the plain class first and the smaller screens after it.

| Suffix | Max-width |
|---|---|
| -lg | 1200px |
| -md | 992px |
| -sm | 768px |
| -xs | 576px |

| Classes | Breakpoint versions |
|---|---|
| Spacing, width and height, display, flex and gap, order, position, overflow, text size, alignment and wrapping, font weight, rounded-0 | Yes |
| Colour, border, rounded, shadow, opacity, z-index, icon and square sizes, animation | No: the same at every width |

#### Scales

Each family offers the steps the kit designs with. Spacing, gap and square sizes share their common numbers, so 16 is 16 everywhere.

| Scale | Values |
|---|---|
| Margin / padding (px) | 0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 60, 80, 100, 120, 140 |
| Square size (px) | 8, 12, 16, 20, 24, 28, 32, 36, 40, 48, 56, 64, 80 |
| Icon size (px) | 12, 16, 20, 24, 32, 48 |
| Width (%) | 0, 10, 20, 25, 30, 40, 50, 60, 70, 75, 80, 90, 100 (height: 100) |
| Flex gap and gutter | 0, 4, 8, 12, 16, 20, 24, 32, 40 |
| Border radius | 0, 4, 8, 12, 16, 20 |
| z-index | 0 to 5, plus z-max |
| Opacity | 0, 0.05, 0.2, 0.4, 0.6, 0.8, 1 |

#### Palette

Each colour works after .bg-, .text- and .border-.

Brand: primary-1, primary-2, primary-3, primary-light-1, primary-light-2, primary-light-3, primary-dark-1, primary-dark-2, primary-dark-3, violet-1, violet-2, violet-3, violet-light-1, violet-light-2, violet-light-3, violet-dark-1, violet-dark-2, violet-dark-3, amber-1, amber-2, amber-3, amber-light-1, amber-light-2, amber-light-3, amber-dark-1, amber-dark-2, amber-dark-3

Neutral: light-1, light-2, light-3, gray-1, gray-2, gray-3, dark-1, dark-2, dark-3

Utility: red-1, red-2, red-3, red-light-1, red-light-2, red-light-3, red-dark-1, red-dark-2, red-dark-3, magenta-1, magenta-2, magenta-3, magenta-light-1, magenta-light-2, magenta-light-3, magenta-dark-1, magenta-dark-2, magenta-dark-3, blue-1, blue-2, blue-3, blue-light-1, blue-light-2, blue-light-3, blue-dark-1, blue-dark-2, blue-dark-3, cyan-1, cyan-2, cyan-3, cyan-light-1, cyan-light-2, cyan-light-3, cyan-dark-1, cyan-dark-2, cyan-dark-3, green-1, green-2, green-3, green-light-1, green-light-2, green-light-3, green-dark-1, green-dark-2, green-dark-3, orange-1, orange-2, orange-3, orange-light-1, orange-light-2, orange-light-3, orange-dark-1, orange-dark-2, orange-dark-3

Grayscale: white, white-5, white-20, white-40, white-60, white-80, black, black-5, black-20, black-40, black-60, black-80, transparent

## Layout & Structure

### Container

Centres content up to a max-width, with 24px of side padding. Both containers are fluid.

Has breakpoint versions (-lg, -md, -sm, -xs).

No breakpoint suffix needed. A container fills the screen up to its max-width, so the wide one is never narrower than the narrow one and a page lines up with the header above it at every width.

| Class | Description |
|---|---|
| .container-1320 | Max-width 1320px. Headers, footers and pages you browse. |
| .container-960 | Max-width 960px. Pages you read or fill in: profiles, settings, checkout. |

```html
<div class="container-1320 bg-surface border border-subtle rounded-8 padding-y-12">
  Default container content
</div>

<div class="container-960 bg-surface border border-subtle rounded-8 padding-y-12 margin-top-8">
  Narrower container content
</div>
```

### Flex

Arrange, align and space items in a row or column.

Has breakpoint versions (-lg, -md, -sm, -xs).

#### Container & direction

| Class | Description |
|---|---|
| .flex | Flex container. |
| .inline-flex | Inline flex container. |
| .flex-row | Items flow horizontally (default). |
| .flex-column | Items flow vertically. |
| .flex-nowrap / .flex-wrap | Keep items on one line / let them wrap to new lines. |
| .flex-row-reverse | Reversed horizontal flow. |
| .flex-column-reverse | Reversed vertical flow. |

```html
<div class="flex flex-column flex-row-sm flex-gap-12">
  <div class="bg-surface border border-subtle rounded-8 padding-12">Item 1</div>
  <div class="bg-surface border border-subtle rounded-8 padding-12">Item 2</div>
  <div class="bg-surface border border-subtle rounded-8 padding-12">Item 3</div>
</div>
```

#### Justify & align

| Class | Description |
|---|---|
| .flex-justify-start / .flex-justify-end | Pack items at the start / end of the main axis. |
| .flex-justify-between / .flex-justify-around | Space between items / around each item. |
| .flex-justify-center | Center items on the main axis. |
| .flex-items-start / .flex-items-end | Align items to the start / end of the cross axis. |
| .flex-items-center | Center items on the cross axis. |
| .flex-items-baseline / .flex-items-stretch | Align items to their text baseline / stretch them to fill the cross axis. |
| .flex-content-start / .flex-content-end / .flex-content-center | Place wrapped rows at the start / end / middle of the cross axis. |
| .flex-content-between / .flex-content-around / .flex-content-stretch | Space wrapped rows apart / around / stretch them. |

```html
<div class="flex flex-justify-between flex-items-center bg-surface border border-subtle rounded-8 padding-12">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

#### Gap

Space between items. Use it for rows of buttons, chips, badges and cards.

| Class | Description |
|---|---|
| .flex-gap-{size} | Both axes. Sizes: 0, 4, 8, 12, 16, 20, 24, 32, 40. |
| .flex-gap-x-{size} | Between columns only. |
| .flex-gap-y-{size} | Between wrapped rows only. |

```html
<div class="flex flex-gap-16 flex-gap-4-sm">
  <div class="bg-surface border border-subtle rounded-8 padding-12">Item 1</div>
  <div class="bg-surface border border-subtle rounded-8 padding-12">Item 2</div>
  <div class="bg-surface border border-subtle rounded-8 padding-12">Item 3</div>
</div>
```

#### Gutter, for percentage columns

Gutter is padding on each child, so a .width-50 column plus its gutter still adds up to 100%. Put the width on a plain wrapper and the card inside it: a child that paints its own background, or sets its own padding, loses the space.

| Class | Description |
|---|---|
| .flex-gutter-{size} | Both axes. Same sizes as gap. |
| .flex-gutter-x-{size} | Horizontal only. |
| .flex-gutter-y-{size} | Vertical only. |

```html
<div class="flex flex-wrap flex-gutter-16">
  <div class="width-50">
    <div class="bg-surface border border-subtle rounded-8 padding-12">Half</div>
  </div>
  <div class="width-50">
    <div class="bg-surface border border-subtle rounded-8 padding-12">Half</div>
  </div>
</div>
```

#### Grow, shrink, fill & equal

| Class | Description |
|---|---|
| .grow-1 / .grow-0 | Item can / cannot grow to fill space. |
| .shrink-1 / .shrink-0 | Item can / cannot shrink. |
| .fill | flex: 1 1 auto. |
| .equal | flex: 1 0 0%, for equal-width siblings. |

```html
<div class="flex flex-gap-12">
  <div class="grow-1 bg-surface border border-subtle rounded-8 padding-12">grow-1 (fills space)</div>
  <div class="shrink-0 bg-surface border border-subtle rounded-8 padding-12">shrink-0</div>
</div>
```

#### Align self & order

| Class | Description |
|---|---|
| .align-start / .align-center / .align-end | Aligns one item on the cross axis. |
| .align-auto / .align-baseline / .align-stretch | Follow the container / align to the text baseline / stretch. |
| .order-min-1 … .order-5 | Visual order, independent of markup order. |

```html
<div class="flex flex-gap-12" style="height: 60px;">
  <div class="align-start bg-surface border border-subtle rounded-8 padding-8">align-start</div>
  <div class="align-center bg-surface border border-subtle rounded-8 padding-8">align-center</div>
  <div class="align-end bg-surface border border-subtle rounded-8 padding-8">align-end</div>
</div>
```

### Positioning

Display, position, edge offsets, centering and z-index.

Has breakpoint versions (-lg, -md, -sm, -xs).

#### Display & position

| Class | Description |
|---|---|
| .block / .inline-block / .inline | display: block / inline-block / inline. |
| .static | Normal flow. |
| .relative | Offset from its own position. Anchors absolute children. |
| .absolute | Positioned against the nearest positioned ancestor. |
| .fixed | Positioned against the viewport. |
| .sticky | Sticks once scrolled to its offset. |

```html
<div class="relative bg-surface border border-subtle rounded-8 padding-24" style="height: 80px;">
  Relative parent
  <div class="absolute top-0 right-0 bg-raised border border-subtle rounded-4 padding-8">absolute top-0 right-0</div>
</div>
```

#### Edge offsets & centering

Offsets need a position class. Centering needs a .relative parent.

| Class | Description |
|---|---|
| .top-0 / .right-0 / .bottom-0 / .left-0 | Offset to 0. |
| .top-auto / .right-auto / .bottom-auto / .left-auto | Remove an offset set at another breakpoint. |
| .top-100 / .right-100 / .bottom-100 / .left-100 | Offset to 100%. |
| .center-x / .center-y / .center | Center horizontally / vertically / both. |

```html
<div class="relative bg-surface border border-subtle rounded-8" style="height: 80px;">
  <div class="absolute center bg-primary-1 text-white rounded-4 padding-x-12 padding-y-4">Fully Centered</div>
</div>
```

#### Z-index

| Class | Description |
|---|---|
| .z-n2 / .z-n1 | z-index: -2 / -1. The trailing n means negative, as in .margin-top-n20. |
| .z-0 … .z-5 | z-index: 0 to 5. No breakpoint versions. |
| .z-max | z-index: 2147483647. |
| .z-unset | z-index: unset. |

### Hidden

display: none, everywhere or per breakpoint, screen or print.

Has breakpoint versions (-lg, -md, -sm, -xs).

| Class | Description |
|---|---|
| .hidden | Hidden on all screens. |
| .hidden-lg / -md / -sm / -xs | Hidden below that breakpoint. |
| .hidden-lg-greater / -md-greater / -sm-greater / -xs-greater | Hidden above that breakpoint. |
| .hidden-print | Hidden when printed. |
| .hidden-screen | Hidden on screen, still printed. |
| .visually-hidden | Not shown, still read by screen readers: the word an icon stands for, such as "Cart". |

```html
<div class="bg-surface border border-subtle rounded-8 padding-12 hidden-sm">
  Hidden below 768px. Resize to see it disappear.
</div>
```

### Overflow

What happens when content is bigger than its box.

Has breakpoint versions (-lg, -md, -sm, -xs).

| Class | Description |
|---|---|
| .overflow-auto / -x-auto / -y-auto | Scrollbars only when needed. |
| .overflow-visible / -x-visible / -y-visible | Content spills out. |
| .overflow-hidden / -x-hidden / -y-hidden | Content is clipped. |
| .overflow-scroll-hidden | Scrolls, but hides the scrollbar. |
| .overflow-overlay / .overflow-x-overlay / .overflow-y-overlay | Scrollbars draw over the content instead of taking space. Browser support is partial, so treat it as a progressive enhancement. |

```html
<div class="overflow-auto bg-surface border border-subtle rounded-8 padding-12" style="height: 60px;" tabindex="0" role="region" aria-label="Scrolling box">
  <div class="text-nowrap">This single line of content is wider than its container, so it scrolls horizontally instead of wrapping.</div>
</div>
```

### App Layouts

Each app comes in every layout that suits it, and all of them share every page. A page never needs to know which one it is wearing.

#### Layouts

The layout is the header, the sidebar (if any) and the footer. The pages inside it are the same in every one. On the demo site /ecommerce, /ecommerce/layout-2, /ecommerce/layout-3 and on to /ecommerce/layout-7 show the same homepage in each, and a visitor stays in the layout they opened as they click through. In your download each layout is a plain page with its links already written, so there is nothing to wire.

#### Sticky offset

Some pages pin something of their own while you scroll: the cart header, the filter sidebar on a search page. Those must stop below the layout's header, and the headers differ in height. Each layout declares its sticky header height as the custom property --shell-top on its root element, and the page uses it. A layout with no sticky header leaves it at 0px.

| Where | What to write |
|---|---|
| Layout root element | --shell-top: 67px; (one value per breakpoint if the header changes height) |
| A sticky part of a page | top: calc(var(--shell-top, 0px) + 24px); |

```html
<div style="--shell-top: 67px">
  <header class="sticky top-0 bg-raised">Header, 67px tall</header>
  <aside class="sticky bg-surface padding-16" style="top: calc(var(--shell-top, 0px) + 24px)">
    Stops 24px below the header.
  </aside>
</div>
```

On the demo site npm run check:shell measures every layout at ten widths and fails when a declared value is not the real height.

## Sizing & Spacing

### Size

Squares in pixels; width and height in percentages, fractions or viewport units.

Has breakpoint versions (-lg, -md, -sm, -xs).

#### Pixel sizes

| Class | Description |
|---|---|
| .size-{px} | Same width and height: dots, avatars, icon tiles, thumbnails. |
| .height-24px | The height of pills, tags and small badges. |

```html
<div class="size-64px bg-primary-1 rounded-8"></div>
```

Square sizes: 8, 12, 16, 20, 24, 28, 32, 36, 40, 48, 56, 64, 80. Any other fixed width or height belongs in your own CSS, named for what it is.

#### Percentage, fraction & viewport

| Class | Description |
|---|---|
| .width-{pct} | Percent of the parent: 0, 10, 20, 25, 30, 40, 50, 60, 70, 75, 80, 90, 100. |
| .height-100 | The full height of the parent. |
| .width-1-3 / .width-2-3 / .width-1-6 / .width-1-12 | Fractions of the parent. |
| .width-100v / .height-100v | Full viewport width / height. |
| .width-auto / .height-auto | auto. |

```html
<div class="flex flex-gutter-8">
  <div class="width-1-3">
    <div class="bg-surface border border-subtle rounded-8 padding-8 text-center">1/3</div>
  </div>
  <div class="width-2-3">
    <div class="bg-surface border border-subtle rounded-8 padding-8 text-center">2/3</div>
  </div>
</div>
```

#### Min & max

| Class | Description |
|---|---|
| .min-width-0 / .max-width-100 | min-width: 0 / max-width: 100%. |
| .min-height-0 / .max-height-100 | min-height: 0 / max-height: 100%. |

### Spacing

Margin and padding on all sides, one axis or one side.

Has breakpoint versions (-lg, -md, -sm, -xs).

#### Margin & padding

{side} is x, y, top, right, bottom or left. Leave it out for all sides. {size}: 0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 60, 80, 100, 120, 140.

| Class | Description |
|---|---|
| .margin-{size} / .margin-{side}-{size} | Margin. |
| .padding-{size} / .padding-{side}-{size} | Padding. |

```html
<div class="margin-8 padding-y-16 bg-surface border border-subtle rounded-8 text-center">
  Element with uniform margin and vertical padding.
</div>
```

#### Auto margins

| Class | Description |
|---|---|
| .margin-auto / .margin-x-auto / .margin-y-auto | Center on both axes / horizontally / vertically. |
| .margin-top-auto / .margin-right-auto / .margin-bottom-auto / .margin-left-auto | Push to the opposite side. |

#### Negative margins

Only these exist, for what the pages need: avatars that tuck under each other, a card pulled up over a header, and a row that runs to the screen edges. The n means negative.

| Class | Value |
|---|---|
| .margin-right-n8 | -8px |
| .margin-top-n20 | -20px |
| .margin-x-n24 / .margin-x-n24-sm | -24px on both sides, the page's side padding (the -sm one below 768px only). With .padding-x-24, a row that scrolls sideways runs to the screen edges and still starts in line with the content: Seller Centre's settings tabs. |

```html
<div class="bg-surface border border-subtle rounded-8 padding-top-48 padding-x-16 padding-bottom-16 relative">
  <div class="bg-raised border border-subtle rounded-8 padding-8 margin-top-n20 text-center text-body-2">
    Pulled up 20px to overlap its parent's top edge
  </div>
</div>
```

### Border Radius

Rounded corners from 0 to 60px in steps of 4, or a full circle.

No breakpoint versions: the same at every width.

| Class | Description |
|---|---|
| .rounded-{size} | All corners. Sizes: 0, 4, 8, 12, 16, 20. Use .circle for a full circle. Only .rounded-0 has breakpoint versions (.rounded-0-xs), for things that go edge to edge on small screens. |
| .rounded-top-{size} / .rounded-bottom-{size} | Top / bottom edge. |
| .rounded-left-{size} / .rounded-right-{size} | Left / right edge. |
| .rounded-top-left-{size} / .rounded-top-right-{size} | One top corner. |
| .rounded-bottom-left-{size} / .rounded-bottom-right-{size} | One bottom corner. |
| .circle | border-radius: 50%. A circle when width equals height. |

```html
<div class="flex flex-gap-16 flex-items-center">
  <div class="size-56px bg-primary-1 rounded-8"></div>
  <div class="size-56px bg-primary-2 rounded-top-left-20 rounded-bottom-right-20"></div>
  <div class="size-56px bg-primary-3 circle"></div>
</div>
```

## Colors & Surfaces

### Color

Every colour class is a prefix and a name: .bg-, .text- or .border-, then the colour. The names come in three kinds, by what changes them.

No breakpoint versions: the same at every width.

#### Kinds

| Kind | Names | Changed by |
|---|---|---|
| Semantic: named by job | bg-base, bg-surface, bg-raised, bg-sunken, bg-inverse; text-primary, text-secondary, text-muted, text-inverse; border-subtle, border-strong | The theme. Use these for page structure, and dark mode follows by itself. |
| Brand | primary-1 to -3, primary-light-1 to -3, primary-dark-1 to -3 | The brand file. Buttons, links and highlights. |
| Palette: named by hue | light, gray, dark, white, black, transparent; red, orange, amber, green, cyan, blue, violet, magenta, each in steps | Nothing: fixed. For labels, status and decoration. |

Changing a theme or a brand is a file of variables, not classes: see Themes & Brands.

#### Steps & states

Brand and palette colours have the same nine steps, so knowing one you can guess the rest: -light-1 to -light-3 are pale tints for backgrounds, -1 to -3 are solid, -dark-1 to -dark-3 are deep, for text on a tint. In the dark themes, tints and deep shades switch to readable versions of the same hue; solid colours stay. Colours are named by colour, not by meaning: a pending order is amber because its label says so, not because of a class called pending.

| Names | Classes |
|---|---|
| semantic, brand, light, gray, dark, white, black, transparent | .bg- .text- .border-, and each with hover- or active- in front (.hover-bg-primary-1, .active-bg-primary-2): the element's own hover and press |
| red, orange, amber, green, cyan, blue, violet, magenta | .bg- .text- .border- only: labels and decoration don't change on hover |

```html
<button type="button" class="button bg-primary-1 hover-bg-primary-2 active-bg-primary-3 border-primary-1 text-white">Hover and press</button>
<a href="#" class="a a-color-reset block bg-raised border border-subtle hover-border-strong rounded-8 padding-12 margin-top-12 text-primary">A card that is a link: its edge darkens on hover</a>
```

#### Semantic

The colours to build pages with. Each has a light and a dark value; the contrast check holds every text and border pair to AA in every theme.

| Class | Use |
|---|---|
| .bg-base | Page canvas, one step off white |
| .bg-surface | A second surface: table heads, quiet buttons, bands |
| .bg-raised | Modal, dropdown, popover, card |
| .bg-sunken | Input well, inset panel |
| .bg-inverse | A dark area on a light page: a footer, a sidebar |

| Class | Use |
|---|---|
| .text-primary | Primary body text |
| .text-secondary | Supporting text, a step quieter, AA |
| .text-muted | Timestamps and hints: the quietest text that still clears AA (4.5:1) |
| .text-inverse | Text on bg-inverse |

| Class | Use |
|---|---|
| .border-subtle | Hairline default border |
| .border-strong | Clearly visible border |

#### Brand & palette

Every name below works after .bg-, .text- and .border-. Palette colours carry no contrast guarantee: check text on them yourself.

Brand: primary-1, primary-2, primary-3, primary-light-1, primary-light-2, primary-light-3, primary-dark-1, primary-dark-2, primary-dark-3, violet-1, violet-2, violet-3, violet-light-1, violet-light-2, violet-light-3, violet-dark-1, violet-dark-2, violet-dark-3, amber-1, amber-2, amber-3, amber-light-1, amber-light-2, amber-light-3, amber-dark-1, amber-dark-2, amber-dark-3

Neutral: light-1, light-2, light-3, gray-1, gray-2, gray-3, dark-1, dark-2, dark-3

Utility: red-1, red-2, red-3, red-light-1, red-light-2, red-light-3, red-dark-1, red-dark-2, red-dark-3, magenta-1, magenta-2, magenta-3, magenta-light-1, magenta-light-2, magenta-light-3, magenta-dark-1, magenta-dark-2, magenta-dark-3, blue-1, blue-2, blue-3, blue-light-1, blue-light-2, blue-light-3, blue-dark-1, blue-dark-2, blue-dark-3, cyan-1, cyan-2, cyan-3, cyan-light-1, cyan-light-2, cyan-light-3, cyan-dark-1, cyan-dark-2, cyan-dark-3, green-1, green-2, green-3, green-light-1, green-light-2, green-light-3, green-dark-1, green-dark-2, green-dark-3, orange-1, orange-2, orange-3, orange-light-1, orange-light-2, orange-light-3, orange-dark-1, orange-dark-2, orange-dark-3

Grayscale: white, white-5, white-20, white-40, white-60, white-80, black, black-5, black-20, black-40, black-60, black-80, transparent

### Border

Which sides get a border, and how thick. Its colour is a colour class (see Color).

No breakpoint versions: the same at every width.

Borders are 1px in the theme's default border colour until you add a colour or width class.

| Class | Description |
|---|---|
| .border / .border-none | All sides / none. |
| .border-x / .border-y | Left and right / top and bottom. |
| .border-top / .border-right / .border-bottom / .border-left | One side. |
| .border-width-2 / -3 / -4 | Width in px. |
| .border-current | Border in the element's own text colour, so it follows the theme with the text. |

```html
<div class="border border-width-2 border-primary-1 rounded-8 padding-12 margin-bottom-8">Content with border</div>
<div class="border-top border-subtle padding-12">Content with top border only</div>
```

### Shadow

Four shadow depths, with hover and active variants.

No breakpoint versions: the same at every width.

| Class | Description |
|---|---|
| .shadow-none | No shadow. |
| .shadow-1 … .shadow-4 | Light to strong. |
| .hover-shadow-1 … -4 | On hover. |
| .active-shadow-1 … -4 | While pressed. |

```html
<div class="flex flex-gap-16">
  <div class="bg-raised rounded-8 padding-16 shadow-1">shadow-1</div>
  <div class="bg-raised rounded-8 padding-16 shadow-2">shadow-2</div>
  <div class="bg-raised rounded-8 padding-16 shadow-3">shadow-3</div>
  <div class="bg-raised rounded-8 padding-16 shadow-4">shadow-4</div>
</div>
```

```html
<div class="bg-raised rounded-8 padding-16 shadow-1 hover-shadow-3">Hover to deepen the shadow</div>
```

### Background Image

A background image that fills its box without changing its size. Put a .bg-img child inside a .has-bg-img parent.

No breakpoint versions: the same at every width.

| Class | Description |
|---|---|
| .has-bg-img | The parent box. |
| .bg-img | The image layer. Set background-image on this. |
| .bg-img-repeat | Tile the image. |
| .bg-img-fixed | Fix the image to the viewport (parallax). |

```html
<div class="has-bg-img rounded-8" style="width: 140px; height: 100px;">
  <div class="bg-img" style="background-image: url('/images/pexels-people/pexels-olly-733872.jpg');"></div>
</div>
```

## Typography

### Typography Component

Plain HTML text elements are styled out of the box, no classes needed.

No breakpoint versions: the same at every width.

#### Headings

| Element | Size / line-height |
|---|---|
| h1 | 40px / 48px |
| h2 | 32px / 42px |
| h3 | 28px / 36px |
| h4 | 24px / 34px |
| h5 | 20px / 28px |
| h6 | 18px / 28px |

```html
<h1>Welcome!</h1>
<h2>Subheading</h2>
<h3>Section Title</h3>
```

#### Lists, code & links

| Element / Class | Description |
|---|---|
| ul, ol | 16px left padding. |
| pre | Wraps long lines. |
| code | Inline code. |
| .a | Link with no underline, a pointer cursor and the link colour. A text colour class on it wins: .a.text-primary-1. |
| .a-color-reset | Link takes its parent's color, for a link that wraps a whole card. |
| .ul-square / .ul-unstyled | Square bullets / no bullets and no indent (padding and margin utilities still apply). |

```html
<ul>
  <li>Item One</li>
  <li>Item Two</li>
</ul>
<a href="#" class="a">Learn More</a>
```

### Typography Utility

Font size, alignment, transform, decoration and weight.

Has breakpoint versions (-lg, -md, -sm, -xs).

#### Font size

| Class | Size / line-height |
|---|---|
| .h1 … .h6 | Heading sizes on any element. |
| .text-body-1 | 16px / 24px |
| .text-body-2 | 14px / 20px |
| .text-body-3 | 12px / 16px |
| .text-body-4 | 10px / 16px |

```html
<div class="h4">.h4 on a div</div>
<p class="text-body-1 margin-top-8">.text-body-1: standard body text.</p>
<p class="text-body-3 text-muted">.text-body-3: small, muted text.</p>
```

#### Alignment, transform & decoration

| Class | Description |
|---|---|
| .text-left / .text-center / .text-right / .text-justify | Alignment. |
| .text-uppercase / .text-lowercase / .text-capitalize | Case. |
| .text-line-none / .text-strike / .text-underline | No line / strikethrough / underline. |
| .text-underline-primary | Underline in the brand color. |
| .text-wrap / .text-nowrap / .text-ellipsis | Wrapping. |
| .line-clamp-2 | Two lines at most, ending in an ellipsis. |
| .font-style-italic / .font-style-normal | Italic / upright. |
| .font-family-serif | The serif face that ships with the kit. |

```html
<p class="text-center text-uppercase font-weight-600 margin-bottom-4">Centered, uppercase, semi-bold</p>
<p class="text-strike text-secondary">Struck-through text</p>
```

#### Font weight

| Class | Weight |
|---|---|
| .font-weight-100 … .font-weight-800 | 100 to 800, in steps of 100. |
| .font-weight-normal | 400. |
| .font-weight-bold | 700. |

```html
<p class="font-weight-300">font-weight-300</p>
<p class="font-weight-600">font-weight-600</p>
<p class="font-weight-800">font-weight-800</p>
```

#### Line height, letter spacing & cursor

| Class | Description |
|---|---|
| .line-height-1 | line-height: 1. |
| .letter-spacing-1 / .letter-spacing-2 | letter-spacing: 1px / 2px. 1px suits small uppercase labels such as tags. |
| .cursor-pointer / .cursor-default / .cursor-progress / .cursor-not-allowed | Cursor. |

```html
<p class="letter-spacing-2 text-uppercase font-weight-600 text-body-3">Letter-spaced label</p>
```

### Icons

Material Icons, written as their name. Google's font (Apache 2.0), in its own file, fonts/icons.css: not part of the kit, so you can swap it for any other icon set.

#### Markup

| Class | Goes on |
|---|---|
| .material-icons | An <i> or <span> whose text is the icon's name: <i class="material-icons">favorite</i>. |
| .icon-{size} | Its size in pixels: 12, 16, 20, 24, 32, 48. Without one it is 24. |

```html
<i class="material-icons icon-20 text-primary-1">favorite</i>
<i class="material-icons icon-24 text-secondary">shopping_cart</i>
<i class="material-icons icon-32 text-green-1">check_circle</i>
```

Colour comes from any text colour class. A decorative icon next to a label needs aria-hidden="true"; an icon on its own needs an aria-label on its button or link.

#### Troubleshooting

To stay small (about 9 KB), fonts/material-icons.woff2 holds only the icons the pages use; their names are listed in fonts/material-icons.glyphs.txt. Any other name shows as an empty gap. Two ways to get the rest:

| Way | How |
|---|---|
| Use the full font | Replace the Material Icons @font-face in fonts/icons.css with Google's full font (fonts.google.com/icons). Every icon works; the font is about 128 KB. |
| Use another icon set | Replace fonts/icons.css with your set's own (Lucide, Phosphor, Font Awesome …) and write its icons the way it asks. The .icon-{size} classes size any icon set, so they still work. |

## Forms, Buttons & Tables

### Form

Fields, checkboxes, radios and switches.

No breakpoint versions: the same at every width.

#### Field

One class for every text field, one look with every state drawn: hover (mouse only), focus (the brand edge and a soft ring), invalid, disabled and read-only. Text is 16px, so a phone never zooms in when a field is tapped.

| Class | Goes on |
|---|---|
| .field | An <input>, a <select> or a <textarea>. A select gets the kit's arrow, a textarea a few lines of height. |

```html
<label for="docs-email" class="block text-body-3 font-weight-600 text-primary margin-bottom-4">Email</label>
<input id="docs-email" class="field margin-bottom-12" type="email" autocomplete="email" placeholder="name@example.com">
<textarea class="field margin-bottom-12" aria-label="Message" placeholder="Enter longer text..."></textarea>
<select class="field" aria-label="Choose an option">
  <option>Option 1</option>
  <option>Option 2</option>
</select>
```

Give each field the type and autocomplete that fit it (type="email", inputmode="numeric", autocomplete="postal-code"): a phone then shows the right keyboard and offers to fill it in.

#### Sizes

A field is 40px tall with a mouse and 48px with a thumb, from the same class. Buttons use the same heights, so a field and its button sit flush. Inside a <header> they keep the mouse height on touch, so a header bar keeps its height.

| Class | With a mouse | With a thumb |
|---|---|---|
| .field-sm / .button-sm | 32px, 14px text | 40px, 16px text in fields |
| (none) | 40px | 48px |
| .field-lg / .button-lg | 48px | 56px |

```html
<div class="flex flex-gap-8 margin-bottom-12">
  <input class="field field-sm grow-1 min-width-0" aria-label="Email" placeholder="you@example.com">
  <button class="button button-sm bg-primary-1 border-primary-1 text-white">Join</button>
</div>
<div class="flex flex-gap-8 margin-bottom-12">
  <input class="field grow-1 min-width-0" aria-label="Email" placeholder="you@example.com">
  <button class="button bg-primary-1 border-primary-1 text-white">Join</button>
</div>
<div class="flex flex-gap-8">
  <input class="field field-lg grow-1 min-width-0" aria-label="Email" placeholder="you@example.com">
  <button class="button button-lg bg-primary-1 border-primary-1 text-white">Join</button>
</div>
```

#### Icons & buttons

No class of its own: a relative wrapper, the icon or button absolute and full height (top-0 bottom-0), and padding on the field that leaves room for it. Nothing knows about anything else, so the only rule is the numbers. An icon sits in a slot as wide as the field's padding on that side. A button or a dropdown inside takes its own width, and the field's padding is that width plus 12. Because they sit inside the field, the field's focus ring goes around all of them.

| Field | Icon | Slot width = padding on that side |
|---|---|---|
| .field-sm | .icon-16 | 32px / .padding-left-32 or .padding-right-32 |
| (none) | .icon-20 | 40px / .padding-left-40 or .padding-right-40 |
| .field-lg | .icon-24 | 48px / .padding-left-48 or .padding-right-48 |

```html
<form class="relative margin-bottom-12" role="search" action="#">
  <span class="absolute top-0 bottom-0 left-0 flex flex-items-center flex-justify-center text-muted" style="width: 40px; pointer-events: none" aria-hidden="true"><i class="material-icons icon-20">search</i></span>
  <input class="field padding-left-40 padding-right-40" name="q" aria-label="Search" placeholder="Search">
  <button type="reset" aria-label="Clear" class="absolute top-0 bottom-0 right-0 flex flex-items-center flex-justify-center bg-transparent border-none cursor-pointer text-muted hover-text-primary active-text-primary-1" style="width: 40px"><i class="material-icons icon-20" aria-hidden="true">close</i></button>
</form>
<form class="relative" role="search" action="#">
  <input class="field padding-right-120" type="search" name="q" aria-label="Search" placeholder="Search">
  <button type="submit" class="button absolute top-0 bottom-0 right-0 rounded-left-0 padding-y-0 bg-primary-1 border-primary-1 hover-bg-primary-2 active-bg-primary-3 text-white" style="width: 108px">Search</button>
</form>
```

An icon is decoration: aria-hidden, and pointer-events: none so a click on it lands in the field. A clear button of type="reset" works without a script but empties the whole form, so keep it to a form with one field. A field of type="search" already has the browser's own clear button in Chrome and Safari.

#### Invalid

aria-invalid="true" turns the edge red; put the message under the field in .error-message and link it with aria-describedby, so a screen reader reads it too. Without any script, a required or typed field also turns red by itself once the visitor has edited it (the browser's :user-invalid).

| Class / attribute | Goes on |
|---|---|
| aria-invalid="true" | The field. |
| .error-message | The message under it, with an id the field points to in aria-describedby. |

```html
<input class="field" type="email" value="alex@" aria-label="Email" aria-invalid="true" aria-describedby="docs-email-error">
<span id="docs-email-error" class="error-message">Enter an email like name@example.com</span>
```

#### Floating label

The label sits inside the field and moves up while it is focused or filled. The field needs placeholder=" " (a single space), and the <label> right after it.

| Class | Goes on |
|---|---|
| .float-label | A wrapper around the field and its label. |

```html
<div class="float-label">
  <input id="docs-float" class="field" placeholder=" " autocomplete="name">
  <label for="docs-float">Full name</label>
</div>
```

#### Checkbox & radio

The class goes on the <label>, which holds the input, an empty <i> that draws the box, and the text. The real input stays in the page, unseen, so a keyboard and a screen reader reach it.

| Class | Goes on |
|---|---|
| .check-stroke / .check-fill | The <label> of a checkbox: an outlined tick, or a filled box. |
| .radio-stroke / .radio-fill | The <label> of a radio. |

```html
<div class="flex flex-wrap flex-gap-24">
  <label class="check-stroke">
    <input type="checkbox" checked>
    <i></i>
    <span class="margin-left-12">Checkbox (stroke)</span>
  </label>
  <label class="check-fill">
    <input type="checkbox" checked>
    <i></i>
    <span class="margin-left-12">Checkbox (fill)</span>
  </label>
</div>
```

```html
<div class="flex flex-wrap flex-gap-24">
  <label class="radio-stroke">
    <input type="radio" name="docs-radio" checked>
    <i></i>
    <span class="margin-left-12">Radio (stroke)</span>
  </label>
  <label class="radio-fill">
    <input type="radio" name="docs-radio">
    <i></i>
    <span class="margin-left-12">Radio (fill)</span>
  </label>
</div>
```

#### Switch

| Class | Goes on |
|---|---|
| .switch | The <label> of a checkbox drawn as an on/off switch. Give the input an aria-label when there is no visible text. |

```html
<label class="switch">
  <input type="checkbox" checked aria-label="Email me about new orders">
  <i></i>
</label>
```

#### Disabled & read-only

Read-only looks like disabled, but its text can still be selected.

```html
<input class="field margin-bottom-12" value="Disabled" disabled aria-label="Disabled field">
<input class="field" value="Read-only" readonly aria-label="Read-only field">
```

#### Bare field

.field.field-bare drops the field's own border, background and padding, for a field inside a designed container: a segmented search, a chat box. The container draws the edge and shows focus with :focus-within.

| Class | Goes on |
|---|---|
| .field.field-bare | An <input>, <select> or <textarea> inside your own container. Keeps the kit's type and the muted placeholder. |

```html
<label class="block bg-raised border border-subtle rounded-20 padding-x-20 padding-y-8">
  <span class="block text-body-4 font-weight-700 text-primary">What</span>
  <input class="field field-bare text-body-2" placeholder="Events, artists, venues">
</label>
```

The field shows no focus ring of its own, so give its container one: for example .my-search:focus-within { border-color: var(--color-primary-1); }. The StagePass search pill is built this way.

### Button

A height, a radius and a 1px border. Black text and border on a transparent background until you add color classes. Sizes (.button-sm, .button-lg) match the fields: see Form, Sizes.

No breakpoint versions: the same at every width.

```html
<a href="#" class="button margin-right-8">Base Button</a>
<button class="button">Base Button</button>
```

```html
<a href="#" class="button border-primary-1 hover-bg-primary-1 text-primary-1 hover-text-white">Call to action</a>
```

### Table

Full-width tables, with compact, bordered, striped and hover options, and rows that become cards on a phone.

No breakpoint versions: the same at every width.

#### Styles

| Class | Description |
|---|---|
| .table | Full width, collapsed borders. |
| .table-compact | Less cell padding. |
| .table-border-none | No row borders. |
| .table-bordered | Outer border and cell dividers. |
| .table-striped | Alternating row backgrounds. |
| .table-hovered | Row highlight on hover. |
| .th-shrink | On a <th>: the column fits its content. Columns without it share the rest, so one column without it fills it. |

```html
<table class="table table-striped table-hovered">
  <thead>
    <tr>
      <th class="th-shrink">#</th>
      <th>Name</th>
      <th>Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Row one</td>
      <td>Striped and hoverable</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Row two</td>
      <td>Striped and hoverable</td>
    </tr>
  </tbody>
</table>
```

#### Phone layout

A wide table has three ways to fit a phone, all with one markup and no script: stack (.table-stack, which takes effect at the sm breakpoint and below), fold or scroll. Seller Centre shows each: Products folds, Orders stacks, Team scrolls.

| Class | Description |
|---|---|
| .table-stack-sm | At 768px and below each row becomes a card. A cell with data-label="Total" becomes a labelled line; a cell without one stays on the card's top line (put .equal on the one that takes the room). The header row is hidden from sight, so give the page a sort menu too. |
| .expand-row | A <details> in a row of a stacked table: the row folds to its top line until it is opened. Put its cell last, with .hidden-sm-greater. |
| Scroll | No class: the table in a box with .relative.overflow-x-auto, tabindex="0" and role="region", a min-width on the table, and .sticky.left-0 with a fill on the first cell of each row to pin it. |

```html
<table class="table table-stack-sm" role="table" aria-label="Orders">
  <thead role="rowgroup">
    <tr role="row">
      <th role="columnheader">Order</th>
      <th role="columnheader">Customer</th>
      <th role="columnheader">Status</th>
      <th role="columnheader">Total</th>
      <th role="columnheader" class="hidden-sm-greater"><span class="visually-hidden">Details</span></th>
    </tr>
  </thead>
  <tbody role="rowgroup">
    <tr role="row">
      <td role="cell" class="equal">HT-104820</td>
      <td role="cell" data-label="Customer">Elena Marchetti</td>
      <td role="cell" data-label="Status">Processing</td>
      <td role="cell" data-label="Total">$56.50</td>
      <td role="cell" class="hidden-sm-greater">
        <details class="expand-row">
          <summary><span class="visually-hidden">Details of HT-104820</span>
            <i class="material-icons icon-20 rotate-when-open" aria-hidden="true">expand_more</i>
          </summary>
        </details>
      </td>
    </tr>
  </tbody>
</table>
```

Changing a table's display can drop its meaning for screen readers in Safari, so a stacked table carries its roles: table, rowgroup, row, columnheader and cell.

## Interactive & State

### Show on Parent

Show a child only while its parent element is hovered, or while focus is inside it. A menu of links under a header item, and a search that opens full screen on a phone. A menu opened by a click is a Menu (Behaviours).

No breakpoint versions: the same at every width.

#### Show & hide

The parent is the element directly around the child: put a menu straight inside the element that opens it. No class on the parent.

| Class | Shown while |
|---|---|
| .show-on-parent-hover | The parent is hovered, or focus is inside it. A header's menu of links: a mouse, a keyboard and a tap all open it. |
| .show-on-parent-focus | Focus is inside the parent. A search panel: it opens when you click into the field, not when the mouse passes. |

```html
<div class="relative inline-block">
  <button type="button" class="button button-sm bg-raised border-subtle text-primary font-weight-600 padding-x-16">Sort: Latest</button>
  <div class="show-on-parent-hover absolute left-0 top-100 padding-top-4 z-4">
    <div class="bg-raised border border-subtle rounded-8 shadow-3 padding-8" style="width: 180px">
      <a href="#" class="a a-color-reset block padding-x-8 padding-y-4 rounded-4 text-body-2 text-primary hover-bg-surface">Latest</a>
      <a href="#" class="a a-color-reset block padding-x-8 padding-y-4 rounded-4 text-body-2 text-primary hover-bg-surface">Most read</a>
    </div>
  </div>
</div>
```

Open a dropdown with a real <button>: a keyboard reaches it, and tabbing into the menu keeps it open. Put a padding-top on the menu, not a margin, so the mouse can cross the gap without closing it.

#### Full screen

Full screen on focus (.fullscreen-on-focus, with the -sm suffix every responsive class uses: up to 768px wide). While focus is inside it, it takes the whole screen and the page behind stops scrolling; a .show-on-parent-focus inside it sits in the page instead of floating. On a wider screen it does nothing. The Search pattern is built this way.

| Class | Goes on |
|---|---|
| .fullscreen-on-focus-sm | The element that opens, with tabindex="-1" so a click inside keeps it open. --fullscreen-padding sets its padding while open. |
| .close-fullscreen | A <button> right before it, shown only while it is full screen. Pressing it moves focus out, which closes it. |

### Opacity

Element transparency.

No breakpoint versions: the same at every width.

| Class | Opacity |
|---|---|
| .opacity-0 | 0 |
| .opacity-005 | 0.05 |
| .opacity-02 / -04 / -06 / -08 | 0.2 / 0.4 / 0.6 / 0.8 |
| .opacity-1 | 1 |

```html
<div class="flex flex-gap-12 text-body-3 text-secondary text-center">
  <div><div class="opacity-02 bg-primary-1 rounded-8 size-48px"></div>02</div>
  <div><div class="opacity-06 bg-primary-1 rounded-8 size-48px"></div>06</div>
  <div><div class="opacity-1 bg-primary-1 rounded-8 size-48px"></div>1</div>
</div>
```

### Animate

Fade, slide and zoom in, when an element appears: on load, or when a menu or panel is shown. Pair .animate with one type class. Default duration is 1s. Entrances only: the dialog, drawer and toast open and close with motion of their own.

No breakpoint versions: the same at every width.

#### Types

| Class | Description |
|---|---|
| .animate-fade-in / .animate-fade-in-up / .animate-fade-in-down / .animate-fade-in-left / .animate-fade-in-right | Fade in, optionally moving. |
| .animate-slide-in-up / .animate-slide-in-down / .animate-slide-in-left / .animate-slide-in-right | Slide in from that side. |
| .animate-zoom-in | Scale up and fade in. |

```html
<div class="animate animate-fade-in-up bg-surface border border-subtle rounded-8 padding-16 text-center">
  Animates in once, on load
</div>
```

#### Timing

| Class | Description |
|---|---|
| .animate-repeat-1 / -2 / -3 | Times to play. |
| .animate-delay-1s / -2s / -3s | Delay before starting. |
| .animate-speed-02s … .animate-speed-3s | Duration, 0.2s to 3s. |

### Skeleton

A placeholder for content that is still loading: bars at the content's own size, pulsing gently together.

No breakpoint versions: the same at every width.

Put .skeleton on one element and it becomes a bar; put it on a container and every innermost element inside it does, each at its own size, so the loading state is the real markup. Remove the class when the content arrives. Nothing moves when it does. While it is on, also set aria-busy="true" (a screen reader waits instead of reading the placeholder text) and inert (the keyboard skips it); clicks already go nowhere.

| Class | Goes on |
|---|---|
| .skeleton | On a leaf (an element with only text inside): that element is the bar. On anything else: every leaf inside it becomes a bar, at its own size. Text stays in place, invisible. |
| .skeleton.skeleton-whole | The whole element as one block instead of a bar per leaf: a card still loading, an avatar with initials inside. |
| .no-skeleton | An element inside a loading area that stays readable, with no bar: a section label. |

On a leaf: only that element:

```html
<div class="bg-raised border border-subtle rounded-8 padding-16">
  <div class="flex flex-items-center flex-gap-12">
    <div class="circle size-40px shrink-0 flex flex-items-center flex-justify-center bg-primary-light-2 text-primary-dark-2 font-weight-700">AM</div>
    <div>
      <div class="text-body-2 font-weight-600 text-primary"><span class="skeleton" aria-busy="true">Alex Morgan</span></div>
      <div class="text-body-3 text-muted margin-top-4"><span>3 items, 2 hours ago</span></div>
    </div>
  </div>
</div>
```

On an area: every leaf inside:

```html
<div class="skeleton bg-raised border border-subtle rounded-8 padding-16" aria-busy="true" inert>
  <div class="flex flex-items-center flex-gap-12">
    <div class="circle size-40px shrink-0 flex flex-items-center flex-justify-center bg-primary-light-2 text-primary-dark-2 font-weight-700">AM</div>
    <div>
      <div class="text-body-2 font-weight-600 text-primary"><span>Alex Morgan</span></div>
      <div class="text-body-3 text-muted margin-top-4"><span>3 items, 2 hours ago</span></div>
    </div>
  </div>
</div>
```

Whole: one block:

```html
<div class="skeleton skeleton-whole bg-raised border border-subtle rounded-8 padding-16" aria-busy="true" inert>
  <div class="flex flex-items-center flex-gap-12">
    <div class="circle size-40px shrink-0 flex flex-items-center flex-justify-center bg-primary-light-2 text-primary-dark-2 font-weight-700">AM</div>
    <div>
      <div class="text-body-2 font-weight-600 text-primary"><span>Alex Morgan</span></div>
      <div class="text-body-3 text-muted margin-top-4"><span>3 items, 2 hours ago</span></div>
    </div>
  </div>
</div>
```

Put it on <main> and a whole page shows its loading state (try it from the demo site's menu). A line of text is a bar as wide as its element; wrap the text in a <span> for a bar as long as the text, as here. Buttons and fields are one bar each, pictures become bars at their own size. An element that is empty until its data arrives needs a &nbsp; inside, so it has a height to paint.

## Interactions

### Read This First

Every interaction works with JavaScript turned off, except the two the table marks.

Modals, menus, tabs and the rest are built from HTML the browser already knows how to open and close. The table says what script, if any, you write for each.

| Interaction | Script you write |
|---|---|
| Modal | None. It is a <dialog>, opened and closed by buttons with commandfor. |
| Drawer and menu | None. They are a popover and a <details>. |
| Accordion | None. It is a <details>. |
| Carousel | None. It scrolls and snaps with .scroll-snap-x and .snap-start. |
| Tabs | None. They are radio buttons. |
| Toggle button | None. It is a checkbox. |
| Toast | One line, to show it after something happens: showPopover(). Its close button needs none. |
| Copy button | One line on click: the clipboard API. |

### Modal

A dialog over the page, built on <dialog>. A button opens it; Esc, a click outside it or a close button shuts it, and the page behind stops scrolling. No script.

| Markup / class | Goes on |
|---|---|
| <dialog id="filters" closedby="any"> | The dialog. closedby="any" lets a click outside close it. |
| .dialog | The dialog: clears the browser's own border, padding and colours, so your classes decide the look. |
| commandfor="filters" command="show-modal" | The button that opens it. |
| commandfor="filters" command="close" | A button inside it that closes it. |

```html
<button type="button" commandfor="docs-dialog" command="show-modal" class="button bg-primary-1 border-primary-1 text-white padding-x-16">Open modal</button>
<dialog id="docs-dialog" closedby="any" class="dialog bg-raised rounded-8 padding-24 width-50 width-90-sm">
  <div class="h5 font-weight-600 text-primary margin-bottom-8">A modal</div>
  <div class="text-body-2 text-secondary margin-bottom-20">Esc, a click outside, or the button closes it.</div>
  <button type="button" commandfor="docs-dialog" command="close" class="button bg-surface border-subtle text-primary padding-x-16">Close</button>
</dialog>
```

On a phone a full-height sheet reads better: add .rounded-0-xs, .height-100-xs and .width-100-xs to the dialog.

### Drawer & Menu

A side drawer that slides over the page, a menu that opens from a button, and a phone menu that drops down from the header. All open and close with no script.

#### Drawer

| Markup | Goes on |
|---|---|
| popover | The drawer, with an id. The browser keeps it hidden until opened, and Esc or a click outside closes it. |
| popovertarget="id" | The button that opens and closes it. |
| .drawer | On the popover, for a sidebar: docked beside the content above 992px, a panel that slides in from the left at 992px and below, with a dim layer behind. 260px wide; set --drawer-width for another width. |
| .drawer-end | With .drawer: slides in from the right instead. |
| .hidden-md-greater | On the open button, so it only shows while the sidebar is a drawer. |

```html
<div class="flex">
  <aside id="side-nav" popover class="drawer bg-raised border-right border-subtle">
    <nav class="padding-16">Sidebar links</nav>
  </aside>
  <main class="grow-1 min-width-0">
    <button type="button" popovertarget="side-nav" class="hidden-md-greater">Menu</button>
    Page content
  </main>
</div>
```

Without .drawer, position the popover yourself (for example fixed to the left edge) and style its ::backdrop for the dim layer behind.

#### Menu

A menu that opens from a button: a sort list, a filter, an account menu. It opens under its button and turns to the other side by itself when there is no room. Esc, a click outside or the button again closes it, and it sits above the page, so a scrolling box or a sticky header can't cut it off. On a phone or a narrow tablet (up to 768px) it rises as a sheet from the bottom of the screen.

| Markup / class | Goes on |
|---|---|
| popover | The menu, with an id. |
| popovertarget="id" | The button that opens and closes it. |
| .menu | On the popover: under its button, lined up with the button's left edge, at least 220px wide (or as wide as the button). |
| .menu-end | With .menu: lined up with the button's right edge, for a button at the right of a bar. |

```html
<button type="button" popovertarget="sort-menu" class="button button-sm bg-raised border-subtle text-primary font-weight-600 padding-x-16">Sort: Featured</button>
<div id="sort-menu" popover class="menu padding-8 bg-raised border border-subtle rounded-8 shadow-3">
  <a href="#" class="a a-color-reset block padding-x-12 padding-y-8 rounded-4 text-body-2 text-primary hover-bg-surface">Featured</a>
  <a href="#" class="a a-color-reset block padding-x-12 padding-y-8 rounded-4 text-body-2 text-secondary hover-bg-surface">Newest</a>
</div>
```

The menu can sit anywhere in the markup, even inside a form: its fields still send with the form.

#### Header menu

| Markup / class | Goes on |
|---|---|
| <details> | Wraps the menu button and the panel. Clicking the button again closes it. |
| <summary> | The menu button. The kit removes the browser's marker from every summary and gives it a pointer. |
| .show-when-closed / .show-when-open | Two icons in the summary, such as a list and an X. Only the one for the current state shows. |

```html
<details class="relative">
  <summary class="flex flex-items-center flex-justify-center size-40px border border-subtle rounded-8">
    <i class="icon-24 material-icons text-secondary show-when-closed">format_list_bulleted</i>
    <i class="icon-24 material-icons text-secondary show-when-open">close</i>
  </summary>
  <div class="absolute left-0 top-100 margin-top-8 z-3 bg-raised border border-subtle rounded-8 shadow-2 padding-12 text-body-2 text-secondary">The menu panel.</div>
</details>
```

### Accordion

Rows that open to show more: FAQs, sidebar groups. Built on <details>, so it opens and closes with no script.

| Markup / class | Goes on |
|---|---|
| <details> | Each row. Add the open attribute to start it open. |
| name="faq" | The same name (any name) on several <details> keeps only one of them open at a time. |
| <summary> | The row you click. The kit removes the browser's marker from every summary and gives it a pointer. |
| .rotate-when-open | An icon inside the summary. It turns over while the row is open. |

```html
<details name="docs-faq" open class="border border-subtle rounded-8 margin-bottom-8">
  <summary class="flex flex-items-center flex-justify-between padding-12">
    <span class="text-body-2 font-weight-600 text-primary">How long does delivery take?</span>
    <i class="icon-20 material-icons text-secondary rotate-when-open">expand_more</i>
  </summary>
  <div class="padding-x-12 padding-bottom-12 text-body-2 text-secondary">Two to four working days.</div>
</details>
<details name="docs-faq" class="border border-subtle rounded-8">
  <summary class="flex flex-items-center flex-justify-between padding-12">
    <span class="text-body-2 font-weight-600 text-primary">Can I return an item?</span>
    <i class="icon-20 material-icons text-secondary rotate-when-open">expand_more</i>
  </summary>
  <div class="padding-x-12 padding-bottom-12 text-body-2 text-secondary">Yes, within 30 days. Opening this closes the other.</div>
</details>
```

### Carousel

A row that scrolls sideways and settles on an item after every swipe. Pure CSS.

| Class | Goes on |
|---|---|
| .scroll-snap-x | The row, together with .flex .flex-nowrap .overflow-x-auto. |
| .snap-start | Each item, with .shrink-0 and a width. |
| .overflow-scroll-hidden | Optional: hides the scrollbar. |

```html
<div class="flex flex-nowrap flex-gap-12 overflow-x-auto overflow-scroll-hidden scroll-snap-x" tabindex="0" role="region" aria-label="Carousel">
  <div class="shrink-0 snap-start width-50 bg-surface border border-subtle rounded-8 padding-24">One</div>
  <div class="shrink-0 snap-start width-50 bg-surface border border-subtle rounded-8 padding-24">Two</div>
  <div class="shrink-0 snap-start width-50 bg-surface border border-subtle rounded-8 padding-24">Three</div>
</div>
```

### Tabs

A row of tabs that switches the panel below. Built on radio buttons, so it works with no script and the arrow keys move between tabs.

| Markup / class | Goes on |
|---|---|
| .tabs | The wrapper. Its first child holds the row of tabs (directly, or inside a sticky bar or container), then one panel per tab, in the same order. |
| .tab | Each tab: a <label> holding <input type="radio">. All radios in one set share a name; add checked to the one that starts open. |
| .panel | Each panel. Only the one matching the chosen tab shows. |

```html
<div class="tabs">
  <div class="flex flex-gap-24 border-bottom border-subtle">
    <label class="tab padding-y-8 text-body-2 font-weight-600"><input type="radio" name="docs-tabs" checked>Overview</label>
    <label class="tab padding-y-8 text-body-2 font-weight-600"><input type="radio" name="docs-tabs">Reviews</label>
    <label class="tab padding-y-8 text-body-2 font-weight-600"><input type="radio" name="docs-tabs">Shipping</label>
  </div>
  <div class="panel padding-y-16 text-body-2 text-secondary">Hand-thrown stoneware, glazed in small batches.</div>
  <div class="panel padding-y-16 text-body-2 text-secondary">4.8 out of 5 from 312 reviews.</div>
  <div class="panel padding-y-16 text-body-2 text-secondary">Ships in two working days. Free over $50.</div>
</div>
```

Up to twelve tabs per set. Give each set on a page its own radio name. On a phone, a row that scrolls can run to the screen edges: .margin-x-n24-sm with .padding-x-24-sm on it.

### Toggle

Show one thing or another by a checkbox: a button that flips between Save and Saved, or a whole area that changes while a box is checked. No script.

#### Markup

| Markup / class | Goes on |
|---|---|
| .toggle | The <label>. It holds an <input type="checkbox"> (add checked to start on) and the two states. On a label, the checkbox is unseen and the label is the button. |
| .show-when-off | What shows while it is off. |
| .show-when-on | What shows while it is on. |

```html
<label class="toggle">
  <input type="checkbox" aria-label="Save">
  <span class="show-when-off button flex flex-items-center bg-raised border-subtle text-primary font-weight-600 padding-x-16"><i class="icon-20 material-icons margin-right-8">favorite_border</i>Save</span>
  <span class="show-when-on button flex flex-items-center bg-red-light-1 border-red-light-3 text-red-1 font-weight-600 padding-x-16"><i class="icon-20 material-icons margin-right-8">favorite</i>Saved</span>
</label>
```

The state is a real form value: inside a <form>, the checkbox submits with it. For an on/off switch in a settings list, use .switch instead (see Forms).

#### Area toggle

On any other element, .toggle switches everything inside it: while any checkbox inside is checked, its .show-when-on parts show; while none is, its .show-when-off parts. Monthly and yearly prices, a bar that appears while rows are picked. Toggles don't nest.

```html
<div class="toggle flex flex-items-center flex-gap-16">
  <label class="switch"><input type="checkbox" aria-label="Yearly billing"><i></i></label>
  <span class="h4 font-weight-700 text-primary"><span class="show-when-off">$12</span><span class="show-when-on">$10</span> / month</span>
</div>
```

### Choice

Pick one from a few: a colour, a size, a filter. Radios underneath, so picking one unpicks the others with no script.

| Markup / class | Goes on |
|---|---|
| .choice | Each <label>. It holds an <input type="radio">; give every option in a set the same name, and checked to the one picked first. |

```html
<div class="flex flex-wrap flex-gap-8">
  <label class="choice"><input type="radio" name="docs-size">S</label>
  <label class="choice"><input type="radio" name="docs-size" checked>M</label>
  <label class="choice"><input type="radio" name="docs-size">L</label>
  <label class="choice"><input type="radio" name="docs-size" disabled>XL</label>
</div>
```

A picked option is outlined in the brand colour and bold, so it reads without colour too. Restyle the resting look with utilities on the label (bg-*, border-*, rounded-*, padding-*); set --choice-picked to change the picked edge. Inside a <form>, the picked value submits. To show or hide content by the pick, use :has() on a parent, as the product page does to filter its reviews.

### Toast

A short message in the corner of the screen that stays until closed. Built on a manual popover, so opening and closing by button need no script.

#### Markup

| Markup / class | Goes on |
|---|---|
| <div id="saved" popover="manual"> | The toast. Manual means a click elsewhere does not close it. |
| .toast | The toast: bottom right by default (along the bottom edge on phones), and it fades in. Your classes decide the look, and position utilities move it. |
| popovertarget="saved" | A button that shows it. |
| popovertarget="saved" popovertargetaction="hide" | The close button inside it. |

```html
<button type="button" popovertarget="docs-toast" class="button bg-primary-1 border-primary-1 text-white padding-x-16">Save changes</button>
<div id="docs-toast" popover="manual" class="toast flex flex-items-center flex-gap-12 bg-inverse text-inverse rounded-8 shadow-3 padding-x-16 padding-y-12">
  <i class="icon-20 material-icons">check</i>
  <span class="text-body-2 grow-1">Changes saved</span>
  <button type="button" popovertarget="docs-toast" popovertargetaction="hide" class="button bg-transparent border-transparent text-inverse padding-4" aria-label="Close"><i class="icon-20 material-icons">close</i></button>
</div>
```

In an app the toast usually follows an event (a save finished), so your code calls showPopover() on it, and hidePopover() after a few seconds if it should leave on its own.

#### Placement

Move it with position utilities; the 24px gap from the edges stays.

| Where | Add to .toast |
|---|---|
| Bottom right | (nothing) |
| Top right | .top-0 .bottom-auto |
| Top left | .top-0 .bottom-auto .left-0 .right-auto |
| Top centre | .top-0 .bottom-auto .left-0 .margin-x-auto |
| Bottom centre | .left-0 .margin-x-auto |

```html
<button type="button" popovertarget="docs-toast-top" class="button bg-raised border-subtle text-primary padding-x-16">Show at the top</button>
<div id="docs-toast-top" popover="manual" class="toast top-0 bottom-auto left-0 margin-x-auto flex flex-items-center flex-gap-12 bg-inverse text-inverse rounded-8 shadow-3 padding-x-16 padding-y-12">
  <span class="text-body-2 grow-1">You're offline. Changes will sync later.</span>
  <button type="button" popovertarget="docs-toast-top" popovertargetaction="hide" class="button bg-transparent border-transparent text-inverse padding-4" aria-label="Close"><i class="icon-20 material-icons">close</i></button>
</div>
```

### Tooltip

A small label under an icon-only button or link, saying what it does, while a pointer rests on it and on keyboard focus; a touch screen, with no hover, shows it on focus only. The words are a child you style with utilities, so each place can have its own look. No script.

| Class / markup | Goes on |
|---|---|
| .tooltip | An icon-only button or link with an aria-label: it shows its .tip under it, centred. |
| .tip | A span inside it with the words, aria-hidden (the label already names the button). Its look is utilities: background, text, padding, corners, a border or shadow. |
| .tooltip-up | With .tooltip: the tip above instead (a table's row actions, where the table's scroll box would cut it off below the last row). |
| .tooltip-end | With .tooltip: the tip lined up with its right edge (an icon at the right of a header, so it stays on screen). |

```html
<div class="flex flex-gap-8">
  <button type="button" class="tooltip flex flex-items-center flex-justify-center size-40px rounded-8 bg-transparent border-transparent text-secondary cursor-pointer hover-bg-surface" aria-label="Edit">
    <i class="icon-20 material-icons" aria-hidden="true">edit</i>
    <span class="tip bg-inverse text-inverse text-body-3 font-weight-500 padding-x-8 padding-y-4 rounded-4" aria-hidden="true">Edit</span>
  </button>
  <button type="button" class="tooltip flex flex-items-center flex-justify-center size-40px rounded-8 bg-transparent border-transparent text-secondary cursor-pointer hover-bg-surface" aria-label="Archive">
    <i class="icon-20 material-icons" aria-hidden="true">archive</i>
    <span class="tip bg-raised text-primary border border-subtle shadow-2 text-body-3 font-weight-500 padding-x-8 padding-y-4 rounded-4" aria-hidden="true">Archive</span>
  </button>
</div>
```

npm run check:download fails a page with an icon-only button or link that has no tooltip.

### Copy Button

A button that copies another element's text, then says so for a moment. The markup is two labels; the copying is the browser's clipboard API.

| Attribute | Goes on |
|---|---|
| data-copy="#id" | The button. The id is the element whose text is copied. |
| data-copy-idle / data-copy-done | Two children of the button. The first shows normally, the second (start it .hidden) for a moment after a copy. |

```html
<pre id="docs-copy-demo" class="bg-sunken rounded-8 padding-12 margin-bottom-8 text-body-3">npm run build:static</pre>
<button type="button" data-copy="#docs-copy-demo" class="bg-surface border border-subtle rounded-8 padding-x-12 padding-y-4 text-body-3 text-secondary cursor-pointer">
  <span data-copy-idle>Copy</span>
  <span data-copy-done class="hidden">Copied</span>
</button>
```

Uses the browser's clipboard, which needs https or localhost. Elsewhere it falls back to selecting the text.

## Patterns: Cards

### Cards

A card is a few classes on a div: a surface, a border or shadow, and a radius. Change the classes to change the look.

| Look | Classes |
|---|---|
| Sharp (default) | .bg-raised .border .rounded-4 |
| Rounded | .bg-raised .border .rounded-16 |
| Soft | .bg-raised .rounded-12 .shadow-2 |
| Flat | .bg-surface .rounded-8 |

```html
<div class="flex flex-wrap flex-gap-16">
  <div class="bg-raised border rounded-4 padding-16">Sharp</div>
  <div class="bg-raised border rounded-16 padding-16">Rounded</div>
  <div class="bg-raised rounded-12 shadow-2 padding-16">Soft</div>
  <div class="bg-surface rounded-8 padding-16">Flat</div>
</div>
```

The card switcher on the Showcase previews these on its own panel only. To restyle every card, find the classes in your pages and replace them.

### Card Grid

A wrapping row of cards from .flex, .flex-wrap, a gutter and a width class. No custom CSS.

Has breakpoint versions (-lg, -md, -sm, -xs).

```html
<div class="flex flex-wrap flex-gutter-12 flex-gutter-8-sm">
  <div class="width-25 width-50-sm">
    <div class="border border-subtle rounded-8 shadow-1 padding-x-16 padding-y-8">Card Content 1</div>
  </div>
  <div class="width-25 width-50-sm">
    <div class="border border-subtle rounded-8 shadow-1 padding-x-16 padding-y-8">Card Content 2</div>
  </div>
  <div class="width-25 width-50-sm">
    <div class="border border-subtle rounded-8 shadow-1 padding-x-16 padding-y-8">Card Content 3</div>
  </div>
  <div class="width-25 width-50-sm">
    <div class="border border-subtle rounded-8 shadow-1 padding-x-16 padding-y-8">Card Content 4</div>
  </div>
</div>
```

### Media Card

A photo with text beside it or under it, and the whole thing a link.

The row puts the photo and the text side by side. The stack puts the photo above the text. Both are a link, so a.a-color-reset keeps the text colours.

| Shape | Classes on the wrapper |
|---|---|
| Row | .a .a-color-reset .cursor-pointer .flex .relative |
| Stack | .a .a-color-reset .block .cursor-pointer .relative |
| The photo box | A .has-bg-img box with a .bg-img child that carries the image. See Background Image. |

Row:

```html
<a href="#" class="a a-color-reset cursor-pointer flex relative bg-raised border rounded-8 padding-16">
  <div class="shrink-0">
    <div class="has-bg-img rounded-4 size-80px">
      <div class="bg-img" style="background-image: url('/images/pexels-people/pexels-anastasiya-gepp-654466-2036646.png');"></div>
    </div>
  </div>
  <div class="grow-1 padding-left-16">
    <div class="h6 font-weight-600">Dr. Andrea Magy</div>
    <div class="text-body-2 text-secondary margin-top-4">Monday, Dec 18</div>
  </div>
</a>
```

Stack:

```html
<a href="#" class="a a-color-reset block cursor-pointer relative bg-raised border rounded-8 width-50">
  <div class="has-bg-img rounded-top-left-8 rounded-top-right-8" style="height: 100px;">
    <div class="bg-img" style="background-image: url('/images/pexels-people/pexels-anastasiya-gepp-654466-2036646.png');"></div>
  </div>
  <div class="padding-12">
    <div class="font-weight-600">Dr. Andrea Magy</div>
    <div class="text-body-2 text-secondary">Monday, Dec 18</div>
  </div>
</a>
```

### Panel

A titled block: a heading row with a trailing action, then content.

| Part | Classes |
|---|---|
| Panel | Use .flex .flex-column, plus your own .bg-raised .border .rounded-8 .padding-20 |
| Heading row | .flex .flex-items-center .shrink-0 .margin-bottom-16 |
| Title | .font-weight-600 .text-primary .text-body-1 .text-body-2-sm .margin-right-4 |
| Action | .flex .flex-items-center .margin-left-auto |
| Content | .flex .flex-column .flex-justify-center .grow-1 |

```html
<div class="flex flex-column bg-raised border rounded-8 padding-20">
  <div class="flex flex-items-center shrink-0 margin-bottom-16">
    <div class="font-weight-600 text-primary text-body-1 text-body-2-sm margin-right-4">Your to-dos</div>
    <div class="flex flex-items-center margin-left-auto">
      <i class="icon-16 material-icons">chevron_right</i>
    </div>
  </div>
  <div class="flex flex-column flex-justify-center grow-1">
    <div class="text-body-2 text-secondary">4 assignments, 1 saved</div>
  </div>
</div>
```

## Patterns: Small Parts

### Pill

A small label. A tint, a text colour and a fixed set of classes that every pill carries.

#### Shapes

Two shapes: a compact uppercase tag and a sentence-case status. Pick the shape, then add the colours. Nothing is custom: it is utilities, and the fixed height keeps an icon-only pill level with labelled ones.

| Shape | Classes |
|---|---|
| Tag | .inline-flex .flex-items-center .flex-justify-center .text-nowrap .height-24px .padding-x-8 .rounded-4 .text-body-4 .font-weight-600 .text-uppercase .letter-spacing-1 |
| Status | .inline-flex .flex-items-center .flex-justify-center .text-nowrap .height-24px .padding-x-8 .rounded-8 .text-body-2 .font-weight-500 |
| Tag holding only an icon | Swap .padding-x-8 for .width-24px. It becomes a square. |

```html
<span class="inline-flex flex-items-center flex-justify-center text-nowrap height-24px padding-x-8 rounded-4 text-body-4 font-weight-600 text-uppercase letter-spacing-1 bg-green-light-2 text-green-dark-2">New</span>
<span class="inline-flex flex-items-center flex-justify-center text-nowrap height-24px padding-x-8 rounded-4 text-body-4 font-weight-600 text-uppercase letter-spacing-1 bg-red-1 text-white"><i class="material-icons icon-12 margin-right-4" aria-hidden="true">local_offer</i><span>20% off</span></span>
<span class="inline-flex flex-items-center flex-justify-center text-nowrap height-24px padding-x-8 rounded-8 text-body-2 font-weight-500 bg-blue-light-1 text-blue-dark-1 border border-blue-light-3"><i class="material-icons icon-12 margin-right-4" aria-hidden="true">local_shipping</i><span>Free shipping</span></span>
```

#### Colors

| For | Classes |
|---|---|
| A soft state, any hue (green, blue, orange, violet...) | .bg-green-light-1 .text-green-dark-2 |
| A loud state | .bg-red-1 .text-white |
| A brand state | .bg-primary-dark-2 .text-white |
| Neutral, follows the theme | .bg-sunken .text-secondary .border .border-subtle |
| Outline, no fill | .bg-transparent .text-primary .border .border-subtle |
| Inverse: dark on light, light on dark | .bg-inverse .text-inverse |

Pale tints and dark text shades switch to readable versions in dark mode, so one pair works in both themes. Solid fills such as .bg-red-1 stay the same.

### Row Actions

The icon buttons at the end of a list or table row (edit, archive, delete), each with a tooltip. No row-actions class: buttons, .tooltip and utilities.

| Part | Classes |
|---|---|
| Each action | A link (it opens a page: Edit) or a button (it acts here: Archive), 32px square, with an aria-label that names the row ("Edit Ceramic Mug Duo"), so a screen reader knows which one. |
| Its tip | .tooltip .tooltip-up on the action, and a .tip with the short word ("Edit"): the row already shows the name. Above the row, so the table's scroll box never cuts it off under the last row. |
| The last action | Adds .tooltip-end, so its tip lines up with the row's edge instead of running past it. |
| The tip's look | Raised and bordered beside a list (.bg-raised .border .shadow-2), where a dark tip would shout. Any utilities: it is a span. |

```html
<div class="flex flex-items-center flex-gap-16 bg-raised border border-subtle rounded-8 padding-x-16 padding-y-12">
  <div class="grow-1 min-width-0">
    <div class="text-body-2 font-weight-600 text-primary">Ceramic Mug Duo, White</div>
    <div class="text-body-3 text-muted">BK-01187 · 120 in stock</div>
  </div>
  <span class="inline-flex flex-gap-4">
    <a href="#" class="tooltip tooltip-up a a-color-reset inline-flex flex-items-center flex-justify-center size-32px rounded-4 bg-transparent border-transparent text-muted cursor-pointer hover-bg-surface hover-text-primary" aria-label="Edit Ceramic Mug Duo, White">
      <i class="icon-20 material-icons" aria-hidden="true">edit</i>
      <span class="tip bg-raised text-primary border border-subtle shadow-2 text-body-3 font-weight-500 padding-x-8 padding-y-4 rounded-4" aria-hidden="true">Edit</span>
    </a>
    <button type="button" class="tooltip tooltip-up inline-flex flex-items-center flex-justify-center size-32px rounded-4 bg-transparent border-transparent text-muted cursor-pointer hover-bg-surface hover-text-primary" aria-label="Archive Ceramic Mug Duo, White">
      <i class="icon-20 material-icons" aria-hidden="true">archive</i>
      <span class="tip bg-raised text-primary border border-subtle shadow-2 text-body-3 font-weight-500 padding-x-8 padding-y-4 rounded-4" aria-hidden="true">Archive</span>
    </button>
    <button type="button" class="tooltip tooltip-up tooltip-end inline-flex flex-items-center flex-justify-center size-32px rounded-4 bg-transparent border-transparent text-muted cursor-pointer hover-bg-surface hover-text-primary" aria-label="Delete Ceramic Mug Duo, White">
      <i class="icon-20 material-icons" aria-hidden="true">delete</i>
      <span class="tip bg-raised text-primary border border-subtle shadow-2 text-body-3 font-weight-500 padding-x-8 padding-y-4 rounded-4" aria-hidden="true">Delete</span>
    </button>
  </span>
</div>
```

### Stat

A big number over a label with a chevron, all one link.

| Part | Classes |
|---|---|
| Link | .a .a-color-reset .hover-text-primary-1 .text-secondary .width-50 |
| Number | .font-weight-600 .text-primary .h3 |
| Label row | .flex .flex-items-center .flex-justify-center .font-weight-500 .text-body-2 |
| Chevron | .icon-16 .material-icons .margin-left-4 |

```html
<div class="flex text-center">
  <a href="#" class="a a-color-reset hover-text-primary-1 text-secondary width-50">
    <div class="font-weight-600 text-primary h3">2,400+</div>
    <div class="flex flex-items-center flex-justify-center font-weight-500 text-body-2 margin-top-4">Downloads<i class="icon-16 material-icons margin-left-4">chevron_right</i></div>
  </a>
  <a href="#" class="a a-color-reset hover-text-primary-1 text-secondary width-50">
    <div class="font-weight-600 text-primary h3">4.9 / 5</div>
    <div class="flex flex-items-center flex-justify-center font-weight-500 text-body-2 margin-top-4">Rating<i class="icon-16 material-icons margin-left-4">chevron_right</i></div>
  </a>
</div>
```

### Avatar

A circle with a photo, initials or a +N count.

| Part | Classes |
|---|---|
| Circle | Use .circle .flex .flex-items-center .flex-justify-center .overflow-hidden, plus a size such as .size-48px |
| Initials or count | Add a fill such as .bg-orange-1 to the circle, and put .font-weight-700 .text-body-2 .text-white on the text. |
| Photo | A .has-bg-img .width-100 .height-100 box inside the circle. |
| White ring | .border .border-width-2 .border-white |
| Overlapping stack | Put .margin-right-n8 on each avatar except the last. |

```html
<div class="flex flex-items-center">
  <div class="circle flex flex-items-center flex-justify-center overflow-hidden size-48px border border-width-2 border-white bg-orange-3 text-white margin-right-n8">
    <span class="font-weight-700 text-body-2">PN</span>
  </div>
  <div class="circle flex flex-items-center flex-justify-center overflow-hidden size-48px border border-width-2 border-white margin-right-n8">
    <div class="has-bg-img width-100 height-100"><div class="bg-img" style="background-image: url('/images/pexels-people/pexels-anastasiya-gepp-654466-2036646.png');"></div></div>
  </div>
  <div class="circle flex flex-items-center flex-justify-center overflow-hidden size-48px border border-width-2 border-white bg-primary-1 text-white">
    <span class="font-weight-700 text-body-2">+12</span>
  </div>
</div>
```

### Progress Bar

A thin rounded track with a fill.

The fill's width is the progress. Use a width class (.width-40, .width-75) when the value is on the scale, or style="width: 62%" for any other value.

| Part | Classes |
|---|---|
| Track | Use .rounded-4 and a fill colour such as .bg-sunken |
| Fill | Use .padding-y-2 .rounded-4, a colour such as .bg-primary-1, and the width |

```html
<div class="rounded-4 bg-sunken">
  <div class="padding-y-2 rounded-4 bg-primary-1 width-40"></div>
</div>
<div class="rounded-4 bg-sunken margin-top-12">
  <div class="padding-y-2 rounded-4 bg-green-1" style="width: 72%;"></div>
</div>
```

## Patterns: Menus, Search & Messages

### Menu

A vertical list of rows with an icon, a label and an optional badge, one of them active.

| Part | Classes |
|---|---|
| List | .flex .flex-column .text-ellipsis |
| Row | .flex .flex-items-center .padding-y-8 .padding-x-12 .rounded-4 |
| Inactive row | .hover-bg-raised .text-secondary |
| Active row | .bg-primary-light-1 .hover-bg-primary-light-2 .hover-text-primary-dark-1 .text-primary-3 |
| Icon box | .flex .flex-items-center .margin-right-12 .size-24px |
| Label | .grow-1 .text-nowrap .text-ellipsis |

```html
<div class="flex flex-column text-ellipsis bg-surface padding-x-16 padding-y-12 rounded-8">
  <a href="#" class="flex flex-items-center padding-y-8 padding-x-12 rounded-4 hover-bg-raised text-secondary">
    <span class="flex flex-items-center margin-right-12 size-24px"><i class="icon-20 material-icons">home</i></span>
    <span class="grow-1 text-nowrap text-ellipsis">Overview</span>
  </a>
  <a href="#" class="flex flex-items-center padding-y-8 padding-x-12 rounded-4 bg-primary-light-1 hover-bg-primary-light-2 hover-text-primary-dark-1 text-primary-3">
    <span class="flex flex-items-center margin-right-12 size-24px"><i class="icon-20 material-icons">dashboard</i></span>
    <span class="grow-1 text-nowrap text-ellipsis">Board</span>
    <span class="inline-flex flex-items-center height-24px padding-x-8 rounded-4 text-body-4 font-weight-600 text-uppercase letter-spacing-1 bg-primary-light-2 text-primary-dark-2">new</span>
  </a>
</div>
```

### Search

A dropdown of recent searches on a wide screen; on a phone, the whole screen with a back button. No search class and no script: a field, Show on Parent, and utilities.

| Class | Goes on |
|---|---|
| .fullscreen-on-focus-sm | The search, with tabindex="-1" so a click in its panel keeps it open. On a phone it takes the screen while focus is inside it. |
| .show-on-parent-focus | The panel, straight inside the search: shown while focus is inside it. |
| .close-fullscreen | The back button, right before the search: shown only while it is full screen. Pressing it closes search. |

```html
<div class="relative">
  <button type="button" class="close-fullscreen fixed flex-items-center flex-justify-center bg-transparent border-none text-primary cursor-pointer" style="top: 8px; left: 4px; z-index: 1001; width: 40px; height: 48px" aria-label="Close search"><i class="icon-24 material-icons" aria-hidden="true">chevron_left</i></button>
  <div class="fullscreen-on-focus-sm relative" tabindex="-1" style="--fullscreen-padding: 8px 12px 8px 44px">
    <form class="relative" role="search" action="#">
      <span class="absolute top-0 bottom-0 left-0 flex flex-items-center flex-justify-center text-muted" style="width: 40px; pointer-events: none" aria-hidden="true"><i class="material-icons icon-20">search</i></span>
      <input class="field padding-left-40" type="search" name="q" placeholder="Search" aria-label="Search" autocomplete="off" enterkeyhint="search">
    </form>
    <div class="show-on-parent-focus absolute left-0 right-0 z-4 padding-8 bg-raised border border-subtle rounded-12 shadow-3" style="top: calc(100% + 4px)">
      <a href="#" class="a a-color-reset flex flex-items-center flex-gap-12 padding-8 rounded-8 text-primary hover-bg-surface"><i class="icon-20 material-icons text-muted" aria-hidden="true">schedule</i>running shoes</a>
      <a href="#" class="a a-color-reset flex flex-items-center flex-gap-12 padding-8 rounded-8 text-primary hover-bg-surface"><i class="icon-20 material-icons text-muted" aria-hidden="true">schedule</i>ceramic mug</a>
    </div>
  </div>
</div>
```

The field and its icon slot are in Forms (Icons & buttons inside a field). --fullscreen-padding leaves room for the back button. Showing live suggestions as the visitor types is your code.

### Banner

One line with an icon, a message and an optional button.

| Part | Classes |
|---|---|
| Row | Use .flex .flex-items-center, plus your own .border .rounded-8 .padding-x-20 .padding-y-12 .bg-raised |
| Icon | Use .material-icons .icon-20 .margin-right-8, and a text colour |
| Message | .font-weight-600 .margin-right-16 .text-body-1 .text-primary |
| Button | .button .bg-primary-1 .border-primary-1 .hover-bg-primary-2 .hover-border-primary-2 .active-bg-primary-3 .active-border-primary-3 .margin-left-auto .shrink-0 .text-white |

```html
<div class="flex flex-items-center bg-raised border rounded-8 padding-x-20 padding-y-12">
  <i class="material-icons icon-20 margin-right-8 text-orange-3">whatshot</i>
  <div class="font-weight-600 margin-right-16 text-body-1 text-primary">New training is available to opt in</div>
  <a class="active-bg-primary-3 active-border-primary-3 button bg-primary-1 border-primary-1 hover-bg-primary-2 hover-border-primary-2 margin-left-auto shrink-0 text-white">Learn more</a>
</div>
```
