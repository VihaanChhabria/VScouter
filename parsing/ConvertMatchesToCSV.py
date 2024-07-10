import json
import csv

MATCHES_JSON_DIR = "server/matches.json"
OUTPUT_DIR = "parsing/matchesData.csv"

ALLIANCES = ["redAlliance", "blueAlliance"]

BASE_NAMES = ["matchNumber", "alliance", "teamNumber"]

matchesJSON = json.load(open(MATCHES_JSON_DIR, 'r'))["matches"]

fullCSV = []
fullCSV.append(BASE_NAMES)
for matchNum, match in enumerate(matchesJSON):
    for alliance in ALLIANCES:
        for team in match[alliance]:
            team = team.replace("frc", "")
            fullCSV.append([matchNum, alliance, team])

with open(OUTPUT_DIR, 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerows(fullCSV)