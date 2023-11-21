import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SubirPublicacion() {
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
            const response = await fetch('http://localhost:8081/obtener-publicaciones');
            if (response.ok) {
                const data = await response.json();
                setPublicaciones(data);
            } else {
                alert('Error al cargar las publicaciones');
            }
        } catch (error) {
            alert('Error en el servidor');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!imagen) {
            alert('Por favor, selecciona una imagen.');
            return;
        }

        const formData = new FormData();
        formData.append('imagen', imagen);
        formData.append('comentario', comentario);

        try {
            const response = await fetch('http://localhost:8081/subir-publicacion', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert('Publicación subida con éxito');
                navigate('/'); // Redirige al inicio o a la página que prefieras
            } else {
                alert('Error al subir la publicación');
            }
        } catch (error) {
            alert('Error en el servidor');
        }
    };


    const handleImageChange = (e) => {
        setImagen(e.target.files[0]);
    };

    return (
        <div>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div>
                    <label htmlFor="imagen">Imagen:</label>
                    <input
                        type="file"
                        id="imagen"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>
                <div>
                    <label htmlFor="comentario">Comentario:</label>
                    <textarea
                        id="comentario"
                        value={comentario}
                        onChange={(e) => setComentario(e.target.value)}
                    />
                </div>
                <button type="submit">Subir Publicación</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Imagen</th>
                        <th>Comentario</th>
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

export default SubirPublicacion;
