/**
 * sites.js - BigBooruViewer site compatability handling
 * 
 * Contains logic for analyzing URLs and loading SiteInterfaces.
 * 
 * @author p-a-t-a-r <mail.patar@gmail.com>
 */

let URI = require("urijs");

import SiteInterfacee621 from "./sites/e621.js";

 /**
  * Checks if the given URL points to a valid image gallery.
  * 
  * @param {string} url The URL to check.
  * @returns true if the URL is a valid gallery, false otherwise.
  */
export function checkUrl(url)
{
    // TODO: actually check the URL lol
    return true;
}

/**
 * Get a prepared SiteInterface for the given gallery.
 * 
 * @param {string} url The URL of the gallery to get a SiteInterface for.
 * @return The prepared SiteInterface, or null if the URL does not point to a valid gallery
 */
export function getSiteInterface(url)
{
    // TODO: actually check the URL lol
    return new SiteInterfacee621();
}
