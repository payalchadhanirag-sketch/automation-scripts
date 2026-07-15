Feature: Homepage and Navigation Menu

  @navigation @menu @lunettesDeVue
  Scenario: Navigate to Lunettes de vue page
    Given user is on home page
    When user clicks on "Lunettes de vue" menu link
    Then user should be on the "Lunettes de vue" page

  @navigation @menu @lunettesDeSoleil
  Scenario: Navigate to Lunettes de soleil page
    Given user is on home page
    When user clicks on "Lunettes de soleil" menu link
    Then user should be on the "Lunettes de soleil" page

  @navigation @menu @remplacementVerres
  Scenario: Navigate to Remplacement de verres page
    Given user is on home page
    When user clicks on "Remplacement de verres" menu link
    Then user should be on the "Remplacement de verres" page

  @navigation @menu @commentCommander
  Scenario: Navigate to Comment commander page
    Given user is on home page
    When user clicks on "Comment commander" menu link
    Then user should be on the "Comment commander" page

  @navigation @menu @contactPage
  Scenario: Navigate to Contact page
    Given user is on home page
    When user clicks on "Contact" menu link
    Then user should be on the "Contact" page

  @navigation @banner
  Scenario: Homepage hero banner is clickable and navigates away from homepage
    Given user is on home page
    When user clicks on the main hero banner
    Then user should be navigated to a different page

  @navigation @search
  Scenario: Search box opens and can be closed
    Given user is on home page
    When user clicks on the search box
    Then the search overlay should open
    When user closes the search overlay
    Then the search overlay should close

@navigation @mobile
Scenario: Mobile view shows hamburger menu
    Given user is on home page
    When user switches to mobile screen size
    Then hamburger menu icon should be visible