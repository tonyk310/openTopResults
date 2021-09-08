// A function to use as callback
function createTabLinks(response) {
  console.log(666);
  // var parsedLinkStringArray = JSON.parse(response);
  // console.log(preferenceValue + " from inside of callback");
  var numberOfLinksToOpen = preferenceValue;
  var linksArray = response.linksArray;

  for (var i = 0; i < numberOfLinksToOpen; i++) {
    // var currentLinkString = parsedLinkStringArray[i];
    var currentLinkString = linksArray[i];

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
// var preferenceValue = 3;
var preferenceValue;

function getPreferenceValueFromStorage() {
  console.log(222);
  browser.storage.sync.get("integer").then(function(res) {
    // Assign the preferenceValue as a global variable.
      // This is because the the value is returned in a promise and I cannot pass this through to the callback.
    // If the promise returns undefined because the value has never been set
    // put in a default value to save as preference value.
    console.log(555);
    preferenceValue = res.integer || 3;

  }).catch(function(error) {
    console.log("you found an error, storage sync");
  });  
}

function sendMessageToContentScript(tab) {
  console.log(444);
  var urlString = tab.url;
  var searchEngineString = urlString.replace(/.+\/\/|www.|\..+/g, '');  

  // browser.tabs.sendMessage(tab.id, {text: 'message_received', "search_engine": searchEngineString}).then(function(response) {
  //   console.log(response.linkStringArray.length);
  //   console.log("sendMessagePromise");
  // });

  // I could put in a conditional which does not even activate this 
  // as of right now if it is not one of the pages that are not allowed on the content pages
  // it will throw an error
  // so it might be a good idea to put in the conditional.
  if (searchEngineString === "duckduckgo" || searchEngineString === "google") {
    // Send the message and then run the promise.
    browser.tabs.sendMessage(tab.id, {text: 'message_received', "search_engine": searchEngineString}).then(createTabLinks);    
  }
  
}

browser.browserAction.onClicked.addListener(function (tab) {

  console.log(111);
  getPreferenceValueFromStorage();
  console.log(333);
  sendMessageToContentScript(tab);
});














