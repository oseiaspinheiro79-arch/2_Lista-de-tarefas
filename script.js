const campo = document.getElementById("campoTarefa");
const botao = document.getElementById("botaoAdicionar");
const lista = document.getElementById("listaTarefas");
const total = document.getElementById("total");

function atualizarTotal() {
  total.textContent = "Total: " + lista.children.length;
}

function salvar() {
  const textos = [];
  const spans = lista.querySelectorAll("li span");

  spans.forEach(function (span) {
    textos.push(span.textContent);
  });

  localStorage.setItem("tarefas", JSON.stringify(textos));
  atualizarTotal();
}

function criarItem(texto) {
  const item = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = texto;

  const botaoCorrigir = document.createElement("button");
  botaoCorrigir.textContent = "Corrigir";

  botaoCorrigir.addEventListener("click", function () {
    const novoTexto = prompt("Corrija a tarefa:", span.textContent);

    if (novoTexto !== null && novoTexto !== "") {
      span.textContent = novoTexto;
      salvar();
    }
  });

  const botaoRemover = document.createElement("button");
  botaoRemover.textContent = "Remover";

  botaoRemover.addEventListener("click", function () {
    item.remove();
    salvar();
  });

  item.appendChild(span);
  item.appendChild(botaoCorrigir);
  item.appendChild(botaoRemover);
  lista.appendChild(item);
}

function adicionarTarefa() {
  const texto = campo.value;

  if (texto === "") {
    return;
  }

  criarItem(texto);
  salvar();
  campo.value = "";
}

botao.addEventListener("click", adicionarTarefa);

campo.addEventListener("keydown", function (evento) {
  if (evento.key === "Enter") {
    adicionarTarefa();
  }
});

const tarefasSalvas = JSON.parse(localStorage.getItem("tarefas")) || [];

tarefasSalvas.forEach(function (texto) {
  criarItem(texto);
});
const botaoLimpar = document.getElementById("botaoLimpar");

botaoLimpar.addEventListener("click", function () {
  lista.innerHTML = "";
  salvar();
});
