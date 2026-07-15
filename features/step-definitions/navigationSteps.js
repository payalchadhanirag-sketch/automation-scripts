const { When, Then } = require("@cucumber/cucumber");
const NavigationPage = require("../../pages/NavigationPage");

let navigationPage;

When("user clicks on {string} menu link", async function (linkName) {
  navigationPage = new NavigationPage(this.page);
  await navigationPage.clickMenuLink(linkName);
});

Then("user should be on the {string} page", async function (pageName) {
  await navigationPage.verifyOnPage(pageName);
});

When("user clicks on the main hero banner", async function () {
  navigationPage = new NavigationPage(this.page);
  await navigationPage.clickHeroBanner();
});

Then("user should be navigated to a different page", async function () {
  await navigationPage.verifyNavigatedAway();
});

When("user clicks on the search box", async function () {
  navigationPage = new NavigationPage(this.page);
  await navigationPage.clickSearchBox();
});

Then("the search overlay should open", async function () {
  await navigationPage.verifySearchOverlayOpen();
});

When("user closes the search overlay", async function () {
  await navigationPage.closeSearchOverlay();
});

Then("the search overlay should close", async function () {
  await navigationPage.verifySearchOverlayClosed();
});
When("user switches to mobile screen size", async function () {
  navigationPage = new NavigationPage(this.page);
  await navigationPage.setMobileViewport();
});

Then("hamburger menu icon should be visible", async function () {
  await navigationPage.verifyHamburgerMenuVisible();
});
