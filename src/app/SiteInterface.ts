import BooruImageData from "./BooruImageData";
import SiteInterfaceDerpibooru from "./sites/Derpibooru";
import SiteInterfacee621 from "./sites/e621";

import * as URI from "urijs";

/**
 * SiteInterface.ts - Interface for implementing site-specific functionality.
 */
export default interface SiteInterface
{
    /**
     * The URL of the gallery that is being viewed.
     */
    sourceUrl: string
    
    /**
     * Get the identifier for the SiteInterface.
     */
    getIdentifier() : string
    
    /**
     * Asynchronously fetch the previous BooruImageData object relative to the given image ID.
     * 
     * @return The BooruImageData object, or null if there was an error.
     */
    fetchFromNext(id: number) : Promise<BooruImageData | null>
    
    /**
     * Asynchronously fetch the next BooruImageData object relative to the given image ID.
     * 
     * @return The BooruImageData object, or null if there was an error.
     */
    fetchFromPrevious(id: number) : Promise<BooruImageData | null>
    
    /**
     * Asynchronously fetch a random BooruImageData object.
     * 
     * @return The BooruImageData object, or null if there was an error.
     */
    fetchRandomly() : Promise<BooruImageData | null>
    
    /**
     * Asynchronously fetch the BooruImageData object with the given image ID.
     * 
     * @return The BooruImageData object, or null if there was an error.
     */
    fetchId(id: number) : Promise<BooruImageData | null>
}

/**
 * Interface for the static portion of a SiteInterface (i.e. the type itself)
 */
export interface SiteInterfaceStatic
{
    /**
     * Create a new SiteInterface for the specified image gallery.
     * 
     * @param url The URL of the gallery to pull images from.
     */
    new(url: string) : SiteInterface

    /**
     * Check if a URL points to a valid image gallery for this SiteInterface.
     * 
     * @param url The URL to check.
     * @return true if the URL points to a valid gallery, false otherwise.
     */
    checkUrl(url: string) : boolean
}

/**
 * Gets the SiteInterfaceStatic (i.e. the interface type) for the given URL.
 * 
 * @return The SiteInterfaceStatic for the host, or null if the host is invalid.
 */
export function getSiteInterfaceStatic(url: string): SiteInterfaceStatic | null
{
    // Parse the URL
    let parsedUrl = new URI(url);

    // Return a SiteInterface based on the hostname
    switch (parsedUrl.hostname())
    {
        case "e621.net":
            return SiteInterfacee621;

        case "derpibooru.org":
        case "www.derpibooru.org":
        case "trixiebooru.org":
        case "www.trixiebooru.org":
            return SiteInterfaceDerpibooru;

        default:
            return null;
    }
}
