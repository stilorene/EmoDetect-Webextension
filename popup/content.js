chrome.storage.sync.get(['originalWord', 'newWord'], (data) => {
    if (data.originalWord && data.newWord) {
      const regex = new RegExp(data.originalWord, 'gi');
      document.body.innerHTML = document.body.innerHTML.replace(regex, data.newWord);
    }
  });
  