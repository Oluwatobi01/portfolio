# Portfolio (Static)

This repository now contains a minimal static portfolio scaffold (HTML + CSS).

Files added:

- `index.html` — main landing page
- `css/styles.css` — basic styling

How to preview locally:

1. Open `index.html` in your browser directly, or run a simple static server. Example with Python 3:

```powershell
cd C:\Users\USER\Desktop\portflio\portfolio
python -m http.server 8000
# then open http://localhost:8000
```

2. Or use a Node static server if you prefer (install globally):

```powershell
npm install -g serve
serve .
```

What you can change next:

- Replace the placeholder email in `index.html` with your contact details.
- Add project pages or images under a new `assets/` folder.
- Add a `LICENSE` and more README details as needed.

If you'd like, I can scaffold a React/Vite or Next.js portfolio instead — tell me which stack and I'll set it up and push it to `main`.
Portfolio React website scaffolded. See below for instructions.

# Portfolio React Website

This is a lightweight React + Vite portfolio site scaffold, inspired by modern personal sites like rammaheshwari.com. It includes sections for Hero, About, Projects, Experience, Testimonials, and Contact.

## Getting started

1) Ensure you have Node.js 18+ installed.
2) Install dependencies:

```
npm install
```

3) Start the local dev server:

```
npm run dev
```

4) Build for production:

```
npm run build
```

5) Preview the production build locally:

```
npm run preview
```

## Customize

- Edit `src/components/Hero.jsx` to change your name and badges.
- Update `src/data/*.js` for projects/experience/testimonials.
- Replace `public/favicon.svg`.
- Adjust styles in `src/styles.css`.

## Notes

- Vite is used without the React plugin to keep dependencies minimal; JSX is still supported via esbuild.
- No external UI libraries are required; everything is implemented with modern CSS.

