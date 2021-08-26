// Listen for messages
browser.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    // If the received message has the expected format...
    if (msg.text === 'message_received') {

      var linkStringArray = [];
      // Get the set of links contained within the h2's on the page.
      var linksElement = document.getElementById('links');
      var linksH2Set = linksElement.querySelectorAll('h2');
      // for each element 'currentLink' get the href
      for (var i = 0; i < 3; i++) {
        var currentH2Object = linksH2Set[i];
        var currentLinkString = currentH2Object.querySelector('a').href;
        linkStringArray.push(currentLinkString);
      }

      // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage#addlistener_syntax
      var serializedLinkStringArray = JSON.stringify(linkStringArray);
      sendResponse(serializedLinkStringArray);

      //////////////////////////////
      // GOOGLE //
      /*
        var hrefSet = [];
        for (var i = 0; i < 5; i++) {
          var href = h3s[i].querySelector('a').href;
          hrefSet.push(href);
        }
      */
    }
});