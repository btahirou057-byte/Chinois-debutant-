// On attend que la page soit chargée
document.addEventListener("DOMContentLoaded", () => {
  chargerLesMots();
});

async function chargerLesMots() {
  const conteneur = document.getElementById("liste-mots");
  if (!conteneur) return; // Si on n'est pas sur la bonne page, on ne fait rien

  try {
    // On va chercher le fichier mots.json
    const reponse = await fetch('mots.json');
    const mots = await reponse.json();

    conteneur.innerHTML = ""; // On nettoie

    // On boucle sur chaque mot pour créer une carte
    mots.forEach(mot => {
      const carte = document.createElement("div");
      carte.className = "carte-mot";

      // Le contenu de la carte (Chinois + Pinyin + FR + AR)
      carte.innerHTML = `
        <div class="hanzi">${mot.hanzi}</div>
        <div class="pinyin">${mot.pinyin}</div>
        <div class="traductions">
          <span>🇫🇷 ${mot.fr}</span>
          <span dir="rtl">🇸🇦 ${mot.ar}</span>
        </div>
      `;

      // On ajoute le bouton audio
      const boutonAudio = document.createElement("button");
      boutonAudio.className = "btn-audio";
      boutonAudio.textContent = "🔊 Écouter";
      boutonAudio.onclick = () => jouerMot(mot); // On utilise le fichier audio.js

      carte.appendChild(boutonAudio);
      conteneur.appendChild(carte);
    });

  } catch (erreur) {
    console.error("Erreur:", erreur);
    conteneur.innerHTML = "<p>Erreur de chargement des mots.</p>";
  }
}
