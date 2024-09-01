import React, { createContext, useState } from "react";

export const BluetoothDeviceContext = createContext();

export const BluetoothDeviceProvider = ({ children }) => {
  const [bluetoothDevice, setBluetoothDevice] = useState(null);

  return (
    <BluetoothDeviceContext.Provider value={{ bluetoothDevice, setBluetoothDevice }}>
      {children}
    </BluetoothDeviceContext.Provider>
  );
};
