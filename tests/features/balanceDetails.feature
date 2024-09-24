Feature: test Balance Details Functionality

  Scenario: User can filter by relative date
    Given User navigates to the Balance Details View
    When User filters based on relative date
    Then Table is updated based on the selected values

  Scenario: User downloads a csv
    Given User navigates to the Balance Details View
    When User clicks on the export button
    Then File is downloaded
    And Contents of the file are correct

  Scenario: User downloads a pdf
    Given User navigates to the Balance Details View
    When User clicks on the print button
    Then File is downloaded
    And Contents of the file are correct
