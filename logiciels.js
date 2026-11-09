// 1. RÉCUPÉRATION DES ÉLÉMENTS HTML

const formulaire = document.querySelector("logicielform");

const nomInput = document.querySelector("#nom");
const versionInput = document.querySelector("#version");
const categorieInput = document.querySelector("#categorie");
const editeurInput = document.querySelector("#editeur");
const typeLicenceInput = document.querySelector("#typeLicence");
const nombreLicencesInput = document.querySelector("#nombreLicences");
const dateAchatInput = document.querySelector("#dateAchat");
const dateExpirationInput = document.querySelector("#dateExpiration");

const logicielsTable = document.querySelector("#logicielsTable");
const emptyMessage = document.querySelector("#emptyMessage");


// 2. RÉCUPÉRATION DES LOGICIELS

function recupererLogiciels() {

    return JSON.parse(localStorage.getItem("logiciels")) || [];

}


// 3. ENREGISTREMENT DU FORMULAIRE
// 1. Gérer l'ajout et la modification des logiciels

if (formulaire) {

    // Préparer le formulaire de modification
    const idLogicielAModifier = localStorage.getItem("logicielAModifier");

    if (idLogicielAModifier) {
        const logiciels = recupererLogiciels();

        const logiciel = logiciels.find(function (element) {
            return element.id === Number(idLogicielAModifier);
        });

        if (logiciel) {
            nomInput.value = logiciel.nom;
            versionInput.value = logiciel.version;
            categorieInput.value = logiciel.categorie;
            editeurInput.value = logiciel.editeur;
            typeLicenceInput.value = logiciel.typeLicence;
            nombreLicencesInput.value = logiciel.nombreLicences;
            dateAchatInput.value = logiciel.dateAchat;
            dateExpirationInput.value = logiciel.dateExpiration;
        }
    }

    formulaire.addEventListener("submit", function (event) {
        event.preventDefault();

        // 1. Récupération des données
        const nom = nomInput.value.trim();
        const version = versionInput.value.trim();
        const categorie = categorieInput.value;
        const editeur = editeurInput.value.trim();
        const typeLicence = typeLicenceInput.value;
        const nombreLicences = nombreLicencesInput.value;
        const dateAchat = dateAchatInput.value;
        const dateExpiration = dateExpirationInput.value;

        // 2. Vérification des données
        if (nom === "" || editeur === "") {
            alert("Veuillez remplir les champs obligatoires.");
            return;
        }

        if (nombreLicences === "" || Number(nombreLicences) < 1) {
            alert("Le nombre de licences doit être supérieur à 0.");
            return;
        }

        if (dateAchat !== "" && dateExpiration !== "" && dateExpiration < dateAchat) {
            alert("La date d'expiration doit être après la date d'achat.");
            return;
        }

        // 3. Création de l'objet logiciel
        const logiciel = {
            id: 0,
            nom: nom,
            version: version,
            categorie: categorie,
            editeur: editeur,
            typeLicence: typeLicence,
            nombreLicences: Number(nombreLicences),
            dateAchat: dateAchat,
            dateExpiration: dateExpiration
        };

        // 4. Récupération des logiciels enregistrés
        let logiciels = recupererLogiciels();

        // 5. Vérifier si nous sommes en mode modification
        const idLogicielAModifier = localStorage.getItem("logicielAModifier");

        if (idLogicielAModifier) {

            // Chercher le logiciel à modifier
            const index = logiciels.findIndex(function (element) {
                return element.id === Number(idLogicielAModifier);
            });

            // Vérifier si le logiciel existe
            if (index !== -1) {

                // Garder le même identifiant
                logiciel.id = logiciels[index].id;

                // Remplacer l'ancien logiciel
                logiciels[index] = logiciel;

                alert("Logiciel modifié avec succès !");

            }
            // Supprimer le mode modification
            localStorage.removeItem("logicielAModifier");

        } else {

            // Mode ajout : donner un nouvel ID
            let nouvelId = 1;

            for (let i = 0; i < logiciels.length; i++) {
                if (logiciels[i].id >= nouvelId) {
                    nouvelId = logiciels[i].id + 1;
                }
            }

            logiciel.id = nouvelId;

            // Ajouter le nouveau logiciel
            logiciels.push(logiciel);

            alert("Logiciel ajouté avec succès !");
        }

        // 6. Enregistrer les logiciels dans localStorage
        localStorage.setItem("logiciels", JSON.stringify(logiciels));

        // 7. Réinitialiser le formulaire
        formulaire.reset();

        // 8. Retourner à la liste des logiciels
        window.location.href = "logicieliste.html";
    });
}


// 4. AFFICHAGE DES LOGICIELS

function afficherLogiciels(liste) {

    if (!logicielsTable) {
        return;
    }

    logicielsTable.innerHTML = "";

    liste.forEach(function (logiciel) {

        // Vérifier le statut de la licence

        let statut = "Active";

        const aujourdHui = new Date().toISOString().split("T")[0];

        if (logiciel.dateExpiration !== "" && logiciel.dateExpiration < aujourdHui) {

            statut = "Expirée";

        }

        // Créer une ligne dans le tableau

        const ligne = document.createElement("tr");

        ligne.innerHTML = `

            <td>${logiciel.nom}</td>
            <td>${logiciel.version || "-"}</td>
            <td>${logiciel.categorie}</td>
            <td>${logiciel.editeur}</td>
            <td>${logiciel.typeLicence} (${logiciel.nombreLicences})</td>
            <td>${logiciel.dateExpiration || "-"}</td>
            <td>${statut}</td>

            <td>
                <button class="edit" data-id="${logiciel.id}">
                    Modifier
                </button>

                <button class="delete" data-id="${logiciel.id}">
                    Supprimer
                </button>
            </td>

        `;

        logicielsTable.appendChild(ligne);

    });

    // Vérifier si la liste est vide

    if (emptyMessage) {

        emptyMessage.style.display = liste.length === 0 ? "block" : "none";

    }

}


// Afficher les logiciels au chargement de la page

if (logicielsTable) {

    afficherLogiciels(recupererLogiciels());

}


// 5. SUPPRIMER UN LOGICIEL

function supprimerLogiciel(id) {

    const confirmation = confirm("Voulez-vous vraiment supprimer ce logiciel ?");

    if (!confirmation) {
        return;
    }

    let logiciels = recupererLogiciels();

    logiciels = logiciels.filter(function (logiciel) {

        return logiciel.id !== Number(id);

    });

    localStorage.setItem("logiciels", JSON.stringify(logiciels));

    afficherLogiciels(logiciels);

    alert("Logiciel supprimé avec succès !");

}


// 6. GÉRER LES ACTIONS DU TABLEAU

if (logicielsTable) {

    logicielsTable.addEventListener("click", function (event) {

        // Modifier un logiciel

        if (event.target.classList.contains("edit")) {

            const id = event.target.dataset.id;

            localStorage.setItem("logicielAModifier", id);

            window.location.href = "logicielajout.html";

        }

        // Supprimer un logiciel

        if (event.target.classList.contains("delete")) {

            const id = event.target.dataset.id;

            supprimerLogiciel(id);

        }

    });

}