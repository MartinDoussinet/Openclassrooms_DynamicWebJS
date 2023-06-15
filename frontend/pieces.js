/*  ______________________________________________
    Récupération des pièces depuis le fichier JSON
    ______________________________________________  */

const reponse = await fetch("pieces-autos.json");
const pieces = await reponse.json()

for (let i = 0; i < pieces.length; i++) {
    
    /*  ________________________________
        Création des différentes balises
        ________________________________    */
    
    const article = pieces[i];

    const imageElement = document.createElement("img");
    imageElement.src = article.image;

    const nomElement = document.createElement("h2");
    nomElement.innerText = article.nom;

    const prixElement = document.createElement("p");
    prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;

    const categorieElement = document.createElement("p");
    categorieElement.innerText = article.categorie ?? "(aucune catégorie)";

    //__________________________________________________________________________________________
    //Exercice P1C4 - Ajout de la description et du stock

    const descriptionElement = document.createElement("p");
    descriptionElement.innerText = article.description ?? "Pas de description pour le moment.";

    const stockElement = document.createElement("p");
    stockElement.innerText = article.disponibilité ? "En stock" : "Rupture de stock";
    //__________________________________________________________________________________________

    /*  ______________________________
        On rattache les balises au DOM
        ______________________________  */

    const sectionFiches = document.querySelector(".fiches");

    const pieceElement = document.createElement("article");
    sectionFiches.appendChild(pieceElement)

    pieceElement.appendChild(imageElement);
    pieceElement.appendChild(nomElement);
    pieceElement.appendChild(prixElement);
    pieceElement.appendChild(categorieElement);

    //____________________________________________________
    //Exercice P1C4 - Ajout de la description et du stock

    pieceElement.appendChild(descriptionElement);
    pieceElement.appendChild(stockElement);

    //____________________________________________________
}

/*  __________________________________
    Création des boutons de tri/filtre
    __________________________________  */

const btnTrierCroissant = document.querySelector(".btn-trier-croissant");
btnTrierCroissant.addEventListener("click", () => {
    const piecesOrdonees = Array.from(pieces)
    piecesOrdonees.sort(function (a,b) {
        return a.prix - b.prix;
    });
    console.log(pieces);
    console.log(piecesOrdonees);
});

const btnFiltrerPrix = document.querySelector(".btn-filtrer-prix");
btnFiltrerPrix.addEventListener("click", () => {
    const piecesFiltrees = pieces.filter(piece => piece.prix < 35);
    console.log(pieces);
    console.log(piecesFiltrees);
});

//____________________________________________________________________________________
//Exercice P2C1 - Ajouter le tri décroissant et le filtre des pièces sans description

const btnTrierDecroissant = document.querySelector(".btn-trier-decroissant");
btnTrierDecroissant.addEventListener("click", () => {
    const piecesOrdonees = Array.from(pieces)
    piecesOrdonees.sort(function (a,b) {
        return b.prix - a.prix;
    });
    console.log(pieces);
    console.log(piecesOrdonees);
});

const btnFiltrerDescription = document.querySelector(".btn-filtrer-description");
btnFiltrerDescription.addEventListener("click", () => {
    const piecesFiltrees = pieces.filter(piece => piece.description != undefined);
    console.log(pieces);
    console.log(piecesFiltrees);
});

//____________________________________________________________________________________


/*  _______________________________________
    Remplissage de la section 'fiches'
    _______________________________________    */

const nomsAbordables = pieces.map(piece => piece.nom);
for (let i = pieces.length - 1; i >= 0; i--) {
    if (pieces[i].prix > 35) {
        nomsAbordables.splice(i,1);
    };
};

const abordablesElements = document.createElement("ul");
for (let i = 0; i < nomsAbordables.length; i++) {
    const nomElement = document.createElement("li");
    nomElement.innerText = nomsAbordables[i];
    abordablesElements.appendChild(nomElement);
}

document.querySelector(".abordables").appendChild(abordablesElements);

//____________________________________________________________________
//Exercice P2C2 - Ajout des pièces disponibles avec leur prix

const nomsDisponibles = pieces.map(piece => piece.nom);
const prixDisponibles = pieces.map(piece => piece.prix);
for (let i = pieces.length - 1; i >= 0; i--) {
    if (!pieces[i].disponibilité) {
        nomsDisponibles.splice(i,1);
        prixDisponibles.splice(i,1);
    };
};

const disponiblesElements = document.createElement("ul");
for (let i = 0; i < nomsDisponibles.length; i++) {
    const nomElement = document.createElement("li");
    nomElement.innerText = `${nomsDisponibles[i]} - ${prixDisponibles[i]} €`;
    disponiblesElements.appendChild(nomElement);
}

document.querySelector(".disponibles").appendChild(disponiblesElements);

//____________________________________________________________________
