
import { ListController } from "./controllers/list/listController.js";
import { DashboardController } from "./controllers/dashborad/dashboardController.js";
import { ModalController } from "./controllers/modal/modalController.js";
import { ThemeDarkController } from "./controllers/theme/themeDarkController.js";

$(document).ready(function () {
  const modalController = new ModalController();
  const themeController = new ThemeDarkController();
  const lists = new ListController();
  // const dash = new DashboardController();

  modalController.initEvents();
  themeController.init();
  lists.init();
  // dash.init();
});
