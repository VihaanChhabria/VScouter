# Converts scouting data into a CSV file

import os
import csv
import json

DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.realpath(__file__))), "data", "ServerOutputs")
CSV_FILE = os.path.join(os.path.dirname(os.path.dirname(os.path.realpath(__file__))), "data") + "/ScoutingData.csv"

# The names of the columns
BASE_NAMES = [
    "alliance",
    "matchNumber",
    "scouterInitials",
    "selectTeam",
    "noShow",
    [
        "autoRingStatuses",
        "closeRing1",
        "closeRing2",
        "closeRing3",
        "farRing1",
        "farRing2",
        "farRing3",
        "farRing4",
        "farRing5",
    ],
    [
        "teleopRingCounts",
        "ampMadeCount",
        "ampMissedCount",
        "speakerMadeCount",
        "speakerMissedCount",
        "fedMadeCount",
        "fedMissedCount",
    ],
    "parked",
    "parkFailed",
    "climbed",
    "climbFailed",
    "trapMadeCount",
    "trapMissedCount",
    "comment",
]

fullCSV = []

headers = []
for baseNameIndex, baseName in enumerate(BASE_NAMES):
    if type(baseName) == str:
        headers.append(baseName)
    else:
        for subNameIndex, subName in enumerate(baseName):
            if subNameIndex != 0:
                headers.append(subName)
fullCSV.append(headers)
for jsonFile in os.listdir(DATA_DIR):  # Cycle through all of the different scouting JSON files
    jsonFile = json.load(fp=open(f"{DATA_DIR}/{jsonFile}"))
    for jsonFileMatch in jsonFile:  # Looping through the matches in each file
        matchData = []
        for baseName in BASE_NAMES:
            if type(baseName) == str:
                matchData.append(jsonFileMatch[baseName])
            else:
                for subNameIndex, subName in enumerate(baseName):
                    if subNameIndex != 0:
                        matchData.append(jsonFileMatch[baseName[0]][subName])
        fullCSV.append(matchData)

with open(CSV_FILE, "w", newline="") as file:
    writer = csv.writer(file)
    writer.writerows(fullCSV)  # Converting array into CSV
