// Let's modify runCallback to make callbackFunction run asynchronously.

// Just like the example above, use setTimeout and invoke callbackFunction 
// 1000 milliseconds (1 second) after runCallback has been called.

function runCallback(callbackFunction) {
    setTimeout(() => {
        callbackFunction();
    }, 1000);
}