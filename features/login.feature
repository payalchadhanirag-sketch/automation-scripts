Feature: Login

@login @valid
    Scenario: Login with valid credentials
    Given user is on home page
    When user clicks on profile icon
    And user enters "tester@mailinator.com" in email field
    And user clicks on continue button
    And user enters "Test@123" in password field
    And user clicks on login button
    Then user should be redirected to My Account dashboard

@login @invalid @wrongPassword
    Scenario: Login with wrong password
    Given user is on home page
    When user clicks on profile icon
    And user enters "tester@mailinator.com" in email field
    And user clicks on continue button
    And user enters "WrongPass@123" in password field
    And user clicks on login button
    Then user should see an invalid login error

@login @invalid @wrongEmail
    Scenario: Login with wrong email format
    Given user is on home page
    When user clicks on profile icon
    And user enters "xyzxyzxyz" in email field
    And user clicks on continue button
    Then user should not be able to proceed with invalid email

@logout
  Scenario: User can logout successfully
    Given user is on home page
    When user clicks on profile icon
    And user enters "tester@mailinator.com" in email field
    And user clicks on continue button
    And user enters "Test@123" in password field
    And user clicks on login button
    Then user should be redirected to My Account dashboard
    When user clicks on logout link
    Then user should be logged out successfully


@login @social @google
  Scenario: Google login button redirects correctly
    Given user is on home page
    When user clicks on profile icon
    And user clicks on Google login button
    Then user should be redirected to Google sign-in page

  @login @social @apple
  Scenario: Apple login button redirects correctly
    Given user is on home page
    When user clicks on profile icon
    And user clicks on Apple login button
    Then user should be redirected to Apple sign-in page

  @login @social @facebook
  Scenario: Facebook login button redirects correctly
    Given user is on home page
    When user clicks on profile icon
    And user clicks on Facebook login button
    Then user should be redirected to Facebook sign-in page
