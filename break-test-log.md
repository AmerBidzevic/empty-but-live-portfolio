# Break Your Own Site — Test Log

Date: 21 July 2026  
Site: https://amerbidzevic.github.io/empty-but-live-portfolio/

## Fix now

1. **Missing canonical and social-preview metadata on most pages.** Search engines had page titles and descriptions, but most pages did not declare their canonical URL or complete Open Graph data. I added canonical URLs, Open Graph title/description/type/URL/image tags and large-image Twitter card metadata to every HTML page.
2. **No duplicate-submit protection on the contact form.** A valid form could be clicked twice quickly. I added a small submission guard that disables the button and changes its label to `Sending…` after the browser accepts a valid submission.
3. **Very weak garbage-input constraints.** Empty fields and malformed email addresses were already blocked, but the name and message had no minimum useful length. I added a two-character minimum plus a letter requirement for the name, and a ten-character minimum for the message.
4. **No crawler map.** I added `robots.txt` and a sitemap containing every public portfolio page except the no-index confirmation page.

## Tests that already passed

- Empty form submission stays on the contact page and focuses the first missing required field.
- A malformed email address is rejected by native browser validation.
- All ten HTML pages contain one `h1`, a language declaration, viewport metadata and a unique page title.
- All local navigation, image, stylesheet, CV and case-study paths resolve.
- The deployed homepage and contact page load with correct names, punctuation and readable structure.
- The largest image is under 350 KB; the whole static site remains lightweight and uses no application framework.
- A mobile Lighthouse run scored **99 performance, 100 accessibility and 100 SEO**, with a 1.7 s Largest Contentful Paint, 0.005 layout shift and a total transfer size of 313 KiB.

## Known limitations

- Form delivery depends on the third-party FormSubmit service. If that service is unavailable, the `mailto:` address remains as a fallback.
- Several projects cannot provide both public source code and a stable live demo, so the case studies carry more of the proof.
- Native browser validation filters obvious empty or malformed values, but it cannot judge whether a grammatically valid message is sincere.
- Search engines may take time to discover or re-index a GitHub Pages site even when metadata and a sitemap are correct.

## Hardening review

The fixes above address the failures that affected normal visitors, discoverability or duplicate actions. The remaining items are documented limitations rather than defects that can be honestly fixed inside this static portfolio.
