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

      this.view.onInputChange((value) => {
        (value.length >= 3) ? this.view.enableSave() : this.view.disableSave()
      });

      this.view.onSaveClick(() => {
        const name = this.view.getInputValue();
        EventBus.trigger("listCreated", name);
        this.view.hide();
      });

    });

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
          if (nome.length >= 3) {
            EventBus.trigger("listCreated", nome);
            this.view.hide();
          }
        }
      }
    });


  }
}