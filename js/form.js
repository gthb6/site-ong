function aplicarMascaraCPF(campo) {
    let valor = campo.value.replace(/\D/g, "").slice(0, 11);

    if (valor.length > 9) {
        valor = valor.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, "$1.$2.$3-$4");
    } else if (valor.length > 6) {
        valor = valor.replace(/(\d{3})(\d{3})(\d{1,3})/, "$1.$2.$3");
    } else if (valor.length > 3) {
        valor = valor.replace(/(\d{3})(\d{1,3})/, "$1.$2");
    }

    campo.value = valor;
}

function aplicarMascaraTelefone(campo) {
    let valor = campo.value.replace(/\D/g, "").slice(0, 11);

    if (valor.length > 6) {
        valor = valor.replace(/(\d{2})(\d{5})(\d{1,4})/, "($1) $2-$3");
    } else if (valor.length > 2) {
        valor = valor.replace(/(\d{2})(\d{1,5})/, "($1) $2");
    }

    campo.value = valor;
}

function aplicarMascaraCEP(campo) {
    let valor = campo.value.replace(/\D/g, "").slice(0, 8);

    if (valor.length > 5) {
        valor = valor.replace(/(\d{5})(\d{1,3})/, "$1-$2");
    }

    campo.value = valor;
}

function coletarDados(formulario) {
    const dados = {};

    formulario.querySelectorAll("[name]").forEach(function (campo) {
        dados[campo.name] = campo.value;
    });

    return dados;
}

function preencherFormulario(formulario, dados) {
    Object.keys(dados).forEach(function (nomeCampo) {
        const campo = formulario.elements[nomeCampo];

        if (campo) {
            campo.value = dados[nomeCampo];
        }
    });
}

function iniciarFormulario() {
    const formulario = document.querySelector("form");

    if (!formulario || !document.getElementById("cpf")) return;

    const cpf = document.getElementById("cpf");
    const telefone = document.getElementById("telefone");
    const cep = document.getElementById("cep");

    cpf.addEventListener("input", function () {
        aplicarMascaraCPF(cpf);
        salvarCadastro(coletarDados(formulario));
    });

    telefone.addEventListener("input", function () {
        aplicarMascaraTelefone(telefone);
        salvarCadastro(coletarDados(formulario));
    });

    cep.addEventListener("input", function () {
        aplicarMascaraCEP(cep);
        salvarCadastro(coletarDados(formulario));
    });

    formulario.addEventListener("input", function (evento) {
        if (evento.target !== cpf && evento.target !== telefone && evento.target !== cep) {
            salvarCadastro(coletarDados(formulario));
        }
    });

    const dadosSalvos = recuperarCadastro();

    if (dadosSalvos) {
        preencherFormulario(formulario, dadosSalvos);
    }

    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();

        if (!formulario.checkValidity()) {
            formulario.reportValidity();
            return;
        }

        salvarCadastro(coletarDados(formulario));

        Swal.fire({
            title: "Cadastro salvo!",
            text: templateMensagemCadastro(),
            icon: "success",
            confirmButtonText: "OK"
        }).then(function () {
            formulario.reset();
            removerCadastro();
        });
    });
}
