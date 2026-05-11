const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const outDir = path.join(process.cwd(), 'recordings');
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    recordVideo: { dir: outDir, size: { width: 390, height: 844 } },
  });
  const page = await context.newPage();
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2200);
  await page.locator('a[href="/tuteurs"]').filter({ hasText: 'Voir les tuteurs' }).click();
  await page.waitForTimeout(1800);
  await page.locator('select[name="subject"]').selectOption('Mathématiques');
  await page.locator('select[name="neighborhood"]').selectOption('Lambanyi');
  await page.getByRole('button', { name: 'Filtrer' }).click();
  await page.waitForTimeout(2000);
  await page.getByRole('link', { name: /Aïssatou Diallo/ }).click();
  await page.waitForTimeout(2400);
  await page.getByRole('link', { name: 'Contacter sur WhatsApp' }).focus();
  await page.waitForTimeout(1200);
  await page.goto('http://localhost:3000/admin', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3200);
  const video = page.video();
  await context.close();
  await browser.close();
  const videoPath = await video.path();
  console.log(videoPath);
})();
