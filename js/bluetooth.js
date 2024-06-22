let bluetoothDevice = null;
let gattOperationLock = false;

document.getElementById('blueConnect')
  .addEventListener('click', () => blueConnect());

checkAndSend();

setInterval(alertBluetooth, 1000);
let blinkAlert = 1;

function alertBluetooth() {
  const alertButton = document.getElementById('alertBluetooth');
  if (bluetoothDevice && bluetoothDevice.gatt.connected) {
    alertButton.innerText = "You are connected to the Bluetooth network.";
    alertButton.style.background = "#EE5622";
  } else {
    if (blinkAlert == 1) {
      alertButton.style.background = "#FF0000";
    } else {
      alertButton.style.background = "#0000FF";
    }
    blinkAlert = blinkAlert * -1;

    alertButton.innerText = "Please connect to the Bluetooth network!";
  }
}

function blueConnect() {
  navigator.bluetooth.requestDevice({
    filters: [{
      services: [0x180D]
    }]
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
      try {
        const statusValue = await getStatus();
        console.log(localStorage["jsonData"]);
        if (statusValue == 1) {
          cutAndSendData(localStorage["jsonData"] || "");
        }
      } catch (error) {
        console.error('Error in checkAndSend loop:', error);
      }
    } else {
      console.error('Device is not connected.');
    }
  }
}

function cutAndSendData(stringData) {
  console.log('sending "' + stringData + '"');

  let fullEncodedStr = encodeString(stringData);

  let chunks = Math.ceil(fullEncodedStr.length / 512);
  let chunkSize = fullEncodedStr.length / chunks;

  for (let i = 0; i < chunks; i++) {
    let chunk = fullEncodedStr.subarray(i * chunkSize, (i + 1) * chunkSize);
    sendData(chunk);
  }
}

async function sendData(data) {
  if (!gattOperationLock) {
    gattOperationLock = true;
    try {
      const service = await bluetoothDevice.gatt.getPrimaryService(0x180D);
      const characteristic = await service.getCharacteristic(0x2A39);
      await characteristic.writeValue(data);
    } catch (error) {
      console.error('Error writing data:', error);
    } finally {
      gattOperationLock = false;
    }
  } else {
    console.error('Device is not connected or operation already in progress.');
    sendData(data)
  }
}

async function forceConnect() {
  while (true) {
    try {
      await bluetoothDevice.gatt.connect();
      break; // Exit loop on successful connection
    } catch (error) {
      console.error('DOMException occurred: ', error);
      if (!(error instanceof DOMException)) {
        break; // Exit loop if it's not a DOMException
      }
    }
  }
}

async function getStatus() {
  let statusValue = 0;

  if (!gattOperationLock) {
    gattOperationLock = true;
    try {
      const service = await bluetoothDevice.gatt.getPrimaryService(0x180D);
      const characteristic = await service.getCharacteristic(0x2A37);
      const value = await characteristic.readValue();
      statusValue = value.getUint8(0);
      console.log(`Status is ${statusValue}`);
    } catch (error) {
      console.error('Error reading status:', error);
    } finally {
      gattOperationLock = false;
    }
  } else {
    console.error('Device is not connected or operation already in progress.');
    getStatus()
  }

  return statusValue;
}

function encodeString(str) {
  const encoder = new TextEncoder();
  return encoder.encode(str);
}
