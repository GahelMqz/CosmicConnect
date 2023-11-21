import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SubirGalaxias() {
    const [comentario, setComentario] = useState('');
    const [imagen, setImagen] = useState(null);
    const [publicaciones, setPublicaciones] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const navigate = useNavigate();

    const startEdit = (galaxia) => {
        setIsEditing(true);
        setEditingId(galaxia.id);
        setComentario(galaxia.comentario);
        // No se puede establecer la imagen directamente
    };

    const saveChanges = async () => {
        const formData = new FormData();
        formData.append('comentario', comentario);
        if (imagen) {
            formData.append('imagen', imagen);
        }

        try {
            const response = await fetch(`http://localhost:8081/actualizar-galaxia/${editingId}`, {
                method: 'PUT',
                body: formData,
            });

            if (response.ok) {
                alert('Galaxia actualizada con éxito');
                setIsEditing(false);
                setEditingId(null);
                cargarPublicaciones();
            } else {
                alert('Error al actualizar la galaxia');
            }
        } catch (error) {
            alert('Error en el servidor');
        }
    };

    // Función para eliminar
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8081/eliminar-galaxia/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Galaxia eliminada con éxito');
                cargarPublicaciones();
            } else {
                alert('Error al eliminar la galaxia');
            }
        } catch (error) {
            alert('Error en el servidor');
        }
    };

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
            const response = await fetch('http://localhost:8081/subir-galaxia', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert('Publicación subida con éxito');
                navigate('/'); // Redirige al inicio o a la página que prefieras
            } else {
                alert('Error al subir la galaxia');
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
                <button type="submit">Subir galaxia</button>
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
                    {publicaciones.map((galaxia, index) => (
                        <tr key={index}>
                            <td>
                                <img src={`http://localhost:8081/${galaxia.imagen}`} alt="Imagen" style={{ width: '100px' }} />
                            </td>
                            <td>
                                {isEditing && editingId === galaxia.id ? (
                                    <>
                                        <textarea
                                            value={comentario}
                                            onChange={(e) => setComentario(e.target.value)}
                                        />
                                        <button onClick={saveChanges}>Guardar Cambios</button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => startEdit(galaxia)}>Editar</button>
                                        <button onClick={() => handleDelete(galaxia.id)}>Eliminar</button>
                                    </>
                                )}
                            </td>
                            <td>{new Date(galaxia.fecha_publicacion).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SubirGalaxias;