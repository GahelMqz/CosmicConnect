import '../css/footer.css'
import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <>
            <div class="section-footer">
                <Link to="/"><img className='logo-header' src={require("../imgs/logo.png")} alt="Logo" /></Link>
                <p className='parrafo-footer'>Todos los derechos reservados</p>
            </div>
        </>
    );
}

export default Footer;