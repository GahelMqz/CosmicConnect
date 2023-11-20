import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function Login_G() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    const login = useGoogleLogin({
        onSuccess: async (codeResponse) => {
            setUser(codeResponse);
        },
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(() => {
        if (user) {
            axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        Accept: 'application/json'
                    }
                })
                .then((res) => {
                    localStorage.setItem('user', JSON.stringify(res.data)); // Almacenar usuario en localStorage
                    navigate('/dashboard'); // Redirigir al Dashboard
                })
                .catch((err) => console.log(err));
        }
    }, [user, navigate]);
    

    return (
        <button onClick={() => login()}>Google 🚀</button>
    );
}

export default Login_G;
