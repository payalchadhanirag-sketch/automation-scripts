const { Given } = require("@cucumber/cucumber");

Given("user is on home page", async function () {
  await this.page.goto("https://www.direct-optic.fr/");
});
