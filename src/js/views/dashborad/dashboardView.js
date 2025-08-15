export class DashboardView {
  constructor() {
    this.totalItem = $('#totalItem');
    this.comprados = $('#itemDone');
    this.preco = $('#preco');
    this.navbarTitle = $('#navbar__left h2');
  }

  renderNameList(name) {
    this.navbarTitle.html(name); // Evita append acumulado
  }

  renderTotalItem(items = 0) {
    if (this.totalItem.length) {
      this.totalItem.html(`
        <footer class="stat__footer">
          <strong>${items}</strong>
          <div class="circle">
            <i class="ph ph-shopping-bag-open"></i>
          </div>
        </footer>
      `);
    }
  }

  renderItemDone(items = 0) {
    if (this.comprados.length) {
      this.comprados.html(`
        <footer class="stat__footer">
          <strong>${items}</strong>
          <div class="circle">
            <i class="ph ph-check"></i>
          </div>
        </footer>
      `);
    }
  }

  renderItemValue(total = 0) {
    if (this.preco.length) {
      this.preco.html(`
        <footer class="stat__footer">
          <strong>R$: ${Number(total).toFixed(2)}</strong>
          <div class="circle">
            <i class="ph ph-receipt"></i>
          </div>
        </footer>
      `);
    }
  }
}
