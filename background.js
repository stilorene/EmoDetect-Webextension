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

async function analyzeImage(downloadId) {
  console.log('Image downloaded with ID:', downloadId);

  // Get the downloaded file path
  chrome.downloads.search({ id: downloadId }, async (results) => {
    if (results && results.length > 0) {
      const fileUrl = results[0].url;

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

async function analyzeImageOnPage(imageUrl) {
  // Load face-api.js (assuming it's included in the webpage or available)
  await faceapi.nets.tinyFaceDetector.load('/models');
  await faceapi.nets.faceExpressionNet.load('/models');

  // Create a new image element
  const img = document.createElement('img');
  img.src = imageUrl;

  // Wait for the image to load before processing with face-api.js
  await new Promise(resolve => {
    img.onload = resolve;
  });

  // Create a canvas element to draw the image
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);

  // Detect faces and recognize expressions
  const detections = await faceapi.detectAllFaces(canvas, new faceapi.TinyFaceDetectorOptions())
                                   .withFaceExpressions();

  // Log detections to console
  console.log('Detections:', detections);

  // Example: Display detections in the extension's popup (if applicable)
  // chrome.runtime.sendMessage({ detections: detections });

  // Example: Modify DOM to display detections on the webpage (if applicable)
  // displayDetections(detections);
}

// Example function to display detections in the extension's popup (if needed)
// function displayDetections(detections) {
//   // Code to display detections in the popup or modify DOM
// }
