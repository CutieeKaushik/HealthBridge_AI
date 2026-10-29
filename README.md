# HealthBridge AI

A React + TypeScript + Vite healthcare web application.

## Run locally

1. Install Node.js (LTS) from https://nodejs.org/
2. In this folder, run:

   ```bash
   npm install
   npm run dev
   ```

3. Open the local URL printed in the terminal.

## Deploy on Vercel

1. Upload these project files to a GitHub repository.
2. In https://vercel.com/new, import the repository.
3. Use the Vite framework preset and these settings:
   - Build command: `npm run build`
   - Output directory: `dist`
   - Install command: `npm install`
4. Click **Deploy**.

`vercel.json` includes a fallback rewrite for client-side routes.

## Notes

- Do not upload `node_modules/`, `.git/`, or build output (`dist/`).
- Add required API keys or environment variables in Vercel Project Settings, not in public source code.
