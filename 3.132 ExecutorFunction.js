/* We'll need to declare a new constructor on Pact. This constructor will take an executor function as it's only argument.

The executor function should be called immediately from the constructor with two arguments of it's own, both of which are new functions.

Let's take a closer look at the executor function example and consider how we can achieve this functionality.

For Pact it should look like this:

const pact = new Pact((resolve, reject) => {
    console.log(typeof resolve); // function
    console.log(typeof reject); // function
});
 If you can make the above comments true, you'll pass the tests! 
 You'll need to ensure that both resolve and reject are functions passed to the executor.*/

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