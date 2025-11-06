const loginbtn = document.getElementById("abrirLogin");
const dialog = document.querySelector("dialog");

loginbtn.addEventListener("click", () => dialog.showModal())



const btnFechar = document.getElementById('btnFechar');
const login = document.getElementById('login');

loginbtn.onclick = function(){
    login.showModal();
}

btnFechar.onclick = function(){
    login.close();
}

let dadosUsuario = [
    {nome: "user", email: "user@user.com", senha: "123"},
    {nome: "aluno", email: "aluno@aluno.com", senha: "aluno"}
];

const formLogin = document.querySelector('#login form');

formLogin.addEventListener('submit', e => {
    e.preventDefault();

    let msgErro = document.querySelector('.erro');
    if (msgErro) {
        login.removeChild(msgErro);
    }

    let email = document.getElementById('email').value;
    let senha = document.getElementById('senha').value;

    dadosUsuario.forEach( usuario => {
        if (email === usuario.email && senha === usuario.senha) {
            sessionStorage.setItem('usuarioLogado', "true");
            sessionStorage.setItem('nomeUsuario', usuario.nome);

            window.location.href = "./admin.html";
        }
    });

    let usuarioLogado = sessionStorage.getItem('usuarioLogado');

    if (!usuarioLogado) {
        const erro = document.createElement('p');
        erro.classList.add('erro');
        erro.textContent = "Login ou senha Inválido";
        login.insertBefore(erro, login.firstChild);
        this.reset();
    }
});

