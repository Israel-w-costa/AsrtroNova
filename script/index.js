const loginbtn = document.getElementById("abrirLogin");
const cadastrabtn = document.getElementById("cadastrabtn");
const dialog = document.querySelector("dialog");
const cadastrarDialog = document.getElementById("cadastro");
const btnFechar = document.getElementById('btnFechar');
const btnFecharCadastro = document.getElementById("btnFecharCadastro");
const login = document.getElementById('login');
const cadastrobtn = document.getElementById("cadastrobtn");
const formLogin = document.querySelector('#login form');

let dadosUsuario = [
  { nome: "admin", email: "admin@admin.com", senha: "123", cpf: "012.743.657-92", tipo: "admin" },
  { nome: "aluno", email: "aluno@aluno.com", senha: "aluno", cpf: "012.743.657-91", tipo: "cliente" }
];

function limparErros(container) {
  const erros = container.querySelectorAll('.erro, .erro-box');
  erros.forEach(e => e.remove());
}

function exibirErros(container, mensagens) {
  const erroBox = document.createElement('div');
  erroBox.classList.add('erro-box');
  erroBox.innerHTML = mensagens.map(msg => `<p>${msg}</p>`).join('');
  container.insertBefore(erroBox, container.firstChild);
}

loginbtn.addEventListener("click", () => login.showModal());
btnFechar.addEventListener("click", () => login.close());

formLogin.addEventListener('submit', (e) => {
  e.preventDefault();
  limparErros(login);

  const email = document.getElementById('email').value.trim();
  const senha = document.getElementById('senha').value.trim();

  const usuario = dadosUsuario.find(u => u.email === email && u.senha === senha);

  if (usuario) {
    sessionStorage.setItem('usuarioLogado', JSON.stringify(usuario));

    if (usuario.tipo === "admin") {
      window.location.href = "./pages/admin.html";
    } else {
      window.location.href = "./index.html";
    }
  } else {
    exibirErros(login, ["Login ou senha inválido."]);
    e.target.reset();
  }
});

cadastrabtn.addEventListener("click", () => {
  login.close();
  cadastrarDialog.showModal();
});

btnFecharCadastro.addEventListener("click", () => cadastrarDialog.close());

cadastrobtn.addEventListener("submit", (e) => {
  e.preventDefault();
  limparErros(cadastrarDialog);

  const nome = document.getElementById("nome").value.trim();
  const cpf = document.getElementById("cpf").value.trim();
  const emailCadastro = document.getElementById("emailCadastro").value.trim();
  const senhaCadastro = document.getElementById("senhaCadastro").value.trim();
  const confirmaSenha = document.getElementById("confirmaSenha").value.trim();

  const erros = [];

  if (!nome) erros.push("O nome é obrigatório.");
  if (!cpf || cpf.length !== 14) erros.push("CPF inválido.");
  if (!emailCadastro.includes("@")) erros.push("E-mail inválido.");
  if (senhaCadastro.length < 6) erros.push("A senha deve ter pelo menos 6 caracteres.");
  if (senhaCadastro !== confirmaSenha) erros.push("As senhas não coincidem.");

  const emailJaExiste = dadosUsuario.some(u => u.email === emailCadastro);
  if (emailJaExiste) erros.push("E-mail já cadastrado.");

  if (erros.length > 0) {
    exibirErros(cadastrarDialog, erros);
    return;
  }

  dadosUsuario.push({ nome, cpf, email: emailCadastro, senha: senhaCadastro, tipo: "cliente" });

  e.target.reset();
  cadastrarDialog.close();
  login.showModal();
});
