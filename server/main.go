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

func main() {

	status = 0

	characteristics := initBluetoothSever()
	statusCharacteristic := characteristics[0]

	fmt.Println("looping")
	retrieveData := ""
	for {
		// Prompt user to retrieve data
		fmt.Println("retrieve or download data? (r/d)")
		fmt.Scan(&retrieveData)

		if retrieveData == "r" {
			statusCharacteristic.Write([]byte{1})

			timer(15, "Status Turning Off In:")
			statusCharacteristic.Write([]byte{0})
			timer(3, "Post Waiting Ending In:")

			for i := 0; i < 100; i++ {
				fmt.Println("")
			}

			if len(fullData) != 0 {
				organizeData()

				fmt.Println("Received Data: ", fullData)

			} else {
				fmt.Println("No Data Received")
			}
		} else if retrieveData == "d" {
			downloadData(combineData())
		}
		retrieveData = ""
	}
}

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
	var statusCharacteristic bluetooth.Characteristic // Used for alerting connected devices to send scouting data
	var dataCharacteristic bluetooth.Characteristic   // Where the devices send the scouting data

	statusCharacteristicConfig := bluetooth.CharacteristicConfig{
		Handle: &statusCharacteristic,
		UUID:   bluetoothCharacteristicStatus,
		Value:  []byte{status},
		Flags:  bluetooth.CharacteristicReadPermission,
	}
	dataCharacteristicConfig := bluetooth.CharacteristicConfig{
		Handle: &dataCharacteristic,
		UUID:   bluetoothCharacteristicData,
		Flags:  bluetooth.CharacteristicWritePermission,
		WriteEvent: func(client bluetooth.Connection, offset int, incomingData []byte) {
			var newData NewData
			fmt.Println(string(incomingData))
			json.Unmarshal(incomingData, &newData)

			idPos := idInList(newData.ScouterNumber, fullData)

			if idPos != -1 {
				fullData[idPos].Data = append(fullData[idPos].Data, DataPart{PartNumber: newData.DataPart, Data: newData.Data})
			} else {
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

func idInList(id string, list []Data) int {
	for dataNum, data := range list {
		if data.ID == id {
			fmt.Println(id)
			fmt.Println(data.ID)
			return dataNum
		}
	}
	return -1
}

func organizeData() {
	for i := range fullData {
		sort.Slice(fullData[i].Data, func(a, b int) bool {
			return fullData[i].Data[a].PartNumber < fullData[i].Data[b].PartNumber
		})
	}
}

func combineData() string {
	fullyParsedData := "["
	for scouterDataPartsNum := range fullData {
		combinedScouterData := ""
		for partNum := range fullData[scouterDataPartsNum].Data {
			combinedScouterData += fullData[scouterDataPartsNum].Data[partNum].Data
		}

		combinedScouterData = combinedScouterData[1 : len(combinedScouterData)-1]

		if scouterDataPartsNum != 0 {
			fullyParsedData += ", " + combinedScouterData
		} else {
			fullyParsedData += combinedScouterData
		}
	}

	fullyParsedData += "]"

	fmt.Println(fullyParsedData)

	return fullyParsedData
}

func downloadData(jsonData string) {
	file, _ := os.Create("output.json")
	file.Write([]byte(jsonData))

	defer file.Close()
}

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
