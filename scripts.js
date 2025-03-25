function setBodyBackground(imageUrl) {
    document.body.style.backgroundImage = `url('${imageUrl}')`;
    document.body.style.backgroundSize = "cover"; // Optional: Ensure it scales properly
    document.body.style.backgroundPosition = "center"; // Optional: Center the image
    document.body.style.backgroundRepeat = "no-repeat"; // Optional: Prevent tiling
}

function getBodyBackground() {
    return window.getComputedStyle(document.body).backgroundImage;
}

function getHostname() {
    return window.location.hostname;
}

function verifyBackgroundImage()
{
    if (getBodyBackground() === 'none') {
        setBodyBackground('/images/background1.jpg');
        return;
    }

    // Get the saved background image from session storage
    let savedImage = sessionStorage.getItem("backgroundImage");
    console.log(`savedImage: ${savedImage}`);

    let imageUrl = "images/"; // Path to your image
    let currentImage = "";

    if (!savedImage || savedImage === "null") {
        // Call a JavaScript function to get the current body background
        let currentBackgroundImage = getBodyBackground();
        console.log(`currentBackgroundImage: ${currentBackgroundImage}`);
        currentImage = currentBackgroundImage.split('/').pop().split('"')[0];
        console.log(`currentImage: ${currentImage}`);
    } else {
        console.log(`Setting currentImage: ${currentImage} to ${savedImage}`);
        currentImage = savedImage;
    }

    // Decide on the next image based on the current image
    switch (currentImage) {
        case "background1.jpg":
            currentImage = "background2.jpg";
            break;
        case "background2.jpg":
            currentImage = "background3.jpg";
            break;
        default:
            currentImage = "background1.jpg";
            break;
    }

    imageUrl += currentImage;
    console.log(`new imageUrl: ${imageUrl}`);

    // Set the new background image
    setBodyBackground(imageUrl);

    // Save the new background image to session storage
    sessionStorage.setItem("backgroundImage", currentImage);
    console.log(`savedImage to: ${currentImage}`);
}

function getWindowWidth() {
    return window.innerWidth;
}

function getBootstrapVersion() {
    if (window.bootstrap && bootstrap.Tooltip) {
        return bootstrap.Tooltip.VERSION || "Unknown version (Bootstrap 4+)";
    }
    if (typeof $ !== "undefined" && $.fn && $.fn.tooltip) {
        return $.fn.tooltip.Constructor.VERSION || "Unknown version (Bootstrap 3)";
    }
    return "Bootstrap is not loaded on this page.";
}

function setDynamicCssHeight() {
    const viewportHeight = window.innerHeight; // Viewport height
    const pages = document.getElementsByClassName('page');
    const itemsHeight = pages.length > 0 ? pages[0].clientHeight : document.documentElement.clientHeight;

    if (itemsHeight <= viewportHeight){
        console.log(`setDynamicCssHeight: Resetting height to ${viewportHeight} px`);
        document.documentElement.style.setProperty('--dynamic-height', `${viewportHeight}px`);
        return;
    }
    const scrollHeight = pages.length > 0 ? pages[0].scrollHeight : document.documentElement.scrollHeight; // Scrollable height
    const newHeight = Math.max(viewportHeight, scrollHeight);
    console.log(`setDynamicCssHeight: Setting height to ${newHeight} px`);
    document.documentElement.style.setProperty('--dynamic-height', `${newHeight}px`);
    verifyBackgroundImage();
}
