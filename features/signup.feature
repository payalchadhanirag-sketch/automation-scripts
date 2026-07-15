Feature: Signup

  @signup @valid
  Scenario: Signup with valid details
    Given user is on home page
    When user clicks on profile icon
    And user enters a new email in email field
    And user clicks on continue button
    And user fills registration form with valid details
    Then user account should be created successfully

@signup @invalid @duplicateEmail
  Scenario: Signup with already registered email
    Given user is on home page
    When user clicks on profile icon
    And user enters a new email in email field
    And user clicks on continue button
    And user changes email to an already registered one in registration form
    Then user should see an email already used error

  @signup @invalid @passwordMismatch
  Scenario: Signup with mismatched password confirmation
    Given user is on home page
    When user clicks on profile icon
    And user enters a new email in email field
    And user clicks on continue button
    And user fills registration form with mismatched passwords
    Then user should see a password mismatch error

  @signup @invalid @missingFields
  Scenario: Signup with missing required fields
    Given user is on home page
    When user clicks on profile icon
    And user enters a new email in email field
    And user clicks on continue button
    And user submits registration form with missing required fields
    Then user should see required field validation errors

  @signup @invalid @invalidEmailFormat
  Scenario: Signup with invalid email format in registration form
    Given user is on home page
    When user clicks on profile icon
    And user enters a new email in email field
    And user clicks on continue button
    And user fills registration form with an invalid email format
    Then user should not be able to submit registration form