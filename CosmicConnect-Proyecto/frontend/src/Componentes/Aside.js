import React from 'react';
import { Link } from 'react-router-dom';
import '../css/header.css';

function Aside() {

    return (
        <aside>
            <div className='container-cabecera-dashboard'>
                <Link to="/"><img className='logo-header' src={require("../imgs/logo.png")} alt="Logo" /></Link>
                <div>
                    <h1>Cosmi</h1>
                    <h1>Connect</h1>
                </div>
            </div>
            <div className='container-menu-dashboard'>
                <div className='menu-section'>
                    <Link to="/dashboard"><svg className='svg-icons' xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#F5D5E0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg></Link>
                    <p className='p-left'><Link to="/dashboard" className='link-dashboard'>Inicio</Link></p>
                </div>
                <div className='menu-section'>
                    <Link to="/dashboard/usuarios"><svg className='svg-icons' xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#F5D5E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3" /><circle cx="12" cy="10" r="3" /><circle cx="12" cy="12" r="10" /></svg></Link>
                    <p className='p-left'><Link to="/dashboard/usuarios" className='link-dashboard'>Usuarios</Link></p>
                </div>
                <div className='menu-section'>
                    <Link to="/dashboard/noticias"><svg className='svg-icons' xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#F5D5E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z" /><path d="M14 3v5h5M16 13H8M16 17H8M10 9H8" /></svg></Link>
                    <p className='p-left'><Link to="/dashboard/noticias" className='link-dashboard'>Noticias</Link></p>
                </div>
                <div className='menu-section'>
                    <Link to="/dashboard/estrellas"><svg className='svg-icons' xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#F5D5E0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3"></circle></svg></Link>
                    <p className='p-left'><Link to="/dashboard/planetas" className='link-dashboard'>Planetas</Link></p>
                </div>
                <div className='menu-section'>
                    <Link to="/dashboard/imagenes"><svg className='svg-icons' xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#F5D5E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path></svg></Link>
                    <p className='p-left'><Link to="/dashboard/galaxias" className='link-dashboard'>Galaxias</Link></p>
                </div>
            </div>
        </aside>
    );
}

export default Aside;
