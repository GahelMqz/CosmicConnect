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
      <h2>SpaceX Launches</h2>
      <button onClick={toggleInfoVisibility}>
        {isInfoVisible ? 'Hide Info' : 'Show Info'}
      </button>
      {isInfoVisible && (
        <ul>
          {launches.map((launch, index) => (
            <li key={index}>
              <strong>Flight Number:</strong> {launch.flight_number}<br />
              <strong>Mission Name:</strong> {launch.name}<br />
              <strong>Launch Date:</strong> {new Date(launch.date_utc).toLocaleString()}<br />
              <strong>Rocket:</strong> {launch.rocket}<br />
              <strong>Launch Site:</strong> {launch.launchpad}<br />
              <strong>Details:</strong> {launch.details}<br />
              <br />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SpaceXLaunches;

