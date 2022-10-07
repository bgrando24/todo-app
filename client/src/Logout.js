// Handles logging the user out

import { useEffect } from "react";

export function Logout() {

    // handles sending the logout request
    const handleLogout = async() => {
        const logoutRequest = await fetch('http://localhost:5000/logout')
        .then(window.location = '/login');
    }


    useEffect( () => {
        handleLogout();
    }, [])


    return (
        <h1 className="text-center">Logging you out...</h1>
    )
}