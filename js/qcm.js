document.addEventListener("DOMContentLoaded", function() {
    // Lecture des paramètres d'URL pour déterminer la thématique
    const urlParams = new URLSearchParams(window.location.search);
    const theme = urlParams.get('theme');
  
    // Vérification de la page actuelle pour appliquer la logique appropriée
    if (window.location.pathname.includes("qcm.html")) {
      initializeQCMPage(theme);
    }
});

// Fonction pour initialiser la page de QCM en fonction du thème sélectionné
function initializeQCMPage(theme) {
    // Récupération des données pour la thématique choisie
    const themeData = data[theme];

    if (!themeData) {
        console.error("Thématique non valide.");
        return;
    }

    const correctImage = themeData.correct;
    const wrongImages = themeData.wrong;
    let attempts = 0;
    let correctAttempts = 0;
    let gameOver = false;  // Variable pour vérifier si le jeu est terminé

    // Fusion des images correctes et incorrectes, puis mélange
    const allImages = [correctImage, ...wrongImages];
    shuffle(allImages);

    const imagesContainer = document.getElementById("image-container");
    imagesContainer.innerHTML = ''; // Vide le conteneur avant d'ajouter les nouvelles images

    // Affichage des images dans le conteneur
    allImages.forEach(imageData => {
        const imgElement = document.createElement('img');
        imgElement.src = imageData.src;
        imgElement.alt = imageData.name;
        imgElement.classList.add('qcm-image');
        imgElement.setAttribute('data-name', imageData.name);
        imgElement.setAttribute('data-correct', imageData === correctImage);
        imagesContainer.appendChild(imgElement);
    });

    // Écoute de l'événement click sur les images
    imagesContainer.addEventListener('click', function(event) {
        if (event.target.tagName === 'IMG' && !gameOver) {
            const clickedImage = event.target;
            const isCorrect = clickedImage.getAttribute('data-correct') === 'true';
            const name = clickedImage.getAttribute('data-name');

            if (isCorrect) {
                clickedImage.classList.add('correct');
                showOverlay(correctImage.src, 'Bravo !', true);
                correctAttempts++;
                gameOver = true;  // Marquer la fin du jeu une fois la bonne réponse donnée
            } else {
                clickedImage.classList.add('incorrect');
                attempts++;
                showMessage(`Faux, c'est ${name}`, 'red');
            }

            // Mise à jour du score dans localStorage à chaque tentative
            let numberOfImages = allImages.length;
            localStorage.setItem(`score_${theme}`, `${correctAttempts + attempts}/${numberOfImages}`);

            // Vérifier que la fonction updateThemeScores existe avant de l'appeler
            if (typeof updateThemeScores === 'function') {
                updateThemeScores(); // Met à jour l'affichage du score sur la page `thematique.html`
            }
        }
    });

    // Fonction d'affichage de l'overlay
    function showOverlay(imageSrc, message, isCorrect) {
        const overlay = document.getElementById('overlay');
        overlay.classList.remove('qcm-hidden');
        
        const overlayImage = document.getElementById('overlay-image');
        overlayImage.src = imageSrc;

        const overlayText = overlay.querySelector('.qcm-overlay-content h2');
        overlayText.textContent = message;
        overlayText.style.color = isCorrect ? 'green' : 'red';

        const button = overlay.querySelector('.return-button');
        button.onclick = function() {
            window.location.href = 'thematique.html'; // Retour à la page des thématiques
        };

        document.getElementById('close-overlay').addEventListener('click', function() {
            overlay.classList.add('qcm-hidden');
        });
    }

    // Fonction d'affichage des messages
    function showMessage(message, color) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('qcm-message');
        messageElement.textContent = message;
        messageElement.style.color = color;
        document.body.appendChild(messageElement);
        setTimeout(() => messageElement.remove(), 3000);
    }
}

// Fonction pour mélanger les éléments d'un tableau
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
