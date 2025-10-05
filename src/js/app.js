import { ModalController } from './controllers/modal/modalController.js';
import { ThemeDarkController } from './controllers/theme/themeDarkController.js';

$(document).ready(function () {
 const modalController = new ModalController();
 const themeController = new ThemeDarkController();
 modalController.initEvents();
 themeController.init();

 $(document).on('keydown', function (event) {
  // Atalho: Ctrl + Alt + N → Criar lista
  if (event.ctrlKey && event.altKey && event.key.toLowerCase() === 'n') {
   event.preventDefault();

   const $botaoCriar = $('#js-createList');
   if ($botaoCriar.length) {
    $botaoCriar.trigger('click');
   }
  }

  // Atalho: Ctrl + Alt + T → Alternar tema
  if (event.ctrlKey && event.altKey && event.key.toLowerCase() === 't') {
   event.preventDefault();

   const $toggleBtn = $('.toggle').first(); // Pega o primeiro botão com classe 'toggle'
   if ($toggleBtn.length) {
    $toggleBtn.trigger('click');
   }
  }
 });
});
