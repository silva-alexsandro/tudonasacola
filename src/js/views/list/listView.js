import { formatShortDate } from "../../utils/formatShortDate.js";
export class ListView {
 render(lists) {
  const container = $("#js-lists");
  container.empty();

  if (lists.length === 0) {
   container.append(`
      <article
        class="bg-secondary border-2 border-current border-dashed mt-16 flex flex-column flex-center p-24"
       >
        <div class="circle circle__border">
         <i class="ph ph-list-magnifying-glass"></i>
        </div>
        <p class="font-size-lg text-center mt-16 font-weight-bold">
         Nenhuma lista ainda
        </p>
        <span class="font-size-sm mt-8 text-center text-color-secondary">
         Crie sua primeira lista de compras para começar a organizar suas
         compras.
        </span>
       </article>
    `);
  } else {
   const ul = $("<ul class='grid fill scroll_ghost pt-16 pb-20'></ul>");
   lists.forEach((list) => {
    const formattedDate = formatShortDate(list.createdDate);
    ul.append(`
        <li class="lista-card">
         <div class="lista-card__header">
          <h2 class="sub-title font-weigth-bold" title="${list.name}">${list.name}</h2>
          <span class="lista-card-favorite" aria-label="Lista favoritada">
           <i class="ph ph-heart"></i>
          </span>
         </div>

         <div class="lista-card__info font-size-sm text-color-secondary">
          <p>
           <i class="ph ph-calendar-blank"></i>
           <time datetime="${formattedDate}"> ${formattedDate}</time>
          </p>
         </div>

         <footer class="lista-card__footer">
          <span
           class="btn btn--primary btn--abrir text-center js-details"
           data-id="${list.id}"
           >Abrir</span
          >
          <div class="lista-card__acoes">
           <button
            title="Favoritar"
            aria-label="Favoritar"
            class="js-favorite"
            data-id="${list.id}"
            type="button"
           >
            <i class="ph ph-heart"></i>
           </button>
           <button
            title="Arquivar"
            aria-label="Arquivar"
            class="js-archived"
            data-id="${list.id}"
            type="button"
           >
            <i class="ph ph-box-arrow-up"></i>
           </button>
           <button
            title="Editar"
            class="js-edit"
            data-id="${list.id}"
            type="button"
            aria-label="Editar lista"
           >
            <i class="ph ph-pencil"></i>
           </button>
           <button
            title="Duplicar"
            class="js-duplicate"
            data-id="${list.id}"
            type="button"
            aria-label="Duplicar"
           >
            <i class="ph ph-copy"></i>
           </button>
           <button
            title="Excluir"
            aria-label="Excluir lista"
            type="button"
            class="js-delete"
            data-id="${list.id}"
           >
            <i class="ph ph-trash"></i>
           </button>
          </div>
         </footer>
        </li>
      `);
   });
   container.append(ul);
  }
 }

 //  bindDropdownEvents() {
 //   $("#js-lists").off("click", ".menu_button");

 //   $("#js-lists").on("click", ".menu_button", function (e) {
 //    e.stopPropagation();
 //    const dropdown = $(this).siblings(".dropdown");

 //    $(".dropdown").not(dropdown).removeClass("active");
 //    dropdown.toggleClass("active");
 //   });

 //   $(document)
 //    .off("click.dropdown")
 //    .on("click.dropdown", function () {
 //     $(".dropdown").removeClass("active");
 //    });
 //  }
 onDeleteClick(callback) {
  $("#js-lists").on("click", ".js-delete", function () {
   const id = $(this).data("id");
   callback(id);
  });
 }
 onDuplicateClick(callback) {
  $("#js-lists").on("click", ".js-duplicate", function () {
   const id = $(this).data("id");
   callback(id);
  });
 }
 onFavoriteClick(callback) {
  $("#js-lists").on("click", ".js-favorite", function () {
   const id = $(this).data("id");
   callback(id);
  });
 }
 onEditClick(callback) {
  $("#js-lists").on("click", ".js-edit", function () {
   const id = $(this).data("id");
   callback(id);
  });
 }
 onArchivedClick(callback) {
  $("#js-lists").on("click", ".js-archived", function () {
   const id = $(this).data("id");
   callback(id);
  });
 }
 onListClick(callback) {
  $(document).on("click", ".js-details", function () {
   const id = $(this).data("id");
   callback(id);
  });
 }
}
