// 1. Créer les comptes s'ils n'existent pas

let comptes = JSON.parse(localStorage.getItem("comptes")) || [];

const comptesParDefaut = [
    {
        identifiant: "Mohammed Benamar",
        motDePasse: "Resp@123",
        role: "responsable",
        nom: "Responsable informatique"
    },
    {
        identifiant: "Youness Sidki",
        motDePasse: "Tech@123",
        role: "technicien",
        nom: "Technicien informatique"
    }
];

comptesParDefaut.forEach(function (nouveauCompte) {

    const compteExiste = comptes.some(function (compte) {
        return compte.identifiant === nouveauCompte.identifiant;
    });

    if (!compteExiste) {
        comptes.push(nouveauCompte);
    }

});

localStorage.setItem("comptes", JSON.stringify(comptes));



// 2. Afficher ou masquer le mot de passe
togglePassword.addEventListener("click", function () {
if (motDePasse.type === "password") {
motDePasse.type = "text";


    togglePassword.innerHTML =
        '<i class="fa-solid fa-eye-slash"></i>';
} else {
    motDePasse.type = "password";

    togglePassword.innerHTML =
        '<i class="fa-solid fa-eye"></i>';
}


});

// 3. Vérifier les informations de connexion
loginForm.addEventListener("submit", function (event) {
event.preventDefault();
messageErreur.textContent = "";

const identifiantSaisi = identifiant.value.trim();
const motDePasseSaisi = motDePasse.value;

const compteTrouve = comptes.find(function (compte) {
    return compte.identifiant === identifiantSaisi &&
           compte.motDePasse === motDePasseSaisi;
});

if (compteTrouve) {

    // Enregistrer le compte connecté
    localStorage.setItem(
        "sessionUtilisateur",
        JSON.stringify({
            identifiant: compteTrouve.identifiant,
            nom: compteTrouve.nom,
            role: compteTrouve.role
        })
    );

    // Ouvrir le tableau de bord
    window.location.href = "index.html";

} else {
    messageErreur.textContent =
        "Identifiant ou mot de passe incorrect.";
}


});
