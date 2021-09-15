# openTopResults

**This add-on injects CSS into web pages. The `addons.mozilla.org` domain disallows this operation, so this add-on will not work properly when it's run on pages in the `addons.mozilla.org` domain.**

** This add-on opens the top three search results links of a Google or DuckDuckGo search and opens the specified number of links in new browser tabs.**

## What it does

This extension includes:

* a background script, "background.js"
* a browser action
* a content script, "content_scripts/content.js"
* an options script, "options/options.js"
* a keyboard shortcut, "shift+command+Y"

When the browser action is invoked the background script sends a message to the content script.  The content script collects the appropriate links on the search page and the promise returns an object containing the result, an array of available links, to the background script.  The background script then opens the user specified number of links (default 3) in new unopened browser tabs.  
The user also has access to the preference options and can choose the number of tabs to open (between 1 - 5) when the browser action is invoked.
This extension only works on Google or DuckDuckGo search results pages within the domain of `google.com/search?` and `duckduckgo.com/`.


## Local Installation - FireFox Temporary Extensions

Currently, without having Mozilla authorize this extension, the only way to load this extension is to use the built in FireFox Temporary Extension Manager.

Follow the instructions listed to install an extension temporarily: 
https://extensionworkshop.com/documentation/develop/temporary-installation-in-firefox/#reloading-a-temporary-extension

OR follow these steps

1. Unzip folder
2. In urlbar, go to: about:debugging#/runtime/this-firefox ==> load temporary Add-ons
3. Locate `openTopResults` folder on your system.
4. Open `manifest.json`.  You should see a white ribbon button added to the browser in the top right corner next to the search bar.
5. Go to DDG or Google and perform a search. e.g. “Could God microwave a burrito so hot even he could not eat it?”
6. You should see the search results page as usual.
7. Use the mouse to click the ribbon button, or use Hotkey: Shift+Command+Y. 
Expectation: Three new unopened tabs populate in the browser containing the top three results of the search page.
8. Got to `about:addons` ==> OpenTopResults ==> Preferences
9. Change the number of tabs to open.
10. Repeat 5, 6, 7
