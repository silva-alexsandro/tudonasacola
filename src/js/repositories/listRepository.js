import { openDB } from "../db/indexdb.js";
import { loadInLocalStorageItem, saveInLocalStorage } from "../db/handleLocalStorage.js";
import { getOwner } from "../utils/getOwner.js";

const STORE_NAME = "lists";
const BASE_URL = "https://apitudonasacola.onrender.com";


export class ListRepository {

  async getAll() {
    try {
      $('#loading').fadeIn();
      const owner = getOwner()?.trim();
      const data = await $.ajax({
        url: `${BASE_URL}/${STORE_NAME}`,
        method: "GET",
        headers: { 'Authorization': `Bearer ${owner.trim()}` },
      });
      return data;
    } catch (err) {
      throw err;
    } finally {
      $('#loading').fadeOut();
    }
  }

  async getById(id) {
    try {
      $('#loading').fadeIn();
      const owner = getOwner()?.trim();
      const data = await $.ajax({
        url: `${BASE_URL}/${STORE_NAME}/${id}`,
        method: "GET",
        headers: { 'Authorization': `Bearer ${owner.trim()}` },
      });
      return data;
    } catch (err) {
      throw err;
    } finally {
      $('#loading').fadeOut();
    }
  }

  async add(listModel) {
    try {
      $('#loading').fadeIn();
      const owner = getOwner()?.trim();
      let data;
      if (owner) {
        console.log('no if passando o owner', owner)
        data = await $.ajax({
          url: `${BASE_URL}/${STORE_NAME}`,
          method: "POST",
          headers: { 'Authorization': `Bearer ${owner.trim()}` },
          contentType: "application/json",
          data: JSON.stringify(listModel)
        });
      }
      else {
        console.log('no else n passa o owner', owner)

        data = await $.ajax({
          url: `${BASE_URL}/${STORE_NAME}`,
          method: "POST",
          contentType: "application/json",
          data: JSON.stringify(listModel)
        });
      }
      if (data.owner) {
        saveInLocalStorage("owner-id", data.owner);
      }
      return data;
    } catch (err) {
      console.error("Erro ao criar lista:", err);
      throw err;
    } finally {
      $('#loading').fadeOut();
    }
  }

  async update(id, listModel) {
    try {
      $('#loading').fadeIn();
      const owner = getOwner()?.trim();
      const data = await $.ajax({
        url: `${BASE_URL}/${STORE_NAME}/${id}`,
        method: "PUT",
        contentType: "application/json",
        headers: { 'Authorization': `Bearer ${owner.trim()}` },
        data: JSON.stringify(listModel)
      });
      return data;
    } catch (err) {
      console.error(`Erro ao atualizar lista ${id}:`, err);
      throw err;
    } finally {
      $('#loading').fadeOut();
    }
  }

  async delete(id) {
    try {
      $('#loading').fadeIn();
      const owner = getOwner()?.trim();
      const data = await $.ajax({
        url: `${BASE_URL}/${STORE_NAME}/${id}`,
        method: "DELETE",
        headers: { 'Authorization': `Bearer ${owner.trim()}` },
      });
      return data;
    } catch (err) {
      console.error(`Erro ao deletar lista ${id}:`, err);
      throw err;
    } finally {
      $('#loading').fadeOut();
    }
  }
}
