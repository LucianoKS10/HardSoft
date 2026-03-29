// BOTÃO "VER PRODUTOS"
const botaoHero = document.querySelector(".hero button");
const secaoProdutos = document.querySelector(".best-sellers");

botaoHero.addEventListener("click", () => {
    secaoProdutos.scrollIntoView({
        behavior: "smooth"
    });
});


// SETAS DAS SEÇÕES
const setas = document.querySelectorAll(".arrow");

setas.forEach((seta) => {
    seta.addEventListener("click", () => {
        alert("Aqui você pode levar para outra página ou mostrar mais produtos.");
    });
});


// EFEITO NA NAVBAR AO ROLAR
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.style.background = "rgba(3, 36, 144, 0.95)";
    } else {
        navbar.style.background = "rgba(3, 36, 144, 0.8)";
    }
});

// ELEMENTOS
const loginBtn = document.querySelector(".login a");
const modal = document.getElementById("loginModal");
const closed = document.querySelector(".close");

// ABRIR MODAL
loginBtn.addEventListener("click", (e) => {
    e.preventDefault(); // evita recarregar a página
    modal.style.display = "flex";
});

// FECHAR NO X
closed.addEventListener("click", () => {
    modal.style.display = "none";
});

// FECHAR CLICANDO FORA
window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});