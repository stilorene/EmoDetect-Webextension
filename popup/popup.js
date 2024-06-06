document.addEventListener('DOMContentLoaded', () => {
  const downloadButton = document.getElementById('downloadImage');
  if (downloadButton) {
    downloadButton.addEventListener('click', () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          func: downloadAndAnalyzeImage
        });
      });
    });
  } else {
    console.error('Download button not found.');
  }
});

function downloadAndAnalyzeImage() {
  const images = document.getElementsByTagName('img');
  if (images.length > 0) {
    const imageUrl = images[0].src; // Get the URL of the first image on the page
    chrome.runtime.sendMessage({ url: imageUrl }); // Send message to background.js
  } else {
    alert('No images found on this page.');
  }
}
