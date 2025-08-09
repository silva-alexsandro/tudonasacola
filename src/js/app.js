import { ListController } from "./controllers/list/listController.js";
import { ModalController } from "./controllers/modal/modalController.js";
import { ThemeDarkController } from "./controllers/theme/themeDarkController.js";

$(window).on('load', function () {
  $('#loading').fadeOut(400, function () {
    $('#content').fadeIn(400);
  });
});

$(document).ready(function () {
  const themeController = new ThemeDarkController();
  themeController.init();

  const modalController = new ModalController();
  modalController.initEvents();

  const lists = new ListController();
  lists.init();
});
