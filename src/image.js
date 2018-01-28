/**
 * image.js - The BBViewerImage class.
 */

/**
 * Represents an image to be displayed.
 * 
 * Contains the image data from the booru and handles the process of fetching the data.
 * Images are fetched relative to each other using methods on this object.
 * Site-specific portions of the image fetching logic are delegated to the attached SiteInterface.
 */
export default class BBViewerImage {
    constructor(
        siteInterface,
        previous,
        next
    ) {
        // The SiteInterface to use for fetching the images
        this.siteInterface = siteInterface;

        // The previous image
        this.previous = previous;

        // The next image
        this.next = next;

        // A random image
        this.random = null;

        // The image ID
        this.id = null;

        // True if a fetch has been triggered, false if it has not
        this.fetchstarted = false;

        // True if the image data has been fetched, false if it has not
        this.fetched = false;

        // True if there was an error fetching the image, false otherwise
        this.error = false;
        
        // True if a state should be pushed when the image is loaded, false otherwise
        this.pushstate = true;
        
        // The URL of the small image
        this.url_small = null;

        // The URL of the full size image
        this.url_full = null;

        // The number of upvotes the image has
        this.upvotes = null;

        // The number of downvotes the image has
        this.downvotes = null;

        // The score of the image
        this.score = null;

        // The number of favorites the image has
        this.faves = null;

        // The number of comments the image has
        this.comments = null;

        // A comma-separated list of artists
        this.artist = null;
    }

    // Create the previous image and fetch it if possible
    fetchPrevious()
    {
        if (this.previous === null)
        {
            // If we're errored, abort
            if (this.error) return;

            this.previous = new BBViewerImage(null, this);

            // Trigger the fetch if this is done fetching, otherwise the fetch will trigger once this is fetched
            if (this.fetched) this.siteInterface.fetchPrevious(this.previous, this.id);
        }
    }

    // Create the next image and fetch it if possible
    fetchNext()
    {
        if (this.next === null)
        {
            // If we're errored, abort
            if (this.error) return;

            // Create the new image
            this.next = new BBViewerImage(this, null);
            
            // Fetch the new image if this is done fetching
            if (this.fetched) this.siteInterface.fetchNext(this.next, this.id);
        }
    }

    // Create a random image and fetch it if possible
    fetchRandom()
    {
        if (this.random === null)
        {
            // If we're errored, abort
            if (this.error) return;

            // Create the new image
            this.random = new BBViewerImage(null, null);
            
            // Fetch the new image if this is done fetching
            if (this.fetched) this.siteInterface.fetchRandom(this.random, this.id);
        }
    }

    // Fetches this image using the specified ID
    fetchID(id)
    {
        // If fetchstarted is set, abort
        if (this.fetchstarted) return;

        // go fetch
        this.siteInterface.fetchID(this, id);
    }

    // Mark this image as fetched
    markFetched()
    {
        // Set the fetched flag
        this.fetched = true;

        // Perform a cache prime on the small image
        var img = new Image()
        img.src = this.url_small;

        // Fetch our neighbors if necessary
        if (this.previous !== null && !this.previous.fetchstarted)
        {
            this.siteInterface.fetchPrevious(this.previous, this.id)
        }
        if (this.next !== null && !this.next.fetchstarted)
        {
            this.siteInterface.fetchNext(this.next, this.id)
        }
        if (this.random !== null && !this.random.fetchstarted)
        {
            this.siteInterface.fetchRandom(this.random, this.id)
        }

        // Update the UI
        updateUI();
    }

    // Mark this image as errored
    markError()
    {
        // Make sure the fetchstarted flag is set
        this.fetchstarted = true;

        // Make sure the fetched flag is unset
        this.fetched = false;

        // Set the error flag
        this.error = true;

        // Propagate the error and cut our links to any unfetched images
        if (this.previous !== null && !this.previous.fetchstarted)
        {
            this.previous.markError();
            this.previous = null;
        }
        if (this.next !== null && !this.next.fetchstarted)
        {
            this.next.markError();
            this.next = null;
        }
        if (this.random !== null && !this.random.fetchstarted)
        {
            this.random.markError();
            this.random = null;
        }

        // Trigger a UI update
        updateUI();
    }
}
