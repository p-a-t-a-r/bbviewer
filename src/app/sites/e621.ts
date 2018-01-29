import BooruImageData from "../BooruImageData";
import fetchAsync from "../fetchAsync";
import SiteInterface from "../SiteInterface";

/**
 * sites/e621.ts - The site interface for e621 and e926.
 */
export default class e621 implements SiteInterface
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
     * Create a new SiteInterface for the specified e621 gallery.
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
        return "e621";
    }
    
    /**
     * Asynchronously fetch the previous BooruImageData object relative to the given image ID.
     * 
     * @return The BooruImageData object, or null if there was an error.
     */
    public async fetchFromNext(id: number) : Promise<BooruImageData | null>
    {
        return await this.fetchImageData("order:id id:>" + id);
    }
    
    /**
     * Asynchronously fetch the next BooruImageData object relative to the given image ID.
     * 
     * @return The BooruImageData object, or null if there was an error.
     */
    public async fetchFromPrevious(id: number) : Promise<BooruImageData | null>
    {
        return await this.fetchImageData("order:-id id:<" + id);
    }
    
    /**
     * Asynchronously fetch a random BooruImageData object.
     * 
     * @return The BooruImageData object, or null if there was an error.
     */
    public async fetchRandomly() : Promise<BooruImageData | null>
    {
        return await this.fetchImageData("order:random");
    }
    
    /**
     * Asynchronously fetch the BooruImageData object with the given image ID.
     * 
     * @return The BooruImageData object, or null if there was an error.
     */
    public async fetchId(id: number) : Promise<BooruImageData | null>
    {
        return await this.fetchImageData("id:" + id);
    }

    /**
     * Asynchronously fetch a BooruImageData object using the given search clause.
     * 
     * @param clause A search clause to concatenate to this.search.
     * @return The BooruImageData object, or null if there was an error.
     */
    private async fetchImageData(clause: string) : Promise<BooruImageData | null>
    {
        var response : string;

        // Fetch the JSON using the search clause
        try
        {
            response = await fetchAsync(
                location.origin + "/post/index.json?limit=1&tags=" + this.search + " " + clause
            );
        }
        catch (errorMessage)
        {
            return null;
        }

        // Parse the JSON
        var json = JSON.parse(response);

        // Make sure we got something
        if (typeof(json[0]) === "undefined") return null;

        // Return a new BooruImageData object
        return new BooruImageData(
            json[0].id,
            json[0].sample_url,
            json[0].file_url,
            0,
            0,
            json[0].score,
            json[0].fav_count,
            0
        );
    }
}
