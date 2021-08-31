// Listen for messages
browser.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    // If the received message has the expected format...

    if (msg.text === 'message_received') {

      if (msg.search_engine === "duckduckgo") {
        var linkStringArray = [];
        // Grab the `links` element from the DOM.
        var linksElement = document.getElementById('links');
        // The links element contains `h2` which contain the hyper-links we are looking for.
        var h2Set = linksElement.querySelectorAll('h2');

        // for each element 'currentLinkString' in the linkSet
        for (var i = 0; i < h2Set.length; i++) {
          var currentH2Element = h2Set[i];
          var currentLinkString = currentH2Element.querySelector('a').href;
          linkStringArray.push(currentLinkString);
        }

        // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage#addlistener_syntax
        var serializedLinkStringArray = JSON.stringify(linkStringArray);
        sendResponse(serializedLinkStringArray);        
      }

      var linkSet = [];
      if (msg.search_engine === "google") {
        var searchContainerElement = document.getElementById('search');
        var linksContainerElementSet = searchContainerElement.querySelectorAll(".yuRUbf");
        for (var i = 0; i < linksContainerElementSet.length; i++) {
          var currentLinkString = linksContainerElementSet[i].querySelector('a').href;
          linkSet.push(currentLinkString);
        }

        var serializedLinkSet = JSON.stringify(linkSet);
        sendResponse(serializedLinkSet);
        
      }



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