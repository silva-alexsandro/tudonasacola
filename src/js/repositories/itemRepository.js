import { openDB } from "../db/indexdb.js";
import { loadInLocalStorageItem, saveInLocalStorage } from "../db/handleLocalStorage.js";

const STORE_NAME = "items";
const BASE_URL =
  window.location.hostname === "https://apitudonasacola.onrender.com/lists";

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
        headers: { 'owner-id': owner }
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
      headers: { 'owner-id': owner },
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
        headers: { 'owner-id': owner },
      });
      return data;
    } catch (err) {
      console.error(`Erro ao deletar lista ${idItem}:`, err);
      throw err;
    }
  }
}



//   async add(itemModel) {
//   const db = await openDB();
//   return new Promise((resolve, reject) => {
//     const tx = db.transaction(STORE_NAME, 'readwrite');
//     const store = tx.objectStore(STORE_NAME);
//     const request = store.add(itemModel);
//     request.onsuccess = () => resolve(request.result);
//     request.onerror = () => reject(request.error);
//   });
// }
