import { loadInLocalStorageItem, saveInLocalStorage } from "../../db/handleLocalStorage.js";

const KEY_THEME = 'theme';
export class ThemeDarkModel {
  constructor() {
    this.isDark = this.getTheme();
  }
  
  saveTheme(isDark) { saveInLocalStorage(KEY_THEME, isDark ? 'dark_mode' : null) }

  getTheme() {
    const hasDark = loadInLocalStorageItem(KEY_THEME);
    return hasDark === 'dark_mode'
  }
}