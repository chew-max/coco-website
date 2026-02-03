// transition.js

// Function to handle the transition when a link is clicked
window.transitionToPage = function(link) {
    document.querySelector('body').style.opacity = 0;
    setTimeout(function() {
        window.location.href = link.href;
    }, 500); // The delay should match the CSS transition duration (0.5s = 500ms)
    return false; // Prevents the default immediate navigation
};

// Fade in the page on load
document.addEventListener('DOMContentLoaded', function(event) {
    document.querySelector('body').style.opacity = 1;
});
