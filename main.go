package main

import (
	"fmt"
	"os"
	"time"

	"tinygo.org/x/bluetooth"
)

var adapter = bluetooth.DefaultAdapter

var data uint8 = 0
var fullData string = "{"
var singleData string = ""

func main() {
	println("starting")
	must("enable BLE stack", adapter.Enable())

	adv := adapter.DefaultAdvertisement()

	must("config adv", adv.Configure(bluetooth.AdvertisementOptions{
		LocalName:    "FRC 7414 Scouting Server",
		ServiceUUIDs: []bluetooth.UUID{bluetooth.ServiceUUIDHeartRate},
	}))
	must("start adv", adv.Start())

	var statusCharacteristic bluetooth.Characteristic
	var dataCharacteristic bluetooth.Characteristic

	must("add service", adapter.AddService(&bluetooth.Service{
		UUID: bluetooth.ServiceUUIDHeartRate,
		Characteristics: []bluetooth.CharacteristicConfig{
			{
				Handle: &statusCharacteristic,
				UUID:   bluetooth.CharacteristicUUIDHeartRateMeasurement,
				Value:  []byte{data},
				Flags:  bluetooth.CharacteristicReadPermission,
			},
			{
				Handle: &dataCharacteristic,
				UUID:   bluetooth.CharacteristicUUIDHeartRateControlPoint,
				Flags:  bluetooth.CharacteristicWritePermission,
				WriteEvent: func(client bluetooth.Connection, offset int, value []byte) {
					if len(value) > 0 {
						recievedData := string(value)
						println("Received data: ", recievedData+"\n\n\n")
						singleData = singleData + recievedData
					}
				},
			},
		},
	}))

	println("looping")
	retrieveData := ""
	for {
		println("retrieve data? (y/n)")
		fmt.Scan(&retrieveData)

		if retrieveData == "y" {
			for appNum := 1; appNum <= 1; appNum++ {
				statusCharacteristic.Write([]byte{uint8(appNum)})
				for singleData != "" {

				}
				time.Sleep(2 * time.Second)

				fullData = fullData + singleData + ", "
				singleData = ""
				println("\n\n\n\n\n\n\nFull Data:\n" + fullData)
			}
			fullData = fullData + "}"

			jsonFile, _ := os.Create("output.json")

			jsonFile.WriteString(fullData)
			jsonFile.Close()
		}
		retrieveData = "n"
	}
}

func must(action string, err error) {
	if err != nil {
		panic("failed to " + action + ": " + err.Error())
	}
}
