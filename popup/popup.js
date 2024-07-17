
document.addEventListener('DOMContentLoaded', () => {
  const downloadButton = document.getElementById('downloadImage');

  if (downloadButton) {
    downloadButton.addEventListener('click', () => {
      const numberInput = document.getElementById('number').value;
      const numberValue = parseInt(numberInput, 10);

      if (!isNaN(numberValue) && numberValue > 0) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: downloadAndAnalyzeImage,
            args: [numberValue]
          });
        });
      } else {
        console.error('Invalid input or number <= 0.');
      }
    });
  } else {
    console.error('Download button not found.');
  }
});

function downloadAndAnalyzeImage(maxImages) {
  const images = document.getElementsByTagName('img');
  if (images.length >= maxImages) {
    const imageUrls = Array.from(images).slice(0, maxImages).map(img => img.src);
    chrome.runtime.sendMessage({ urls: imageUrls });
  } else {
    console.error(`Less than ${maxImages} images found on this page.`);
  }
}