import { EventBus } from "../../events/eventBus.js";
import { ListModel } from "../../models/list/listModel.js";
import { DashboardView } from "../../views/dashborad/dashboardView.js";
import { ItemController } from "./itemController.js";
import { getParamURL } from '../../utils/getParamURL.js'

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
      console.log('era para modificar: ', data.totalPrice)
      this.detail.renderItemValue(data.totalPrice);
    });
  }

  async getNameList() {
    this.list = new ListModel();
    const id = getParamURL('id');
    return await this.list.getById(Number(id));
  }
}
