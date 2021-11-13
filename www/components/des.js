window.onload = function(){
  const buscar = document.querySelector("#butau");
  const buscarqr = document.querySelector("#butauqr");
  const cep = document.querySelector('#cep')
  const opcoes = {
    methos: 'GET',
    mode: 'cors',
    cache: 'default'
  }
  butau.addEventListener('click', function(){
    fetch(`https://viacep.com.br/ws/${cep.value}/json/`, opcoes)
    .then(response => {response.json()
        .then(data => {
            document.querySelector('#estado').value = data['uf'];
            document.querySelector('#cidade').value = data['localidade'];
            document.querySelector('#bairro').value = data['bairro'];
            document.querySelector('#rua').value = data['logradouro'];
        })
    })
  });
  butauqr.addEventListener("click", function(){
       cordova.plugins.barcodeScanner.scan(
      function (result) {
          fetch(`https://viacep.com.br/ws/${result.text}/json/`, opcoes)
    .then(response => {response.json()
        .then(data => {         
            document.querySelector('#cep').value = result.value;
            document.querySelector('#estado').value = data['uf'];
            document.querySelector('#cidade').value = data['localidade'];
            document.querySelector('#bairro').value = data['bairro'];
            document.querySelector('#rua').value = data['logradouro'];
        })
    })
      },
      function (error) {
          alert("Scanning failed: " + error);
      },
      {
          preferFrontCamera : false, // iOS and Android
          showFlipCameraButton : true, // iOS and Android
          showTorchButton : true, // iOS and Android
          torchOn: false, // Android, launch with the torch switched on (if available)
          saveHistory: true, // Android, save scan history (default false)
          prompt : "Place a barcode inside the scan area", // Android
          resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
          formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
          orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
          disableAnimations : true, // iOS
          disableSuccessBeep: false // iOS and Android
      }
   );

  })
}