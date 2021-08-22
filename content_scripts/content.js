// Listen for messages
browser.runtime.onMessage.addListener(function (msg, sender, callback) {
    // If the received message has the expected format...
    if (msg.text === 'message_received') {
      // Call the specified callback, passing
      // the web-page's DOM content as argument
      // sendResponse(document.all[0].outerHTML);

      // Grab one link
      // var linkElement = document.getElementById("links");
      // var link = linkElement.querySelector('a');
      // var hrefAsString = link.getAttribute('href');
      // sendResponse(hrefAsString);

      var linkStringArray = [];
      // Get the set of links on the page
      var h2Set = document.getElementsByTagName('h2');
      // for each element 'currentLink' get the href
      for (var i = 0; i < 3; i++) {
        var currentH2Object = h2Set[i];
        var currentLinkString = currentH2Object.querySelector('a').href;
        linkStringArray.push(currentLinkString);
      }

      var serializedLinkStringArray = JSON.stringify(linkStringArray);
      callback(serializedLinkStringArray);

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