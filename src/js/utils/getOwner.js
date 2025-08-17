import { loadInLocalStorageItem } from "../db/handleLocalStorage.js";

export function getOwner() {
  const owner = loadInLocalStorageItem("owner-id");
  if (!owner) {
    return null;
  }
  return owner;
}