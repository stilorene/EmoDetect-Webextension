document.addEventListener('DOMContentLoaded', function () {
  let startTime, pauseTime, timerRunning;
  const inactivityLimit = 1 * 60 * 1000; // 1 Minute in Millisekunden
  let lastActivityTime = Date.now();

  // Laden der gespeicherten Daten
  chrome.storage.local.get(['startTime', 'pauseTime', 'timerRunning'], function(result) {
    startTime = parseInt(result.startTime || Date.now());
    pauseTime = parseInt(result.pauseTime || 0);
    timerRunning = result.timerRunning === true;

    if (timerRunning) {
      startTimer();
    }
    updateTime();
  });

  function resetInactivityTimer() {
    lastActivityTime = Date.now();
    if (!timerRunning) {
      startTimer();
    }
  }

  function checkInactivity() {
    if (Date.now() - lastActivityTime >= inactivityLimit) {
      pauseTimer();
    }
  }

  function startTimer() {
    if (!timerRunning) {
      startTime = Date.now() - (pauseTime || 0);
      timerRunning = true;
      chrome.storage.local.set({
        startTime: startTime,
        timerRunning: true,
        pauseTime: null
      });
    }
  }

  function pauseTimer() {
    if (timerRunning) {
      pauseTime = Date.now() - startTime;
      timerRunning = false;
      chrome.storage.local.set({
        pauseTime: pauseTime,
        timerRunning: false
      });
    }
  }

  function updateTime() {
    if (!timerRunning) return;
    const elapsed = Date.now() - startTime;
    const hours = Math.floor(elapsed / 3600000);
    const minutes = Math.floor((elapsed % 3600000) / 60000);
    const seconds = Math.floor((elapsed % 60000) / 1000);
    document.getElementById('time').textContent =
      `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  document.addEventListener('mousemove', resetInactivityTimer);
  document.addEventListener('keydown', resetInactivityTimer);
  document.addEventListener('click', resetInactivityTimer);

  setInterval(updateTime, 1000);
  setInterval(checkInactivity, 1000);

  // Rest des Codes (Notizbereich usw.) bleibt unverändert
  // Stellen Sie sicher, dass Sie auch hier localStorage durch chrome.storage.local ersetzen
});

// Beispiel für den Notizbereich
const noteElement = document.getElementById('note');

chrome.storage.local.get('note', function(result) {
  if (result.note) {
    noteElement.value = result.note;
    autoResizeTextArea(noteElement);
  }
});

noteElement.addEventListener('input', function () {
  chrome.storage.local.set({note: noteElement.value});
  autoResizeTextArea(noteElement);
});

function autoResizeTextArea(element) {
  element.style.height = 'auto';
  element.style.height = `${element.scrollHeight}px`;
}