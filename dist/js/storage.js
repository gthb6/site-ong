const chaveCadastro = "cadastroInstitutoEsperanca";

function salvarCadastro(dados) {
    localStorage.setItem(chaveCadastro, JSON.stringify(dados));
}

function recuperarCadastro() {
    const dadosSalvos = localStorage.getItem(chaveCadastro);

    if (!dadosSalvos) {
        return null;
    }

    try {
        return JSON.parse(dadosSalvos);
    } catch (erro) {
        localStorage.removeItem(chaveCadastro);
        return null;
    }
}

function removerCadastro() {
    localStorage.removeItem(chaveCadastro);
}
