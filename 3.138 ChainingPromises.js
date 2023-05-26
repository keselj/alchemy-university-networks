/* Here it is! Time for promises inside promises. 

Similar to the last stage, except we're going to add one last addition:

const pact = new Pact((resolve, reject) => {
    setTimeout(() => {
        resolve(42);
    }, 100);
}).then((val) => {
    console.log(val); // 42

    // instead of returning a value, we'll return a promise
    return new Pact((resolve, reject) => {
        setTimeout(() => {
            // we're still doubling the resolve value here
            resolve(val * 2);
        }, 100);
    });
}).then((val) => {
    console.log(val); // 84
    return val * 2;
});

pact.then((val) => {
    console.log(val); // 168
});

You'll need to check if the value returned from .then callback is a Pact or not.

You may need to create a new Pact inside the code to handle the asynchronous callback chaining. */


const STATUS = {
    PENDING: 0,
    RESOLVED: 1,
    REJECTED: 2,
}

class Pact {
    constructor(fn) {
        this.thenFns = [];
        this.catchFns = [];
        this.status = STATUS.PENDING;
        this.resolve = (value) => {
            this.resolvedValue = value;
            this.status = STATUS.RESOLVED;
            this.thenFns.forEach((fn) => fn(value));
        }
        this.reject = (value) => {
            this.rejectedValue = value;
            this.status = STATUS.REJECTED;
            this.catchFns.forEach((fn) => fn(value));
        }
        fn(this.resolve, this.reject);
    }
    then(_then) {
        if (this.status === STATUS.PENDING) {
            return new Pact((resolve, reject) => {
                this.thenFns.push((val) => {
                    if (val instanceof Pact) {
                        val.then((val) => resolve(_then(val)));
                    }
                    else {
                        resolve(_then(val));
                    }
                });
            });
        }
        else if (this.status === STATUS.RESOLVED) {
            _then(this.resolvedValue);
        }
    }
    catch(_catch) {
        if (this.status === STATUS.PENDING) {
            this.catchFns.push(_catch);
        }
        else if (this.status === STATUS.REJECTED) {
            _catch(this.rejectedValue);
        }
    }
}