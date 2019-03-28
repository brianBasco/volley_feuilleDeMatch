equipeTalence = {
    joueurs : []
};

JoueursTalence = [
                    ["MEYNARD Stephane", 00000],
                    ["BAGET Marie", 00000],
                    ["PINET Seb", 00000],
                    ["COYOT Benjamin", 00000],
                    ["VEBER Erci", 00000],
                    ["DABLEMONT Julien", 0000],
                    ["DE BAILLANCOURT Ségolène", 0000],
                    ["DUMONT Jérémy", 0000],
                ]
//boucle
JoueursTalence.forEach(joueur => {
    JoueurTalence = new Object();
    JoueurTalence.nom = joueur[0];
    JoueurTalence.licence = joueur[1];
    equipeTalence.joueurs.push(JoueurTalence);
});




window.addEventListener("load", function(event) {
    console.log("loaded");
    calculerTotaux();

    let inputs = document.getElementById("scores").getElementsByTagName("input");
    
    for(let i = 0; i<inputs.length; i++) {
        inputs[i].addEventListener("blur", calculerTotaux);
    }

    //à refactoriser en tab["A","B"];
    let EquipeA = document.getElementsByClassName("nomsA")[0];
    let btnssupprEquipeA = EquipeA.getElementsByClassName("suppr");
    for(let i = 0; i<btnssupprEquipeA.length; i++) {
        //btnssupprEquipeA[i].setAttribute("equipe", "A");
        btnssupprEquipeA[i].equipe =  "A";
        btnssupprEquipeA[i].addEventListener("click", supprimerJoueur);
    }

    //PréRemplissage de notre équipe
    preRemplissage("A");
})

function calculerTotaux() {
    let tab = ["A", "B"];
  
    for(let i = 0; i<tab.length; i++) {
        let lettre = tab[i];
        let score = 0;
        let inputs = document.getElementsByClassName("score" + lettre);
        for(let j = 0; j<inputs.length; j++) {
            let s = parseInt(inputs[j].value);
            if(!isNaN(s)) score += s;
        }
        inscrireTotal("total" + lettre, score);
    }

    
}

function inscrireTotal(input, total) {
    document.getElementById(input).innerHTML = total;
    
}

function trier(tableau) {
        
    let triParNom = tableau.slice(0);
    triParNom.sort(function(a,b) {
        let x = a.nom.toLowerCase();
        var y = b.nom.toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
    });

    return triParNom;
}

function insererJoueurs(lettre) {

    let tab;

    let noms = document.getElementsByClassName("noms" + lettre)[0];
    let nom = noms.getElementsByClassName("nom");
    let licence = noms.getElementsByClassName("licence");

    //insertion dans un tableau des objets joueurs : nom,licence
    let arrayOfObjects = [];
    for(let i = 0;i<nom.length; i++) {
        if(nom[i].value != "") arrayOfObjects.push({nom: nom[i].value, licence: licence[i].value});
    }

    console.log(arrayOfObjects);

    //tri des joueurs par nom
    tab =  trier(arrayOfObjects);

    console.log(tab);

    //insertion dans le DOM des joueurs
    //stop pour dire quand mettre des "" car le tableau trié est 
    //généralement + petit que le nombre d'inputs
    for(let i = 0;i<nom.length; i++) {
        let stop = tab.length;
        if(i<stop) {
            nom[i].value = tab[i].nom;
            licence[i].value = tab[i].licence;
        }
        else {
            nom[i].value = "";
            licence[i].value = "";
        }
        
    }
}

function reinitialiserJoueurs() {

    let tab = ["A", "B"];

    tab.forEach(lettre => {
        let noms = document.getElementsByClassName("noms" + lettre )[0];
        let nom = noms.getElementsByClassName("nom");
        let licence = noms.getElementsByClassName("licence");

        for(let i = 0;i<nom.length; i++) {
            nom[i].value = "";
            licence[i].value = "";
            //if(nom[i].value != undefined) tab.push(nom[i].value);
        }
    });
}

//remet "" dans le nom et le numéro de licence
function supprimerJoueur(objet) {

    let lettre = objet.target.equipe;
    let no = objet.target.getAttribute("data-suppr");
    let equipe = document.getElementById("noms" + lettre);

    equipe.getElementsByClassName("nom")[no].value = "";
    equipe.getElementsByClassName("licence")[no].value = "";
}

function preRemplissage(lettre) {
    
    let noms = document.getElementsByClassName("noms" + lettre)[0];
    let nom = noms.getElementsByClassName("nom");
    let licence = noms.getElementsByClassName("licence");

    let tab = equipeTalence.joueurs;
     //insertion dans le DOM des joueurs
     for(let i = 0;i<tab.length; i++) {
        nom[i].value = tab[i].nom;
        licence[i].value = tab[i].licence;
        
    }
}