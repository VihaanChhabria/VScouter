# VScouter: FRC Scouting App

## Introduction

VScouter is a versatile scouting application designed for FRC (FIRST Robotics Competition) teams. It simplifies the data collection process for scouting teams during competitions, providing a robust and efficient platform to gather, analyze, and store performance metrics of competing robots.

## Features

- Data collection though a [website](https://vscouter.netlify.app/)
- Website can be ran offline in environments with no internet
- Auto completion for teams to scout on scouting website
- Visual and intuitive buttons and pictures to help scout real-time
- USB flash drive data collection process

## Prerequisites

- [Python 3](https://www.python.org/downloads/)

## Installation

To install VScouter, follow these steps:

1. Clone the repository: `git clone https://github.com/VihaanChhabria/VScouter.git`

## Usage

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

1. To analyze the CSV data you downloaded at [Parsing Data](#parsing-data) you must download the [Power BI file in this repository](/analysis/VScouterAnalysis.pbix). Once downloaded, put the `pbix` file into a folder with nothing in it.
2. Next put you CSV file into the same folder as the `pbix` file. Rename it to `VScouterFullData.csv`
3. Open the `pbix` file with Power BI. To use this new data click `Transform Data` and then `dataFolderPath`. On this page change the directory to where the `pbix` file and CSV file are located (ex. `C:\Users\username\Documents\Analysis`). **There should not be a `\` at the end.**
3. Click `Close & Apply`.
![PowerBIFolderSelection](/readmeimages/PowerBIFolderSelection.gif)

#### Pages of Analysis
- **Picklist:** On this page you can order the teams that you have scouted based on how many notes they have scored in the speaker and amp as well as how many notes they have fed. To sort click below the headers on the arrows that pop up.
![PowerBIPicklist](/readmeimages/PowerBIPicklist.png)

- **Team Overview:** On this page you can look at the data collected for a specific team. This includes a table with the data as well as a graph showing their points scored over time. To change which team you are looking at, click on the `Filters` button. Then expand the `Select Team` dropdown. You are able to then select the team you want to view off of this drop down.
![PowerBITeamOverview](/readmeimages/PowerBITeamOverview.png)

- **Match Overview:** On this you can see the data collected for a specific match. There is a table for  each alliance showing the data of each team such as speaker notes, amp notes, fed notes, and trap notes. Additionally, there is a table showing if they had climbed or parked on the stage. To change which match you are looking at, click on the `Filters` button. Then expand the `Match Number` dropdown. You are able to then select the match you want to view off of this drop down.
![PowerBIMatchOverview](/readmeimages/PowerBIMatchOverview.png)

- **Auto Notes Overview:** On this page you can see how frequent a team picks or attempts to pick a note during the autonomous period. They are expressed by pie charts next to each of the notes on the field that can have the percentages representing the vales `Failed Pick/Shot`, `Picked and Shot`, and `Not Picked`. To change which team you are looking at, click on the `Filters` button. Then expand the `Select Team` dropdown. You are able to then select the team you want to view off of this drop down.
![PowerBIAutoNotesOverview](/readmeimages/PowerBIAutoNotesOverview.png)

- **Scouter Match Numbers:** On this page you can see how many matches a scouter has scouted. This is shown by a graph of each scouter initial and how many matches they have scouted.
![PowerBIScouterMatchNumbers](/readmeimages/PowerBIScouterMatchNumbers.png)

### Using The Website

1. Visit [https://vscouter.netlify.app/](https://vscouter.netlify.app/)
2. **Main Page:** When the scouter loads into the app there are 4 main buttons. The `Full Screen` button makes the website go into full screen mode. The `Dump Data` button will download a JSON file of the scouting data. See [Collecting Data](#collecting-data) for more info. The `Game Start` button continues to the game start scouting page.
   ![HomeScreen](/readmeimages/HomeScreen.png)
3. **Settings Page:** Has various buttons for debugging and for loading auto match suggestions. `Get Match Data` redirects to the page for getting the auto match suggestions. `Clear Match Data` clears the auto match suggestions. `Clear Scouting Data` clears the scouting data that is saved on the device. `View Scouting Data` opens a page where the scouter is able to see the JSON version of the scouting data.
   ![SettingsPage](readmeimages/SettingsPage.png)
4. **Match Data:** Here the scouter can scan a QR code leading to the generated match data for the auto competition. See more at [Using](#using) of [Auto Completion Match Data](#auto-completion-match-data).
   ![MatchData](readmeimages/MatchData.png)
5. **Game Start:** The `Select Alliance` component allows the scouter to select the alliance they are scouting. The `Match Number` component allows the scouter to enter the match they are scouting. The `Scouting Initials` component allows the scouter to enter their initials. The `Select Team` component shows auto completion buttons that are based on the alliance and match that the scouter inputted previously. Additionally, the scouter may choose to select a different team than auto suggested. The button/input that is darker than the other is what is selected. The scouter may choose to click the `Back` Button to return to the past page. To advance to the next page, the scouter can click the `Proceed` button.
   ![GameStart](readmeimages/GameStart.png)
6. **Auto Start:** The scouter can enter where the robot generally starts. They may do this by changing the counter's value based on the map. If the robot does not show to the match, the scouter may click the `No Show` button. If the `No Show` button is clicked, the form skips other data collection questions. The scouter may choose to click the `Back` Button to return to the past page. To advance to the next page, the scouter can click the `Proceed` button.
   ![AutoStart](readmeimages/AutoStart.png)
7. **Auto Scoring:** The buttons on the screen have the default value `Not Picked`. These can be cycled between `Not Picked`, `Failed Shot`, and `Picked and Shot` by clicking on them. The buttons represent the status for all of the rings in auto. The scouter may choose to click the `Back` Button to return to the past page. To advance to the next page, the scouter can click the `Proceed` button.
   ![AutoScoring](readmeimages/AutoScoring.png)
8. **Teleop Scoring:** The green buttons represent the ways you can score/do something in teleop. This ranges from from the amp, the speaker, and feeding. The red buttons represent the a mistake in when they tried to score. The `Remove Count` button removes a point from one of the inputs. This is done by the scouter clicking `Remove Count` and then clicking the input that they wanted to decrease. The scouter may choose to click the `Back` Button to return to the past page. To advance to the next page, the scouter can click the `Proceed` button.
   ![TeleopScoring](readmeimages/TeleopScoring.png)
9. **Endgame Scoring:** The `Parked`, `Park Failed`, `Climbed`, and `Climb Failed` buttons represent what the robot can do on the stage. The trap made and missed counter represents what the robot can score on the trap. The `Comments` textbox allows for the scouter to write any additional information such as if they broke down or got penalties.
   ![EndgameScoring](readmeimages/EndgameScoring.png)

### Auto Completion Match Data

#### **Generating**

1. `cd parsing`
2. `python3 GetMatchData.py`
3. Enter your event key (like 2024njdd)
4. Enter your [TBA API](https://www.thebluealliance.com/apidocs) key

This code is used to generate the auto completion data for the scouting app. Once this data is generated it is downloaded into the [data folder](/data/EventMatches.json). To use this on the scouting apps, you must host this online on a GitHub repository. Now that it is hosted online, to make the QR code you can visit a [common QR code generator](https://getsiimple.com/tools/qr-code-generator/). **You need to make the QR code based on the raw data (shown below).**
![RawGitHubData](readmeimages/RawGitHubData.png)

#### **Using**

To use generated match suggestions:

1. Click the `Settings` button on the home screen.
2. Click `Get Match Data`.
3. Allow use of device camera.
4. Show and scan the generated QR code.
5. Click `Done`.

![ScanMatchData](/readmeimages/ScanMatchData.gif)

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Support

If you want to use this or need support, email me at `chhabria.vihaan@gmail.com`.
