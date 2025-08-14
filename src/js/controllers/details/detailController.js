import { ListModel } from "../../models/list/listModel.js";
import { DetailView } from "../../views/details/detailView.js";
import { ItemController } from "../item/itemController.js";

export class DetailController {
  constructor() {
    // this.item = new ItemController();
    this.detail = new DetailView()
  }

  async init() {
    const nameList = await this.getNameList();
    this.detail.renderNameList(nameList.name)
  }

  async getNameList() {
    this.list = new ListModel();
    const id = this.getParametro('id');
    console.log(id);
    return await this.list.getById(Number(id));
  }

  getParametro(nome) {
    const params = new URLSearchParams(window.location.search);
    return params.get(nome);
  }
}
