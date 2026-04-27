# Architecture

**Analysis Date:** 2026-04-27

## Status: GREENFIELD PROJECT

**No source code exists yet.** This document captures the planned architecture from TechStack.md.

---

## System Overview

### Architecture Model
**Mobile-First Responsive Web Application (PWA Ready)**

```
┌─────────────────────────────────────────────────────────────┐
│                      Frontend Web App                        │
│                    (React + Vite + PWA)                     │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌───────���──────┐  ┌──────────────────┐   │
│  │ Voter Search │  │  QR Scanner  │  │  Booth Locator   │   │
│  │   Module     │  │   Interface  │  │     Module       │   │
│  └──────────────┘  └──────────────┘  └──────────────────┘   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │  Complaint  │  │  Awareness    │  │  BLO/Admin       │   │
│  │  Reporting  │  │  Dashboard    │  │  Dashboard       │   │
│  └──────────────┘  └──────────────┘  └──────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│                    REST API Layer (Node/Express)             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │   /auth/*    │  │  /voter/*    │  │   /booths/*     │   │
│  │   /complaints│  │  /elections  │  │   /notifications│   │
│  └──────────────┘  └──────────────┘  └──────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│           ┌──────────────┐         ┌──────────────────┐   │
│           │  Firebase     │         │  MongoDB Atlas   │   │
│           │  Auth/Firestore│        │  (Collections)   │   │
│           └──────────────┘         └──────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

**From:** `TechStack.md:16-28`

---

## Frontend Modules (Planned)

| Module | Description | File Location |
|--------|-------------|----------------|
| Voter Search | Search and lookup voter information | `src/modules/voter-search/` |
| QR Scanner Interface | Scan voter QR codes | `src/modules/qr-scanner/` |
| Polling Booth Locator | Find nearby polling stations | `src/modules/booth-locator/` |
| Complaint Reporting | Submit and track complaints | `src/modules/complaints/` |
| Voter Awareness Dashboard | Educational content | `src/modules/awareness/` |
| Election Updates Module | News and notifications | `src/modules/election-updates/` |
| Admin/BLO Dashboard | Administrative interface | `src/modules/admin/` |

**From:** `TechStack.md:65-73`

---

## Backend Services (Planned)

| Service | Description | Route |
|---------|-------------|-------|
| User Authentication | Login/OTP/JWT | `/api/auth/*` |
| Voter Search API | Search voter records | `/api/voter/*` |
| QR Verification Service | Verify scanned QR data | `/api/auth/qr-verify` |
| Polling Booth Service | Booth data and location | `/api/booths/*` |
| Complaints Service | Complaint CRUD | `/api/complaints/*` |
| Notifications Service | Push notifications | `/api/notifications/*` |
| Election Data Service | Election updates | `/api/elections/*` |

**From:** `TechStack.md:113-121`

---

## Core REST API Endpoints (Planned)

### Authentication
```
POST   /api/auth/login      - User login
POST   /api/auth/otp        - OTP verification
POST   /api/auth/refresh    - Token refresh
POST   /api/auth/logout     - Logout
```

### Voter Services
```
GET    /api/voter/search    - Search voters
GET    /api/voter/lookup    - Lookup by ID
POST   /api/voter/register  - Register new voter assistance
```

### Polling Booth
```
GET    /api/booths/nearest  - Find nearest booths
GET    /api/booths/:id      - Get booth details
GET    /api/booths/:id/location - Get booth location
```

### Complaints
```
POST   /api/complaints/create - Create complaint
GET    /api/complaints/status - Check status
GET    /api/complaints/:id    - Get complaint details
PATCH  /api/complaints/:id    - Update complaint
```

### Election Info
```
GET    /api/elections/updates   - Get updates
GET    /api/elections/upcoming  - Upcoming elections
GET    /api/elections/:id       - Election details
```

**From:** `TechStack.md:301-320`

---

## Data Flow

### Primary Request Path: Voter Search
```
[User Interface] → [React Component] → [Axios API Call]
    → [Express Router] → [Controller] → [Service] → [MongoDB]
    → [Response] → [Redux/Context] → [UI Update]
```

### Authentication Flow
```
[Login Form] → [Firebase Auth / OTP] → [JWT Generation]
    → [Store Token] → [Protected Route Access]
```

### Complaint Submission Flow
```
[Complaint Form] → [Validation] → [POST /api/complaints]
    → [Store in MongoDB] → [Queue Notification] → [Return Success]
    → [Push Notification to Admin]
```

---

## Backend Folder Structure (Planned)

```
server/
├── routes/
│   ├── auth.routes.js
│   ├── voter.routes.js
│   ├── booths.routes.js
│   ├── complaints.routes.js
│   └── elections.routes.js
├── controllers/
│   ├── auth.controller.js
│   ├── voter.controller.js
│   ├── booths.controller.js
│   ├── complaints.controller.js
│   └── elections.controller.js
├── models/
│   ├── User.js
│   ├── Voter.js
│   ├── Booth.js
│   ├── Complaint.js
│   └── Election.js
├── middleware/
│   ├── auth.middleware.js
│   ├── rateLimiter.js
│   └── validator.js
├── services/
│   ├── auth.service.js
│   ├── voter.service.js
│   └── notification.service.js
├── config/
│   ├── db.js
│   └── firebase.js
└── server.js
```

**From:** `TechStack.md:418-425`

---

## Frontend Folder Structure (Planned)

```
src/
├── components/
│   ├── common/
│   ├── forms/
│   ├── cards/
│   └── layout/
├── pages/
│   ├── Home.jsx
│   ├── VoterSearch.jsx
│   ├── QRScanner.jsx
│   ├── BoothLocator.jsx
│   ├── Complaints.jsx
│   └── Admin/
├── services/
│   ├── api.js
│   └── auth.service.js
├── hooks/
│   ├── useAuth.js
│   └── useGeolocation.js
├── utils/
│   ├── validators.js
│   └── formatters.js
├── store/
│   ├── slices/
│   └── store.js
└── App.jsx
```

**From:** `TechStack.md:407-414`

---

## Security Architecture

| Layer | Implementation |
|-------|----------------|
| Authentication | Firebase Auth + JWT tokens |
| Authorization | Role-based access (RBAC) |
| API Security | Helmet.js + Rate Limiting |
| Transport | HTTPS/TLS |
| Input Validation | Express Validator |
| Secrets | Environment variables via dotenv |

**From:** `TechStack.md:211-220`

---

## Offline/PWA Architecture

| Feature | Implementation |
|---------|----------------|
| Service Workers | Cache static assets and API responses |
| Offline Pages | Pre-cached informational pages |
| Form Drafts | LocalStorage for incomplete forms |
| Sync | Background sync when online |

**Critical for rural connectivity scenarios.**

**From:** `TechStack.md:356-368`

---

## Next Steps for Implementation

1. **Initialize React project** with Vite
2. **Set up Express backend** with folder structure
3. **Configure MongoDB connection**
4. **Implement authentication flow**
5. **Build core modules incrementally**

---

*Architecture analysis: 2026-04-27*