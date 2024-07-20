
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







document.addEventListener('DOMContentLoaded', () => {
  const replaceButton = document.getElementById('replaceButton');
  const originalWordInput = document.getElementById('originalWord');
  const newWordInput = document.getElementById('newWord');

  // Lade gespeicherte Werte beim Öffnen des Popups
  chrome.storage.sync.get(['originalWord', 'newWord'], (data) => {
    if (data.originalWord) {
      originalWordInput.value = data.originalWord;
    }
    if (data.newWord) {
      newWordInput.value = data.newWord;
    }
  });

  replaceButton.addEventListener('click', () => {
    const originalWord = document.getElementById('originalWord').value;
    const newWord = document.getElementById('newWord').value;

    if (originalWord && newWord) {
      chrome.storage.sync.set({ originalWord, newWord }, () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: replaceWords,
            args: [originalWord, newWord]
          });
        });
      });
    } else {
      alert('Please fill in both fields.');
    }
  });
});

function replaceWords(originalWord, newWord) {
  const regex = new RegExp(originalWord, 'gi');
  document.body.innerHTML = document.body.innerHTML.replace(regex, newWord);
}