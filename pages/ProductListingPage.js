const assert = require("assert");

class ProductListingPage {
  constructor(page) {
    this.page = page;

    this.allFiltersButton = page.getByRole("button", {
      name: "Picto Listing Tous les filtres",
    });
    this.applyButton = page.getByRole("button", { name: "Appliquer" });
    this.resultsText = page.getByText("résultats");

    this.genreLink = page.getByRole("link", { name: "Genre" });
    this.formeMontureLink = page.getByRole("link", {
      name: "Forme de la monture",
    });
    this.prixLink = page.getByRole("link", { name: "Prix" });
    this.marqueLink = page.getByRole("link", { name: "Marque" });

    this.priceSliderMin = page.locator("#slider-1");
    this.priceSliderMax = page.locator("#slider-2");
  }

  async goToListingPage(url) {
    await this.page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });
    await this.page.waitForTimeout(1500);
  }

  async openAllFiltersPanel() {
    await this.allFiltersButton.waitFor({ state: "visible", timeout: 10000 });
    await this.allFiltersButton.click();
    await this.page.waitForTimeout(1000);
  }

  async openFilterCategory(categoryName) {
    const categoryMap = {
      Genre: this.genreLink,
      "Forme de la monture": this.formeMontureLink,
      Prix: this.prixLink,
      Marque: this.marqueLink,
    };

    const categoryLink = categoryMap[categoryName];
    if (!categoryLink) {
      throw new Error(
        `No locator defined for filter category: ${categoryName}`,
      );
    }

    await categoryLink.waitFor({ state: "attached", timeout: 10000 });
    await categoryLink.evaluate((el) => el.click());
    await this.page.waitForTimeout(500);
  }
  async selectFilterOption(categoryName, optionText) {
    await this.openFilterCategory(categoryName);
    const optionLocator = this.page
      .locator(`text=/${optionText}\\(\\d+\\)/`)
      .first();
    await optionLocator.waitFor({ state: "attached", timeout: 10000 });
    await optionLocator.evaluate((el) => el.click());
    console.log(`Selected filter option: ${optionText} under ${categoryName}`);
  }

  async setPriceRange(minPrice, maxPrice) {
    await this.openFilterCategory("Prix");
    await this.priceSliderMin.fill(minPrice);
    await this.priceSliderMax.fill(maxPrice);
    console.log(`Price range set: ${minPrice} - ${maxPrice}`);
  }

  async applyFilters() {
    await this.applyButton.waitFor({ state: "attached", timeout: 10000 });
    await this.applyButton.evaluate((el) => el.click());
    await this.page.waitForTimeout(2000);
  }

  async verifyFilteredProductsDisplayed() {
    await this.page.waitForTimeout(1500);
    const currentUrl = this.page.url();
    console.log("URL after applying filters:", currentUrl);

    await this.page.screenshot({
      path: "filter-results-debug.png",
      fullPage: true,
    });

    const resultsVisible = await this.resultsText
      .isVisible()
      .catch(() => false);
    console.log("Results text visible:", resultsVisible);

    if (!resultsVisible) {
      throw new Error(
        "Expected to see filtered results text on the page, but it was not found",
      );
    }
  }
}

module.exports = ProductListingPage;
