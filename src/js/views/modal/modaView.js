export class ModalView {
  constructor() {
    this.modalContent = $('.modal__content__body');
  }
  openModal(callback) {
    $('#createList').on('click', callback);
  }
  /**nao escuta o evento */
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
  createContentInModal() {
    this.modalContent.html(this.getCreateListContent())
  }
  show() {
    $(".modal").addClass("modal--active");
  }

  hide() {
    $(".modal").removeClass("modal--active");
    this.disableSave();
  }

  enableSave() {
    $("#saveList").prop("disabled", false);
    $('#error-message').addClass('hidden')
    $('#lista').removeClass('error')


  }

  disableSave() {
    $("#saveList").prop("disabled", true);
    $('#error-message').removeClass('hidden')
    $('#lista').addClass('error')

  }

  getInputValue() {
    return $("#lista").val();
  }

  getCreateListContent() {
    return `
        <h2>Crie sua Lista</h2>
        <label for="lista">Nome da sua lista:</label>
        <input type="text" id="lista" name="lista"  placeholder="Digite aqui...">
         <small id="error-message" class="error hidden">Mínimo de três letras</small>
        <button id="saveList" class="btn btn-modal">Salvar</button>
    `;


  }

  //   getEditListContent(nomeAtual) {
  //     return `
  //       <h2>Edite sua Lista</h2>
  //       <input type="text" id="listName" value="${nomeAtual}" />
  //       <button id="saveList">Salvar</button>
  //     `;
  //   }

  //   getAddItemContent() {
  //     return `
  //       <h2>Adicionar Item</h2>
  //       <input type="text" id="itemName" placeholder="Nome do item" />
  //       <button id="saveItem">Adicionar</button>
  //     `;
  //   }

}