/**
 * util.js - A collection of utility functions used by BigBooruViewer.
 */

/**
 * Send a GET request to the specified URL.
 * 
 * Returns a promise which resolves on the response body for a 200,
 * the status message on a 204, and rejects on the status message for anything else.
 * 
 * @param {string} url The URL to send the request to
 * @return {Promise}
 */
export function promiseHttp(url)
{
    return new Promise(function(resolve, reject)
    {
        var XHR = new XMLHttpRequest();
        
        XHR.open("get", url, true);
        
        XHR.onload = function()
        {         
            if (XHR.status == "200")
            {
                resolve(XHR.responseText);
            }
            else if (XHR.status == "204")
            {
                resolve(XHR.statusText);
            }
            else
            {
                reject(XHR.statusText);
            } 
        };
        
        XHR.onabort = function()
        {
            reject("Operation aborted");
        };
        
        XHR.onerror = function()
        {
            reject(XHR.statusText);
        };
        
        XHR.send();
    })
}

/**
 * A wrapper for DOM event callbacks.
 * 
 * Calls event.preventDefault then calls the callback with no parameters.
 * 
 * @param {function} callback A callback function with no parameters.
 * @return {function} A callback function to use as a DOM event handler.
 */
function wrapCallback(callback)
{
    return function(event)
    {
        event.preventDefault();
      
      	callback();
    }
}
