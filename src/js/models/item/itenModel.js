import { ItemRepository } from "../../repositories/itemRepository.js";

export class ItemModel {
  constructor() {
    this.repo = new ItemRepository();
  }

  async getAll(idList) {
    try {
      return await this.repo.getAll(idList);
    } catch {
      return []
    }
  }

  async create(idList, prod) {
    const id = await this.repo.add(idList, prod);
    return id;
  }

  async deleteItem(idList, id) {
    await this.repo.delete(idList, id);
  }
}
