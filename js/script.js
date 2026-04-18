document.addEventListener("DOMContentLoaded", () => {

    if (!window.products) {
        console.error("products não carregado");
        return;
    }

    const products = window.products;

    const loginBtn = document.querySelector(".login a");
    const modal = document.getElementById("loginModal");
    const closeBtn = document.querySelector(".close");

    const loginForm = document.querySelector(".login-form");
    const registerForm = document.querySelector(".register-form");
    const forgotForm = document.querySelector(".forgot-form");

    const title = document.getElementById("loginTitle");

    const heroBtn = document.querySelector(".hero button");
    const navbar = document.querySelector(".navbar");

    const searchInput = document.getElementById("searchInput");
    const searchForm = document.getElementById("searchForm");
    const searchResults = document.getElementById("searchResults");

    function normalize(text) {
        return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    // ===============================
    // MODAL
    // ===============================

    function openModal() {
        if (modal) modal.style.display = "flex";
        showLogin();
    }

    function closeModal() {
        if (modal) modal.style.display = "none";
    }

    function resetModal() {
        [loginForm, registerForm, forgotForm].forEach(f => {
            if (f) f.style.display = "none";
        });
    }

    function showLogin() {
        resetModal();
        if (loginForm) loginForm.style.display = "flex";
        if (title) title.textContent = "Login";
    }

    function showRegister() {
        resetModal();
        if (registerForm) registerForm.style.display = "flex";
        if (title) title.textContent = "Cadastro";
    }

    function showForgot() {
        resetModal();
        if (forgotForm) forgotForm.style.display = "flex";
        if (title) title.textContent = "Recuperar Senha";
    }

    loginBtn?.addEventListener("click", e => {
        e.preventDefault();
        openModal();
    });

    closeBtn?.addEventListener("click", closeModal);

    window.addEventListener("click", e => {
        if (e.target === modal) closeModal();
    });

    window.addEventListener("keydown", e => {
        if (e.key === "Escape") closeModal();
    });

    // ===============================
    // RENDER PRODUTOS
    // ===============================

    function renderProducts(category) {
        const container = document.getElementById(category);
        if (!container) return;

        const filtered = products.filter(p => p.category === category);

        container.innerHTML = "";

        filtered.forEach(product => {
            const card = document.createElement("div");
            card.className = "product-card";

            card.innerHTML = `
                <img src="${product.img}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>R$ ${product.price.toFixed(2)}</p>
                <button>Comprar</button>
            `;

            container.appendChild(card);
        });
    }

    ["best-sellers", "components", "peripherals", "accessories", "devices"]
        .forEach(renderProducts);

    // ===============================
    // SEARCH AUTOCOMPLETE
    // ===============================

    searchInput?.addEventListener("input", () => {
        const query = normalize(searchInput.value);

        searchResults.innerHTML = "";

        if (!query) {
            searchResults.style.display = "none";
            return;
        }

        const filtered = products.filter(p =>
            normalize(p.name).includes(query)
        );

        if (filtered.length === 0) {
            searchResults.style.display = "none";
            return;
        }

        searchResults.style.display = "flex";

        filtered.slice(0, 5).forEach(product => {
            const item = document.createElement("div");
            item.classList.add("result-item");

            item.innerHTML = `
                <img src="${product.img}">
                <div class="result-info">
                    <span>${product.name}</span>
                    <span>R$ ${product.price.toFixed(2)}</span>
                </div>
            `;

            item.onclick = () => {
                window.location.href = `search.html?q=${encodeURIComponent(product.name)}`;
            };

            searchResults.appendChild(item);
        });
    });

    searchForm?.addEventListener("submit", e => {
        e.preventDefault();

        const query = searchInput.value.trim();
        if (!query) return;

        window.location.href = `search.html?q=${encodeURIComponent(query)}`;
    });

});