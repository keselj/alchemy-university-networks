// If an error is thrown in any of the asynchronous functions we called in the last stage, let's catch it.

// Once we have the exception, pass it to logError.

const { getResults } = require('./lab');
const { sendResults } = require('./messaging');
const { logResponse, logError } = require('./logs');

async function handleResults(patientId) {
    try {
    const results = await getResults(patientId);
    const response = await sendResults(patientId, results);
    await logResponse(response);}
    catch(ex){
        logError(ex);
    }
}