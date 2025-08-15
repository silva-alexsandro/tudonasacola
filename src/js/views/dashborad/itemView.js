export class ItemView {
  constructor() {
    this.containerCards = $('#wrapperItem');
  }

  /**
   * Renderiza todos os itens na tela
   * @param {Array} items - Lista de objetos com: id, name, price, quantity
   */
  render(items = []) {
    this.containerCards.html(""); // Limpa antes de renderizar

    if (items.length === 0) {
      this.containerCards.html("<p>Nenhum item encontrado.</p>");
      return;
    }

    items.forEach((item) => {
      const total = (parseFloat(item.price) * parseFloat(item.quantity)).toFixed(2);
      const priceFormatted = parseFloat(item.price).toFixed(2);

      const itemHTML = `
        <article class="card shadow">
          <header class="card__header">
            <h3>${item.name}</h3>
            <div class="circle"><i class="ph ph-shopping-bag-open"></i></div>
          </header>

          <section class="meta" aria-label="Informações do produto">
            <dl>
              <dt>Preço unitário:</dt>
              <dd>R$ ${priceFormatted}</dd>
              <dt>Quantidade:</dt>
              <dd>${item.quantity}x</dd>
            </dl>
          </section>

          <hr />
          <p class="total" aria-label="Total">
            <span>Total:</span>
            <span class="value">R$ ${total}</span>
          </p>

          <footer class="card-footer">
            <button class="btn_icon_only toEdit" data-id="${item.id}" type="button" aria-label="Editar produto">
              <i class="ph ph-pencil-simple-line"></i>
            </button>
            <button class="btn_icon_only toDelete" data-id="${item.id}" type="button" aria-label="Remover produto">
              <i class="ph ph-trash"></i>
            </button>
          </footer>
        </article>
      `;

      this.containerCards.append(itemHTML);
    });
  }

  /**
   * Eventos de abrir/fechar dropdown
   */
  bindDropdownEvents() {
    $("#wrapper_lists").off("click", ".menu_button");

    $("#wrapper_lists").on("click", ".menu_button", function (e) {
      e.stopPropagation();
      const dropdown = $(this).siblings(".dropdown");

      $(".dropdown").not(dropdown).removeClass("active");
      dropdown.toggleClass("active");
    });

    $(document).off("click.dropdown").on("click.dropdown", function () {
      $(".dropdown").removeClass("active");
    });
  }

  /**
   * Define callback para clique em botão de deletar
   */
  onDeleteClick(callback) {
    this.containerCards.on("click", ".toDelete", function () {
      const id = $(this).data("id");
      callback(id);
    });
  }

  /**
   * Define callback para clique em botão de editar
   */
  onEditClick(callback) {
    this.containerCards.on("click", ".toEdit", function () {
      const id = $(this).data("id");
      callback(id);
    });
  }
}
