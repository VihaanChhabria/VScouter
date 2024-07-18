package main

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
)

const eventKey string = "2024mrcmp"
const baseURL string = "https://www.thebluealliance.com/api/v3"

type MatchDetails struct {
	MatchNum     int      `json:"matchNum"`
	RedAlliance  []string `json:"redAlliance"`
	BlueAlliance []string `json:"blueAlliance"`
}

type Matches struct {
	Matches []MatchDetails `json:"matches"`
}

func DownloadMatches() {

	APIKeyFile, _ := os.Open("/home/vihaan/keys/TBAKey.txt")
	APIKeyByte, _ := io.ReadAll(APIKeyFile)
	APIKeyByte = APIKeyByte[0:(len(APIKeyByte) - 1)]
	APIKey := string(APIKeyByte)

	matches, _ := getEventMatches(eventKey, APIKey)

	var matchesRearranged []MatchDetails
	for matchNum, match := range matches {
		redTeams, blueTeams := getMatchTeams(match)
		matchesRearranged = append(matchesRearranged, MatchDetails{MatchNum: matchNum, RedAlliance: redTeams, BlueAlliance: blueTeams})
	}

	jsonFile, _ := json.Marshal(Matches{Matches: matchesRearranged})

	file, err := os.Create("matches.json")
	if err != nil {
		fmt.Println("Error creating file:", err)
		return
	}
	defer file.Close()

	_, err = file.Write(jsonFile)
	if err != nil {
		fmt.Println("Error writing to file:", err)
		return
	}
}

func getEventMatches(eventKey string, APIKey string) ([]map[string]interface{}, error) {
	url := fmt.Sprintf("%s/event/%s/matches/simple", baseURL, eventKey)
	body, err := fetchAPI(url, APIKey)
	if err != nil {
		return nil, err
	}

	var matches []map[string]interface{}
	if err := json.Unmarshal(body, &matches); err != nil {
		return nil, fmt.Errorf("error unmarshalling matches: %v", err)
	}

	return matches, nil
}

func fetchAPI(url string, APIKey string) ([]byte, error) {
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, fmt.Errorf("error creating request: %v", err)
	}

	req.Header.Set("X-TBA-Auth-Key", APIKey)
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("error making request: %v", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("API error: %s", resp.Status)
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("error reading response body: %v", err)
	}

	return body, nil
}

func getMatchTeams(match map[string]interface{}) ([]string, []string) {
	var redTeams, blueTeams []string

	if alliances, ok := match["alliances"].(map[string]interface{}); ok {
		if redAlliance, ok := alliances["red"].(map[string]interface{}); ok {
			if teams, ok := redAlliance["team_keys"].([]interface{}); ok {
				for _, team := range teams {
					redTeams = append(redTeams, team.(string))
				}
			}
		}

		if blueAlliance, ok := alliances["blue"].(map[string]interface{}); ok {
			if teams, ok := blueAlliance["team_keys"].([]interface{}); ok {
				for _, team := range teams {
					blueTeams = append(blueTeams, team.(string))
				}
			}
		}
	}

	return redTeams, blueTeams
}
