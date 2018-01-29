/**
 * BooruImageData.ts - Container for image metadata retrieved from a booru.
 */
export default class BooruImageData
{
    /**
     * Create a new BooruImageData object.
     * 
     * @param id The ID of the image.
     * @param urlSmall The URL of the preview image file.
     * @param urlFull The URL of the full-size image file.
     * @param upvotes The number of upvotes the image has.
     * @param downvotes The number of downvotes the image has.
     * @param score The score of the image.
     * @param faves The number of favorites the image has.
     * @param comments The number of comments the image has.
     */
    constructor(
        public id: number,
        public urlSmall: string,
        public urlFull: string,
        public upvotes: number,
        public downvotes: number,
        public score: number,
        public faves: number,
        public comments: number
    ) { }
}
