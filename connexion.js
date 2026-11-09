// 1. Récupérer les comptes enregistrés
let comptes = JSON.parse(localStorage.getItem("comptes")) || [];

// 2. Afficher ou masquer le mot de passe
togglePassword.addEventListener("click", function () {
    if (motDePasse.type === "password") {
        motDePasse.type = "text";
        togglePassword.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
    } else {
        motDePasse.type = "password";
        togglePassword.innerHTML = '<i class="fa-solid fa-eye"></i>';
    }
});

// 3. Vérifier la connexion ou créer un compte
loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    messageErreur.textContent = "";

    const identifiantSaisi = identifiant.value.trim();
    const motDePasseSaisi = motDePasse.value;

    // Rechercher l'identifiant
    const compteTrouve = comptes.find(function (compte) {
        return compte.identifiant === identifiantSaisi;
    });

    if (compteTrouve) {

        // Vérifier le mot de passe
        if (compteTrouve.motDePasse === motDePasseSaisi) {

            localStorage.setItem(
                "sessionUtilisateur",
                JSON.stringify(compteTrouve)
            );

            alert("Connexion réussie !");
            window.location.href = "index.html";

        } else {
            messageErreur.textContent = "Mot de passe incorrect.";
        }

    } else {

        // Créer un nouveau compte
        const nouveauCompte = {
            identifiant: identifiantSaisi,
            motDePasse: motDePasseSaisi,
        };

        comptes.push(nouveauCompte);

        localStorage.setItem("comptes", JSON.stringify(comptes));

        localStorage.setItem(
            "sessionUtilisateur",
            JSON.stringify(nouveauCompte)
        );

        alert("Compte créé avec succès !");
        window.location.href = "index.html";
    }
});