import { ListController } from "./controllers/list/listController.js";
import { ModalController } from "./controllers/modal/modalController.js";
import { ThemeDarkController } from "./controllers/theme/themeDarkController.js"
import { ListService } from "./models/list/listModel.js";
import { ListView } from "./views/list/listView.js";


$(document).ready(function () {
  const themeController = new ThemeDarkController();
  const modalController = new ModalController();
  themeController.init();
  modalController.initEvents();

  /**list */
  const listService = new ListService();
  const listView = new ListView();
  new ListController(listView, listService);
})