import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";

import {
  BluetoothDeviceContext,
  BluetoothDeviceProvider,
} from "../contexts/BluetoothDeviceContext";

const MainLayout = () => {
  const { bluetoothDevice, setBluetoothDevice } = useContext(BluetoothDeviceContext);

  useEffect(() => {
    const interval = setInterval(() => {
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

  return (
    <div
      style={{
        backgroundColor: "#3A3B3E",
        height: window.innerHeight,
        width: "100vw",
        overflow: "hidden",
      }}
    >
      <Outlet />
    </div>
  );
};

export default MainLayout;
