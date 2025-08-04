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
    const errors = listData.validate();
    if (errors.length > 0) throw new Error(errors.join('\n'));

    // const duplicated = await this.repo.existsByName(listData.name);
    // if (duplicated) throw new Error('Já existe uma lista com este nome.');

    const id = await this.repo.add(listData);
    return id;
  }

  async updateList(id, name) {
    if (typeof name !== "string" || name.trim().length < 3) {
      throw new Error("Nome inválido passado para updateList.");
    }
    // Aqui buscamos a lista atual para preservar os dados existentes
    const listaData = await this.repo.getById(id);
    if (!listaData) {
      throw new Error("Lista não encontrada.");
    }
    // Criamos um novo modelo com os dados antigos + nome novo
    const model = new ListSchema(name.trim(), listaData.createdDate, id);
    // Validamos o modelo completo
    const errors = model.validate();
    if (errors.length > 0) {
      throw new Error(errors.join('\n'));
    }
    // Atualizamos no repositório
    await this.repo.update(model);
  }
  async deleteList(id) {
    await this.repo.delete(id);
  }
}
