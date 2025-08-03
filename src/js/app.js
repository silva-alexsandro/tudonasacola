import { ListController } from "./controllers/list/listController.js";
import { ModalController } from "./controllers/modal/modalController.js";
import { ThemeDarkController } from "./controllers/theme/themeDarkController.js"

$(document).ready(function () {
  const themeController = new ThemeDarkController();
  themeController.init();

  const modalController = new ModalController();
  modalController.initEvents();

  const lists = new ListController();
  lists.init();
})