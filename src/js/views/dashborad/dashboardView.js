export class DashboardView {
  constructor() {
    this.totalItem = $('#totalItem');
    this.comprados = $('#itemDone');
    this.preco = $('#preco');
    this.navbarTitle = $('#navbar__left h2');
  }

  renderNameList(name) {
    this.navbarTitle.html(name);
  }

  renderTotalItem(count = 0) {
    this.totalItem.html(`
       <header class="stat__header">
            <span>Total de Itens</span>
          </header>
      <footer class="stat__footer">
        <strong>${count}</strong>
        <div class="circle">
          <i class="ph ph-shopping-bag-open"></i>
        </div>
      </footer>
    `);
  }

  renderItemDone(totalMarked = 0) {
    this.comprados.html(`
       <header class="stat__header">
            <span>Itens Comprados</span>
          </header>
      <footer class="stat__footer">
        <strong>${totalMarked}</strong>
        <div class="circle">
          <i class="ph ph-check"></i>
        </div>
      </footer>
    `);
  }

  renderItemValue(total = 0) {
    this.preco.html(`
      <header class="stat__header">
            <span>Valor Total</span>
          </header>
      <footer class="stat__footer">
        <strong>R$: ${Number(total).toFixed(2)}</strong>
        <div class="circle">
          <i class="ph ph-receipt"></i>
        </div>
      </footer>
    `);
  }
}
