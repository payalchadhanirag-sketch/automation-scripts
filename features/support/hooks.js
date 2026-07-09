const { Before, After, setDefaultTimeout } = require("@cucumber/cucumber");
const { chromium } = require("playwright");
setDefaultTimeout(60000);
let browser;
let page;

Before(async function () {
  browser = await chromium.launch({
    headless: false,
    args: ["--lang=en-US"],
  });
  const context = await browser.newContext({
    locale: "en-US",
  });

  page = await context.newPage();

  this.page = page;
});

After(async function () {
  await browser.close();
});
