let bluetoothDevice = null;

document.getElementById('blueConnect')
  .addEventListener('click', () => blueConnect());

document.getElementById('bluePush')
  .addEventListener('click', () => bluePush());

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

function bluePush() {
  if (bluetoothDevice) {
    sendData();
  } else {
    blueConnect();
  }
}

function sendData() {
  if (bluetoothDevice.gatt.connected) {
    bluetoothDevice.gatt.getPrimaryService(0x180D)
      .then(service => {
        return service.getCharacteristic(0x2A39);
      })
      .then(characteristic => {
        return characteristic.writeValue(stringToArrayBuffer("test"));
      })
      .then(value => {
        console.log(`Status is ${value.getUint8(0)}`);
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
  if (bluetoothDevice.gatt.connected) {
    bluetoothDevice.gatt.getPrimaryService(0x180D)
      .then(service => {
        return service.getCharacteristic(0x2A37);
      })
      .then(characteristic => {
        return characteristic.readValue();
      })
      .then(value => {
        console.log(`Status is ${value.getUint8(0)}`);
      })
      .catch(error => {
        console.error(error);
      });
  } else {
    console.error('Device is not connected.');
  }
}

function stringToArrayBuffer(str) {
  const encoder = new TextEncoder();
  return encoder.encode(str);
}
