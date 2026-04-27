# Codebase Structure

**Analysis Date:** 2026-04-27

## Status: GREENFIELD PROJECT

**No source code exists yet.** This document captures the planned folder structure from TechStack.md.

---

## Project Root Structure (To Be Created)

```
matdata-mitra/
├── src/                    # Frontend React application
├── server/                 # Backend Node.js application
├── public/                 # Static assets
├── .env.example            # Environment template
├── package.json            # Root/package workspace
├── README.md               # Documentation
└── .gitignore              # Git ignore patterns
```

---

## Frontend Structure (src/)

```
src/
├── components/             # Reusable React components
│   ├── common/             # Shared components (Button, Card, Input)
│   ├── forms/              # Form components
│   ├── cards/              # Card components
│   └── layout/              # Layout components (Header, Footer, Sidebar)
├── pages/                  # Page-level components (routes)
│   ├── Home.jsx
│   ├── VoterSearch.jsx
│   ├── QRScanner.jsx
│   ├── BoothLocator.jsx
│   ├── Complaints.jsx
│   └── Admin/
│       ├── Dashboard.jsx
│       └── BLOView.jsx
├── modules/                # Feature modules
│   ├── voter-search/
│   ├── qr-scanner/
│   ├── booth-locator/
│   ├── complaints/
│   ├── awareness/
│   ├── election-updates/
│   └── admin/
├── services/               # API service layers
│   ├── api.js              # Axios instance configuration
│   ├── auth.service.js
│   ├── voter.service.js
│   ├── booths.service.js
│   └── complaints.service.js
├── hooks/                  # Custom React hooks
│   ├── useAuth.js
│   ├── useGeolocation.js
│   ├── useVoterSearch.js
│   └── useNotifications.js
├── store/                  # State management
│   ├── slices/             # Redux slices
│   │   ├── authSlice.js
│   │   ├── voterSlice.js
│   │   └── uiSlice.js
│   └── store.js            # Store configuration
├── utils/                  # Utility functions
│   ├── validators.js
│   ├── formatters.js
│   ├── constants.js
│   └── helpers.js
├── assets/                 # Static assets
│   ├── images/
│   └── icons/
├── styles/                 # Global styles
│   └── index.css
├── App.jsx                 # Main app component
├── main.jsx               # Entry point
└── routes.jsx             # Route definitions
```

**From:** `TechStack.md:407-414`

---

## Backend Structure (server/)

```
server/
├── routes/                 # Express route definitions
│   ├── auth.routes.js
│   ├── voter.routes.js
│   ├── booths.routes.js
│   ├── complaints.routes.js
│   ├── elections.routes.js
│   └── notifications.routes.js
├── controllers/            # Request handlers
│   ├── auth.controller.js
│   ├── voter.controller.js
│   ├── booths.controller.js
│   ├── complaints.controller.js
│   └── elections.controller.js
├── models/                 # Mongoose models
│   ├── User.js
│   ├── Voter.js
│   ├── Booth.js
│   ├── Complaint.js
│   ├── Notification.js
│   └── Election.js
├── middleware/             # Express middleware
│   ├── auth.middleware.js   # JWT verification
│   ├── rateLimiter.js      # Rate limiting
│   ├── validator.js        # Input validation
│   └── errorHandler.js     # Error handling
├── services/               # Business logic
│   ├── auth.service.js
│   ├── voter.service.js
│   ├── booths.service.js
│   ├── notification.service.js
│   └── qr.service.js
├── config/                  # Configuration files
│   ├── db.js               # MongoDB connection
│   ├── firebase.js         # Firebase admin setup
│   └── constants.js
├── utils/                  # Backend utilities
│   ├── jwt.js
│   └── validators.js
├── uploads/                # File uploads (Multer)
├── server.js               # Express server entry
└── package.json
```

**From:** `TechStack.md:418-425`

---

## Key File Locations (To Be Created)

| Purpose | Location |
|---------|----------|
| Entry Point (Frontend) | `src/main.jsx` |
| Entry Point (Backend) | `server/server.js` |
| API Configuration | `src/services/api.js` |
| Route Definitions | `src/routes.jsx` |
| Database Models | `server/models/` |
| API Routes | `server/routes/` |
| Components | `src/components/` |
| Pages | `src/pages/` |

---

## Naming Conventions (Planned)

| Type | Convention | Example |
|------|------------|---------|
| Files | kebab-case | `voter-search.jsx`, `auth-service.js` |
| Components | PascalCase | `VoterSearch.jsx`, `ComplaintForm.jsx` |
| Variables | camelCase | `searchResults`, `boothLocation` |
| Constants | UPPER_SNAKE | `API_BASE_URL`, `MAX_SEARCH_RESULTS` |
| CSS Classes | kebab-case | `voter-card`, `search-input` |
| API Endpoints | kebab-case | `/api/voter/search`, `/api/complaints/create` |

---

## Where to Add New Code

### New Feature Module
```
1. Create module directory: src/modules/[feature-name]/
2. Add components: src/modules/[feature-name]/components/
3. Add page: src/pages/[FeatureName].jsx
4. Add service: src/services/[feature].service.js
5. Add Redux slice: src/store/slices/[feature]Slice.js
6. Register route in routes.jsx
```

### New API Endpoint
```
1. Add route: server/routes/[resource].routes.js
2. Add controller: server/controllers/[resource].controller.js
3. Add model: server/models/[Resource].js
4. Add service: server/services/[resource].service.js
5. Register route in server.js
```

### New Component
```
1. Place in appropriate category:
   - src/components/common/     → generic components
   - src/components/forms/      → form elements
   - src/components/cards/      → card layouts
   - src/components/layout/     → structural components
```

---

## Special Directories

| Directory | Purpose | Generated | Committed |
|-----------|---------|-----------|-----------|
| `src/assets/` | Images, icons | No | Yes |
| `src/store/` | Redux state | No | Yes |
| `server/uploads/` | File uploads | Yes | No (gitignore) |
| `node_modules/` | Dependencies | Yes | No |
| `.next/` | Next.js build | Yes | No |
| `dist/` | Build output | Yes | No |

---

## Configuration Files (To Be Created)

| File | Purpose |
|------|---------|
| `package.json` | Dependencies and scripts |
| `.env.example` | Environment variable template |
| `vite.config.js` | Vite build configuration |
| `tailwind.config.js` | Tailwind CSS configuration |
| `eslint.config.js` | ESLint rules |
| `.prettierrc` | Code formatting |
| `jsconfig.json` | Path aliases |

---

## Next Steps for Setup

1. **Initialize Vite project** with React template
2. **Create folder structure** as outlined above
3. **Configure Tailwind CSS**
4. **Set up ESLint and Prettier**
5. **Create environment template**

---

*Structure analysis: 2026-04-27*