import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Planetas() {
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
            const response = await fetch('http://localhost:8081/obtener-planetas');
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
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Imagen</th>
                        <th>Descripcion</th>
                        <th>Fecha de Publicación</th>
                    </tr>
                </thead>
                <tbody>
                    {publicaciones.map((publicacion, index) => (
                        <tr key={index}>
                            <td>
                                {/* Asegúrate de ajustar la ruta de la imagen según tu configuración */}
                                <img src={`http://localhost:8081/${publicacion.imagen}`} alt="Imagen" style={{ width: '100px' }} />
                            </td>
                            <td>{publicacion.comentario}</td>
                            <td>{new Date(publicacion.fecha_publicacion).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Planetas;