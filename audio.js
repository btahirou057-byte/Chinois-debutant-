let voixChinoise = null;

function chargerVoix() {
  const voix = speechSynthesis.getVoices();
  voixChinoise = voix.find(v => v.lang === 'zh-CN') || voix.find(v => v.lang.startsWith('zh')) || null;
}
speechSynthesis.onvoiceschanged = chargerVoix;
chargerVoix();

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
  if (mot.audio && mot.audio.trim() !== "") {
    const audio = new Audio(mot.audio);
    audio.play().catch(() => parlerChinois(mot.hanzi));
  } else {
    parlerChinois(mot.hanzi);
  }
  }
