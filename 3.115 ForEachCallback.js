/* This function will take two parameters:

An array of elements
A callback function that we want to run for each element in the array
Be sure to call the callback function with both the current element in the array and the zero-based index. */

function forEach(arr, callback) {
    for(let i = 0; i < arr.length; i++) {
        callback(arr[i], i);
    }
}