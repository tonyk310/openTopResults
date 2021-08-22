// Regex-pattern to check URLs against. 
// It matches URLs like: http[s]://[...]stackoverflow.com[...]
var urlRegex = /^https?:\/\/(?:[^./?#]+\.)?stackoverflow\.com/;

// A function to use as callback
function doStuffWithDom(domContent) {
  console.log('I received the following DOM content:\n' + domContent);
  browser.tabs.create({
    "url": domContent
  });
}

// When the browser-action button is clicked...
browser.browserAction.onClicked.addListener(function (tab) {
    // ...check the URL of the active tab against our pattern and...
    if (urlRegex.test(tab.url)) {
        // ...if it matches, send a message specifying a callback too
        browser.tabs.sendMessage(tab.id, {text: 'report_back'}, doStuffWithDom);
    }
});
