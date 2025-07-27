import { darkMode, loadSavedTheme } from "./theme/theme.js";
import { initTaskEvents } from './tasks/tasks.js';
$(document).ready(function () {
  loadSavedTheme()
  darkMode();
  const taskHandlers = initTaskEvents();
});