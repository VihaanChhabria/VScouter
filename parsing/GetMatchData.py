import json
import csv
import requests

BASE_URL = "https://www.thebluealliance.com/api/v3"

def downloadMatches(event_key, api_key):
    """
    Downloads matches for the given event key and TBA API key, and saves to a json and csv file.

    :param event_key: The event key to download matches for
    :param api_key: The TBA API key to use
    :return: None
    """
    # Get the matches from TBA
    allMatches = getEventMatches(event_key, api_key)

    # Rearrange the matches to be in a more useful format
    qualMatches = []
    
    # Keep track of the match number we are currently on and the index into the list of matches
    counter = 1
    matchCounter = 0

    # Iterate through the list of matches
    while True:
        # Iterate through the list of matches until we find the next one that matches the current match number
        while matchCounter < len(allMatches):
            match = allMatches[matchCounter]
            if event_key+"_qm"+str(counter) == match["key"]:
                # If we found it, add it to the list of qualifying matches and
                # remove it from the list of all matches
                qualMatches.append(match)
                allMatches.pop(matchCounter)
                # Move on to the next match number and reset the index
                counter = counter + 1
                matchCounter = 0
                break
            # If not, move on to the next match
            matchCounter += 1
        # If we've reached the end of the list of matches, break out of the loop
        if matchCounter != 0:
            break
            

    matchesRearranged = []
    
    # Iterate through the list of qualifying matches
    for match in qualMatches:
        # Get the red and blue teams for the current match
        red_teams, blue_teams = getMatchTeams(match)

        # Add the match to the list of rearranged matches with the match number and the red and blue alliances
        matchesRearranged.append({
            "matchNum": match["key"].replace(event_key+"_qm", ""),
            "redAlliance": red_teams,
            "blueAlliance": blue_teams
        })

    # Save the rearranged matches to a json file
    with open("../data/EventMatches.json", "w") as file:
        json.dump({"matches": matchesRearranged}, file)
        
    # Save the rearranged matches to a csv file
    with open("../data/EventMatches.csv", "w", newline='') as file:
        writer = csv.writer(file)
        
        # Write the header row
        writer.writerow(["matchNumber", "alliance", "teamNumber"])
        
        # Iterate through the list of rearranged matches
        for match_num, match in enumerate(matchesRearranged):
            # Get the red and blue alliances for the current match
            redAlliance = match["redAlliance"]
            blueAlliance = match["blueAlliance"]
            
            # Write each team in the red alliance
            writer.writerow([match_num, "red", redAlliance[0]])
            writer.writerow([match_num, "red", redAlliance[1]])
            writer.writerow([match_num, "red", redAlliance[2]])
            
            # Write each team in the blue alliance
            writer.writerow([match_num, "blue", blueAlliance[0]])
            writer.writerow([match_num, "blue", blueAlliance[1]])
            writer.writerow([match_num, "blue", blueAlliance[2]])

def getEventMatches(event_key, api_key):
    """
    Fetches and converts the matches for the given event key using the given TBA API key.
    
    :param event_key: The event key to download matches for
    :param api_key: The TBA API key to use
    :return: The matches for the given event
    """
    # Construct the URL to query the TBA API
    url = f"{BASE_URL}/event/{event_key}/matches/simple"
    
    # Fetch the matches from the TBA API
    body = fetchTBA(url, api_key)
    
    # Parse the matches from the JSON response
    matches = json.loads(body)
    
    with open("../data/test.json", "w") as file:
        file.write(body)
    
    return matches

def fetchTBA(url: str, api_key: str) -> str:
    """
    Fetches a response from the TBA API using the given URL and API key.

    :param url: The URL to query the TBA API
    :param api_key: The TBA API key to use
    :return: The response from the TBA API
    """
    # Set the headers for the request
    headers = {
        "X-TBA-Auth-Key": api_key,
        "Content-Type": "application/json"
    }
    
    # Make the request to the TBA API
    response = requests.get(url, headers=headers)
    
    # Return the response from the TBA API
    return response.text

def getMatchTeams(match):
    """
    Extracts the teams from the given match.
    
    :param match: The match to extract the teams from
    :return: The teams in the red and blue alliances
    """
    alliances = match["alliances"]
    
    # Extract the red alliance
    red_alliance = alliances["red"]
    # Extract the teams from the red alliance
    red_teams = red_alliance["team_keys"]
    
    # Extract the blue alliance
    blue_alliance = alliances["blue"]
    # Extract the teams from the blue alliance
    blue_teams = blue_alliance["team_keys"]

    return red_teams, blue_teams

if __name__ == "__main__":
    downloadMatches(input("Enter event key (ex: 2024mrcmp): "), input("Enter TBA API key: "))