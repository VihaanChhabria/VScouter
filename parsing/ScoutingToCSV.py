// Converts scouting data into a CSV file

import os
import csv
import json

DATA_DIR = "server/output"
CSV_FILE = "parsing/data/scoutingData.csv"

// The names of the columns
BASE_NAMES = ["matchNumber", "teamNumber", 'initials', 
              "autoAmpMadeLab", "autoAmpMissedLab", "autoSpeakerMadeLab", 
              "autoSpeakerMissedLab", "teleopAmpMadeLab", "teleopAmpMissedLab", 
              "teleopSpeakerMadeLab", "teleopSpeakerMissedLab", 'trapMadeLab', 
              "trapMissedLab", "climbed", "buddyClimb", 
              "brokeDown", 'comments']

fullCSV = []
fullCSV.append(BASE_NAMES)
for jsonFile in os.listdir(DATA_DIR): // Cycle through all of the different scouting JSON files
    jsonFile = json.load(fp=open(f"{DATA_DIR}/{jsonFile}"))
    for jsonFileMatch in jsonFile: // Looping through the matches in each file
        matchData = []
        for BASE_NAME in BASE_NAMES:
            matchData.append(jsonFileMatch[BASE_NAME])
        fullCSV.append(matchData)

with open(CSV_FILE, 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerows(fullCSV) // Converting array into CSV