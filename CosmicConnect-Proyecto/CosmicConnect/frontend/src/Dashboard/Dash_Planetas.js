import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SubirPlanetas() {
    const [comentario, setComentario] = useState('');
    const [imagen, setImagen] = useState(null);
    const [publicaciones, setPublicaciones] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const navigate = useNavigate();


    const startEdit = (planeta) => {
        setIsEditing(true);
        setEditingId(planeta.id);
        setComentario(planeta.comentario);
        // No puedes establecer la imagen aquí directamente ya que es un archivo
    };

    const saveChanges = async () => {
        const formData = new FormData();
        formData.append('comentario', comentario);
        if (imagen) formData.append('imagen', imagen);

        try {
            const response = await fetch(`http://localhost:8081/actualizar-planeta/${editingId}`, {
                method: 'PUT',
                body: formData,
            });

            if (response.ok) {
                alert('Planeta actualizado con éxito');
                setIsEditing(false);
                setEditingId(null);
                cargarPublicaciones();
            } else {
                alert('Error al actualizar el planeta');
            }
        } catch (error) {
            alert('Error en el servidor');
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8081/eliminar-planeta/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Planeta eliminado con éxito');
                cargarPublicaciones();
            } else {
                alert('Error al eliminar el planeta');
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
            const response = await fetch('http://localhost:8081/obtener-planetas');
            if (response.ok) {
                const data = await response.json();
                setPublicaciones(data);
            } else {
                alert('Error al cargar los planetas');
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
            const response = await fetch('http://localhost:8081/subir-planeta', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert('Publicación subida con éxito');
                navigate('/'); // Redirige al inicio o a la página que prefieras
            } else {
                alert('Error al subir el planeta');
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
                <button type="submit">Subir Planeta</button>
            </form>
            <table>
                <thead>
                    {/* ... */}
                </thead>
                <tbody>
                    {publicaciones.map((planeta, index) => (
                        <tr key={index}>
                            <td>
                                {/* Imagen */}
                            </td>
                            <td>
                                {isEditing && editingId === planeta.id ? (
                                    <button onClick={saveChanges}>Guardar Cambios</button>
                                ) : (
                                    <>
                                        <button onClick={() => startEdit(planeta)}>Editar</button>
                                        <button onClick={() => handleDelete(planeta.id)}>Eliminar</button>
                                    </>
                                )}
                            </td>
                            <td>{planeta.comentario}</td>
                            <td>{new Date(planeta.fecha_publicacion).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SubirPlanetas;