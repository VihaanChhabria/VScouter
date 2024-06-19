let bluetoothDevice = null;

document.getElementById('blueConnect')
  .addEventListener('click', () => blueConnect());

//document.getElementById('bluePush')
//  .addEventListener('click', () => bluePush());

checkAndSend()

function blueConnect() {
  navigator.bluetooth.requestDevice({
    filters: [{
      services: [0x180D]
    }]
  })
  .then(device => {
    bluetoothDevice = device;
    return forceConnect();
  })
  .catch(error => {
    console.error('Error requesting Bluetooth device: ', error);
  });
}

async function checkAndSend() {
  while (true) {
    await new Promise(r => setTimeout(r, 30000));
    console.log("looping")
    if (bluetoothDevice) {
      switch (getStatus()) {
        case 1:
          sendData("data :)");
          break;
      
        default:
          break;
      }
    } else {
      blueConnect();
    }
  }
}

function sendData(stringData) {
  if (bluetoothDevice.gatt.connected) {
    bluetoothDevice.gatt.getPrimaryService(0x180D)
      .then(service => {
        return service.getCharacteristic(0x2A39);
      })
      .then(characteristic => {
        console.log('sending "' + stringData + '"')
        return characteristic.writeValue(stringToArrayBuffer(stringData));
      })
      .catch(error => {
        console.error(error);
      });
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

function getStatus() {
  statusValue = 0;

  if (bluetoothDevice.gatt.connected) {
    bluetoothDevice.gatt.getPrimaryService(0x180D)
      .then(service => {
        return service.getCharacteristic(0x2A37);
      })
      .then(characteristic => {
        return characteristic.readValue();
      })
      .then(value => {
        statusValue = value
        console.log(`status is ${value.getUint8(0)}`);
      })
      .catch(error => {
        console.error(error);
      });
  } else {
    console.error('device is not connected.');
  }

  return statusValue
}

function stringToArrayBuffer(str) {
  const encoder = new TextEncoder();
  return encoder.encode(str);
}
