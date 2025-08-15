import { ItemRepository } from "../../repositories/itemRepository.js";

export class ItemModel {
  constructor() {
    this.repo = new ItemRepository();
  }

  async getAll() {
    return await this.repo.getAll();
  }

  async create(prod) {
    const id = await this.repo.add(prod);
    return id;
  }

}
