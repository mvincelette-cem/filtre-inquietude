let badWordsEng;
let badWordsFr;

//-----------------
//Champs qui contiendra les mots envoyés par l'utilisateur
//-----------------

let textField = document.getElementById("mots");
let textUser;

//-----------------
//Chercher les fichier JSON qui contiennent les nombreux mots qu'on souhaite éviter dans notre projet
//-----------------

fetch("./badWordsEnglish.json").then(results => results.json().then(data => ({
        data: data,
        status: results.status
    })
).then(res => {
    badWordsEng = res.data
}));
fetch("./badWordsFrench.json").then(results => results.json().then(data => ({
        data: data,
        status: results.status
    })
).then(resu => {
    badWordsFr = resu.data
}));

//-----------------
//Ajouter un écouteur sur le bouton qui envoit les mots/ le formulaire
//-----------------

document.querySelector('.bouton').addEventListener('click', e => {

    //Recueillir le(s) mot(s) entré(s)
    textUser = textField.value;
        
    //-----------
    //En javascript, on peut vérifier des tableaux en utilisant «.some», qui filtre à travers chaque élément du tableau.
    //Chaque mot est ensuite converti en minuscule pour éviter d'avoir à filtrer toutes les variantes des mots incluant les majuscules.
    //Si ce mot ou un des mots soumis est équivalent à un mot contenu dans le fichier json, la boucle retourne «Vrai».
    //-----------

    let filtreAnglais = badWordsEng.some(word => {
        if (textUser.toLowerCase() === word) return true;
    });
    let filtreFrancais = badWordsFr.some(word => {
        if (textUser.toLowerCase() === word) return true;
    });

    //-----------------
    //Si l'un des filtre (anglais ou français) retourne «Vrai», une alerte se lance indiquant à l'utilisateur de ne pas utiliser ce mot.
    //-----------------

    if (filtreAnglais || filtreFrancais) {
        alert('Pas de mauvais mots, s.v.p')
    } 
    else {
    //Insérez le code que vous désirez exécuter, par exemple:
    //En utilisant Ajax, on envoit les informations nécéssaire à un script en PHP qui ajoutera le(s) mot(s) au fichier JSON concerné  
    
     $.ajax({
                    url: "gfg.php",    //La page contenant le script PHP
                    type: "post",    //le type de requête,
                    dataType: 'json', //le type de fichier
                    data: {mots: textUser}, //l'information envoyée
                    success: function (result) {
                        console.log(result);
                    }
                });
    }
}
