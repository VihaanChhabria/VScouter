import csv

INPUT_CSV_DIR = "parsing/2024 Scouting #4_Matches.csv"
OUTPUT_CSV_DIR = "parsing/scoutingData.csv"

# output:input
INPUT_CONVERSION = {
    "matchNumber" : "Match Number", 
    "teamNumber" : "Match Team Number", 
    "initials" : "Initials", 
    "autoSpeakerMade" : "Auto Shots Made Speaker", 
    "autoSpeakerMissed" : 0, 
    "autoAmpMade" : "Auto Shots Made Amp", 
    "autoAmpMissed" : 0, 
    "teleopAmpMade" : "Teleop Shots Made Amp", 
    "teleopAmpMissed" : 0, 
    "teleopSpeakerMade" : "Teleop Shots Made Speaker", 
    "teleopSpeakerMissed" : 0, 
    "notesFed" : "Lobbing", 
    'trapMade' : "Shots Made Trap", 
    "trapMissed" : 0, 
    "climbed" : "Climbed", 
    "buddyClimb" : "Buddy Climb", 
    "brokeDown" : "Broke Down", 
    "comments" : "Comments"
}

inputCSV = csv.reader(open(INPUT_CSV_DIR, 'r'))

inputCSV.close()