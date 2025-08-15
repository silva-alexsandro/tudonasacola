import { ItemView } from "../../views/dashborad/itemView.js";
import { EventBus } from "../../events/eventBus.js";
import { ItemModel } from "../../models/item/itenModel.js";

export class ItemController {
  constructor() {
    this.itemView = null;
    this.itemModel = null;
  }

  init() {
    this.itemModel = new ItemModel();
    this.itemView = new ItemView();
    this.refreshView();

    EventBus.on("itemCreated", (e, newItem) => {
      console.log("Item criado:", newItem);
      this.itemModel.create(newItem);
      this.refreshView();
    });
  }
  async refreshView() {
    try {
      const items = await this.itemModel.getAll();
      EventBus.trigger("stattotal", items.length);
      this.itemView.render(items);
    } catch (error) {
      console.error("Erro ao carregar listas:", error);
    }
  }
}
