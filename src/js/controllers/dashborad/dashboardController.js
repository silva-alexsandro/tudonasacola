import { EventBus } from "../../events/eventBus.js";
import { ListModel } from "../../models/list/listModel.js";
import { DashboardView } from "../../views/dashborad/dashboardView.js";
import { ItemController } from "./itemController.js";

export class DashboardController {
  constructor() {
    this.item = new ItemController();
    this.detail = new DashboardView();
  }

  async init() {
    const nameList = await this.getNameList();
    this.item.init();
    this.detail.renderNameList(nameList?.name);
    this.detail.renderTotalItem(0);
    this.detail.renderItemDone(0);
    this.detail.renderItemValue(0);
    EventBus.on("stattotal", (e, totalItem) => {
      this.detail.renderTotalItem(totalItem);
    });

    EventBus.on("itemsMarkedUpdated", (e, data) => {
      this.detail.renderItemDone(data.totalMarked);
      this.detail.renderItemValue(data.totalPrice);
    });
  }

  async getNameList() {
    this.list = new ListModel();
    const id = this.getParametro('id');
    return await this.list.getById(Number(id));
  }

  getParametro(nome) {
    const params = new URLSearchParams(window.location.search);
    return params.get(nome);
  }
}
