---
name: alloy-css
description: Write HTML with Alloy CSS classes. Use when building or editing pages in a project that links Alloy CSS (alloy.css, @alloyhtml/css), or when asked to style markup with Alloy.
---

# Alloy CSS

Alloy CSS is one stylesheet of utilities and parts (buttons, fields, dialogs,
menus, tabs) for HTML a server renders. Every page you write with it must
look like it belongs with the others, so you write with the kit's classes
and values and nothing else.

`reference.md`, next to this file, lists every class with examples. Read the
topic you need before you write a part you haven't written in this project
yet: a modal, a menu, tabs, a form field.

## Rules

1. **Only classes the kit defines.** Never invent one, and never bring
   Tailwind or Bootstrap names (`mt-4`, `btn`, `p-4`, `text-sm`). If no
   class does what you need, see rule 6.
2. **Only the kit's values.** Spacing is 0, 2, 4, 8, 12, 16, 20, 24, 32, 40,
   48, 60, 80, 100, 120, 140 (px). Gaps and gutters are 0, 4, 8, 12, 16, 20,
   24, 32, 40. Radius is 0, 4, 8, 12, 16, 20. Widths are percentages
   (`width-50`) or fractions (`width-1-3`). There is no `padding-15`.
3. **Semantic colours for the page, palette colours for meaning.** Surfaces
   are `bg-base` (the page), `bg-surface`, `bg-raised` (cards, dialogs),
   `bg-sunken`, `bg-inverse`. Text is `text-primary`, `text-secondary`,
   `text-muted`, `text-inverse`. Borders are `border-subtle`, `border-strong`.
   These follow the theme. The brand is `primary-1`; red, green, orange and
   the rest are for status. A tint is `-light-1`, text on a tint `-dark-1`.
4. **No JavaScript for interactions.** A modal is a `<dialog>` opened with
   `commandfor` and `command="show-modal"`. A menu or drawer is a `popover`.
   An accordion is a `<details>`. Tabs are radio buttons. Look each one up in
   `reference.md` and copy its markup.
5. **Breakpoints go down.** A suffix applies at that width and below: `-lg`
   1200px, `-md` 992px, `-sm` 768px, `-xs` 576px. Write the desktop class
   first, then the smaller ones: `width-50 width-100-sm`. Not every family
   has them; the reference says which.
6. **One-offs go inline.** A size or position the kit doesn't have (a 420px
   panel, a 3/4 image ratio) goes in a `style` attribute. A colour, radius,
   shadow or spacing never does: pick the nearest kit value. CSS of your own
   is only for what inline can't do (a media query, `:hover` on a child,
   `::before`), in the page's `<style>` block.
7. **No state classes.** There is no `.active`. A current link swaps
   utilities in the markup (`text-primary-1` instead of `text-secondary`)
   and carries `aria-current="page"`.
8. **Two page widths.** `container-1320` for headers and pages you browse,
   `container-960` for pages you read or fill in.

## Names

A class says what it does, and its prefix says where it goes. Anything on
the flex container starts with `flex-` (`flex-wrap`, `flex-gap-16`,
`flex-items-center`). Anything on a child has its own prefix (`grow-1`,
`shrink-0`, `align-center`, `order-1`). States are prefixes: `hover-`,
`active-` (`hover-bg-primary-2`).

## Quick map

| You'd write | Alloy |
|---|---|
| `p-4`, `px-4`, `mt-2` | `padding-16`, `padding-x-16`, `margin-top-8` |
| `gap-4` | `flex-gap-16` |
| `items-center`, `justify-between` | `flex-items-center`, `flex-justify-between` |
| `flex-1` | `grow-1` (or `equal` for equal columns) |
| `w-full`, `w-1/2` | `width-100`, `width-50` |
| `text-sm`, `text-xs` | `text-body-2`, `text-body-3` |
| `text-2xl font-bold` | `h4 font-weight-700` (`h1` to `h6` work on any element) |
| `text-gray-500` | `text-secondary` or `text-muted` |
| `bg-white`, `bg-gray-50` | `bg-raised`, `bg-base` |
| `rounded-lg`, `rounded-full` | `rounded-8`, `circle` |
| `shadow`, `shadow-lg` | `shadow-1`, `shadow-3` |
| `hidden md:block`, `md:hidden` | `hidden-sm` (hidden at 768px and below), `hidden-sm-greater` (hidden above it) |
| `sr-only` | `visually-hidden` |
| `btn btn-primary` | `button bg-primary-1 border-primary-1 text-white hover-bg-primary-2 hover-border-primary-2` |
| a grid of cards | `flex flex-wrap flex-gutter-12` with `width-1-3 width-100-sm` wrappers |

## Check your work

Run the checker on what you wrote. It lists every class the kit doesn't
define, with its file and line:

```
npx alloy-check templates/
```

Pass `--css` for the project's own stylesheet and `--allow` for an icon
font's class. Fix everything it lists before you finish.
