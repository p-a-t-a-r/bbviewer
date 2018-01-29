import BooruImage from "./BooruImage";
import MainView from "./MainView";
import SiteInterface from "./SiteInterface";

/**
 * App.ts - The core BigBooruViewer application object.
 */
export default class App
{
    siteInterface: SiteInterface
    mainView: MainView
    currentImage: BooruImage

    /**
     * Create a new BBViewer application.
     * 
     * @param siteInterface A SiteInterface to fetch images from.
     */
    constructor(siteInterface: SiteInterface)
    {
        this.siteInterface = siteInterface;
    }

    /**
     * Launch the application.
     */
    launch()
    {
        // Create a capturable reference to this
        let bbviewer = this;

        // Register the keyboard event handler
        document.addEventListener("keydown", function(event){ bbviewer.onKeydown(event) });

        // Register the popstate event handler
        window.onpopstate = function(event){ bbviewer.onPopstate(event) };

        console.log("derp");
    }

    /**
     * Handler for keydown events.
     * 
     * Calls the appropriate trigger if a shortcut key was pressed.
     */
    onKeydown(event: KeyboardEvent)
    {
        switch(event.which)
        {
            case 74: // j
                this.previousImage();
                break;
            
            case 75: // k
                this.nextImage();
                break;
            
            case 82: // r
                this.randomImage();
                break;
            
            case 85: // u
                this.upvoteImage();
                break;
            
            case 70: // f
                this.favoriteImage();
                break;
        }
    }

    /**
     * Handler for popstate events.
     * 
     * Loads the image if a valid bbviewer state was popped,
     * otherwise reloads the page.
     */
    onPopstate(event: PopStateEvent)
    {
        // Make sure we have a valid state
        if (typeof(event.state.bbviewerid) === "undefined")
        {
            // If this isn't one of our pages, just refresh
            location.reload();
        }
        
        // Create a new image
        this.currentImage = new BooruImage(this, null, null);
        
        // Make sure we don't repush the state for the image
        this.currentImage.pushState = false;

        // Fetch the image
        this.currentImage.fetchId(event.state.bbviewerid);
    
        // Trigger a UI update
        this.mainView.update();
    }

    // Switch to the previous image
    previousImage()
    {
        // Create the previous image
        this.currentImage.createPrevious();
    
        // Make sure the previous image is there
        if (this.currentImage.previous === null) return;
      
        // Make sure a new state gets pushed for the image
        this.currentImage.previous.pushState = true;
    
        // Switch to the previous image
        this.currentImage = this.currentImage.previous;
    
        // Prefetch the new previous image
        this.currentImage.createPrevious();
    
        // Trigger a UI update
        this.mainView.update();
    }
    
    // Switch to the next image
    nextImage()
    {
        // Create the next image
        this.currentImage.createNext();
    
        // Make sure the next image is there
        if (this.currentImage.next === null) return;
      
        // Make sure a new state gets pushed for the image
        this.currentImage.next.pushState = true;
    
        // Switch to the next image
        this.currentImage = this.currentImage.next;
    
        // Prefetch the new next image
        this.currentImage.createNext();
    
        // Trigger a UI update
        this.mainView.update();
    }
    
    // Switch to a random image
    randomImage()
    {
        // Create a random image
        this.currentImage.createRandom();
    
        // Make sure the random image is there
        if (this.currentImage.random === null) return;
      
        // Make sure a new state gets pushed for the image
        this.currentImage.random.pushState = true;
    
        // Switch to the previous image
        this.currentImage = this.currentImage.random;
    
        // Prefetch the new random image
        this.currentImage.createRandom();
    
        // Trigger a UI update
        this.mainView.update();
    }

    upvoteImage()
    {
        // TODO: implement lol        
    }

    favoriteImage()
    {
        // TODO: implement lol
    }

    onImageUpdated(image: BooruImage)
    {
        // TODO: implement lol
    }
}
