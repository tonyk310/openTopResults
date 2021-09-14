function createTabLinks(response) {
  var numberOfLinksToOpen = preferenceValue;
  var linksArray = response.linksArray;

  for (var i = 0; i < numberOfLinksToOpen; i++) {
    var currentLinkString = linksArray[i];

    browser.tabs.create({
      // set the url of the created tab.
      "url": currentLinkString,
      // "active": false, stay in the current tab.  Do not switch tabs to the created tab.
      "active": false
    });    
  }
}

function onError(error) {
  console.log(`Error: ${error}`);
}

// Global Variable
var preferenceValue;

function getPreferenceValueFromStorage() {
  browser.storage.sync.get("integer").then(function(res) {
    preferenceValue = res.integer || 3;

  }).catch(onError);  
}

function sendMessageToContentScript(tab) {
  var urlString = tab.url;
  var searchEngineString = urlString.replace(/.+\/\/|www.|\..+/g, '');  
  if (searchEngineString === "duckduckgo" || searchEngineString === "google") {
    browser.tabs.sendMessage(tab.id, {"search_engine": searchEngineString}).then(createTabLinks).catch(onError);    
  }
  
}

browser.browserAction.onClicked.addListener(function (tab) {
  getPreferenceValueFromStorage();
  sendMessageToContentScript(tab);
});














