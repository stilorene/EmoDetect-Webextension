// content.js
const imgElements = document.querySelectorAll('img');
const imgSources = Array.from(imgElements).map(img => img.src);

// Sende die Bild-URLs an das Erweiterungs-Hauptskript
chrome.runtime.sendMessage({ images: imgSources });