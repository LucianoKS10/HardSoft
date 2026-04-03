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

const searchInput = document.getElementById("searchInput");
const searchForm = document.getElementById("searchForm");
const products = document.querySelectorAll(".product-card");
const noResults = document.getElementById("noResults");
const searchResults = document.getElementById("searchResults");

// ===============================
// FUNÇÕES
// ===============================

// RESET MODAL
function resetModal() {
    registerForm.style.display = "none";
    loginForm.style.display = "flex";
    forgotForm.style.display = "none";
    title.textContent = "Login";
}

// NORMALIZA TEXTO (remove acento, caixa, etc)
function normalizeText(text) {
    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}


// ===============================
// EVENTOS - MODAL
// ===============================

loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "flex";
    resetModal();
});

closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    resetModal();
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
        resetModal();
    }
});

// ===============================
// TROCA DE TELAS (LOGIN)
// ===============================

goRegister.addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.style.display = "none";
    registerForm.style.display = "flex";
    forgotForm.style.display = "none";
    title.textContent = "Cadastro";
});

goLogin.addEventListener("click", (e) => {
    e.preventDefault();
    registerForm.style.display = "none";
    loginForm.style.display = "flex";
    forgotForm.style.display = "none";
    title.textContent = "Login";
});

goForgot.addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.style.display = "none";
    registerForm.style.display = "none";
    forgotForm.style.display = "flex";
    title.textContent = "Recuperar Senha";
});

backLogin.addEventListener("click", (e) => {
    e.preventDefault();
    forgotForm.style.display = "none";
    loginForm.style.display = "flex";
    title.textContent = "Login";
});

// ===============================
// HERO
// ===============================

heroBtn.addEventListener("click", () => {
    bestSellersSection.scrollIntoView({
        behavior: "smooth"
    });
});

// ===============================
// SETAS
// ===============================

arrows.forEach((arrow) => {
    arrow.addEventListener("click", () => {
        alert("Aqui você pode navegar ou mostrar mais produtos.");
    });
});

// ===============================
// NAVBAR SCROLL
// ===============================

window.addEventListener("scroll", () => {
    navbar.style.background =
        window.scrollY > 50
            ? "rgba(3, 36, 144, 0.95)"
            : "rgba(3, 36, 144, 0.8)";
});

// ===============================
// SEARCH SYSTEM
// ===============================


// FUNÇÃO PRINCIPAL DE BUSCA
function performSearch(query) {
    const normalizedQuery = normalizeText(query);
    let firstMatch = null;
    let found = false;

    products.forEach((product) => {
        const productName = normalizeText(
            product.querySelector("h3").textContent
        );

        if (productName.includes(normalizedQuery)) {
            product.style.display = "block";
            found = true;

            if (!firstMatch) {
                firstMatch = product; // salva o primeiro encontrado
            }
        } else {
            product.style.display = "none";
        }
    });

    noResults.style.display = found ? "none" : "block";

    return firstMatch;
}

// ===============================
// SEARCH SYSTEM
// ===============================

// BUSCA EM TEMPO REAL
searchInput.addEventListener("input", () => {
    const query = normalizeText(searchInput.value);

    searchResults.innerHTML = "";

    if (query === "") {
        searchResults.style.display = "none";
        return;
    }

    let found = false;

    products.forEach((product) => {
        const name = normalizeText(
            product.querySelector("h3").textContent
        );

        if (name.includes(query)) {
            found = true;

            const item = document.createElement("div");
            item.classList.add("result-item");

            const img = product.querySelector("img").src;
            const nameText = product.querySelector("h3").textContent;
            const price = product.querySelector("p").innerHTML;

            item.innerHTML = `
                <img src="${img}">
                <div class="result-info">
                    <span class="result-name">${nameText}</span>
                    <span class="result-price">${price}</span>
                </div>
            `;

            // clique vai pro produto
            item.addEventListener("click", () => {
                product.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
                searchResults.style.display = "none";
            });

            searchResults.appendChild(item); // 🔥 ESSENCIAL
        }
    });

    searchResults.style.display = found ? "flex" : "none";
});

// 🔥 REDIRECIONAMENTO PRA OUTRA PÁGINA
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const query = searchInput.value;

    window.location.href = `search.html?q=${encodeURIComponent(query)}`;
});

document.querySelector(".links a").addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "index.html";
});

const params = new URLSearchParams(window.location.search);
const query = params.get("q");

if (query) {
    document.getElementById("searchInput").value = query;
}