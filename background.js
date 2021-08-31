// A function to use as callback
function createTabLinks(domContent) {
  var parsedLinkStringArray = JSON.parse(domContent);
  var numberOfLinksToOpen = preferenceValue;

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

  var urlString = tab.url;
  var search_engine = urlString.replace(/.+\/\/|www.|\..+/g, '');

  browser.storage.sync.get("integer").then(function(res) {
    preferenceValue = res.integer;
  }).catch(function(error) {
    console.log("you found an error, storage sync");
  });

  browser.tabs.sendMessage(tab.id, {text: 'message_received', "search_engine": search_engine}, createTabLinks);

});














