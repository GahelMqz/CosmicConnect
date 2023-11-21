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
        <div>
          <h2>Astronomy Picture of the Day</h2>
          <h3>{apodData.title}</h3>
          <img src={apodData.url} alt={apodData.title} />
          <p>{apodData.explanation}</p>
        </div>
      ) : (
        <p>Loading Astronomy Picture of the Day...</p>
      )}
    </div>
  );
};

export default Apod;


