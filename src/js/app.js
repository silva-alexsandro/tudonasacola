
import { ListController } from "./controllers/list/listController.js";
import { DashboardController } from "./controllers/dashborad/dashboardController.js";
import { ModalController } from "./controllers/modal/modalController.js";
import { ThemeDarkController } from "./controllers/theme/themeDarkController.js";

$(window).on('load', function () {
  $('#loading').fadeOut(400, function () {
    $('#content').fadeIn(400);
  });
});

$(document).ready(function () {
  const modalController = new ModalController();
  const themeController = new ThemeDarkController();
  const lists = new ListController();
  const dash = new DashboardController();

  modalController.initEvents();
  lists.init();
  themeController.init();
  dash.init();
});
