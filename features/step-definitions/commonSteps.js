const { Given } = require("@cucumber/cucumber");
const config = require("../../config");

Given("user is on home page", async function () {
  await this.page.goto(config.baseURL);
  console.log("Page title:", await this.page.title());
});
