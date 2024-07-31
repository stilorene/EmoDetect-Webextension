document.addEventListener('DOMContentLoaded', function () {
  let startTime, pauseTime, timerRunning;
  
  

  // Laden der gespeicherten Daten
  chrome.storage.local.get(['startTime', 'pauseTime', 'timerRunning'], function(result) {
    startTime = parseInt(result.startTime || Date.now());
    pauseTime = parseInt(result.pauseTime || 0);
    timerRunning = result.timerRunning === true;

    if (timerRunning) {
      startTime -= pauseTime; // Adjust startTime if the timer is running
    } 
    

    updateTime();
  });

  // function resetInactivityTimer() {
  //   lastActivityTime = Date.now();
  //   if (!timerRunning) {
  //     startTimer();
  //   }
  // }

  // function checkInactivity() {
  //   if (Date.now() - lastActivityTime >= inactivityLimit) {
  //     pauseTimer();
  //   }
  // }

 

 

  function updateTime() {
    if (!timerRunning) return;
    const elapsed = Date.now() - startTime;
    const hours = Math.floor(elapsed / 3600000);
    const minutes = Math.floor((elapsed % 3600000) / 60000);
    const seconds = Math.floor((elapsed % 60000) / 1000);
    document.getElementById('time').textContent =
      `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  // Get the button element
document.getElementById("pausebutton").addEventListener('click', pauseTimer);
function pauseTimer() {
  if (timerRunning) {
    pauseTime = Date.now() - startTime; // Verwendung der globalen Variable ohne erneute Deklaration
    timerRunning = false;
    chrome.storage.local.set({
      pauseTime: pauseTime,
      timerRunning: false
    });
  }
}

document.getElementById("playbutton").addEventListener('click', startTimer);
function startTimer() {
  if (!timerRunning) {
    startTime = Date.now() - pauseTime; 
    timerRunning = true;
    chrome.storage.local.set({
      startTime: startTime,
      timerRunning: true,
      pauseTime: 0
    });
  }
}

  setInterval(updateTime, 1000);
  

  // Rest des Codes (Notizbereich usw.) bleibt unverändert
  // Stellen Sie sicher, dass Sie auch hier localStorage durch chrome.storage.local ersetzen
});

// // Beispiel für den Notizbereich WELCHEN ICH RAUSGENOMMEN HABE DA ER EINFACH UNNÖTIG ERSCHEINT
// const noteElement = document.getElementById('note');

// chrome.storage.local.get('note', function(result) {
//   if (result.note) {
//     noteElement.value = result.note;
//     autoResizeTextArea(noteElement);
//   }
// });

// noteElement.addEventListener('input', function () {
//   chrome.storage.local.set({note: noteElement.value});
//   autoResizeTextArea(noteElement);
// });

// function autoResizeTextArea(element) {
//   element.style.height = 'auto';
//   element.style.height = `${element.scrollHeight}px`;
// }

// Logik für die Ziele setzen
// document.getElementById('setGoalButton').addEventListener('click', function () {
//   const goalInput = document.getElementById('goalInput');
//   const goal = goalInput.value.trim();
//   if (goal) {
//     const goalList = document.getElementById('goalList');
//     const goalItem = document.createElement('div');
//     goalItem.textContent = goal;
//     goalList.appendChild(goalItem);
//     goalInput.value = '';
//   }
// });

// // Logik für Kategorien hinzufügen
// document.getElementById('addCategoryButton').addEventListener('click', function () {
//   const categoryInput = document.getElementById('categoryInput');
//   const category = categoryInput.value.trim();
//   if (category) {
//     const categoryList = document.getElementById('categoryList');
//     const categoryItem = document.createElement('div');
//     categoryItem.textContent = category;
//     categoryList.appendChild(categoryItem);
//     categoryInput.value = '';
//   }
// });

