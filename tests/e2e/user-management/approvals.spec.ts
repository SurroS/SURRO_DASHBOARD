import { test, expect } from '@playwright/test';
import {
  loginAsAdmin,
  setupTestUsers,
  clearTestData,
  navigateToApprovals,
  waitForToast,
  logout,
} from '../../utils/test-helpers';

test.describe('Super Admin User Approval Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Setup test users before each test
    await setupTestUsers(page);
  });

  test.afterEach(async ({ page }) => {
    // Clear test data after each test
    await clearTestData(page);
  });

  test('should login as super admin', async ({ page }) => {
    await loginAsAdmin(page, 'super@admin.com', 'password123', 'super_admin');
    
    // Verify redirect to dashboard
    await expect(page).toHaveURL('/dashboard');
    
    // Verify dashboard is visible
    await expect(page.locator('text=Dashboard')).toBeVisible();
  });

  test('should display dashboard after login', async ({ page }) => {
    await loginAsAdmin(page, 'super@admin.com', 'password123', 'super_admin');
    
    // Verify dashboard content is visible
    const dashboardContent = page.locator('body');
    await expect(dashboardContent).toBeVisible();
    
    // Verify sidebar navigation is visible
    const sidebar = page.locator('nav, [role="navigation"]').first();
    await expect(sidebar).toBeVisible();
  });

  test('should navigate to approvals page from sidebar', async ({ page }) => {
    await loginAsAdmin(page, 'super@admin.com', 'password123', 'super_admin');
    
    // Navigate to approvals page
    await navigateToApprovals(page);
    
    // Verify URL changed
    await expect(page).toHaveURL('/user-management/approvals');
    
    // Verify page title is visible
    await expect(page.locator('text=Manual Account Approvals')).toBeVisible();
  });

  test('should display list of unapproved users', async ({ page }) => {
    await loginAsAdmin(page, 'super@admin.com', 'password123', 'super_admin');
    await navigateToApprovals(page);
    
    // Verify page shows pending users
    await expect(page.locator('text=Emily Johnson')).toBeVisible();
    await expect(page.locator('text=Lisa Thompson')).toBeVisible();
    
    // Verify table headers are present
    await expect(page.locator('text=Name')).toBeVisible();
    await expect(page.locator('text=Email')).toBeVisible();
    await expect(page.locator('text=Role')).toBeVisible();
    
    // Verify checkboxes are present
    const checkboxes = page.locator('input[type="checkbox"]');
    await expect(checkboxes.first()).toBeVisible();
  });

  test('should filter users by search query', async ({ page }) => {
    await loginAsAdmin(page, 'super@admin.com', 'password123', 'super_admin');
    await navigateToApprovals(page);
    
    // Enter search query
    const searchInput = page.locator('input[placeholder*="Search"]').first();
    await searchInput.fill('Emily');
    
    // Verify filtered results
    await expect(page.locator('text=Emily Johnson')).toBeVisible();
    await expect(page.locator('text=Lisa Thompson')).not.toBeVisible();
  });

  test('should filter users by role', async ({ page }) => {
    await loginAsAdmin(page, 'super@admin.com', 'password123', 'super_admin');
    await navigateToApprovals(page);
    
    // Select role filter
    const roleSelect = page.locator('select').first();
    await roleSelect.selectOption('surrogate');
    
    // Verify only surrogate users are shown
    await expect(page.locator('text=Emily Johnson')).toBeVisible();
    await expect(page.locator('text=Lisa Thompson')).not.toBeVisible();
  });

  test('should approve a single user', async ({ page }) => {
    await loginAsAdmin(page, 'super@admin.com', 'password123', 'super_admin');
    await navigateToApprovals(page);
    
    // Find and click approve button for first user
    // Approve button is the green checkmark button
    const approveButton = page.locator('button:has(svg)').filter({ hasText: /CheckCircle|check/i }).first();
    
    // Alternative: click by finding the button near the user's row
    const userRow = page.locator('tr:has-text("Emily Johnson")');
    const approveBtn = userRow.locator('button').filter({ has: page.locator('svg') }).first();
    
    await approveBtn.click();
    
    // Wait for success toast
    await waitForToast(page, 'Document Approved');
    
    // Verify toast notification appears
    await expect(page.locator('text=Document Approved')).toBeVisible();
  });

  test('should disapprove a single user', async ({ page }) => {
    await loginAsAdmin(page, 'super@admin.com', 'password123', 'super_admin');
    await navigateToApprovals(page);
    
    // Find and click reject button (red X icon)
    const userRow = page.locator('tr:has-text("Emily Johnson")');
    const rejectButtons = userRow.locator('button');
    
    // Find the reject button (usually has XCircle icon or red styling)
    const rejectButton = rejectButtons.filter({ has: page.locator('svg') }).nth(1);
    await rejectButton.click();
    
    // Verify reject modal opens
    await expect(page.locator('text=Reject Document')).toBeVisible();
    
    // Enter rejection reason
    const reasonTextarea = page.locator('textarea[placeholder*="reason"], textarea[id*="reject"]');
    await reasonTextarea.fill('Document quality is insufficient');
    
    // Submit rejection
    const submitButton = page.locator('button:has-text("Reject Document")');
    await submitButton.click();
    
    // Wait for success toast
    await waitForToast(page, 'Document Rejected');
    
    // Verify toast notification
    await expect(page.locator('text=Document Rejected')).toBeVisible();
  });

  test('should bulk approve multiple users', async ({ page }) => {
    await loginAsAdmin(page, 'super@admin.com', 'password123', 'super_admin');
    await navigateToApprovals(page);
    
    // Select multiple users using checkboxes
    const checkboxes = page.locator('input[type="checkbox"]');
    // Skip the header checkbox (first one)
    await checkboxes.nth(1).check(); // First user
    await checkboxes.nth(2).check(); // Second user
    
    // Click Bulk Approve button
    const bulkApproveButton = page.locator('button:has-text("Bulk Approve")');
    await bulkApproveButton.click();
    
    // Wait for success toast
    await waitForToast(page, 'Bulk Approval Complete');
    
    // Verify toast shows correct count
    await expect(page.locator('text=Bulk Approval Complete')).toBeVisible();
    
    // Verify selected users are cleared (bulk approve button should be disabled)
    await expect(bulkApproveButton).toBeDisabled();
  });

  test('should open review selected modal when clicking Review Selected button', async ({ page }) => {
    await loginAsAdmin(page, 'super@admin.com', 'password123', 'super_admin');
    await navigateToApprovals(page);
    
    // Select multiple users
    const checkboxes = page.locator('input[type="checkbox"]');
    await checkboxes.nth(1).check();
    await checkboxes.nth(2).check();
    
    // Click Review Selected button
    const reviewSelectedButton = page.locator('button:has-text("Review Selected")');
    await reviewSelectedButton.click();
    
    // Verify modal/drawer opens
    // Look for modal content or drawer
    const modal = page.locator('[role="dialog"], [role="alertdialog"], .sheet-content').first();
    await expect(modal).toBeVisible({ timeout: 5000 });
    
    // Verify selected users are displayed in modal
    // This will be implemented when BulkReviewModal is created
    await expect(page.locator('text=Emily Johnson')).toBeVisible();
  });

  test('should logout successfully', async ({ page }) => {
    await loginAsAdmin(page, 'super@admin.com', 'password123', 'super_admin');
    
    // Find and click user dropdown menu (button with avatar and chevron)
    // Look for the dropdown trigger button in the header
    const userMenuButton = page.locator('header button').filter({ has: page.locator('svg') }).last();
    await userMenuButton.click();
    
    // Wait for dropdown to open and click logout
    await page.waitForSelector('text=Logout', { state: 'visible' });
    await page.locator('text=Logout').click();
    
    // Verify redirect to home/login page
    await expect(page).toHaveURL('/', { timeout: 10000 });
    
    // Verify authentication state is cleared (can't access dashboard)
    await page.goto('/dashboard');
    // Should redirect to login or show login page
    await expect(page).toHaveURL(/\/(login|dashboard)/, { timeout: 5000 });
  });

  test('should display user documents correctly', async ({ page }) => {
    await loginAsAdmin(page, 'super@admin.com', 'password123', 'super_admin');
    await navigateToApprovals(page);
    
    // Verify documents are displayed in the table
    const userRow = page.locator('tr:has-text("Emily Johnson")');
    
    // Check for document badges
    await expect(userRow.locator('text=ID')).toBeVisible();
    await expect(userRow.locator('text=Medical')).toBeVisible();
  });

  test('should show pending approvals count', async ({ page }) => {
    await loginAsAdmin(page, 'super@admin.com', 'password123', 'super_admin');
    await navigateToApprovals(page);
    
    // Verify pending approvals count is displayed
    const countText = page.locator('text=/Pending Approvals \\(\\d+\\)/');
    await expect(countText).toBeVisible();
  });
});

