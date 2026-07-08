const { Before, After } = require("@cucumber/cucumber");
const { chromium } = require("playwright");
let browser;
let page;

Before(async () => {
  browser = await chromium.launch({});
  const context = await browser.newContext();
  page = await context.newPage();
});

After(async () => {
  await browser.close();
});
