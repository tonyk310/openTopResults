// Listen for messages
browser.runtime.onMessage.addListener(function (msg, sender, sendResponse) {

  function getLinkString(linksSet) {
    for (var i = 0; i < linksSet.length; i++) {
      var currentElement = linksSet[i];
      var currentLinkString = currentElement.querySelector('a').href;  
      linksArray.push(currentLinkString);
    }         
  }

  var linksArray = [];
  var linksElement;
  var linksSet;

  if (msg.search_engine === "duckduckgo") {
    linksElement = document.getElementById('links');
    linksSet = linksElement.getElementsByClassName('result');
  }

  if (msg.search_engine === "google") {
    linksElement = document.getElementById('search');
    linksSet = linksElement.querySelectorAll(".yuRUbf");
  }

  getLinkString(linksSet);

  return Promise.resolve({"linksArray": linksArray}); 
});