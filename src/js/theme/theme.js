export function darkMode() {
  $('#switch').on('change', function () {
    if ($(this).is(':checked')) {
      $('body').addClass('dark_mode')
      $('#moon').addClass('hidden')
      $('#sun').removeClass('hidden')
    }
    else {
      $('body').removeClass('dark_mode');
      $('#moon').removeClass('hidden');
      $('#sun').addClass('hidden')
    }
  });
}