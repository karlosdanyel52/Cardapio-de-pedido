function formatarCelular(input) {
  let valor = input.value.replace(/\D/g, ""); // Remove caracteres não numéricos
  valor = valor.replace(/^(\d{2})(\d)/, "($1) $2"); // Adiciona parênteses ao DDD
  valor = valor.replace(/(\d{5})(\d{4})$/, "$1-$2"); // Adiciona o hífen ao número
  input.value = valor;
} // Atualiza o valor formatado

// Seleciona os botões de rádio e a div de entrega
let radios = document.querySelectorAll('input[type="radio"]');
let entregaDiv = document.getElementById("entrega");

// Adiciona um evento para cada rádio
radios.forEach((radio) => {
  radio.addEventListener("change", () => {
    // Se o botão "Entrega" estiver marcado, mostra a div
    if (document.getElementById("option2").checked) {
      entregaDiv.classList.remove("hidden"); // Mostra
    } else {
      entregaDiv.classList.add("hidden"); // Esconde
    }
  });
});

function enviarParaWhatsApp() {
  // Recupera a lista de pedidos do localStorage
  let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

  if (pedidos.length === 0) {
    alert(
      "Nenhum pedido foi encontrado. Volte e selecione pelo menos uma marmita!"
    );
    return;
  }

  // Recupera os dados do formulário
  const nome = document.getElementById("nome").value;
  const celular = document.getElementById("celular").value;
  const tipoPagamento =
    document
      .querySelector('input[name="example"]:checked')
      ?.nextSibling.textContent.trim() || "Não informado";
  const tipoRecebimento =
    document
      .querySelector('input[name="example1"]:checked')
      ?.nextSibling.textContent.trim() || "Não informado";

  // Variáveis para endereço caso seja entrega
  let endereco = "";
  if (document.getElementById("option2").checked) {
    const cidade = document.getElementById("cidade").value;
    const bairro = document.getElementById("bairro").value;
    const rua = document.getElementById("rua").value;
    const numero = document.getElementById("numero").value;
    endereco = `\n📍 *Endereço de Entrega:*\nCidade: ${cidade}\nBairro: ${bairro}\nRua: ${rua}, Nº ${numero}`;
  }

  // Monta a lista de pedidos formatada
  let resumoPedidos = pedidos
    .map(
      (p, index) =>
        `🍽️ Pedido ${index + 1}: ${p.sabor} - Tamanho ${p.tamanho} - R$ ${
          p.preco
        }`
    )
    .join("\n");

  // Calcula o total
  let total = pedidos
    .reduce((acc, p) => acc + parseFloat(p.preco), 0)
    .toFixed(2);

  // Número do WhatsApp (inclua o código do país, ex: 55 para Brasil)
  const numeroWhatsApp = "5599981966063";

  if (tipoRecebimento === "Entrega") {
    // Monta a mensagem final
    let mensagem =
      `📌 *-------Resumo do Pedido:-------*\n${resumoPedidos}\n\n💰 *Total:* R$ ${total}` +
      `\n\n👤 *--------Dados do Cliente:--------*\n📝 *Nome:* ${nome}\n📞 *Celular:* ${celular}` +
      `\n💳 *Tipo de Pagamento:* ${tipoPagamento}\n🚚 *Tipo de Recebimento:* ${tipoRecebimento}${endereco}` +
      "\n\n📌 *Seu pedido foi finalizado com sucesso! A entrega está em andamento e será realizada em até 2 horas. Agradecemos sua preferência!*";

    // Criar link do WhatsApp e redirecionar
    const linkWhatsApp = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(
      mensagem
    )}`;
    window.location.href = linkWhatsApp;
  } else {
    // Monta a mensagem final
    let mensagem =
      `📌 *---------Resumo do Pedido:--------*\n${resumoPedidos}\n\n💰 *Total:* R$ ${total}` +
      `\n\n👤 *----------Dados do Cliente:----------*\n📝 *Nome:* ${nome}\n📞 *Celular:* ${celular}` +
      `\n💳 *Tipo de Pagamento:* ${tipoPagamento}\n🚚 *Tipo de Recebimento:* ${tipoRecebimento}${endereco}` +
      '\n\n📌 *"Seu pedido foi finalizado com sucesso! Ele estará pronto para retirada em até 1 hora. Aguardamos você!"*';

    // Criar link do WhatsApp e redirecionar
    const linkWhatsApp = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(
      mensagem
    )}`;
    window.location.href = linkWhatsApp;
  }
}
