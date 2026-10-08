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

The form uses native email input validity along with a custom message for empty and malformed values. The submit handler prevents navigation and reveals the success card only after validation. It copies the trimmed email into the confirmation message and moves keyboard focus to the success heading. The dismiss button restores the form and returns focus to the email field.

The responsive `<picture>` element serves the supplied desktop illustration at larger widths and the mobile artwork on smaller screens.

This is a front-end demonstration: submitting the form displays the confirmation state but does not send or store an email address.

## Run locally

Open `index.html` in a browser. For local development, serve the project directory with any static file server.

## Acknowledgments

- Challenge and starter assets provided by [Frontend Mentor](https://www.frontendmentor.io/).
- The supplied illustrations, success icon, checklist icon, and favicon are in `assets/images/`.
- The Roboto typeface is served by [Google Fonts](https://fonts.google.com/).
