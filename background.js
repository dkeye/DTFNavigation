chrome.action.onClicked.addListener((tab) => {
    chrome.tabs.executeScript(tab.id, {file: "content.js"});
});
