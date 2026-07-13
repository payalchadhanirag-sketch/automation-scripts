const { expect } = require("@playwright/test");

class SearchPage {
  constructor(page) {
    this.page = page;
    this.searchIcon = "#doofinder_input";
    this.searchInput = ".dfd-searchbox-input";
    this.resultCount = ".dfd-meta";
    this.noResultText = ".dfd-no-results";
    this.recommendedProducts = ".dfd-title-lg";
  }

  async openHomePage() {
    await this.page.goto("https://www.direct-optic.fr/");
  }

  async clickSearchIcon() {
    await this.page.locator(this.searchIcon).first().click();
  }

  async enterSearch(searchText) {
    await this.page.locator(this.searchInput).fill(searchText);
  }

  async verifySearchResults() {
    await expect(this.page.locator(this.resultCount)).toBeVisible();
  }

  async verifyNoSearchResults() {
    await expect(this.page.locator(this.noResultText)).toBeVisible();
    await expect(this.page.locator(this.recommendedProducts)).toContainText(
      "Produits recommandés",
    );
  }
}

module.exports = SearchPage;
