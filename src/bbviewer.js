/**
 * bbviewer.js - Core logic for BigBooruViewer.
 * 
 * Contains logic for initializing the viewer and managing image objects.
 */

// Global container for viewer data
let bbviewer = {
    // The current site interface, encapsulates all site-specific logic
    "site": null,

    // The current image object
    "current": null,

    // The ID of the image currently loaded into the UI, used to prevent double loads
    "loadedid": 0,

    // The current search string
    "search": "",

    // The current slideshow delay, in seconds
    "slideshowdelay": 10,

    // The current sideshow direction, can be "previous", "next", or "random"
    "slideshowdirection": "next"
};

// Lambda our global code so we can use await
(async () => {

    // Get the current tab object
    let tab = await browser.tabs.getCurrent();
    
    // Make sure we have a valid openerTabId
    if (typeof(tab.openerTabId) !== "undefined")
    {
        // Get our opener tab
        let opener = await browser.tabs.get(tab.openerTabId);

        console.log(opener.url);
    }

// End of the async lambda
})();
