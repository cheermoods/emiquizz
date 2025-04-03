document.addEventListener("DOMContentLoaded", function() {
    initializeThematiquePage();
});

// Fonction pour initialiser la page des thématiques
function initializeThematiquePage() {
    const themeButtons = document.querySelectorAll(".theme-button");

    themeButtons.forEach(button => {
        const themeName = new URL(button.href).searchParams.get("theme");
        const scoreElement = button.querySelector(".theme-score");

        if (scoreElement) {
            // Récupérer le nombre total d'images pour ce thème depuis data.js
            const themeData = data[themeName];
            const totalImages = 1 + themeData.wrong.length;  // 1 image correcte + images incorrectes

            // Récupérer le score du localStorage ou mettre à zéro si aucune donnée
            const score = localStorage.getItem(`score_${themeName}`) || `0/${totalImages}`;

            // Mettre à jour l'affichage du score
            scoreElement.textContent = score;

            // Ajouter la classe 'done' si le score est différent de 0/totalImages
            const [correct, total] = score.split('/').map(Number); // Récupère les bonnes réponses et le total d'images
            if (correct > 0) {
                button.classList.add('done'); // Ajoute la classe 'done' si des bonnes réponses ont été données
            }
        }
    });
}

// Fonction pour mettre à jour les scores sur la page des thématiques
function updateThemeScores() {
    const themeButtons = document.querySelectorAll(".theme-button");

    themeButtons.forEach(button => {
        const themeName = new URL(button.href).searchParams.get("theme");
        const scoreElement = button.querySelector(".theme-score");

        if (scoreElement) {
            const themeData = data[themeName];
            if (!themeData) return; // Vérifie si le thème est valide

            const totalImages = 1 + themeData.wrong.length; // 1 correcte + incorrectes
            const score = localStorage.getItem(`score_${themeName}`) || `0/${totalImages}`;

            scoreElement.textContent = score;

            // Ajout de la classe 'done' si au moins une bonne réponse
            const [correct, total] = score.split('/').map(Number);
            if (correct > 0) {
                button.classList.add('done');
            }
        }
    });
}

// Rendre la fonction accessible à qcm.js
window.updateThemeScores = updateThemeScores;
