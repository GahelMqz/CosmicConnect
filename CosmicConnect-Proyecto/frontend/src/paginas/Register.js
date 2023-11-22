import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/register.css';
import toast, { Toaster } from 'react-hot-toast';

function Register() {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [contrasena, setContrasena] = useState('');
    const history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8081/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombre, email, contrasena }),
            });

            if (response.ok) {
                toast.success('Registro exitoso', {
                    style: {
                        background: '#74C88A',
                        color: '#075233',
                        borderRadius: '40px',
                        fontSize: '30px'
                    },
                    iconTheme: {
                        primary: '#075233',
                        secondary: '#74C88A',
                    },
                });
                setNombre('');
                setEmail('');
                setContrasena('');
                //history('/login');
            } else {
                toast.error('Error en el registro', {
                    style: {
                        background: '#c87474',
                        color: '#4B0D0D',
                        borderRadius: '40px',
                        fontSize: '30px'
                    },
                    iconTheme: {
                        primary: '#4B0D0D',
                        secondary: '#c87474',
                    },
                });
            }
        } catch (error) {
            toast.error('Error en el servidor', {
                style: {
                    background: '#c87474',
                    color: '#4B0D0D',
                    borderRadius: '40px',
                    fontSize: '30px'
                },
                iconTheme: {
                    primary: '#4B0D0D',
                    secondary: '#c87474',
                },
            });
        }
    }



    return (
        <>
            <body className="body-register">
                <Toaster />
                <div className="wrapper">
                    <form onSubmit={handleSubmit}>
                        <h1>Registrarse</h1>
                        <div className="input-box">
                            <input type="text" placeholder="Nombre completo" required value={nombre} onChange={(e) => setNombre(e.target.value)} />
                            <i className="bx bxs-user" />
                        </div>
                        <div className="input-box">
                            <input type="email" placeholder="Correo electrónico" required value={email} onChange={(e) => setEmail(e.target.value)} />
                            <i className="bx bxs-user" />
                        </div>
                        <div className="input-box">
                            <input type="password" placeholder="Contraseña" required value={contrasena} onChange={(e) => setContrasena(e.target.value)} />
                            <i className="bx bxs-lock-alt" />
                        </div>
                        <button type="submit" className="btn-register">
                            ¡Comienza ahora!
                        </button>
                        <div className="register-link-register">
                            <p>
                                Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </body>
        </>
    );
}

export default Register;

