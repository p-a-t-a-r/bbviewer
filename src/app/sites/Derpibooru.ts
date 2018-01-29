import BooruImageData from "../BooruImageData";
import fetchAsync from "../fetchAsync";
import SiteInterface from "../SiteInterface";

/**
 * sites/Derpibooru.ts - The site interface for Derpibooru.
 */
export default class Derpibooru implements SiteInterface
{
    /**
     * The URL of the gallery that is being viewed.
     */
    public sourceUrl: string

    /**
     * The search string we're using to filter images.
     */
    private search: string

    /**
     * Check if a URL points to a valid e621 image gallery.
     * 
     * @param url The URL to check.
     * @return true if the URL points to a valid gallery, false otherwise.
     */
    public static checkUrl(url: string) : boolean
    {
        // TODO: Actually check the URL lol
        return true;
    }

    /**
     * Create a new SiteInterface for the specified Derpibooru gallery.
     * 
     * @param url The URL of the gallery to pull images from.
     */
    constructor(url: string)
    {
        // TODO: Actually process the URL lol
        this.sourceUrl = url;
    }

    /**
     * Get the identifier for the SiteInterface.
     */
    public getIdentifier() : string
    {
        return "derpibooru";
    }
    
    /**
     * Asynchronously fetch the previous BooruImageData object relative to the given image ID.
     * 
     * @return The BooruImageData object, or null if there was an error.
     */
    public async fetchFromNext(id: number) : Promise<BooruImageData | null>
    {
        // TODO: actually fetch the image lol
        return null;
    }
    
    /**
     * Asynchronously fetch the next BooruImageData object relative to the given image ID.
     * 
     * @return The BooruImageData object, or null if there was an error.
     */
    public async fetchFromPrevious(id: number) : Promise<BooruImageData | null>
    {
        // TODO: actually fetch the image lol
        return null;
    }
    
    /**
     * Asynchronously fetch a random BooruImageData object.
     * 
     * @return The BooruImageData object, or null if there was an error.
     */
    public async fetchRandomly() : Promise<BooruImageData | null>
    {
        // TODO: actually fetch the image lol
        return null;
    }
    
    /**
     * Asynchronously fetch the BooruImageData object with the given image ID.
     * 
     * @return The BooruImageData object, or null if there was an error.
     */
    public async fetchId(id: number) : Promise<BooruImageData | null>
    {
        // TODO: actually fetch the image lol
        return null;
    }
}
