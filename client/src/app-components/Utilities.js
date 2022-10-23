// Utilities file to store useful functions 

/**
 * Checks asynchronously if a user is currently deemed to be logged in via the presence of a session. 
 * Uses a GET request.
 * @returns The value of the response from the API
 */
export async function checkLogin(path) {
    if (path) {
        try {

            const loginCheckRequest = await fetch(path, {
                method: "GET",
                credentials: 'include'
            });
    
            const response = await loginCheckRequest.json();
            return response;

        } catch (err) {
            console.error(err.message);
        }
        
    } else {
        console.error("No endpoint path was specified.");
    }
}

