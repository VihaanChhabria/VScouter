package main

import (
	"fmt"
	"io"
	"os"
	"time"

	"tinygo.org/x/bluetooth"
)

var adapter = bluetooth.DefaultAdapter

var scoutingStatus uint8 = 0
var fullData string = ""
var singleData []string

var matchesStatus uint8 = 0
var matchesStatusCount int = 0

func main() {

	getMatches := ""
	fmt.Println("Do you want to download a new match schedule? (y/n)")
	fmt.Scan(&getMatches)

	if getMatches == "y" {
		DownloadMatches()
	}
	openedMatchesFile, _ := os.Open("matches.json")
	matchesData, _ := io.ReadAll(openedMatchesFile)
	fmt.Println(string(matchesData))

	cutMatchesNum := (len(matchesData) / 400) + 1
	var cutMatches [][]byte
	for i := 0; i < cutMatchesNum; i++ {
		if i == (cutMatchesNum - 1) {
			cutMatches = append(cutMatches, matchesData[(i*400):])
			fmt.Println(string(matchesData[(i * 400):]))
			fmt.Println("last")
		} else {
			cutMatches = append(cutMatches, matchesData[(i*400):((i+1)*400)])
			fmt.Println(string(matchesData[(i * 400):((i + 1) * 400)]))
			fmt.Println(i)
		}
	}

	fmt.Println("starting")
	must("enable BLE stack", adapter.Enable())

	adv := adapter.DefaultAdvertisement()

	must("config adv", adv.Configure(bluetooth.AdvertisementOptions{
		LocalName:    "FRC 7414 Scouting Server",
		ServiceUUIDs: []bluetooth.UUID{bluetooth.ServiceUUIDHeartRate},
	}))
	must("start adv", adv.Start())

	var scoutingStatusCharacteristic bluetooth.Characteristic
	var scoutingDataCharacteristic bluetooth.Characteristic

	var matchesDataCharacteristics bluetooth.Characteristic
	var matchesStatusCharacteristics bluetooth.Characteristic

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
				WriteEvent: func(client bluetooth.Connection, offset int, value []byte) {
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
				WriteEvent: func(client bluetooth.Connection, offset int, value []byte) {
					if len(value) > 0 {
						recievedData := string(value)
						fmt.Println("Received matchesStatus value: ", recievedData)
						if recievedData == "1" {
							if len(cutMatches) > (matchesStatusCount) {
								matchesDataCharacteristics.Write(cutMatches[matchesStatusCount])
								fmt.Println(string(cutMatches[matchesStatusCount]))
								matchesStatusCharacteristics.Write([]byte{uint8(0)})
								fmt.Println("Wrote match data chunk and updated status to 0")
								matchesStatusCount += 1
							} else {
								matchesStatusCharacteristics.Write([]byte{uint8(2)})
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
	retrieveData := ""
	for {
		fmt.Println("retrieve data? (y/n)")
		fmt.Scan(&retrieveData)

		if retrieveData == "y" {
			for appNum := 1; appNum <= 1; appNum++ {
				fullData = "["
				scoutingStatusCharacteristic.Write([]byte{uint8(appNum)})

				time.Sleep(15 * time.Second)
				scoutingStatusCharacteristic.Write([]byte{uint8(0)})

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
