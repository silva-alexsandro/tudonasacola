export function darkMode() {
  $('#switch').on('change', function () {
    const isDark = $(this).is(':checked');
    applyTheme(isDark);
    saveThemeLocalStorage(isDark);
  });
}
export function loadSavedTheme() {
  const savedTheme = localStorage.getItem('theme');
  const isDark = savedTheme === 'dark_mode';
  applyTheme(isDark);
  // Sincroniza o estado do botão visual com o tema
  $('#switch').prop('checked', isDark);
}
export function saveThemeLocalStorage(isDark = false) {
  localStorage.setItem('theme', isDark ? 'dark_mode' : '');
}
function applyTheme(isDark) {
  $('body').toggleClass('dark_mode', isDark);
  $('#moon').toggleClass('hidden', isDark);
  $('#sun').toggleClass('hidden', !isDark);
}