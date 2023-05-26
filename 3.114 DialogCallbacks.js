/* Let's add the ability to wire up multiple callback functions.

Each time onClose is called, we'll need to store an additional callback function on our dialog class. 
Once close is called, we'll invoke all of those callback functions. */

class Dialog {
    onClose(callbackFunction) {
        if(this.cb !== undefined) {
            this.cb.push(callbackFunction)
        }
        else {
        this.cb = [callbackFunction]
        }
        // store the callback
    }

    close() {
        for (let i = 0; i < this.cb.length; i++) {
            this.cb[i]();
        }
    }
}