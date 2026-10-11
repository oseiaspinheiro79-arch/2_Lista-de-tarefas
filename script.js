const campo = document.getElementById("campoTarefa");
const botao = document.getElementById("botaoAdicionar");
const lista = document.getElementById("listaTarefas");
const total = document.getElementById("total");

function atualizarTotal() {
  const quantidade = lista.children.length;
  const feitas = lista.querySelectorAll(".feita").length;

  total.textContent = "Total: " + quantidade + " (" + feitas + " feitas)";
}

function salvar() {
  const tarefas = [];
  const spans = lista.querySelectorAll("li span");

  spans.forEach(function (span) {
    tarefas.push({
      texto: span.textContent,
      feita: span.classList.contains("feita")
    });
  });

  localStorage.setItem("tarefas", JSON.stringify(tarefas));
  atualizarTotal();
}

function criarItem(texto, feita) {
  const item = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = texto;

  if (feita) {
    span.classList.add("feita");
  }

  span.addEventListener("click", function () {
    span.classList.toggle("feita");
    salvar();
  });

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

  criarItem(texto, false);
  salvar();
  campo.value = "";
}

botao.addEventListener("click", adicionarTarefa);

campo.addEventListener("keydown", function (evento) {
  if (evento.key === "Enter") {
    adicionarTarefa();
  }
});

const botaoLimpar = document.getElementById("botaoLimpar");

botaoLimpar.addEventListener("click", function () {
  lista.innerHTML = "";
  salvar();
});

const tarefasSalvas = JSON.parse(localStorage.getItem("tarefas")) || [];

tarefasSalvas.forEach(function (tarefa) {
  if (typeof tarefa === "string") {
    criarItem(tarefa, false);
  } else {
    criarItem(tarefa.texto, tarefa.feita);
  }
});

atualizarTotal();
