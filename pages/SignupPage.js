const assert = require("assert");
const { expect } = require("@playwright/test");

class SignupPage {
  constructor(page) {
    this.page = page;

    this.civilityMme = page.getByText("Mme *");
    this.lastNameInput = page.getByRole("textbox", {
      name: "Nom *",
      exact: true,
    });
    this.firstNameInput = page.getByRole("textbox", { name: "Prénom *" });
    this.closeConsentBanner = page.getByRole("button", {
      name: "Fermer sans accepter les",
    });

    this.addressInput = page.getByRole("textbox", { name: "Adresse *" });
    this.addressComplementInput = page.getByRole("textbox", {
      name: "Complément d'adresse",
    });
    this.postalCodeInput = page.getByRole("textbox", { name: "Code postal *" });
    this.cityInput = page.getByRole("textbox", { name: "Ville *" });
    this.countryDropdown = page.getByRole("combobox", {
      name: "France (Métropolitaine)",
    });

    this.dayDropdown = page.getByRole("combobox", { name: "Jour" });
    this.monthDropdown = page.getByRole("combobox", { name: "Mois" });
    this.yearDropdown = page.getByRole("combobox", { name: "Année" });

    this.accountEmailInput = page
      .getByRole("textbox", { name: "Adresse e-mail *", exact: true })
      .locator("visible=true")
      .first();

    this.confirmEmailInput = page.getByRole("textbox", {
      name: "Confirmation de l'adresse e-",
    });

    this.passwordInput = page.getByRole("textbox", {
      name: "Mot de passe *",
      exact: true,
    });

    this.confirmPasswordInput = page.getByRole("textbox", {
      name: "Confirmation du mot de passe *",
    });

    this.offerCheckbox = page.getByText(
      "Recevoir 15€ de réduction immédiate**: j'accepte de recevoir les offres",
    );

    this.phoneInput = page.getByRole("textbox", { name: "Téléphone mobile *" });
    this.countrySelectedDropdown = page.getByRole("combobox", {
      name: "Selected country",
    });
    this.phoneCountrySearch = page.getByRole("combobox", { name: "Search" });

    // Submit
    this.validateAccountButton = page.getByRole("button", {
      name: "Valider mon compte",
    });
    this.myAccountText = page.getByRole("main").getByText("Mon compte");
  }

  async fillRegistrationForm(details) {
    await this.civilityMme.click();

    await this.lastNameInput.click();
    await this.lastNameInput.fill(details.lastName);
    await this.firstNameInput.click();
    await this.firstNameInput.fill(details.firstName);

    if (await this.closeConsentBanner.isVisible().catch(() => false)) {
      await this.closeConsentBanner.click();
    }

    await this.addressInput.click();
    await this.addressInput.fill(details.address);
    await this.addressComplementInput.click();
    await this.addressComplementInput.fill(details.addressComplement);
    await this.postalCodeInput.click();
    await this.postalCodeInput.fill(details.postalCode);
    await this.cityInput.click();
    await this.cityInput.fill(details.city);

    await this.countryDropdown.click();
    await this.page.getByRole("option", { name: details.country }).click();

    await this.dayDropdown.click();
    await this.page.getByRole("option", { name: details.dob.day }).click();
    await this.monthDropdown.click();
    await this.page.getByRole("option", { name: details.dob.month }).click();
    await this.yearDropdown.click();
    await this.page.getByRole("option", { name: details.dob.year }).click();

    await this.accountEmailInput.click();
    await this.accountEmailInput.fill(details.email);

    await this.confirmEmailInput.click();
    await this.confirmEmailInput.fill(details.email);

    await this.passwordInput.click();
    await this.passwordInput.fill(details.password);
    await this.confirmPasswordInput.click();
    await this.confirmPasswordInput.fill(details.password);

    await this.dismissAxeptioOverlay();

    await this.phoneInput.click();
    await this.countrySelectedDropdown.click();
    await this.phoneCountrySearch.click();
    await this.phoneCountrySearch.fill(details.phoneCountry);
    await this.page.getByRole("option", { name: "India", exact: true }).click();
    await this.phoneInput.click();
    await this.phoneInput.fill(details.phone);

    await this.dismissAxeptioOverlay();

    await this.offerCheckbox.click();
  }

  async dismissAxeptioOverlay() {
    try {
      const closeBtn = this.page
        .locator(
          '#axeptio_overlay button, #axeptio_overlay [aria-label="Fermer"], button:has-text("OK pour moi"), button:has-text("Fermer")',
        )
        .first();
      if (await closeBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
        await closeBtn.click();
        console.log("Axeptio overlay dismissed mid-form");
      }
    } catch (e) {}
  }

  async clickValidateAccountButton() {
    await this.validateAccountButton.waitFor({
      state: "visible",
      timeout: 10000,
    });
    await this.validateAccountButton.click();
  }

  async verifyAccountCreated() {
    await this.myAccountText.waitFor({ state: "visible", timeout: 10000 });
    await expect(this.myAccountText).toBeVisible();
  }
  async fillRegistrationFormWithMismatchedPasswords(details) {
    await this.civilityMme.click();
    await this.lastNameInput.click();
    await this.lastNameInput.fill(details.lastName);
    await this.firstNameInput.click();
    await this.firstNameInput.fill(details.firstName);

    if (await this.closeConsentBanner.isVisible().catch(() => false)) {
      await this.closeConsentBanner.click();
    }

    await this.addressInput.click();
    await this.addressInput.fill(details.address);
    await this.postalCodeInput.click();
    await this.postalCodeInput.fill(details.postalCode);
    await this.cityInput.click();
    await this.cityInput.fill(details.city);

    await this.countryDropdown.click();
    await this.page.getByRole("option", { name: details.country }).click();

    await this.dayDropdown.click();
    await this.page.getByRole("option", { name: details.dob.day }).click();
    await this.monthDropdown.click();
    await this.page.getByRole("option", { name: details.dob.month }).click();
    await this.yearDropdown.click();
    await this.page.getByRole("option", { name: details.dob.year }).click();

    await this.accountEmailInput.click();
    await this.accountEmailInput.fill(details.email);
    await this.confirmEmailInput.click();
    await this.confirmEmailInput.fill(details.email);

    await this.passwordInput.click();
    await this.passwordInput.fill(details.password);
    await this.confirmPasswordInput.click();
    await this.confirmPasswordInput.fill(details.confirmPassword);

    await this.dismissAxeptioOverlay();
    await this.clickValidateAccountButton();
  }

  async submitFormWithMissingFields() {
    await this.civilityMme.click();

    if (await this.closeConsentBanner.isVisible().catch(() => false)) {
      await this.closeConsentBanner.click();
    }

    await this.dismissAxeptioOverlay();

    await this.validateAccountButton.click();
  }

  async verifyRequiredFieldErrors() {
    const stillOnForm = await this.civilityMme.isVisible().catch(() => false);
    console.log("Still on registration form after empty submit:", stillOnForm);

    await this.page.screenshot({
      path: "missing-fields-debug.png",
      fullPage: true,
    });

    const errorTexts = await this.page
      .locator("[class*='error'], .alert-danger, [class*='invalid']")
      .allInnerTexts();
    console.log("All validation error messages found on page:", errorTexts);
    const nameInvalid = await this.lastNameInput
      .evaluate((el) => !el.checkValidity())
      .catch(() => null);
    console.log("Name field invalid (native validation):", nameInvalid);

    if (!stillOnForm) {
      throw new Error(
        "Expected to remain on registration form due to missing fields, but form was submitted",
      );
    }
  }
  async fillFormWithInvalidEmail(details) {
    await this.civilityMme.click();
    await this.lastNameInput.click();
    await this.lastNameInput.fill(details.lastName);
    await this.firstNameInput.click();
    await this.firstNameInput.fill(details.firstName);

    if (await this.closeConsentBanner.isVisible().catch(() => false)) {
      await this.closeConsentBanner.click();
    }

    await this.addressInput.click();
    await this.addressInput.fill(details.address);
    await this.postalCodeInput.click();
    await this.postalCodeInput.fill(details.postalCode);
    await this.cityInput.click();
    await this.cityInput.fill(details.city);

    await this.countryDropdown.click();
    await this.page.getByRole("option", { name: details.country }).click();

    await this.dayDropdown.click();
    await this.page.getByRole("option", { name: details.dob.day }).click();
    await this.monthDropdown.click();
    await this.page.getByRole("option", { name: details.dob.month }).click();
    await this.yearDropdown.click();
    await this.page.getByRole("option", { name: details.dob.year }).click();

    await this.accountEmailInput.click();
    await this.accountEmailInput.fill(details.invalidEmail);
    await this.confirmEmailInput.click();
    await this.confirmEmailInput.fill(details.invalidEmail);

    await this.passwordInput.click();
    await this.passwordInput.fill(details.password);
    await this.confirmPasswordInput.click();
    await this.confirmPasswordInput.fill(details.password);

    await this.dismissAxeptioOverlay();

    await this.phoneInput.click();
    await this.countrySelectedDropdown.click();
    await this.phoneCountrySearch.click();
    await this.phoneCountrySearch.fill(details.phoneCountry);
    await this.page.getByRole("option", { name: "India", exact: true }).click();
    await this.phoneInput.click();
    await this.phoneInput.fill(details.phone);

    await this.dismissAxeptioOverlay();
    await this.offerCheckbox.click();

    await this.clickValidateAccountButton();
  }

  async verifyCannotSubmitInvalidEmailForm() {
    await this.page.screenshot({
      path: "invalid-email-format-debug.png",
      fullPage: true,
    });

    const stillOnForm = await this.civilityMme.isVisible().catch(() => false);
    console.log("Still on registration form after submit:", stillOnForm);

    const errorTexts = await this.page
      .locator("[class*='error'], .alert-danger, [class*='invalid']")
      .allInnerTexts();
    console.log("All error messages found on page:", errorTexts);

    assert.ok(
      stillOnForm,
      "Expected to remain on registration form due to invalid email, but form was submitted successfully",
    );
  }
  async changeEmailToExistingInForm(existingEmail) {
    await this.accountEmailInput.click();
    await this.accountEmailInput.fill("");
    await this.accountEmailInput.fill(existingEmail);

    await this.confirmEmailInput.click();
  }
  async fillRegistrationFormWithExistingEmail(details) {
    await this.civilityMme.click();
    await this.lastNameInput.click();
    await this.lastNameInput.fill(details.lastName);
    await this.firstNameInput.click();
    await this.firstNameInput.fill(details.firstName);

    if (await this.closeConsentBanner.isVisible().catch(() => false)) {
      await this.closeConsentBanner.click();
    }

    await this.addressInput.click();
    await this.addressInput.fill(details.address);
    await this.postalCodeInput.click();
    await this.postalCodeInput.fill(details.postalCode);
    await this.cityInput.click();
    await this.cityInput.fill(details.city);

    await this.countryDropdown.click();
    await this.page.getByRole("option", { name: details.country }).click();

    await this.dayDropdown.click();
    await this.page.getByRole("option", { name: details.dob.day }).click();
    await this.monthDropdown.click();
    await this.page.getByRole("option", { name: details.dob.month }).click();
    await this.yearDropdown.click();
    await this.page.getByRole("option", { name: details.dob.year }).click();

    await this.accountEmailInput.click();
    await this.accountEmailInput.fill("");
    await this.accountEmailInput.fill(details.existingEmail);

    await this.confirmEmailInput.click();
    await this.confirmEmailInput.fill(details.existingEmail);

    await this.passwordInput.click();
    await this.passwordInput.fill(details.password);
    await this.confirmPasswordInput.click();
    await this.confirmPasswordInput.fill(details.password);

    await this.dismissAxeptioOverlay();

    await this.phoneInput.click();
    await this.countrySelectedDropdown.click();
    await this.phoneCountrySearch.click();
    await this.phoneCountrySearch.fill(details.phoneCountry);
    await this.page.getByRole("option", { name: "India", exact: true }).click();
    await this.phoneInput.click();
    await this.phoneInput.fill(details.phone);

    await this.dismissAxeptioOverlay();
    await this.offerCheckbox.click();

    await this.clickValidateAccountButton();
  }

  async verifyEmailAlreadyUsedError() {
    const errorLocator = this.page
      .getByText("Il y déjà une compte associé à cet email")
      .first();

    await errorLocator.waitFor({ state: "visible", timeout: 10000 });
    console.log("CONFIRMED: 'Email already used' error is shown correctly");
  }

  async verifyPasswordMismatchError() {
    const error = this.page
      .getByText("les mots de passes ne sont pas identiques")
      .first();

    await error.waitFor({
      state: "visible",
      timeout: 10000,
    });

    await expect(error).toBeVisible();

    console.log("Password mismatch error displayed successfully");
  }
}

module.exports = SignupPage;
