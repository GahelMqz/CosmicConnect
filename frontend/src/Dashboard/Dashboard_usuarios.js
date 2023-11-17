<<<<<<< HEAD
import '../css/dashboard.css'
import React from "react";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
=======
import '../css/dashboard.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
>>>>>>> f6830ad (back)
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

function Dashboard_usuarios() {
    const [users, setUsers] = useState([]);
<<<<<<< HEAD
    const [newUser, setNewUser] = useState({ username: '', gmail: '', password: '', type: 'client' });
=======
    const [newUser, setNewUser] = useState({ nombre: '', email: '', contrasena: '', tipo: 'client' });
>>>>>>> f6830ad (back)
    const [editingUser, setEditingUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchUsers = async () => {
        try {
<<<<<<< HEAD
            const response = await axios.get('http://localhost:4000/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
=======
            const response = await axios.get('http://localhost:8081/usuarios');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
            toast.error('Error al cargar los usuarios');
>>>>>>> f6830ad (back)
        }
    };

    const handleAddUser = async () => {
<<<<<<< HEAD
        // Verifica si los campos están completos
        if (!newUser.username) {
            toast.error('Falta completar el campo de nombre', {
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
            return;
        }
        if (!newUser.gmail) {
            toast.error('Falta completar el campo de correo electrónico', {
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
            return;
        }
        if (!newUser.password) {
            toast.error('Falta completar el campo de contraseña', {
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
            return;
        }

        // Si todos los campos están completos, procede con la solicitud
        try {
            await axios.post('http://localhost:4000/users', newUser);
            fetchUsers();
            toast.success('Registro exitoso', {
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
        } catch (error) {
            toast.error('Error en el registro', {
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


    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/users/${id}`);
            fetchUsers();
            toast.success('Usuario eliminado', {
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
        } catch (error) {
            toast.error('Error al eliminar usuario', {
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
=======
        
        if (!newUser.nombre || !newUser.email || !newUser.contrasena) {
            toast.error('Por favor, completa todos los campos');
            return;
        }

        try {
            const userData = {
                nombre: newUser.nombre,
                email: newUser.email,
                contrasena: newUser.contrasena,
                tipo: newUser.tipo
            };
            await axios.post('http://localhost:8081/usuarios', userData);
            fetchUsers();
            toast.success('Usuario agregado con éxito');
        } catch (error) {
            toast.error('Error al agregar usuario');
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8081/usuarios/${id}`);
            fetchUsers();
            toast.success('Usuario eliminado con éxito');
        } catch (error) {
            toast.error('Error al eliminar usuario');
>>>>>>> f6830ad (back)
        }
    };

    const handleEdit = (user) => {
        setEditingUser(user);
<<<<<<< HEAD
        setNewUser({ username: user.username, password: user.password, type: user.type });
=======
        setNewUser({ nombre: user.nombre, email: user.email, contrasena: '', tipo: user.tipo });
>>>>>>> f6830ad (back)
        setIsEditing(true);
    };

    const handleUpdateUser = async () => {
<<<<<<< HEAD
        try {
            await axios.patch(`http://localhost:4000/users/${editingUser.id}`, newUser);
            fetchUsers();
            setEditingUser(null);
            setIsEditing(false);
            setNewUser({ username: '', gmail: '', password: '', type: '' });
            toast.success('Usuario actulizado', {
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
        } catch (error) {
            toast.error('Error al actualizar usuario', {
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


=======
        if (!newUser.nombre || !newUser.email || !newUser.contrasena) {
            toast.error('Por favor, completa todos los campos');
            return;
        }

        try {
            const userData = {
                nombre: newUser.nombre,
                email: newUser.email,
                contrasena: newUser.contrasena,
                tipo: newUser.tipo
            };
            await axios.put(`http://localhost:8081/usuarios/${editingUser.id}`, userData);
            fetchUsers();
            setEditingUser(null);
            setIsEditing(false);
            setNewUser({ nombre: '', email: '', contrasena: '', tipo: '' });
            toast.success('Usuario actualizado con éxito');
        } catch (error) {
            toast.error('Error al actualizar usuario');
        }
    };

>>>>>>> f6830ad (back)
    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <>
            <body className='body-dashboard'>
                <Toaster
                    position="top-right"
                />
                <div className='temp'>
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
                                <Link to="/dashboard/estrellas"><svg className='svg-icons' xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#F5D5E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path></svg></Link>
                                <p className='p-left'><Link to="/dashboard/estrellas" className='link-dashboard'>Estrellas</Link></p>
                            </div>
                            <div className='menu-section'>
                                <Link to="/dashboard/imagenes"><svg className='svg-icons' xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#F5D5E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M20.4 14.5L16 10 4 20" /></svg></Link>
                                <p className='p-left'><Link to="/dashboard/imagenes" className='link-dashboard'>Imágenes</Link></p>
                            </div>
                        </div>
                    </aside>

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

                                <div className="dashboard-usuarios">
                                    <div className="content">
                                        <div className="user-form">

                                            <div className='input-box-dashboard'>
                                                <input
                                                    type="text"
                                                    placeholder="Nombre de usuario"
<<<<<<< HEAD
                                                    value={newUser.username}
                                                    onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
=======
                                                    value={newUser.nombre}
                                                    onChange={(e) => setNewUser({ ...newUser, nombre: e.target.value })}
>>>>>>> f6830ad (back)
                                                    required
                                                />
                                            </div>

                                            <div className='input-box-dashboard'>
                                                <input
                                                    type="email"
                                                    placeholder="Correo electrónico"
<<<<<<< HEAD
                                                    value={newUser.gmail}
                                                    onChange={(e) => setNewUser({ ...newUser, gmail: e.target.value })}
=======
                                                    value={newUser.email}
                                                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
>>>>>>> f6830ad (back)
                                                    required
                                                />
                                            </div>

                                            <div className='input-box-dashboard'>
                                                <input
                                                    type="password"
                                                    placeholder="Contraseña"
<<<<<<< HEAD
                                                    value={newUser.password}
                                                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
=======
                                                    value={newUser.contrasena}
                                                    onChange={(e) => setNewUser({ ...newUser, contrasena: e.target.value })}
>>>>>>> f6830ad (back)
                                                    required
                                                />
                                            </div>

                                            <div className='input-box-dashboard'>
                                                <select
<<<<<<< HEAD
                                                    value={newUser.type}
                                                    onChange={(e) => setNewUser({ ...newUser, type: e.target.value })}
=======
                                                    value={newUser.tipo}
                                                    onChange={(e) => setNewUser({ ...newUser, tipo: e.target.value })}
>>>>>>> f6830ad (back)
                                                >
                                                    <option value="client">Cliente</option>
                                                    <option value="admin">Admin</option>
                                                </select>
                                            </div>


                                            {isEditing ? (
                                                <button className='btn-dashboard-usuarios-guardar' onClick={handleUpdateUser}>Guardar cambios</button>
                                            ) : (
                                                <button className='btn-dashboard-usuarios-agregar' onClick={handleAddUser}>Agregar usuario</button>
                                            )}
                                        </div>

                                        <div className='input-box-dashboard'>
                                            <input
                                                type="text"
                                                placeholder="Buscar usuario..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                            />
                                        </div>

                                        <table className="user-table">
                                            <thead>
                                                <tr>
                                                    <th>Nombre</th>
                                                    <th>Gmail</th>
                                                    <th>Password</th>
                                                    <th>Tipo</th>
                                                    <th>Fecha de creación</th>
                                                    <th>Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {users.filter(user =>
<<<<<<< HEAD
                                                    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                                    user.gmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                                    user.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                                    user.createdAT.toLowerCase().includes(searchTerm.toLowerCase())
                                                ).map((user) => (
                                                    <tr key={user.id}>
                                                        <td>{user.username}</td>
                                                        <td>{user.gmail}</td>
                                                        <td>{user.password}</td>
                                                        <td>{user.type}</td>
=======
                                                    (user.nombre && user.nombre.toLowerCase().includes(searchTerm.toLowerCase())) ||
                                                    (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
                                                    (user.tipo && user.tipo.toLowerCase().includes(searchTerm.toLowerCase())) ||
                                                    (user.fecha_registro && user.fecha_registro.includes(searchTerm))
                                                ).map((user) => (
                                                    <tr key={user.id}>
                                                        <td>{user.nombre}</td>
                                                        <td>{user.email}</td>
                                                        <td>{user.contrasena}</td>
                                                        <td>{user.tipo}</td>
>>>>>>> f6830ad (back)
                                                        <td>{user.createdAT}</td>
                                                        <td>
                                                            <button className="btn-dashboard-usuarios-editar" onClick={() => handleEdit(user)}>
                                                                Editar
                                                            </button>
                                                            <button className="btn-dashboard-usuarios-eliminar" onClick={() => handleDelete(user.id)}>
                                                                Eliminar
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
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

export default Dashboard_usuarios;
