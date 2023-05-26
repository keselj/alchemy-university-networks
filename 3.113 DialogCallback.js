/* onClose - This method will take a callback function as an argument and store it on our Dialog instance.
close - This function will be used to close the dialog. 
When we close the dialog, we'll want to call the callbackFunction.
In practice, when we want to use the Dialog component, we could wire up some logic to execute when a specific dialog is closed. 
For example, we could refresh the data on the page */

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