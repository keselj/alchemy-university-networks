/* Our Pact class wouldn't be complete if we couldn't wire up multiple .then and .catch callbacks!

Let's give it a shot. So we're trying accomplish this:

let pact = new Pact((resolve, reject) => {
    setTimeout(() => {
        resolve(42);
    }, 100);
});
pact.then((val) => {
    console.log(val); // 42
});
pact.then((val) => {
    console.log(val); // 42
});
We also want to do the same for catch and reject:

let pact = new Pact((resolve, reject) => {
    setTimeout(() => {
        reject(42);
    }, 100);
});
pact.catch((val) => {
    console.log(val); // 42
});
pact.catch((val) => {
    console.log(val); // */

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
    
    module.exports = Pact;