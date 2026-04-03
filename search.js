const resultsContainer = document.getElementById("resultsPage");

// pega o ?q= da URL
const params = new URLSearchParams(window.location.search);
const query = params.get("q");

// normalizador
function normalize(text) {
    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

// pega produtos da página principal (simulação)
const products = [
    {
        name: "RTX 5070",
        price: "R$ 4.504,99",
        img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcR3EGBeILI1EgX0ujul30O3KK0U01wY_-wZ4YvE0y4MLSDOrMFZSHhktdccmd93xpmO9U48SeEqKbfxUSus0saufC4fELWxNZV0JTSmSFFBgj9SYmbL6kiEyw"
    },
    {
        name: "Processador AMD Ryzen 7 7800X3D",
        price: "R$ 2.289,99",
        img: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRGBBUuayAH1jMdwHp3b3-eo3YYTL9D-ev-X7OKv-legn2txHfm0RTgJ8ThmsaQsbHQtO76WoEsUy5-rVdeC2R3BArXyJX42juoG15S"
    },
    {
        name: "Memória RAM XPG 16GB",
        price: "R$ 1.180,90",
        img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSfhS4lPxil7aEVvs2aRhOyuACYvRLXg5hD9-jRQoBV1pAPLCfzQ0MlO7G8UCDlSbH6_smepRKnJpoUNJsUl9jwy6rj2iaVHMk3TszwkTa16o-eIXD-LfMv"
    }
];

products.forEach(product => {
    if (normalize(product.name).includes(normalize(query))) {
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

document.querySelector(".links a").addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "index.html";
});