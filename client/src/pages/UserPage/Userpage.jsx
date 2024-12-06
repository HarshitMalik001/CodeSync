import React, { useState } from 'react';
import Signup from '../../components/SignUp';
import Login from '../../components/LogIn';
export function User()
{
    const [flagSignup, setflagSignup] = useState(1);

    function Register()
    {
        setflagSignup(0);
    }

    function Signin()
    {
        setflagSignup(1);
    }

    return (
        <>
            { (flagSignup == 0)?
                <Signup Signin = {Signin}></Signup> :
                <Login Register = {Register}></Login>
            }
        </>
    )
}

export default User