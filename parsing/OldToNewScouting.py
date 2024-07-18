import csv

INPUT_CSV_DIR = "parsing/data/2024 Scouting #4_Matches.csv"
OUTPUT_CSV_DIR = "parsing/data/scoutingData.csv"

# output:input
INPUT_CONVERSION = {
    "matchNumber" : "Match Number", 
    "teamNumber" : "Match Team Number", 
    "initials" : "Initials", 
    "autoSpeakerMade" : "Auto Shots Made Speaker", 
    "autoSpeakerMissed" : -1, 
    "autoAmpMade" : "Auto Shots Made Amp", 
    "autoAmpMissed" : -1, 
    "teleopAmpMade" : "Teleop Shots Made Amp", 
    "teleopAmpMissed" : -1, 
    "teleopSpeakerMade" : "Teleop Shots Made Speaker", 
    "teleopSpeakerMissed" : -1, 
    "notesFed" : "Lobbing", 
    'trapMade' : "Shots Made Trap", 
    "trapMissed" : -1, 
    "climbed" : "Climbed", 
    "buddyClimb" : "Buddy Climb", 
    "brokeDown" : "Broke Down", 
    "comments" : "Comments"
}

inputCSV = list(csv.reader(open(INPUT_CSV_DIR, encoding='utf-8-sig')))

fullCSV = [[]]
inputToOutputIndexes = []
for inputColumn in INPUT_CONVERSION:
    fullCSV[0].append(inputColumn)
    outputColumn = INPUT_CONVERSION.get(inputColumn)
    if (outputColumn != -1):
        outputColumnIndex = inputCSV[0].index(outputColumn)
        inputToOutputIndexes.append(outputColumnIndex)
    else:
        inputToOutputIndexes.append(-1)
        
for inputCSVRowIndex, inputCSVRow in enumerate(inputCSV):
    fullCSV.append([])
    if (inputCSVRowIndex != 0):
        for inputToOutputIndex in inputToOutputIndexes:
            if (inputToOutputIndex != -1):
                fullCSV[inputCSVRowIndex].append(inputCSVRow[inputToOutputIndex])
            else:
                fullCSV[inputCSVRowIndex].append(0)
            
with open(OUTPUT_CSV_DIR, 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerows(fullCSV)