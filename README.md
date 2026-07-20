# Next.js + Playwright Auth Demo

A minimal Next.js (App Router) app with a login screen, a protected dashboard,
and end-to-end tests written with Playwright.

## Features

- **Login screen** (`/login`) with email + password fields.
- **Dummy auth bypass** — any real backend is skipped. Sign in with the demo
  credentials below and an auth flag is stored in `localStorage`.
- **Dashboard** (`/dashboard`) — protected route that shows a random message
  and a logout button.
- **Playwright tests** covering redirects, invalid login, successful login,
  route protection, and logout.

## Demo credentials

```
Email:    admin@example.com
Password: password123
```

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

## Running the tests

```bash
npm test           # runs Playwright (auto-starts the dev server)
```

If you are running in an environment with a pre-installed Chromium (instead of
Playwright's bundled browser), point Playwright at it:

```bash
PLAYWRIGHT_CHROMIUM_PATH=/opt/pw-browsers/chromium npm test
```

## Project structure

```
app/
  layout.js            Root layout
  page.js              Redirects "/" -> "/login"
  login/page.js        Login screen
  dashboard/page.js    Protected dashboard with random text
  lib/auth.js          Dummy auth helpers
tests/
  auth.spec.js         Playwright end-to-end tests
playwright.config.js
```
