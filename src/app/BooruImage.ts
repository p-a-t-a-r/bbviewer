import App from "./App";
import BooruImageData from "./BooruImageData"

/**
 * BooruImage.ts - Represents an image to be displayed.
 * 
 * Contains the image data from the booru and handles the process of fetching the data.
 * Images are fetched relative to each other using methods on this object.
 * Site-specific portions of the image fetching logic are delegated to the SiteInterface.
 */
export default class BooruImage
{
    /**
     * The BigBooruViewer application object.
     */
    app: App

    /**
     * The previous BooruImage relative to this.
     */
    previous: BooruImage | null

    /**
     * The next BooruImage relative to this.
     */
    next: BooruImage | null

    /**
     * A random BooruImage.
     */
    random: BooruImage | null

    /**
     * The ID of the image, if it has been fetched.
     */
    id: number | null

    /**
     * The BooruImageData for this image, if it has been fetched.
     */
    imageData: BooruImageData | null

    /**
     * True if a fetch has been triggered, false otherwise.
     */
    fetchStarted: boolean = false;

    /**
     * True if the BooruImageData was successfully fetched, false otherwise.
     */
    fetched: boolean = false;

    /**
     * True if there was an error fetching the BooruImageData, false otherwise.
     */
    error: boolean = false;

    /**
     * True if a state should be pushed when this image is loaded, false otherwise.
     */
    pushState: boolean = true;

    /**
     * Create a new BooruImage object.
     * 
     * @param app The BigBooruViewer application object.
     * @param previous The previous BooruImage relative to this.
     * @param next The next BooruImage relative to this.
     */
    constructor(
        app: App,
        previous: BooruImage | null,
        next: BooruImage | null
    ) {
        this.app = app;
        this.previous = previous;
        this.next = next;
    }

    /**
     * Creates this.previous if it doesn't already exist.
     * 
     * Image metadata for this.previous will be fetched asynchronously.
     */
    createPrevious()
    {
        // If we're errored, abort
        if (this.error) return;

        // Create the previous image if it doesn't exist
        if (this.previous === null)
        {
            this.previous = new BooruImage(this.app, null, this);

            // Trigger the fetch now if this is fetched.
            if (this.fetched) this.previous.fetchFromNext();
        }
    }

    /**
     * Creates this.next if it doesn't already exist.
     * 
     * Image metadata for this.next will be fetched asynchronously.
     */
    createNext()
    {
        // If we're errored, abort
        if (this.error) return;

        // Create the next image if it doesn't exist
        if (this.next === null)
        {
            this.next = new BooruImage(this.app, this, null);

            // Trigger the fetch now if this is fetched.
            if (this.fetched) this.next.fetchFromPrevious();
        }
    }

    /**
     * Creates this.random if it doesn't already exist.
     * 
     * Image metadata for this.random will be fetched asynchronously.
     */
    createRandom()
    {
        // If we're errored, abort
        if (this.error) return;

        // Create the random image if it doesn't exist
        if (this.random === null)
        {
            this.random = new BooruImage(this.app, null, null);

            // Trigger the fetch
            this.random.fetchRandomly();
        }
    }

    /**
     * Asynchronously fetch this image relative to the ID of the next image.
     */
    async fetchFromNext()
    {
        // If conditions are bad, abort
        if (this.fetchStarted || this.error) return;
        if (this.next === null || this.next.id === null) return;

        // Set the fetchStarted flag
        this.fetchStarted = true;

        // Fetch an ImageData object via the SiteInterface
        this.imageData = await this.app.siteInterface.fetchFromNext(this.next.id);

        // Make sure we got something
        if (this.imageData === null)
        {
            this.markError();
            return;
        }

        // Mark us as fetched
        this.markFetched();
    }

    /**
     * Asynchronously fetch this image relative to the ID of the previous image.
     */
    async fetchFromPrevious()
    {
        // If conditions are bad, abort
        if (this.fetchStarted || this.error) return;
        if (this.previous === null || this.previous.id === null) return;

        // Set the fetchStarted flag
        this.fetchStarted = true;

        // Fetch an ImageData object via the SiteInterface
        this.imageData = await this.app.siteInterface.fetchFromPrevious(this.previous.id);

        // Make sure we got something
        if (this.imageData === null)
        {
            this.markError();
            return;
        }

        // Mark us as fetched
        this.markFetched();
    }

    /**
     * Asynchronously fetch this image relative randomly.
     */
    async fetchRandomly()
    {
        // If conditions are bad, abort
        if (this.fetchStarted || this.error) return;

        // Set the fetchStarted flag
        this.fetchStarted = true;

        // Fetch an ImageData object via the SiteInterface
        this.imageData = await this.app.siteInterface.fetchRandomly();

        // Make sure we got something
        if (this.imageData === null)
        {
            this.markError();
            return;
        }

        // Mark us as fetched
        this.markFetched();
    }

    /**
     * Asynchronously fetch this image using a specific ID.
     * 
     * @param id The ID to use to fetch this image.
     */
    async fetchId(id: number)
    {
        // If conditions are bad, abort
        if (this.fetchStarted || this.error) return;

        // Set the fetchStarted flag
        this.fetchStarted = true;

        // Fetch an ImageData object via the SiteInterface
        this.imageData = await this.app.siteInterface.fetchId(id);

        // Make sure we got something
        if (this.imageData === null)
        {
            this.markError();
            return;
        }

        // Mark us as fetched
        this.markFetched();
    }

    // Mark this image as fetched
    markFetched()
    {
        // Make sure we have data
        if (this.imageData === null) return;
        
        // Set the fetched flag
        this.fetched = true;

        // Set this.id
        this.id = this.imageData.id;

        // Perform a cache prime on the small image
        var img = new Image()
        img.src = this.imageData.urlSmall;

        // Fetch our neighbors if necessary
        if (this.previous !== null && !this.previous.fetchStarted)
        {
            this.previous.fetchFromNext();
        }
        if (this.next !== null && !this.next.fetchStarted)
        {
            this.next.fetchFromPrevious();
        }

        // Alert the application
        this.app.onImageUpdated(this);
    }

    // Mark this image as errored
    markError()
    {
        // Make sure the fetchstarted flag is set
        this.fetchStarted = true;

        // Make sure the fetched flag is unset
        this.fetched = false;

        // Set the error flag
        this.error = true;

        // Propagate the error and cut our links to any unfetched images
        if (this.previous !== null && !this.previous.fetchStarted)
        {
            this.previous.markError();
            this.previous = null;
        }
        if (this.next !== null && !this.next.fetchStarted)
        {
            this.next.markError();
            this.next = null;
        }

        // Alert the application
        this.app.onImageUpdated(this);
    }
}
