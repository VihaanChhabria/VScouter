package main

import (
	"encoding/json"
	"fmt"
	"os"
	"sort"
	"time"

	"tinygo.org/x/bluetooth"
)

// Access to devices' Bluetooth
var adapter = bluetooth.DefaultAdapter

// Variables to hold scouting and match status and data
var status uint8

type DataPart struct {
	PartNumber int
	Data       string
}
type Data struct {
	ID   string
	Data []DataPart
}

var fullData []Data

type NewData struct {
	ScouterNumber string `json:"scouterNumber"`
	DataPart      int    `json:"dataPart"`
	Data          string `json:"data"`
}

var bluetoothService bluetooth.UUID = bluetooth.ServiceUUIDHeartRate
var bluetoothCharacteristicStatus bluetooth.UUID = bluetooth.CharacteristicUUIDHeartRateMeasurement
var bluetoothCharacteristicData bluetooth.UUID = bluetooth.CharacteristicUUIDHeartRateControlPoint

// main starts the Bluetooth server and then enters an infinite loop,
// prompting the user to choose between retrieving data from the scouting
// server and downloading the data to a file.
func main() {

	status = 0

	// Set up the Bluetooth server
	characteristics := initBluetoothSever()

	statusCharacteristic := characteristics[0]

	fmt.Println("looping")
	var retrieveData string
	for {
		// Prompt user to retrieve data or download data
		fmt.Println("retrieve or download data? (r/d)")
		fmt.Scan(&retrieveData)

		switch retrieveData {
			case "r":
				// Send a signal to the scouting app to start sending data
				statusCharacteristic.Write([]byte{1})

				// wait 15 seconds for the scouting app to send all of the data
				timer(15, "Status Turning Off In:")

				// Send a signal to the scouting app to stop sending data
				statusCharacteristic.Write([]byte{0})

				// wait 3 seconds to allow the scouting app to finish sending data
				timer(3, "Post Waiting Ending In:")

				// Clear the terminal
				for i := 0; i < 100; i++ {
					fmt.Println("")
				}

				// If there is data, print it
				if len(fullData) != 0 {
					organizeData()

					fmt.Println("Received Data: ", fullData)

				} else {
					fmt.Println("No Data Received")
				}
			case "d":
				downloadData(combineData())
				fmt.Println("Downloaded Data to output.json")
			default:
				fmt.Println("Invalid Input")
		}
		retrieveData = ""
	}
}

// initBluetoothSever sets up the Bluetooth server, enabling the Bluetooth stack,
// setting up a GATT service with two characteristics, and starting an advertisement.
// The characteristics are used to send scouting data from the phone to the server
// and to alert connected devices to send scouting data.
func initBluetoothSever() []bluetooth.Characteristic {

	fmt.Println("Starting...")
	must("enable BLE stack", adapter.Enable())

	// Starts displaying the network to other devices
	adv := adapter.DefaultAdvertisement()
	must("config adv", adv.Configure(bluetooth.AdvertisementOptions{
		LocalName:    "FRC 7414 Scouting Server",
		ServiceUUIDs: []bluetooth.UUID{bluetoothService},
	}))
	must("start adv", adv.Start())

	// Define Bluetooth characteristics
	// statusCharacteristic is used for alerting connected devices to send scouting data
	var statusCharacteristic bluetooth.Characteristic

	// dataCharacteristic is where the devices send the scouting data
	var dataCharacteristic bluetooth.Characteristic

	// Configuration for statusCharacteristic
	statusCharacteristicConfig := bluetooth.CharacteristicConfig{
		Handle: &statusCharacteristic,
		UUID:   bluetoothCharacteristicStatus,
		Value:  []byte{status},
		Flags:  bluetooth.CharacteristicReadPermission,
	}

	// Configuration for dataCharacteristic
	dataCharacteristicConfig := bluetooth.CharacteristicConfig{
		Handle: &dataCharacteristic,
		UUID:   bluetoothCharacteristicData,
		Flags:  bluetooth.CharacteristicWritePermission,

		// Function that gets called when a device sends data to this characteristic
		WriteEvent: func(client bluetooth.Connection, offset int, incomingData []byte) {
			var newData NewData
			json.Unmarshal(incomingData, &newData) // Converting the string of the incoming data into an object

			idPos := idInList(newData.ScouterNumber, fullData)

			if idPos != -1 { // Check if the ID is already in the list

				// Add the part to the preexisting Data object
				fullData[idPos].Data = append(fullData[idPos].Data, DataPart{PartNumber: newData.DataPart, Data: newData.Data})
			} else {
				// Create a new Data object and add it to that new Data object
				fullData = append(fullData, Data{ID: newData.ScouterNumber, Data: []DataPart{{newData.DataPart, newData.Data}}})
			}
		},
	}

	// Add service with characteristics to the adapter
	must("add service", adapter.AddService(&bluetooth.Service{
		UUID:            bluetooth.ServiceUUIDHeartRate,
		Characteristics: []bluetooth.CharacteristicConfig{statusCharacteristicConfig, dataCharacteristicConfig},
	}))

	return []bluetooth.Characteristic{statusCharacteristic, dataCharacteristic}
}

// idInList checks if a given string ID is in the list of Data objects and returns the index of the Data object with the matching ID.
// If the ID is not found, it returns -1.
func idInList(id string, list []Data) int {
	for dataNum, data := range list {
		if data.ID == id {
			return dataNum
		}
	}
	return -1
}

// organizeData sorts the scouting data in each Data object by part number in ascending order.
func organizeData() {
	for i := range fullData {
		sort.Slice(fullData[i].Data, func(a, b int) bool {
			return fullData[i].Data[a].PartNumber < fullData[i].Data[b].PartNumber
		})
	}
}

// combineData takes the fullData list of Data objects and combines all the scouting data from each scouter into a single string.
// The string is a JSON array of strings, with each string being the combined scouting data from a single scouter.
// The function then returns the combined scouting data string.
func combineData() string {
	// Initialize the fully parsed data string
	fullyParsedData := "["
	// Loop through each scouter's data
	for scouterDataPartsNum := range fullData {
		// Initialize the combined scouter data string
		combinedScouterData := ""
		// Loop through each part of the scouter's data
		for partNum := range fullData[scouterDataPartsNum].Data {
			// Append the current part to the combined scouter data string
			combinedScouterData += fullData[scouterDataPartsNum].Data[partNum].Data
		}

		// Remove the first and last characters of the combined scouter data string
		combinedScouterData = combinedScouterData[1 : len(combinedScouterData)-1]

		// If this is not the first scouter, append a comma before appending the scouter's data
		if scouterDataPartsNum != 0 {
			fullyParsedData += ", " + combinedScouterData
		} else {
			fullyParsedData += combinedScouterData
		}
	}

	// Close the JSON array
	fullyParsedData += "]"

	return fullyParsedData
}


// downloadData takes a string of scouting data in JSON format and writes it to a file called "output.json" in the "data" directory.
func downloadData(jsonData string) {
    file, _ := os.Create("../data/ServerOutputs/ServerOutput_" + time.Now().Format("01-02-2006_15:04:05") + ".json")
    file.Write([]byte(jsonData))

    defer file.Close()
}
// timer prints a message with a countdown from the given duration and then sleeps for 1 second.
func timer(duration int, message string) {
	for i := 0; i < duration; i++ {
		fmt.Println(message, duration-i)
		time.Sleep(time.Second)
	}
}
// Helper function to panic on errors
func must(action string, err error) {
	if err != nil {
		panic("failed to " + action + ": " + err.Error())
	}
}
