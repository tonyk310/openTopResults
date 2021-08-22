// Listen for messages
browser.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    // If the received message has the expected format...
    if (msg.text === 'report_back') {
        // Call the specified callback, passing
        // the web-page's DOM content as argument

        // This will log in the tab console.  This is good 
        var h5linkHref = document.body.querySelector('h5').querySelector('a').href;
        console.log(h5linkHref);
        // sendResponse(document.all[0].outerHTML);
        sendResponse(h5linkHref);
        
    }
});