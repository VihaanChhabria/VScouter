# VScouter: FRC Scouting Revolutionized

<img src="website/public/VScouterLogo.png" alt="drawing" width="40%"/>

## Introduction

VScouter is a versatile scouting application designed for FRC (FIRST Robotics Competition) teams. It simplifies the data collection process for scouting teams during competitions, providing a robust and efficient platform to gather, analyze, and store performance metrics of competing robots.

## What is Scouting in FRC?

Scouting in FRC (FIRST Robotics Competition) is the process of collecting and analyzing data on teams and their robots to make informed strategic decisions during competitions. Since matches are played with randomly assigned alliance partners, having detailed scouting data helps teams understand the strengths, weaknesses, and play styles of other robots on the field. Effective scouting gives teams a competitive edge, allowing them to make strategic decisions based on facts rather than guesswork.

## Table of Contents

1. [Introduction](#introduction)
2. [What is Scouting in FRC?](#what-is-scouting-in-frc)
3. [Features](#features)
4. [Usage](#usage)
   - [Using The Website](#using-the-website)
   - [Collecting Data](#collecting-data)
   - [Parsing Data](#parsing-data)
   - [Analysis](#analysis)
     - [Analysis Pages](#analysis-pages)
5. [Generating Auto Completion Match Data](#generating-auto-completion-match-data)
6. [Inputting Auto Completion Match Data](#inputting-auto-completion-match-data)
7. [Running Locally](#running-locally)
8. [License](#license)
9. [Support](#support)

## Features

- Data collection though a [website](https://vscouter.netlify.app/)
- Website can be ran offline in environments with no internet
- Auto completion for teams to scout on scouting website
- Visual and intuitive buttons and pictures to help scout real-time
- USB flash drive data collection process

## Usage

### Using The Website

1. Visit [https://vscouter.netlify.app/](https://vscouter.netlify.app/)
2. **Main Page:** When the scouter loads into the app there are 4 main buttons. The `Full Screen` button makes the website go into full screen mode. The `Dump Data` button will download a JSON file of the scouting data. See [Collecting Data](#collecting-data) for more info. The `Start Scouting` button continues to the game start scouting page.
   ![HomeScreen](/readmeimages/HomeScreen.png)
3. **Settings Page:** Has various buttons for debugging and for loading auto match suggestions. `Get Match Data` redirects to the page for getting the auto match suggestions. See [Auto Completion Match Data](#auto-completion-match-data) for more info. `Clear Match Data` clears the auto match suggestions. `Clear Scouting Data` clears the scouting data that is saved on the device. `View Scouting Data` opens a page where the user is able to see the JSON version of the scouting data for debugging. The `Parse Data` button brings the user to the parse data page. See [Parsing Data](#parsing-data) for more info.
   ![SettingsPage](readmeimages/SettingsPage.png)
4. **Match Data:** Here the scouter can scan a QR code leading to the generated match data for the auto competition. See more at [Using](#using) of [Auto Completion Match Data](#auto-completion-match-data).
   ![MatchData](readmeimages/MatchData.png)
5. **Game Start:** The `Select Alliance` component allows the scouter to select the alliance they are scouting. The `Match Number` component allows the scouter to enter the match they are scouting. The `Scouting Initials` component allows the scouter to enter their initials. The `Select Team` component shows auto completion buttons that are based on the alliance and match that the scouter inputted previously. Additionally, the scouter may choose to select a different team than auto suggested. The button/input that is darker than the other is what is selected. The scouter may choose to click the `Back` Button to return to the past page. To advance to the next page, the scouter can click the `Proceed` button.
   ![GameStart](readmeimages/GameStart.png)
6. **Auto Start:** The scouter can enter where the robot generally starts. They may do this by clicking each zone on the map. The scouter may choose to click the `Back` Button to return to the past page. To advance to the next page, the scouter can click the `Proceed` button.
   ![AutoStart](readmeimages/AutoStart.png)
7. **Auto Scoring:** The page is separated into two main sections: coral and algae. In the coral section there is a side view of the reef separated into the levels of it: L1, L2, L3, L4, and Drop/Missed. Then there is a set of all the places you can pick a coral up in auto: the station, mark 1, mark 2, and mark 3. The roadmap of the user's input is selected where they got a coral and then where they placed it. In the algae section, the user may select where they picked up an algae (the reef, mark 1, mark 2, and mark 3) and where they placed it (net shot, processor, and drop/miss). The `Passed Starting Line` button automatically selects if the scouter selects any other action. The `Proceed` button starts blinking after 15 seconds to remind the scouter to switch pages.
   | Keybind | Button |
   |---------|-----------------------|
   | ` | Drop Miss Coral |
   | 1 | Place Coral L1 |
   | 2 | Place Coral L2 |
   | 3 | Place Coral L3 |
   | 4 | Place Coral L4 |
   | q | Pick Coral Station |
   | w | Pick Coral Mark 1 |
   | e | Pick Coral Mark 2 |
   | r | Pick Coral Mark 3 |
   | 9 | Place Algae Net Shot |
   | 0 | Place Algae Processor |
   | - | Drop Miss Algae |
   | u | Pick Algae Reef |
   | i | Pick Algae Mark 1 |
   | o | Pick Algae Mark 2 |
   | p | Pick Algae Mark 3 |
   ![AutoScoring](readmeimages/AutoScoring.png)
8. **Teleop Scoring:** This page is similar to the auto scoring page. The page is separated into two main sections: coral and algae. In the coral section there is a side view of the reef separated into the levels of it: L1, L2, L3, L4, and Drop/Missed. Then there is a set of all the places you can pick a coral up in auto: the station and the carpet. The roadmap of the user's input is selected where they got a coral and then where they placed it. In the algae section, the user may select where they picked up an algae (the reef and carpet) and where they placed it (net shot, processor, and drop/miss).
   | Keybind | Button |
   |---------|-----------------------|
   | ` | Drop Miss Coral |
   | 1 | Place Coral L1 |
   | 2 | Place Coral L2 |
   | 3 | Place Coral L3 |
   | 4 | Place Coral L4 |
   | q | Pick Coral Station |
   | w | Pick Coral Carpet |
   | 9 | Place Algae Net Shot |
   | 0 | Place Algae Processor |
   | - | Drop Miss Algae |
   | u | Pick Algae Reef |
   | i | Pick Algae Carpet |

![TeleopScoring](readmeimages/TeleopScoring.png) 9. **Endgame Scoring:** The `Shallow Climb`, `Deep Climb`, and `Park` buttons represent what the robot can do on the barge. Then there are toggles for if the robots climb failed, it played defense, and it if it broke down. The `Comments` textbox allows for the scouter to write any additional information such as if they broke down or got penalties.
![EndgameScoring](readmeimages/EndgameScoring.png)

### Collecting Data

1. To collect the data that the scouters have collected, collect a USB flash drive to the devices and click the `Dump Data` button on the home screen. This will download a JSON file of the scouting data. Move this and repeat for each of the scouting devices.
   ![DumpData](/readmeimages/DumpData.png)
2. You may want to delete the scouting data off of the device when done taking the data. This can be done by clicking the `Settings` button and then the `Clear Scouting Data` button.
   ![ClearScoutingData](/readmeimages/ClearScoutingData.gif)

### Parsing Data

1. To get to the parsing data page, click the `Settings` button, and then `Parse Data`.
2. To select the data that was scouted, plug the USB flash drive in with the collected data, click the `Select Files` button, and select all of the JSON data. This will add the files in a list to the right. If a file needs to be removed, the `x` button can be clicked next to the file names.
3. To combine this data into a CSV format, click the `Compile and Download` button. This will download a CSV file with the inputted data.
4. Feed this CSV file into the data analysis software.
   ![ParseData](/readmeimages/ParseData.gif)

### Analysis

Analysis is done through Power BI. You can download it for free [here](https://www.microsoft.com/en-us/power-platform/products/power-bi/downloads).

1. To analyze the CSV data you downloaded at [Parsing Data](#parsing-data) you must download the [Power BI file in this repository](/analysis/VScouter2025Analysis.pbix). Once downloaded, put the `pbix` file into an **empty folder**.
2. Next put you CSV file into the same folder as the `pbix` file. Rename it to `VScouterData.csv`
3. Open the `pbix` file with Power BI. To use this new data click `Transform Data` and then `dataFolderPath`. On this page change the directory to where the `pbix` file and CSV file are located (ex. `C:\Users\username\Documents\Analysis`). **There should not be a `\` at the end.**
4. Click `Close & Apply`.
   ![PowerBIFolderSelection](/readmeimages/PowerBIFolderSelection.gif)

#### Analysis Pages

- **Home Page:** This is the home page where you can go to the other analysis pages easily. **To click on the buttons, you press `ctrl+click`.**

![PowerBIHomePage](/readmeimages/PowerBIHomePage.png)

- **Game Dashboard:** On this page you can look the max, min, and medians of each team in total points, auto points, teleop points, coral points, and algae points. The top 5 are shown on this page. Clicking the arrow next to each graph will bring you to a specific page to it so you can see all of the teams. **During alliance selection, if a team is picked and you do not want to see their statistics, you can click the `Filter` panel to open it and filter the team out of the `selectTeam` filter in the `Filters on all pages` section.** 

![PowerBIGameDashboard](/readmeimages/PowerBIGameDashboard.png)

- **Team Abilities:** Here you can see a teams overall data. To change the team selected, you can use the list selection.

![PowerBITeamAbilities](/readmeimages/PowerBITeamAbilities.png)

- **Team Performance Over Time:** On this page you can see a teams performance over their matches played. This is scene in 5 graphs: total points, auto points, teleop points, algae points, and coral points. To change the team selected, you can use the list selection.

![PowerBIAutoNotesOverview](/readmeimages/PowerBITeamPerformanceOverTime.png)

- **Scouter Match Numbers:** On this page you can see how many matches a scouter has scouted. This is shown by a graph of each scouter initial and how many matches they have scouted. 

![PowerBIScouterMatchNumbers](/readmeimages/PowerBIScouterMatchNumbers.png)

## Generating Auto Completion Match Data

### Overview

To generate completion data, there are two available methods:

1. **QR Code Generation** – Suitable when scouting devices have internet access.
2. **Match Data File Generation** – Useful when scouting devices do not have reliable internet access. The data is transferred manually via USB drives or similar methods.

### Method 1: Generating a QR Code

This method allows scouting devices to receive match data through a QR code.

#### Steps:

1. Navigate to the `parsing` directory:
   ```sh
   cd parsing
   ```
2. Run the match data script:
   ```sh
   python GetMatchData.py
   ```
3. Select **Method 1** (Use of QR Codes).
4. Enter the **event key** when prompted.
5. Enter the **TBA API key** when prompted.
6. A link to the generated QR code will be provided. Open the link and save the QR code onto your device.
7. Transfer the QR code to a mobile device for easy scanning.
8. Scan the QR code using the app on scouting devices.
   - Refer to [Inputting Auto Completion Match Data](#inputting-auto-completion-match-data) for more details.

![AutoMatchSuggestionsOnline](readmeimages/AutoMatchSuggestionsOnline.gif)

### Method 2: Generating a File with Match Data

This method generates a JSON file with match data that can be transferred manually.

#### Steps:

1. Navigate to the `parsing` directory:
   ```sh
   cd parsing
   ```
2. Run the match data script:
   ```sh
   python GetMatchData.py
   ```
3. Select **Method 2** (Generate File with Match Data).
4. Enter the **event key** when prompted.
5. Enter the **TBA API key** when prompted.
6. The match data file will be generated and saved on your computer.
7. Transfer the file to scouting devices using a USB drive or another method.
8. Load the file into the website.
   - Refer to [Inputting Auto Completion Match Data](#inputting-auto-completion-match-data) for more details.

![AutoMatchSuggestionsOffline](readmeimages/AutoMatchSuggestionsOffline.gif)

## Inputting Auto Completion Match Data

There are two ways to input match data into the app:
a. Using QR Codes

1.  Click the Settings button on the main page.
2.  Select the Get Match Data button.
3.  Choose the Online option.
4.  Scan the QR code with your scouting device.
5.  Once the QR code is scanned, click Submit to input the match data into the app.

b. Manually Inputting a Match Data File

1.  Click the Settings button on the main page.
2.  Select the Get Match Data button.
3.  Choose the Offline option.
4.  Select the match data file you want to input from your device.
5.  Once the file is selected, click Submit to input the match data into the app.

## Running Locally

To install VScouter, follow these steps:

1. Clone the repository: `git clone https://github.com/VihaanChhabria/VScouter.git`
2. Move into the website directory: `cd website`
3. Install needed dependencies: `npm install`
4. Run the website locally: `npm run dev`

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Support

If you want to use this or need support, email me at `chhabria.vihaan2@gmail.com`.
