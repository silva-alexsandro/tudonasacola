import { ListController } from './controllers/list/listController.js';

$(document).ready(function () {
 const lists = new ListController();
 lists.init();
});
