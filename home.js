const botaoCadastrar = document.getElementById('botaoCadastrar');
const botaoLogin = document.getElementById('botaoLogin');


botaoCadastrar.addEventListener('click', (event) => {
  event.preventDefault();
  alert('Indo para a página de cadastro.');
  window.location.href = 'cadastro.html';
});

botaoLogin.addEventListener('click', (event) => {
  event.preventDefault();
  alert('Indo para a página de login.');
  window.location.href = 'login.html';
});


const footer = document.getElementById('footer');
footer.innerHTML += '<p>Data atual: ' + new Date().toLocaleDateString() + '<p>';
footer.innerHTML += '<p>Desenvolvido por Samuel Ferraz e Nathan Balmant</p>';
