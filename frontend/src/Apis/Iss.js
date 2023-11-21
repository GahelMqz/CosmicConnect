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
        <div>
          <h2>ISS Location</h2>
          <p>Latitude: {issData.iss_position.latitude}</p>
          <p>Longitude: {issData.iss_position.longitude}</p>
          <p>Speed: {issData.velocity} m/s</p>
          <p>Altitude: {issData.iss_position.altitude} km</p>
          <p>Timestamp: {new Date(issData.timestamp * 1000).toLocaleTimeString()}</p>
        </div>
      ) : (
        <p>Loading ISS data...</p>
      )}
    </div>
  );
};

export default ISSLocation;




