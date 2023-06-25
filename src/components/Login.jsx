import React from "react";

export default function Login () {
    function google () {
            window.open("http://localhost:3001/auth/google", "_self");
          }
    

    return (<button onClick={google}>Login to Google</button>)
}