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
    const searchInput = document.getElementById("searchInput");
    const searchForm = document.getElementById("searchForm");
    const searchResults = document.getElementById("searchResults");

    function normalize(text) {
        return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    // ===============================
    // FEEDBACK VISUAL
    // ===============================

    function showMessage(form, message, type = "error") {
        let existing = form.querySelector(".form-msg");
        if (existing) existing.remove();

        const msg = document.createElement("p");
        msg.className = "form-msg";
        msg.textContent = message;
        msg.style.cssText = `
            font-size: 0.85rem;
            margin: 4px 0 0;
            padding: 8px 10px;
            border-radius: 6px;
            background: ${type === "success" ? "#d1fae5" : "#fee2e2"};
            color: ${type === "success" ? "#065f46" : "#991b1b"};
            border: 1px solid ${type === "success" ? "#6ee7b7" : "#fca5a5"};
        `;

        const btn = form.querySelector("button");
        form.insertBefore(msg, btn);

        if (type === "success") {
            setTimeout(() => msg.remove(), 3500);
        }
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
            if (f) {
                f.style.display = "none";
                const msg = f.querySelector(".form-msg");
                if (msg) msg.remove();
            }
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

    // Navegação entre formulários
    document.getElementById("irRegister")?.addEventListener("click", e => {
        e.preventDefault();
        showRegister();
    });

    document.getElementById("goForgot")?.addEventListener("click", e => {
        e.preventDefault();
        showForgot();
    });

    document.getElementById("goLogin")?.addEventListener("click", e => {
        e.preventDefault();
        showLogin();
    });

    document.getElementById("backLogin")?.addEventListener("click", e => {
        e.preventDefault();
        showLogin();
    });

    // ===============================
    // USUÁRIOS (localStorage)
    // ===============================

    function getUsers() {
        return JSON.parse(localStorage.getItem("hs_users") || "[]");
    }

    function saveUsers(users) {
        localStorage.setItem("hs_users", JSON.stringify(users));
    }

    function getLoggedUser() {
        return JSON.parse(localStorage.getItem("hs_logged") || "null");
    }

    function setLoggedUser(user) {
        localStorage.setItem("hs_logged", JSON.stringify(user));
    }

    function logoutUser() {
        localStorage.removeItem("hs_logged");
        updateLoginBtn();
    }

    // Atualiza botão de login/logout na navbar
    function updateLoginBtn() {
        const user = getLoggedUser();
        if (user) {
            loginBtn.textContent = `Olá, ${user.name.split(" ")[0]}`;
            loginBtn.title = "Clique para sair";
            loginBtn.onclick = e => {
                e.preventDefault();
                if (confirm("Deseja sair da sua conta?")) logoutUser();
            };
        } else {
            loginBtn.textContent = "Login";
            loginBtn.title = "";
            loginBtn.onclick = e => {
                e.preventDefault();
                openModal();
            };
        }
    }

    updateLoginBtn();

    // ===============================
    // LOGIN
    // ===============================

    const loginBtn_form = loginForm?.querySelector("button");

    loginBtn_form?.addEventListener("click", () => {
        const [emailInput, passwordInput] = loginForm.querySelectorAll("input");
        const email = emailInput.value.trim();
        const password = passwordInput.value;

        if (!email || !password) {
            showMessage(loginForm, "Preencha todos os campos.");
            return;
        }

        const users = getUsers();
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            showMessage(loginForm, "Email ou senha incorretos.");
            return;
        }

        setLoggedUser({ name: user.name, email: user.email });
        updateLoginBtn();
        showMessage(loginForm, `Bem-vindo(a), ${user.name.split(" ")[0]}! 🎉`, "success");

        setTimeout(() => {
            closeModal();
            emailInput.value = "";
            passwordInput.value = "";
        }, 1500);
    });

    // ===============================
    // CADASTRO
    // ===============================

    const registerBtn = registerForm?.querySelector("button");

    registerBtn?.addEventListener("click", () => {
        const [nameInput, emailInput, passwordInput, confirmInput] =
            registerForm.querySelectorAll("input");

        const name     = nameInput.value.trim();
        const email    = emailInput.value.trim();
        const password = passwordInput.value;
        const confirm  = confirmInput.value;

        if (!name || !email || !password || !confirm) {
            showMessage(registerForm, "Preencha todos os campos.");
            return;
        }

        if (name.length < 3) {
            showMessage(registerForm, "Nome muito curto.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMessage(registerForm, "Informe um email válido.");
            return;
        }

        if (password.length < 6) {
            showMessage(registerForm, "A senha deve ter pelo menos 6 caracteres.");
            return;
        }

        if (password !== confirm) {
            showMessage(registerForm, "As senhas não coincidem.");
            return;
        }

        const users = getUsers();

        if (users.find(u => u.email === email)) {
            showMessage(registerForm, "Este email já está cadastrado.");
            return;
        }

        users.push({ name, email, password });
        saveUsers(users);

        showMessage(registerForm, "Conta criada com sucesso! Faça login. ✅", "success");

        setTimeout(() => {
            [nameInput, emailInput, passwordInput, confirmInput]
                .forEach(i => i.value = "");
            showLogin();
        }, 2000);
    });

    // ===============================
    // RECUPERAR SENHA
    // ===============================

    const forgotBtn = forgotForm?.querySelector("button");

    forgotBtn?.addEventListener("click", () => {
        const emailInput = forgotForm.querySelector("input");
        const email = emailInput.value.trim();

        if (!email) {
            showMessage(forgotForm, "Informe seu email.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMessage(forgotForm, "Informe um email válido.");
            return;
        }

        const users = getUsers();
        const user = users.find(u => u.email === email);

        // Mensagem genérica por segurança (não revela se o email existe)
        if (!user) {
            showMessage(
                forgotForm,
                "Se este email estiver cadastrado, você receberá as instruções. 📧",
                "success"
            );
            return;
        }

        // Gera nova senha temporária
        const newPassword = Math.random().toString(36).slice(-8);
        user.password = newPassword;
        saveUsers(users);

        showMessage(
            forgotForm,
            `Nova senha temporária: ${newPassword} — anote e altere após o login.`,
            "success"
        );

        emailInput.value = "";
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

        const filtered = products.filter(p => normalize(p.name).includes(query));

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