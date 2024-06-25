package main

import (
	"fmt"
	"io"
	"os"
	"time"

	"tinygo.org/x/bluetooth"
)

var adapter = bluetooth.DefaultAdapter

var data uint8 = 0
var fullData string = ""
var singleData []string

func main() {

	getMatches := ""
	fmt.Println("Do you want to download a new match schedule? (y/n)")
	fmt.Scan(&getMatches)

	if getMatches == "y" {
		DownloadMatches()
	}
	openedMatchesFile, _ := os.Open("file.txt")
	matchesFile, _ := io.ReadAll(openedMatchesFile)

	fmt.Println("starting")
	must("enable BLE stack", adapter.Enable())

	adv := adapter.DefaultAdvertisement()

	must("config adv", adv.Configure(bluetooth.AdvertisementOptions{
		LocalName:    "FRC 7414 Scouting Server",
		ServiceUUIDs: []bluetooth.UUID{bluetooth.ServiceUUIDHeartRate},
	}))
	must("start adv", adv.Start())

	var statusCharacteristic bluetooth.Characteristic
	var matchesCharacteristics bluetooth.Characteristic
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
				Handle: &matchesCharacteristics,
				UUID:   bluetooth.CharacteristicUUIDRestingHeartRate,
				Value:  matchesFile,
				Flags:  bluetooth.CharacteristicReadPermission,
			},
			{
				Handle: &dataCharacteristic,
				UUID:   bluetooth.CharacteristicUUIDHeartRateControlPoint,
				Flags:  bluetooth.CharacteristicWritePermission,
				WriteEvent: func(client bluetooth.Connection, offset int, value []byte) {
					if len(value) > 0 {
						recievedData := string(value)
						fmt.Println("Received data: ", recievedData+"\n\n\n")
						singleData = append(singleData, recievedData)
					}
				},
			},
		},
	}))

	fmt.Println("looping")
	retrieveData := ""
	for {
		fmt.Println("retrieve data? (y/n)")
		fmt.Scan(&retrieveData)

		if retrieveData == "y" {
			for appNum := 1; appNum <= 1; appNum++ {
				fullData = "["
				statusCharacteristic.Write([]byte{uint8(appNum)})

				time.Sleep(15 * time.Second)
				statusCharacteristic.Write([]byte{uint8(0)})

				singleData = removeDuplicateStr(singleData)

				for _, item := range singleData {
					fullData = fullData + item
				}

				singleData = []string{}
				fmt.Println("\n\n\n\n\n\n\nFull Data:\n" + fullData)
				fullData = fullData + "]"

				jsonFile, _ := os.Create("output/" + time.Now().String() + ".json")

				jsonFile.WriteString(fullData)
				jsonFile.Close()

				fullData = ""

			}
		}
		retrieveData = "n"
	}
}

func must(action string, err error) {
	if err != nil {
		panic("failed to " + action + ": " + err.Error())
	}
}

func removeDuplicateStr(strSlice []string) []string {
	var nonRepeat []string

	for _, item := range strSlice {
		if !contains(nonRepeat, item) {
			nonRepeat = append(nonRepeat, item)
		}
	}

	return nonRepeat
}

func contains(slice []string, str string) bool {
	for _, v := range slice {
		if v == str {
			return true
		}
	}
	return false
}
