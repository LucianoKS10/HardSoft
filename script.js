document.addEventListener("DOMContentLoaded", () => {

    // ===============================
    // ELEMENTOS (seguros)
    // ===============================

    const loginBtn = document.querySelector(".login a");
    const modal = document.getElementById("loginModal");
    const closeBtn = document.querySelector(".close");

    const loginForm = document.querySelector(".login-form");
    const registerForm = document.querySelector(".register-form");
    const forgotForm = document.querySelector(".forgot-form");

    const title = document.getElementById("loginTitle");

    const heroBtn = document.querySelector(".hero button");
    const bestSellersSection = document.querySelector(".best-sellers");

    const navbar = document.querySelector(".navbar");

    const searchInput = document.getElementById("searchInput");
    const searchForm = document.getElementById("searchForm");
    const productsDOM = document.querySelectorAll(".product-card");
    const searchResults = document.getElementById("searchResults");

    // ===============================
    // FUNÇÕES DO MODAL
    // ===============================

    function openModal() {
        if (!modal) return;
        modal.style.display = "flex";
        showLogin();
    }

    function closeModal() {
        if (!modal) return;
        modal.style.display = "none";
    }

    function resetModal() {
        // Esconde todos os formulários
        loginForm.style.display = "none";
        registerForm.style.display = "none";
        forgotForm.style.display = "none";
    }

    function showLogin() {
        resetModal();
        loginForm.style.display = "block";
        title.textContent = "Login";
    }

    function showRegister() {
        resetModal();
        registerForm.style.display = "block";
        title.textContent = "Cadastro";
    }

    function showForgot() {
        resetModal();
        forgotForm.style.display = "block";
        title.textContent = "Recuperar Senha";
    }

    // ===============================
    // EVENTOS MODAL
    // ===============================

    if (loginBtn) {
        loginBtn.addEventListener("click", (e) => {
            e.preventDefault();
            openModal();
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener("click", closeModal);
    }

    window.addEventListener("click", (e) => {
        if (modal && e.target === modal) {
            closeModal();
        }
    });

    // LINKS INTERNO DO MODAL
    const irRegister = document.getElementById("irRegister");
    const goForgot = document.getElementById("goForgot");
    const goLogin = document.getElementById("goLogin");
    const backLogin = document.getElementById("backLogin");

    if (irRegister) irRegister.addEventListener("click", e => { e.preventDefault(); showRegister(); });
    if (goForgot) goForgot.addEventListener("click", e => { e.preventDefault(); showForgot(); });
    if (goLogin) goLogin.addEventListener("click", e => { e.preventDefault(); showLogin(); });
    if (backLogin) backLogin.addEventListener("click", e => { e.preventDefault(); showLogin(); });

    // ===============================
    // HERO
    // ===============================

    if (heroBtn && bestSellersSection) {
        heroBtn.addEventListener("click", () => {
            bestSellersSection.scrollIntoView({ behavior: "smooth" });
        });
    }

    // ===============================
    // NAVBAR SCROLL
    // ===============================

    if (navbar) {
        window.addEventListener("scroll", () => {
            navbar.style.background = window.scrollY > 50
                ? "rgba(3, 36, 144, 0.95)"
                : "rgba(3, 36, 144, 0.8)";
        });
    }

    // ===============================
    // SEARCH AUTO COMPLETE
    // ===============================

    function normalize(text) {
        return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    if (searchInput && searchResults && productsDOM.length > 0) {

        searchInput.addEventListener("input", () => {
            const query = normalize(searchInput.value);
            searchResults.innerHTML = "";

            if (!query) {
                searchResults.style.display = "none";
                return;
            }

            let found = false;

            productsDOM.forEach(product => {
                const name = normalize(product.querySelector("h3")?.textContent || "");

                if (name.includes(query)) {
                    found = true;

                    const item = document.createElement("div");
                    item.classList.add("result-item");

                    item.innerHTML = `
                        <img src="${product.querySelector("img").src}">
                        <div>
                            <span>${product.querySelector("h3").textContent}</span>
                            <span>${product.querySelector("p").innerHTML}</span>
                        </div>
                    `;

                    item.addEventListener("click", () => {
                        product.scrollIntoView({ behavior: "smooth", block: "center" });
                        searchResults.style.display = "none";
                    });

                    searchResults.appendChild(item);
                }
            });

            searchResults.style.display = found ? "flex" : "none";
        });
    }

    // ===============================
    // REDIRECIONAMENTO BUSCA
    // ===============================

    if (searchForm && searchInput) {
        searchForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const query = searchInput.value.trim();
            if (!query) return;

            window.location.href = `search.html?q=${encodeURIComponent(query)}`;
        });
    }

});