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
    if (bluetoothDevice) {
      statusValue = await getStatus()
      switch (statusValue) {
        case 1:
          sendData(localStorage["jsonData"] || "")
          break
      
        default:
          break
      }
    } else {
      blueConnect()
    }
  }
}

function sendData(stringData) {
  if (bluetoothDevice.gatt.connected) {
    bluetoothDevice.gatt.getPrimaryService(0x180D)
      .then(service => {
        return service.getCharacteristic(0x2A39)
      })
      .then(characteristic => {
        console.log('sending "' + stringData + '"')
        return characteristic.writeValue(encodeString(stringData))
      })
      .catch(error => {
        console.error(error)
      })
  } else {
    console.error('Device is not connected.')
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
