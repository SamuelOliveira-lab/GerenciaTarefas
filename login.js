document.addEventListener('DOMContentLoaded', () => {
    const InsereEmail = document.getElementById('email');
    const InsereSenha = document.getElementById('senha');
    const LembrarMeCheckbox = document.getElementById('lembrarMe');

    const EmailSalvo = localStorage.getItem('email');
    const SenhaSalva = localStorage.getItem('senha');
    const LembreMe = localStorage.getItem('lembrarMe') === 'true';

    if (LembreMe && EmailSalvo && SenhaSalva) {
        InsereEmail.value = EmailSalvo;
        InsereSenha.value = SenhaSalva;
        LembrarMeCheckbox.checked = true;
    } else {
        LembrarMeCheckbox.checked = false;
    }
});

const BotaoLogin = document.getElementById('botaoEntrar');
const EsqueciSenha = document.getElementById('esqueciSenha');

BotaoLogin.addEventListener('click', (event) => {
    event.preventDefault();

    const emailDigitado = document.getElementById('email').value;
    const senhaDigitada = document.getElementById('senha').value;
    const lembrarMe = document.getElementById('lembrarMe').checked;

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    const usuarioValido = usuarios.find(usuario => usuario.email === emailDigitado && usuario.senha === senhaDigitada);

    if (usuarioValido) {

        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioValido.nome));

        if (lembrarMe) {
            localStorage.setItem('email', emailDigitado);
            localStorage.setItem('senha', senhaDigitada);
            localStorage.setItem('lembrarMe', 'true');
        } else {
            localStorage.removeItem('email');
            localStorage.removeItem('senha');
            localStorage.removeItem('lembrarMe');
        }

        window.location.href = 'principal.html';

    } else {

        alert('E-mail ou senha incorretos. Tente novamente.');
    }
});

const ControleSenha = document.querySelectorAll('.VerSenha');

ControleSenha.forEach(toggle => {
    toggle.addEventListener('click', () => {
        const input = toggle.previousElementSibling;

        if (input.type === 'password') {
            input.type = 'text';
            toggle.classList.add('mostrar-senha');
        } else {
            input.type = 'password';
            toggle.classList.remove('mostrar-senha');
        }
    });
});

EsqueciSenha.addEventListener('click', (event) => {
    event.preventDefault();

    const emailDigitado = document.getElementById('email').value;
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuarioIndex = usuarios.findIndex(usuario => usuario.email === emailDigitado);

    if (usuarioIndex !== -1) {

        const novaSenha = prompt('Digite sua nova senha:');

        if (novaSenha) {
            usuarios[usuarioIndex].senha = novaSenha;
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
            alert('Senha foi alterada com sucesso!');

        } else {
            alert('A senha não foi alterada. Tente novamente.');
        }
    } else {
        alert('E-mail não encontrado. Verifique.');
    }
});
