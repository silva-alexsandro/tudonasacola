import { EventBus } from "../../events/eventBus.js";

export class ItemView {
  constructor() {
    this.containerCards = $('#wrapperItem');
    this.markedItems = new Set();
  }

  render(items = []) {
    this.containerCards.empty();

    if (items.length === 0) {
      this.containerCards.html("<p>Nenhum item encontrado.</p>");
      return;
    }

    items.forEach((item) => {
      const total = (item.price * item.quantity).toFixed(2);
      const priceFormatted = parseFloat(item.price).toFixed(2);
      const isChecked = this.markedItems.has(item.id);

      const cardClass = isChecked ? "card shadow done" : "card shadow";
      const iconClass = isChecked ? "ph ph-checks" : "ph ph-shopping-bag-open";
      const nameStyle = isChecked ? "text-decoration: line-through;" : "";

      const html = `
        <article class="${cardClass}" 
                 data-id="${item.id}" 
                 data-price="${item.price}" 
                 data-quantity="${item.quantity}">
                 
          <header class="card__header">
            <h3 style="${nameStyle}">${item.name}</h3>
            <div class="circle mark-item" style="cursor:pointer">
              <i class="${iconClass}"></i>
            </div>
          </header>

          <section class="meta">
            <dl>
              <dt>Preço unitário:</dt>
              <dd>R$ ${priceFormatted}</dd>
              <dt>Quantidade:</dt>
              <dd>${item.quantity}x</dd>
            </dl>
          </section>

          <hr />
          <p class="total">
            <span>Total:</span>
            <span class="value">R$ ${total}</span>
          </p>

          <footer class="card-footer">
            <button class="btn_icon_only toEdit" data-id="${item.id}">
              <i class="ph ph-pencil-simple-line"></i>
            </button>
            <button class="btn_icon_only toDelete" data-id="${item.id}">
              <i class="ph ph-trash"></i>
            </button>
          </footer>
        </article>
      `;

      this.containerCards.append(html);
    });

    this.bindMarkItemEvents();
  }

  bindMarkItemEvents() {
    this.containerCards.off("click", ".mark-item").on("click", ".mark-item", (e) => {
      const card = $(e.currentTarget).closest("article");
      const id = card.data("id");
      const price = parseFloat(card.data("price"));
      const quantity = parseInt(card.data("quantity"));

      const isMarked = card.hasClass("done");

      if (isMarked) {
        card.removeClass("done");
        card.find("i").removeClass("ph-checks").addClass("ph-shopping-bag-open");
        card.find("h3").css("text-decoration", "none");
        this.markedItems.delete(id);
      } else {
        card.addClass("done");
        card.find("i").removeClass("ph-shopping-bag-open").addClass("ph-checks");
        card.find("h3").css("text-decoration", "line-through");
        this.markedItems.add(id);
      }

      this.emitItemStats();
    });
  }

  emitItemStats() {
    let totalMarked = 0;
    let totalPrice = 0;

    this.markedItems.forEach((id) => {
      const card = this.containerCards.find(`article[data-id="${id}"]`);
      if (card.length) {
        const price = parseFloat(card.data("price"));
        const quantity = parseInt(card.data("quantity"));
        totalMarked += 1;
        totalPrice += price * quantity;
      }
    });

    EventBus.trigger("itemsMarkedUpdated", { totalMarked, totalPrice });
  }

  onDeleteClick(callback) {
    this.containerCards.on("click", ".toDelete", function () {
      const id = $(this).data("id");
      callback(id);
    });
  }

  onEditClick(callback) {
    this.containerCards.on("click", ".toEdit", function () {
      const id = $(this).data("id");
      callback(id);
    });
  }
}
