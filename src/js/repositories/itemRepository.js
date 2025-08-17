import { openDB } from "../db/indexdb.js";
import { loadInLocalStorageItem } from "../db/handleLocalStorage.js";
import { getOwner } from "../utils/getOwner.js";

const STORE_NAME = "items";
const BASE_URL = "https://apitudonasacola.onrender.com/lists";

export class ItemRepository {
  getOwner() {
    const owner = loadInLocalStorageItem("owner-id");
    if (!owner) {
      return null;
    }
    return owner;
  }

  async getAll(idList) {
    try {
      $('#loading').fadeIn();
      const owner = getOwner()?.trim();
      const data = await $.ajax({
        url: `${BASE_URL}/${idList}/${STORE_NAME}`,
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

  async add(idList, itemData) {
    try {
      $('#loading').fadeIn();
      const owner = getOwner()?.trim();
      const data = await $.ajax({
        url: `${BASE_URL}/${idList}/${STORE_NAME}`,
        method: "POST",
        headers: { 'Authorization': `Bearer ${owner.trim()}` },
        contentType: "application/json",
        data: JSON.stringify(itemData)
      });
      return data;
    } catch (err) {
      console.error("Erro ao criar lista:", err);
      throw err;
    } finally {
      $('#loading').fadeOut();
    }
  }

  async delete(idList, idItem) {
    try {
      $('#loading').fadeIn();
      const owner = getOwner()?.trim();
      const data = await $.ajax({
        url: `${BASE_URL}/${idList}/${STORE_NAME}/${idItem}`,
        method: "DELETE",
        headers: { 'Authorization': `Bearer ${owner.trim()}` },
      });
      return data;
    } catch (err) {
      console.error(`Erro ao deletar lista ${idItem}:`, err);
      throw err;
    } finally {
      $('#loading').fadeOut();
    }
  }
}
