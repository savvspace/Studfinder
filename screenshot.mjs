import fs from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer';

const [, , url = 'http://localhost:3000/', label = ''] = process.argv;

const outDir = path.join(process.cwd(), 'temporary screenshots');
fs.mkdirSync(outDir, { recursive: true });

const files = fs.readdirSync(outDir).filter((f) => f.startsWith('screenshot-') && f.endsWith('.png'));
const nextIndex = files.length + 1;
const fileName = `screenshot-${String(nextIndex).padStart(2, '0')}${label ? `-${label}` : ''}.png`;
const outputPath = path.join(outDir, fileName);

const browser = await puppeteer.launch({ headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 1200 });
await page.goto(url, { waitUntil: 'networkidle2' });
await page.screenshot({ path: outputPath, fullPage: true });
await browser.close();

console.log(outputPath);
