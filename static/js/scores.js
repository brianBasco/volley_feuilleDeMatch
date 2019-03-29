// Prog orientée Objet :///////////////////////////////////::
var Equipe = function(nbre){

    //attributs :
    this.equipe;
    this.nbre = nbre;
    this.joueurs = [];
    this.nom = "";
    
    this.initJoueurs = function() {
            for (let i = 0; i < this.nbre; i++) {
                let joueur = new Joueur("", "");
                this.joueurs.push(joueur);
            }
        };
        
    this.setNomJoueur = function(blur) {
            let index = blur.target.index;
            this.joueurs[index].nom = blur.target.value;
            console.log(this.joueurs[index]);
        };

    this.setNom = function(input) {
            this.nom = input.target.value;
            console.log("setNom = " + this.nom);
        };
    
    this.setLicence = function(blur) {
        let index = blur.target.index;
        this.joueurs[index].licence = blur.target.value;
        console.log(this.joueurs[index]);
    }

    this.supprJoueur = function(click) {
        let index = click.target.index;
        let joueur = this.joueurs[index];
        joueur.licence = "";
        joueur.nom = "";
        
        //affichage dans le DOM
        this.render(joueur, index);
    }

    this.render = function(joueur, index) {
        let joueurs = document.getElementsByClassName("noms")[this.equipe];
        joueurs.getElementsByClassName("nom")[index].value = joueur.nom;
        joueurs.getElementsByClassName("licence")[index].value = joueur.licence;
    }
    //implémenter fonctions trier, suppr
}


class Joueur {
    constructor(nom, licence) {
        this.nom = nom;
        this.licence = licence;
    }
}

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

var equipes;


window.addEventListener("load", function(event) {
    console.log("loaded");

    equipes = [new Equipe(12), new Equipe(12)];

    equipes.forEach(function(equipe, index) {
        equipe.equipe = index;
        equipe.initJoueurs();
        console.log("joueurs initialisés");
        equipe.nom = "equipe" + index;
    });

    let noms = document.getElementsByClassName("noms");

    //CORRIGER DANS LE dOM pour visiblité, mettre class joueurs à la place de noms
    //Events Listener por les inputs de noms
    for(let i = 0; i<noms.length; i++) {
        let nom = noms[i].getElementsByClassName("nom");
            for(let j = 0; j<nom.length; j++) {
                nom[j].index = j;
                nom[j].addEventListener("blur", equipes[i].setNomJoueur.bind(equipes[i]));
            }
    }

    //Events Listener por les inputs des numéros de licence
     //Events Listener por les boutons supprimmer
    for(let i = 0; i<noms.length; i++) {
        let licences = noms[i].getElementsByClassName("licence");
        let btns = noms[i].getElementsByClassName("suppr");
            for(let j = 0; j<licences.length; j++) {                
                licences[j].index = j;
                btns[j].index = j;
                licences[j].addEventListener("blur", equipes[i].setLicence.bind(equipes[i]));
                btns[j].addEventListener("click", equipes[i].supprJoueur.bind(equipes[i]));
            }
    }

    document.getElementById("nomA").addEventListener("blur", equipes[0].setNom.bind(equipes[0]));
    document.getElementById("nomB").addEventListener("blur", equipes[1].setNom.bind(equipes[1]));

    //essais de binding avec boutons suppr
    //fin POO ------------------------

    /*  Prog Imperative
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
    //Fin prog imérative
    */
})

/*
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

*/

  