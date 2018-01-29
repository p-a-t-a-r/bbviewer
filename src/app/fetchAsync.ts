/**
 * app/fetchAsync.ts - An async/await compatible XHR wrapper.
 */

/**
 * Send a GET request to the specified URL.
 * 
 * Returns a promise which resolves on the response body for a 200,
 * the status message on a 204, and rejects on the status message for anything else.
 * 
 * @param url The URL to send the request to.
 */
export default function fetchAsync(url: string) : Promise<string>
{
    return new Promise(function(resolve, reject)
    {
        var XHR = new XMLHttpRequest();
        
        XHR.open("get", url, true);
        
        XHR.onload = function()
        {         
            if (XHR.status == 200)
            {
                resolve(XHR.responseText);
            }
            else if (XHR.status == 204)
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
