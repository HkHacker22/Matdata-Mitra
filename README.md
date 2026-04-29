# Matdata Mitra 🇮🇳

Matdata Mitra is an open-source, mobile-first civic portal designed to provide citizens with seamless access to election services, polling booth locators, and government schemes. Built with a high-density, trustworthy aesthetic inspired by official government portals (like `india.gov.in`).

## 🌟 Features

*   **Polling Booth Heatmap:** Dynamic visualization of booth-level verification progress (Green/Yellow/Red status) using Google Maps integration.
*   **Voter Search:** Fast, fuzzy search for voter records using MongoDB text indexes.
*   **Booth Locator:** Geospatial search (`2dsphere`) to find the nearest polling station with accessibility facility details.
*   **Complaint Management:** Role-based dashboard for citizens to report issues with a **map-based location picker**.
*   **Election Updates & Notifications:** Centralized feed for system-wide election alerts.
*   **QR Code Integration:** Client-side QR scanning and generation for digital voter slips.
*   **High-Density Civic UI:** A fully responsive, accessible UI built with React, Tailwind, and Material UI, featuring an official Red/Saffron palette.

*For a detailed technical deep-dive into the architecture and API usage, read [explanation.md](./explanation.md).*

## 🏗️ Architecture

The application is split into two main parts:
1.  **Frontend (`/`)**: A React SPA built with Vite.
2.  **Backend (`/server`)**: A Node.js/Express REST API.

Data is stored in **MongoDB**, and Authentication is managed via **Firebase**.

*For a detailed breakdown of why these technologies were chosen, please read [TECH_EXPLANATION.md](./TECH_EXPLANATION.md).*

## 📸 How the QR Verification System Works

The Matdata Mitra QR Verification system bridges the gap between digital identity and physical booth verification. Here is how the end-to-end flow operates:

1. **Mandatory Identity Linking**: When a Citizen registers or logs in, they are intercepted by a global "Lock Screen". They must enter a valid EPIC ID (Voter ID) that exists in the database's `voters` collection (electoral rolls).
2. **Digital Voter Slip Generation**: Once linked, the citizen can access their profile menu and click **"Generate My QR"**. The system fetches their electoral details from the database and embeds their secure MongoDB `_id` into a dense QR Code.
3. **Physical Verification**: The citizen presents this QR Code at the polling booth on election day.
4. **BLO Scanning**: The Booth Level Officer (BLO) logs into the **BLO Dashboard** and opens the **QR Scanner**. Using their device camera, they scan the citizen's QR code.
5. **Secure Database Handshake**: The scanner decodes the `_id`, queries the backend database in real-time, and pulls up the voter's secure details. The BLO verifies the citizen's physical identity against the digital record and clicks **"Confirm Verification"**.
6. **Real-time Analytics**: The backend updates the voter's status to `verified: true`. The BLO Dashboard instantly reflects this change, decrementing the "Pending" count and incrementing the "Verified" count, while logging the verification timestamp and the BLO who performed it.

## 🚀 Getting Started

### Prerequisites
*   [Node.js](https://nodejs.org/) (v18 or higher)
*   A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) Cluster URI
*   A [Firebase Project](https://console.firebase.google.com/)

### 1. Clone & Install

**Install Frontend Dependencies:**
```bash
# In the root directory
npm install
```

**Install Backend Dependencies:**
```bash
cd server
npm install
cd ..
```

### 2. Environment Configuration

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
2. Open `.env` and configure your credentials:
   *   Add your Firebase Web App configuration.
   *   Add your MongoDB Connection URI (`MONGODB_URI`).
   *   Ensure a secure `JWT_SECRET` is set.

### 3. Seed the Database

Before running the app, populate your MongoDB database with initial mock data (Booths, Notifications, and an Admin user).

```bash
cd server
npm run seed
```

**Seed Mock Electoral Rolls (Voters for Verification):**
To test the EPIC ID Verification and QR Scanner systems, you need valid voters in the database:
```bash
cd server
node seedVoters.js
```
*This populates the database with mock voters. You can test linking your citizen account with these valid EPIC IDs: `ABC1234567`, `XYZ9876543`, `DEF3456789`, `GHI8765432`.*

**Add a new Booth Level Officer (BLO):**
To create a new BLO account for the BLO Dashboard:
```bash
cd server
node add-blo.js yourbloemail@example.com yourpassword123
```
*This script automatically creates a Firebase Auth user and adds their record with the `blo` role to MongoDB.*

### 4. Run the Application

You will need two terminal windows to run both the frontend and backend simultaneously in development mode.

**Terminal 1 (Backend API):**
```bash
cd server
npm run dev
```
*The API runs on `http://localhost:3001`.*

**Terminal 2 (Frontend Client):**
```bash
# In the project root
npm run dev
```
*The web app runs on `http://localhost:5173`.*

> **Note:** The Vite development server automatically proxies all requests from `/api/*` to the backend on port 3001.

## 🛠️ Production Deployment & Challenges

During the migration to production (Firebase), we encountered several enterprise-tier constraints that led to a creative architectural shift:

### **Challenges Faced**
1. **The Blaze Plan Wall**: Firebase Functions (v1 & v2) now require the **Blaze (Pay-as-you-go) plan** to deploy. This is due to the underlying dependency on Google Cloud Build and Artifact Registry APIs.
2. **Outbound Networking**: On the free **Spark plan**, Cloud Functions are restricted from making outbound network requests to non-Google services. This prevents the serverless backend from connecting to **MongoDB Atlas**.
3. **Routing Complexity**: Initial attempts to rewrite `/api` traffic to Functions resulted in `index.html` fallback loops when the Functions were blocked by billing requirements.

### **The Solution: "Demo Mode" Mock Architecture**
To ensure a fully functional **zero-cost deployment** for demonstrations, we implemented a sophisticated frontend fallback system:

- **Centralized API Client**: Refactored the entire application to use a custom `apiClient` (`src/api/client.js`) that wraps all network calls.
- **Production Interceptor**: In production mode, the client automatically intercepts `/api` requests and routes them to a local **Mock Service Layer** (`src/api/mockData.js`).
- **Live Demo Persistence**: This architecture allows the app to be hosted entirely on **Firebase Hosting (Free Tier)** while appearing fully functional, including Voter Search, Dashboard Analytics, and Complaint Management.
- **Future-Proofing**: The codebase remains "backend-ready." Simply toggling `USE_MOCKS = false` in the API client and deploying the `functions/` directory (on a Blaze plan) will activate the live MongoDB backend instantly.

## 📂 Project Structure

```text
matdata-mitra/
├── .env                  # Environment variables (do not commit)
├── requirements.txt      # Dependency overview
├── TECH_EXPLANATION.md   # Tech stack reasoning
├── server/               # Node.js Express Backend
│   ├── config/           # Database configuration
│   ├── middleware/       # JWT/Firebase Auth middleware
│   ├── models/           # Mongoose Data Schemas
│   ├── routes/           # REST API endpoints
│   ├── index.js          # API Entry Point
│   └── seed.js           # Database migration script
└── src/                  # React Frontend
    ├── api/              # Axios API clients
    ├── components/       # Reusable UI components
    ├── config/           # Firebase client initialization
    ├── pages/            # View components (Home, Dashboard, etc.)
    └── services/         # Legacy mock data services
```

## 🔒 Security

*   **Role-Based Access Control:** Strict, pre-authorized BLO (Booth Level Officer) roles are enforced at the database level to prevent privilege escalation. Only registered admins/BLOs can access sensitive areas.
*   **Router Locking:** The frontend uses a custom `ProtectedRoute` component to lock down sensitive dashboard routes, preventing unauthorized access by non-BLO users.
*   **Directory Enumeration Prevention:** Server-side middleware explicitly blocks access to dotfiles and prevents unauthorized path traversal vulnerabilities.
*   The backend utilizes `helmet` for HTTP header security and `express-rate-limit` to prevent brute-force attacks.
*   Authentication is secured via Firebase ID tokens validated securely on the backend via the Firebase Admin SDK.
*   Never commit your `.env` or `server/config/serviceAccountKey.json` files.

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!

## 📜 License
[MIT](LICENSE)
