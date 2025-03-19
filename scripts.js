function setBodyBackground(imageUrl) {
    document.body.style.backgroundImage = `url('${imageUrl}')`;
    document.body.style.backgroundSize = "cover"; // Optional: Ensure it scales properly
    document.body.style.backgroundPosition = "center"; // Optional: Center the image
    document.body.style.backgroundRepeat = "no-repeat"; // Optional: Prevent tiling
}

function getBodyBackground() {
    return window.getComputedStyle(document.body).backgroundImage;
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

function setDynamicHeight(elementId) {
    const element = document.getElementById(elementId);

    const viewportHeight = window.innerHeight; // Viewport height
    const scrollHeight = document.documentElement.scrollHeight; // Scrollable height

    // Set the height to the larger value
    // if (!element)
    //     element.style.height = Math.max(viewportHeight, scrollHeight) + 'px';
    console.log(`setDynamicHeight: Setting height to ${Math.max(viewportHeight, scrollHeight)} px`);
    document.viewportHeight = Math.max(viewportHeight, scrollHeight) + 'px';
    document.height = Math.max(viewportHeight, scrollHeight) + 'px';
}

// window.addEventListener('resize', () => {
//     setDynamicHeight('main-content');
// });

function setDynamicCssHeight(backgroundSize) {
    const viewportHeight = window.innerHeight; // Viewport height
    const scrollHeight = document.documentElement.scrollHeight; // Scrollable height

    const newHeight = Math.max(viewportHeight, scrollHeight);
    // if (document.body && document.body.clientHeight && (document.body.clientHeight < viewportHeight || newHeight > viewportHeight)) {
    //     //const newHeight = viewportHeight;
    //     console.log(`setDynamicCssHeight: Setting height to ${newHeight} px`);
    //     document.documentElement.style.setProperty('--dynamic-height', `${newHeight}px`);
    // } else {
    //     document.documentElement.style.setProperty('--dynamic-height', '100%');
    // }
    if (backgroundSize === "small") {
        document.documentElement.style.setProperty('--dynamic-height', '100%');    
    } else {
        console.log(`setDynamicCssHeight: Setting height to ${newHeight} px`);
        document.documentElement.style.setProperty('--dynamic-height', `${newHeight}px`);
    }
}

function pageLoaded() {
    console.log(`pageLoaded`);
    setDynamicCssHeight();
}

function resized() {
    console.log(`resized`);
    setDynamicCssHeight();
}

// window.addEventListener('resize', resized);
// window.addEventListener('DOMContentLoaded', pageLoaded);
// setDynamicCssHeight(); // Initial calculation