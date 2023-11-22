import React, { useEffect, useState } from 'react';

const SpaceXLaunches = () => {
  const [launches, setLaunches] = useState([]);
  const [isInfoVisible, setIsInfoVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.spacexdata.com/v4/launches');
        const data = await response.json();
        setLaunches(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const toggleInfoVisibility = () => {
    setIsInfoVisible(!isInfoVisible);
  };

  return (
    <div>
      <button className='btn-dashboard-usuarios-agregar' onClick={toggleInfoVisibility}>
        {isInfoVisible ? 'Ocultar' : 'Mostrar'}
      </button>
      {isInfoVisible && (
        <ul>
          {launches.map((launch, index) => (
            <li className='p-stars' key={index}>
              <strong>Número de vuelo:</strong> {launch.flight_number}<br />
              <strong>Misión:</strong> {launch.name}<br />
              <strong>Fecha de lanzamiento:</strong> {new Date(launch.date_utc).toLocaleString()}<br />
              <strong>Cohete:</strong> {launch.rocket}<br />
              <strong>Lugar de lanzamiento:</strong> {launch.launchpad}<br />
              <strong>Detalles:</strong> {launch.details}<br />
              <br />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SpaceXLaunches;

