/**
 * bbviewer.js - Entry point for the BigBooruViewer web app.
 */

import { getSiteInterfaceStatic } from "./app/SiteInterface";
import App from "./app/App";

// Wrap our global code so we can use await and return
(async () => {

    // Get the current tab object
    let tab = await browser.tabs.getCurrent();
    
    // Make sure we have a valid openerTabId
    if (typeof(tab.openerTabId) === "undefined")
    {
        fatalError();
        return;
    }

    // Get our opener tab
    let opener = await browser.tabs.get(tab.openerTabId);

    // Get a SiteInterface type based on our opener's URL
    let siteInterfaceType = getSiteInterfaceStatic(opener.url);

    // Make sure we actually got a SiteInterface type
    if (siteInterfaceType === null)
    {
        fatalError();
        return;
    }

    // Make sure the URL is valid
    if (!siteInterfaceType.checkUrl(opener.url))
    {
        fatalError();
        return;
    }

    // Construct the SiteInterface
    let siteInterface = new siteInterfaceType(opener.url);

    // Construct the application
    let bbviewer = new App(siteInterface);

    // LAUNCH
    bbviewer.launch();

// End of the async lambda
})();

// Show an error message to the user then commit seppuku
function fatalError()
{
    alert("A fatal error occurred. Please close the tab and try again later.");
}
