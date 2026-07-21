const assert = require("assert");
const { expect } = require("@playwright/test");

class NavigationPage {
  constructor(page) {
    this.page = page;

    this.hamburgerMenuIcon = page.locator("button[class*='burger']");

    this.lunettesDeVueLink = page.getByRole("link", {
      name: "Lunettes de vue",
      exact: true,
    });
    this.lunettesDeSoleilLink = page.getByRole("link", {
      name: "Lunettes de soleil",
      exact: true,
    });
    this.remplacementVerresLink = page.getByRole("link", {
      name: "Remplacement de verres",
    });
    this.commentCommanderLink = page.getByRole("link", {
      name: "Comment commander",
      exact: true,
    });
    this.contactLink = page.getByRole("link", { name: "Contact", exact: true });
    this.heroBanner = page.locator(".hero-desktop > a");

    this.searchBox = page.getByText("Rechercher... 02 72 34 99 77");
    this.searchBackdrop = page.locator(".dfd-backdrop");
  }

  async clickMenuLink(linkName) {
    const menuMap = {
      "Lunettes de vue": this.lunettesDeVueLink,
      "Lunettes de soleil": this.lunettesDeSoleilLink,
      "Remplacement de verres": this.remplacementVerresLink,
      "Comment commander": this.commentCommanderLink,
      Contact: this.contactLink,
    };

    const link = menuMap[linkName];
    if (!link) {
      throw new Error(`No locator defined for menu link: ${linkName}`);
    }

    await link.waitFor({ state: "visible", timeout: 10000 });
    await link.click();
    await this.page.waitForTimeout(1500);
  }

  async verifyOnPage(expectedPageName) {
    const currentUrl = this.page.url();
    console.log(
      `Current URL after clicking "${expectedPageName}":`,
      currentUrl,
    );
    await this.page.screenshot({
      path: `nav-${expectedPageName.replace(/\s+/g, "-").toLowerCase()}.png`,
    });

    assert.ok(
      !currentUrl.endsWith("https://preprod.direct-optic.fr/") &&
        !currentUrl.endsWith("https://preprod.direct-optic.fr/"),
      `Expected to navigate away from homepage after clicking "${expectedPageName}", but URL is still: ${currentUrl}`,
    );
  }

  async clickHeroBanner() {
    const startUrl = this.page.url();
    await this.heroBanner.waitFor({ state: "visible", timeout: 10000 });
    await this.heroBanner.click();
    await this.page.waitForTimeout(5000);
    this.startUrl = startUrl;
  }

  async verifyNavigatedAway() {
    const currentUrl = this.page.url();
    console.log("URL after banner click:", currentUrl);
    assert.notStrictEqual(
      currentUrl,
      this.startUrl,
      "Expected URL to change after clicking the hero banner, but it stayed the same",
    );
  }

  async clickSearchBox() {
    await this.searchBox.waitFor({ state: "visible", timeout: 10000 });
    await this.searchBox.click();
  }

  async verifySearchOverlayOpen() {
    await this.searchBackdrop.waitFor({ state: "visible", timeout: 10000 });
    console.log("Search overlay is open");
  }

  async closeSearchOverlay() {
    await this.searchBackdrop.click();
  }

  async verifySearchOverlayClosed() {
    await this.searchBackdrop.waitFor({ state: "hidden", timeout: 10000 });
    console.log("Search overlay is closed");
  }
  async setMobileViewport() {
    await this.page.setViewportSize({ width: 375, height: 667 });
    await this.page.waitForTimeout(1000);
    console.log("Viewport set to mobile size (375x667)");
  }
  async verifyHamburgerMenuVisible() {
    await this.page.screenshot({
      path: "mobile-view-debug.png",
      fullPage: true,
    });

    const isVisible = await this.hamburgerMenuIcon
      .isVisible()
      .catch(() => false);
    console.log("Hamburger menu visible on mobile view:", isVisible);

    if (!isVisible) {
      throw new Error(
        "Expected hamburger menu icon to be visible on mobile viewport, but it was not found",
      );
    }

    console.log("CONFIRMED: Hamburger menu icon is visible in mobile view");
  }
}

module.exports = NavigationPage;
