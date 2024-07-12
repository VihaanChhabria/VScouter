package main

import (
	"fmt"
	"io"
	"os"
	"time"

	"tinygo.org/x/bluetooth"
)

// Access to devices' Bluetooth
var adapter = bluetooth.DefaultAdapter

// Variables to hold scouting and match status and data
var scoutingStatus uint8 = 0
var fullData string = ""
var singleData []string

var matchesStatus uint8 = 0
var matchesStatusCount int = 0

func main() {
	// Prompt user to download new match schedule
	getMatches := ""
	fmt.Println("Do you want to download a new match schedule? (y/n)")
	fmt.Scan(&getMatches)

	if getMatches == "y" {
		DownloadMatches()
	}

	// Open and read match schedule data from file
	openedMatchesFile, _ := os.Open("matches.json")
	matchesData, _ := io.ReadAll(openedMatchesFile) // Made out of bytes as when sending data over Bluetooth, bytes are required
	fmt.Println(string(matchesData))

	// Split match data into chunks of 400 bytes as 412 bytes is the limit for sending data over bluetooth
	cutMatchesNum := (len(matchesData) / 400) + 1 // How many blocks of data there should be
	var cutMatches [][]byte // All of the blocks of data in a list
	for i := 0; i < cutMatchesNum; i++ {
		if i == (cutMatchesNum - 1) { // If last element
			cutMatches = append(cutMatches, matchesData[(i*400):]) // Appends the rest of the data without leaving data out or adding wrong data
			fmt.Println(string(matchesData[(i * 400):]))
			fmt.Println("last")
		} else { // Any other element
			cutMatches = append(cutMatches, matchesData[(i*400):((i+1)*400)]) // Appends 400 bytes to the list
			fmt.Println(string(matchesData[(i * 400):((i + 1) * 400)]))
			fmt.Println(i)
		}
	}

	fmt.Println("starting")
	must("enable BLE stack", adapter.Enable())

	// Starts displaying the network to other devices
	adv := adapter.DefaultAdvertisement()
	must("config adv", adv.Configure(bluetooth.AdvertisementOptions{
		LocalName:    "FRC 7414 Scouting Server",
		ServiceUUIDs: []bluetooth.UUID{bluetooth.ServiceUUIDHeartRate},
	}))
	must("start adv", adv.Start())

	// Define Bluetooth characteristics
	var scoutingStatusCharacteristic bluetooth.Characteristic // Used for alerting connected devices to send scouting data
	var scoutingDataCharacteristic bluetooth.Characteristic // Where the devices send the scouting data

    var matchesStatusCharacteristics bluetooth.Characteristic // Used as a back and forth channel to send confirm sending of the match data
	var matchesDataCharacteristics bluetooth.Characteristic // Where the server puts the match data blocks

	// Add service with characteristics to the adapter
	must("add service", adapter.AddService(&bluetooth.Service{
		UUID: bluetooth.ServiceUUIDHeartRate,
		Characteristics: []bluetooth.CharacteristicConfig{
			{
				Handle: &scoutingStatusCharacteristic,
				UUID:   bluetooth.CharacteristicUUIDHeartRateMeasurement,
				Value:  []byte{scoutingStatus},
				Flags:  bluetooth.CharacteristicReadPermission,
			},
			{
				Handle: &scoutingDataCharacteristic,
				UUID:   bluetooth.CharacteristicUUIDHeartRateControlPoint,
				Flags:  bluetooth.CharacteristicWritePermission,
				WriteEvent: func(client bluetooth.Connection, offset int, value []byte) { // Called when scouting data is sent to the characteristic
					if len(value) > 0 {
						recievedData := string(value)
						fmt.Println("Received data: ", recievedData+"\n\n\n")
						singleData = append(singleData, recievedData)
					}
				},
			},
			{
				Handle: &matchesDataCharacteristics,
				UUID:   bluetooth.CharacteristicUUIDRestingHeartRate,
				Value:  cutMatches[0],
				Flags:  bluetooth.CharacteristicReadPermission,
			},
			{
				Handle: &matchesStatusCharacteristics,
				UUID:   bluetooth.CharacteristicUUIDMaximumRecommendedHeartRate,
				Value:  []byte{matchesStatus},
				Flags:  bluetooth.CharacteristicWritePermission | bluetooth.CharacteristicReadPermission,
				WriteEvent: func(client bluetooth.Connection, offset int, value []byte) { // Called when scouting data is sent to the characteristic
					if len(value) > 0 {
						recievedData := string(value)
						fmt.Println("Received matchesStatus value: ", recievedData)
						if recievedData == "1" { // Sent by the scouting app to ask for more/rest of the data
							if len(cutMatches) > (matchesStatusCount) { // If all matches have not been sent
								matchesDataCharacteristics.Write(cutMatches[matchesStatusCount]) // Writing next block of data
								fmt.Println(string(cutMatches[matchesStatusCount]))
								matchesStatusCharacteristics.Write([]byte{uint8(0)}) // Telling devices that the server is done sending a block of data
								fmt.Println("Wrote match data chunk and updated status to 0")
								matchesStatusCount += 1
							} else { // If all matches have sent
								matchesStatusCharacteristics.Write([]byte{uint8(2)}) // Telling devices that all data is done sending
								fmt.Println("All matches sent, updated status to 2")
								matchesStatusCount = 0
							}
						}
					}
				},
			},
		},
	}))

	fmt.Println("looping")
	retrieveData := "n"
	for {
		// Prompt user to retrieve data
		fmt.Println("retrieve data? (y/n)")
		fmt.Scan(&retrieveData)

		if retrieveData == "y" {
			for appNum := 1; appNum <= 1; appNum++ { // Looping through devices connected
// TODO: find a way to get amount of devices connected to Bluetooth
				fullData = "["
				scoutingStatusCharacteristic.Write([]byte{uint8(appNum)}) // Alerting devices to send data

				time.Sleep(15 * time.Second) // Waiting for the device to send scouting data
				scoutingStatusCharacteristic.Write([]byte{uint8(0)}) // Tells devices to stop sending data

				// Remove duplicate data entries
				singleData = removeDuplicateStr(singleData)

				// Concatenate data
				for _, item := range singleData {
					fullData = fullData + item
				}

				// Clear the single data slice
				singleData = []string{}
				fmt.Println("\n\n\n\n\n\n\nFull Data:\n" + fullData)
				fullData = fullData + "]"

				// Write data to a JSON file
				jsonFile, _ := os.Create("output/" + time.Now().String() + ".json")
				jsonFile.WriteString(fullData)
				jsonFile.Close()

				// Reset fullData for the next iteration
				fullData = ""
			}
		}
		retrieveData = "n"
	}
}

// Helper function to panic on errors
func must(action string, err error) {
	if err != nil {
		panic("failed to " + action + ": " + err.Error())
	}
}

// Function to remove duplicate strings from a slice
func removeDuplicateStr(strSlice []string) []string {
	var nonRepeat []string

	for _, item := range strSlice {
		if !contains(nonRepeat, item) {
			nonRepeat = append(nonRepeat, item)
		}
	}

	return nonRepeat
}

// Helper function to check if a slice contains a string
func contains(slice []string, str string) bool {
	for _, v := range slice {
		if v == str {
			return true
		}
	}
	return false
}