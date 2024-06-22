let bluetoothDevice = null;

document.getElementById('blueConnect').addEventListener('click', () => blueConnect());

checkAndSend();

setInterval(alertBluetooth, 1000);
let blinkAlert = 1;

function alertBluetooth() {
  let alertButton = document.getElementById('alertBluetooth');
  if (bluetoothDevice) {
    alertButton.innerText = "You are connected to the Bluetooth network.";
    alertButton.style.background = "#EE5622";
  } else {
    alertButton.style.background = blinkAlert == 1 ? "#FF0000" : "#0000FF";
    blinkAlert = blinkAlert * -1;
    alertButton.innerText = "Please connect to the Bluetooth network!";
  }
}

function blueConnect() {
  navigator.bluetooth.requestDevice({
    filters: [{ services: [0x180D] }]
  })
  .then(device => {
    bluetoothDevice = device;
    device.addEventListener('gattserverdisconnected', onDisconnected);
    return forceConnect();
  })
  .catch(error => {
    console.error('Error requesting Bluetooth device: ', error);
  });
}

function onDisconnected(event) {
  bluetoothDevice = null;
}

async function checkAndSend() {
  while (true) {
    await new Promise(r => setTimeout(r, 10000));

    console.log("looping");
    if (bluetoothDevice && bluetoothDevice.gatt.connected) {
      const statusValue = await getStatus();
      console.log(localStorage["jsonData"]);
      if (statusValue == 1) {
        await cutAndSendData(localStorage["jsonData"] || "");
      }
    } else {
      console.error('Device is not connected.');
    }
  }
}

async function cutAndSendData(stringData) {
  console.log('sending "' + stringData + '"');

  const fullEncodedStr = encodeString(stringData);
  const chunkSize = 500;

  for (let i = 0; i < fullEncodedStr.length; i += chunkSize) {
    const chunk = fullEncodedStr.subarray(i, i + chunkSize);
    console.log(`Sending chunk of length: ${chunk.length}`);
    await sendData(chunk);
  }
}

async function sendData(data) {
  if (bluetoothDevice.gatt.connected) {
    try {
      const service = await bluetoothDevice.gatt.getPrimaryService(0x180D);
      const characteristic = await service.getCharacteristic(0x2A39);
      console.log(data);
      await characteristic.writeValue(data);
    } catch (error) {
      console.error('Error writing data; trying again:', error);
      await new Promise(r => setTimeout(r, 2000));
      await sendData(data);
    }
  } else {
    console.error('Device is not connected.');
  }
}

function forceConnect() {
  bluetoothDevice.gatt.connect()
    .catch(error => {
      console.error('DOMException occurred: ', error);
      if (error instanceof DOMException) {
        forceConnect();
      } else {
        console.error(error);
      }
    });
}

async function getStatus() {
  let statusValue = 0;

  try {
    if (bluetoothDevice.gatt.connected) {
      const service = await bluetoothDevice.gatt.getPrimaryService(0x180D);
      const characteristic = await service.getCharacteristic(0x2A37);
      const value = await characteristic.readValue();
      
      statusValue = value.getUint8(0);
      console.log(`Status is ${statusValue}`);
    } else {
      console.error('Device is not connected.');
    }
  } catch (error) {
    console.error('Error reading status:', error);
  }

  return statusValue;
}

function encodeString(str) {
  const encoder = new TextEncoder();
  return encoder.encode(str);
}
