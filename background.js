chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.action === "openKeyboard") {
            // Send open keyboard request
            fetch('http://localhost:3000/openKeyboard', {
                method: 'POST'
            });
        }

        if (request.action === "closeKeyboard") {
            // Send close keyboard request
            fetch('http://localhost:3000/closeKeyboard', {
                method: 'POST'
            });
        }

        if (request.action === "youClickedOn") {
            fetch('http://localhost:3000/youClickedOn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ clickedElement: request.data })
            });
        }
    }
);

