import requests
import json

TBA_AUTH_KEY = "zrIZUPFafyou5btf6uG8SqCAbE9gcOwNIed1qsPagIXKITVLD74VphJ8uGdu9Eqd"
EVENT_KEY = "2024casj"  # Replace with your event key

url = f"https://www.thebluealliance.com/api/v3/event/{EVENT_KEY}/matches"
headers = {"X-TBA-Auth-Key": TBA_AUTH_KEY}

response = requests.get(url, headers=headers)

if response.status_code == 200:
    matches = response.json()
    qual_match_numbers = [
        {
            "matchNum": match["match_number"],
            "redAlliance" : [match[]]
        }
        for match in matches
        if match["comp_level"] == "qm"
    ]
    with open("test.json", "w") as file:
        json.dump({"matches": qual_match_numbers}, file)
    print(qual_match_numbers)  # List of Qualification Match Numbers
else:
    print("Error:", response.status_code, response.text)
