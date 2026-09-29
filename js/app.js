function iniciarTema() {
    const botaoTema = document.getElementById("botao-tema");

    if (!botaoTema) return;

    const temaSalvo = localStorage.getItem("tema");

    if (temaSalvo === "escuro") {
        document.body.classList.add("modo-escuro");
        botaoTema.textContent = "☀️";
        botaoTema.setAttribute("aria-label", "Ativar modo claro");
    }

    botaoTema.addEventListener("click", function () {
        document.body.classList.toggle("modo-escuro");

        const modoEscuro = document.body.classList.contains("modo-escuro");

        localStorage.setItem("tema", modoEscuro ? "escuro" : "claro");
        botaoTema.textContent = modoEscuro ? "☀️" : "🌙";
        botaoTema.setAttribute(
            "aria-label",
            modoEscuro ? "Ativar modo claro" : "Ativar modo escuro"
        );
    });
}

document.addEventListener("DOMContentLoaded", function () {
    iniciarTema();
    iniciarMenu();
    iniciarToast();
    iniciarModal();
    iniciarFormulario();
});
