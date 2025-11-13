# Login A/B Test Implementation Plan

## Overview

Implement A/B testing to compare two login page variants:

- **Variant A (Control)**: Login form with role dropdown selector
- **Variant B (Test)**: Login form without role dropdown - backend determines role automatically

## Implementation Steps

### 1. Create A/B Testing Utility Library

**File**: `src/lib/abTesting.ts`

Create a new utility for managing A/B test experiments:

- Define experiment configuration with variant split percentages
- Implement consistent variant assignment using hash-based algorithm
- Store variant assignments in localStorage for persistence
- Provide tracking functions for experiment events
- Support experiment configuration: `login_role_dropdown` with 50/50 split

**Key Functions**:

- `getExperimentVariant(experimentId, userId?)` - Returns "A" or "B" based on consistent hashing
- `trackExperimentEvent(experimentId, variant, event, metadata?)` - Logs experiment events
- `getVariantName(experimentId, variant)` - Returns readable variant name

### 2. Update Authentication Service

**File**: `src/lib/auth.ts`

Modify the `login` function to make role parameter optional:

- Change `role: AdminRole = "general_admin"` to `role?: AdminRole`
- Update role assignment logic priority:

1. Backend API response (when implemented)
2. Email pattern matching (current fallback)
3. Provided role parameter (for variant A backward compatibility)
4. Default to "general_admin"

- Ensure backward compatibility with existing code that passes role

### 3. Update Login Page Component

**File**: `src/app/login/page.tsx`

Integrate A/B testing into the login page:

- Import A/B testing utilities
- Add state for variant and `showRoleDropdown`
- Use `useEffect` to determine variant on mount (based on email or anonymous)
- Conditionally render role dropdown based on variant:
- Variant A: Show role dropdown (lines 130-150)
- Variant B: Hide role dropdown entirely
- Track experiment events:
- `page_view` - When login page loads
- `form_submit_start` - When user submits form
- `form_error` - On validation errors
- `login_success` - On successful authentication
- `login_failed` - On authentication failure
- `login_error` - On exceptions
- `role_selected` - When user selects role (variant A only)
- Update `handleSubmit` to pass `role` only for variant A, undefined for variant B
- Re-assign variant when email changes (for consistent user experience)

### 4. Analytics Integration (Optional)

**File**: `src/app/api/analytics/experiment/route.ts` (create if needed)

If backend tracking is desired:

- Create Next.js API route to receive experiment events
- Store events in database or analytics service
- Return success/error responses

### 5. Testing Considerations

- Update existing E2E tests in `tests/e2e/` to handle both variants
- Test variant assignment consistency (same email = same variant)
- Test localStorage persistence across sessions
- Verify role detection works correctly in variant B

## Files to Create

- `src/lib/abTesting.ts` - A/B testing utility library

## Files to Modify

- `src/lib/auth.ts` - Update login function signature and role assignment logic
- `src/app/login/page.tsx` - Integrate A/B testing and conditional rendering

## Key Metrics to Track

- Login success rate by variant
- Form completion time by variant
- Error rates by variant
- User preference (if applicable)

## Configuration

- Experiment ID: `"login_role_dropdown"`
- Default split: 50% variant A, 50% variant B
- Variant assignment: Consistent hash based on email (or anonymous ID)
- Storage: localStorage for variant persistence

## Rollback Plan

- Set `variantBSplit` to 0 in `abTesting.ts` to disable variant B
- Or remove conditional rendering to always show variant A

## Future Enhancements

- Admin dashboard to view experiment results
- Dynamic split percentage adjustment
- Multiple concurrent experiments support
- Integration with external analytics services (Google Analytics, Mixpanel, etc.)
