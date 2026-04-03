// ===============================
// ELEMENTOS
// ===============================
const loginBtn = document.querySelector(".login a");
const modal = document.getElementById("loginModal");
const closeBtn = document.querySelector(".close");

const loginForm = document.querySelector(".login-form");
const registerForm = document.querySelector(".register-form");
const forgotForm = document.querySelector(".forgot-form");

const title = document.getElementById("loginTitle");

const goRegister = document.getElementById("irRegister");
const goLogin = document.getElementById("goLogin");
const goForgot = document.getElementById("goForgot");
const backLogin = document.getElementById("backLogin");

const heroBtn = document.querySelector(".hero button");
const bestSellersSection = document.querySelector(".best-sellers");
const arrows = document.querySelectorAll(".arrow");
const navbar = document.querySelector(".navbar");

// ===============================
// FUNÇÕES
// ===============================

// RESET MODAL (always returns to login)
function resetModal() {
    registerForm.style.display = "none";
    loginForm.style.display = "flex";
    forgotForm.style.display = "none";
    title.textContent = "Login";
}

// ===============================
// EVENTOS
// ===============================

// OPEN MODAL
loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "flex";
    resetModal();
});

// FECHAR MODAL (X)
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    resetModal();
});

// FECHAR CLICANDO FORA
window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
        resetModal();
    }
});

// TROCAR O REGISTRO
goRegister.addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.style.display = "none";
    registerForm.style.display = "flex";
    forgotForm.style.display = "none";
    title.textContent = "Cadastro";
});

// TROCAR PARA LOGIN
goLogin.addEventListener("click", (e) => {
    e.preventDefault();
    registerForm.style.display = "none";
    loginForm.style.display = "flex";
    forgotForm.style.display = "none";
    title.textContent = "Login";
});

// IR PARA ESQUECI A SENHA
goForgot.addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.style.display = "none";
    registerForm.style.display = "none";
    forgotForm.style.display = "flex";
    title.textContent = "Recuperar Senha";
});

// BVOLTAR PARA LOGIN DE ESQUECI A SENHA
backLogin.addEventListener("click", (e) => {
    e.preventDefault();
    forgotForm.style.display = "none";
    loginForm.style.display = "flex";
    title.textContent = "Login";
});

// HERO BUTTON (smooth scroll)
heroBtn.addEventListener("click", () => {
    bestSellersSection.scrollIntoView({
        behavior: "smooth"
    });
});

// ARROWS CLICK EVENT
arrows.forEach((arrow) => {
    arrow.addEventListener("click", () => {
        alert("Here you can navigate to another page or show more products.");
    });
});

// NAVBAR SCROLL EFFECT
window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.style.background = "rgba(3, 36, 144, 0.95)";
    } else {
        navbar.style.background = "rgba(3, 36, 144, 0.8)";
    }
});

