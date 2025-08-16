export class ModalView {
  constructor() {
    this.modalContent = $('.modal__content__body');
    this.mode = "create";
    this.editingId = null;
  }
  openModal(callback) {
    $('#createList').on('click', callback);
  }

  openModalCreateItem(callback) {
    $('#createItem').on('click', callback);
  }
  openModalShare(callback) {
    $('#toShare').on('click', callback);
  }

  onInputChange(callback) {
    $("#lista, #itemNome").on("input", function () {
      callback($(this).val());
    });
  }
  onSaveClick(callback) {
    $("#saveList, #saveItem").on("click", callback);
  }
  onCloseClick(callback) {
    $("#close_modal").on("click", callback);
  }

  show() { $(".modal").addClass("modal--active"); }

  hide() {
    $(".modal").removeClass("modal--active");
    this.disableSave();
    this.clear();
  }

  enableSave() {
    $("#saveList, #saveItem").prop("disabled", false);
    $('#error-message').addClass('hidden');
    $('#lista').removeClass('error');
  }
  disableSave() {
    $("#saveList, #saveItem").prop("disabled", true);
    $('#error-message').removeClass('hidden');
    $('#lista').addClass('error');
  }

  getInputValue() { return $("#lista").val() || $("#itemNome").val(); }
  setInputValue(value) { $("#lista, #itemNome").val(value); }

  setMode(mode) { this.mode = mode; }

  getMode() { return this.mode; }
  setEditingId(id) { this.editingId = id; }
  getEditingId() { return this.editingId; }

  clear() {
    this.setMode("create");
    this.setEditingId(null);
    this.setInputValue("");
  }

  createContentInModal(nomeAtual = "") {
    const isEditing = !!nomeAtual;
    this.modalContent.html(`
      <h2>${isEditing ? "Edite sua Lista" : "Crie sua Lista"}</h2>
      <label for="lista">Nome da sua lista:</label>
      <input type="text" id="lista" name="lista" placeholder="Digite aqui..." value="${nomeAtual}">
      <small id="error-message" class="error hidden">Mínimo de três letras</small>
      <div class='modal_footer'><button id="saveList" class="btn btn_primary" disabled>Salvar</button></div>
    `);
  }

  createItemContent({ name = "", price = "", amount = "" } = {}) {
    const isEditing = !!name;

    this.modalContent.html(`
    <h2>${isEditing ? "Edite o Item" : "Crie um Item"}</h2>

    <div class="form-group">
      <label for="itemNome">Nome do item:</label>
      <input type="text" id="itemNome" value="${name}">
      <small id="error-message" class="error hidden">Mínimo de três letras</small>
    </div>

    <div class="form-row">
      <div class="form-group">
        <label for="itemPrice">Valor:</label>
        <input type="number" id="itemPrice" value="${price}" step="0.01" min="0">
      </div>

      <div class="form-group">
        <label for="amount">Quantidade:</label>
        <input type="number" id="amount" name="amount" value="${amount}" min="1">
      </div>
    </div>

    <div class='modal_footer'>
      <button id="saveItem" class="btn btn_primary" disabled>Salvar</button>
    </div>
  `);
  }
  getItemFormValues() {
    return {
      name: $("#itemNome").val().trim(),
      price: parseFloat($("#itemPrice").val()) || 0,
      amount: parseInt($("#amount").val()) || 1
    };
  }

  createShareContent(data) {
    this.modalContent.html(`
      <h2>Compartilhar</h2>
      <p>
      Você poderá compartlhar em breve
      </p>
    `);
  }
}