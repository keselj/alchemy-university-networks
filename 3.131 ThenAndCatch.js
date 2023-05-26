// Your first task is to create two class methods catch and then. These methods are used by promises to wire up callbacks.

// To pass the assertions in testPact.js, you'll simply need to create the class methods catch and then on your Pact class. 
// There is no need to implement any functionality just yet!

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