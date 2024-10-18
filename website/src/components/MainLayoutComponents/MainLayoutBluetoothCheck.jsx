import React, { useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { BluetoothDeviceContext } from "../../contexts/BluetoothDeviceContext";

const MainLayoutBluetoothCheck = () => {
  const { bluetoothDevice } = useContext(BluetoothDeviceContext);

  const textEncoder = new TextEncoder();
  const textDecoder = new TextDecoder();

  const sendScoutingData = async (scoutingData) => {
    console.log(scoutingData);

    const service = await bluetoothDevice.gatt.getPrimaryService(0x180d);
    const dataCharecteristic = await service.getCharacteristic(0x2a39);

    const generatedUUID = uuidv4();

    let encodedData = textEncoder.encode(scoutingData);

    console.log(encodedData);

    let generatePartsNumber = 0;
    while (true) {
      if (encodedData.byteLength == 0) {
        localStorage.setItem("scoutingData", JSON.stringify({ data: [] }));
        return;
      }

      const sendingData = {
        scouterNumber: generatedUUID,
        dataPart: generatePartsNumber,
        data: {},
      };

      const scoutingDataSize = 256 - encodedData.length;

      sendingData.data = textDecoder.decode(encodedData.slice(0, scoutingDataSize));

      console.log(sendingData);
      console.log(textEncoder.encode(JSON.stringify(sendingData)).buffer);
      dataCharecteristic.writeValue(textEncoder.encode(JSON.stringify(sendingData)).buffer);

      encodedData = encodedData.slice(scoutingDataSize);
      generatePartsNumber += 1;

      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (bluetoothDevice !== null) {
        const getStatus = async () => {
          const service = await bluetoothDevice.gatt.getPrimaryService(0x180d);
          const statusCharacteristic = await service.getCharacteristic(0x2a37);
          const value = await statusCharacteristic.readValue();

          const statusValue = value.getUint8(0);

          return statusValue;
        };

        getStatus().then(
          (statusValue) =>
            statusValue == 1 &&
            sendScoutingData(
              JSON.stringify(JSON.parse(localStorage.getItem("scoutingData")).data) ||
                JSON.stringify({ data: [] })
            )
        );
      }
    }, 15000);
    return () => clearInterval(interval);
  }, [bluetoothDevice]);

  return <></>;
};

export default MainLayoutBluetoothCheck;
