import React, { useEffect, useState } from "react";
import { checkLogin } from "./Utilities";

// Contains the links to display in the navbar
const loggedinNavbarLinks = [
    {name: "Home", link: "/"},
    {name: "Todos", link: "/todos"},
    {name: "Logout", link: "/logout"},
];

const notLoggedinNavbarLinks = [
    {name: "Home", link: "/"},
    {name: "Login", link: "/login"},
    {name: "Register", link: "/register"},
]

export function Navbar() {

    // state to control which version of the navbar is displayed
    const [nav, setNav] = useState(false);

     // Checks if the user is already logged in or mounting of the login page
     useEffect(() => {
        handleCheckLogin();
    }, []);


    // Handles checking if the user is already logged in, to determine what should display on the navbar
    const handleCheckLogin = async() => {
        try {
            
            const result = await checkLogin('http://localhost:5000/login');

            if (result.status == 'ok') {
                console.log("Navbar status loggedin");
                return setNav(true);
            }

            console.log("Navbar status NOT loggedin");
            setNav(false);

        } catch (e) {
            console.error(e.message);
        }
    }



    return (
        // A grey horizontal navbar that becomes vertical on small screens
        <nav className="navbar navbar-expand-sm bg-dark">

        <ul className="navbar-nav">

            {
                (nav ? loggedinNavbarLinks : notLoggedinNavbarLinks).map(
                    (nav, i) => {
                        return (
                            <li key={i} className="nav-item">
                            <a className="nav-link text-light" href={nav.link}>{nav.name}</a>
                            </li>
                        )
                    }
                )
            }

            <li className="nav-item">
                <a href='/about' className="nav-link text-light">About</a>
            </li>

            {/* <li className="nav-item">
            <a className="nav-link text-light" href="/">Home</a>
            </li>
            <li className="nav-item">
            <a className="nav-link text-light" href="/todos">Todos</a>
            </li>
            <li className="nav-item">
            <a className="nav-link text-light" href="/login">Login</a>
            </li> */}

        </ul>

        </nav>
    )
}