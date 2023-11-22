import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Api_1 = () => {
  const [starData, setStarData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: 'GET',
        url: 'https://stars-by-api-ninjas.p.rapidapi.com/v1/stars',
        params: { name: 'Andromeda Galaxy' },
        headers: {
          'X-RapidAPI-Key': '8829d68d7fmsh8064becaa341a8cp15e52ajsn523003d1beec',
          'X-RapidAPI-Host': 'stars-by-api-ninjas.p.rapidapi.com',
        },
      };

      try {
        const response = await axios.request(options);
        setStarData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []); // Dependencias vacías para que se ejecute solo una vez al montar el componente

  return (
    <div>
      {starData && starData.length > 0 ? (
        <div>
          <ul>
            {starData.map((star, index) => (
              <li className='p-stars' key={index}>
                <strong>Nombre:</strong> {star.name}<br />
                <strong>Constelación:</strong> {star.constellation}<br />
                <strong>Coordenadas:</strong> {star.right_ascension}<br />
                <strong>Declinación:</strong> {star.declination}<br />
                <strong>Magnitud aparente:</strong> {star.apparent_magnitude}<br />
                <strong>Magnitud absoluta:</strong> {star.absolute_magnitude}<br />
                <strong>Distancia (años luz):</strong> {star.distance_light_year}<br />
                <strong>Clasificación estelar:</strong> {star.spectral_class}<br />
                <br />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading star data...</p>
      )}
    </div>
  );
};

export default Api_1;








