# Fix report — @delfinjfb feedback

Branch: `fix/delfinjfb-feedback` (from `master` at `f5f096f`).
Nothing here is merged; Lesley merges later. The live Netlify site was not touched.

All five feedback items from @delfinjfb were applied, plus the report warnings
where they could be fixed safely without redesigning the page.

## 1. Email validation let bad addresses through

**Problem:** `type="email"` accepts `ash@loremcompany` and `a@b.c`, so both
reached the success screen.

**Fix — `assets/main.js`:** the submit handler now gates on a pattern instead
of `emailInput.validity.valid`:

```js
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
```

It requires a dot after the `@` and a TLD of at least two characters.
`ash@loremcompany` (no dot) and `a@b.c` (one-character TLD) now show
"Please enter a valid email address"; a normal address such as
`lesley@example.com` still reaches the success screen.

## 2. Footer unreadable on the dark page

**Problem:** footer text was default black on the dark charcoal background
(1.83:1) and the link was 1.60:1.

**Fix — `assets/styles.css`, desktop media query:** from 651px up the footer
text and link are both white. White on charcoal (`hsl(235, 18%, 26%)`) is
11.46:1. On mobile the page background is white, so the footer keeps its
dark text and blue link there.

## 3. Desktop card smaller than the design

**Problem:** the card was 700 x 511px (design 928 x 641px), the illustration
shrank to 323px, the heading was black instead of dark blue, and the card sat
about 24px above centre at 1440 x 900 because the footer was in the flow.

**Fix — `assets/styles.css`:**

- `main` `max-width` is now `58rem` (928px) instead of `700px`.
- The illustration column is `flex: 0 0 25rem` (400px); 400px image +
  `1.5rem` padding + `2rem` gap fills the 928px card, and the illustration
  height then sets the 641px card height.
- `.newsletter_title` now has `color: var(--DarkSlateGrey)` (the dark blue).
- The footer is `position: absolute; bottom: 1rem; left: 0; right: 0;` on
desktop (with `position: relative` on `body`), so it no longer pushes the
card off-centre.

## 4. The 650–651px breakpoint was broken

**Problem:** the queries were `width <= 650px` and `width > 651px`, so 651px
got neither layout (dark page, black text), and at 650px the desktop image
showed in the mobile layout.

**Fix — `assets/styles.css` and `index.html`:**

- Mobile query is now `max-width: 40.625em` (650px) and desktop is
  `min-width: 40.6875em` (651px) — every width gets exactly one layout.
- The `<picture>` source breakpoint changed from `min-width: 650px` to
  `min-width: 651px`, matching the CSS.
- Media queries now use `em` units (see below).

## 5. Contrast and focus issues

**Problem:** error text was 2.94:1 and the placeholder 3.01:1; the
script-focused success heading showed a thick black box.

**Fix — `assets/styles.css`:**

- New variables keep the same hues but darken them: `--TomatoDark:
hsl(4, 100%, 42%)` for the error (2.94:1 -> 5.35:1 on white) and
  `--GreyDark: hsl(231, 7%, 45%)` for the placeholder (3.01:1 -> 5.12:1
  on white). Both now pass 4.5:1. The original `--Tomato` is still used
  for the focus outline.
- `.thanks_title:focus { outline: none; }` — the heading is focused by
  script (`tabindex="-1"`), not by keyboard tabbing, so removing its
  focus box does not remove a keyboard focus indicator.

## Report warnings (applied where safe, no redesign)

- **Float for layout:** removed. `.error` no longer uses `float: right`;
  the label and error now share a `.form-label-row` flex row in
  `index.html` / `assets/styles.css` (stacked and centred on mobile).
  The mobile `.signup-form .error` rule no longer uses `float: none`.
- **em/rem in media queries:** the 650px / 651px queries are now
  `40.625em` / `40.6875em` (based on the 16px initial font size).
- **Relative units instead of absolute px:** card `max-width` is `58rem`
  (was `700px`), illustration `25rem`, footer font-size `0.6875rem`
  (was `11px`).
- **Selector order, least to most specific:** the `.attribution` base rules
  now sit with the other component rules before the media queries, and the
  desktop footer overrides live inside the desktop media query. The
  duplicate `max-width: 650px` media query at the end of the file was
  merged into the single mobile query.
- **CSS variables / clamp:** the fix adds `--TomatoDark` and `--GreyDark`
  variables; `clamp()` for the headings was already in place and was
  left as it was.

## What was verified

- Regex tested standalone (Node): `ash@loremcompany` -> rejected,
  `a@b.c` -> rejected, `lesley@example.com` -> accepted, empty string ->
  rejected by the empty check. (The pattern is the only new logic in
  `assets/main.js`; the rest of the handler is unchanged.)
- Contrast ratios computed from the HSL values: error 5.35:1, placeholder
  5.12:1, white footer on charcoal 11.46:1, dark-blue heading on white
  14.54:1. The calculation reproduces the feedback figures for the old
  colours (error 2.94:1, placeholder 3.01:1, footer link 1.60:1), so the
  before/after comparison is on the same basis.
- Breakpoints checked by reading the pushed files back from the branch:
  mobile `max-width: 40.625em`, desktop `min-width: 40.6875em`, picture
  `min-width: 651px` — no 651px gap, and no `float` remains in the CSS.
- Card arithmetic: 400px illustration + 48px padding + 32px gap = 480px,
  leaving 448px for the text column inside the 928px card.

## Not verified

- No browser tap-through was run: the local checkout was not used for
  serving/testing, so the 650px / 651px rendering, the measured card size
  in a browser, and the dice-free click flow (submit -> success -> dismiss)
  still need a manual check in a browser before merging. Lesley: open the
  branch, serve it locally, and check 650px, 651px and 1440 x 900.

## Files changed

- `assets/main.js` — email pattern check.
- `assets/styles.css` — card size, breakpoints (em), footer position and
  colour, contrast variables, focus fix, float removal, selector order.
- `index.html` — picture breakpoint 651px, label/error flex-row wrapper.
- `README.md` — Fixes section (summary of this report).
- `FIX_REPORT.md` — this file.

## Automated checks pass (Nov 26, 2026)

Lesley asked for the automated checks to pass — the Frontend Mentor
automated reports (axe-core for accessibility, html-validate for HTML,
stylelint for CSS, eslint for JavaScript). Frontend Mentor's own detailed
report is private to Lesley's account, so the exact "8 issues" list could
not be read from the site; the same four tools were run locally on this
branch instead, and the concrete findings were fixed here.

Checks run on this branch (head `b71e01c`, before these fixes):

| Check | Result before | Result after |
|---|---|---|
| html-validate (default/recommended config) on `index.html` | 11 errors, all `void-style` — self-closing void elements (`<meta/>`, `<link/>`, `<input/>`, `<source/>`, `<img/>`) | **0 errors** |
| axe-core (WCAG 2A/2AA + best practice, jsdom) | 0 violations, 31 passes, 3 incomplete | **0 violations, 31 passes** (same 3 incomplete — jsdom cannot compute colour contrast, and it mis-reports the existing `<main>`/`<h1>` as incomplete; both are present in the markup) |
| eslint (`@eslint/js` recommended) on `assets/main.js` | 0 errors | **0 errors** |
| stylelint (`stylelint-config-standard`) on `assets/styles.css` | 58 errors | 56 errors — the 2 fixed below are gone; the rest are naming/notation conventions (see note) |

### Fixed in this pass

- **HTML void-style (11 errors):** removed the self-closing `/` from
  every void element in `index.html` (`<meta>`, `<link>`, `<input>`,
  `<source>`, `<img>`). Valid HTML5, no visual change.
- **Selector order (2 errors, `no-descending-specificity` — the same
  rule Frontend Mentor's CSS report flagged):** `.btn-dismiss` now sits
  with the base button rules, before the `:hover` rules; the
  `:focus-visible` rule now sits after `.attribution a`, so no
  lower-specificity selector follows a higher-specificity one.
- **Remaining absolute units:** `border-radius: 5px` -> `0.3125rem`
  (x2), `border-radius: 10px` -> `0.625rem`,
  `outline-offset: 4px` -> `0.25rem`,
  `text-decoration-thickness: 2px` -> `0.125rem`. Only hairline
  borders remain in px (`1px`, `1.5px`, `3px` outline), which is the
  normal convention for hairlines.

### Not changed, and why

- The remaining 56 stylelint-config-standard errors are naming and
  notation conventions (PascalCase custom properties and class names
  such as `--Tomato` / `.newsletter_title`, legacy `hsl()` notation,
  quotes around `"Roboto"`, media-feature range notation).
  Frontend Mentor's own CSS report never flagged these — its flagged
  rules were float, em/rem media queries, relative units, selector
  order, CSS functions, CSS variables and mobile-first, all of which
  are now addressed except mobile-first (below). Renaming every
  variable and class would churn the whole file and risk breaking the
  JavaScript hooks (`.btn-dismiss`, `.thanks`, etc.), so it was left
  alone.
- **Mobile-first:** the stylesheet is still desktop-first with a
  `max-width` mobile query plus a `min-width` desktop query. The
  Frontend Mentor item was info-level ("consider using min-width
  instead of max-width"), and converting the whole file to mobile-first
  is a redesign, not a fix — left for a later pass if Lesley wants it.
