document.addEventListener("DOMContentLoaded", () => {

    if (!window.products) return;

    const products = window.products;
    const resultsContainer = document.getElementById("resultsPage");

    if (!resultsContainer) return;

    const params = new URLSearchParams(window.location.search);
    const query = params.get("q");

    function normalize(text) {
        return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    if (!query || query.trim() === "") {
        resultsContainer.innerHTML = "<p>Nenhum termo pesquisado.</p>";
        return;
    }
    document.addEventListener("DOMContentLoaded", () => {

        if (!window.products) return;

        const products = window.products;
        const resultsContainer = document.getElementById("resultsPage");
        const title = document.getElementById("resultsTitle");

        if (!resultsContainer) return;

        const params = new URLSearchParams(window.location.search);
        const query = params.get("q");
        const category = params.get("category");

        function normalize(text) {
            return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        }

        let filtered = [];

        // ===============================
        // FILTRO POR CATEGORIA
        // ===============================
        if (category) {
            filtered = products.filter(p => p.category === category);

            if (title) {
                title.textContent = `Categoria: ${formatCategory(category)}`;
            }
        }

        // ===============================
        // FILTRO POR BUSCA
        // ===============================
        else if (query && query.trim() !== "") {
            const normalizedQuery = normalize(query);

            filtered = products.filter(p =>
                normalize(p.name).includes(normalizedQuery)
            );

            if (title) {
                title.textContent = `Resultados para: "${query}"`;
            }
        }

        // ===============================
        // SEM RESULTADO
        // ===============================
        else {
            resultsContainer.innerHTML = "<p>Nenhum termo pesquisado.</p>";
            return;
        }

        if (filtered.length === 0) {
            resultsContainer.innerHTML = "<p>Nenhum produto encontrado 😢</p>";
            return;
        }

        // ===============================
        // RENDER
        // ===============================
        resultsContainer.innerHTML = "";

        filtered.forEach(product => {
            const card = document.createElement("div");
            card.className = "product-card";

            card.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>R$ ${product.price.toFixed(2)}</p>
            <button>Comprar</button>
        `;

            resultsContainer.appendChild(card);
        });

        // ===============================
        // FORMATAR NOME DA CATEGORIA
        // ===============================
        function formatCategory(cat) {
            const map = {
                "best-sellers": "Mais Vendidos",
                "components": "Componentes",
                "peripherals": "Periféricos",
                "accessories": "Acessórios",
                "devices": "Dispositivos"
            };

            return map[cat] || cat;
        }

    });
    const normalizedQuery = normalize(query);

    const filtered = products.filter(p =>
        normalize(p.name).includes(normalizedQuery)
    );

    if (filtered.length === 0) {
        resultsContainer.innerHTML = "<p>Nenhum produto encontrado 😢</p>";
        return;
    }

    resultsContainer.innerHTML = "";

    filtered.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
            <img src="${product.img}">
            <h3>${product.name}</h3>
            <p>R$ ${product.price.toFixed(2)}</p>
            <button>Comprar</button>
        `;

        resultsContainer.appendChild(card);
    });

});