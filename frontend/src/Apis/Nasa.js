import React, { useEffect, useState } from 'react';
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

        <Header/>
            <h1>Galeria de imagenes de Marte(api_1)</h1>
            <div className="container">
                <div className="buttons">
                    <button onClick={handleSearch}>Search Mars Rover Photos</button>
                    <button onClick={hideGallery}>Hide Mars Rover Photos</button>
                </div>
                <div className="limit-input">
                    <label htmlFor="limit">Número de imágenes:</label>
                    <input type="number" id="limit" value={limit} onChange={handleLimitChange} />
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
                    isGalleryVisible && <p>Loading Mars rover photos...</p>
                )}
            </div>
            <div>
                <h1>Informacion de las estrellas</h1>
                <Star></Star>
            </div>
            <div>
                <h1>Imagen del dia, Informacion de la NASA</h1>
                <Picture></Picture>
            </div>
            <div>
                <h1>ISS information</h1>
                <ISSLocation></ISSLocation>
            </div>
            <div>
                <h1>Space_X Information</h1>
                <SpaceX></SpaceX>
            </div>
            <Footer/>
        </>
    );
};

export default MarsRoverPhotos;





