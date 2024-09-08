import React, { useContext, useEffect } from "react";

import { BluetoothDeviceContext } from "../../contexts/BluetoothDeviceContext";

const MainLayoutBluetoothCheck = () => {
  const { bluetoothDevice } = useContext(BluetoothDeviceContext);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log(bluetoothDevice);
      if (bluetoothDevice !== null) {
        const getStatus = async () => {
          const service = await bluetoothDevice.gatt.getPrimaryService(0x180d);
          const characteristic = await service.getCharacteristic(0x2a37);
          const value = await characteristic.readValue();

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
