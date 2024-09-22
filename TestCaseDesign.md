
# Test Design

I have tried using a gherkin structure for the test design but I am not that familiar with it, so structure and naming might be a bit off 😄.

I also left out some tests that would target specific components like the date picker or column editor, because I assume those components would have their own stories/features, since i saw them used across the app

## Clarifying Questions

1. What fields need to be included in the account details?
2. Should the navigation arrows at the bottom of the Balance Details page be displayed if user has only one account?

## Test Cases
**Prerequisites :**

    User has access to the corporate portal and has atleast one open account


### Balance Details:

**1.Scenario: User navigates to the page and displayed details are correct**  
GIVEN User navigates to balances view   
WHEN User clicks on an account name in the accounts table  
THEN the user is redirected to a balance details page for the selected account  
AND the information displayed for the selected account matches the information in the Administration>Account>Master Data tab  
AND a history of balances is displayed for the selected account


**2.Scenario: User changes the table view**  
GIVEN the user navigates to the Balance Details View  
WHEN the user scrolls to the Account Balances table
AND the user selects a pre-configured view from the dropdown  
THEN the table is updated accordingly

**3.Scenario: User closes the Balance Details Page**  
GIVEN the user navigates to the Balance Details View  
WHEN the user clicks on the Close button at the bottom of the page  
THEN the user is redirected back to the Balances page

**4.Scenario: User navigates between accounts**  
GIVEN the user navigates to the Balance Details View  
WHEN the user clicks on the arrows/numbers at the bottom of the page  
THEN the user can move between the Balance Details of different accounts he has

**5.Scenario: User downloads a csv**  
GIVEN the user navigates to the Balance Details View  
WHEN the user clicks on the export button  
THEN a CSV file containing the information for the currently selected view is downlaoded  
AND the contents of the file are correct

**6.Scenario: User downloads a pdf**  
GIVEN the user navigates to the Balance Details View  
WHEN the user clicks on the print button  
THEN a pdf file containing the information for the currently selected view is downlaoded  
AND the contents of the file are correct

**7.Scenario: User sorts by date**  
GIVEN the user navigates to the Balance Details View  
WHEN the user clicks on "Value Date"
THEN the table is sorted by date in ascending/descending order

**8.Scenario: User sorts by balance**  
GIVEN the user navigates to the Balance Details View  
WHEN the user clicks on "Value Balance  
THEN the table is sorted by balance in ascending/descending order  

**9.Scenario: User configures table structure**  
Note: Im assuming this component would be tested on another story/feature but im adding this case for completeness  
GIVEN the user navigates to the Balance Details View 
AND user clicks on the cog icon at the top of the table  
WHEN the user deselects a checkbox or changes the order  
AND the user clicks save  
THEN the structurer of the table is updated  

**10.Scenario: User can filter by balance**  
GIVEN the user navigates to the Balance Details View   
AND the user hovers over "Balance Value"  
AND the user clicks on the filter icon that appears  
WHEN the user updates the interval values  
AND the user clicks apply
THEN the table is updated based on the selected values

**11.Scenario: User can filter by relative date**    
GIVEN the user navigates to the Balance Details View   
AND the user hovers over "Date Value"  
AND the user clicks on the filter icon that appears  
WHEN the user selects relative filtering
AND the user picks up an option from the drop down list
AND the user clicks apply
THEN the table is updated based on the selected values

**12.Scenario: User can filter by defined date**  
GIVEN the user navigates to the Balance Details View   
AND the user hovers over "Date Value"  
AND the user clicks on the filter icon that appears  
WHEN the user selects absolute filtering  
AND the user picks up inputs a date interval  
AND the user clicks apply  
THEN the table is updated based on the selected values  

**13.Scenario: Save and revert buttons appear when user changes view configuration**  
GIVEN the user navigates to the Balance Details View  
WHEN User changes the view configuration(applies filters, sorts, etc)  
THEN a save and revert icon appears near the table view name  

**14.Scenario: User can save a new table view**  
GIVEN the user navigates to the Balance Details View   
AND User changes the view configuration(applies filters, sorts, etc)   
WHEN User clicks the save icon  
AND user selects "Save as new view"   
AND user clicks Save  
THEN the view configuration is saved  
AND the new view can be selected from the drop-down  

**15.Scenario: User can update an existing custom table view**  
GIVEN the user navigates to the Balance Details View   
AND user selects a user defined table view from the dropdown  
AND User changes the view configuration(applies filters, sorts, etc)   
WHEN User clicks the save icon  
AND user selects "Update Existing View"   
AND user clicks Save  
THEN the selected view configuration is updated  

**16.Scenario: User cannot update a system default table view**  
GIVEN the user navigates to the Balance Details View  
AND user selects a system predefined table view from the dropdown  
AND User changes the view configuration(applies filters, sorts, etc)   
WHEN User clicks the save icon  
THEN the option "Update Existing View" is not displayed  
AND clicking save after chosing a name creates a new view  
BUT the system defined view is not updated 

**17.Scenario: User can discard table view changes**  
GIVEN the user navigates to the Balance Details View  
AND User changes the view configuration(applies filters, sorts, etc)   
WHEN User clicks the refresh icon  
THEN the changes are reset
AND no new configuration is created
AND no configuration is updated

**18. Scenario: User can save a view as default**  
GIVEN the user navigates to the Balance Details View   
AND User changes the view configuration(applies filters, sorts, etc)   
WHEN User clicks the save icon
AND User ticks the "save as default" option  
THEN the view is saved/updated  
AND the view is displayed whenever the user navigates to the Balance Details page  

**19. Scenario: balance values are only positive floats**
WHEN the user navigates to the Balance Details View  
THEN all balance values are positive float numbers