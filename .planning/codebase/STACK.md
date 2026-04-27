# Technology Stack

**Analysis Date:** 2026-04-27

## Status: GREENFIELD PROJECT

**No source code exists yet.** This project is in the planning/requirements gathering phase. All documents are specification files, not implementation.

---

## Planned Stack (from TechStack.md)

### Frontend (Planned)

| Component | Technology | File Reference |
|-----------|-------------|----------------|
| Framework | React.js | `TechStack.md:36` |
| Language | JavaScript/React | `TechStack.md:37` |
| Styling | Tailwind CSS | `TechStack.md:38` |
| UI Components | Material UI | `TechStack.md:39` |
| Routing | React Router | `TechStack.md:40` |
| State Management | Context API / Redux Toolkit | `TechStack.md:41` |
| Forms | React Hook Form | `TechStack.md:42` |
| HTTP Client | Axios | `TechStack.md:43` |
| Build Tool | Vite | `TechStack.md:281` |
| PWA Support | Service Workers | `TechStack.md:358` |
| QR Functionality | html5-qrcode, qrcode.js | `TechStack.md:79-81` |

### Backend (Planned)

| Component | Technology | File Reference |
|-----------|-------------|----------------|
| Runtime | Node.js | `TechStack.md:104` |
| Framework | Express.js | `TechStack.md:105` |
| API Architecture | REST APIs | `TechStack.md:106` |
| Authentication | Firebase Auth | `TechStack.md:107` |
| File Uploads | Multer | `TechStack.md:108` |
| API Security | JWT | `TechStack.md:109` |
| Security | helmet, bcrypt, express-rate-limit | `TechStack.md:222-227` |

### Database (Planned)

| Component | Technology | File Reference |
|-----------|-------------|----------------|
| Database | MongoDB Atlas | `TechStack.md:127-144` |
| Collections | users, voter_records, booths, complaints, notifications, election_updates | `TechStack.md:151-157` |

### Cloud Services (Planned)

| Service | Use Case | File Reference |
|---------|----------|----------------|
| Firebase Authentication | Login/OTP | `TechStack.md:164-171` |
| Firebase Hosting | Frontend hosting | `TechStack.md:168` |
| Firebase Cloud Functions | Serverless functions | `TechStack.md:169` |
| Firebase Messaging | Push notifications | `TechStack.md:170` |
| Google Maps API | Polling booth maps | `TechStack.md:191-196` |
| Geolocation API | Nearby booth detection | `TechStack.md:193` |
| Translation API | Multilingual support | `TechStack.md:196` |

---

## Development Tools (Planned)

| Function | Tool | File Reference |
|----------|------|----------------|
| Version Control | GitHub | `TechStack.md:278` |
| API Testing | Postman | `TechStack.md:279` |
| Package Manager | npm | `TechStack.md:280` |
| Build Tool | Vite | `TechStack.md:281` |
| Code Quality | ESLint | `TechStack.md:282` |
| Formatting | Prettier | `TechStack.md:283` |
| CI/CD | GitHub Actions | `TechStack.md:288-294` |

---

## Deployment Architecture (Planned)

```
Frontend:  React App → Firebase Hosting
Backend:   Node API → Cloud Run / Render
Database:  MongoDB Atlas
APIs:      Google Cloud APIs
```

**From:** `TechStack.md:258-270`

---

## Key Dependencies (Planned)

### Frontend Packages

```json
// From TechStack.md:433-440
react-router-dom
axios
tailwindcss
@mui/material
react-hook-form
html5-qrcode
redux-toolkit
```

### Backend Packages

```json
// From TechStack.md:444-455
express
mongoose
firebase-admin
jsonwebtoken
bcryptjs
cors
dotenv
helmet
express-rate-limit
```

---

## Next Steps

1. **Initialize project structure** following `TechStack.md:406-426`
2. **Create package.json files** for both frontend and backend
3. **Set up folder structure** before implementation begins

---

*Stack analysis: 2026-04-27*