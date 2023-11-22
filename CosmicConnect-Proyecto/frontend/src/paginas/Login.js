import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/login.css';
import Login_G from "../Logins/Login_G";
import Login_T from "../Logins/Login_T";
import axios from 'axios';

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
    
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('userLoggedIn', true);
                localStorage.setItem('userType', data.tipo);
    
                navigate('/'); // Redirigir al inicio para todos los usuarios
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

    return (
        <>
            <body className="body-login">
                <div className="wrapper">
                    <form onSubmit={handleSubmit}>
                        <h1>Iniciar sesión</h1>
                        <div className="input-box">
                            <input type="email" placeholder="Correo electrónico" required value={email} onChange={(e) => setEmail(e.target.value)} />
                            <i className="bx bxs-user" />
                        </div>
                        <div className="input-box">
                            <input type="password" placeholder="Contraseña" required value={contrasena} onChange={(e) => setContrasena(e.target.value)} />
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

export default Login;
