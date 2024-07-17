chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.urls && Array.isArray(message.urls)) {
    // Änderung: Schleife über die URLs
    message.urls.forEach((url, index) => {
      chrome.downloads.download({
        url: url,
        filename: `downloaded_image_${index + 1}.jpg` // Änderung: Verwendung von index für eindeutige Dateinamen
      }, (downloadId) => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
        } else {
          analyzeImage(downloadId);
        }
      });
    });
  }
});

async function analyzeImage(downloadId) {
  console.log('Image downloaded with ID:', downloadId);

  // Änderung: Bedingung zum Prüfen der Ergebnisse
  chrome.downloads.search({ id: downloadId }, async (results) => {
    if (results && results.length > 0) { // Änderung: Prüfen, ob Ergebnisse vorhanden sind
      const fileUrl = results[0].url; // Änderung: Verwendung des ersten Ergebnisses

      // Fetch the image as a Blob
      const response = await fetch(fileUrl);
      const imageBlob = await response.blob();

      // Convert the Blob to a Base64 data URL
      const reader = new FileReader();
      reader.readAsDataURL(imageBlob);

      reader.onloadend = async () => {
        const imageUrl = reader.result;

        // Execute content script to use face-api.js for face detection and recognition
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: analyzeImageOnPage,
            args: [imageUrl]
          });
        });
      };
    } else {
      console.error('Download not found');
    }
  });
}


