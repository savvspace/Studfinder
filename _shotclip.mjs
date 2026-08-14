import puppeteer from 'puppeteer';
const browser = await puppeteer.launch({ headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto("http://localhost:3000/about.html", { waitUntil: 'networkidle2' });
const dims = await page.evaluate(() => ({ h: document.body.scrollHeight }));
await page.screenshot({ path: "temporary screenshots/about-footer.png", clip: { x: 0, y: dims.h - 760, width: 1440, height: 760 } });
await browser.close();
