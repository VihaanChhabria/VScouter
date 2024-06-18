// function blueConnect(){
//     navigator.bluetooth.requestDevice({
//         acceptAllDevices: true,
//       })
//       .then(device => { /* … */ })
//       .catch(error => { console.error(error); });
// }

// function bluePush(){
    
// }


// document.addEventListener("blueConnect", () => blueConnect())
// document.addEventListener("bluePush", () => bluePush())
document.getElementById('blueConnect')
    .addEventListener('click', function(event) {
        navigator.bluetooth.requestDevice({
            filters: [{
              services: [0x180D]
            }]
          })
          .then(device => device.gatt.connect())
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
          .catch(error => { console.error(error); });        
    });



//