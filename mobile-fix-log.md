# Mobile fix log

## Audit

- Checked the portfolio structure at phone, tablet, and desktop breakpoints.
- Confirmed every page includes viewport metadata and exactly one main heading.
- Checked local page, image, CV, and case-study paths with the automated site test.
- Checked text and action-color contrast against the portfolio background; the tested combinations meet WCAG AA for normal text.
- Confirmed the source images have explicit dimensions and retain their natural aspect ratios.

## Problems found and changes made

1. **Small navigation targets:** Header and footer links were readable but slightly undersized for comfortable tapping. They now have a minimum 44-pixel target height.
2. **Long links on narrow screens:** Long repository and evidence links could wrap awkwardly. Text links now wrap safely instead of widening the page.
3. **Unnecessary image work:** Project screenshots below the first screen loaded immediately. They now use native lazy loading and asynchronous decoding while preserving their real proportions.
4. **Accidental tap delay:** Links and buttons now use touch manipulation so mobile browsers can respond directly to deliberate taps.
5. **Two publicly broken repository links:** PickMyFlick and Workforce Management are private repositories, so public visitors reached GitHub error pages. The dead links were replaced with honest private-repository labels while keeping the project evidence in each case study.

## Verification

- Automated structure and local-link test: passed for all nine HTML pages.
- Desktop-width browser check: no horizontal overflow detected.
- Public-link check: GitHub profile, public repositories, LinkedIn destination, booking page, and every internal page resolved. Private repository links were removed after they failed the public check.
- Responsive CSS reviewed at the 800-pixel and 620-pixel breakpoints.
- Final real-phone check: to be completed on the submitted live build, with a phone screenshot attached to the assignment.
