export class ListService {
  constructor() {
    this.lists = [];
  }

  saveList(name) {
    if (name.length >= 3) {
      this.lists.push({ id: Date.now(), name });
    } else {
      throw new Error("Nome inválido");
    }
  }

  getAllLists() {
    return this.lists;
  }
}
