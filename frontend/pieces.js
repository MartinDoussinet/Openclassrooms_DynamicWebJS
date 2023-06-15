/*  ______________________________________________
    Récupération des pièces depuis le fichier JSON
    ______________________________________________  */

const reponse = await fetch("pieces-autos.json");
const pieces = await reponse.json()

/*  ________________________________
    Création des différentes balises
    ________________________________    */


for (let i = 0; i < pieces.length; i++) {
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
