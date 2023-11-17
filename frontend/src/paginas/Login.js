<<<<<<< HEAD
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import '../css/login.css'
=======
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/login.css';
>>>>>>> f6830ad (back)
import Login_G from "../Logins/Login_G";
import Login_T from "../Logins/Login_T";
import axios from 'axios';

function Login() {
    const [gmail, setGmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/login', { gmail, password });
            console.log(response.data);
            // Aquí puedes guardar el token de sesión si lo recibes del servidor, por ejemplo, en localStorage
            navigate('/'); // Redirecciona a la página principal o a donde corresponda después del inicio de sesión
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            // Manejar los errores de inicio de sesión aquí, como mostrar un mensaje al usuario
        }
    }

<<<<<<< HEAD
=======
function Login() {
    const [email, setEmail] = useState('');
    const [contrasena, setContrasena] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8081/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, contrasena }),
            });

            if (response.ok) {
                // Aquí puedes establecer la sesión del usuario
                // Por ejemplo, guardar un token o indicador de sesión en localStorage
                localStorage.setItem('userLoggedIn', true);

                navigate('/'); // Usa navigate como función para redirigir al inicio
            } else {
                alert('Email o contraseña incorrectos');
            }
        } catch (error) {
            alert('Error en el servidor');
        }
    };

    function LogoutButton() {
        const navigate = useNavigate();

        const handleLogout = () => {
            localStorage.removeItem('userLoggedIn');
            navigate('/login');
        };

        return (
            <button onClick={handleLogout}>Cerrar Sesión</button>
        );
    }

>>>>>>> f6830ad (back)
    return (
        <>
            <body className="body-login">
                <div className="wrapper">
                    <form onSubmit={handleSubmit}>
                        <h1>Iniciar sesión</h1>
                        <div className="input-box">
<<<<<<< HEAD
                            <input
                                type="email"
                                placeholder="Correo electrónico"
                                value={gmail}
                                onChange={(e) => setGmail(e.target.value)}
                                required
                            />
                            <i className="bx bxs-user" />
                        </div>
                        <div className="input-box">
                            <input
                                type="password"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
=======
                            <input type="email" placeholder="Correo electrónico" required value={email} onChange={(e) => setEmail(e.target.value)} />
                            <i className="bx bxs-user" />
                        </div>
                        <div className="input-box">
                            <input type="password" placeholder="Contraseña" required value={contrasena} onChange={(e) => setContrasena(e.target.value)} />
>>>>>>> f6830ad (back)
                            <i className="bx bxs-lock-alt" />
                        </div>
                        <div className="remember-forgot">
                            <label>
                                <input type="checkbox" />
                                Recuérdame
                            </label>
                            <a href="#">Olvidé mi contraseña</a>
                        </div>
                        <button type="submit" className="btn-login">
                            ¡Comienza ahora!
                        </button>
                        <Login_G />
                        <Login_T />
                        <div className="register-link">
                            <p>
                                No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </body>
        </>
    );
}

<<<<<<< HEAD
export default Login;
=======
export default Login;
>>>>>>> f6830ad (back)
