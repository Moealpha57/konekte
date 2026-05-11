const { chromium } = require('playwright');

async function check(condition, message) {
  if (!condition) throw new Error(message);
}

(async () => {
  const base = process.env.BASE_URL || 'http://127.0.0.1:3000';
  const browser = await chromium.launch({ headless: true });
  try {
    const context = await browser.newContext({ colorScheme: 'dark' });
    const page = await context.newPage();
    await page.goto(`${base}/?lang=en`, { waitUntil: 'domcontentloaded' });
    await check(await page.getByRole('heading', { name: 'Find a trusted tutor' }).isVisible(), 'English homepage heading missing');
    await check(await page.getByRole('link', { name: 'View tutors' }).isVisible(), 'English CTA missing');
    await check(await page.getByLabel('Language').inputValue() === 'en', 'Language picker did not select English');
    await check(await page.getByLabel('Theme').inputValue() === 'system', 'Theme picker did not default to system');
    const darkClass = await page.evaluate(() => document.documentElement.classList.contains('theme-dark'));
    await check(darkClass, 'System dark mode did not apply theme-dark class');
    await page.goto(`${base}/tuteurs?lang=en`, { waitUntil: 'domcontentloaded' });
    await check(await page.getByRole('heading', { name: 'Tutors in Conakry' }).isVisible(), 'English tutors heading missing');
    await page.goto(`${base}/`, { waitUntil: 'domcontentloaded' });
    await check(await page.getByRole('heading', { name: 'Trouvez un tuteur de confiance' }).isVisible(), 'French default heading missing');
    console.log('i18n/theme checks passed');
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
