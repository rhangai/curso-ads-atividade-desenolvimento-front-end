/* Utilitário para escapar HTML */
const escapeEl = document.createElement("textarea");
function escapeHTML(html) {
  escapeEl.textContent = html;
  return escapeEl.innerHTML;
}

/* Liga a classe SPA no HTML para mudar alguns estilos */
document.documentElement.classList.add("spa");

const menuVoluntarios = document.getElementById("menuVoluntarios");
const formVoluntarios = document.getElementById("formVoluntarios");
const tabelaVoluntarios = document.getElementById("tabelaVoluntarios");

const voluntarios = [];

function abrirFormVoluntario() {
  formVoluntarios.style.display = "block";
  tabelaVoluntarios.style.display = "none";
  menuVoluntarios.style.display = "none";
}

function fecharFormVoluntario() {
  formVoluntarios.style.display = "";
  tabelaVoluntarios.style.display = "";
  menuVoluntarios.style.display = "";
}

function cancelarFormVoluntario() {
  fecharFormVoluntario();
  formVoluntarios.reset();
}

function cadastrarVoluntario(event) {
  event.preventDefault();
  event.stopPropagation();
  fecharFormVoluntario();
  voluntarios.push({
    nome: formVoluntarios.nome.value,
    email: formVoluntarios.email.value,
    telefone: formVoluntarios.telefone.value,
    idade: formVoluntarios.idade.value,
    disponibilidade: formVoluntarios.disponibilidade.value,
    areaInteresse: formVoluntarios["area-interesse"].value,
    experiencia: formVoluntarios.experiencia.value,
    motivacao: formVoluntarios.motivacao.value,
  });
  salvarVoluntarios();
  refreshVoluntarios();
  formVoluntarios.reset();
}

function refreshVoluntarios() {
  const html = [];
  for (const voluntario of voluntarios) {
    const nome = escapeHTML(voluntario.nome);
    const idade = escapeHTML(voluntario.idade);
    const email = escapeHTML(voluntario.email);
    const telefone = escapeHTML(voluntario.telefone);
    const areaInteresse = interesseMap(voluntario.areaInteresse);
    const disponibilidade = disponibilidadeMap(voluntario.disponibilidade);
    const motivacao = escapeHTML(voluntario.motivacao);
    html.push(`
      <div class="voluntario-card">
        <div class="voluntario-card-header">
          <div class="voluntario-card-dados">
            <div>
              <span class="voluntario-card-dado-nome">${nome}</span>
              <span class="voluntario-card-dado-idade">${idade} anos</span>
            </div>
            <div class="voluntario-card-dado-email">
              ${email}
            </div>
            <div class="voluntario-card-dado-telefone">
              ${telefone}
            </div>
          </div>
          <div class="voluntario-card-interesses">
            <div class="voluntario-card-dado-interesse">${areaInteresse}</div>
            <div class="voluntario-card-dado-disponibilidade">${disponibilidade}</div>
          </div>
        </div>
        <div class="voluntario-card-motivo">
          ${motivacao}
        </div>
      </div>
    `);
  }

  if (html.length <= 0) {
    tabelaVoluntarios.innerHTML = `<div class="voluntario-empty">Nenhum voluntário cadastrado</div>`;
  } else {
    tabelaVoluntarios.innerHTML = html.join("");
  }
}

function disponibilidadeMap(value) {
  switch (value) {
    case "fins-de-semana":
      return "Fins de semana";
    case "dias-uteis":
      return "Dias úteis";
    case "flexivel":
      return "Horário flexível";
    case "pontual":
      return "Ações pontuais";
  }
  return value;
}
function interesseMap(value) {
  switch (value) {
    case "distribuicao-alimentos":
      return "Distribuição de Alimentos";
    case "educacao":
      return "Educação e Capacitação";
    case "saude":
      return "Apoio à Saúde";
    case "administrativo":
      return "Apoio Administrativo";
    case "qualquer":
      return "Qualquer área";
  }
  return value;
}

function limparVoluntariosAction() {
  if (confirm("Deseja limpar os voluntários?")) {
    limparVoluntarios();
  }
}

function limparVoluntarios() {
  voluntarios.length = 0;
  salvarVoluntarios();
  refreshVoluntarios();
}

function carregarVoluntarios() {
  try {
    const result = JSON.parse(localStorage.getItem("voluntarios"));
    voluntarios.length = 0;
    voluntarios.push(...result);
  } catch (err) {}

  console.log(voluntarios);
  refreshVoluntarios();
}

function salvarVoluntarios() {
  localStorage.setItem("voluntarios", JSON.stringify(voluntarios));
}

carregarVoluntarios();
