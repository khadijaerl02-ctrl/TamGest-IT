// Vérifier la session de l'utilisateur
const sessionUtilisateur = JSON.parse(
    localStorage.getItem("sessionUtilisateur")
);

if (!sessionUtilisateur) {
    window.location.href = "connexion.html";
}

