# Matdata Mitra 🇮🇳

Matdata Mitra is an open-source, mobile-first civic portal designed to provide citizens with seamless access to election services, polling booth locators, and government schemes. Built with a high-density, trustworthy aesthetic inspired by official government portals (like `india.gov.in`).

## 🌟 Features

*   **Voter Search:** Fast, fuzzy search for voter records using MongoDB text indexes.
*   **Booth Locator:** Geospatial search (`2dsphere`) to find the nearest polling station with accessibility facility details.
*   **Complaint Management:** Role-based dashboard for citizens to report issues and Booth Level Officers (BLOs) to track and resolve them.
*   **Election Updates & Notifications:** Centralized feed for system-wide election alerts.
*   **QR Code Integration:** Client-side QR scanning and generation for digital voter slips.
*   **High-Density Civic UI:** A fully responsive, accessible UI built with React, Tailwind, and Material UI, featuring an official Red/Saffron palette.

## 🏗️ Architecture

The application is split into two main parts:
1.  **Frontend (`/`)**: A React SPA built with Vite.
2.  **Backend (`/server`)**: A Node.js/Express REST API.

Data is stored in **MongoDB**, and Authentication is managed via **Firebase**.

*For a detailed breakdown of why these technologies were chosen, please read [TECH_EXPLANATION.md](./TECH_EXPLANATION.md).*

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

Before running the app, populate your MongoDB database with initial mock data (Voters, Booths, Notifications, and an Admin user).

```bash
cd server
npm run seed
```

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

*   The backend utilizes `helmet` for HTTP header security and `express-rate-limit` to prevent brute-force attacks.
*   Authentication is secured via Firebase ID tokens validated securely on the backend via the Firebase Admin SDK.
*   Never commit your `.env` or `server/config/serviceAccountKey.json` files.

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!

## 📜 License
[MIT](LICENSE)
