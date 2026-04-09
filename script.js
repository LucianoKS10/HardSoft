document.addEventListener("DOMContentLoaded", () => {

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

    const navbar = document.querySelector(".navbar");

    const searchInput = document.getElementById("searchInput");
    const searchForm = document.getElementById("searchForm");
    const productsDOM = document.querySelectorAll(".product-card");
    const searchResults = document.getElementById("searchResults");

    // ===============================
    // SALVAR PRODUTOS (🔥 ESSENCIAL)
    // ===============================

    const productsData = [];

    productsDOM.forEach(product => {
        productsData.push({
            name: product.querySelector("h3").textContent,
            price: product.querySelector("p").innerHTML,
            img: product.querySelector("img").src
        });
    });

    localStorage.setItem("products", JSON.stringify(productsData));

    // ===============================
    // FUNÇÕES
    // ===============================

    function resetModal() {
        registerForm.style.display = "none";
        loginForm.style.display = "flex";
        forgotForm.style.display = "none";
        title.textContent = "Login";
    }

    function openModal() {
        modal.style.display = "flex";
        resetModal();
    }

    function closeModal() {
        modal.style.display = "none";
        resetModal();
    }

    function normalize(text) {
        return text
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
    }

    // ===============================
    // MODAL
    // ===============================

    loginBtn.addEventListener("click", (e) => {
        e.preventDefault();
        openModal();
    });

    closeBtn.addEventListener("click", closeModal);

    window.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });

    // ===============================
    // HERO
    // ===============================

    if (heroBtn) {
        heroBtn.addEventListener("click", () => {
            bestSellersSection.scrollIntoView({ behavior: "smooth" });
        });
    }

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
    // SEARCH (AUTO COMPLETE)
    // ===============================

    searchInput.addEventListener("input", () => {
        const query = normalize(searchInput.value);
        searchResults.innerHTML = "";

        if (!query) {
            searchResults.style.display = "none";
            return;
        }

        let found = false;

        productsDOM.forEach(product => {
            const name = normalize(product.querySelector("h3").textContent);

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
                    product.scrollIntoView({ behavior: "smooth" });
                    searchResults.style.display = "none";
                });

                searchResults.appendChild(item);
            }
        });

        searchResults.style.display = found ? "flex" : "none";
    });

    // ===============================
    // REDIRECIONAMENTO
    // ===============================

    searchForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const query = searchInput.value.trim();

        if (!query) return;

        window.location.href = `search.html?q=${encodeURIComponent(query)}`;
    });

});