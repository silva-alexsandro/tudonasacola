import { openDB } from '../db/indexdb.js';
import {
 loadInLocalStorageItem,
 saveInLocalStorage,
} from '../db/handleLocalStorage.js';
import { getOwner } from '../utils/getOwner.js';

const STORE_NAME = 'list';
const BASE_URL = 'https://apitudonasacola.onrender.com';
const loading = $('#loading');
export class ListRepository {
 async getAll() {
  try {
   loading.fadeIn();
   const owner = getOwner()?.trim();
   const data = await $.ajax({
    url: `${BASE_URL}/${STORE_NAME}`,
    method: 'GET',
    headers: { Authorization: `Bearer ${owner}` },
   });
   return data;
  } catch (err) {
   console.log('retorno de get da api: erro - ', err);
   throw err;
  }
 }

 async getById(id) {
  try {
   loading.fadeIn();
   const owner = getOwner()?.trim();
   const data = await $.ajax({
    url: `${BASE_URL}/${STORE_NAME}/${id}`,
    method: 'GET',
    headers: { Authorization: `Bearer ${owner.trim()}` },
   });
   return data;
  } catch (err) {
   throw err;
  } finally {
   loading.fadeOut();
  }
 }

 async add(listModel) {
  loading.fadeIn();
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

   console.log('valor de data: ', data)

   if (data?.owner) {
    saveInLocalStorage('owner-id', data.owner);
   }

   return data;
  } catch (error) {
   console.log('[ERRO] Falha ao criar lista:', error);
   throw error;
  } finally {
   loading.fadeOut();
  }
 }

 async update(id, listModel) {
  try {
   loading.fadeIn();
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
   loading.fadeOut();
  }
 }

 async delete(id) {
  try {
   loading.fadeIn();
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
   loading.fadeOut();
  }
 }
}
