import { render as renderErrorPage } from '../../views/erros/errs.js';

function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    status: params.get('status'),
    message: params.get('message'),
  };
}

document.addEventListener('DOMContentLoaded', () => {
  const { status, message } = getQueryParams();

  if (status && message) {
    renderErrorPage(status, decodeURIComponent(message));
  } else {
    renderErrorPage('Erro', 'Algo deu errado, mas não conseguimos identificar.');
  }
});
