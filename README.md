# SafeDischarge-HF-Prototype Backend

This repository contains the backend API for the SafeDischarge-HF-Prototype application. It provides endpoints to generate medical summaries and utilizes AI services for processing heart failure guideline data.

## 🧠 Overview

- **Language & Framework:** Node.js with Express
- **Purpose:** Serve a REST API that accepts patient data, validates it, generates summaries based on heart failure guidelines, and leverages AI-based services.
- **Key Features:**
  - Request validation
  - RAG (Retrieval-Augmented Generation) with vector search
  - Guideline lookup
  - AI service integration for text generation
  - Summary generation
  - Centralized error handling

## 📁 Project Structure

```text
backend/
├── app.js
├── server.js
├── config/
│   └── aws.config.js
├── controllers/
│   └── generate.controller.js
├── data/
│   └── hfGuidelines.json
├── middlewares/
│   └── error.middleware.js
├── routes/
│   └── generate.routes.js
└── services/
    ├── ai.service.js
    ├── guideline.service.js
    ├── rag.service.js
    ├── summary.service.js
    ├── validation.service.js
    └── vector.service.js
``` 

## 🚀 Getting Started

### Prerequisites

- Node.js (>=16.x)
- npm or yarn
- Environment variables configured (typically via `.env` file)

### Installation

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Create a `.env` file based on `.env.example` (if provided) and set the required environment variables such as API keys, AWS config, etc.

### Running the Server

```bash
npm start
# or for development with nodemon
npm run dev
```

The server will start on the port specified by `process.env.PORT` (defaults to 3000 if unset).

## 🔌 API Endpoints

### `POST /api/generate`

Generate a medical summary based on patient input.

- **Request Body:**
  ```json
  {
    "age": 65,
    "sex": "male",
    "ethnicity": "hispanic",
    "bloodPressure": "120/80",
    "symptoms": "shortness of breath"
    // ... other relevant input fields
  }
  ```
- **Responses:**
  - `200 OK` – Returns generated summary text and any metadata.
  - `400 Bad Request` – Validation errors.
  - `500 Internal Server Error` – Server or AI service errors.

## 🛠️ Services

- **`validation.service.js`** – Validates request payloads.
- **`guideline.service.js`** – Reads `hfGuidelines.json` for guideline references.
- **`vector.service.js`** – Manages vector creation & similarity search.
- **`rag.service.js`** – Coordinates retrieval-augmented generation logic.
- **`ai.service.js`** – Interfaces with the AI provider for text generation.
- **`summary.service.js`** – Orchestrates the overall summary flow.

## ⚙️ Configuration

Configuration for AWS and other external services lives in `config/aws.config.js`. Make sure environment variables are properly set for your chosen AI/DB providers.

## 📦 Dependencies

Key dependencies found in `package.json` include:
- `express` – Web framework
- `aws-sdk` – AWS integrations
- `axios` – HTTP client
- `dotenv` – Environment variable management
- `cors`, `helmet`, etc. for middleware

## 🧩 Middleware

- **`error.middleware.js`** – Handles errors and sends proper HTTP responses.

## 📜 Guidelines Data

The `data/hfGuidelines.json` file contains the heart failure guidelines used for generating context in summaries.

## ✅ Testing

(If applicable, add instructions here. There are no tests included by default.)

## 📝 Notes

- Ensure your AI service credentials are secure and not committed to source control.
- Adjust vector and RAG configuration based on usage and performance.

---

Feel free to extend this README with more detailed setup instructions, contributing guidelines, or deployment information as the project evolves.


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
