import { EventBus } from "../../events/eventBus.js";
import { ListModel } from "../../models/list/listModel.js";
import { ListView } from '../../views/list/listView.js';

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

    this.listView.onDeleteClick(async (id) => {
      await this.listModel.deleteList(id);
      this.refreshView();
    });

    this.listView.onEditClick(async (id) => {
      const novoNome = prompt("Digite o novo nome da lista:");
      if (novoNome) {
        await this.listModel.updateList(id, novoNome);
        this.refreshView();
      }
    });
  }

  async refreshView() {
    try {
      const listas = await this.listModel.getAll();
      listas.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
      this.listView.render(listas);
      this.listView.bindDropdownEvents();
    } catch (error) {
      console.error("Erro ao carregar listas:", error);
    }
  }
}

// export class ListController {
//   constructor() {
//     this.listView = null;
//     this.listModel = null;
//   }

//   init() {
//     this.listView = new ListView();
//     this.listModel = new ListModel();
//     this.refreshView(this.listModel);


//     EventBus.on("listCreated", (e, name) => {
//       this.listModel.createList(name);
//       this.refreshView(this.listModel);
//     });

//     this.listView.onDeleteClick(() => {
//       console.log("estou deletando a lista completa");
//       // this.listModel.deleteList(id);
//       // this.refreshView();
//     })
//   }

//   async refreshView(model) {
//     try {
//       console.log('dentro de refresh view tentando no try ')
//       const listas = await model.getAll();
//       console.log('valor de listas: ', listas);
//       this.listView.render(listas);
//     } catch (error) {
//       console.error("Erro ao carregar listas:", error);
//     }
//   }
// }
