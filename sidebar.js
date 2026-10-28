// Charger le sidebar
fetch("sidebar.html")
    .then(response => response.text())
    .then(data => {
        document.querySelector("#sidebar-container").innerHTML = data;

        const pageActuelle = location.pathname.split("/").pop() || "index.html";

        // Activer le lien de la page actuelle
        document.querySelectorAll("#sidebar-container .menu a").forEach(lien => {
            if (lien.getAttribute("href") === pageActuelle) {
                lien.classList.add("active");

                const parent = lien.closest(".menu-item");

                if (parent) {
                    parent.classList.add("open", "active-menu");
                    lien.classList.add("submenu-active");
                }
            }
        });

        // Ouvrir et fermer les sous-menus
        document.querySelectorAll("#sidebar-container .menu-item").forEach(item => {
            const lien = item.querySelector(":scope > a");

            lien.addEventListener("click", event => {
                event.preventDefault();

                if (!item.classList.contains("active-menu")) {
                    item.classList.toggle("open");
                }
            });
        });
    })
    .catch(erreur => console.error("Erreur :", erreur));
