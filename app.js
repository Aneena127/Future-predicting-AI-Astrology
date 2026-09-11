/**
 * WrongAstrology AI - Main Application Controller
 * Handles UI animations, sound effects, text-to-speech, and interaction flow.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Generate Stars Background
    createStarfield();

    // DOM Elements
    const formSection = document.getElementById('form-section');
    const loadingSection = document.getElementById('loading-section');
    const resultSection = document.getElementById('result-section');
    const astrologyForm = document.getElementById('astrology-form');
    
    const userNameInput = document.getElementById('user-name');
    const dobInput = document.getElementById('dob');
    const questionInput = document.getElementById('question');
    const presetBtns = document.querySelectorAll('.preset-btn');
    
    const loadingStatus = document.getElementById('loading-status');
    const resTimestamp = document.getElementById('res-timestamp');
    const resZodiac = document.getElementById('res-zodiac');
    const resElement = document.getElementById('res-element');
    const resPlanet = document.getElementById('res-planet');
    const resVerdict = document.getElementById('res-verdict');
    const resPrediction = document.getElementById('res-prediction');
    const resNumber = document.getElementById('res-number');
    const resColor = document.getElementById('res-color');
    
    const copyBtn = document.getElementById('copy-btn');
    const speakBtn = document.getElementById('speak-btn');
    const retryBtn = document.getElementById('retry-btn');
    const rerollBtn = document.getElementById('reroll-btn');

    let currentPredictionData = null;

    // Helper to generate & display prediction
    function displayPrediction() {
        const name = userNameInput.value;
        const dob = dobInput.value;
        const question = questionInput.value;

        currentPredictionData = generateAbsurdPrediction(name, dob, question);

        if (currentPredictionData.error) {
            alert(currentPredictionData.error);
            loadingSection.classList.add('hidden');
            formSection.classList.remove('hidden');
            return;
        }

        // Populate Result
        resTimestamp.textContent = currentPredictionData.timestamp;
        resZodiac.textContent = `${currentPredictionData.zodiac} 🔮`;
        resElement.textContent = `Element: ${currentPredictionData.zodiacElement}`;
        resPlanet.textContent = `Ruling Planet: ${currentPredictionData.rulingPlanet}`;
        resVerdict.textContent = currentPredictionData.verdict;
        
        const formattedPrediction = currentPredictionData.prediction.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        resPrediction.innerHTML = formattedPrediction;
        
        resNumber.textContent = currentPredictionData.luckyNumber;
        resColor.textContent = currentPredictionData.luckyColor;
    }

    // Reroll button handler
    if (rerollBtn) {
        rerollBtn.addEventListener('click', () => {
            if ('speechSynthesis' in window) window.speechSynthesis.cancel();
            displayPrediction();
            playSuccessChime();
        });
    }

    // Default question setup
    if (!questionInput.value) {
        questionInput.value = "When will I get married?";
    }

    // Preset button click handling
    presetBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            presetBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const q = btn.getAttribute('data-q');
            if (q) {
                questionInput.value = q;
            }
        });
    });

    // Form Submission
    astrologyForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = userNameInput.value;
        const dob = dobInput.value;
        const question = questionInput.value;

        if (!dob) {
            alert("Please provide your Date of Birth so the stars can miscalculate your life!");
            return;
        }

        // Show loading screen
        formSection.classList.add('hidden');
        resultSection.classList.add('hidden');
        loadingSection.classList.remove('hidden');

        // Play mystical Web Audio chime
        playCosmicChime();

        // Cycle loading messages
        const loadingMessages = [
            "Consulting Mercury in Gatorade...",
            "Calculating past infant achievements...",
            "Demoting Pluto once again...",
            "Misinterpreting celestial charts...",
            "Generating logical paradox..."
        ];

        let msgIdx = 0;
        const msgInterval = setInterval(() => {
            msgIdx = (msgIdx + 1) % loadingMessages.length;
            loadingStatus.textContent = loadingMessages[msgIdx];
        }, 450);

        // Simulate reading calculation (2.2 seconds)
        setTimeout(() => {
            clearInterval(msgInterval);
            displayPrediction();
            loadingSection.classList.add('hidden');
            resultSection.classList.remove('hidden');
            playSuccessChime();
        }, 2200);
    });

    // Copy to Clipboard
    copyBtn.addEventListener('click', () => {
        if (!currentPredictionData) return;

        const cleanPrediction = currentPredictionData.prediction.replace(/\*\*/g, '');
        const shareText = `🔮 WrongAstrology AI Prediction for ${currentPredictionData.name}:\n\n"${cleanPrediction}"\n\n${currentPredictionData.verdict}\n\nUnreliable Horoscope generated by WrongAstrology AI ✨`;

        navigator.clipboard.writeText(shareText).then(() => {
            const originalText = copyBtn.textContent;
            copyBtn.textContent = "✅ Copied to Clipboard!";
            setTimeout(() => {
                copyBtn.textContent = originalText;
            }, 2000);
        }).catch(err => {
            alert("Copy failed: " + err);
        });
    });

    // Read Aloud (Text to Speech)
    speakBtn.addEventListener('click', () => {
        if (!currentPredictionData) return;

        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel(); // Stop ongoing speech
            const cleanText = currentPredictionData.prediction.replace(/\*\*/g, '');
            const textToSpeak = `Greeting ${currentPredictionData.name}. Here is your wrong horoscope reading. ${cleanText}`;
            
            const utterance = new SpeechSynthesisUtterance(textToSpeak);
            utterance.pitch = 0.85; // Slightly deeper mystical voice
            utterance.rate = 0.95;
            
            speakBtn.textContent = "🔊 Reading Horoscope...";
            utterance.onend = () => {
                speakBtn.textContent = "🔊 Read Aloud";
            };
            
            window.speechSynthesis.speak(utterance);
        } else {
            alert("Sorry, your browser doesn't support text-to-speech!");
        }
    });

    // Retry / Ask Another
    retryBtn.addEventListener('click', () => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }
        resultSection.classList.add('hidden');
        formSection.classList.remove('hidden');
    });

    // Background Stars Generator
    function createStarfield() {
        const container = document.getElementById('stars-container');
        const starCount = 70;

        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            
            const size = Math.random() * 3 + 1;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.left = `${Math.random() * 100}vw`;
            star.style.top = `${Math.random() * 100}vh`;
            star.style.setProperty('--duration', `${Math.random() * 3 + 2}s`);
            star.style.setProperty('--opacity', `${Math.random() * 0.7 + 0.3}`);

            container.appendChild(star);
        }
    }

    // Web Audio Synthesizer for Mystical Chimes
    function playCosmicChime() {
        try {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (!AudioCtx) return;
            const ctx = new AudioCtx();

            const frequencies = [261.63, 329.63, 392.00, 523.25]; // C, E, G, C
            frequencies.forEach((freq, idx) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();

                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.15);

                gain.gain.setValueAtTime(0.01, ctx.currentTime + idx * 0.15);
                gain.gain.exponentialRampToValueAtTime(0.15, ctx.currentTime + idx * 0.15 + 0.05);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.15 + 1.2);

                osc.connect(gain);
                gain.connect(ctx.destination);

                osc.start(ctx.currentTime + idx * 0.15);
                osc.stop(ctx.currentTime + idx * 0.15 + 1.3);
            });
        } catch (e) {
            // Audio context fallback if blocked by browser policy
        }
    }

    function playSuccessChime() {
        try {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (!AudioCtx) return;
            const ctx = new AudioCtx();

            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(523.25, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.2);

            gain.gain.setValueAtTime(0.1, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start();
            osc.stop(ctx.currentTime + 0.6);
        } catch (e) {
            // Silence if audio context disabled
        }
    }
});
