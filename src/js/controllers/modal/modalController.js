import { EventBus } from "../../events/eventBus.js";
import { ModalView } from "../../views/modal/modalView.js";

export class ModalController {
  constructor() {
    this.view = null;
  }

  initEvents() {
    this.view = new ModalView();
    // === BOTÃO DE CRIAR LISTA ===
    this.view.openModal((value) => {
      this.view.createContentInModal(); // conteúdo de criação
      this.view.show();

      this.handleCommonEvents("create"); // NOVO: comportamento genérico
    });

    EventBus.on("openEditModal", (e, listData) => {
      this.view.createContentInModal(listData.name); // usa nome atual
      this.view.show();
      this.view.setInputValue(listData.name);        // preenche o input
      this.view.setEditingId(listData.id);           // salva o ID
      this.handleCommonEvents("edit");               // comportamento genérico
    });

    // === BOTÃO FECHAR MODAL ===
    this.view.onCloseClick(() => {
      this.view.hide();
    });

    $(document).on('keydown', (e) => {
      if (e.key === 'Escape') {
        this.view.hide();
      }

      if (e.key === 'Enter') {
        const $input = $('#lista');
        if ($input.is(':focus')) {
          e.preventDefault();
          const nome = $input.val().trim();
          if (typeof nome === "string" && nome.trim().length >= 3) {
            const mode = this.view.getMode();
            const id = this.view.getEditingId();

            if (mode === "edit") {
              EventBus.trigger("listEditConfirmed", { id, updatedName: nome });
            } else {
              EventBus.trigger("listCreated", nome);
            }

            this.view.hide();
          }
        }
      }
    });
  }

  handleCommonEvents(mode) {
    this.view.onInputChange((value) => {
      (value.length >= 3) ? this.view.enableSave() : this.view.disableSave();
    });

    this.view.onSaveClick(() => {
      const nome = this.view.getInputValue().trim();
      const id = this.view.getEditingId();

      if (typeof nome === "string" && nome.trim().length >= 3) {
        if (mode === "edit") {
          EventBus.trigger("listEditConfirmed", { id, updatedName: nome }); // EDITAR
        } else {
          EventBus.trigger("listCreated", nome); // CRIAR
        }
        this.view.hide();
      }
    });

    this.view.setMode(mode); // controla se está criando ou editando
  }
}