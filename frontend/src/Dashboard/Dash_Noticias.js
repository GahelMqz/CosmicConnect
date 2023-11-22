import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Aside from '../Componentes/Aside';


function SubirNoticias() {
    const [titulo, setTitulo] = useState('');
    const [comentario, setComentario] = useState('');
    const [imagen, setImagen] = useState(null);
    const [publicaciones, setPublicaciones] = useState([]);
    const navigate = useNavigate();
    const [editMode, setEditMode] = useState(false);
    const [selectedNoticia, setSelectedNoticia] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const startEdit = noticia => {
        setIsEditing(true);
        setEditingId(noticia.id);
        setTitulo(noticia.titulo);
        setComentario(noticia.comentario);
    };

    const saveChanges = async () => {
        const formData = new FormData();
        formData.append('titulo', titulo);
        formData.append('comentario', comentario);
        if (imagen) formData.append('imagen', imagen);

        try {
            const response = await fetch(`http://localhost:8081/actualizar-noticia/${editingId}`, {
                method: 'PUT',
                body: formData,
            });

            if (response.ok) {
                setIsEditing(false);
                setEditingId(null);
                cargarPublicaciones();
                toast.success('Noticia actualizado', {
                    style: {
                        background: '#74C88A',
                        color: '#075233',
                        borderRadius: '40px',
                        fontSize: '30px'
                    },
                    iconTheme: {
                        primary: '#075233',
                        secondary: '#74C88A',
                    },
                });
            } else {
                alert('Error al actualizar la noticia');
            }
        } catch (error) {
            alert('Error en el servidor');
        }
    };

    const cargarPublicaciones = async () => {
        try {
            const response = await fetch('http://localhost:8081/obtener-noticias');
            if (response.ok) {
                const data = await response.json();
                setPublicaciones(data);
            } else {
                alert('Error al cargar las noticias');
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
        formData.append('titulo', titulo);
        formData.append('comentario', comentario);
        formData.append('imagen', imagen);
        try {
            const response = await fetch('http://localhost:8081/subir-noticia', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                //navigate('/');
                toast.success('Noticia agregada', {
                    style: {
                        background: '#74C88A',
                        color: '#075233',
                        borderRadius: '40px',
                        fontSize: '30px'
                    },
                    iconTheme: {
                        primary: '#075233',
                        secondary: '#74C88A',
                    },
                });
            } else {
                toast.error('Error al agregar noticia', {
                style: {
                    background: '#c87474',
                    color: '#4B0D0D',
                    borderRadius: '40px',
                    fontSize: '30px'
                },
                iconTheme: {
                    primary: '#4B0D0D',
                    secondary: '#c87474',
                },
            });
            }
        } catch (error) {
            toast.error('Error en el servidor', {
                style: {
                    background: '#c87474',
                    color: '#4B0D0D',
                    borderRadius: '40px',
                    fontSize: '30px'
                },
                iconTheme: {
                    primary: '#4B0D0D',
                    secondary: '#c87474',
                },
            });
        }
    };

    const handleImageChange = (e) => {
        setImagen(e.target.files[0]);
    };




    const eliminarNoticia = async (id) => {
        try {
            const response = await fetch(`http://localhost:8081/eliminar-noticia/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Noticia eliminada exitosamente');
                cargarPublicaciones(); // Vuelve a cargar las noticias después de eliminar una
            } else {
                alert('Error al eliminar la noticia');
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
                                                type="text"
                                                placeholder="Título"
                                                value={titulo}
                                                onChange={(e) => setTitulo(e.target.value)}
                                                required
                                            />
                                        </div>
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
                                            <button className='btn-dashboard-usuarios-guardar' type="button" onClick={saveChanges}>
                                                Guardar cambios
                                            </button>
                                        ) : (
                                            <button className='btn-dashboard-usuarios-agregar' type="submit">Agregar noticia</button>
                                        )}
                                    </form>
                                    <table className="user-table">
                                        <thead>
                                            <tr>
                                                <th>Título</th>
                                                <th>Descripción</th>
                                                <th>Fecha de publicación</th>
                                                <th>Imagen</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {publicaciones.map((publicacion, index) => (
                                                <tr key={index}>
                                                    <td>{publicacion.titulo}</td>
                                                    <td>{publicacion.comentario}</td>
                                                    <td>{new Date(publicacion.fecha_publicacion).toLocaleDateString()}</td>
                                                    <td>
                                                        {/* Asegúrate de ajustar la ruta de la imagen según tu configuración */}
                                                        <img src={`http://localhost:8081/${publicacion.imagen}`} alt="Imagen" style={{ width: '100px' }} />
                                                    </td>
                                                    <td>
                                                        <button className="btn-dashboard-usuarios-editar" onClick={() => startEdit(publicacion)}>Editar</button>
                                                        <button className="btn-dashboard-usuarios-eliminar" onClick={() => eliminarNoticia(publicacion.id)}>Eliminar</button>
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

export default SubirNoticias;