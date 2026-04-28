# Matdata Mitra: Technical Explanation 🇮🇳

Matdata Mitra is a sophisticated civic engagement portal designed to streamline election-related services in India. This document provides a deep dive into the technical architecture, technology stack, and API implementation.

## 🚀 Technology Stack

### Frontend
- **React (Vite)**: Modern, high-performance library for building the user interface.
- **Material UI (MUI)**: Used for the core component library, providing a clean, accessible, and professional look.
- **Tailwind CSS**: Utilized for utility-first styling and fine-grained layout control.
- **Google Maps JavaScript API**: Powers the Polling Booth Locator with custom markers, info windows, and geospatial visualization.
- **Firebase Auth SDK**: Handles secure client-side authentication (Email/Password and Phone OTP).
- **html5-qrcode**: A lightweight library for scanning QR codes directly in the browser via the device camera.
- **QRCode.js**: Generates secure, high-density QR codes for digital voter slips.

### Backend
- **Node.js & Express**: A fast, unopinionated web framework for the REST API.
- **MongoDB & Mongoose**: NoSQL database used for flexible data modeling and advanced geospatial queries.
- **Firebase Admin SDK**: Securely verifies client-side authentication tokens and manages user roles server-side.
- **JSON Web Token (JWT)**: Used for stateless session management after initial Firebase authentication.
- **Security Middleware**:
  - **Helmet**: Secures HTTP headers.
  - **Express Rate Limit**: Prevents brute-force attacks on sensitive endpoints.
  - **Custom Middleware**: Blocks directory enumeration and unauthorized path traversal.

## 🏗️ Core Features & Logic

### 1. Identity Linking (The "Voter Lock")
To ensure every user on the portal corresponds to a real voter:
- Upon login, citizens are presented with a mandatory profile completion screen.
- They must enter a valid **EPIC ID** (Voter ID).
- The backend verifies this ID against the **Electoral Rolls** (Voter collection in MongoDB).
- Only after successful linking is the citizen allowed to access features like QR generation.

### 2. QR Verification System
A digital-to-physical verification flow:
- **Generation**: The citizen's profile fetches their voter record and encodes their unique database `_id` into a QR code.
- **Scanning**: The Booth Level Officer (BLO) uses the `QRScanner` component to decode the ID.
- **Validation**: The backend fetches the voter details, ensures they haven't already been verified, and logs the verification timestamp.
- **Real-time Sync**: The BLO Dashboard updates instantly as verifications happen.

### 3. Polling Booth Locator & Heatmaps
A geospatial feature for finding and analyzing booth performance:
- **Geospatial Queries**: Uses MongoDB's `$near` operator with a `2dsphere` index to find the 10 closest booths to a user's location.
- **Heatmap Logic**: The map calculates the verification ratio (Verified / Total Voters) for each booth.
  - 🟢 **Green**: High verification rate (e.g., > 80%).
  - 🟡 **Yellow**: Medium verification rate.
  - 🔴 **Red**: Low verification rate or no activity.
- **Interactive Map**: Built with `@react-google-maps/api`, featuring custom pin icons and detailed info windows.

### 4. Citizen Complaint System
- Citizens can report issues (EVM malfunction, booth intimidation, etc.).
- **Map Picker**: Integrated Google Map allows users to pin the exact location of the issue.
- **BLO Resolution**: BLOs see these complaints in their dashboard and can update the status (Pending -> Resolved) with resolution notes.

## 🔌 API Reference (Server-side)

### Authentication
- `POST /api/auth/verify-token`: Swaps a Firebase ID token for a custom JWT and initializes the user profile.
- `PATCH /api/auth/profile`: Links an EPIC ID to a user's account.

### Voters
- `GET /api/voters/search?q={query}`: Fuzzy search across the electoral roll.
- `GET /api/voters/dashboard/stats`: Returns verification analytics for the BLO.
- `POST /api/voters/:id/verify`: Marks a voter as physically verified.

### Polling Booths
- `GET /api/booths/search`: Search booths by name or constituency.
- `GET /api/booths/nearest?lat={lat}&lng={lng}`: Find booths by proximity.
- `GET /api/booths/map-data`: Fetches all booths with aggregated verification statistics for map visualization.

### Complaints
- `POST /api/complaints`: Submit a new complaint with location data.
- `GET /api/complaints`: Fetch complaints (filtered by role).
- `PATCH /api/complaints/:id`: Update complaint status and add resolution.

---

## 🛠️ Developer Operations

### Seeding Data
The project includes automated scripts to populate the environment:
- `npm run seed`: Seeds polling booths and system notifications.
- `node seedVoters.js`: Populates the electoral roll with mock voters.
- `node add-blo.js <email> <password>`: Manually creates a BLO account for testing.

### Security Best Practices
- **Never** commit the `serviceAccountKey.json`.
- Environment variables are managed in `.env`.
- All routes are protected by JWT and role-based authorization (BLO/Admin).
