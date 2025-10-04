import { ListRepository } from '../../repositories/listRepository.js';
import { ListSchema } from '../../schemas/list.js';

export class ListModel {
 constructor() {
  this.repo = new ListRepository();
 }

 async getAll() {
  try {
   return await this.repo.getAll();
  } catch {
   return [];
  } finally {
   $('#loading').fadeOut();
  }
 }

 async getById(id) {
  return await this.repo.getById(id);
 }

 async createList(nome) {
  console.log('vou criar uma lista');
  const listData = new ListSchema(nome);
  const errors = listData.validate();
  console.log('erros? ', errors)
  if (errors.length > 0) throw new Error(errors.join('\n'));
  
  console.log('lista dados model ', listData)
  return await this.repo.add(listData);
 }

 async updateList(id, name) {
  if (typeof name !== 'string' || name.trim().length < 3) {
   throw new Error('Nome inválido passado para updateList.');
  }
  const listaData = await this.repo.getById(id);
  if (!listaData) {
   throw new Error('Lista não encontrada.');
  }
  const model = new ListSchema(name.trim(), listaData.createdDate, id);
  const errors = model.validate();
  if (errors.length > 0) {
   throw new Error(errors.join('\n'));
  }
  await this.repo.update(id, model);
 }

 async deleteList(id) {
  await this.repo.delete(id);
 }
}
