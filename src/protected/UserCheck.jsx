import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../auth/AuthContext";

function UserCheck() {
    const { token, setToken } = useContext(AuthContext);
    
    const config = {
        'method': 'get',
        'url': `${import.meta.env.VITE_BACKEND_URL}/scope-example/protecteduser`,
        'headers': {
            'Authorization': `Bearer ${token}`
        }
    };

    useEffect(() => {
        axios(config).then((response) => {
            console.log("Enviaste un token y estas logeado");
            console.log(response);
        }).catch((error) => {
            console.log("No estas logeado");
            console.log(error);
        })
    }, []);

    return (
        <div>
            <h1>Protected User</h1>
        </div>
    );
}

export default UserCheck;