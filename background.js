// background.js
window.addEventListener('addon-ready', () => {
  browser.runtime.sendMessage({ ready: true });
});

chrome.runtime.onMessage.addListener(async (message) => {
  if (message.images) {
    for (const imageURL of message.images) {
      const imgBlob = await fetch(imageURL).then(res => res.blob());
      const img = await createImageBitmap(imgBlob);
      const detections = await faceapi.detectAllFaces(img).withFaceExpressions();
      handleDetections(detections);
    }
  }
});

function handleDetections(detections) {
  // Hier kannst du die Ergebnisse der Gesichtsanalyse verarbeiten
  // Zum Beispiel, indem du sie an das Popup-Fenster sendest
  chrome.runtime.sendMessage({ detections });
}
