import React, { useEffect, useState } from 'react';

const ISSLocation = () => {
  const [issData, setISSData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://api.open-notify.org/iss-now.json');
        const result = await response.json();
        setISSData(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {issData ? (
        <div className='p-stars'>
          <strong className='strong-iss'>Latitud: </strong>{issData.iss_position.latitude}<br />
          <strong className='strong-iss'>Longitud: </strong>{issData.iss_position.longitude}<br />
          <strong className='strong-iss'>Velocidad: </strong>{issData.velocity} m/s<br />
          <strong className='strong-iss'>Altitud: </strong>{issData.iss_position.altitude} km<br />
          <strong className='strong-iss'>Marca de tiempo: </strong>{new Date(issData.timestamp * 1000).toLocaleTimeString()}
        </div>
      ) : (
        <p>Cargando información...</p>
      )}
    </div>
  );
};

export default ISSLocation;




