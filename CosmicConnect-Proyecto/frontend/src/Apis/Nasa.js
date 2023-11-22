import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './css/mars.css';
import './Sky.js';
import Star from './Astro1';
import Picture from './Picture';
import ISSLocation from './Iss';
import SpaceX from './Space_X1';
import Header from '../Componentes/Header.js';
import Footer from '../Componentes/Footer.js';

const MarsRoverPhotos = () => {
    const [photos, setPhotos] = useState([]);
    const [isGalleryVisible, setIsGalleryVisible] = useState(false);
    const [limit, setLimit] = useState(10); // Estado para almacenar el límite de imágenes

    const handleSearch = () => {
        setIsGalleryVisible(true);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=DEMO_KEY&per_page=${limit}`);
                const result = await response.json();
                setPhotos(result.photos);
            } catch (error) {
                console.error(error);
            }
        };

        if (isGalleryVisible) {
            fetchData();
        }
    }, [isGalleryVisible, limit]);

    const hideGallery = () => {
        setIsGalleryVisible(false);
    };

    const handleLimitChange = (e) => {
        const newLimit = parseInt(e.target.value, 10);
        setLimit(newLimit);
    };

    return (
        <>
            <body >
                <Header />
                <div class="section-one">
                    <div className='section-mini-one-mars'>
                        <h1>Galería de imágenes de Marte</h1>
                        <div className="container">
                            <div className="buttons">
                                <button className='btn-dashboard-usuarios-agregar' onClick={handleSearch}>Mostrar</button>
                                <button className="btn-dashboard-usuarios-eliminar" onClick={hideGallery}>Ocultar</button>
                            </div>
                            
                            {isGalleryVisible && photos.length > 0 ? (
                                <div className="gallery-container">
                                    {photos.map((photo, index) => (
                                        <div className="gallery-item" key={index}>
                                            <img src={photo.img_src} alt={`Mars Rover Photo ${index}`} />
                                            {/* Agrega más propiedades según sea necesario */}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                isGalleryVisible && <p>Cargando galería...</p>
                            )}
                        </div>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                        <path fill="#430D4B" fill-opacity="1"
                            d="M0,224L34.3,229.3C68.6,235,137,245,206,208C274.3,171,343,85,411,80C480,75,549,149,617,197.3C685.7,245,754,267,823,240C891.4,213,960,139,1029,96C1097.1,53,1166,43,1234,53.3C1302.9,64,1371,96,1406,112L1440,128L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z">
                        </path>
                    </svg>
                </div>

                <div class="section-two">
                    <div className='section-mini-two-stars'>
                        <h1>Información de las estrellas</h1>
                        <Star></Star>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                        <path fill="#7B337D" fill-opacity="1"
                            d="M0,224L34.3,229.3C68.6,235,137,245,206,208C274.3,171,343,85,411,80C480,75,549,149,617,197.3C685.7,245,754,267,823,240C891.4,213,960,139,1029,96C1097.1,53,1166,43,1234,53.3C1302.9,64,1371,96,1406,112L1440,128L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z">
                        </path>
                    </svg>
                </div>
                <div class="section-three">
                    <div className='section-mini-one-dia'>
                        <h1>Imagen del día</h1>
                        <Picture></Picture>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                        <path fill="#C874B2" fill-opacity="1"
                            d="M0,224L34.3,229.3C68.6,235,137,245,206,208C274.3,171,343,85,411,80C480,75,549,149,617,197.3C685.7,245,754,267,823,240C891.4,213,960,139,1029,96C1097.1,53,1166,43,1234,53.3C1302.9,64,1371,96,1406,112L1440,128L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z">
                        </path>
                    </svg>
                </div>

                <div class="section-four">
                    <div className='section-mini-one-mars'>
                        <h1>ISS información</h1>
                        <ISSLocation></ISSLocation>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                        <path fill="#430D4B" fill-opacity="1"
                            d="M0,224L34.3,229.3C68.6,235,137,245,206,208C274.3,171,343,85,411,80C480,75,549,149,617,197.3C685.7,245,754,267,823,240C891.4,213,960,139,1029,96C1097.1,53,1166,43,1234,53.3C1302.9,64,1371,96,1406,112L1440,128L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z">
                        </path>
                    </svg>
                </div>
                <div class="section-two">
                    <div className='section-mini-two-stars'>
                        <h1>Lanzamientos de Space X</h1>
                        <SpaceX></SpaceX>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                        <path fill="#210535" fill-opacity="1"
                            d="M0,224L34.3,229.3C68.6,235,137,245,206,208C274.3,171,343,85,411,80C480,75,549,149,617,197.3C685.7,245,754,267,823,240C891.4,213,960,139,1029,96C1097.1,53,1166,43,1234,53.3C1302.9,64,1371,96,1406,112L1440,128L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z">
                        </path>
                    </svg>
                </div>
                <Footer />
            </body>
        </>
    );
};

export default MarsRoverPhotos;





