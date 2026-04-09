document.addEventListener("DOMContentLoaded", () => {

    const resultsContainer = document.getElementById("resultsPage");

    const params = new URLSearchParams(window.location.search);
    const query = params.get("q");

    function normalize(text) {
        return text
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
    }

    // ===============================
    // PEGAR PRODUTOS SALVOS
    // ===============================

    const products = JSON.parse(localStorage.getItem("products")) || [];

    if (!query || query.trim() === "") {
        resultsContainer.innerHTML = "<p>Nenhum termo pesquisado.</p>";
        return;
    }

    const normalizedQuery = normalize(query.trim());

    let found = false;

    products.forEach(product => {

        if (normalize(product.name).includes(normalizedQuery)) {

            found = true;

            const card = document.createElement("div");
            card.classList.add("product-card");

            card.innerHTML = `
                <img src="${product.img}">
                <h3>${product.name}</h3>
                <p>${product.price}</p>
                <button>Comprar</button>
            `;

            resultsContainer.appendChild(card);
        }
    });

    if (!found) {
        resultsContainer.innerHTML = "<p>Nenhum produto encontrado 😢</p>";
    }

});