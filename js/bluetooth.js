let bluetoothDevice = null;

document.getElementById('blueConnect')
    .addEventListener('click', function(event) {
        if (bluetoothDevice) {
            getBlueStatus(bluetoothDevice, 0);
        } else {
            requestDevice();
        }
    });

function requestDevice() {
    navigator.bluetooth.requestDevice({
        filters: [{
            services: [0x180D]
        }]
    })
    .then(device => {
        bluetoothDevice = device; // Store the device
        return getBlueStatus(device, 0);
    })
    .catch(error => {
        console.error('Error requesting Bluetooth device: ', error);
    });
}

function getBlueStatus(device, retries) {
  device.gatt.connect()
  .then(server => {
      return server.getPrimaryService(0x180D);
  })
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
    console.error('DOMException occurred: ', error);
    if (error instanceof DOMException) {
      if (retries < 5) { // Set a maximum number of retries
        getBlueStatus(device, retries + 1)
      } else {
        console.error('Max retries reached. Could not connect to Bluetooth device.');
      }
    } else {
      console.error(error);
    }
  });
}