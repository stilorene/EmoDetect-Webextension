let startTime = 0;
let pauseTime = 0;
let timerRunning = false;

chrome.storage.local.get(['startTime','timerRunning'], function(result) {
  startTime = parseInt(result.startTime || Date.now());
  timerRunning = result.timerRunning === true;
  updateTime();
});

function updateTime() {
  if (!timerRunning) return;
  const currentTime = Date.now();
  const elapsed = currentTime - startTime;
  const hours = Math.floor(elapsed / 3600000);
  const minutes = Math.floor((elapsed % 3600000) / 60000);
  const seconds = Math.floor((elapsed % 60000) / 1000);
  let displayText = '';
  if (hours > 0) {
    displayText = `${hours}h ${minutes}`;
  } else if (minutes > 0) {
    displayText = `${minutes}m`;
  } else {
    displayText = `${seconds}s`;
  }
  
  chrome.action.setBadgeText({ text: displayText });
  chrome.action.setBadgeTextColor({ color: '#FFFFFF' });
  chrome.action.setBadgeBackgroundColor({ color: 'black' });
}

setInterval(updateTime, 1000);

chrome.storage.onChanged.addListener(function(changes, namespace) {
  for (let key in changes) {
    if (key === 'timerRunning') {
      timerRunning = changes[key].newValue === true;
    } else if (key === 'startTime') {
      startTime = parseInt(changes[key].newValue);
    } 
  }
});