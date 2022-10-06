import React from "react";

// Contains the links to display in the navbar
const loggedinNavbarLinks = [
    {name: "", link: ""},
    {name: "", link: ""},
    {name: "", link: ""},
];

const notLoggedinNavbarLinks = [
    {name: "", link: ""},
    {name: "", link: ""},
    {name: "", link: ""},
]

export function Navbar() {

    //  // Checks if the user is already logged in or mounting of the login page
    //  useEffect(() => {
    //     handleCheckLogin();
    // }, []);


    // Handles checking if the user is already logged in, to determine what should display on the navbar
    const handleCheckLogin = async(event) => {
        try {
            
            // event.preventDefault();
            console.log('Sending check login request...');

            const loginCheckRequest = await fetch('http://localhost:5000/login', {
                method: "GET",
                credentials: 'include'
            });
            const response = await loginCheckRequest.json();
            console.log(response.message);

            if (response.status == "ok") {
                window.location = '/todos';
            }

        } catch (e) {
            console.error(e.message);
        }
    }



    return (
        // A grey horizontal navbar that becomes vertical on small screens
        <nav className="navbar navbar-expand-sm bg-dark">

        <ul className="navbar-nav">

            <li className="nav-item">
            <a className="nav-link text-light" href="/">Home</a>
            </li>

            <li className="nav-item">
            <a className="nav-link text-light" href="/todos">Todos</a>
            </li>

            <li className="nav-item">
            <a className="nav-link text-light" href="/login">Login</a>
            </li>

        </ul>

        </nav>
    )
}