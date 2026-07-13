const { Given, When, Then } = require("@cucumber/cucumber");
const LoginPage = require("../../pages/LoginPage");

let loginPage;

When("user clicks on profile icon", async function () {
  loginPage = new LoginPage(this.page);
  await loginPage.clickProfileIcon();
});

When("user enters {string} in email field", async function (email) {
  await loginPage.enterEmail(email);
});

When("user clicks on continue button", async function () {
  await loginPage.clickContinueButton();
});

When("user enters {string} in password field", async function (password) {
  await loginPage.enterPassword(password);
});

When("user clicks on login button", async function () {
  await loginPage.clickLoginButton();
});

Then("user should be redirected to My Account dashboard", async function () {
  await loginPage.verifyLoginSuccess();
});

Then("user should see an invalid login error", async function () {
  await loginPage.verifyInvalidLoginError();
});

Then(
  "user should not be able to proceed with invalid email",
  async function () {
    await loginPage.verifyCannotProceedWithInvalidEmail();
  },
);

Then("user should see an email not found error", async function () {
  await loginPage.verifyEmailNotFoundError();
});

When("user clicks on Google login button", async function () {
  await loginPage.clickGoogleLoginButton();
});

Then("user should be redirected to Google sign-in page", async function () {
  await loginPage.verifyGoogleRedirect();
});

When("user clicks on Apple login button", async function () {
  await loginPage.clickAppleLoginButton();
});

Then("user should be redirected to Apple sign-in page", async function () {
  await loginPage.verifyAppleRedirect();
});

When("user clicks on Facebook login button", async function () {
  await loginPage.clickFacebookLoginButton();
});

Then("user should be redirected to Facebook sign-in page", async function () {
  await loginPage.verifyFacebookRedirect();
});

When("user clicks on logout link", async function () {
  await loginPage.clickLogoutLink();
});

Then("user should be logged out successfully", async function () {
  await loginPage.verifyLoggedOut();
});
