const assert = require("assert");
const { expect } = require("@playwright/test");

class LoginPage {
  constructor(page) {
    this.page = page;
    this.profileIcon = page.getByRole("link").nth(4);
    this.emailInput = page.getByRole("textbox", { name: "E-mail" });
    this.continueButton = page.getByRole("button", { name: "Suivant" });
    this.passwordInput = page.getByRole("textbox", { name: "Mot de passe" });
    this.loginButton = page
      .getByRole("button", { name: "Me connecter" })
      .locator("visible=true")
      .first();
    this.myAccount = page.getByRole("main").getByText("Mon compte");
    this.invalidPassError = page.getByText("Identifiants invalides.");
    this.emailNotFoundError = page.getByText("Email could not be found");
    this.googleLoginButton = page
      .locator('iframe[title="Sign in with Google Button"]')
      .contentFrame()
      .getByRole("button", { name: "Continuer avec Google. S'" });

    this.appleLoginButton = page.getByText("Continuer avec Apple");

    this.facebookLoginButton = page
      .locator('[data-testid="fb:login_button Facebook Social Plugin"]')
      .contentFrame()
      .getByRole("button", { name: "Continuer avec Facebook" });

    this.logoutLink = page.getByRole("link", {
      name: "Icon Logout Me déconnecter",
    });
  }

  async openHomePage() {
    await this.page.goto("https://www.direct-optic.fr/", {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });
  }

  async clickProfileIcon() {
    await this.profileIcon.click();
  }

  async enterEmail(email) {
    await this.emailInput.click();
    await this.emailInput.fill(email);
  }

  async clickContinueButton() {
    await this.continueButton.waitFor({ state: "visible" });
    await this.continueButton.click();
    await this.page.waitForTimeout(2000);
    console.log("URL after Suivant click:", this.page.url());
    await this.page.screenshot({ path: "after-suivant.png", fullPage: true });
  }

  async enterPassword(password) {
    let visibleField = null;
    const maxAttempts = 25;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const passwordFields = this.page.locator('input[type="password"]');
      const count = await passwordFields.count();

      for (let i = 0; i < count; i++) {
        if (await passwordFields.nth(i).isVisible()) {
          visibleField = passwordFields.nth(i);
          break;
        }
      }

      if (visibleField) break;
      await this.page.waitForTimeout(1000);
    }

    if (!visibleField) {
      throw new Error("No visible password field found after waiting");
    }

    await visibleField.click();
    await visibleField.fill(password);
  }
  async clickLoginButton() {
    const passwordField = this.page
      .locator('input[type="password"]:visible')
      .first();
    const passwordCount = await passwordField.count();

    if (passwordCount > 0) {
      await passwordField.click();
    }

    await this.page.waitForTimeout(1000);

    const loginBtn = this.page
      .getByRole("button", { name: "Me connecter" })
      .locator("visible=true")
      .first();
    await loginBtn.waitFor({ state: "visible", timeout: 15000 });
    await loginBtn.click();
  }

  async verifyLoginSuccess() {
    await expect(this.myAccount).toBeVisible();
  }

  async verifyInvalidLoginError() {
    await expect(this.invalidPassError).toBeVisible();
  }

  async verifyCannotProceedWithInvalidEmail() {
    await this.emailInput.waitFor({ state: "visible", timeout: 5000 });
    const isInvalid = await this.emailInput.evaluate(
      (el) => !el.checkValidity(),
    );
    assert.ok(
      isInvalid,
      "Expected email field to reject invalid format, but it was accepted",
    );

    const passwordVisible = await this.page
      .locator('input[type="password"]:visible')
      .count();
    assert.strictEqual(
      passwordVisible,
      0,
      "Expected password field to NOT appear, but it did",
    );
  }

  async verifyEmailNotFoundError() {
    const errorLocator = this.page.getByText("Email could not be found");
    await errorLocator.waitFor({ state: "visible", timeout: 10000 });
    await expect(errorLocator).toBeVisible();
  }
  async clickGoogleLoginButton() {
    const popupPromise = this.page.waitForEvent("popup");
    await this.googleLoginButton.click();
    this.googlePopup = await popupPromise;
  }

  async verifyGoogleRedirect() {
    await this.googlePopup.waitForLoadState();
    const url = this.googlePopup.url();
    console.log("Google popup URL:", url);
    assert.ok(
      url.includes("accounts.google.com"),
      `Expected Google URL, got: ${url}`,
    );
    await this.googlePopup.close();
  }

  async clickAppleLoginButton() {
    const popupPromise = this.page.waitForEvent("popup");
    await this.appleLoginButton.click();
    this.applePopup = await popupPromise;
  }

  async verifyAppleRedirect() {
    await this.applePopup.waitForLoadState();
    const url = this.applePopup.url();
    console.log("Apple popup URL:", url);
    assert.ok(
      url.includes("appleid.apple.com"),
      `Expected Apple URL, got: ${url}`,
    );
    await this.applePopup.close();
  }

  async clickFacebookLoginButton() {
    const popupPromise = this.page.waitForEvent("popup");
    await this.facebookLoginButton.click();
    this.facebookPopup = await popupPromise;
  }

  async verifyFacebookRedirect() {
    await this.facebookPopup.waitForLoadState();
    const url = this.facebookPopup.url();
    console.log("Facebook popup URL:", url);
    assert.ok(
      url.includes("facebook.com"),
      `Expected Facebook URL, got: ${url}`,
    );
    await this.facebookPopup.close();
  }
  async clickLogoutLink() {
    await this.page.goto("https://www.direct-optic.fr/custom-logout", {
      waitUntil: "domcontentloaded",
    });
  }

  async verifyLoggedOut() {
    // Logout ke baad login page pe wapas aana chahiye
    await this.profileIcon.waitFor({ state: "visible", timeout: 10000 });
    await this.profileIcon.click();

    // Login form (email field) dikhni chahiye, matlab logged out hai
    await this.emailInput.waitFor({ state: "visible", timeout: 10000 });
    assert.ok(
      await this.emailInput.isVisible(),
      "Expected login form after logout, but user still seems logged in",
    );
  }
}

module.exports = LoginPage;
