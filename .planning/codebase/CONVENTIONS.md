# Coding Conventions

**Analysis Date:** 2026-04-27

## Status: GREENFIELD PROJECT

**No source code exists yet.** This document captures planned conventions to follow during implementation.

---

## Naming Patterns (Planned)

### Files
| Type | Pattern | Example |
|------|---------|---------|
| React Components | PascalCase + .jsx | `VoterSearch.jsx` |
| Hooks | camelCase + use prefix | `useAuth.js`, `useGeolocation.js` |
| Services | camelCase + .service.js | `auth.service.js` |
| Utilities | camelCase + .js | `validators.js`, `formatters.js` |
| Styles | Match component name | `VoterSearch.css` |
| Tests | Same name + .test.jsx | `VoterSearch.test.jsx` |

### Functions
- **Naming:** `verbNoun` pattern
- **Examples:** `fetchVoters()`, `submitComplaint()`, `validateForm()`

### Variables
- **Pattern:** camelCase
- **Examples:** `searchResults`, `userToken`, `boothLocation`

### Types/Interfaces (TypeScript if used)
- **Pattern:** PascalCase
- **Examples:** `VoterRecord`, `UserRole`, `BoothLocation`

---

## Code Style (Planned)

### Formatting
- **Tool:** Prettier
- **Config File:** `.prettierrc`
- **Key Settings:**
  - Print width: 100
  - Semi-colons: Yes
  - Single quotes: Yes
  - Trailing commas: All
  - Tab width: 2

### Linting
- **Tool:** ESLint
- **Config File:** `eslint.config.js`
- **Key Rules:**
  - No unused variables
  - Prop types required
  - Consistent import order

---

## Import Organization (Planned)

```javascript
// 1. External libraries (React, etc.)
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 2. UI libraries
import { Button, TextField, Card } from '@mui/material';

// 3. Internal services
import { authService } from '../services/auth.service';
import { voterService } from '../services/voter.service';

// 4. Internal components
import { VoterCard } from '../components/cards/VoterCard';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

// 5. Hooks and utilities
import { useAuth } from '../hooks/useAuth';
import { formatDate } from '../utils/formatters';

// 6. Types (if using TypeScript)
// import type { Voter } from '../types/voter';
```

**Path aliases to be configured:**
- `@components/*` → `src/components/*`
- `@services/*` → `src/services/*`
- `@hooks/*` → `src/hooks/*`
- `@utils/*` → `src/utils/*`

---

## Error Handling (Planned)

### Frontend Pattern
```javascript
try {
  const result = await apiCall();
  // Handle success
} catch (error) {
  if (error.response) {
    // Server responded with error
    showNotification(error.response.data.message, 'error');
  } else if (error.request) {
    // Request made but no response
    showNotification('Network error. Please check your connection.', 'error');
  } else {
    // Something else went wrong
    showNotification(error.message, 'error');
  }
}
```

### Backend Pattern
```javascript
// Use async wrapper or try-catch in controllers
// Return consistent error format
{
  success: false,
  error: {
    code: 'VOTER_NOT_FOUND',
    message: 'Voter record not found'
  }
}
```

---

## Logging (Planned)

### Frontend
- Use `console.log` sparingly (development only)
- Remove all logs before production
- Use React DevTools for debugging

### Backend
```javascript
// Use a logging library like winston or pino
// Log levels: error, warn, info, debug
// Include: timestamp, request ID, user ID, action, data
```

---

## Comments (Planned)

### When to Comment
- Complex business logic
- Non-obvious workarounds
- API contract assumptions
- Accessibility requirements

### JSDoc/TSDoc
```javascript
/**
 * Searches for voters based on search criteria
 * @param {Object} criteria - Search parameters
 * @param {string} criteria.name - Voter name (optional)
 * @param {string} criteria.booth - Booth number (optional)
 * @returns {Promise<Voter[]>} Array of matching voters
 */
async function searchVoters(criteria) {
  // Implementation
}
```

---

## Function Design (Planned)

### Size Guidelines
- **Maximum:** ~50 lines per function
- **Ideal:** Single responsibility
- **Split larger functions** into smaller helpers

### Parameters
- **Maximum:** 3-4 parameters
- **Use object destructuring** for more:
```javascript
// Bad
function fetchVoters(name, booth, age, gender, state, district, pincode)

// Good
function fetchVoters({ name, booth, age, gender, state, district, pincode })
```

### Return Values
- Return consistent data structures
- Return `null` or `[]` for empty, not `undefined`
- Use throwing for errors, not return codes

---

## Module Design (Planned)

### Exports
```javascript
// Named exports for utilities
export { formatDate, validatePhone, generateQR };

// Default export for components
export default VoterCard;

// Barrel exports in index.js
export { VoterCard } from './VoterCard';
export { VoterList } from './VoterList';
```

### Barrel Files
- Use `index.js` in directories for clean imports
- Avoid deep barrel files (import chain issues)
- Prefer direct imports for performance

---

## Git Commit Conventions (Planned)

```
feat([module]): add voter search functionality
fix([module]): handle empty search results
refactor([module]): simplify auth flow
test([module]): add unit tests for voter service
docs([module]): update API documentation
chore(deps): upgrade to React 18
```

---

## Accessibility Conventions (Planned)

- All images must have `alt` text
- Interactive elements must be keyboard accessible
- Use semantic HTML (`<button>`, `<nav>`, `<main>`)
- Include ARIA labels where needed
- Maintain color contrast ratios (WCAG AA)

---

## Security Conventions (Planned)

- Never store sensitive data in localStorage
- Use HTTPS for all API calls
- Validate all user input (client and server)
- Sanitize user-generated content
- Keep dependencies updated

---

*Convention analysis: 2026-04-27*