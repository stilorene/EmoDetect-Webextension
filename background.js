chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.url) {
      chrome.downloads.download({
        url: message.url,
        filename: 'downloaded_image.jpg'
      }, (downloadId) => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
        } else {
          analyzeImage(downloadId);
        }
      });
    }
  });
  
  function analyzeImage(downloadId) {
    // Hier kannst du die Analyse des Bildes durchführen.
    // Zum Beispiel: Lade das Bild und analysiere es mit einer JavaScript-Bibliothek.
    console.log('Image downloaded with ID:', downloadId);
  }
  