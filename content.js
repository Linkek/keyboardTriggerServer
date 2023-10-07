// Function to determine if an element or its parent meets the selector criteria
function isDescendantOf(element, selector) {
    while (element) {
        if (element.matches && element.matches(selector)) {
            return true;
        }
        element = element.parentElement || element.parentNode;
    }
    return false;
}

function wasElementClicked(path, selector, parentSelector) {
    return path.some(element => 
        element.matches && 
        element.matches(selector) && 
        (parentSelector ? isDescendantOf(element, parentSelector) : true)
    );
}

// Open keyboard on focus of input elements
document.body.addEventListener('focus', function(event) {
    const validTargets = [
        'input[type="text"]',
        'input[type="number"]',
        'input[type="search"]',
        'input[type="email"]',
        'input[type="tel"]',
        'input[type="url"]',
        'input[type="password"]',
        'input[type="date"]',
        'input[type="time"]',
        'textarea',
        '[contenteditable="true"]'
    ];

    for (let selector of validTargets) {
        if (event.target.matches(selector)) {
            chrome.runtime.sendMessage({ action: "openKeyboard" });
            break; // exit the loop once a match is found
        }
    }
}, true); // the true parameter makes this a capturing event, so it runs before the bubbling phase

// Handle click events
document.body.addEventListener('click', function(event) {
    let path = event.composedPath();

    // Debugging output
    if(path && path.length > 0) {
        let clickedElement = path[0];
        chrome.runtime.sendMessage({ action: "youClickedOn", data: clickedElement.outerHTML });
    }

    // Check if our special link or a similar element was clicked and is a descendant of the anchor with href="/onscreen-keyboard"
    if (wasElementClicked(path, 'paper-icon-item', 'a[href="/onscreen-keyboard"]')) {
        event.preventDefault();
        chrome.runtime.sendMessage({ action: "openKeyboard" });
    }

    // Check if the specific input in Home Assistant was clicked
    else if (wasElementClicked(path, 'input.mdc-text-field__input')) {
        chrome.runtime.sendMessage({ action: "openKeyboard" });
    }

    // If clicked outside of any input, close keyboard
    else if (!wasElementClicked(path, 'input, textarea, [contenteditable="true"]')) {
        chrome.runtime.sendMessage({ action: "closeKeyboard" });
    }
}, false);
