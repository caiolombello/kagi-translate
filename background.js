chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "translateSelection",
    title: "Translate with Kagi",
    contexts: ["selection"]
  });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "translateSelection" && info.selectionText) {
    chrome.storage.sync.get({
      defaultLang: '',
      specifyFromLang: false,
      fromLang: ''
    }, (items) => {
      let url = 'https://translate.kagi.com/?text=' +
        encodeURIComponent(info.selectionText);
      if (items.specifyFromLang && items.fromLang) {
        url += '&from=' + items.fromLang;
      }
      if (items.defaultLang) {
        url += '&to=' + items.defaultLang;
      }
      chrome.tabs.create({ url: url });
    });
  }
});
