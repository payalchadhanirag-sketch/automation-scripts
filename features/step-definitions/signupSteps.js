const { When, Then } = require("@cucumber/cucumber");
const SignupPage = require("../../pages/SignupPage");
const LoginPage = require("../../pages/LoginPage");

let signupPage;
let loginPage;

When("user enters a new email in email field", async function () {
  loginPage = new LoginPage(this.page);

  this.uniqueEmail = `payal${Date.now()}${Math.floor(Math.random() * 1000)}@mailinator.com`;
  console.log("Generated Email:", this.uniqueEmail);

  await loginPage.enterEmail(this.uniqueEmail);
});

When("user fills registration form with valid details", async function () {
  signupPage = new SignupPage(this.page);

  await signupPage.fillRegistrationForm({
    lastName: "Chadha",
    firstName: "Payal",
    address: "Mohali",
    addressComplement: "Punjab",
    postalCode: "75001",
    city: "Paris",
    country: "Inde",
    dob: {
      day: "02",
      month: "01",
      year: "2000",
    },
    email: this.uniqueEmail,
    password: "Test@123",
    phoneCountry: "ind",
    phone: "9876543210",
  });

  await signupPage.clickValidateAccountButton();
});

Then("user account should be created successfully", async function () {
  await signupPage.verifyAccountCreated();
});

When(
  "user fills registration form with mismatched passwords",
  async function () {
    signupPage = new SignupPage(this.page);
    await signupPage.fillRegistrationFormWithMismatchedPasswords({
      lastName: "Chadha",
      firstName: "Payal",
      address: "Mohali",
      postalCode: "75001",
      city: "Paris",
      country: "Inde",
      dob: { day: "02", month: "01", year: "2000" },
      email: this.uniqueEmail,
      password: "Test@123",
      confirmPassword: "Different@456",
    });
  },
);

Then("user should see a password mismatch error", async function () {
  await signupPage.verifyPasswordMismatchError();
});

Then(
  "user should see invalid credentials error for existing account",
  async function () {
    loginPage = new LoginPage(this.page);
    await loginPage.verifyInvalidLoginError();
  },
);

When(
  "user submits registration form with missing required fields",
  async function () {
    signupPage = new SignupPage(this.page);
    await signupPage.submitFormWithMissingFields();
  },
);

Then("user should see required field validation errors", async function () {
  await signupPage.verifyRequiredFieldErrors();
});

When(
  "user fills registration form with an invalid email format",
  async function () {
    signupPage = new SignupPage(this.page);
    await signupPage.fillFormWithInvalidEmail({
      lastName: "Chadha",
      firstName: "Payal",
      address: "Mohali",
      postalCode: "75001",
      city: "Paris",
      country: "Inde",
      invalidEmail: "invalidemailformat",
    });
  },
);

Then("user should not be able to submit registration form", async function () {
  await signupPage.verifyCannotSubmitInvalidEmailForm();
});
