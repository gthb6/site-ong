function iniciarMenu() {
    const botaoMenu = document.querySelector(".menu-hamburguer");
    const menu = document.querySelector(".menu-links");

    if (!botaoMenu || !menu) return;

    botaoMenu.addEventListener("click", function () {
        const menuAberto = menu.classList.toggle("ativo");

        botaoMenu.setAttribute("aria-expanded", menuAberto ? "true" : "false");
        botaoMenu.setAttribute("aria-label", menuAberto ? "Fechar menu" : "Abrir menu");
    });
}


function iniciarToast() {
    const toast = document.getElementById("toast");
    const botaoFechar = document.getElementById("fechar-toast");

    if (!toast || !botaoFechar) return;

    botaoFechar.addEventListener("click", function () {
        toast.classList.remove("ativo");
    });

    setTimeout(function () {
        toast.classList.add("ativo");
    }, 300);
}


function iniciarModal() {
    const modal = document.getElementById("modal");
    const botaoAbrir = document.getElementById("abrir-modal");
    const botaoFechar = document.getElementById("fechar-modal");

    if (!modal || !botaoAbrir || !botaoFechar) return;

    let elementoAnterior = null;

    function fecharModal() {
        modal.classList.remove("ativo");

        if (elementoAnterior) {
            elementoAnterior.focus();
        }
    }

    botaoAbrir.addEventListener("click", function () {
        elementoAnterior = document.activeElement;
        modal.classList.add("ativo");
        botaoFechar.focus();
    });

    botaoFechar.addEventListener("click", fecharModal);

    modal.addEventListener("click", function (evento) {
        if (evento.target === modal) {
            fecharModal();
        }
    });

    document.addEventListener("keydown", function (evento) {
        if (evento.key === "Escape" && modal.classList.contains("ativo")) {
            fecharModal();
        }
    });
}


function iniciarTema() {
    const botaoTema = document.getElementById("botao-tema");

    if (!botaoTema) return;

    const temaSalvo = localStorage.getItem("temaInstituto");

    aplicarTema(botaoTema, temaSalvo === "escuro" ? "escuro" : "claro");

    botaoTema.addEventListener("click", function () {
        const modoEscuro = document.documentElement.getAttribute("data-tema") === "escuro";
        const novoTema = modoEscuro ? "claro" : "escuro";

        aplicarTema(botaoTema, novoTema);

        localStorage.setItem("temaInstituto", novoTema);
    });
}


function aplicarTema(botaoTema, tema) {
    const modoEscuro = tema === "escuro";

    document.documentElement.setAttribute("data-tema", modoEscuro ? "escuro" : "claro");

    botaoTema.textContent = modoEscuro ? "☀️" : "🌙";

    botaoTema.setAttribute(
        "aria-label",
        modoEscuro ? "Ativar modo claro" : "Ativar modo escuro"
    );
}
