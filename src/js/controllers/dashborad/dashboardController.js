import { EventBus } from "../../events/eventBus.js";
import { ListModel } from "../../models/list/listModel.js";
import { DashboardView } from "../../views/dashborad/dashboardView.js";
import { ItemController } from "./itemController.js";

export class DashboardController {
  constructor() {
    this.item = new ItemController();
    this.detail = new DashboardView()
  }

  async init() {
    const nameList = await this.getNameList();
    this.item.init()
    this.detail.renderNameList(nameList?.name)

    EventBus.on("stattotal", (e, totalItem) => {
      this.detail.renderTotalItem(totalItem);
    });
    this.detail.renderItemDone()
    this.detail.renderItemValue()
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
