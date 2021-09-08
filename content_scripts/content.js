

// Listen for messages
browser.runtime.onMessage.addListener(function (msg, sender, sendResponse) {

  function getLinkString(linksSet) {
    for (var i = 0; i < linksSet.length; i++) {
      var currentLinkString = linksSet[i].querySelector('a').href;
      linksArray.push(currentLinkString);
    }         
  }

  var linksArray = [];
  var linksElement;
  var linksSet;

  if (msg.search_engine === "duckduckgo") {
    // Grab the `links` element from the DOM.
    linksElement = document.getElementById('links');
    // The links element contains `h2` which contain the hyper-links we are looking for.
    linksSet = linksElement.querySelectorAll('h2');
    getLinkString(linksSet);
  }

  if (msg.search_engine === "google") {
    linksElement = document.getElementById('search');
    linksSet = linksElement.querySelectorAll(".yuRUbf");
    getLinkString(linksSet);
  }

  return Promise.resolve({"linksArray": linksArray}); 
});