package main

import (
	"encoding/json"
	"fmt"
	"time"

	"tinygo.org/x/bluetooth"
)

// Access to devices' Bluetooth
var adapter = bluetooth.DefaultAdapter

// Variables to hold scouting and match status and data
var status uint8

type DataPart struct {
	partNumber int
	data       string
}
type Data struct {
	id   int
	data []DataPart
}

var fullData []Data

type NewData struct {
	ID   int    `json:"id"`
	Part int    `json:"part"`
	Data string `json:"data"`
}

var bluetoothService bluetooth.UUID = bluetooth.ServiceUUIDHeartRate
var bluetoothCharacteristicStatus bluetooth.UUID = bluetooth.CharacteristicUUIDHeartRateMeasurement
var bluetoothCharacteristicData bluetooth.UUID = bluetooth.CharacteristicUUIDHeartRateControlPoint

func main() {

	status = 0

	characteristics := initBluetoothSever()
	statusCharacteristic := characteristics[0]

	fmt.Println("looping")
	retrieveData := "n"
	for {
		// Prompt user to retrieve data
		fmt.Println("retrieve data? (y/n)")
		fmt.Scan(&retrieveData)

		if retrieveData == "y" {
			statusCharacteristic.Write([]byte{1})

			for i := 0; i < 15; i++ {
				fmt.Println("Status Turning Off In :", 15-i)
				time.Sleep(1 * time.Second)
			}
			
			statusCharacteristic.Write([]byte{0})

			for i := 0; i < 100; i++ {
				fmt.Println("")
			}

			fmt.Println("Received Data: ", fullData)
		}
		retrieveData = "n"
	}
}

func initBluetoothSever() []bluetooth.Characteristic {

	fmt.Println("starting")
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
		WriteEvent: func(client bluetooth.Connection, offset int, value []byte) {
			var newData NewData
			json.Unmarshal(value, &newData)

			if idInList(newData.ID, fullData) {
				fullData[0].data = append(fullData[newData.ID].data, DataPart{newData.Part, newData.Data})
			} else {
				fullData = append(fullData, Data{newData.ID, []DataPart{{newData.Part, newData.Data}}})
			}

			fmt.Println(fullData)
		},
	}

	// Add service with characteristics to the adapter
	must("add service", adapter.AddService(&bluetooth.Service{
		UUID:            bluetooth.ServiceUUIDHeartRate,
		Characteristics: []bluetooth.CharacteristicConfig{statusCharacteristicConfig, dataCharacteristicConfig},
	}))

	return []bluetooth.Characteristic{statusCharacteristic, dataCharacteristic}
}

func idInList(id int, list []Data) bool {
	for _, data := range list {
		if data.id == id {
			return true
		}
	}
	return false
}

// Helper function to panic on errors
func must(action string, err error) {
	if err != nil {
		panic("failed to " + action + ": " + err.Error())
	}
}
