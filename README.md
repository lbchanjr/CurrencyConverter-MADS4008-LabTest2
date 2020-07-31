# CurrencyConverter-MADS4008-LabTest2

## PROBLEM DESCRIPTION

### Overview:
You have been contracted as a mobile developer to develop a simple one screen
Money Exchange Calculator in the form of a cross platform app using React Native .
Requirement 1 (Look and feel): [10 marks]
Please note, your app MUST be laid out and look similar to Figure 1.1. Additionally, your app
must contain all the pertinent React Native components and styles so that it looks similar to
Figure 1.1 (Some React Native Components include : Image, Picker, Text, Textinput,
Button,etc)
Figure 1.1
Picker 1, and Picker 2 should list the following country codes CAD, USD, EUR, GBP
2
Requirement 2 ( Money Exchange Rate Calculation ): [10 marks]
Your app must implement the Exchange Rate Calculation functionality. This is done with the
help of a REST API.
When the user changes the number value in the Text Input field, your app must calculate the
exchange rate between the country code selected from the 1st picker against the country
code selected in the 2nd picker.
For example, If the user selects USD as the first country code with the first picker and CAD
as the second country code with the second picker and 200 is entered in the Text Input field
then your app MUST send an HTTP request to the API, get the relevant data, calculate and
display what is the exchange rate of $200.00 USD in CAD. Also, your app must show what
is the exchange rate of 1USD in CAD, as show in the Figure 1.2
Figure 1.2
See API’s endpoint :
https://api.exchangerate-api.com/v4/latest/ Country_Code_of_FirstPicker
If the user selects USD as the first country code picker then the app should send an HTTP
request to the following endpoint :
https://api.exchangerate-api.com/v4/latest/USD
3
Figure 1.3
The below is a snapshot of the JSON response that will be sent back from the API.
Requirement 3 (Swap button functionality): [5 marks]
When the user clicks on the swap button, the country code value of the first picker and
second picker must be swapped with each other. Also, the app must re-calculate and display
the exchange rate of the two countries based on the new swapped data.
Requirement 4 (Create a customized Component): [5 marks]
Your app must have the default App component and you MUST create an additional
customized component and use it in an intuitive way.
