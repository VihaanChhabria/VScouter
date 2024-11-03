import React, { useContext } from "react";
import { toast } from "react-toastify";

import { BluetoothDeviceContext } from "../../contexts/BluetoothDeviceContext";

const bluetoothService = 0x180d;

const HomeBluetoothConnectButton = () => {
  const { bluetoothDevice, setBluetoothDevice } = useContext(
    BluetoothDeviceContext
  );

  const connectBluetooth = async () => {
    try {
      // Requesting the device with filter of the bluetooth service
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ services: [bluetoothService] }],
      });

      await device.gatt.connect(); // Connecting to the device
      device.addEventListener("gattserverdisconnected", () => {
        setBluetoothDevice(null);
      });

      setBluetoothDevice(device);

      toast.success("Connected To Bluetooth: " + device.gatt.connected);
    } catch (error) {
      console.log(error);
      toast.error("Failed To Connect To Bluetooth");
    }
  };
  return (
    <>
      <div
        style={{
          width: "33.84dvw",
          height: "35.52dvh",
          border: "1.63dvh solid #1D1E1E",
          position: "absolute",
          bottom: "2.33dvh",
          left: "1.07dvw",
          backgroundColor: "#242424",
          borderRadius: "3.49dvh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          whiteSpace: "pre-wrap",
          wordWrap: "break-word",
        }}
        onClick={() => connectBluetooth()}
      >
        <h1
          style={{ color: "#FFFFFF", fontSize: "5.58dvh", fontWeight: "bold", textAlign: "center" }}
        >
          Connect To Bluetooth
        </h1>
      </div>
    </>
  );
};

export default HomeBluetoothConnectButton;
