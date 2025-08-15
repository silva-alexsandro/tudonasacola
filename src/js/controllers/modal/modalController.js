import { EventBus } from "../../events/eventBus.js";
import { ModalView } from "../../views/modal/modalView.js";

export class ModalController {
  constructor() {
    this.view = null;
  }

  initEvents() {
    this.view = new ModalView();

    this.view.openModal(() => {
      this.view.createContentInModal();
      this.view.show();
      this.handleCommonEvents("create");
    });

    this.view.openModalCreateItem(() => {
      this.view.createItemContent();
      this.view.show();
      this.handleCommonEvents("createItem");
    });

    this.view.openModalShare(() => {
      const shareData = '';
      this.view.createShareContent(shareData);
      this.view.show();
    });

    // Editar lista existente
    EventBus.on("openEditModal", (e, listData) => {
      this.view.createContentInModal(listData.name);
      this.view.show();
      this.view.setInputValue(listData.name);
      this.view.setEditingId(listData.id);
      this.handleCommonEvents("edit");
    });

    // Editar item existente
    EventBus.on("openEditModalItem", (e, itemData) => {
      this.view.createItemContent(itemData); // Corrigido: passar objeto completo
      this.view.show();
      this.view.setEditingId(itemData.id);
      this.handleCommonEvents("editItem");
    });

    // Fechar modal
    this.view.onCloseClick(() => this.view.hide());

    // Fechar modal com ESC e salvar com ENTER
    $(document).on('keydown', (e) => {
      if (e.key === 'Escape') {
        this.view.hide();
      }

      if (e.key === 'Enter') {
        const $input = $('#lista');
        if ($input.is(':focus')) {
          e.preventDefault();
          const nome = $input.val().trim();
          if (nome.length >= 3) {
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
    this.view.setMode(mode);
    this.view.onInputChange((value) => {
      if (value.length >= 3) {
        this.view.enableSave();
      } else {
        this.view.disableSave();
      }
    });

    this.view.onSaveClick(() => {
      const currentMode = this.view.getMode();
      const id = this.view.getEditingId();

      if (currentMode === "createItem" || currentMode === "editItem") {
        this.handleItemSave(currentMode, id);
        return;
      }

      this.handleListSave(currentMode, id);
    });
  }

  handleItemSave(mode, id) {
    const itemData = this.view.getItemFormValues();
    const isValid = itemData.name && itemData.name.length >= 3;
    if (!isValid) {
      this.view.disableSave();
      return;
    }

    if (mode === "createItem") {
      EventBus.trigger("itemCreated", itemData);
    }

    if (mode === "editItem") {
      itemData.id = id;
      EventBus.trigger("itemEditConfirmed", itemData);
    }

    this.view.hide();
  }

  handleListSave(mode, id) {
    const name = this.view.getInputValue().trim();

    const isValid = name.length >= 3;
    if (!isValid) {
      this.view.disableSave();
      return;
    }

    if (mode === "create") {
      EventBus.trigger("listCreated", name);
    }

    if (mode === "edit") {
      EventBus.trigger("listEditConfirmed", { id, updatedName: name });
    }

    this.view.hide();
  }
}
