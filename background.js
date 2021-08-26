// Regex-pattern to check URLs against. 
// It matches URLs like: http[s]://[...]stackoverflow.com[...]
var urlRegex = /^https?:\/\/(?:[^./?#]+\.)?duckduckgo\.com/;

// A function to use as callback
function createTabLinks(domContent) {

  var parsedLinkStringArray = JSON.parse(domContent);
  // console.log(parsedLinkStringArray);

  for (var i = 0; i < parsedLinkStringArray.length; i++) {
    var currentLinkString = parsedLinkStringArray[i];

    browser.tabs.create({
      // set the url of the created tab.
      "url": currentLinkString,
      // "active": false, stay in the current tab.  Do not switch tabs to the created tab.
      "active": false
    });    
  }
}


// When the browser-action button is clicked...

browser.browserAction.onClicked.addListener(function (tab) {
  
    // ...check the URL of the active tab against our pattern and...
    if (urlRegex.test(tab.url)) {
        // ...if it matches, send a message specifying a callback too
        browser.tabs.sendMessage(tab.id, {text: 'message_received'}, createTabLinks);
    }
});




// From Beastify

// browser.tabs.executeScript({file: "/content_scripts/content.js"})
// .then(function() {
//   // When the browser-action button is clicked...
//   browser.browserAction.onClicked.addListener(function (tab) {
//     browser.tabs.sendMessage(tab.id, {text: 'message_received'}, createTabLinks);
//   });  
// });

// browser.tabs.executeScript({file: "/content_scripts/content.js"})
// .then(function() {
//   console.log("Hello from background.js, the promise was returned."); 
// }).catch(function() {
//   console.log("We CAUGHT an error.");
// });

// Stack Overflow
// var updateTextTo = document.getElementById('comments').value;
// browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
//   console.log(tabs);
//     browser.tabs.executeScript(tabs[0].id, {
//         file: "/content_scripts/content.js"
//     }, function(){
//         browser.tabs.sendMessage(
//           tabs[0].id, { text: 'message_received' }, createTabLinks
//         );
//     });
// });












