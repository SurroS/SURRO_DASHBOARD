import { Page } from '@playwright/test';

/**
 * Helper function to login as a specific admin role
 */
export async function loginAsAdmin(
  page: Page,
  email: string = 'super@admin.com',
  password: string = 'password123',
  role: string = 'super_admin'
) {
  await page.goto('/login');
  await page.fill('input[type="email"]', email);
  await page.fill('input[type="password"]', password);
  await page.selectOption('select', role);
  await page.click('button[type="submit"]');
  await page.waitForURL('/dashboard', { timeout: 10000 });
}

/**
 * Helper function to setup test users in localStorage
 */
export async function setupTestUsers(page: Page) {
  await page.addInitScript(() => {
    const testUsers = [
      {
        id: '#6548',
        name: 'Emily Johnson',
        email: 'emily.johnson@gmail.com',
        phone: '+1234567890',
        role: 'surrogate',
        status: 'pending',
        verificationStatus: 'kyc_pending',
        dateJoined: '2024-01-15',
        walletBalance: 0,
        documents: [
          {
            id: 'doc1',
            userId: '#6548',
            type: 'ID',
            name: 'passport.pdf',
            uploadDate: '2024-01-15',
            status: 'pending',
          },
          {
            id: 'doc2',
            userId: '#6548',
            type: 'Medical',
            name: 'health_check.pdf',
            uploadDate: '2024-01-15',
            status: 'pending',
          },
        ],
        activityLog: [],
        complianceFlags: [],
        linkedTickets: [],
      },
      {
        id: '#7003',
        name: 'Lisa Thompson',
        email: 'lisa.thompson@gmail.com',
        phone: '+1234567802',
        role: 'parent',
        status: 'pending',
        verificationStatus: 'kyc_pending',
        dateJoined: '2024-01-18',
        walletBalance: 0,
        documents: [
          {
            id: 'doc3',
            userId: '#7003',
            type: 'Financial',
            name: 'bank_statement.pdf',
            uploadDate: '2024-01-18',
            status: 'pending',
          },
        ],
        activityLog: [],
        complianceFlags: [],
        linkedTickets: [],
      },
      {
        id: '#8003',
        name: 'Health & Wellness Center',
        email: 'health.wellness@gmail.com',
        phone: '+1234567702',
        role: 'clinic',
        status: 'pending',
        verificationStatus: 'kyc_pending',
        dateJoined: '2024-01-22',
        walletBalance: 0,
        documents: [
          {
            id: 'doc4',
            userId: '#8003',
            type: 'License',
            name: 'medical_license.pdf',
            uploadDate: '2024-01-22',
            status: 'pending',
          },
          {
            id: 'doc5',
            userId: '#8003',
            type: 'Certification',
            name: 'fertility_cert.pdf',
            uploadDate: '2024-01-22',
            status: 'pending',
          },
        ],
        activityLog: [],
        complianceFlags: [],
        linkedTickets: [],
      },
    ];

    // Get existing users or initialize
    const existingUsers = JSON.parse(localStorage.getItem('surro_users') || '[]');
    const allUsers = [...existingUsers];
    
    // Add test users if they don't exist
    testUsers.forEach((testUser) => {
      if (!allUsers.find((u: any) => u.id === testUser.id)) {
        allUsers.push(testUser);
      }
    });

    localStorage.setItem('surro_users', JSON.stringify(allUsers));
  });
}

/**
 * Helper function to clear all test data
 */
export async function clearTestData(page: Page) {
  await page.evaluate(() => {
    localStorage.clear();
  });
}

/**
 * Helper function to navigate to approvals page
 */
export async function navigateToApprovals(page: Page) {
  // Click on USER MANAGEMENT section in sidebar
  await page.click('text=USER MANAGEMENT');
  // Click on Approvals
  await page.click('text=Approvals');
  await page.waitForURL('/user-management/approvals', { timeout: 10000 });
}

/**
 * Helper function to wait for toast notification
 */
export async function waitForToast(page: Page, text: string) {
  await page.waitForSelector(`text=${text}`, { timeout: 5000 });
}

/**
 * Helper function to logout
 */
export async function logout(page: Page) {
  // Look for logout button in header or sidebar
  const logoutButton = page.locator('text=Logout').or(page.locator('[aria-label="Logout"]'));
  if (await logoutButton.isVisible()) {
    await logoutButton.click();
    await page.waitForURL('/login', { timeout: 10000 });
  }
}

