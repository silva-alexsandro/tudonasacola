$(document).ready(function () {
  // Adicionar nova tarefa
  $('#add-btn').click(function () {
    const task = $('#todo-input').val().trim();
    if (task) {
      $('#todo-list').append(`
        <li>
          <span>${task}</span>
          <button class="remove-btn">×</button>
        </li>
      `);
      $('#todo-input').val('');
    }
  });

  // Adicionar com Enter
  $('#todo-input').keypress(function (e) {
    if (e.which === 13) {
      $('#add-btn').click();
    }
  });

  // Marcar como concluída
  $('#todo-list').on('click', 'span', function () {
    $(this).parent().toggleClass('done');
  });

  // Remover tarefa
  $('#todo-list').on('click', '.remove-btn', function () {
    $(this).parent().fadeOut(200, function () {
      $(this).remove();
    });
  });
});
