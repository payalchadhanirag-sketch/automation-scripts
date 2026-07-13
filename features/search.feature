Feature: Search

@search @valid
Scenario: Search valid product
Given user is on home page
When user clicks on search icon
And user enters "lunettes" in search field
Then user should see search results


@search @invalid
Scenario: Search invalid product
Given user is on home page
When user clicks on search icon
And user enters "gherkin" in search field
Then user should see no search results