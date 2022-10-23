// Handles logging the user out

import { useEffect } from "react";

export function Logout() {

    // handles sending the logout request
    const handleLogout = async() => {
        try {
            
            const logoutRequest = await fetch('http://localhost:5000/logout', {
                method: "DELETE",
                credentials: 'include'
            });
            const response = await logoutRequest.json();

            if (response.status == 'destroyed') {
                window.location = '/login';
            }
            else {
                window.alert("Error with logout (client side), redirecting to login");
                window.location = '/login';
            }

        } catch (err) {
            window.alert("Error with logout (server side), redirecting to login");
            window.location = '/login';
            console.error(err.message);
        }
        
    }


    useEffect( () => {
        handleLogout();
    }, [])


    return (
        <h1 className="text-center">Logging you out...</h1>
    )
}