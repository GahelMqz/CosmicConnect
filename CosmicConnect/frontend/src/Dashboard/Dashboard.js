import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../css/dashboard.css';


function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [newUser, setNewUser] = useState({ username: '', password: '' });
    const [editingUser, setEditingUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            //navigate('/login');  Redirigir al login si no hay usuario
        }
        fetchUsers();
    }, [navigate]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:4000/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleAddUser = async () => {
        try {
            await axios.post('http://localhost:4000/users', newUser);
            setNewUser({ username: '', password: '' });
            fetchUsers();
        } catch (error) {
            console.error('Error al agregar usuario:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/users/${id}`);
            fetchUsers();
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
        }
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setNewUser({ username: user.username, password: user.password });
        setIsEditing(true);
    };

    const handleUpdateUser = async () => {
        try {
            await axios.patch(`http://localhost:4000/users/${editingUser.id}`, newUser);
            setEditingUser(null);
            setIsEditing(false);
            setNewUser({ username: '', password: '' });
            fetchUsers();
        } catch (error) {
            console.error('Error al actualizar usuario:', error);
        }
    };

    const logOut = () => {
        localStorage.removeItem('user'); // Eliminar usuario del localStorage
        navigate('/login'); // Redirigir al login
    };

    const toggleUserMenu = () => {
        setShowUserMenu(!showUserMenu);
    };

    return (
        <>
            <body className='body-dashboard'>

                {user && (
                    <div className="user-info" onClick={toggleUserMenu} style={{ position: 'absolute', top: 0, right: 0 }}>
                        <img src={user.picture} alt={user.name} />
                        {showUserMenu && (
                            <div className="user-menu">
                                <button onClick={logOut}>Logout</button>
                            </div>
                        )}
                    </div>
                )}

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
                                <Link to="/dashboard"><svg className='svg-icons' xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#F5D5E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg></Link>
                                <p className='p-left'><Link to="/dashboard" className='link-dashboard'>Inicio</Link></p>
                            </div>
                            <div className='menu-section'>
                                <Link to="/dashboard/usuarios"><svg className='svg-icons' xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#F5D5E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3" /><circle cx="12" cy="10" r="3" /><circle cx="12" cy="12" r="10" /></svg></Link>
                                <p className='p-left'><Link to="/dashboard/usuarios" className='link-dashboard'>Usuarios</Link></p>
                            </div>
                            <div className='menu-section'>
                                <svg className='svg-icons' xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#F5D5E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path></svg>
                                <p className='p-left'>Test</p>
                            </div>
                            <div className='menu-section'>
                                <svg className='svg-icons' xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#F5D5E0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path></svg>
                                <p className='p-left'>Test</p>
                            </div>
                        </div>
                    </aside>

                    <div className='prueba'>
                        <div class="section-one-dashboard">
                            <div className='section-sub-one'>
                                <div className='section-mini-one-dashboard'>
                                    <div>
                                        <h1 className='h1-dashboard'>¡Bienvenido !</h1>
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
                            <div className='section-sub-two'>
                                <img className='img-one-home' src={require("../imgs/horoscopo.png")} alt="Horóscopo" />
                                <div className='section-mini-two'>
                                    <h1>¡Descubre el Universo en CosmiConnect!</h1>
                                    <p className='p-right'>Descubre el espacio como nunca antes. Horóscopos, planetas, estrellas y satélites, todo en un solo lugar. Únete a nosotros y despierta tu pasión por el universo.</p>
                                    <div className='container-btn-home'>
                                        <Link to="/login"><button type="submit" className="btn-login">
                                            ¡Comienza ahora!
                                        </button>
                                        </Link>
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

export default Dashboard;
