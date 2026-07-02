const LANGUAGE_DICTS = {
    "c": [
        "include", "define", "struct", "typedef", "return", "sizeof", "malloc", "calloc", 
        "printf", "scanf", "switch", "break", "continue", "default", "while", "for", "do", 
        "int", "float", "double", "char", "void", "enum", "static", "extern", "const", 
        "volatile", "register", "unsigned", "signed", "short", "long", "if", "else", "goto", "main",
        "FILE", "fopen", "fclose", "fread", "fwrite", "fprintf", "fscanf", "feof", "ferror", "clearerr", "fseek", "ftell", "rewind"
    ],
    "pascal": [
        "program", "const", "type", "var", "begin", "end", "procedure", "function", "array", 
        "of", "record", "if", "then", "else", "while", "do", "repeat", "until", "for", "to", 
        "downto", "case", "with", "integer", "real", "boolean", "char", "string", "true", 
        "false", "and", "or", "not", "div", "mod", "writeln", "readln", "clrscr", "uses",
        "forward", "nil", "packed", "set", "file", "text", "assign", "reset", "rewrite", "close"
    ],
    "java": [
        "public", "private", "protected", "static", "final", "void", "main", "class", "interface", 
        "extends", "implements", "new", "this", "super", "return", "if", "else", "switch", 
        "case", "break", "continue", "default", "for", "while", "do", "try", "catch", "finally", 
        "throw", "throws", "import", "package", "byte", "short", "int", "long", "float", 
        "double", "boolean", "char", "true", "false", "null", "abstract", "synchronized",
        "volatile", "transient", "instanceof", "strictfp", "native", "enum", "assert", "String", "Object", "System", "out", "println"
    ],
    "python": [
        "def", "class", "return", "yield", "import", "from", "as", "if", "elif", "else", 
        "while", "for", "in", "break", "continue", "pass", "try", "except", "finally", "raise", 
        "assert", "with", "global", "nonlocal", "lambda", "and", "or", "not", "is", "true", 
        "false", "none", "print", "len", "range", "enumerate", "zip", "dict", "list", "set", "tuple",
        "open", "read", "write", "close", "append", "extend", "insert", "remove", "pop", "clear", "index", "count", "sort", "reverse"
    ],
    "js": [
        "function", "return", "if", "else", "switch", "case", "break", "continue", "default", 
        "for", "while", "do", "try", "catch", "finally", "throw", "var", "let", "const", 
        "class", "extends", "constructor", "super", "this", "new", "import", "export", 
        "from", "as", "typeof", "instanceof", "in", "of", "true", "false", "null", "undefined", 
        "async", "await", "yield", "map", "filter", "reduce", "foreach", "promise", "console",
        "document", "window", "setTimeout", "setInterval", "clearTimeout", "clearInterval", "JSON", "parse", "stringify", "Math", "random"
    ],
    "shell": [
        "echo", "printf", "read", "cd", "pwd", "ls", "cp", "mv", "rm", "mkdir", "rmdir", 
        "touch", "cat", "less", "tail", "head", "grep", "awk", "sed", "find", "xargs", 
        "chmod", "chown", "sudo", "su", "bash", "sh", "export", "set", "unset", "alias", 
        "unalias", "source", "if", "then", "elif", "else", "fi", "case", "esac", "for", 
        "while", "do", "done", "break", "continue", "exit", "return", "local", "shift", "trap", "wait", "eval", "exec", "kill"
    ],
    "sql": [
        "select", "from", "where", "insert", "into", "values", "update", "set", "delete", 
        "create", "table", "drop", "alter", "add", "column", "primary", "foreign", "key", 
        "references", "join", "inner", "left", "right", "outer", "full", "on", "group", 
        "by", "having", "order", "asc", "desc", "limit", "offset", "union", "all", "as", 
        "in", "like", "is", "null", "not", "and", "or", "count", "sum", "avg", "min", "max", "distinct",
        "index", "view", "trigger", "procedure", "function", "commit", "rollback", "grant", "revoke", "truncate", "cascade"
    ]
};

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
let lastSpawnTime = 0;
let lastTime = 0;
let activeWords = [];
let targetWord = null;
let isPlaying = false;
let animationId = null;

// LocalStorage Keys
const SCORE_KEY = 'syntaxErrorScores';

// ---- SISTEMA DE HIGHSCORE ----
function getHighScores() {
    const scoresJSON = localStorage.getItem(SCORE_KEY);
    if (!scoresJSON) return [];
    try {
        return JSON.parse(scoresJSON);
    } catch(e) {
        return [];
    }
}

function saveHighScore(nick, newScore) {
    let scores = getHighScores();
    scores.push({ nick: nick, score: newScore });
    // Ordenar do maior para o menor
    scores.sort((a, b) => b.score - a.score);
    // Manter apenas Top 5
    if (scores.length > 5) scores = scores.slice(0, 5);
    localStorage.setItem(SCORE_KEY, JSON.stringify(scores));
}

function isHighScore(newScore) {
    if (newScore === 0) return false;
    let scores = getHighScores();
    if (scores.length < 5) return true;
    return newScore > scores[scores.length - 1].score;
}

function renderLeaderboard() {
    let scores = getHighScores();
    leaderboardList.innerHTML = '';
    
    if (scores.length === 0) {
        leaderboardList.innerHTML = '<li><span class="lb-name">SEM REGISTROS AINDA...</span></li>';
        return;
    }
    
    scores.forEach((entry, idx) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="lb-rank">#${idx + 1}</span>
            <span class="lb-name">${entry.nick}</span>
            <span class="lb-score">${entry.score}</span>
        `;
        leaderboardList.appendChild(li);
    });
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
    
    clearPlayArea();
    updateHUD();
    
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
    finalScoreEl.textContent = score;
    
    renderLeaderboard();
    
    // Mostra/Esconde Input de Highscore
    if (isHighScore(score)) {
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
    if (WORD_LIST.length === 0) return;
    
    const wordText = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
    const xPos = 10 + Math.random() * 80; 
    
    const word = new WordEntity(wordText, xPos);
    activeWords.push(word);
}

function gameLoop(timestamp) {
    if (!isPlaying) return;

    const dt = timestamp - lastTime;
    lastTime = timestamp;

    if (timestamp - lastSpawnTime > currentSpawnRate) {
        spawnWord();
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
    
    if (e.key.length !== 1) return;
    const char = e.key.toLowerCase();
    
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
    setTimeout(() => menuOverlay.classList.add('active'), 100);
});

btnSubmitScore.addEventListener('click', () => {
    const nick = nicknameInput.value.trim().toUpperCase() || 'ANONYMOUS';
    saveHighScore(nick, score);
    highscoreEntryDiv.classList.add('hidden'); // Esconde o form
    renderLeaderboard(); // Atualiza a tabela imediatamente
});

nicknameInput.addEventListener('keydown', (e) => {
    // Prevenir que a tecla atrapalhe (apenas permitimos submeter com Enter se quisermos)
    if (e.key === 'Enter') {
        btnSubmitScore.click();
    }
});
