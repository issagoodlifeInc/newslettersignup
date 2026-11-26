const form = document.querySelector(".signup-form");
const emailInput = document.querySelector("#email");
const emailError = document.querySelector("#email-error");
const signupCard = document.querySelector(".container");
const successCard = document.querySelector(".thanks");
const submittedEmail = document.querySelector(".submitted-email");
const successTitle = document.querySelector("#thanks-title");
const dismissButton = document.querySelector(".btn-dismiss");

// type="email" alone accepts addresses with no real domain, e.g.
// "ash@loremcompany" and "a@b.c", so require a dot plus a TLD of
// at least two characters after the @. This is the gate for the
// success screen, not the browsers built-in validity check.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function setEmailError(message) {
  emailError.textContent = message;
  emailInput.setAttribute("aria-invalid", String(Boolean(message)));
}

emailInput.addEventListener("input", () => {
  if (emailInput.getAttribute("aria-invalid") === "true") {
    setEmailError("");
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = emailInput.value.trim();

  if (!email) {
    setEmailError("Valid email required");
    emailInput.focus();
    return;
  }

  if (!EMAIL_PATTERN.test(email)) {
    setEmailError("Please enter a valid email address");
    emailInput.focus();
    return;
  }

  setEmailError("");
  submittedEmail.textContent = email;
  signupCard.hidden = true;
  successCard.hidden = false;
  successTitle.focus();
});

dismissButton.addEventListener("click", () => {
  successCard.hidden = true;
  signupCard.hidden = false;
  emailInput.value = "";
  emailInput.focus();
});
