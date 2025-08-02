export class ListView {
  render(lists) {
    const container = $("#listEmpty");
    container.empty();

    if (lists.length === 0) {
      container.append(`
        <h1>Que pena!</h1>
      <p>
        Você <strong>ainda não</strong> possui nenhuma lista. </p>
      <div class="boxImage">
        <img src="./src/assets/img/Illustration.svg" alt="ilustração de um homem com a mão para cima">
      </div>
        `);
    } else {
      const ul = $("<ul></ul>");
      lists.forEach((list) => {
        ul.append(`<li>${list.name}</li>`);
      });
      container.append(ul);
    }
  }
}
