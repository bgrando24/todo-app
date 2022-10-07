import React, { useEffect, useState } from "react";

import { checkLogin } from "./Utilities";

export function UserAccount() {

    // controls the current user's data
    const [user, setUser] = useState({});

  // handles checking if the user is logged in before allowing access
//   we also use this to get the user's data
  const handleCheckLogin = async() => {
    try {
      
        const result = await checkLogin('http://localhost:5000/login');

        if (result.status == 'ok') {
            console.log(result.session.user);
            setUser(result.session.user);
            return result.session.user;

        } else {
          console.log(result);
          window.location = '/login';
        }

      } catch (err) {
        console.error(err.message);
      }
  }


  useEffect( () => {
    handleCheckLogin();
  }, []);


  return (
    <div className="container d-flex flex-column text-center mt-5">
        <h1>Welcome {user.name}</h1>
        <h5 className="mt-3">Your account</h5>
        <p>ID: {user.id}</p>
        <p>Email: {user.email}</p>
    </div>
  )
}