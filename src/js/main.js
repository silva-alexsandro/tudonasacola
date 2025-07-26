import { darkMode } from "./theme/theme.js";
import { initTaskEvents } from './tasks/tasks.js';
$(document).ready(function () {
  darkMode();
  const taskHandlers = initTaskEvents();
});