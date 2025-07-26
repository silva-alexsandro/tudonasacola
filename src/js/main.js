$(document).ready(function () {
  // Adicionar nova tarefa
  $('#add-btn').click(function () {
    const task = $('#list_input').val().trim();
    if (task) {
      $('#merc-list').append(`
        <li>
          <span>${task}</span>
          <button class="remove-btn">×</button>
        </li>
      `);
      $('#list_input').val('');
    }
  });

  // Adicionar com Enter
  $('#list_input').keypress(function (e) {
    if (e.which === 13) {
      $('#add-btn').click();
    }
  });

  // Marcar como concluída
  $('#merc-list').on('click', 'span', function () {
    $(this).parent().toggleClass('done');
  });

  // Remover tarefa
  $('#merc-list').on('click', '.remove-btn', function () {
    $(this).parent().fadeOut(200, function () {
      $(this).remove();
    });
  });
});