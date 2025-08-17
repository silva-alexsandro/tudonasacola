import { openDB } from "../db/indexdb.js";
import { loadInLocalStorageItem, saveInLocalStorage } from "../db/handleLocalStorage.js";

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
      const owner = this.getOwner();
      const data = await $.ajax({
        url: `${BASE_URL}/${idList}/${STORE_NAME}`,
        method: "GET",
        headers: { 'Authorization': `Bearer ${owner.trim()}` },
      });
      return data;
    } catch (err) {
      throw err;
    }
  }

  async add(idList, itemData) {
    const owner = this.getOwner();
    const data = await $.ajax({
      url: `${BASE_URL}/${idList}/${STORE_NAME}`,
      method: "POST",
      headers: { 'Authorization': `Bearer ${owner.trim()}` },
      contentType: "application/json",
      data: JSON.stringify(itemData)
    });
    return data;
  } catch(err) {
    console.error("Erro ao criar lista:", err);
    throw err;
  }
  async delete(idList, idItem) {
    try {
      const owner = this.getOwner();
      const data = await $.ajax({
        url: `${BASE_URL}/${idList}/${STORE_NAME}/${idItem}`,
        method: "DELETE",
        headers: { 'Authorization': `Bearer ${owner.trim()}` },
      });
      return data;
    } catch (err) {
      console.error(`Erro ao deletar lista ${idItem}:`, err);
      throw err;
    }
  }
}
