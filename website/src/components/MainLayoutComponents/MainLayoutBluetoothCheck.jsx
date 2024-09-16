import React, { useContext, useEffect } from "react";
import {v4 as uuidv4} from "uuid";

import { BluetoothDeviceContext } from "../../contexts/BluetoothDeviceContext";

const MainLayoutBluetoothCheck = () => {
  const { bluetoothDevice } = useContext(BluetoothDeviceContext);

  const sendScoutingData = async (data) => {
    dataCharecteristic = await service.getCharacteristic(0x2A39);
    dataCharecteristic.writeValue(data);
  }

  useEffect(() => {
    const interval = setInterval(() => {
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
