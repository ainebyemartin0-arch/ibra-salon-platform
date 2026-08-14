const { chromium } = require('playwright');

(async () => {
  let passed = 0;
  let failed = 0;
  const log = (test, status) => {
    if (status) { console.log(`✅ ${test}`); passed++; }
    else { console.log(`❌ ${test}`); failed++; }
  };

  console.log("=========================================");
  console.log(" Starting E2E User Flow Test...");
  console.log("=========================================\n");

  // Launch a real browser (headless: false means you will SEE it happening)
  const browser = await chromium.launch({ headless: false, slowMo: 100 });
  const page = await browser.newPage();
  const baseURL = 'http://localhost:3000';

  try {
    // 1. Visit Homepage
    console.log("[1] Visiting Homepage...");
    await page.goto(baseURL);
    log('Homepage loads successfully', await page.title() !== '');

    // 2. Click "Services" link in Navbar
    console.log("[2] Clicking 'Services' link in Navbar...");
    await page.click('a:has-text("Services")');
    await page.waitForURL('**/services');
    log('Navigated to /services page', page.url().includes('/services'));

    // 3. Click "Book Now" on the first service
    console.log("[3] Clicking 'Book Now' on the first service...");
    await page.waitForSelector('button:has-text("Book Now")', { timeout: 5000 });
    await page.click('button:has-text("Book Now"):first-of-type');
    
    // Wait for modal to open
    await page.waitForSelector('h2:has-text("Book:")', { timeout: 5000 });
    log('Booking modal opened successfully', true);

    // 4. Fill out the booking form
    console.log("[4] Filling out booking form...");
    await page.fill('input[placeholder="John Doe"]', 'Automated Tester');
    await page.fill('input[placeholder="0771234567"]', '0770000000');
    
    // Fill datetime-local input
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 5);
    const dateString = futureDate.toISOString().slice(0, 16);
    await page.fill('input[type="datetime-local"]', dateString);
    log('Form filled with user data', true);

    // 5. Submit the booking
    console.log("[5] Submitting booking...");
    await page.click('button[type="submit"]:has-text("Confirm Booking")');
    
    // Wait for success screen
    await page.waitForSelector('h2:has-text("Booking Request Sent!")', { timeout: 10000 });
    log('Booking submitted successfully (Success screen appeared)', true);

    // 6. Check WhatsApp link exists
    const waLink = await page.getAttribute('a:has-text("Notify Ibra on WhatsApp")', 'href');
    log('WhatsApp notification link generated correctly', waLink && waLink.includes('wa.me'));

  } catch (error) {
    console.error('\n❌ Test interrupted with error:', error.message);
    log('Overall User Flow', false);
  } finally {
    console.log("\n=========================================");
    console.log(` Test Complete! ${passed} passed, ${failed} failed.`);
    console.log("=========================================");
    await browser.close();
  }
})();
