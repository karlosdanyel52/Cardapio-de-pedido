// Cardápio com preços
const cardapio = {
  BA: { P: 16.0, M: 18.0, G: 22.0 },
  FF: { P: 15.0, M: 17.0, G: 21.0 },
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

  // Determina o nome completo do sabor
  const nomeSabor = sabor === "BA" ? "Bife Acebolado" : "Filé de Frango";

  // Calcula o preço
  const preco = cardapio[sabor][tamanho];
  total += preco;

  // Adiciona o pedido ao resumo
  const item = document.createElement("li");
  item.textContent = `${nomeSabor} - Tamanho ${tamanho} - R$ ${preco.toFixed(
    2
  )}`;
  resumo.appendChild(item);

  // Atualiza o total
  totalElement.textContent = `Total: R$ ${total.toFixed(2)}`;
  // Botão de remoção
  const removeBtn = document.createElement("button");
  removeBtn.textContent = "X";
  removeBtn.classList.add("remove-btn");

  // Evento de remoção
  removeBtn.addEventListener("click", () => {
    total -= preco;
    totalElement.textContent = `Total: R$ ${total.toFixed(2)}`;
    resumo.removeChild(item);
  });

  item.appendChild(removeBtn);
  resumo.appendChild(item);

  // Atualiza o total
  totalElement.textContent = `Total: R$ ${total.toFixed(2)}`;
}
