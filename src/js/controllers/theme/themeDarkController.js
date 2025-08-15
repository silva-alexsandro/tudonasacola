import { ThemeDarkModel } from "../../models/theme/themeDarkModel.js";
import { ThemeDarkView } from "../../views/theme/themeDarkView.js";

export class ThemeDarkController {
  constructor() {
    this.model = new ThemeDarkModel();
    this.view = new ThemeDarkView($('#switchThemeDark'));
  }

  init() {
    this.view.onToggleTheme((isDark) => {
      this.model.saveTheme(isDark);
      this.view.applyTheme(isDark);
    });

    const isDark = this.model.getTheme();
    this.view.setButtonState(isDark)
    this.view.applyTheme(isDark);
    $('#switchThemeDark').checked = isDark;
  }
}
