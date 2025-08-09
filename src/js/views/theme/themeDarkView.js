export class ThemeDarkView {
  constructor(toggleButton) {
    this.$toggleButton = $(toggleButton);
    this.onToggleCallback = null;
    this.$toggleButton.on('change', () => {
      const isDark = this.$toggleButton.is(':checked');
      // Call the callback function provided by the controller
      if (this.onToggleCallback) {
        this.onToggleCallback(isDark);
      }
    });
  }
  // Method used by the controller to register the callback function
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