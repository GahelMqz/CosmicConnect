import React, { useEffect, useState } from 'react';

const SpaceXData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.spacexdata.com/v4/launches/latest');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {data ? (
        <div>
          <h2>SpaceX Latest Launch</h2>
          <p>Name: {data.name}</p>
          <p>Date: {data.date}</p>
          {/* Agrega más propiedades según sea necesario */}
        </div>
      ) : (
        <p>Loading SpaceX data...</p>
      )}
    </div>
  );
};

export default SpaceXData;




