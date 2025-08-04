export class ModalView {
  constructor() {
    this.modalContent = $('.modal__content__body');
    this.mode = "create";
    this.editingId = null;
  }
  openModal(callback) {
    $('#createList').on('click', callback);
  }
  onInputChange(callback) {
    $("#lista").on("input", function () {
      callback($(this).val());
    });
  }
  onSaveClick(callback) {
    $("#saveList").on("click", callback);
  }
  onCloseClick(callback) {
    $("#close_modal").on("click", callback);
  }

  show() {
    $(".modal").addClass("modal--active");
  }

  hide() {
    $(".modal").removeClass("modal--active");
    this.disableSave();
    this.clear(); // limpa estado após fechar
  }
  
  createContentInModal() {
    this.modalContent.html(this.getCreateListContent())
  }

  enableSave() {
    $("#saveList").prop("disabled", false);
    $('#error-message').addClass('hidden');
    $('#lista').removeClass('error');
  }
  disableSave() {
    $("#saveList").prop("disabled", true);
    $('#error-message').removeClass('hidden');
    $('#lista').addClass('error');

  }
  getInputValue() {
    return $("#lista").val();
  }
  setInputValue(value) {
    $("#lista").val(value);
  }
  setMode(mode) {
    this.mode = mode;
  }

  getMode() {
    return this.mode;
  }
  setEditingId(id) {
    this.editingId = id;
  }

  getEditingId() {
    return this.editingId;
  }

  clear() {
    this.setMode("create");
    this.setEditingId(null);
    $("#lista").val("");
  }
  createContentInModal(nomeAtual = "") {
    const isEditing = !!nomeAtual;
    this.modalContent.html(`
      <h2>${isEditing ? "Edite sua Lista" : "Crie sua Lista"}</h2>
      <label for="lista">Nome da sua lista:</label>
      <input type="text" id="lista" name="lista" placeholder="Digite aqui..." value="${nomeAtual}">
      <small id="error-message" class="error hidden">Mínimo de três letras</small>
      <button id="saveList" class="btn btn-modal" disabled>Salvar</button>
    `);
  }
}