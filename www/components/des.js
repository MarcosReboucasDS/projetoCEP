window.onload = function(){
  const buscar = document.querySelector("#butau");
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
}