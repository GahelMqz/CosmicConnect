import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Componentes/Header';

function Galaxias() {
    const [comentario, setComentario] = useState('');
    const [imagen, setImagen] = useState(null);
    const [publicaciones, setPublicaciones] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('userLoggedIn')) {
            navigate('/login');
        } else {
            cargarPublicaciones();
        }
    }, [navigate]);

    const cargarPublicaciones = async () => {
        try {
            const response = await fetch('http://localhost:8081/obtener-galaxias');
            if (response.ok) {
                const data = await response.json();
                setPublicaciones(data);
            } else {
                alert('Error al cargar las galaxias');
            }
        } catch (error) {
            alert('Error en el servidor');
        }
    };


    return (
        <>
            <body>
                <Header />
                <div className="noticias-container">
                    {publicaciones.map((publicacion, index) => (
                        <div key={index} className="noticia-card">
                            <img src={`http://localhost:8081/${publicacion.imagen}`} alt={publicacion.nombre_planeta} />
                            <div className="noticia-content">
                                <h2>{publicacion.nombre_galaxia}</h2>
                                <p>{publicacion.comentario}</p>
                                <div className="noticia-date">
                                    {new Date(publicacion.fecha_publicacion).toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </body>
        </>

    );
}

export default Galaxias;