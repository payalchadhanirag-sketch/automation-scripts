const { Before, After, setDefaultTimeout } = require("@cucumber/cucumber");
const { chromium } = require("playwright");
const config = require("../../config");

setDefaultTimeout(60 * 1000);

let browser;

Before(async function () {
  browser = await chromium.launch({ headless: false });

  const context = await browser.newContext({
    httpCredentials: config.httpCredentials,
  });

  this.page = await context.newPage();
});

After(async function () {
  await browser.close();
});
