export function render(erro, message) {
 const jsPage = $('#js-page-errs');
 jsPage.empty();
 jsPage.append(`
    <h1 class="title">Erro ${erro}</h1>
       <p class="sub-title">Ops! Algo deu errado em nosso servidor.</p>
       <p id="message" class="text">${message}</p>
       <p class="text">
        Estamos trabalhando para corrigir isso o mais rápido possível.
       </p>
       <p class="mt-16">
        <a href="./dashboard.html">
         <i class="ph ph-arrow-left"></i>
         <span> Voltar à página inicial </span>
        </a>
       </p>`);
}
