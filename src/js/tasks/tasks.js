export function initTaskEvents() {
  const $input = $('#list_input');
  const $addBtn = $('#add-btn');

  // Função para ativar ou desativar o botão conforme input
  function toggleAddButton() {
    if ($input.val().trim().length > 0) {
      $addBtn.prop('disabled', false);
    } else {
      $addBtn.prop('disabled', true);
    }
  }

  // Função para desativar o botão explicitamente
  function disableAddButton() {
    $addBtn.prop('disabled', true);
  }

  // Evento que ativa/desativa o botão conforme o usuário digita
  $input.on('input', toggleAddButton);

  // Iniciar botão desativado ao carregar
  disableAddButton();

  // Evento para adicionar tarefa
  $addBtn.click(function () {
    const task = $input.val().trim();
    if (task) {
      $('#merc-list').append(`
        <li>
          <span>${task}</span>
          <button class="remove-btn">×</button>
        </li>
      `);
      $input.val('');
      disableAddButton(); // desativa o botão depois de salvar a tarefa
    }
  });

  // Adicionar com Enter
  $input.keypress(function (e) {
    if (e.which === 13 && !$addBtn.prop('disabled')) {
      $addBtn.click();
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

  // Exporta a função disableAddButton para uso externo se precisar
  return {
    disableAddButton,
  };
}
