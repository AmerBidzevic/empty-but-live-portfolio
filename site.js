const contactForm = document.querySelector("[data-contact-form]");

if (contactForm) {
  contactForm.addEventListener("submit", () => {
    if (!contactForm.checkValidity()) return;

    const submitButton = contactForm.querySelector('button[type="submit"]');
    if (!submitButton) return;

    submitButton.disabled = true;
    submitButton.textContent = "Sending…";
  });
}
