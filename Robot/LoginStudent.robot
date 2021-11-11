*** Settings ***
<<<<<<< HEAD:Robot/LoginStudent.robot
Documentation    Test that is verifying the opening of Google.com Checks if the installation is correct.
=======
Documentation   Bzzt ~ Boop Test that is verifying the opening of Google.com Checks if the installation is correct.
>>>>>>> origin/JordansBranch:Robot/internAppLogin.robot

Library    SeleniumLibrary

*** Variables ***
${studentUsername}    sfv@dkfvv.df
${studentPassword}    12345

*** Keyword ***
#This is the automated function for making the robot click at a location
#working on this
Click at Location
    [Arguments]    ${Locator}
    Mouse Down    ${Locator}
    Mouse Up    ${Locator}


*** Test Cases ***
# Opens a browser with a given Url "localhost:8000" with a specific driver "Chrome"

Open Home Page
    Open Browser    http://localhost:8000/    chrome
    Maximize Browser Window

Move to Login Page
#This is the click function at a given xpath, more specifically the button the goto the login page

    Mouse Down    xpath:/html/body/div/div/a[1]
    Mouse Up    xpath:/html/body/div/div/a[1]

Attempt to Login With Credentials
#passes the password variables into the xpath locations for username box and password box respectively. Then it clicks the login
<<<<<<< HEAD:Robot/LoginStudent.robot
    Sleep    2s
    Input Text    //*[@id="emailTxt"]    ${studentUsername}
    Input Text    //*[@id="passwordTxt"]    ${studentPassword}
=======

    Input Text    //*[@id="emailTxt"]    ${adminUsername}
    Input Text    //*[@id="passwordTxt"]    ${adminPassword}
>>>>>>> origin/JordansBranch:Robot/internAppLogin.robot
    Mouse Down    //*[@id="loginBtn"]
    Mouse Up    //*[@id="loginBtn"]
