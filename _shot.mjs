import puppeteer from 'puppeteer';
const [, , url, out, sel] = process.argv;
const browser = await puppeteer.launch({ headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 1000 });
await page.goto(url, { waitUntil: 'networkidle2' });
if (sel) { const el = await page.$(sel); await el.screenshot({ path: out }); }
else { await page.screenshot({ path: out }); }
await browser.close();
console.log(out);
