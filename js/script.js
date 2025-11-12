// Função para salvar os dados do cadastro
function enviarCadastro(event) {
  event.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const cpf = document.getElementById("cpf").value.trim();
  const telefone = document.getElementById("telefone").value.trim();
  const nascimento = document.getElementById("nascimento").value.trim();
  const endereco = document.getElementById("endereco").value.trim();
  const cep = document.getElementById("cep").value.trim();
  const cidade = document.getElementById("cidade").value.trim();
  const estado = document.getElementById("estado").value.trim();
  const interesse = document.getElementById("interesse").value.trim();

  if (!nome || !email || !cpf || !telefone || !nascimento || !endereco || !cep || !cidade || !estado || !interesse) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  const usuario = {
    nome,
    email,
    cpf,
    telefone,
    nascimento,
    endereco,
    cep,
    cidade,
    estado,
    interesse
  };

  localStorage.setItem("usuarioCadastrado", "true");
  localStorage.setItem("dadosUsuario", JSON.stringify(usuario));

  alert(`Obrigado, ${nome}! Seu cadastro foi realizado com sucesso.`);
  window.location.href = "perfil.html";
}

// Função para carregar os dados no perfil
function carregarPerfil() {
  const dados = localStorage.getItem("dadosUsuario");

  const perfilCard = document.getElementById("perfilCard");
  const mensagemCard = document.getElementById("mensagemCard");

  if (!dados) {
    if (mensagemCard) mensagemCard.style.display = "block";
    if (perfilCard) perfilCard.style.display = "none";
    return;
  }

  const usuario = JSON.parse(dados);

  if (perfilCard) perfilCard.style.display = "block";
  if (mensagemCard) mensagemCard.style.display = "none";

  document.getElementById("perfilNome").textContent = usuario.nome;
  document.getElementById("perfilEmail").textContent = usuario.email;
  document.getElementById("perfilCPF").textContent = usuario.cpf;
  document.getElementById("perfilTelefone").textContent = usuario.telefone;
  document.getElementById("perfilNascimento").textContent = usuario.nascimento;
  document.getElementById("perfilEndereco").textContent = usuario.endereco;
  document.getElementById("perfilCEP").textContent = usuario.cep;
  document.getElementById("perfilCidade").textContent = usuario.cidade;
  document.getElementById("perfilEstado").textContent = usuario.estado;
  document.getElementById("perfilInteresse").textContent = usuario.interesse;
}

// Função para sair do perfil
function sairPerfil() {
  localStorage.removeItem("usuarioCadastrado");
  localStorage.removeItem("dadosUsuario");
  alert("Você saiu do perfil.");
  window.location.href = "index.html";
}

// Tudo que precisa carregar após o DOM estar pronto
document.addEventListener("DOMContentLoaded", () => {
  // Máscara CPF
  const cpf = document.getElementById("cpf");
  if (cpf) {
    cpf.addEventListener("input", () => {
      cpf.value = cpf.value
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    });
  }

  // Máscara telefone
  const telefone = document.getElementById("telefone");
  if (telefone) {
    telefone.addEventListener("input", () => {
      telefone.value = telefone.value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d{1,4})$/, "$1-$2");
    });
  }

  // Máscara CEP
  const cep = document.getElementById("cep");
  if (cep) {
    cep.addEventListener("input", () => {
      cep.value = cep.value
        .replace(/\D/g, "")
        .replace(/(\d{5})(\d{1,3})$/, "$1-$2");
    });
  }

  // Menu responsivo
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });

    hamburger.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        navLinks.classList.toggle("active");
      }
    });
  }

  // Botão de alto contraste
  const btnContraste = document.getElementById("btnContraste");
  if (btnContraste) {
    btnContraste.addEventListener("click", () => {
      document.body.classList.toggle("high-contrast");
    });
  }

  // Carregar perfil se estiver na página de perfil
  if (document.getElementById("perfilCard") || document.getElementById("mensagemCard")) {
    carregarPerfil();
  }
});
