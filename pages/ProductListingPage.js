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
    this.caracteristiquesLink = page.getByRole("link", {
      name: "Caractéristiques générales",
    });
    console.log("Characteristics locator created");
    this.couleurLink = page.getByRole("link", { name: "Couleur" });
    this.matiereLink = page.getByRole("link", { name: "Matière" });
    this.largeurVerreLink = page.getByRole("link", {
      name: "Largeur du verre",
    });
    this.largeurTotaleLink = page.getByRole("link", { name: "Largeur totale" });

    this.lensWidthSliderMin = page.locator("#rangeLensWidth1");
    this.lensWidthSliderMax = page.locator("#rangeLensWidth2");
    this.totalWidthSliderMin = page.locator("#sliderTotalWidth-1");
    this.totalWidthSliderMax = page.locator("#sliderTotalWidth-2");
    this.discountPopupClose = page.locator(".pum-close").first();
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

    if (await this.discountPopupClose.isVisible().catch(() => false)) {
      await this.discountPopupClose.click();
      await this.page.waitForTimeout(500);
    }
  }

  async openFilterCategory(categoryName) {
    console.log("CATEGORY =", categoryName);
    const categoryMap = {
      Genre: this.genreLink,
      "Forme de la monture": this.formeMontureLink,
      Prix: this.prixLink,
      Marque: this.marqueLink,
      "Caractéristiques générales": this.caracteristiquesLink,
      Couleur: this.couleurLink,
      Matière: this.matiereLink,
      "Largeur du verre": this.largeurVerreLink,
      "Largeur totale": this.largeurTotaleLink,
    };

    const categoryLink = categoryMap[categoryName];

    if (!categoryLink) {
      throw new Error(
        `No locator defined for filter category: ${categoryName}`,
      );
    }

    await categoryLink.waitFor({ state: "visible", timeout: 10000 });
    await this.page.screenshot({
      path: "before-click-category.png",
      fullPage: true,
    });

    console.log("Count =", await categoryLink.count());

    await categoryLink.scrollIntoViewIfNeeded();

    await categoryLink.evaluate((el) => el.click());

    await this.page.waitForTimeout(500);
  }

  async selectFilterOption(categoryName, optionText) {
    if (categoryName !== "Caractéristiques générales") {
      await this.openFilterCategory(categoryName);
    }

    const checkbox = this.page.locator(`input[value="${optionText}"]`).first();

    await checkbox.waitFor({
      state: "attached",
      timeout: 10000,
    });

    const id = await checkbox.getAttribute("id");

    const label = this.page.locator(`label[for="${id}"]`);

    await label.scrollIntoViewIfNeeded();

    await this.page.waitForTimeout(500);

    await label.evaluate((el) => el.click());

    console.log("Selected option:", optionText);
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

  async setSliderRange(categoryName, minValue, maxValue) {
    await this.openFilterCategory(categoryName);

    const sliderMap = {
      "Largeur du verre": {
        min: this.lensWidthSliderMin,
        max: this.lensWidthSliderMax,
      },
      "Largeur totale": {
        min: this.totalWidthSliderMin,
        max: this.totalWidthSliderMax,
      },
    };

    const sliders = sliderMap[categoryName];

    if (!sliders) {
      throw new Error(`No sliders found for ${categoryName}`);
    }

    await sliders.min.fill(minValue);
    await sliders.max.fill(maxValue);

    await sliders.min.press("Tab");
    await sliders.max.press("Tab");

    await this.page.waitForTimeout(1000);

    console.log("Min:", await sliders.min.inputValue());
    console.log("Max:", await sliders.max.inputValue());
  }
  async verifyFilteredProductsDisplayed() {
    await this.page.waitForTimeout(1500);

    let resultsVisible = await this.resultsText.isVisible().catch(() => false);

    if (!resultsVisible) {
      console.log("Results text not found immediately, waiting longer...");
      await this.page.waitForTimeout(2500);
      resultsVisible = await this.resultsText.isVisible().catch(() => false);
    }

    const currentUrl = this.page.url();

    console.log("URL after applying filters:", currentUrl);

    await this.page.screenshot({
      path: "filter-results-debug.png",
      fullPage: true,
    });

    console.log("Results text visible:", resultsVisible);
  }
}

module.exports = ProductListingPage;
