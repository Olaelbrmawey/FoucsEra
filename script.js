let timer;
let isRunning = false;
let minutes = 25;
let seconds = 0;

// Start/Stop Timer
function startTimer() {
    if (!isRunning) {
        isRunning = true;
        document.getElementById('startButton').textContent = 'Pause';
        timer = setInterval(updateTimer, 1000);
    } else {
        clearInterval(timer);
        isRunning = false;
        document.getElementById('startButton').textContent = 'Start';
    }
}

// Update Timer
function updateTimer() {
    if (seconds === 0) {
        if (minutes === 0) {
            clearInterval(timer);
            playSound();
            alert('Time is up! Take a break.');
            resetTimer();
        } else {
            minutes--;
            seconds = 59;
        }
    } else {
        seconds--;
    }
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

// Reset Timer
function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    minutes = parseInt(document.getElementById('focusTime').value) || 25;
    seconds = 0;
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = '00';
    document.getElementById('startButton').textContent = 'Start';
}

// Save Notes
function saveNotes() {
    const notes = document.getElementById('notes').value;
    localStorage.setItem('savedNotes', notes);
    alert('Notes saved!');
}

// Load Notes
function loadNotes() {
    const savedNotes = localStorage.getItem('savedNotes');
    if (savedNotes) {
        document.getElementById('notes').value = savedNotes;
    }
}

// Play Alert Sound
function playSound() {
    const audio = new Audio('https://www.soundjay.com/button/beep-07.mp3');
    audio.play();
}

// Toggle Theme
function toggleTheme() {
    const root = document.documentElement;
    const isDark = root.style.getPropertyValue('--bg-color') === '#333';
    if (isDark) {
        root.style.setProperty('--bg-color', '#f5f5f5');
        root.style.setProperty('--text-color', '#333');
        document.getElementById('themeToggle').textContent = 'Dark Mode';
    } else {
        root.style.setProperty('--bg-color', '#333');
        root.style.setProperty('--text-color', '#f5f5f5');
        document.getElementById('themeToggle').textContent = 'Light Mode';
    }
}

// Initialize
function init() {
    loadNotes();
    resetTimer();
}

init();
