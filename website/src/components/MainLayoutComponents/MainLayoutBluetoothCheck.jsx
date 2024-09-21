import React, { useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { BluetoothDeviceContext } from "../../contexts/BluetoothDeviceContext";

const MainLayoutBluetoothCheck = () => {
  const { bluetoothDevice } = useContext(BluetoothDeviceContext);

  const textEncoder = new TextEncoder();
  const textDecoder = new TextDecoder();

  const sendScoutingData = async (scoutingdata) => {
    const generatedUUID = uuidv4();

    let encodedData = textEncoder.encode(JSON.stringify(scoutingdata));
    console.log(encodedData.byteLength);

    let generateParts = true;
    let generatePartsNumber = 0;
    while (generateParts) {
      const data = {
        scouterNumber: generatedUUID,
        dataPart: generatePartsNumber,
        data: {},
      };

      const dataSize = textEncoder.encode(JSON.stringify(data)).length;
      const scoutingDataPartSize = 512 - dataSize;

      data.data = JSON.parse(textDecoder.decode(encodedData.slice(0, scoutingDataPartSize - 1)));

      console.log(data);

      encodedData = encodedData.slice(scoutingDataPartSize);
      generatePartsNumber += 1;

      if (encodedData.byteLength == 0) {
        generateParts = false;
      }
    }
    // dataCharecteristic = await service.getCharacteristic(0x2a39);
    // dataCharecteristic.writeValue(data);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      sendScoutingData(
        "etesteeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaakkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppoooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooeeeeeeeeeeeeeeeeeeeeeeeeeuuuuuuuuuuuuuuuuuuuuuuuuuuzzzzz"
      );
      // console.log(textEncoder.encode("The poor boy missed the boat again. The way to save money is not to spend much. The point of the steel pen was bent and twisted. A rag will soak up spilled water. Tight curls get limp on rainy days. The tiny girl took off her hat. Eight miles of woodland burned to waste. The leaf drifts along with a slow spin. Help the weak to preserve their strength. He takes the oath of office each March. The poor boy missed the boat again. The way to save money is not to spend much. The point of the steel pen was bent and twisted. A rag will soak up spilled water. Tight curls get limp on rainy days. The tiny girl took off her hat. Eight miles of woodland burned to waste. The leaf drifts along with a slow spin. Help the weak to preserve their strength. He takes the oath of office each March. The poor boy missed the boat again. The way to save money is not to spend much. The point of the steel pen was bent and twisted. A rag will soak up spilled water. Tight curls get limp on rainy days. The tiny girl took eeeeeeeeeeeeeeeeea").byteLength);
      if (bluetoothDevice !== null) {
        const getStatus = async () => {
          const service = await bluetoothDevice.gatt.getPrimaryService(0x180d);
          const statusCharacteristic = await service.getCharacteristic(0x2a37);
          const value = await statusCharacteristic.readValue();

          const statusValue = value.getUint8(0);
          console.log(statusValue);
        };
        getStatus();
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [bluetoothDevice]);

  return <></>;
};

export default MainLayoutBluetoothCheck;
