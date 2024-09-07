document.addEventListener("DOMContentLoaded", () => {
    const botaoCadastrar = document.getElementById("botaoCadastrarTarefa");
    const listaTarefas = document.getElementById("listaTarefas");
    const nomeUsuario = JSON.parse(localStorage.getItem('usuarioLogado'));
    const informacoesUsuario = document.querySelector('.informacoes-usuario span');

    let contadorTarefa = 1;

    if (nomeUsuario) {
        informacoesUsuario.textContent = `Olá, ${nomeUsuario}`;
    }

    const salvarTarefas = (tarefas) => {
        localStorage.setItem(`tarefas_${nomeUsuario}`, JSON.stringify(tarefas));
    };

    const carregarTarefas = () => {
        return JSON.parse(localStorage.getItem(`tarefas_${nomeUsuario}`)) || [];
    };

    const adicionarTarefa = (titulo, descricao, horario, progressoInicial) => {
        const tarefa = document.createElement("div");
        tarefa.classList.add("cartao-tarefa");

        const Progresso = `progress-${contadorTarefa++}`;

        tarefa.innerHTML = `
            <div class="cabecalho-tarefa">
                <span class="titulo-tarefa">${titulo}</span>
                <span class="horario-tarefa">${horario}</span>
            </div>
            <p>${descricao}</p>
            <label for="${Progresso}">Progresso:</label>
            <progress id="${Progresso}" value="${progressoInicial}" max="100">${progressoInicial}%</progress>
            <span class="progresso-texto">${progressoInicial}%</span>
            <div class="acoes-tarefa">
                <i class="fas fa-trash"></i>
            </div>
        `;

        const progressoBarra = tarefa.querySelector(`#${Progresso}`);
        const progressoTexto = tarefa.querySelector(".progresso-texto");

        progressoBarra.addEventListener("click", () => {
            const novoProgresso = prompt("Digite o novo progresso (%)");

            if (novoProgresso !== null && novoProgresso >= 0 && novoProgresso <= 100) {
                progressoBarra.value = novoProgresso;
                progressoTexto.textContent = `${novoProgresso}%`;

                if (novoProgresso == 100) {
                    tarefa.classList.add('tarefa-concluida');
                } else {
                    tarefa.classList.remove('tarefa-concluida');
                }

                atualizarLocalStorage();
            }
        });

        const botaoRemover = tarefa.querySelector(".fa-trash");
        botaoRemover.addEventListener("click", () => {
            tarefa.remove();
            atualizarLocalStorage();
        });

        listaTarefas.appendChild(tarefa);
        atualizarLocalStorage();
    };

    const atualizarLocalStorage = () => {
        const vetorTarefas = [];
        listaTarefas.querySelectorAll(".cartao-tarefa").forEach(tarefa => {
            const titulo = tarefa.querySelector(".titulo-tarefa").textContent;
            const horario = tarefa.querySelector(".horario-tarefa").textContent;
            const descricao = tarefa.querySelector("p").textContent;
            const progresso = tarefa.querySelector("progress").value;

            vetorTarefas.push({ titulo, descricao, horario, progresso });
        });

        salvarTarefas(vetorTarefas);
    };

    const tarefasSalvas = carregarTarefas();
    tarefasSalvas.forEach(tarefa => adicionarTarefa(...Object.values(tarefa)));

    botaoCadastrar.addEventListener("click", () => {
        const tituloTarefa = prompt("Qual é o título da tarefa?");
        const descricaoTarefa = prompt("Qual é a descrição da tarefa?");
        const horarioTarefa = prompt("Qual é o horário da tarefa? (Ex: 14:30h)");

        if (tituloTarefa && descricaoTarefa && horarioTarefa) {
            adicionarTarefa(tituloTarefa, descricaoTarefa, horarioTarefa, 0);
        }
    });
});
