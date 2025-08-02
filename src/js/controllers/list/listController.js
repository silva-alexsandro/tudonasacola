import { EventBus } from "../../services/eventcustom/bus.js";

export class ListController {
  constructor(listView, listService) {
    this.listView = listView;
    this.listService = listService;

    EventBus.on("listCreated", (e, name) => {
      this.listService.saveList(name);
      this.refreshView();
    });

    this.refreshView();
  }

  refreshView() {
    const lists = this.listService.getAllLists();
    this.listView.render(lists);
  }
}
