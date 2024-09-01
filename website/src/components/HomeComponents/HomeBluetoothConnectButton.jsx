import React, { useContext } from "react";
import { toast } from "react-toastify";

import {
  BluetoothDeviceContext,
} from "../../contexts/BluetoothDeviceContext";

const bluetoothService = 0x180d;

const HomeBluetoothConnectButton = () => {
  const { bluetoothDevice, setBluetoothDevice } = useContext(BluetoothDeviceContext);

  const connectBluetooth = async () => {
    try {
      // Requesting the device with filter of the bluetooth service
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ services: [bluetoothService] }],
      });

      setBluetoothDevice(await device.gatt.connect()); // Connecting to the device

      toast.success("Connected To Bluetooth" + bluetoothDevice.name);
    } catch (error) {
      console.log(error);
      toast.error("Failed To Connect To Bluetooth");
    }
  };
  return (
    <>
      <div
        style={{
          width: "33.84vw",
          height: "35.52vh",
          border: "1.63vh solid #1D1E1E",
          position: "absolute",
          bottom: "2.33vh",
          left: "1.07vw",
          backgroundColor: "#242424",
          borderRadius: "3.49vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={() => connectBluetooth()}
      >
        <h1 style={{ color: "#FFFFFF", fontSize: "5.58vh", fontWeight: "bold" }}>
          Connect To Bluetooth
        </h1>
      </div>
    </>
  );
};

export default HomeBluetoothConnectButton;
