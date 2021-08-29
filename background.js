// Regex-pattern to check URLs against. 
// It matches URLs like: http[s]://[...]stackoverflow.com[...]
var urlRegex = /^https?:\/\/(?:[^./?#]+\.)?duckduckgo\.com/;

// A function to use as callback
function createTabLinks(domContent) {
  var parsedLinkStringArray = JSON.parse(domContent);
  // console.log(parsedLinkStringArray);
  var numberOfLinksToOpen = preferenceValue;
  console.log(preferenceValue);

  for (var i = 0; i < numberOfLinksToOpen; i++) {
    var currentLinkString = parsedLinkStringArray[i];

    browser.tabs.create({
      // set the url of the created tab.
      "url": currentLinkString,
      // "active": false, stay in the current tab.  Do not switch tabs to the created tab.
      "active": false
    });    
  }
}


var preferenceValue = 3;
// When the browser-action button is clicked...

browser.browserAction.onClicked.addListener(function (tab) {


  browser.storage.sync.get("integer").then(function(res) {
    console.log("inside createTabLinks returning the value :" + res.integer);
    preferenceValue = res.integer;
    console.log("preferenceValue inside of sync: " + preferenceValue);
  }).catch(function(error) {
    console.log("you found an error, storage sync");
  });
  console.log("preferenceValue outside of sync: " + preferenceValue);

  //
    // ...check the URL of the active tab against our pattern and...
    if (urlRegex.test(tab.url)) {
        // ...if it matches, send a message specifying a callback too
        browser.tabs.sendMessage(tab.id, {text: 'message_received'}, createTabLinks);
    }
});














