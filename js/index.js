document.addEventListener("DOMContentLoaded", function() {
    // Réinitialisation du score pour chaque thématique
    const themes = ['yeux', 'pieds', 'oreilles', 'nombrils', 'mains', 'bouches']; // Liste des thématiques
    themes.forEach(theme => {
        localStorage.removeItem(`score_${theme}`); // Supprime le score de chaque thématique
    });

    // Affiche dans la console que les scores ont été réinitialisés
    console.log('Scores réinitialisés.');
});
