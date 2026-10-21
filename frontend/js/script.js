
/* ========================================
   1. BUSCA DE CONTEÚDO
   ======================================== */

const formularioBusca = document.getElementById("form-busca");
const campoBusca = document.getElementById("campo-busca");

if (formularioBusca && campoBusca) {
    // Área para exibir o resultado da busca
    const mensagemBusca = document.createElement("p");
    mensagemBusca.setAttribute("aria-live", "polite");
    mensagemBusca.classList.add("mensagem-busca");

    formularioBusca.insertAdjacentElement("afterend", mensagemBusca);

    formularioBusca.addEventListener("submit", function (evento) {
        evento.preventDefault();

        const termo = normalizarTexto(campoBusca.value.trim());

        // Remove os destaques anteriores
        const secoes = document.querySelectorAll(
            ".conteudo .abertura, .conteudo .bloco"
        );

        secoes.forEach(function (secao) {
            secao.classList.remove("marca-encontrada");
        });

        if (termo === "") {
            mensagemBusca.textContent =
                "Digite uma palavra para pesquisar.";
            campoBusca.focus();
            return;
        }

        let quantidadeEncontrada = 0;
        let primeiraSecao = null;

        secoes.forEach(function (secao) {
            const textoSecao = normalizarTexto(secao.textContent);

            if (textoSecao.includes(termo)) {
                secao.classList.add("marca-encontrada");
                quantidadeEncontrada++;

                if (primeiraSecao === null) {
                    primeiraSecao = secao;
                }
            }
        });

        if (quantidadeEncontrada > 0) {
            mensagemBusca.textContent =
                "Encontrado em " + quantidadeEncontrada +
                " seção(ões) do site.";

            primeiraSecao.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        } else {
            mensagemBusca.textContent =
                "Nenhum conteúdo encontrado para essa pesquisa.";
        }
    });
}

// Deixa a busca sem diferença entre maiúsculas,
// minúsculas e letras com acentos.
function normalizarTexto(texto) {
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}


/* ========================================
   2. QUIZ SOBRE CAPACITORES
   ======================================== */

const formularioQuiz = document.getElementById("quiz-form");
const resultadoQuiz = document.getElementById("resultado-quiz");

// Alternativas corretas de cada questão
const respostasCorretas = {
    q1: "b",
    q2: "a",
    q3: "c",
    q4: "b"
};

if (formularioQuiz && resultadoQuiz) {
    formularioQuiz.addEventListener("submit", function (evento) {
        evento.preventDefault();

        const respostas = new FormData(formularioQuiz);
        let pontuacao = 0;
        let questoesRespondidas = 0;

        // Confere as respostas selecionadas
        for (const questao in respostasCorretas) {
            const resposta = respostas.get(questao);

            if (resposta !== null) {
                questoesRespondidas++;
            }

            if (resposta === respostasCorretas[questao]) {
                pontuacao++;
            }
        }

        // Exige que todas as perguntas sejam respondidas
        if (questoesRespondidas < 4) {
            resultadoQuiz.textContent =
                "Responda às quatro perguntas antes de conferir.";
            return;
        }

        // Exibe a pontuação
        if (pontuacao === 4) {
            resultadoQuiz.textContent =
                "Excelente! Você acertou 4 de 4 questões. Parabéns!";
        } else if (pontuacao >= 2) {
            resultadoQuiz.textContent =
                "Muito bem! Você acertou " + pontuacao +
                " de 4 questões. Continue estudando!";
        } else {
            resultadoQuiz.textContent =
                "Você acertou " + pontuacao +
                " de 4 questões. Revise o conteúdo e tente novamente!";
        }
    });
}
