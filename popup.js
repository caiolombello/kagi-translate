(function () {
  chrome.storage.sync.get({ theme: 'light' }, (items) => {
    if (items.theme === 'dark') {
      document.body.classList.add('dark-mode');
    }
  });
})();

document.getElementById('translate-page').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.storage.sync.get({
      defaultLang: '',
      specifyFromLang: false,
      fromLang: ''
    }, (items) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: (defaultLang, specifyFromLang, fromLang) => {
          const selectedText = window.getSelection().toString().trim();
          let url = 'https://translate.kagi.com/';

          if (selectedText) {
            // Keep query parameter format for selected text
            let params = new URLSearchParams();
            params.set('text', selectedText);
            if (specifyFromLang && fromLang) {
              params.set('from', fromLang);
            }
            if (defaultLang) {
              params.set('to', defaultLang);
            }
            url += '?' + params.toString();
          } else {
            // Use path format for full page translation
            if (defaultLang) {
              url += defaultLang + '/';
            }
            url += window.location.href.replace(/^(https?:\/\/)/, '');

            if (specifyFromLang && fromLang) {
              url += '?from=' + fromLang;
            }
          }

          window.location.href = url;
        },
        args: [items.defaultLang, items.specifyFromLang, items.fromLang]
      });
    });
  });
});

document.getElementById('open-options').addEventListener('click', () => {
  chrome.runtime.openOptionsPage();
});
