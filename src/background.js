/**
 * background.js - Background script for BigBooruViewer
 * 
 * Enables the bbviewer page action on valid gallery pages.
 * 
 * TODO: COMPATIBILITY NOTE
 * We are using chrome.pageAction.show and chrome.pageAction.hide rather than their standardized browser.*
 * equivalents due to a bug in webextension-polyfill (https://github.com/mozilla/webextension-polyfill/issues/24).
 * This should be changed when the bug is fixed or if Chrome implements the WebExtensions standard properly
 * (they won't because fucking Google, but we can always hope).
 */

import { getSiteInterfaceStatic } from './app/SiteInterface';

/**
 * Handles tab.onUpdated events.
 * 
 * Checks the tab's URL if it has changed,
 * and enables or disables the page action accordingly.
 * 
 * @param {number} tabId The ID of the tab that was updated.
 * @param {object} changeInfo A list of tab properties that changed.
 * @param {tabs.Tab} tab The tab that that was updated.
 */
function onTabUpdated(tabId, changeInfo, tab)
{
    // Check if the URL changed
    if (typeof(changeInfo.url) !== 'undefined')
    {
        // Get a SiteInterface type based on the new URL
        let siteInterfaceType = getSiteInterfaceStatic(changeInfo.url);
        
        // Enable the page action if the new URL is valid, otherwise disable it.
        if (siteInterfaceType === null || !siteInterfaceType.checkUrl(changeInfo.url))
        {
            chrome.pageAction.hide(tabId);
        }
        else
        {
            chrome.pageAction.show(tabId);
        }
    }
}

/**
* Handles pageAction.onClicked events.
* 
* Opens a new BigBooruViewer tab and sends it the URL of the current tab.
* 
* @param {tabs.Tab} tab The tab whose page action was clicked.
*/
function onPageActionClicked(tab)
{
    // Get a SiteInterface type based on the current URL
    let siteInterfaceType = getSiteInterfaceStatic(tab.url);
    
    // Make sure the URL is valid
    if (siteInterfaceType === null || !siteInterfaceType.checkUrl(tab.url))
    {
        chrome.pageAction.hide(tab.id);
        return;
    }
    
    // Open a new tab to the bbviewer page
    browser.tabs.create({
        cookieStoreId: tab.cookieStoreId,
        openerTabId: tab.id,
        url: '/bbviewer.html',
    });
}

// Register the event handlers
browser.tabs.onUpdated.addListener(onTabUpdated);
browser.pageAction.onClicked.addListener(onPageActionClicked);
