// Within the timer function, return a new resolved promise.

function timer() {
    return new Promise(resolve =>{
        setTimeout(()=> {resolve()},1000);

    })
    
}