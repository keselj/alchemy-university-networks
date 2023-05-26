// What if the kitchen was all out of a particular ingredient? Let's be sure to catch an error from the makeFood promise.

// When we need to create a new order, we'll request the food:

// If there is an error on the request, it should be stored on the order:


const { makeFood } = require('./Kitchen');

class Order {
    constructor() {
        this.isReady = false;
    }
    request(food) {
        makeFood(food).then(()=>{
            this.isReady = true;
        }).catch((err)=>{
            console.error(err)
            this.error = err;
        })

    }
}