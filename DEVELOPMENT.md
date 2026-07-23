# Development & Architecture Guide

This file serves as a reference manual for developers (and future AI agents) to understand the architecture, tech stack, conventions, and hidden features of this portfolio project.

## 🛠️ Core Tech Stack
- **Framework**: Next.js 15+ (App Router) with React 19.
- **Styling**: Tailwind CSS + `globals.css` for custom variables and complex `@media print` rules.
- **Animations**: `framer-motion` (used extensively for page transitions in `template.tsx` and masonry grid animations).
- **Icons**: `lucide-react` for standard UI icons, and `react-icons` (specifically `FaGithub`, `FaLinkedin`, etc.) for brand icons.
- **Database**: Supabase (PostgreSQL). We use the standard `@supabase/supabase-js` client.

## 🗄️ Database Architecture (Supabase)
The backend consists of 4 primary tables:
1. `experiences`: Work history and roles. Supports parent "Companies" grouping multiple "Roles".
2. `projects`: Portfolio projects. Supports multiple tags, media arrays, and `rpRank` for custom sorting.
3. `achievements`: Awards and recognitions. Similar schema to projects.
4. `passkey_credentials`: Used to store public keys and hardware authenticators for the WebAuthn system.

*Note: The complete SQL schema used to generate these tables is documented in `supabase_schema.sql`.*

## 🔒 Admin Panel & Authentication Flow
To manage the database content without writing code, there is a built-in Admin Panel (`/admin`). It is highly secured.

### The "Easter Egg" Trigger
There are no visible links to the Admin panel on the live site.
To access it:
1. Scroll to the **Footer**.
2. Click the **RP Logo** exactly **4 times rapidly** (within 500ms).
3. Stop clicking. The UI will deliberately stall for **2 seconds** (to confuse accidental clickers).
4. You will then be automatically routed to `/admin/login`.

### Passkey Authentication (WebAuthn)
The Admin panel uses hardware-bound **Passkeys** (WebAuthn) instead of a password.
- **Libraries used**: `@simplewebauthn/server`, `@simplewebauthn/browser`, and `jose` (for JWTs).
- **How it works**:
  1. In `/admin/login`, the client requests a cryptographic challenge from `/api/auth/webauthn/authenticate/generate-options`.
  2. The browser prompts the user for biometrics (FaceID / Fingerprint).
  3. The signature is sent to `/api/auth/webauthn/authenticate/verify`.
  4. If the signature matches the `public_key` in the `passkey_credentials` table, the server generates a JWT using `jose` and sets an `httpOnly` cookie (`admin_token`).
- **Middleware**: `src/middleware.ts` intercepts all requests to `/admin/*`. If the `admin_token` is missing or invalid, it instantly redirects the user away.

### Registering New Devices
Because passkeys are hardware-bound, you must register every physical device (Phone, iPad, PC) you want to use.
- Navigate directly to `/admin/register-device`.
- Enter the hardcoded developer secret (`ramprakash_secret_2026`).
- Click the register button and provide your biometric. This saves the device's public key to the Supabase database.

## 🖼️ Media & Image Uploads
- **Cropping**: When adding images in the Admin Panel, we use `react-image-crop` to allow the user to crop images to standard aspect ratios (e.g., 4:3, 16:9) before uploading.
- **Storage**: Media files are hosted externally or in Supabase Storage, and the URLs are saved into the `media`, `homeCover`, `previewCover`, and `highlightCover` columns in the database.

## 📝 Conventions & Rules
- **Aesthetics First**: This project prioritizes visual excellence. Always use the predefined Tailwind palettes, glassmorphism (`bg-white/5 backdrop-blur`), and subtle hover effects (`hover:-translate-y-1 hover:shadow-2xl`).
- **Empty States**: If a database query returns empty (or filters hide all results), always display a beautifully styled "Empty State" component (with an icon and friendly text) rather than a blank screen.
- **Print Optimization**: Always ensure the `@media print` query in `globals.css` is maintained so that recruiters printing the page receive a clean, ink-saving, ATS-friendly document.
