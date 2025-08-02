import { EventBus } from "../../services/eventcustom/bus.js";
import { ModalView } from "../../views/modal/modaView.js";

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
        (value.length >= 3) ? 
        this.view.enableSave()
        :
        this.view.disableSave()
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
    });
  }
}
// export class ModalController {

//   initEvents() {
//

//     this.modalContent.on('click', '#saveList', () => this.saveList());
//     $('#close_modal').on('click', () => this.closeModal());
//     $('.modal__overlay').on('click', () => this.closeModal());
//
//   }
 
//   closeModal() {
//     this.modal.removeClass('modal--active');
//     this.modalContent.empty();
//   }

//   saveList() {
//     const nome = $('#lista').val();
//     if (nome.trim() === '') {
//       alert('Nome inválido');
//       return;
//     }
////     /**chamar crud de lista */
//     this.closeModal();
//   }
// }