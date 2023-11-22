import React, { useEffect, useState } from 'react';

const Apod = () => {
  const [apodData, setApodData] = useState(null);

  useEffect(() => {
    const fetchApodData = async () => {
      try {
        const response = await fetch(
          'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY'
        );

        const data = await response.json();
        setApodData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchApodData();
  }, []);

  return (
    <div>
      {apodData ? (
        <div className='p-stars'>
          <h2>{apodData.title}</h2>
          <img src={apodData.url} alt={apodData.title} style={{ width: '400px' }}/>
          <p className='description'>{apodData.explanation}</p>
        </div>
      ) : (
        <p>Cargando imagen...</p>
      )}
    </div>
  );
};

export default Apod;


