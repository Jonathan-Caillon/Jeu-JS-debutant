// Elements du DOM
const divVies = document.querySelector(".vies");
const message = document.getElementById("message");
const formulaire = document.getElementById("inputBox");
const input = document.getElementById("number");
const essayerBtn = document.getElementById("essayerBtn");
const rejouerBTn = document.getElementById("rejouer");
const body = document.getElementsByTagName("body")[0];
const label = document.getElementById("label");


// Modèle de coeurs

const coeurVide = '<i class="far fa-heart vide"></i>';
const coeurPlein = '<i class="fas fa-heart rempli"></i>';

//  Fond
const bgFroid = 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)';
const bgTiede = 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)';
const bgChaud = 'linear-gradient(120deg, #ff5858 0%, #f09819 100%)';
const bgBrulant = 'linear-gradient(120deg, #ff0844 0%, #ffb199 100%)';

const bgWin = 'linear-gradient(-225deg, #231557 0%, #44107A 29%, #FF1361 67%, #FFF800 100%)';
const bgLoose = 'linear-gradient(60deg, #29323c 0%, #485563 100%)';


// PLAY
const play = () => {

    // nombre aléatoire
    const randomNumber = Math.floor(Math.random() * 101);
    const totalVies = 6;
    let vies = totalVies;
    console.log(randomNumber)

    // Actualisation à chaque essai - TOUTE LA LOGIQUE

    formulaire.addEventListener("submit", (e) => {
        e.preventDefault();
        const valeurInput = parseInt(input.value); 

        if(valeurInput < 0 || valeurInput > 100) return;  // Arret de la fonction si < 0 ou > 100

        // En cas de victoire

        if(valeurInput === randomNumber){
            body.style.backgroundImage = bgWin;
            message.textContent = `BRAVO !!! Le nombre était bien ${randomNumber}`
            rejouerBTn.style.display = `block`;
            essayerBtn.setAttribute("disabled","")
            essayerBtn.style.display = "none";
            input.style.display = "none";
            label.style.display = "none";
            fiesta()
        }

        if(valeurInput !== randomNumber) {
            if(randomNumber < valeurInput + 3 && randomNumber > valeurInput - 3){   // SI brulant
                body.style.backgroundImage = bgBrulant;
                message.textContent = "C'est Brûlant !!! 🔥🔥🔥 ";
            }
            else if (randomNumber < valeurInput + 6 && randomNumber > valeurInput - 6){ // SI chaud
                body.style.backgroundImage = bgChaud;
                message.textContent = "C'est Chaud ! 🔥";
            }
            else if (randomNumber < valeurInput + 11 && randomNumber > valeurInput - 11){ // SI tiède
                body.style.backgroundImage = bgTiede;
                message.textContent = "C'est Tiède 😐";
            }
            else {
                body.style.backgroundImage = bgFroid; // autrement froid
                message.textContent = "C'est Froid ❄️";
            }
            vies --;        // Vie -1
            verifyLoose();  //  Vérifie les vies restantes
        }

        actualiseCoeurs(vies); // Met a jour le nombre de coeur restant
        
    })

    // Fonction Lors de la perte de la partie

    const verifyLoose = () => {
        if(vies === 0){
            body.style.backgroundImage = bgLoose;
            body.style.color = '#990000';
            essayerBtn.setAttribute("disabled","")
            message.textContent = `Vous avez perdu. La réponse était ${randomNumber}`;
            rejouerBTn.style.display = "block";
            essayerBtn.style.display = "none";
            input.style.display = "none";
            label.style.display = "none";
        }
    }

    // Fonction actualise les coeurs 

    const actualiseCoeurs = (vies) => {
        divVies.innerHTML = "";
        let tableauVies = [];
        for(let i = 0; i < vies; i++){
            tableauVies.push(coeurPlein)
        }
        for(let i = 0; i < totalVies - vies; i++){
            tableauVies.push(coeurVide)
        }
        tableauVies.forEach(coeur => {
            divVies.innerHTML += coeur;
        })
    }
    actualiseCoeurs(vies);

    // Refresh la page et faire disparaitre le bouton rejouer apres avoir cliquer sur rejouer

    rejouerBTn.addEventListener("click", () => {
        message.style.display = "none";
        document.location.reload(true);
    })

}
play();



// Confettis

const containerSlot = document.querySelector(".slot");

const emojis = ["✨","🎆","🎇","🎈"];

function fiesta() {

    for(let i = 0; i < 50; i++){
        const confetti = document.createElement("div");
        confetti.innerText = emojis[Math.floor(Math.random()* emojis.length)];
        containerSlot.appendChild(confetti)
    }

    animateConfettis();
    
}

function animateConfettis() {

    const TLCONF = gsap.timeline()

    TLCONF
    .to(".slot div", {
        y: "random(-100,100)",
        x: "random(-100,100)",
        z: "random(0,1000)",
        rotation: "random(-90,90)",
        duration: 1
    })
    .to(".slot div", {autoAlpha: 0, duration: 0.3},
    "-=0.2")
    .add(() => {
        containerSlot.innerHTML = "";
    })
}

