import { EventBus } from "../../events/eventBus.js";
import { ListModel } from "../../models/list/listModel.js";
import { ListView } from "../../views/list/listView.js";

export class ListController {
 constructor() {
  this.listView = null;
  this.listModel = null;
 }

 init() {
  this.listView = new ListView();
  this.listModel = new ListModel();
  this.refreshView();

  EventBus.on("listCreated", async (e, name) => {
   await this.listModel.createList(name);
   this.refreshView();
  });

  EventBus.on("listEditConfirmed", async (e, { id, updatedName }) => {
   await this.listModel.updateList(id, updatedName);
   this.refreshView();
  });

  this.listView.onEditClick(async (id) => {
   console.log("editar");

   const listData = await this.listModel.getById(id);
   EventBus.trigger("openEditModal", listData);
  });

  this.listView.onDeleteClick(async (id) => {
   console.log("delete");
   await this.listModel.deleteList(id);
   this.refreshView();
  });

  this.listView.onDuplicateClick(async (id) => {
   console.log("duplicate");
   await this.listModel.deleteList(id);
   this.refreshView();
  });

  this.listView.onFavoriteClick(async () => {
   console.log("favoritado");
  });
  this.listView.onArchivedClick(async () => {
   console.log("onArchivedClick");
  });
  this.listView.onListClick((id) => {
   window.location.href = `./list-detail.html?id=${id}`;
  });
 }

 async refreshView() {
  try {
   const listas = await this.listModel.getAll();
   // listas.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
   this.listView.render(listas);
   this.listView.bindDropdownEvents();
  } catch (error) {
   console.error("Erro ao carregar listas:", error);
  }
 }
}
