/**
 * sites/e621.net - The site interface for e621 and e926.
 */

export default class SiteInterfacee621
{
    /**
     * Returns the identifier for the SiteInterface.
     * 
     * @return {string}
     */
    getIdentifier()
    {
        return "e621";
    }
    
    // Fetches image relative to id in the reverse direction
    fetchPrevious(image, id)
    {
        this.fetchImage(image, "order:id id:>" + id);
    }

    // Fetches image relative to id in the forward direction
    fetchNext(image, id)
    {
        this.fetchImage(image, "order:-id id:<" + id);
    }

    // Fetches image relative to id in a random direction
    fetchRandom(image, id)
    {
        this.fetchImage(image, "order:random");
    }
    
    // Fetches image using the specified id
    fetchID(image, id)
    {
        this.fetchImage(image, "id:" + id);
    }

    // Internal Functions

    // Fetches image using the given search clause
    fetchImage(image, clause)
    {
        // Set the fetchstarted flag
        image.fetchstarted = true;

        // Fetch the JSON using the search clause
        PromiseXHR(
            location.origin + "/post/index.json?limit=1&tags=" + bbviewer.search + " " + clause
        ).then(
            function(response) { bbviewer.site.handleResponse(image, response); },
            function() { image.markError(); }
        );
    }

    // Handle the JSON response from e621
    handleResponse(image, data)
    {
        // Parse the JSON
        var json = JSON.parse(data);

        // Make sure we got something
        if (typeof(json[0]) === "undefined") image.markError();

        // Set our properties
        image.id = json[0].id;
        image.url_small = json[0].sample_url;
        image.url_full = json[0].file_url;
        image.score = json[0].score;
        image.faves = json[0].fav_count;
        image.artist = json[0].artist.join(", ");

        // Mark the image as fetched
        image.markFetched();
    }
}
