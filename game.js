const LANGUAGE_DICTS = {};
for (const lang in LANGUAGE_DATA) {
    LANGUAGE_DICTS[lang] = [];
    for (const category in LANGUAGE_DATA[lang]) {
        LANGUAGE_DICTS[lang].push(...LANGUAGE_DATA[lang][category]);
    }
}

// Configurações de Dificuldade
const DIFFICULTY_CONFIGS = {
    "EASY": {
        baseSpeed: 0.35,          // Bem lento
        startSpawnRate: 3000,     // Mais atraso no início
        speedIncreaseRate: 0.1,   // Aumenta pouco
        minSpawnRate: 1500        // Não fica tão caótico no fim
    },
    "NORMAL": {
        baseSpeed: 0.5,
        startSpawnRate: 2600,
        speedIncreaseRate: 0.15,
        minSpawnRate: 1200
    },
    "HARD": {
        baseSpeed: 0.7,
        startSpawnRate: 2000,
        speedIncreaseRate: 0.2,
        minSpawnRate: 800
    }
};

// Elementos da DOM
const playArea = document.getElementById('play-area');
const scoreEl = document.getElementById('score');
const speedEl = document.getElementById('speed-level');
const livesContainer = document.getElementById('lives');
const menuOverlay = document.getElementById('menu-overlay');
const gameOverOverlay = document.getElementById('game-over-overlay');
const btnStart = document.getElementById('btn-start');
const btnRestart = document.getElementById('btn-restart');
const btnMenu = document.getElementById('btn-menu');
const finalScoreEl = document.getElementById('final-score');
const screenFlash = document.getElementById('screen-flash');
const groundLine = document.getElementById('ground-line');
const langCheckboxes = document.querySelectorAll('.lang-selection input[type="checkbox"]');
const diffRadios = document.querySelectorAll('.diff-selection input[type="radio"]');

const highscoreEntryDiv = document.getElementById('highscore-entry');
const nicknameInput = document.getElementById('nickname-input');
const btnSubmitScore = document.getElementById('btn-submit-score');
const leaderboardList = document.getElementById('leaderboard-list');

// Estado do Jogo
let WORD_LIST = [];
let currentDiffConfig = DIFFICULTY_CONFIGS["NORMAL"];
let score = 0;
let lives = 3;
let currentSpeedScalar = 1.0;
let currentSpawnRate = 2600; 
let nextSpawnDelay = 2600;
let lastSpawnTime = 0;
let lastTime = 0;
let activeWords = [];
let targetWord = null;
let isPlaying = false;
let animationId = null;

// LocalStorage Keys
const SCORE_KEY = 'syntaxErrorScores';

// ---- SISTEMA DE HIGHSCORE ----
function getSelectedDifficulty() {
    const selected = Array.from(diffRadios).find(r => r.checked);
    return selected ? selected.value : "NORMAL";
}

function getHighScores(difficulty) {
    const scoresJSON = localStorage.getItem(SCORE_KEY);
    let allScores = { EASY: [], NORMAL: [], HARD: [] };
    if (scoresJSON) {
        try {
            const parsed = JSON.parse(scoresJSON);
            if (Array.isArray(parsed)) {
                allScores.NORMAL = parsed; // Migrate old scores
            } else {
                allScores = { ...allScores, ...parsed };
            }
        } catch(e) {}
    }
    const result = allScores[difficulty];
    return Array.isArray(result) ? result : [];
}

function saveHighScore(nick, newScore, difficulty) {
    const scoresJSON = localStorage.getItem(SCORE_KEY);
    let allScores = { EASY: [], NORMAL: [], HARD: [] };
    if (scoresJSON) {
        try {
            const parsed = JSON.parse(scoresJSON);
            if (Array.isArray(parsed)) {
                allScores.NORMAL = parsed;
            } else {
                allScores = { ...allScores, ...parsed };
            }
        } catch(e) {}
    }

    let diffScores = allScores[difficulty] || [];
    if (!Array.isArray(diffScores)) diffScores = [];
    
    diffScores.push({ nick: nick, score: newScore });
    diffScores.sort((a, b) => b.score - a.score);
    if (diffScores.length > 5) diffScores = diffScores.slice(0, 5);
    
    allScores[difficulty] = diffScores;
    localStorage.setItem(SCORE_KEY, JSON.stringify(allScores));
}

function isHighScore(newScore, difficulty) {
    if (newScore === 0) return false;
    let scores = getHighScores(difficulty);
    if (scores.length < 5) return true;
    return newScore > scores[scores.length - 1].score;
}

function renderLeaderboard(difficulty) {
    let scores = getHighScores(difficulty);
    
    document.getElementById('menu-lb-diff').textContent = difficulty;
    document.getElementById('gameover-lb-diff').textContent = difficulty;
    
    const menuList = document.getElementById('menu-leaderboard-list');
    const gameOverList = document.getElementById('gameover-leaderboard-list');
    
    if (scores.length === 0) {
        menuList.parentElement.style.display = 'none';
        gameOverList.parentElement.style.display = 'none';
    } else {
        menuList.parentElement.style.display = 'block';
        gameOverList.parentElement.style.display = 'block';
        
        let html = '';
        scores.forEach((entry, idx) => {
            html += `
                <li>
                    <span class="lb-rank">#${idx + 1}</span>
                    <span class="lb-name">${entry.nick}</span>
                    <span class="lb-score">${entry.score}</span>
                </li>
            `;
        });
        
        menuList.innerHTML = html;
        gameOverList.innerHTML = html;
    }
}
// -----------------------------

class WordEntity {
    constructor(text, x) {
        this.text = text;
        this.typed = "";
        this.y = -50;
        this.x = x;
        this.isDestroyed = false;
        
        this.el = document.createElement('div');
        this.el.className = 'word-entity';
        this.el.style.left = `${this.x}%`;
        this.el.style.top = `${this.y}px`;
        this.renderLetters();
        
        playArea.appendChild(this.el);
    }

    renderLetters() {
        this.el.innerHTML = '';
        for (let i = 0; i < this.text.length; i++) {
            const span = document.createElement('span');
            span.className = 'letter';
            span.textContent = this.text[i];
            if (i < this.typed.length) {
                span.classList.add('typed');
            }
            this.el.appendChild(span);
        }
    }

    typeLetter(char) {
        const nextChar = this.text[this.typed.length];
        if (char === nextChar) {
            this.typed += char;
            this.renderLetters();
            return true;
        }
        return false;
    }

    isCompleted() {
        return this.typed === this.text;
    }

    update(dt) {
        if (this.isDestroyed) return;
        
        const moveSpeed = (50 * currentDiffConfig.baseSpeed * currentSpeedScalar * dt) / 1000;
        this.y += moveSpeed;
        this.el.style.top = `${this.y}px`;

        const groundY = groundLine.offsetTop;
        if (this.y > groundY - 100) {
            this.el.classList.add('danger');
        }

        if (this.y > groundY - 30) {
            return true; 
        }
        return false;
    }

    destroy(completed) {
        this.isDestroyed = true;
        if (completed) {
            this.el.classList.add('destroyed');
            setTimeout(() => this.el.remove(), 300);
        } else {
            this.el.remove();
        }
    }
}

function compileWordList() {
    let selectedLangs = Array.from(langCheckboxes).filter(cb => cb.checked).map(cb => cb.value);
    if (selectedLangs.length === 0) {
        langCheckboxes.forEach(cb => cb.checked = true);
        selectedLangs = Object.keys(LANGUAGE_DICTS);
    }

    let allWords = [];
    selectedLangs.forEach(lang => {
        allWords = allWords.concat(LANGUAGE_DICTS[lang]);
    });

    let uniqueWords = [...new Set(allWords)];
    uniqueWords.sort(() => Math.random() - 0.5);
    WORD_LIST = uniqueWords;
}

function loadDifficulty() {
    let selectedDiff = Array.from(diffRadios).find(radio => radio.checked).value;
    currentDiffConfig = DIFFICULTY_CONFIGS[selectedDiff] || DIFFICULTY_CONFIGS["NORMAL"];
}

function clearPlayArea() {
    activeWords.forEach(w => {
        if (w.el && w.el.parentNode) {
            w.el.remove();
        }
    });
    activeWords = [];
    targetWord = null;
}

function initGame() {
    compileWordList();
    loadDifficulty();
    
    score = 0;
    lives = 3;
    currentSpeedScalar = 1.0;
    currentSpawnRate = currentDiffConfig.startSpawnRate;
    nextSpawnDelay = currentSpawnRate;
    
    clearPlayArea();
    updateHUD();
    
    document.getElementById('hud').style.display = 'flex';
    menuOverlay.classList.remove('active');
    gameOverOverlay.classList.remove('active');
    
    isPlaying = true;
    lastTime = performance.now();
    lastSpawnTime = lastTime;
    
    animationId = requestAnimationFrame(gameLoop);
}

function updateHUD() {
    scoreEl.textContent = score;
    speedEl.textContent = currentSpeedScalar.toFixed(1) + 'x';
    
    const hearts = livesContainer.querySelectorAll('.heart');
    hearts.forEach((heart, index) => {
        if (index < lives) {
            heart.classList.add('active');
        } else {
            heart.classList.remove('active');
        }
    });
}

function flashScreen() {
    screenFlash.classList.add('flash');
    setTimeout(() => screenFlash.classList.remove('flash'), 100);
}

function gameOver() {
    isPlaying = false;
    cancelAnimationFrame(animationId);
    
    document.getElementById('hud').style.display = 'none';
    finalScoreEl.textContent = score;
    
    const playedDiff = getSelectedDifficulty();
    renderLeaderboard(playedDiff);
    
    // Mostra/Esconde Input de Highscore
    if (isHighScore(score, playedDiff)) {
        highscoreEntryDiv.classList.remove('hidden');
        nicknameInput.value = '';
        setTimeout(() => nicknameInput.focus(), 100);
    } else {
        highscoreEntryDiv.classList.add('hidden');
    }
    
    gameOverOverlay.classList.add('active');
}

function increaseDifficulty() {
    // Aumenta a velocidade
    currentSpeedScalar = 1.0 + Math.floor(score / 100) * currentDiffConfig.speedIncreaseRate;
    // Reduz o spawn rate progressivamente até o limite da dificuldade
    currentSpawnRate = Math.max(
        currentDiffConfig.minSpawnRate, 
        currentDiffConfig.startSpawnRate - Math.floor(score / 100) * 200
    );
    speedEl.textContent = currentSpeedScalar.toFixed(1) + 'x';
}

function spawnWord() {
    if (WORD_LIST.length === 0) return 0;
    
    const wordText = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
    const xPos = 10 + Math.random() * 80; 
    
    const word = new WordEntity(wordText, xPos);
    activeWords.push(word);
    
    return wordText.length;
}

function gameLoop(timestamp) {
    if (!isPlaying) return;

    const dt = timestamp - lastTime;
    lastTime = timestamp;

    if (timestamp - lastSpawnTime > nextSpawnDelay) {
        const lastWordLength = spawnWord();
        let lengthMultiplier = lastWordLength / 6;
        lengthMultiplier = Math.max(0.4, Math.min(2.5, lengthMultiplier));
        nextSpawnDelay = currentSpawnRate * lengthMultiplier;
        lastSpawnTime = timestamp;
    }

    for (let i = activeWords.length - 1; i >= 0; i--) {
        const word = activeWords[i];
        const touchedGround = word.update(dt);
        
        if (touchedGround) {
            lives--;
            updateHUD();
            flashScreen();
            
            if (targetWord === word) {
                targetWord = null;
            }
            word.destroy(false);
            activeWords.splice(i, 1);
            
            if (lives <= 0) {
                gameOver();
                return;
            }
        }
    }

    if (isPlaying) {
        animationId = requestAnimationFrame(gameLoop);
    }
}

// Input de Teclado no Jogo
window.addEventListener('keydown', (e) => {
    if (!isPlaying) return;
    
    // Atalho para cancelar a partida (Ctrl + C)
    if (e.ctrlKey && e.key.toLowerCase() === 'c') {
        isPlaying = false;
        cancelAnimationFrame(animationId);
        clearPlayArea();
        document.getElementById('hud').style.display = 'none';
        renderLeaderboard(getSelectedDifficulty());
        setTimeout(() => menuOverlay.classList.add('active'), 100);
        return;
    }
    
    if (e.key.length !== 1) return;
    const char = e.key;
    
    if (targetWord) {
        if (targetWord.typeLetter(char)) {
            if (targetWord.isCompleted()) {
                score += targetWord.text.length * 10;
                increaseDifficulty();
                updateHUD();
                
                targetWord.destroy(true);
                activeWords = activeWords.filter(w => w !== targetWord);
                targetWord = null;
            }
        } else {
            targetWord.el.style.transform = `translateX(-50%) translateX(${(Math.random() - 0.5) * 10}px)`;
            setTimeout(() => {
                if (targetWord && targetWord.el) {
                    targetWord.el.style.transform = `translateX(-50%)`;
                }
            }, 50);
        }
    } else {
        const possibleTargets = activeWords.filter(w => w.text[0] === char);
        if (possibleTargets.length > 0) {
            possibleTargets.sort((a, b) => b.y - a.y); 
            targetWord = possibleTargets[0];
            targetWord.typeLetter(char);
            targetWord.el.classList.add('targeted');
            
            if (targetWord.isCompleted()) {
                score += targetWord.text.length * 10;
                increaseDifficulty();
                updateHUD();
                
                targetWord.destroy(true);
                activeWords = activeWords.filter(w => w !== targetWord);
                targetWord = null;
            }
        }
    }
});

// Eventos de Menu e Highscore
btnStart.addEventListener('click', initGame);

btnRestart.addEventListener('click', () => {
    // Esconder Overlay pra não bugar a transição
    gameOverOverlay.classList.remove('active');
    setTimeout(() => initGame(), 100);
});

btnMenu.addEventListener('click', () => {
    gameOverOverlay.classList.remove('active');
    clearPlayArea();
    renderLeaderboard(getSelectedDifficulty());
    setTimeout(() => menuOverlay.classList.add('active'), 100);
});

btnSubmitScore.addEventListener('click', () => {
    const nick = nicknameInput.value.trim().toUpperCase() || 'ANONYMOUS';
    const playedDiff = getSelectedDifficulty();
    saveHighScore(nick, score, playedDiff);
    highscoreEntryDiv.classList.add('hidden'); // Esconde o form
    renderLeaderboard(playedDiff); // Atualiza a tabela imediatamente
});

nicknameInput.addEventListener('keydown', (e) => {
    // Prevenir que a tecla atrapalhe (apenas permitimos submeter com Enter se quisermos)
    if (e.key === 'Enter') {
        btnSubmitScore.click();
    }
});

// Atualizar leaderboard ao trocar dificuldade no menu
diffRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
        renderLeaderboard(e.target.value);
    });
});

// Render inicial
renderLeaderboard(getSelectedDifficulty());
