document.addEventListener('DOMContentLoaded', function () {
    // Seleciona a área central onde o conteúdo será exibido
    const areaConteudo = document.getElementById('area-conteudo');
    
    // Seleciona todos os links do menu lateral com o atributo data-arquivo
    const linksMenu = document.querySelectorAll('aside nav a[data-arquivo]');

    // Adiciona o evento de clique a cada link do menu
    linksMenu.forEach(function (link) {
        link.addEventListener('click', function (evento) {
            evento.preventDefault(); // Impede o salto padrão da página

            const nomeArquivo = link.getAttribute('data-arquivo');
            const caminhoArquivo = 'conteudos/' + nomeArquivo;

            // Mensagem temporária durante o carregamento
            areaConteudo.innerHTML = `
                <h2 class="card-title">A carregar...</h2>
                <p class="card-description">Por favor, aguarde enquanto o conteúdo é carregado.</p>
            `;

            // Procura o ficheiro dentro da pasta 'conteudos'
            fetch(caminhoArquivo)
                .then(function (resposta) {
                    if (resposta.ok) {
                        return resposta.text();
                    } else {
                        throw new Error('Ficheiro não encontrado');
                    }
                })
                .then(function (htmlConteudo) {
                    // Insere o código do ficheiro do colega na área central
                    areaConteudo.innerHTML = htmlConteudo;
                })
                .catch(function () {
                    // Exibido caso o colega ainda não tenha entregue o ficheiro
                    areaConteudo.innerHTML = `
                        <h2 class="card-title">${link.textContent}</h2>
                        <div class="alert alert-warning">
                            <strong>Conteúdo pendente!</strong>
                            <p class="mb-0">O trabalho deste tópico ainda não foi adicionado à pasta <code>conteudos/</code>.</p>
                        </div>
                    `;
                });
        });
    });

    // Funcionalidade do botão de ajuda do cabeçalho
    const btnAjuda = document.getElementById('btn-ajuda');
    if (btnAjuda) {
        btnAjuda.addEventListener('click', function () {
            alert('Para navegar, clique num dos tópicos no menu lateral. O conteúdo será carregado no painel central.');
        });
    }
});