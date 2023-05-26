/* Now we're cooking. 

We're adding in features that take Pact from simply working to developer-friendly! 

One feature we'll certainly want is the ability to resolve immediately if a pact has already resolved/rejected.

Think of it this way: if you passed a pact to another piece of code, that code would expect to be able to wire up a .then callback regardless of whether the pact has resolved or not yet (check out a real-world example).

We'll want to accomplish this:

const pact = new Pact((resolve, reject) => {
    // notice this happens synchronously, no timeout!
    resolve(42);
});

pact.then((val) => {
    // this should be called immediately 
    // since pact is already resolved
    console.log(val); // 42
}); */

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