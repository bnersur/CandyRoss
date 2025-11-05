// =======================================================
// LÓGICA DE CONTROLES DE ÁUDIO
// =======================================================
function setupAudioControls() {
    const audio = document.getElementById('gameAudio');
    const volumeSlider = document.getElementById('volumeSlider');
    const muteToggle = document.getElementById('muteToggle');
    const playBtn = document.getElementById('play-btn');

    if (!audio) return; // Sai se o áudio não existir

    // Inicializa volume e estado mute
    audio.volume = 0.5;   // valor inicial
    audio.muted = true;   // começa mutado para autoplay
    if (volumeSlider) volumeSlider.value = audio.volume; // slider 0-1
    if (muteToggle) muteToggle.checked = audio.muted;

    // Tenta tocar o áudio
    audio.play().catch(() => {
        console.log("Autoplay falhou. O usuário deve interagir para desmutar.");
    });

    // Slider de volume
    if (volumeSlider) {
        volumeSlider.addEventListener('input', function() {
            audio.volume = parseFloat(this.value); // valor entre 0 e 1
            if (audio.volume > 0) {
                audio.muted = false;
                if (muteToggle) muteToggle.checked = false;
            } else {
                audio.muted = true;
                if (muteToggle) muteToggle.checked = true;
            }
        });
    }

    // Botão de mute
    if (muteToggle) {
        muteToggle.addEventListener('change', function() {
            audio.muted = this.checked;
            if (!this.checked && audio.volume === 0) {
                audio.volume = 0.5;
                if (volumeSlider) volumeSlider.value = 0.5;
            }
        });
    }

    // Botão Play da tela inicial
    if (playBtn) {
        playBtn.addEventListener('click', () => {
            if (audio.muted) {
                audio.muted = false;
                if (muteToggle) muteToggle.checked = false;
            }
            audio.play().catch(e => console.log("Erro ao tocar após desmutar:", e));
        }, { once: true });
    }
}

// Chame no final de startGame()
setupAudioControls();
