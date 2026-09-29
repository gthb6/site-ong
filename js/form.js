function aplicarMascaraCPF(campo) {
    let valor = campo.value.replace(/\D/g, "");

    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    campo.value = valor;
}

function aplicarMascaraTelefone(campo) {
    let valor = campo.value.replace(/\D/g, "");

    valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2");
    valor = valor.replace(/(\d{5})(\d{1,4})$/, "$1-$2");

    campo.value = valor;
}

function aplicarMascaraCEP(campo) {
    let valor = campo.value.replace(/\D/g, "");

    valor = valor.replace(/^(\d{5})(\d)/, "$1-$2");

    campo.value = valor;
}

function coletarDados(formulario) {
    const dados = {};

    const campos = formulario.querySelectorAll("input, select, textarea");

    campos.forEach(function (campo) {
        dados[campo.name] = campo.value;
    });

    return dados;
}

function preencherFormulario(formulario, dados) {
    const campos = formulario.querySelectorAll("input, select, textarea");

    campos.forEach(function (campo) {
        if (dados[campo.name] !== undefined) {
            campo.value = dados[campo.name];
        }
    });
}

function iniciarFormulario() {
    const formulario = document.querySelector("form");

    if (!formulario || !document.getElementById("cpf")) return;

    const cpf = document.getElementById("cpf");
    const telefone = document.getElementById("telefone");
    const cep = document.getElementById("cep");
    const nascimento = document.getElementById("nascimento");

    const hoje = new Date().toISOString().split("T")[0];

    nascimento.setAttribute("max", hoje);

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
            confirmButtonText: "OK",
            customClass: {
                popup: document.documentElement.classList.contains("modo-escuro") ? "alerta-escuro" : ""
            }
        }).then(function () {
            formulario.reset();
            removerCadastro();
        });
    });
}