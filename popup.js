document.getElementById('triggerKeyboard').addEventListener('click', function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var currentTab = tabs[0];
    chrome.tabs.sendMessage(currentTab.id, {"message": "trigger_keyboard"});
  });
});
