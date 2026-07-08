Feature: Search
Scenario: Search valid product
Given user is on home page
When user enters "lunettes" in search field
And user presses enter key
Then user should see search results