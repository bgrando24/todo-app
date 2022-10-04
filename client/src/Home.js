import React , { Fragment } from "react";

export function Home() {
    return (
        <Fragment>

            <div className="container text-center d-flex-columns">
                <h1>Welcome!</h1>
                <a href='/register'>Register</a>
                <a href='/login'>Login</a>
            </div>

        </Fragment>
    )
}