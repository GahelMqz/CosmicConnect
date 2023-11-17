import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/header.css';

function Header() {
    const navigate = useNavigate();
    const isUserLoggedIn = localStorage.getItem('userLoggedIn');

    const handleLogout = () => {
        localStorage.removeItem('userLoggedIn');
        navigate('/'); // Redirige al login después de cerrar sesión
    };

    return (
        <header>
            <ul className="nav-links">
                <Link to="/"><img className='logo-header' src={require("../imgs/logo.png")} alt="Logo" /></Link>
                <li className="center"><Link to="/">Despierta tu curiosidad</Link></li>
                <li className="center"><Link to="/nasa">Cosmos</Link></li>
                <li className="center"><Link to="/publicacion">Comparte tus imagenes</Link></li>
                <li className="center"><Link to="/nosotros">Nosotros</Link></li>
                <li className="center"><Link to="/contactanos">Contáctanos</Link></li>
                <li className="center"><Link to="/dashboard">Dashboard</Link></li>

                {isUserLoggedIn ? (
                    <button onClick={handleLogout} className="btn-login">
                        Cerrar Sesión
                    </button>
                ) : (
                    <>
                        <Link to="/login"><button type="submit" className="btn-login">
                            Ingresar
                        </button>
                        </Link>
                        <Link to="/register"><button type="submit" className="btn-login">
                            Registrarme
                        </button>
                        </Link>
                    </>
                )}
            </ul>
        </header>
    );
}

export default Header;
