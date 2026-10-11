const campo = document.getElementById("campoTarefa");
const botao = document.getElementById("botaoAdicionar");
const lista = document.getElementById("listaTarefas");

function adicionarTarefa() {
  const texto = campo.value;

  if (texto === "") {
    return;
  }

  const item = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = texto;

  const botaoCorrigir = document.createElement("button");
  botaoCorrigir.textContent = "Corrigir";

  botaoCorrigir.addEventListener("click", function () {
    const novoTexto = prompt("Corrija a tarefa:", span.textContent);

    if (novoTexto !== null && novoTexto !== "") {
      span.textContent = novoTexto;
    }
  });

  const botaoRemover = document.createElement("button");
  botaoRemover.textContent = "Remover";

  botaoRemover.addEventListener("click", function () {
    item.remove();
  });

  item.appendChild(span);
  item.appendChild(botaoCorrigir);
  item.appendChild(botaoRemover);
  lista.appendChild(item);

  campo.value = "";
}

botao.addEventListener("click", adicionarTarefa);

campo.addEventListener("keydown", function (evento) {
  if (evento.key === "Enter") {
    adicionarTarefa();
  }
});