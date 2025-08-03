import { ListRepository } from "../../repositories/listRepository.js";
import { ListSchema } from "../../schemas/list.js";

export class ListModel {
  constructor() {
    this.repo = new ListRepository();
  }

  async getAll() {
    return await this.repo.getAll();
  }

  async getById(id) {
    return await this.repo.getById(id);
  }

  async createList(nome) {
    const listData = new ListSchema(nome);
    console.log('dentro de model list, valor de list data: ', listData)
    const errors = listData.validate();
    if (errors.length > 0) throw new Error(errors.join('\n'));

    // const duplicated = await this.repo.existsByName(listData.name);
    // if (duplicated) throw new Error('Já existe uma lista com este nome.');

    const id = await this.repo.add(listData);
    return id;
  }

  async updateList(listaData) {
    const model = new ListSchema(listaData.name, listaData.createdDate, listaData.id);
    const errors = model.validate();
    if (errors.length > 0) throw new Error(errors.join('\n'));
    await this.repo.update(model);
  }
  async deleteList(id) {
    await this.repo.delete(id);
  }
}
