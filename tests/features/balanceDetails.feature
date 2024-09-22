Feature: test Balance Details Functionality

  Scenario: User can filter by relative date
    Given User logs into the application
    Given User navigates to the Balance Details View
    And User hovers over "Date Value"
    And User clicks on the filter icon that appears
    When User selects relative filtering
    And User picks up an option from the drop down list
    And User clicks apply
    Then Table is updated based on the selected values
