# Testing Guide

This document provides comprehensive information about testing in the Surro Web application, including how to run tests, write new tests, and follow TDD practices.

## Table of Contents

- [Overview](#overview)
- [Running Tests](#running-tests)
- [Test Structure](#test-structure)
- [Writing Tests](#writing-tests)
- [E2E Testing](#e2e-testing)
- [Unit Testing](#unit-testing)
- [Test Helpers](#test-helpers)
- [Debugging Tests](#debugging-tests)
- [TDD Workflow](#tdd-workflow)
- [Best Practices](#best-practices)

## Overview

This project uses two testing frameworks:

- **Playwright** - For end-to-end (E2E) testing
- **Vitest** - For unit and component testing

### Test Types

- **E2E Tests** (`tests/e2e/`) - Test complete user flows in a real browser
- **Unit Tests** (`src/**/*.test.ts`) - Test individual functions and components
- **Integration Tests** (`tests/integration/`) - Test component interactions

## Running Tests

### E2E Tests (Playwright)

```bash
# Run all E2E tests
pnpm test:e2e

# Run E2E tests in UI mode (interactive)
pnpm test:e2e:ui

# Run E2E tests in headed mode (see browser)
pnpm test:e2e:headed

# Run specific test file
pnpm test:e2e tests/e2e/user-management/approvals.spec.ts

# Run tests in a specific browser
pnpm test:e2e --project=chromium
```

### Unit Tests (Vitest)

```bash
# Run all unit tests
pnpm test:unit

# Run tests in watch mode (TDD)
pnpm test:watch

# Run tests with UI
pnpm test:unit:ui

# Run tests in CI mode
pnpm test:unit --run
```

### All Tests (CI)

```bash
# Run all tests (E2E + Unit)
pnpm test:ci
```

## Test Structure

```
tests/
├── e2e/                    # End-to-end tests
│   └── user-management/    # Feature-based test organization
│       └── approvals.spec.ts
├── fixtures/               # Test data and fixtures
│   └── users.ts
├── setup/                  # Test setup files
│   ├── playwright-setup.ts
│   └── vitest-setup.ts
└── utils/                  # Test utilities and helpers
    └── test-helpers.ts
```

## Writing Tests

### E2E Test Example

```typescript
import { test, expect } from '@playwright/test';
import { loginAsAdmin, navigateToApprovals } from '../../utils/test-helpers';

test('should approve a user', async ({ page }) => {
  // Setup
  await loginAsAdmin(page, 'super@admin.com', 'password123', 'super_admin');
  await navigateToApprovals(page);
  
  // Action
  const approveButton = page.locator('button').filter({ hasText: 'Approve' });
  await approveButton.click();
  
  // Assertion
  await expect(page.locator('text=Document Approved')).toBeVisible();
});
```

### Unit Test Example

```typescript
import { describe, it, expect } from 'vitest';
import { getUserById } from '@/lib/userManagement';

describe('getUserById', () => {
  it('should return user when found', () => {
    const user = getUserById('#6548');
    expect(user).toBeDefined();
    expect(user?.id).toBe('#6548');
  });

  it('should return undefined when not found', () => {
    const user = getUserById('nonexistent');
    expect(user).toBeUndefined();
  });
});
```

## E2E Testing

### Playwright Configuration

Playwright is configured in `playwright.config.ts`. The configuration:

- Starts the Next.js dev server automatically
- Runs tests in parallel
- Uses Chrome, Firefox, and Safari by default
- Generates HTML reports

### Test Helpers

Common E2E test helpers are available in `tests/utils/test-helpers.ts`:

- `loginAsAdmin()` - Login as a specific admin role
- `setupTestUsers()` - Setup test user data
- `navigateToApprovals()` - Navigate to approvals page
- `waitForToast()` - Wait for toast notifications
- `logout()` - Logout from the application

### Example E2E Test Flow

```typescript
test('complete approval flow', async ({ page }) => {
  // 1. Setup test data
  await setupTestUsers(page);
  
  // 2. Login
  await loginAsAdmin(page);
  
  // 3. Navigate
  await navigateToApprovals(page);
  
  // 4. Interact
  await page.click('input[type="checkbox"]');
  await page.click('button:has-text("Bulk Approve")');
  
  // 5. Verify
  await expect(page.locator('text=Bulk Approval Complete')).toBeVisible();
});
```

## Unit Testing

### Vitest Configuration

Vitest is configured in `vitest.config.ts`. The configuration:

- Uses jsdom for browser environment simulation
- Supports TypeScript and JSX
- Includes path aliases (`@/*`)
- Runs tests in watch mode by default

### Component Testing

```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MyComponent from '@/components/MyComponent';

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

## Test Helpers

### Authentication Helpers

```typescript
// Login as super admin
await loginAsAdmin(page, 'super@admin.com', 'password123', 'super_admin');

// Login as specific role
await loginAsAdmin(page, 'admin@example.com', 'password', 'general_admin');
```

### Data Setup Helpers

```typescript
// Setup test users
await setupTestUsers(page);

// Clear test data
await clearTestData(page);
```

### Navigation Helpers

```typescript
// Navigate to approvals page
await navigateToApprovals(page);

// Wait for toast notification
await waitForToast(page, 'Document Approved');
```

## Debugging Tests

### Debugging E2E Tests

1. **Use Playwright UI Mode:**
   ```bash
   pnpm test:e2e:ui
   ```

2. **Use Headed Mode:**
   ```bash
   pnpm test:e2e:headed
   ```

3. **Add Debugger:**
   ```typescript
   await page.pause(); // Pauses test execution
   ```

4. **Screenshot on Failure:**
   ```typescript
   test('my test', async ({ page }) => {
     await page.screenshot({ path: 'screenshot.png' });
   });
   ```

5. **View Trace:**
   ```bash
   npx playwright show-trace trace.zip
   ```

### Debugging Unit Tests

1. **Use Vitest UI:**
   ```bash
   pnpm test:unit:ui
   ```

2. **Add Debugger:**
   ```typescript
   debugger; // Pauses execution in debugger
   ```

3. **Use Console Logs:**
   ```typescript
   console.log('Debug value:', value);
   ```

## TDD Workflow

### Red-Green-Refactor Cycle

1. **Red** - Write a failing test
   ```typescript
   test('should approve user', async ({ page }) => {
     // Test that currently fails
   });
   ```

2. **Green** - Write minimal code to pass
   ```typescript
   // Implement just enough to make test pass
   ```

3. **Refactor** - Improve code while keeping tests green
   ```typescript
   // Clean up, optimize, improve structure
   ```

### TDD Process

1. **Write Test First** - Define the expected behavior
2. **Run Test** - Verify it fails (Red)
3. **Implement Feature** - Write minimal code to pass
4. **Run Test** - Verify it passes (Green)
5. **Refactor** - Improve code quality
6. **Repeat** - Continue with next feature

### Example TDD Flow

```typescript
// 1. Write failing test
test('should show review modal', async ({ page }) => {
  await loginAsAdmin(page);
  await navigateToApprovals(page);
  await page.click('button:has-text("Review Selected")');
  await expect(page.locator('[role="dialog"]')).toBeVisible();
});

// 2. Run test (it fails)

// 3. Implement feature
// Add Review Selected button handler

// 4. Run test (it passes)

// 5. Refactor if needed
```

## Best Practices

### Test Organization

- **Group related tests** using `test.describe()`
- **Use descriptive test names** that explain what is being tested
- **Follow Arrange-Act-Assert pattern**
- **Keep tests independent** - each test should be able to run alone

### Test Data

- **Use fixtures** for reusable test data
- **Clean up after tests** - use `afterEach` hooks
- **Isolate test data** - don't rely on shared state

### Selectors

- **Prefer role-based selectors:**
  ```typescript
  page.locator('button', { name: 'Submit' })
  page.locator('[role="dialog"]')
  ```

- **Avoid brittle selectors:**
  ```typescript
  // Bad
  page.locator('div:nth-child(3) > button')
  
  // Good
  page.locator('button:has-text("Approve")')
  ```

### Assertions

- **Be specific:**
  ```typescript
  // Good
  await expect(page.locator('text=Document Approved')).toBeVisible();
  
  // Avoid
  await expect(page.locator('body')).toContainText('Approved');
  ```

### Performance

- **Use `waitFor` strategically:**
  ```typescript
  await page.waitForSelector('button');
  await page.waitForLoadState('networkidle');
  ```

- **Avoid unnecessary waits:**
  ```typescript
  // Bad
  await page.waitForTimeout(5000);
  
  // Good
  await page.waitForSelector('button', { state: 'visible' });
  ```

### Error Handling

- **Use meaningful error messages:**
  ```typescript
  expect(user).toBeDefined();
  expect(user?.name).toBe('John Doe');
  ```

- **Test error cases:**
  ```typescript
  test('should handle invalid input', async () => {
    // Test error handling
  });
  ```

## Test Naming Conventions

- **Use descriptive names:**
  ```typescript
  test('should approve user when admin clicks approve button')
  test('should display error message when login fails')
  ```

- **Follow pattern: should [action] when [condition]**
  ```typescript
  test('should redirect to dashboard when login succeeds')
  test('should show modal when review selected is clicked')
  ```

## Continuous Integration

Tests are configured to run in CI/CD pipelines. The `test:ci` script runs both E2E and unit tests.

### CI Configuration

```yaml
# Example GitHub Actions workflow
- name: Run tests
  run: pnpm test:ci
```

## Troubleshooting

### Common Issues

1. **Tests fail in CI but pass locally:**
   - Check for timing issues
   - Verify test data isolation
   - Ensure proper cleanup

2. **Playwright tests timeout:**
   - Increase timeout in config
   - Check if dev server starts correctly
   - Verify network conditions

3. **Unit tests fail with module errors:**
   - Check path aliases in `vitest.config.ts`
   - Verify imports are correct
   - Ensure test setup files are included

## Additional Resources

- [Playwright Documentation](https://playwright.dev/)
- [Vitest Documentation](https://vitest.dev/)
- [Testing Library Documentation](https://testing-library.com/)
- [TDD Best Practices](https://www.agilealliance.org/glossary/tdd/)

