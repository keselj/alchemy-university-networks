/* We need to make some food! 

When the customer asks for food, the request function will be invoked. 
This function should call the function makeFood which takes food as its only argument. The function makeFood will return a promise.*/

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