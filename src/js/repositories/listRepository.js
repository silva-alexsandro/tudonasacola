import { openDB } from "../db/indexdb.js";
import { loadInLocalStorageItem, saveInLocalStorage } from "../db/handleLocalStorage.js";

const STORE_NAME = "lists";
const BASE_URL = "https://apitudonasacola.onrender.com";


export class ListRepository {
  getOwner() {
    const owner = loadInLocalStorageItem("owner-id");
    if (!owner) {
      return null;
    }
    return owner;
  }

  async getAll() {
    try {
      const owner = this.getOwner()?.trim();
      const data = await $.ajax({
        url: `${BASE_URL}/${STORE_NAME}`,
        method: "GET",
        headers: { 'Authorization': `Bearer ${owner.trim()}` },
      });
      return data;
    } catch (err) {
      throw err;
    }
  }

  async getById(id) {
    try {
      const owner = this.getOwner()?.trim();
      const data = await $.ajax({
        url: `${BASE_URL}/${STORE_NAME}/${id}`,
        method: "GET",
        headers: { 'Authorization': `Bearer ${owner.trim()}` },
      });
      return data;
    } catch (err) {
      throw err;
    }
  }

  async add(listModel) {
    try {
      const owner = this.getOwner()?.trim();
      let data;
      if (owner) {
        data = await $.ajax({
          url: `${BASE_URL}/${STORE_NAME}`,
          method: "POST",

          headers: { 'Authorization': `Bearer ${owner.trim()}` },
          contentType: "application/json",
          data: JSON.stringify(listModel)
        });
      }
      else {
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
    }
  }

  async update(id, listModel) {
    try {
      const owner = this.getOwner()?.trim();
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
    }
  }

  async delete(id) {
    try {
      const owner = this.getOwner()?.trim();
      const data = await $.ajax({
        url: `${BASE_URL}/${STORE_NAME}/${id}`,
        method: "DELETE",
        headers: { 'Authorization': `Bearer ${owner.trim()}` },
      });
      return data;
    } catch (err) {
      console.error(`Erro ao deletar lista ${id}:`, err);
      throw err;
    }
  }
}
