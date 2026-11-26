# Newsletter sign-up form

A responsive newsletter subscription form with client-side email validation and a personalized success message.

## The challenge

Build the newsletter sign-up interface to match the supplied desktop and mobile designs. Users should be able to:

- Enter an email address and submit the form.
- See a success message containing their email after a successful submission.
- See validation feedback when the email is empty or incorrectly formatted.
- Use an interface that adapts to their screen size.
- See hover and keyboard-focus states on interactive elements.

## Features

- Responsive signup layout with separate mobile and desktop illustrations.
- Inline, accessible email validation with the invalid field announced to assistive technology.
- Success state that displays the submitted address; dismissing it returns to the form.
- Visible hover, active, and keyboard-focus feedback for buttons and form controls.
- No build step or third-party JavaScript dependencies.

## Implementation notes

The form validates email with a pattern check (`/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/`) along with a custom message for empty and malformed values. The submit handler prevents navigation and reveals the success card only after validation. It copies the trimmed email into the confirmation message and moves keyboard focus to the success heading. The dismiss button restores the form and returns focus to the email field.

The responsive `<picture>` element serves the supplied desktop illustration at larger widths and the mobile artwork on smaller screens.

This is a front-end demonstration: submitting the form displays the confirmation state but does not send or store an email address.

## Fixes — @delfinjfb feedback

On branch `fix/delfinjfb-feedback` (not merged yet). Full detail, including
before/after contrast ratios and what was verified, is in [FIX_REPORT.md](./FIX_REPORT.md).

- **Email validation:** `type="email"` alone accepted `ash@loremcompany` and `a@b.c`. The submit handler now requires a dot plus a TLD of at least two characters (`assets/main.js`).
- **Footer unreadable on the dark page:** footer text and link are now white from 651px up — white on charcoal is 11.46:1, where the old link was 1.60:1 (`assets/styles.css`).
- **Desktop card too small:** card `max-width` is now `58rem` (928px, design size), the illustration column is `25rem` (400px), the heading is dark blue, and the footer is `position: absolute` so it no longer pushes the card about 24px above centre (`assets/styles.css`).
- **650–651px broken:** the queries are now `max-width: 40.625em` (650px) and `min-width: 40.6875em` (651px), and the `<picture>` source breakpoint is `min-width: 651px` — no width is left without a layout (`assets/styles.css`, `index.html`).
- **Contrast and focus:** error text darkened to `hsl(4, 100%, 42%)` (2.94:1 -> 5.35:1) and the placeholder to `hsl(231, 7%, 45%)` (3.01:1 -> 5.12:1), same hues; the script-focused success heading gets `outline: none` (`assets/styles.css`).
- **Report warnings:** `float: right` on the error removed (label and error now share a flex row), media queries use `em` units, card/illustration/footer sizes use `rem`, and the footer rules were reordered least to most specific.
- **Automated checks (Nov 26):** html-validate now passes with 0 errors (void elements no longer self-closed), the two remaining selector-order issues are fixed, and the last layout px values are now rem. axe-core shows 0 violations and eslint passes clean. Full detail is in [FIX_REPORT.md](./FIX_REPORT.md) under "Automated checks pass". Two things were deliberately left: the stylesheet is still desktop-first rather than mobile-first (an info-level suggestion, and a redesign), and stylelint-config-standard's naming conventions (PascalCase variables/classes) were not renamed, since Frontend Mentor's own report never flagged them.

### Links

- Solution URL: [GitHub Link](https://github.com/issagoodlifeInc/newslettersignup.git)
- Live Site URL: [Netlify Deploy](https://newslettersignuplkn.netlify.app/)

## Run locally

Open `index.html` in a browser. For local development, serve the project directory with any static file server.

## Acknowledgments

- Challenge and starter assets provided by [Frontend Mentor](https://www.frontendmentor.io/).
- The supplied illustrations, success icon, checklist icon, and favicon are in `assets/images/`.
- The Roboto typeface is served by [Google Fonts](https://fonts.google.com/).
