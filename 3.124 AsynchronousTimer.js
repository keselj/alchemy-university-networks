// Let's modify the timer executor function to resolve after one second.

// You can run code after one second by using a timeout:

function timer() {
    return new Promise(resolve =>{
        setTimeout(()=> {resolve()},1000);

    })
    
}