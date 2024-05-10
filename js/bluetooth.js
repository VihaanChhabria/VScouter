function blueConnect(){
    navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
      })
      .then(device => { /* … */ })
      .catch(error => { console.error(error); });
      
}

function bluePush(){
    
}


document.addEventListener("blueConnect", () => blueConnect())
document.addEventListener("bluePush", () => bluePush())