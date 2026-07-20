const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name);

    if (entry.isDirectory() && entry.name !== ".git") return walk(target);
    return entry.isFile() ? [target] : [];
  });
}

const pages = walk(root).filter((file) => file.endsWith(".html"));
const errors = [];

const contactHtml = fs.readFileSync(path.join(root, "contact.html"), "utf8");

if (!contactHtml.includes('action="https://formsubmit.co/amer.bidz@gmail.com"')) {
  errors.push("contact.html: missing FormSubmit backend action");
}

for (const field of ["name", "email", "message"]) {
  const requiredField = new RegExp(`<(?:input|textarea)[^>]*name="${field}"[^>]*required`);
  if (!requiredField.test(contactHtml)) {
    errors.push(`contact.html: ${field} must be required`);
  }
}

if (!contactHtml.includes('name="_honey"')) {
  errors.push("contact.html: missing spam honeypot");
}

if (!contactHtml.includes('data-contact-form') || !contactHtml.includes('src="./site.js"')) {
  errors.push("contact.html: missing duplicate-submission guard");
}

if (!contactHtml.includes('name="name" type="text" autocomplete="name" minlength="2"') || !contactHtml.includes('name="message" rows="7" minlength="10"')) {
  errors.push("contact.html: missing basic garbage-input constraints");
}

if (!contactHtml.includes('name="_next" value="https://amerbidzevic.github.io/empty-but-live-portfolio/thanks.html"')) {
  errors.push("contact.html: missing live success redirect");
}

for (const page of pages) {
  const html = fs.readFileSync(page, "utf8");
  const relativePage = path.relative(root, page);

  if ((html.match(/<h1[ >]/g) ?? []).length !== 1) {
    errors.push(`${relativePage}: expected exactly one h1`);
  }

  if (!html.includes('<html lang="en">')) {
    errors.push(`${relativePage}: missing language declaration`);
  }

  if (!html.includes('<meta name="viewport"')) {
    errors.push(`${relativePage}: missing viewport metadata`);
  }

  if (!/<title>[^<]+<\/title>/.test(html)) {
    errors.push(`${relativePage}: missing page title`);
  }

  if (!/<meta name="description" content="[^"]+">/.test(html)) {
    errors.push(`${relativePage}: missing meta description`);
  }

  if (!/<link rel="canonical" href="https:\/\/amerbidzevic\.github\.io\/empty-but-live-portfolio\/[^"]*">/.test(html)) {
    errors.push(`${relativePage}: missing canonical URL`);
  }

  for (const property of ["og:title", "og:description", "og:type", "og:url", "og:image"]) {
    if (!html.includes(`<meta property="${property}"`)) {
      errors.push(`${relativePage}: missing ${property}`);
    }
  }

  if (/lorem ipsum|placeholder text|Ã|â€/.test(html)) {
    errors.push(`${relativePage}: contains placeholder or broken encoding`);
  }

  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    let target = match[1];
    if (/^(https?:|mailto:|#)/.test(target)) continue;

    target = target.split("#")[0].split("?")[0];
    if (!target) continue;

    let resolved = path.resolve(path.dirname(page), target);
    if (target.endsWith("/")) resolved = path.join(resolved, "index.html");

    if (!fs.existsSync(resolved)) {
      errors.push(`${relativePage}: missing local target ${target}`);
    }
  }
}

for (const requiredFile of ["robots.txt", "sitemap.xml", "site.js", "break-test-log.md"]) {
  if (!fs.existsSync(path.join(root, requiredFile))) {
    errors.push(`missing required hardening artifact ${requiredFile}`);
  }
}

console.log(`Checked ${pages.length} HTML pages.`);

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log("All local links and required page structure passed.");
}
