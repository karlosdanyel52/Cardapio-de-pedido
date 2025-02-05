// Cardápio com preços
const cardapio = {
  BA: { P: 16.0, M: 18.0, G: 22.0 },
  FF: { P: 15.0, M: 17.0, G: 21.0 },
};

// Limpa os pedidos antigos quando a página é carregada
window.onload = function () {
  localStorage.removeItem("pedidos");
};

// Elementos DOM
const resumo = document.getElementById("resumo");
const totalElement = document.getElementById("total");

// Total acumulado
let total = 0;

// Função para adicionar pedido
function adicionarPedido() {
  const sabor = document.getElementById("sabor").value;
  const tamanho = document.getElementById("tamanho").value;
  const nomeSabor = sabor === "BA" ? "Bife Acebolado" : "Filé de Frango";
  const preco = cardapio[sabor][tamanho];

  // Recupera pedidos já armazenados ou cria uma nova lista
  let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

  // Adiciona o novo pedido à lista
  pedidos.push({ sabor: nomeSabor, tamanho, preco: preco.toFixed(2) });

  // Salva a lista atualizada no localStorage
  localStorage.setItem("pedidos", JSON.stringify(pedidos));

  // Atualiza a interface
  const item = document.createElement("li");
  item.textContent = `${nomeSabor} - Tamanho ${tamanho} - R$ ${preco.toFixed(
    2
  )}`;
  resumo.appendChild(item);

  // Atualiza o total
  total += preco;
  totalElement.textContent = `Total: R$ ${total.toFixed(2)}`;

  // Exibe botão de continuar
  document.getElementById("finalizar-btn").classList.remove("hidden");

  // Botão para remover item
  const removeBtn = document.createElement("button");
  removeBtn.textContent = "X";
  removeBtn.classList.add("remove-btn");
  removeBtn.addEventListener("click", () => {
    // Remove item da lista e atualiza localStorage
    pedidos = pedidos.filter(
      (p) =>
        !(
          p.sabor === nomeSabor &&
          p.tamanho === tamanho &&
          p.preco === preco.toFixed(2)
        )
    );
    localStorage.setItem("pedidos", JSON.stringify(pedidos));

    // Atualiza total e remove da interface
    total -= preco;
    totalElement.textContent = `Total: R$ ${total.toFixed(2)}`;
    resumo.removeChild(item);
  });

  item.appendChild(removeBtn);
  resumo.appendChild(item);
}

// Alerta de continuar

const finalizarBtn = document.getElementById("finalizar-btn");

finalizarBtn.addEventListener("click", () => {
  if (resumo.children.length === 0) {
    alert("Por favor, selecione pelo menos um item antes de Continuar!");
  } else {
    window.location.href = "segundoindex.html";
  }
});

