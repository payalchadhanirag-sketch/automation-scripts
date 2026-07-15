const { Given, When, Then } = require("@cucumber/cucumber");
const ProductListingPage = require("../../pages/ProductListingPage");

let productListingPage;

const listingPageUrls = {
  "Lunettes de vue": "https://www.direct-optic.fr/lunettes-de-vue",
};

Given("user is on the {string} listing page", async function (pageName) {
  productListingPage = new ProductListingPage(this.page);
  const url = listingPageUrls[pageName];
  await productListingPage.goToListingPage(url);
});

When("user opens all filters panel", async function () {
  await productListingPage.openAllFiltersPanel();
});

When(
  "user selects {string} filter option {string}",
  async function (category, option) {
    await productListingPage.selectFilterOption(category, option);
  },
);

When(
  "user sets price range from {string} to {string}",
  async function (min, max) {
    await productListingPage.setPriceRange(min, max);
  },
);

When("user applies the selected filters", async function () {
  await productListingPage.applyFilters();
});

Then("filtered products should be displayed", async function () {
  await productListingPage.verifyFilteredProductsDisplayed();
});
