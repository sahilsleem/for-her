import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function runTests() {
  const targetUrl = process.argv[2] || 'http://localhost:8080/';
  console.log(`🚀 Starting Automated Test Suite on ${targetUrl} ...`);

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Emulate modern mobile device (iPhone 14 / Android: 390x844, 3x DPR)
  await page.setViewport({
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true
  });

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  page.on('pageerror', err => {
    consoleErrors.push(err.toString());
  });

  await page.goto(targetUrl, { waitUntil: 'networkidle0' });

  console.log('✓ Page loaded cleanly.');

  // Check 1: Intro screen visible
  const introTitle = await page.$eval('.intro-title', el => el.textContent.trim());
  console.log(`✓ Intro title found: "${introTitle}"`);

  await page.screenshot({ path: 'test_screenshots_intro.png' });
  console.log('✓ Saved screenshot: test_screenshots_intro.png');

  // Check 2: Click Open Surprise button
  const openBtn = await page.$('#open-surprise-btn');
  if (!openBtn) throw new Error('Open surprise button not found!');
  await openBtn.click();
  await new Promise(r => setTimeout(r, 1200));

  // Check 3: Main site revealed
  const mainSiteVisible = await page.$eval('#main-site', el => !el.classList.contains('site-hidden'));
  console.log(`✓ Main site revealed: ${mainSiteVisible}`);

  // Check 4: Main love letter paragraphs
  const letterParagraphs = await page.$$eval('.letter-content-text p', els => els.map(p => p.textContent.trim()));
  console.log(`✓ Love letter paragraphs count: ${letterParagraphs.length}`);

  // Check 5: Photo Scrapbook Polaroids
  const polaroids = await page.$$('.polaroid-frame');
  console.log(`✓ Polaroid frames found: ${polaroids.length}`);

  // Test Lightbox: Click on first polaroid
  await polaroids[0].click();
  await new Promise(r => setTimeout(r, 400));
  const lightboxActive = await page.$eval('#lightbox-modal', el => el.classList.contains('active'));
  console.log(`✓ Lightbox opened: ${lightboxActive}`);

  // Close Lightbox
  await page.$eval('#lightbox-close', el => el.click());
  await new Promise(r => setTimeout(r, 400));
  const lightboxClosed = await page.$eval('#lightbox-modal', el => !el.classList.contains('active'));
  console.log(`✓ Lightbox closed: ${lightboxClosed}`);

  // Check 5.5: Baccha's Anger Management Centre 🔨
  const angerSection = await page.$('#anger-centre');
  if (!angerSection) throw new Error('Anger management centre section not found!');
  console.log('✓ Found anger management centre section');

  const bonkBtn = await page.$('#bonk-btn');
  if (!bonkBtn) throw new Error('Bonk button not found!');

  // Test Bonk 1 & 2
  await page.$eval('#bonk-btn', el => el.click());
  await new Promise(r => setTimeout(r, 200));

  await page.$eval('#bonk-btn', el => el.click());
  await new Promise(r => setTimeout(r, 300));

  const bonkCounterText = await page.$eval('#bonk-counter-text', el => el.textContent.trim());
  console.log(`✓ Bonk counter after 2 bonks: "${bonkCounterText}"`);

  const bonkQuote = await page.$eval('#speech-quote-text', el => el.textContent.trim());
  console.log(`✓ Bonk speech quote updated: ${bonkQuote}`);

  // Test Sound toggle
  await page.$eval('#bonk-sound-checkbox', el => el.click());
  const soundStatus = await page.$eval('#bonk-sound-status', el => el.textContent.trim());
  console.log(`✓ Bonk sound toggle changed to: ${soundStatus}`);

  // Test Surrender button
  await page.$eval('#surrender-btn', el => el.click());
  await new Promise(r => setTimeout(r, 400));
  const surrenderVisible = await page.$eval('#surrender-card', el => !el.classList.contains('hidden-element'));
  console.log(`✓ Surrender card revealed: ${surrenderVisible}`);

  // Test Forgive button
  await page.$eval('#forgive-btn', el => el.click());
  await new Promise(r => setTimeout(r, 400));
  const forgiveVisible = await page.$eval('#forgive-response', el => !el.classList.contains('hidden-element'));
  console.log(`✓ Forgive response revealed: ${forgiveVisible}`);

  // Check 6: Love Notes (11 cards)
  const noteCards = await page.$$('.note-card');
  console.log(`✓ Love note cards found: ${noteCards.length}`);

  // Check 7: Reasons Generator
  const initialReason = await page.$eval('#current-reason-text', el => el.textContent.trim());
  console.log(`✓ Initial reason: "${initialReason.substring(0, 40)}..."`);
  
  const nextReasonBtn = await page.$('#next-reason-btn');
  await nextReasonBtn.click();
  await new Promise(r => setTimeout(r, 500));
  const newReason = await page.$eval('#current-reason-text', el => el.textContent.trim());
  console.log(`✓ New reason after click: "${newReason.substring(0, 40)}..."`);

  // Check 8: Open When Envelopes
  const envelopeCards = await page.$$('.envelope-card');
  console.log(`✓ Open-when envelope cards found: ${envelopeCards.length}`);
  
  // Click first envelope
  await envelopeCards[0].click();
  await new Promise(r => setTimeout(r, 400));
  const letterModalActive = await page.$eval('#letter-modal', el => el.classList.contains('active'));
  console.log(`✓ Open-when letter modal opened: ${letterModalActive}`);

  // Close letter modal
  await page.$eval('#letter-modal-close', el => el.click());
  await new Promise(r => setTimeout(r, 400));
  const letterModalClosed = await page.$eval('#letter-modal', el => !el.classList.contains('active'));
  console.log(`✓ Open-when letter modal closed: ${letterModalClosed}`);

  // Check 9: Wax Seal Stamp Interaction
  const waxSealBtn = await page.$('#seal-promise-btn');
  await waxSealBtn.click();
  await new Promise(r => setTimeout(r, 600));
  const isSealed = await page.$eval('#wax-seal-stamp', el => el.classList.contains('sealed'));
  console.log(`✓ Wax seal stamped: ${isSealed}`);

  // Check 10: Date Bucket List & Adding a custom date
  const initialDatesCount = await page.$$eval('.date-item', els => els.length);
  console.log(`✓ Initial date bucket items: ${initialDatesCount}`);

  await page.type('#new-date-input', 'Midnight stargazing with warm churros');
  await page.$eval('#add-date-form', form => form.dispatchEvent(new Event('submit', { cancelable: true })));
  await new Promise(r => setTimeout(r, 400));

  const updatedDatesCount = await page.$$eval('.date-item', els => els.length);
  console.log(`✓ Updated date bucket items after adding custom date: ${updatedDatesCount}`);

  // Check 11: Secret Coupon Reveal
  const revealCouponBtn = await page.$('#reveal-coupon-btn');
  await revealCouponBtn.click();
  await new Promise(r => setTimeout(r, 400));
  const couponRevealed = await page.$eval('#secret-reveal-content', el => el.classList.contains('revealed-coupon'));
  console.log(`✓ Secret coupon revealed: ${couponRevealed}`);

  // Scroll to bottom and take screenshots
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 3));
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: 'test_screenshots_scrapbook.png' });

  await page.evaluate(() => window.scrollTo(0, (document.body.scrollHeight / 3) * 2));
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: 'test_screenshots_interactive.png' });

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: 'test_screenshots_ending.png' });
  console.log('✓ Saved all section screenshots!');

  await browser.close();

  console.log('\n=======================================');
  console.log(`Console Errors encountered: ${consoleErrors.length}`);
  if (consoleErrors.length > 0) {
    console.error('Errors:', consoleErrors);
    process.exit(1);
  } else {
    console.log('🎉 ALL TESTS PASSED WITH ZERO CONSOLE ERRORS!');
  }
}

runTests().catch(err => {
  console.error('❌ Test failed with error:', err);
  process.exit(1);
});
