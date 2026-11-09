document.addEventListener("click", function (event) {

    const bouton = event.target.closest("#btnDeconnexion");

    if (bouton) {

        event.preventDefault();

        const confirmer = confirm(
            "Voulez-vous vraiment vous déconnecter ?"
        );

        if (confirmer) {

            localStorage.removeItem("sessionUtilisateur");

            window.location.href = "connexion.html";

        }

    }

});
// 1. Récupération des éléments HTML

const cartes = [
    { cle: "equipements", id: "equipementsCount" },
    { cle: "interventions", id: "interventionsCount" },
    { cle: "logiciels", id: "logicielsCount" }
];

// 2. Récupération des données

function recupererDonnees(cle) {
    return JSON.parse(localStorage.getItem(cle)) || [];
}

// 3. Mise à jour des cartes
for (let i = 0; i < cartes.length; i++) {

    const donnees = recupererDonnees(cartes[i].cle);
    const element = document.querySelector("#" + cartes[i].id);

    if (element) {
        element.textContent = donnees.length;
    }

        }
