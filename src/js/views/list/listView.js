import { formatShortDate } from '../../utils/formatShortDate.js'
export class ListView {
  render(lists) {
    const container = $("#wrapper_lists");
    container.empty();

    if (lists.length === 0) {
      container.append(`
      <div class='empty'>
        <h1>Que pena!</h1>
        <p>Você <strong>ainda não</strong> possui nenhuma lista.</p>
        <div class="boxImage">
          <img src="./src/assets/img/Illustration.svg" alt="ilustração de um homem com a mão para cima">
        </div>
      </div>
    `);
    } else {
      const ul = $("<ul class='scroll_ghost list_view'></ul>");
      lists.forEach((list) => {
        const formattedDate = formatShortDate(new Date(list.createdDate));
        ul.append(`
        <li class='list_view_item'>
          <div data-id="${list.id}" class="toDetails info">
            <span class="date">${formattedDate}</span>
            <span class="separator">|</span>
            <span class="name" title="${list.name}">${list.name}</span>
          </div>
          <button class="menu_button">⋯</button>
          <div class="dropdown">
          <!--  
          <button class="toShare" data-id="${list.id}">
              <i class="ph ph-upload-simple"></i>
              Compartilhar
            </button>--> 
            <button class="toEdit" data-id="${list.id}">
              <i class="ph ph-pencil-simple-line"></i>
              Renomear
            </button>
            
            <button class="toDelete" data-id="${list.id}">
              <i class="ph ph-trash"></i>
              Excluir
            </button>
          </div>
        </li>
      `);
      });
      container.append(ul);
    }
  }

  bindDropdownEvents() {
    // Remover listeners antigos antes de adicionar de novo (opcional)
    $("#wrapper_lists").off("click", ".menu_button");

    $("#wrapper_lists").on("click", ".menu_button", function (e) {
      e.stopPropagation();
      const dropdown = $(this).siblings(".dropdown");

      $(".dropdown").not(dropdown).removeClass("active");
      dropdown.toggleClass("active");
    });

    // Clicar fora fecha todos
    $(document).off("click.dropdown").on("click.dropdown", function () {
      $(".dropdown").removeClass("active");
    });
  }
  onDeleteClick(callback) {
    $("#wrapper_lists").on("click", ".toDelete", function () {
      const id = $(this).data("id");
      callback(id);
    });
  }
  onEditClick(callback) {
    $("#wrapper_lists").on("click", ".toEdit", function () {
      const id = $(this).data("id");
      callback(id);
    });
  }
  onListClick(callback) {
    // Delegação para pegar clique no item da lista (classe .lista-item, por exemplo)
    $(document).on('click', '.toDetails', function () {
      const id = $(this).data('id');
      callback(id);
    });
  }
}
