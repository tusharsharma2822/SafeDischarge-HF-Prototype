
# SafeDischarge-HF-Prototype Frontend

This folder contains the React + Vite frontend for the SafeDischarge-HF-Prototype application. The UI collects patient data and displays generated summaries returned by the backend API.

## Tech stack

- React (17/18+ compatible)
- Vite for fast development and build
- ESLint for linting
- Tailwind CSS (dev dependency present)

## Project Structure

```text
frontend/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── App.css
│   ├── components/
│   │   ├── layout/
│   │   │   └── Navbar.jsx
│   │   ├── patient/
│   │   │   └── PatientForm.jsx
│   │   ├── summary/
│   │   │   ├── SummaryDisplay.jsx
│   │   │   └── SummarySection.jsx
│   │   └── ui/
│   │       ├── Button.jsx
│   │       ├── Card.jsx
│   │       ├── ErrorAlert.jsx
│   │       └── Loader.jsx
│   ├── pages/
│   │   └── Dashboard.jsx
│   └── services/
│       └── api.js
└── public/
```

## Available scripts

Scripts are defined in `package.json`:

- `dev` — start Vite dev server (hot reload)
- `build` — build production assets
- `preview` — preview the production build locally
- `lint` — run ESLint

Example:

```bash
cd frontend
npm install
npm run dev
```

## Environment & Backend

- The frontend expects the backend API to be available (by default at `http://localhost:3000` if you run the backend locally). Configure the backend base URL in `src/services/api.js`.
- Keep sensitive keys and secrets on the backend; the frontend should not contain private credentials.

## Development notes

- The patient form in `src/components/patient/PatientForm.jsx` sends a `POST` request to `/api/generate` with patient data. The backend validates and returns a generated summary.
- `src/components/summary/SummaryDisplay.jsx` renders the returned summary and any sections.
- Use the `api.js` service as the single place to adjust endpoints and request behaviour.

## Building for production

```bash
cd frontend
npm run build
```

Then serve the `dist/` folder with your preferred static host.

## Linting

```bash
npm run lint
```

## Contributing

- Open issues and PRs on the repository for UI improvements, accessibility, or bug fixes.
- Keep UI changes isolated to components in `src/components` and pages in `src/pages`.

## Troubleshooting

- If the dev server doesn't start, ensure Node.js and `vite` versions match the project's `devDependencies`.
- If requests to the backend fail, confirm the backend server is running and `src/services/api.js` points to the correct base URL.

---

If you'd like, I can also:
- Add environment-specific config (e.g., `.env` example) or
- Wire up a proxy in `vite.config.js` so `/api` forwards to the backend during development.


