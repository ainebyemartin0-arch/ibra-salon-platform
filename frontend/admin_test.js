const { chromium } = require('playwright');

(async () => {
  let passed = 0;
  let failed = 0;
  const log = (test, status) => {
    if (status) { console.log(`✅ ${test}`); passed++; }
    else { console.log(`❌ ${test}`); failed++; }
  };

  console.log("=========================================");
  console.log(" Starting E2E Admin Flow Test...");
  console.log("=========================================\n");

  const browser = await chromium.launch({ headless: false, slowMo: 100 });
  const page = await browser.newPage();
  const baseURL = 'http://localhost:3000';

  try {
    // 1. Access Control (Try to visit admin without logging in)
    console.log("[1] Testing Access Control...");
    await page.goto(`${baseURL}/admin`);
    await page.waitForURL('**/login', { timeout: 5000 });
    log('Unauthenticated user redirected to /login', page.url().includes('/login'));

    // 2. Login as Admin
    console.log("[2] Logging in as Admin (admin / admin123)...");
    await page.fill('input[type="text"]', 'admin');
    await page.fill('input[type="password"]', 'admin123');
    await page.click('button[type="submit"]');
    
    // Wait for dashboard to load
    await page.waitForURL('**/admin', { timeout: 5000 });
    await page.waitForSelector('text=Dashboard', { timeout: 5000 });
    log('Successfully logged in and redirected to Dashboard', page.url().includes('/admin'));

    // 3. Check Dashboard Analytics
    console.log("[3] Checking Dashboard Analytics...");
    const revenueCard = await page.isVisible('text=Total Revenue');
    const insightsCard = await page.isVisible('text=Business Insights');
    log('Analytics cards (Revenue & Insights) are visible', revenueCard && insightsCard);

    // 4. Navigate to Manage Services
    console.log("[4] Navigating to Manage Services...");
    await page.click('a:has-text("Services")');
    await page.waitForURL('**/admin/services', { timeout: 5000 });
    const addServiceBtn = await page.isVisible('button:has-text("Add Service")');
    log('Manage Services page loaded with Add Service form', page.url().includes('/admin/services') && addServiceBtn);

    // 5. Navigate to Manage Staff
    console.log("[5] Navigating to Manage Staff...");
    await page.click('a:has-text("Staff")');
    await page.waitForURL('**/admin/staff', { timeout: 5000 });
    const addStaffBtn = await page.isVisible('button:has-text("Add Barber")');
    log('Manage Staff page loaded with Add Barber form', page.url().includes('/admin/staff') && addStaffBtn);

    // 6. Navigate to Customers
    console.log("[6] Navigating to Customers...");
    await page.click('a:has-text("Customers")');
    await page.waitForURL('**/admin/customers', { timeout: 5000 });
    const loyaltyHeader = await page.isVisible('text=Loyalty Points');
    log('Customers page loaded and displays Loyalty Points column', page.url().includes('/admin/customers') && loyaltyHeader);

    // 7. Logout
    console.log("[7] Testing Logout...");
    await page.click('button:has-text("Logout")');
    await page.waitForURL('**/login', { timeout: 5000 });
    log('Successfully logged out and redirected to /login', page.url().includes('/login'));

  } catch (error) {
    console.error('\n❌ Test interrupted with error:', error.message);
    log('Overall Admin Flow', false);
  } finally {
    console.log("\n=========================================");
    console.log(` Test Complete! ${passed} passed, ${failed} failed.`);
    console.log("=========================================");
    await browser.close();
  }
})();
