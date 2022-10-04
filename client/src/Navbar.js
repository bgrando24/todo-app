import React from "react";

export function Navbar() {
    return (
        // A grey horizontal navbar that becomes vertical on small screens
        <nav class="navbar navbar-expand-sm bg-dark">

        <ul class="navbar-nav">

            <li class="nav-item">
            <a class="nav-link text-light" href="/">Home</a>
            </li>

            <li class="nav-item">
            <a class="nav-link text-light" href="/todos">Todos</a>
            </li>

            <li class="nav-item">
            <a class="nav-link text-light" href="/login">Login</a>
            </li>

        </ul>

        </nav>
    )
}