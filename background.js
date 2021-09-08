
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

// Global Variable
var preferenceValue;

function getPreferenceValueFromStorage() {
  browser.storage.sync.get("integer").then(function(res) {
    // Assign the preferenceValue as a global variable.
      // This is because the the value is returned in a promise and I cannot pass this through to the callback.
    // If the promise returns undefined because the value has never been set
    // put in a default value to save as preference value.
    preferenceValue = res.integer || 3;

  }).catch(function(error) {
    console.log("you found an error, storage sync");
  });  
}

function sendMessageToContentScript(tab) {
  var urlString = tab.url;
  var searchEngineString = urlString.replace(/.+\/\/|www.|\..+/g, '');  
  if (searchEngineString === "duckduckgo" || searchEngineString === "google") {
    // Send the message and then run the promise.
    browser.tabs.sendMessage(tab.id, {text: 'message_received', "search_engine": searchEngineString}).then(createTabLinks);    
  }
  
}

browser.browserAction.onClicked.addListener(function (tab) {
  getPreferenceValueFromStorage();
  sendMessageToContentScript(tab);
});














