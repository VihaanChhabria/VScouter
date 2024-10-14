import json
import csv
import requests

BASE_URL = "https://www.thebluealliance.com/api/v3"

def downloadMatches(event_key, api_key):
    matches = getEventMatches(event_key, api_key)

    matches_rearranged = []

    for match_num, match in enumerate(matches):
        red_teams, blue_teams = getMatchTeams(match)
        matches_rearranged.append({"matchNum": match_num, "redAlliance": red_teams, "blueAlliance": blue_teams})

    with open("../data/EventMatches.json", "w") as file:
        json.dump({"matches": matches_rearranged}, file)
        
    with open("../data/EventMatches.csv", "w", newline='') as file:
        writer = csv.writer(file)
        writer.writerow(["matchNumber", "alliance", "teamNumber"])
        for match_num, match in enumerate(matches_rearranged):
            redAlliance = match["redAlliance"]
            blueAlliance = match["blueAlliance"]
            writer.writerow([match_num, "red", redAlliance[0]])
            writer.writerow([match_num, "red", redAlliance[1]])
            writer.writerow([match_num, "red", redAlliance[2]])
            writer.writerow([match_num, "blue", blueAlliance[0]])
            writer.writerow([match_num, "blue", blueAlliance[1]])
            writer.writerow([match_num, "blue", blueAlliance[2]])

def getEventMatches(event_key, api_key):
    url = f"{BASE_URL}/event/{event_key}/matches/simple"
    body = fetchTBA(url, api_key)
    
    matches = json.loads(body)
    
    return matches

def fetchTBA(url, api_key):
    headers = {
        "X-TBA-Auth-Key": api_key,
        "Content-Type": "application/json"
    }
    response = requests.get(url, headers=headers)
    
    return response.text

def getMatchTeams(match):    
    alliances = match["alliances"]
    
    red_alliance = alliances["red"]
    red_teams = red_alliance["team_keys"]
    
    blue_alliance = alliances["blue"]
    blue_teams = blue_alliance["team_keys"]

    return red_teams, blue_teams

if __name__ == "__main__":
    downloadMatches(input("Enter event key (ex: 2024mrcmp): "), input("Enter TBA API key: "))