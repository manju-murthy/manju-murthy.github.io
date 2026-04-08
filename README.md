# Manjushree Murthy — Portfolio

Personal portfolio site. Single-page design with dark theme, bento layout, and scroll-snap navigation.

**Live:** [manjumurthy.com](https://manjumurthy.com)

## Structure

```
index.html                    Single-page site
styles.css                    Styling
script.js                     Interactions
logo-white.png                Nav logo
Manjushree-Murthy-Resume.pdf  Resume download
favicon.svg / .ico / .png     Browser tab icons
apple-touch-icon.png          Mobile bookmark icon
CNAME                         Custom domain config
robots.txt                    Search engine rules
sitemap.xml                   Search engine sitemap
```

## Sections

- **Hero** — Headline, stats, career timeline, bento grid (How I Lead Product Teams), AI/ML project cards
- **Case Studies** — 12 expandable before/after case studies in 2-column accordion
- **AI/ML Projects** — Newton Eyes, Fraud Detection, AI Governance, StableStats
- **Writing** — LinkedIn embeds (Agentic AI series) + Medium articles
- **Contact** — CTA, resume download

## Local Development

```bash
python -m http.server 8000
# Open http://localhost:8000
```

Note: LinkedIn embeds and favicon require `https://` — they won't render from `file://` paths.

## Deploy

Push all root-level files to a GitHub Pages repo. The `CNAME` file handles the custom domain.
