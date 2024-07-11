import os
import csv
import json

DATA_DIR = "server/output"
CSV_FILE = "parsing/data/scoutingData.csv"

BASE_NAMES = ["matchNumber", "teamNumber", 'initials', 
              "autoAmpMadeLab", "autoAmpMissedLab", "autoSpeakerMadeLab", 
              "autoSpeakerMissedLab", "teleopAmpMadeLab", "teleopAmpMissedLab", 
              "teleopSpeakerMadeLab", "teleopSpeakerMissedLab", 'trapMadeLab', 
              "trapMissedLab", "climbed", "buddyClimb", 
              "brokeDown", 'comments']

fullCSV = []
fullCSV.append(BASE_NAMES)
for jsonFile in os.listdir(DATA_DIR):
    jsonFile = json.load(fp=open(f"{DATA_DIR}/{jsonFile}"))
    for jsonFileMatch in jsonFile:
        matchData = []
        for BASE_NAME in BASE_NAMES:
            matchData.append(jsonFileMatch[BASE_NAME])
        fullCSV.append(matchData)

with open(CSV_FILE, 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerows(fullCSV)