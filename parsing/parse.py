import os
import csv
import json

OUTPUT_DIR = os.getcwd().replace("parsing", "output")
CSV_FILE = "data.csv"

BASE_NAMES = ["matchNumber", "teamNumber", 'initials', 
              "autoAmpMadeLab", "autoAmpMissedLab", "autoSpeakerMadeLab", 
              "autoSpeakerMissedLab", "teleopAmpMadeLab", "teleopAmpMissedLab", 
              "teleopSpeakerMadeLab", "teleopSpeakerMissedLab", 'trapMadeLab', 
              "trapMissedLab", "climbed", "buddyClimb", 
              "brokeDown", 'comments']

fullCSV = []
for jsonFile in os.listdir(OUTPUT_DIR):
    jsonFile = json.load(fp=open(f"{OUTPUT_DIR}/{jsonFile}"))
    for jsonFileMatch in jsonFile:    
        for BASE_NAME in BASE_NAMES:
            fullCSV.append(jsonFileMatch[BASE_NAME])


with open(CSV_FILE, 'w', newline='') as csvfile:
    writer = csv.writer(csvfile)
    
    writer.writerow(BASE_NAMES)
    
    for row in fullCSV:
        writer.writerow(str(row))