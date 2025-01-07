const clock = document.querySelector('.clock');

// Ajouter dynamiquement les graduations
for (let i = 0; i < 60; i++) {
    const grad = document.createElement('div');
    grad.classList.add('graduation');

    if (i % 5 === 0) {
        grad.classList.add('large');
        grad.setAttribute('data-time', i);

        if (i % 10 === 0) {
            grad.style.fontSize = '18px';
        } else {
            grad.style.fontSize = '14px';
        }
    } else {
        grad.classList.add('small');
    }

    grad.style.transform = `rotate(${i * 6}deg)`;
    clock.appendChild(grad);
}

// Référencer les aiguilles
const redHand = document.getElementById('red-hand');
const blueHand = document.getElementById('blue-hand');
const greenHand = document.getElementById('green-hand');
const yellowHand = document.getElementById('yellow-hand');

// Référencer le bouton Reset
const resetButton = document.getElementById('reset-button');

// Initialiser les variables
let intervalId; // ID de l'intervalle global
let resetTime = 0; // Variable pour stocker l'heure de départ après le Reset

// Mettre à jour la position des aiguilles
function updateClock() {
    const now = new Date();
    const elapsed = (now - resetTime) / 1000; // Temps écoulé depuis le dernier Reset, en secondes

    // Calcul des angles pour chaque aiguille
    const redAngle = (elapsed % 60) * 6; // Chaque seconde = 6°
    const blueAngle = ((elapsed + 15) % 60) * 6; // Décalée de 15s
    const greenAngle = ((elapsed + 30) % 60) * 6; // Décalée de 30s
    const yellowAngle = ((elapsed + 45) % 60) * 6; // Décalée de 45s

    // Appliquer les transformations aux aiguilles
    redHand.style.transform = `translate(-50%, -100%) rotate(${redAngle}deg)`;
    blueHand.style.transform = `translate(-50%, -100%) rotate(${blueAngle}deg)`;
    greenHand.style.transform = `translate(-50%, -100%) rotate(${greenAngle}deg)`;
    yellowHand.style.transform = `translate(-50%, -100%) rotate(${yellowAngle}deg)`;
}

// Ajouter l'événement Reset
resetButton.addEventListener('click', () => {
    clearInterval(intervalId); // Arrête l'intervalle actuel
    console.log('Chronomètre arrêté.');

    // Réinitialiser l'heure de départ
    resetTime = new Date(); // Met à jour la base de temps pour commencer à zéro

    // Réinitialiser les positions des aiguilles
    redHand.style.transform = `translate(-50%, -100%) rotate(0deg)`;
    blueHand.style.transform = `translate(-50%, -100%) rotate(90deg)`; // 15s -> 90°
    greenHand.style.transform = `translate(-50%, -100%) rotate(180deg)`; // 30s -> 180°
    yellowHand.style.transform = `translate(-50%, -100%) rotate(270deg)`; // 45s -> 270°

    console.log('Aiguilles réinitialisées.');

    // Redémarrer le chronomètre avec une nouvelle base de temps
    intervalId = setInterval(updateClock, 10);
    console.log('Chronomètre redémarré.');
});

// Initialiser le chronomètre au chargement
resetTime = new Date(); // La base de temps initiale est l'heure actuelle
intervalId = setInterval(updateClock, 10);
