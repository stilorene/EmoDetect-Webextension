document.addEventListener('DOMContentLoaded', () => {
  const downloadButton = document.getElementById('downloadImage');
  if (downloadButton) {
    downloadButton.addEventListener('click', () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: downloadImage
        });
      });
    });
  } else {
    console.error('Download button not found.');
  }
});

function downloadImage() {
  const images = document.getElementsByTagName('img');
  if (images.length > 0) {                      // Überprüfen ob ein Bild vorhanden ist
    const imageUrl = images[0].src;                 //Das erste wird dabei runtergeladen
    chrome.runtime.sendMessage({ url: imageUrl }); //message wird an das background.js gesendet, der auf diese Nachricht irgendwie ständig wartet
  } else {
    alert('No images found on this page.');
  }
}
