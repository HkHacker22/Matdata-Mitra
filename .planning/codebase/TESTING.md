# Testing Patterns

**Analysis Date:** 2026-04-27

## Status: GREENFIELD PROJECT

**No tests exist yet.** This document captures the testing approach to implement.

---

## Test Framework (To Be Implemented)

### Recommended Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| Test Runner | Vitest | Fast, Vite-native testing |
| Assertions | Built-in Vitest | Assertions |
| React Testing | @testing-library/react | Component testing |
| API Testing | Supertest | Backend endpoint testing |
| Coverage | v8 | Code coverage |
| E2E Testing | Playwright | End-to-end tests |

**Note:** Vitest is preferred over Jest for Vite-based projects due to better integration.

---

## Test File Organization (To Be Implemented)

### Location Pattern
```
src/
├── components/
│   └── VoterCard/
│       ├── VoterCard.jsx
│       ├── VoterCard.test.jsx      # Unit tests
│       └── VoterCard.stories.jsx   # Storybook stories
├── services/
│   └── voter.service.js
│   └── voter.service.test.js
server/
├── controllers/
│   └── voter.controller.js
│   └── voter.controller.test.js
tests/
├── setup.js                        # Test setup
├── fixtures/                       # Test data
│   ├── users.js
│   └── voters.js
├── integration/
│   └── api.test.js
└── e2e/
    └── voter-search.spec.js
```

### Naming Convention
- **Unit tests:** `[ComponentName].test.jsx`
- **Service tests:** `[serviceName].service.test.js`
- **E2E tests:** `[feature].spec.js`

---

## Test Structure (To Be Implemented)

### Unit Test Pattern
```javascript
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { VoterCard } from './VoterCard';

describe('VoterCard', () => {
  const mockVoter = {
    id: '1',
    name: 'John Doe',
    booth: 'Booth 42',
    address: '123 Main St'
  };

  it('renders voter name', () => {
    render(<VoterCard voter={mockVoter} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('shows booth information', () => {
    render(<VoterCard voter={mockVoter} />);
    expect(screen.getByText('Booth 42')).toBeInTheDocument();
  });

  it('calls onViewDetails when clicked', () => {
    const onViewDetails = vi.fn();
    render(<VoterCard voter={mockVoter} onViewDetails={onViewDetails} />);
    fireEvent.click(screen.getByRole('button', { name: /view details/i }));
    expect(onViewDetails).toHaveBeenCalledWith('1');
  });
});
```

### Integration Test Pattern
```javascript
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { app } from '../server.js';

describe('GET /api/voter/search', () => {
  it('returns voters matching search criteria', async () => {
    const response = await request(app)
      .get('/api/voter/search')
      .query({ name: 'John' })
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveLength(2);
  });

  it('returns 400 for invalid search params', async () => {
    const response = await request(app)
      .get('/api/voter/search')
      .query({ limit: -1 })
      .expect(400);

    expect(response.body.success).toBe(false);
  });
});
```

---

## Mocking (To Be Implemented)

### What to Mock
- External APIs (Firebase, Google Maps)
- Database calls (use mocks)
- Complex calculations
- Time-dependent code

### What NOT to Mock
- Pure utility functions
- Simple transformations
- The components being tested
- Internal utilities being tested

### Mocking Patterns
```javascript
import { vi } from 'vitest';
import * as authService from '../services/auth.service';

// Mock an entire module
vi.mock('../services/auth.service', () => ({
  login: vi.fn().mockResolvedValue({ token: 'test-token' }),
  logout: vi.fn().mockResolvedValue(true)
}));

// Mock Firebase
vi.mock('../config/firebase', () => ({
  auth: {
    signInWithPhoneNumber: vi.fn()
  }
}));

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate
  };
});
```

---

## Fixtures and Factories (To Be Implemented)

### Test Data Fixtures
```javascript
// tests/fixtures/voters.js
export const mockVoter = {
  id: 'voter-001',
  name: 'Rajesh Kumar',
  age: 35,
  gender: 'Male',
  fatherName: 'Shyam Kumar',
  address: '123 Gandhi Nagar',
  boothNumber: '42A',
  boothName: 'Primary School No. 5',
  assemblyConstituency: 'Delhi Cantt',
  parliamentaryConstituency: 'New Delhi',
  voterId: 'ABC123456789'
};

export const mockVoters = [
  mockVoter,
  {
    id: 'voter-002',
    name: 'Priya Sharma',
    // ... more fields
  }
];

export const createMockVoter = (overrides = {}) => ({
  ...mockVoter,
  ...overrides
});
```

---

## Run Commands (To Be Implemented)

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- VoterCard.test.jsx

# Run E2E tests
npx playwright test

# Open Playwright UI
npx playwright test --ui
```

---

## Coverage Requirements

### Target
- **Minimum:** 70% coverage overall
- **Critical paths:** 90% (auth, CRUD operations)

### What's Covered
| Type | Coverage Goal |
|------|---------------|
| Components | Props render correctly |
| Hooks | State updates correctly |
| Services | API calls correct |
| Utilities | All branches covered |
| Routes | All endpoints hit |

### Coverage Report
```bash
npm test -- --coverage
# Opens HTML report at coverage/index.html
```

---

## Test Types (To Be Implemented)

### Unit Tests
- **Scope:** Individual functions, components
- **Dependencies:** Mocked
- **Fast:** < 100ms per test
- **Location:** Colocated with source files

### Integration Tests
- **Scope:** API endpoints, flows
- **Dependencies:** Real database (test DB)
- **Medium:** ~500ms per test
- **Location:** `tests/integration/`

### E2E Tests (Playwright)
- **Scope:** User journeys
- **Dependencies:** Full stack running
- **Slow:** ~5-10s per test
- **Location:** `tests/e2e/`

---

## Common Patterns (To Be Implemented)

### Async Testing
```javascript
it('fetches voter list', async () => {
  const result = await voterService.searchVoters({ name: 'John' });
  expect(result).toHaveLength(5);
});

// With async/await and resolves/rejects
it('handles API errors', async () => {
  vi.spyOn(api, 'get').mockRejectedValue(new Error('Network error'));
  await expect(fetchVoters()).rejects.toThrow('Network error');
});
```

### Error Testing
```javascript
it('shows error message on failure', async () => {
  const mockError = { response: { data: { message: 'Not found' } } };
  render(<VoterSearch onError={console.log} />);
  // Simulate error condition
  expect(screen.getByRole('alert')).toHaveTextContent('Not found');
});
```

### User Interaction Testing
```javascript
it('searches when Enter is pressed', () => {
  render(<SearchInput onSearch={handleSearch} />);
  fireEvent.change(screen.getByRole('textbox'), { target: { value: 'John' } });
  fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter' });
  expect(handleSearch).toHaveBeenCalledWith('John');
});
```

---

## CI/CD Integration (To Be Implemented)

```yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test -- --coverage
      - uses: codecov/codecov-action@v3
```

---

*Testing analysis: 2026-04-27*