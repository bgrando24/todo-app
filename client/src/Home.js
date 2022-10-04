import React , { Fragment } from "react";

export function Home() {
    return (

        <div className="container text-center d-flex flex-column" style={{width: "40%"}}>

            <h1 className="mt-3">Welcome!</h1>
            <button className="btn btn-primary font-weight-bold mt-5" onClick={() => window.location = '/register'}>Register</button>
            <button className="btn btn-primary font-weight-bold mt-5" onClick={() => window.location = '/login'}>Login</button>

        </div>

    )
}