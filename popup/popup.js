// Warte, bis die Erweiterung vollständig geladen ist
window.addEventListener('DOMContentLoaded', () => {
  // Überprüfe, ob das Hauptskript verfügbar ist
  if (browser.runtime.connect) {
    initPopup();
  } else {
    window.addEventListener('addon-ready', initPopup);
  }
});

function initPopup() {
  // Dein Code zum Initialisieren des Popups
  // z.B. Nachrichten-Listener hinzufügen
  browser.runtime.onMessage.addListener(handleMessage);
}

function handleMessage(message) {
  // Verarbeite Nachrichten vom Hauptskript hier
  if (message.ready) {
    // Das Hauptskript ist bereit, du kannst jetzt Aktionen ausführen
    // ...
  }
}