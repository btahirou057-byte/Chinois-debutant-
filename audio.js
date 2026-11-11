let voixChinoise = null;
let audioEnCours = null;

function chargerVoix() {
  if (!('speechSynthesis' in window)) return;
  const voix = speechSynthesis.getVoices();
  voixChinoise =
    voix.find(v => v.lang === 'zh-CN') ||
    voix.find(v => v.lang.startsWith('zh')) ||
    null;
}

if ('speechSynthesis' in window) {
  speechSynthesis.onvoiceschanged = chargerVoix;
  chargerVoix();
}

function parlerChinois(texte, vitesse = 0.9) {
  if (!('speechSynthesis' in window)) return;
  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(texte);
  utterance.lang = 'zh-CN';
  utterance.rate = vitesse;
  if (voixChinoise) utterance.voice = voixChinoise;
  speechSynthesis.speak(utterance);
}

function jouerMot(mot) {
  if (audioEnCours) {
    audioEnCours.pause();
    audioEnCours = null;
  }
  if ('speechSynthesis' in window) speechSynthesis.cancel();

  if (mot.audio && mot.audio.trim() !== "") {
    audioEnCours = new Audio(mot.audio);
    audioEnCours.play().catch(() => parlerChinois(mot.hanzi));
  } else {
    parlerChinois(mot.hanzi);
  }
      }
