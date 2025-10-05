import { saveInLocalStorage } from '../db/handleLocalStorage.js';
import { getOwner } from '../utils/getOwner.js';

const STORE_NAME = 'list';
const BASE_URL = 'https://apitudonasacola.onrender.com';

export class ListRepository {
 async getAll() {
  const url = `${BASE_URL}/${STORE_NAME}`;
  const owner = getOwner()?.trim();
  const headers = { Authorization: `Bearer ${owner}` };
  try {
   const data = await $.ajax({
    url,
    method: 'GET',
    headers,
    contentType: 'application/json',
   });
   return data;
  } catch (e) {
   throw e;
  }
 }

 async getAllArchived() {
  const url = `${BASE_URL}/${STORE_NAME}/archived`;
  const owner = getOwner()?.trim();
  const headers = { Authorization: `Bearer ${owner}` };
  try {
   const data = await $.ajax({
    url,
    method: 'GET',
    headers,
    contentType: 'application/json',
   });
   return data;
  } catch (e) {
   throw e;
  }
 }

 async getById(id) {
  const url = `${BASE_URL}/${STORE_NAME}/${id}`;
  const owner = getOwner()?.trim();
  const headers = { Authorization: `Bearer ${owner}` };
  try {
   const owner = getOwner()?.trim();
   const data = await $.ajax({
    url,
    method: 'GET',
    headers,
    contentType: 'application/json',
   });
   return data;
  } catch (err) {
   console.log('getbyid no bancon com erro: ', err);
   throw err;
  } finally {
  }
 }

 async add(listModel) {
  const owner = getOwner()?.trim();
  const url = `${BASE_URL}/${STORE_NAME}`;

  const headers = owner ? { Authorization: `Bearer ${owner}` } : null;

  if (owner) {
   console.log('[INFO] Enviando com owner:', owner);
  } else {
   console.warn('[INFO] Enviando sem owner (não encontrado).');
  }

  try {
   const data = await $.ajax({
    url,
    method: 'POST',
    headers,
    contentType: 'application/json',
    data: JSON.stringify(listModel),
   });

   console.log('valor de data: ', data);

   if (data?.ownerId) {
    saveInLocalStorage('owner-id', data.ownerId);
   }

   return data;
  } catch (error) {
   console.log('[ERRO] Falha ao criar lista:', error);
   throw error;
  } finally {
  }
 }

 async update(id, listModel) {
  try {
   const owner = getOwner()?.trim();
   const data = await $.ajax({
    url: `${BASE_URL}/${STORE_NAME}/${id}`,
    method: 'PUT',
    contentType: 'application/json',
    headers: { Authorization: `Bearer ${owner.trim()}` },
    data: JSON.stringify(listModel),
   });
   return data;
  } catch (err) {
   console.error(`Erro ao atualizar lista ${id}:`, err);
   throw err;
  } finally {
  }
 }

 async delete(id) {
  try {
   const owner = getOwner()?.trim();
   const data = await $.ajax({
    url: `${BASE_URL}/${STORE_NAME}/${id}`,
    method: 'DELETE',
    headers: { Authorization: `Bearer ${owner.trim()}` },
   });
   return data;
  } catch (err) {
   console.error(`Erro ao deletar lista ${id}:`, err);
   throw err;
  } finally {
  }
 }
}
