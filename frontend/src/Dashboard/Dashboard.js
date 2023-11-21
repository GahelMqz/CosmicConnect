import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../css/dashboard.css';
import Aside from '../Componentes/Aside';


function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [showUserMenu, setShowUserMenu] = useState(false);

    const logOut = () => {
        localStorage.removeItem('user'); // Eliminar usuario del localStorage
        navigate('/login'); // Redirigir al login
    };

    const toggleUserMenu = () => {
        setShowUserMenu(!showUserMenu);
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            //navigate('/login');  Redirigir al login si no hay usuario
        }
    }, [navigate]);

    return (
        <>
            <body className='body-dashboard'>

                {user && (
                    <div className="user-info" onClick={toggleUserMenu} style={{ position: 'absolute', top: 0, right: 0 }}>
                        <img src={user.picture} alt={user.name} />
                        {showUserMenu && (
                            <div className="user-menu">
                                <button onClick={logOut}>Logout</button>
                            </div>
                        )}
                    </div>
                )}

                <div className='temp'>

                    <Aside/>

                    <div className='prueba'>
                        <div class="section-one-dashboard">
                            <div className='section-sub-one'>
                                <div className='section-mini-one-dashboard'>
                                    <div>
                                        <h1 className='h1-dashboard'>¡Bienvenido !</h1>
                                        <p className='p-left'>Tu panel de control central: Datos importantes, a un vistazo</p>
                                    </div>
                                    <div className='container-btn-home-dashboard'>
                                        <Link to="/login"><button type="submit" className="btn-login">
                                            ¡Salir!
                                        </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                                <path fill="#7B337D" fill-opacity="1"
                                    d="M0,224L34.3,229.3C68.6,235,137,245,206,208C274.3,171,343,85,411,80C480,75,549,149,617,197.3C685.7,245,754,267,823,240C891.4,213,960,139,1029,96C1097.1,53,1166,43,1234,53.3C1302.9,64,1371,96,1406,112L1440,128L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z">
                                </path>
                            </svg>
                        </div>

                        <div class="section-two-dashboard">
                            <div className='section-sub-two'>
                                <img className='img-one-home' src={require("../imgs/horoscopo.png")} alt="Horóscopo" />
                                <div className='section-mini-two'>
                                    <h1>¡Descubre el Universo en CosmiConnect!</h1>
                                    <p className='p-right'>Descubre el espacio como nunca antes. Horóscopos, planetas, estrellas y satélites, todo en un solo lugar. Únete a nosotros y despierta tu pasión por el universo.</p>
                                    <div className='container-btn-home'>
                                        <Link to="/login"><button type="submit" className="btn-login">
                                            ¡Comienza ahora!
                                        </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                                <path fill="#210535" fill-opacity="1"
                                    d="M0,224L34.3,229.3C68.6,235,137,245,206,208C274.3,171,343,85,411,80C480,75,549,149,617,197.3C685.7,245,754,267,823,240C891.4,213,960,139,1029,96C1097.1,53,1166,43,1234,53.3C1302.9,64,1371,96,1406,112L1440,128L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z">
                                </path>
                            </svg>
                        </div>

                    </div>
                </div>

            </body>
        </>
    );
}

export default Dashboard;
