export class ThemeDarkView {
  constructor(toggleButton) {
    this.$toggleButton = $(toggleButton);
    this.onToggleCallback = null;
    this.$toggleButton.on('change', () => {
      const isDark = this.$toggleButton.is(':checked');
  
      if (this.onToggleCallback) {
        this.onToggleCallback(isDark);
      }
    });
  }
  onToggleTheme(callback) {
    this.onToggleCallback = callback;
  }
  applyTheme(isDark) {
    $('body').toggleClass('dark_mode', isDark);
    $('#icon-theme-on').toggleClass('ph-sun', isDark);
    $('#icon-theme-on').toggleClass('ph-moon', !isDark);
    
  }
  setButtonState(isDark) {
    this.$toggleButton.prop('checked', isDark);
  }
}