const botaoCadastro = document.getElementById('botaoCriaCadastro');
const dialogoConfirmacao = document.getElementById('confirmaCadastro');



botaoCadastro.addEventListener('click', (event) => {
    event.preventDefault();


    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const repetirSenha = document.getElementById('repetirSenha').value;


    if (nome === '' || email === '' || senha === '' || repetirSenha === '') {
        alert('Preencha todos os campos.');
        return;
    }

    if (senha !== repetirSenha) {
        alert('As senhas não coincidem. Por favor, verifique.');
        return;
    }

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    if (usuarios.length >= 5) {
        alert('O limite de usuários foi atingido.');
        return;
    }

    if (usuarios.some(usuario => usuario.email === email)) {
        alert('E-mail já cadastrado. Tente outro e-mail.');
        return;
    }

    usuarios.push({ nome, email, senha });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    dialogoConfirmacao.showModal();
});


const botaoFecharDialogo = dialogoConfirmacao.querySelector('button');
botaoFecharDialogo.addEventListener('click', () => {
    dialogoConfirmacao.close(); 
    window.location.href = 'home.html'; 
});
