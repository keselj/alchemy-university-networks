// Map each element in the array to its new value returned by the callback function.

// Just like the previous stage, you'll want to run a function on each element in the array.
// Only this time you'll need to create a new array which you'll return at the end of the map iteration.

function map(arr, callback) {
    let arr1 = [];
    for(let i = 0; i < arr.length; i++){
        arr1.push(callback(arr[i]));
    }    
    return arr1;
}