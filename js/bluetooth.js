bluetoothDevice = null

document.getElementById('blueConnect')
  .addEventListener('click', () => blueConnect())

//document.getElementById('bluePush')
//  .addEventListener('click', () => bluePush())

checkAndSend()

function blueConnect() {
  navigator.bluetooth.requestDevice({
    filters: [{
      services: [0x180D]
    }]
  })
  .then(device => {
    bluetoothDevice = device
    return forceConnect()
  })
  .catch(error => {
    console.error('Error requesting Bluetooth device: ', error)
  })
}

async function checkAndSend() {
  while (true) {
    await new Promise(r => setTimeout(r, 10000))
    console.log("looping")
    if (bluetoothDevice){
      if (bluetoothDevice.gatt.connected) {
        statusValue = await getStatus()
        switch (statusValue) {
          case 1:
            cutAndSendData(localStorage["jsonData"] || "")
            break
        
          default:
            break
        }
      } else {
        blueConnect()
      }
    }
  }
}

async function cutAndSendData(stringData) {
  console.log('sending "' + stringData + '"');

  let fullEncodedStr = encodeString(stringData);

  let chunks = Math.ceil(fullEncodedStr.length / 512);
  let chunkSize = fullEncodedStr.length / chunks;

  for (let i = 0; i < chunks; i++) {
    let chunk = fullEncodedStr.subarray(i * chunkSize, (i + 1) * chunkSize);
    await sendData(chunk);
  }
}

async function sendData(data) {
  if (bluetoothDevice.gatt.connected) {
    try {
      const service = await bluetoothDevice.gatt.getPrimaryService(0x180D);
      const characteristic = await service.getCharacteristic(0x2A39);
      await characteristic.writeValue(data);
    } catch (error) {
      console.error('Error writing data:', error);
    }
  } else {
    console.error('Device is not connected.');
  }
}


function forceConnect() {
  bluetoothDevice.gatt.connect()
    .catch(error => {
      console.error('DOMException occurred: ', error)
      if (error instanceof DOMException) {
        forceConnect()
      } else {
        console.error(error)
      }
    })
}

async function getStatus() {
  let statusValue = 0

  try {
    if (bluetoothDevice.gatt.connected) {
      const service = await bluetoothDevice.gatt.getPrimaryService(0x180D)
      const characteristic = await service.getCharacteristic(0x2A37)
      const value = await characteristic.readValue()
      
      statusValue = value.getUint8(0)
      console.log(`Status is ${statusValue}`)
    } else {
      console.error('Device is not connected.')
    }
  } catch (error) {
    console.error('Error reading status:', error)
  }

  return statusValue
}

function encodeString(str) {
  const encoder = new TextEncoder()
  return encoder.encode(str)
}
