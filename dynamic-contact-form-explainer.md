# Make It Do Something — contact form explainer

## The one dynamic feature

The portfolio now has one working contact form. A visitor enters their name, email address, optional company, and message. Submitting it sends the information to my inbox instead of merely opening the visitor’s email application.

## What a backend is

A backend is the part of a web feature that runs away from the visitor’s browser. It receives requests, validates or processes data, stores or forwards it when needed, and sends a response. Visitors do not directly see this work, but it is what lets a page do something with their input.

This portfolio is hosted as a static GitHub Pages site, so it does not run its own server code. The form therefore uses FormSubmit as its free external backend. FormSubmit receives the form request and forwards the message to my email address.

## How the data flows

1. The visitor opens the Contact page in their browser.
2. They enter a name, reply email, optional company, and message.
3. Browser validation blocks empty required fields and checks that the email looks valid.
4. When the visitor presses **Send message**, the browser makes an HTTPS POST request to FormSubmit.
5. FormSubmit processes the fields and sends the submission to my email inbox.
6. After a successful submission, FormSubmit redirects the visitor to the portfolio’s Thank You page.
7. I reply manually to the email address supplied by the visitor.

The message data leaves the portfolio and is processed by FormSubmit. The form tells visitors not to include sensitive information. It also includes a hidden honeypot field to reduce automated spam.

## Free-tier and activation note

FormSubmit requires no account for this use. The first submission sends a one-time activation email to the portfolio owner. The form only begins forwarding normal messages after that activation link is confirmed.

## Test evidence to capture

- A screenshot of the completed test form before pressing **Send message**.
- A screenshot of the received message in the owner’s inbox, with unrelated personal email details hidden.
- The live Contact page URL: https://amerbidzevic.github.io/empty-but-live-portfolio/contact.html
