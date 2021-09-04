// A function to use as callback
function createTabLinks(response) {
  // var parsedLinkStringArray = JSON.parse(response);
  // console.log(preferenceValue + " from inside of callback");
  var numberOfLinksToOpen = preferenceValue;
  var linkStringArray = response.linkStringArray;

  for (var i = 0; i < numberOfLinksToOpen; i++) {
    // var currentLinkString = parsedLinkStringArray[i];
    var currentLinkString = linkStringArray[i];

    browser.tabs.create({
      // set the url of the created tab.
      "url": currentLinkString,
      // "active": false, stay in the current tab.  Do not switch tabs to the created tab.
      "active": false
    });    
  }
}


// var preferenceValue = 3;
// // When the browser-action button is clicked...

// browser.browserAction.onClicked.addListener(function (tab) {

//   var urlString = tab.url;
//   var search_engine = urlString.replace(/.+\/\/|www.|\..+/g, '');

//   browser.storage.sync.get("integer").then(function(res) {
//     preferenceValue = res.integer;
//   }).catch(function(error) {
//     console.log("you found an error, storage sync");
//   });

//   browser.tabs.sendMessage(tab.id, {text: 'message_received', "search_engine": search_engine}, createTabLinks);

// });

// Global Variable
var preferenceValue = 3;

function getPreferenceValueFromStorage() {
  browser.storage.sync.get("integer").then(function(res) {
    preferenceValue = res.integer;
  }).catch(function(error) {
    console.log("you found an error, storage sync");
  });  
}

function sendMessageToContentScript(tab) {
  var urlString = tab.url;
  var searchEngineString = urlString.replace(/.+\/\/|www.|\..+/g, '');  

  // browser.tabs.sendMessage(tab.id, {text: 'message_received', "search_engine": searchEngineString}).then(function(response) {
  //   console.log(response.linkStringArray.length);
  //   console.log("sendMessagePromise");
  // });
  browser.tabs.sendMessage(tab.id, {text: 'message_received', "search_engine": searchEngineString}).then(createTabLinks);  
}

browser.browserAction.onClicked.addListener(function (tab) {

  getPreferenceValueFromStorage();
  sendMessageToContentScript(tab);
});














