import { ItemView } from "../../views/dashborad/itemView.js";
import { EventBus } from "../../events/eventBus.js";
import { ItemModel } from "../../models/item/itenModel.js";
import { getParamURL } from "../../utils/getParamURL.js";

export class ItemController {
  idList = getParamURL('id');
  constructor() {
    this.itemView = null;
    this.itemModel = null;
  }

  init() {
    this.itemModel = new ItemModel();
    this.itemView = new ItemView();
    this.refreshView();

    EventBus.on("itemCreated", async (e, newItem) => {
      await this.itemModel.create(this.idList, newItem);
      await this.refreshView();
    });

    EventBus.on("", (e, newItem) => {
      this.itemModel.create(newItem);
      this.refreshView();
    });

    this.itemView.onDeleteClick(async (id) => {
      await this.itemModel.deleteItem(this.idList, id);
      this.refreshView();
    });

  }

  async refreshView() {
    try {
      const items = await this.itemModel.getAll(this.idList);
      EventBus.trigger("stattotal", items.length);
      this.itemView.render(items);
    } catch (error) {
      console.error("Erro ao carregar listas:", error);
    }
  }
}
