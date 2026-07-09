const { Given, When, Then } = require("@cucumber/cucumber");
const SearchPage = require("../../pages/SearchPage");

let searchPage;

Given("user is on home page", async function () {
  searchPage = new SearchPage(this.page);
  await searchPage.openHomePage();
});

When("user clicks on search icon", async function () {
  await searchPage.clickSearchIcon();
});

When("user enters {string} in search field", async function (searchText) {
  await searchPage.enterSearch(searchText);
});

Then("user should see search results", async function () {
  await searchPage.verifySearchResults();
});

Then("user should see no search results", async function () {
  await searchPage.verifyNoSearchResults();
});
