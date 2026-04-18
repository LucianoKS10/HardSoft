function normalize(text) {
    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

window.products = [

    // ===============================
    // MAIS VENDIDOS
    // ===============================
    {
        id: 1,
        name: "Placa de Vídeo Pcyes AMD Radeon RX 550 4GB GDDR5",
        price: 476.99,
        category: "best-sellers",
        img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTcy9UxU9SseOqF2WMWxrtrEFm8jXJWvT2upYCfQtJeBjIOEjN98vu3s_nQFOYhi8bvzkOBluybccRhD3LMBrYS1G8lgBcY-MMz2GfmBqEcQpYLR5CZIQFt"
    },
    {
        id: 2,
        name: "Processador Intel i5 8400 4.0GHz",
        price: 559.99,
        category: "best-sellers",
        img: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQOOueMMRalwfNz9Dy7oPOKpFd4rCVeVw71JLF8jqM6PeyreCisTVoIp4aVfY6l0ThT2GdSPDBCiAfwa1J5KSewOsN1AJ-r3Sg9-vbLbtzGclkhaImVXtI"
    },
    {
        id: 3,
        name: "Memória RAM Kingston Fury Beast 8GB",
        price: 192.95,
        category: "best-sellers",
        img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTywIKbRHZ4PvzBMj026ZBa2yQsjhKT5-PHbCHL9vjPrYp5UmBdEaU7DAvH9ovSyVFUPrZHCkLekyl8Ch55uNF7hLviN8hUyfWRxkFdAVA1xiIfh7xheiy5Gw"
    },

    // ===============================
    // COMPONENTES
    // ===============================
    {
        id: 4,
        name: "Placa de Vídeo NIVIDIA RTX 5070 GDDR5 8GB",
        price: 4504.99,
        category: "components",
        img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcR3EGBeILI1EgX0ujul30O3KK0U01wY_-wZ4YvE0y4MLSDOrMFZSHhktdccmd93xpmO9U48SeEqKbfxUSus0saufC4fELWxNZV0JTSmSFFBgj9SYmbL6kiEyw"
    },
    {
        id: 5,
        name: "Processador AMD Ryzen 7 7800X3D",
        price: 2289.99,
        category: "components",
        img: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRGBBUuayAH1jMdwHp3b3-eo3YYTL9D-ev-X7OKv-legn2txHfm0RTgJ8ThmsaQsbHQtO76WoEsUy5-rVdeC2R3BArXyJX42juoG15S"
    },
    {
        id: 6,
        name: "Memória RAM XPG Lancer Blade 16GB DDR5",
        price: 1180.90,
        category: "components",
        img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSfhS4lPxil7aEVvs2aRhOyuACYvRLXg5hD9-jRQoBV1pAPLCfzQ0MlO7G8UCDlSbH6_smepRKnJpoUNJsUl9jwy6rj2iaVHMk3TszwkTa16o-eIXD-LfMv"
    },
    {
        id: 7,
        name: "MSI Placa-Mãe MAG B760 Tomahawk WIFI",
        price: 1869.00,
        category: "components",
        img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTf5AtgRcTmAueD7ebb8mfIdBeBEKgluDw15HCc8G2Pjg6BGpVWCe2PUgP38bZNpHUiKp9-1IlCXmTeIQqnT-wexqNCfK6LXl2LUdFBPzCuW-rS6a8SwH2jSw"
    },

    // ===============================
    // PERIFÉRICOS
    // ===============================
    {
        id: 8,
        name: "Monitor Lenovo Yoga Pro 27UD",
        price: 7199.99,
        category: "peripherals",
        img: "https://p4-ofp.static.pub/ShareResource/ww/visuals/Yoga-Pro-Gen-10/Gallery/-58401.png"
    },
    {
        id: 9,
        name: "Monitor ThinkVision S22e-19",
        price: 557.99,
        category: "peripherals",
        img: "https://p4-ofp.static.pub/fes/cms/2025/09/04/2v2m9qm71iyae0pz463e3mfzzb222d344709.png"
    },
    {
        id: 10,
        name: "Mouse Gamer Lenovo Legion M600",
        price: 422.99,
        category: "peripherals",
        img: "https://p4-ofp.static.pub/fes/cms/2025/05/22/bbh4okj51q0s8dnrsp89vypi3l1nmz317151.png"
    },

    // ===============================
    // ACESSÓRIOS
    // ===============================
    {
        id: 11,
        name: "Controle Gamer Redragon Tophis G821",
        price: 147.99,
        category: "accessories",
        img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQY9f01XqbY3x9gqVXWyILYehRkXYEM4SU7bJAYCt4QYj7PGpeZopkIkp9MZ6-h7jAyo7sd5c5czdk54SR5WNtD4fN5OObcEfGlUZvubdbIjz-GHaJ-ugxh"
    },
    {
        id: 12,
        name: "Webcam Full HD 1080p",
        price: 48.99,
        category: "accessories",
        img: "https://m.media-amazon.com/images/I/41KqLLY1BPL._AC_SX522_.jpg"
    },
    {
        id: 13,
        name: "Suporte para Notebook Ergo",
        price: 89.90,
        category: "accessories",
        img: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTLLt_QaY5iWrt86yqkIHCn4otwwZunYDDEHG78Q5EYTakMYR2OBYKX_C3CyTabNMhj2lmPIevIZcSiZEbZvsy82bXkHnca9Q"
    },

    // ===============================
    // DISPOSITIVOS
    // ===============================
    {
        id: 14,
        name: "Samsung Galaxy S25 Ultra 5G",
        price: 6786.99,
        category: "devices",
        img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSHUNL5szfVtJAgb7HXeplNdjUZ0kpbv-bdO9vnthPq8TeAIfZf9QHNGxEwheiGEAvmqxYtsOqnWqukyG-keGmiN9iM7n4zmw"
    },
    {
        id: 15,
        name: "Tablet Samsung Galaxy Tab S10 Lite",
        price: 2262.90,
        category: "devices",
        img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRdF76Jnz9yCgUp9AuLrs3gMka8q4kTWr0aPpE0fPDBiaDvWsCzfr19IuyhZT-_cw06wfWzBsCWSxlAQn-Do1Y9zyNfetAM056PFuVs8X3qu-X792IVsN-s1g"
    }

];