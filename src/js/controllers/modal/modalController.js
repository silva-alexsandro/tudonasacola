import { EventBus } from "../../events/eventBus.js";
import { ModalView } from "../../views/modal/modalView.js";

export class ModalController {
  constructor() {
    this.view = null;
  }

  initEvents() {
    this.view = new ModalView();

    this.view.openModal((value) => {
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

    EventBus.on("openEditModal", (e, listData) => {
      this.view.createContentInModal(listData.name);
      this.view.show();
      this.view.setInputValue(listData.name);
      this.view.setEditingId(listData.id);
      this.handleCommonEvents("edit");
    });
    EventBus.on("openEditModalItem", (e, itemData) => {
      this.view.createItemContent(itemData.name);
      this.view.show();
      this.view.setEditingId(itemData.id);
      this.handleCommonEvents("editItem");
    });

    this.view.onCloseClick(() => this.view.hide());

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
        switch (mode) {
          case "create":
            EventBus.trigger("listCreated", nome);
            break;
          case "edit":
            EventBus.trigger("listEditConfirmed", { id, updatedName: nome });
            break;
          case "createItem":
            EventBus.trigger("itemCreated", nome);
            break;
          case "editItem":
            EventBus.trigger("itemEditConfirmed", { id, updatedName: nome });
            break;
        }
        this.view.hide();
      }
    });

    this.view.setMode(mode);
  }
}