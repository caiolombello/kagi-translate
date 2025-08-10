function saveOptions() {
  const lang = document.getElementById('default-lang').value;
  const specifyFrom = document.getElementById('specify-from-lang').checked;
  const fromLang = document.getElementById('from-lang').value;

  chrome.storage.sync.set({
    defaultLang: lang,
    specifyFromLang: specifyFrom,
    fromLang: fromLang
  }, () => {
    const status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(() => {
      status.textContent = '';
    }, 750);
  });
}

function restoreOptions() {
  chrome.storage.sync.get({
    defaultLang: '',
    specifyFromLang: false,
    fromLang: '',
    theme: 'light'
  }, (items) => {
    document.getElementById('default-lang').value = items.defaultLang;
    document.getElementById('specify-from-lang').checked = items.specifyFromLang;
    document.getElementById('from-lang').value = items.fromLang;
    document.getElementById('from-lang').disabled = !items.specifyFromLang;

    const isDarkMode = items.theme === 'dark';
    document.getElementById('theme-toggle').checked = isDarkMode;
    document.body.className = isDarkMode ? 'dark-mode' : '';
  });
}

function handleThemeToggle() {
  const isDarkMode = document.getElementById('theme-toggle').checked;
  const theme = isDarkMode ? 'dark' : 'light';

  document.body.className = isDarkMode ? 'dark-mode' : '';

  chrome.storage.sync.set({ theme: theme });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
document.getElementById('specify-from-lang').addEventListener('change', (event) => {
  document.getElementById('from-lang').disabled = !event.target.checked;
});
document.getElementById('theme-toggle').addEventListener('change', handleThemeToggle);
