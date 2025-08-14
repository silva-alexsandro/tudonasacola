import { ItemView } from "../../views/item/itemView.js";

export class ItemController {
  constructor() {

  }

  init() {
    this.item = new ItemView();

    this.item.render();
   }

}