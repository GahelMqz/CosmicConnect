import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Aside from '../Componentes/Aside';

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
        <>
            <body className='body-dashboard'>
                <Toaster
                    position="top-right"
                />

                <div className='temp'>
                    <Aside />
                    <div className='prueba'>
                        <div class="section-one-dashboard">
                            <div className='section-sub-one'>
                                <div className='section-mini-one-dashboard'>
                                    <div>
                                        <h1 className='h1-dashboard'>¡Bienvenido usuario!</h1>
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
                            <div className='section-sub-two-dashboard-usuarios'>

                                <div className="content">
                                    <form className="user-form" onSubmit={handleSubmit} encType="multipart/form-data">
                                        <div className='input-box-dashboard'>
                                            <input
                                                type="file"
                                                placeholder="Imagen"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                required
                                            />
                                        </div>
                                        <div className='input-box-dashboard'>
                                            <input
                                                type="text"
                                                placeholder="Descripción"
                                                value={comentario}
                                                onChange={(e) => setComentario(e.target.value)}
                                                required
                                            />
                                        </div>
                                        {isEditing ? (
                                            <button className='btn-dashboard-usuarios-guardar' type="button" onClick={saveChanges}>Guardar Cambios</button>
                                        ) : (
                                            <button className='btn-dashboard-usuarios-agregar' type="submit">Agregar noticia</button>
                                        )}

                                    </form>
                                    <table className="user-table">
                                        <thead>
                                            <tr>
                                                <th>Nombre</th>
                                                <th>Descripción</th>
                                                <th>Fecha</th>
                                                <th>Imagen</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {publicaciones.map((planeta, index) => (
                                                <tr key={index}>
                                                    <td>Nombre</td>
                                                    <td>{planeta.comentario}</td>
                                                    <td>{new Date(planeta.fecha_publicacion).toLocaleDateString()}</td>
                                                    <td>
                                                        {/* Asegúrate de ajustar la ruta de la imagen según tu configuración */}
                                                        <img src={`http://localhost:8081/${planeta.imagen}`} alt="Imagen" style={{ width: '100px' }} />
                                                    </td>
                                                    <td>
                                                        <button className="btn-dashboard-usuarios-editar" onClick={() => startEdit(planeta)}>Editar</button>
                                                        <button className="btn-dashboard-usuarios-eliminar" onClick={() => handleDelete(planeta.id)}>Eliminar</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
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

export default SubirPlanetas;