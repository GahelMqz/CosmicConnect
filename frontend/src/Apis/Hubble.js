import React, { useEffect, useState } from 'react';

const HubbleImage = () => {
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://hubblesite.org/api/v3/image/1');
        const result = await response.json();
        setImageData(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {imageData ? (
        <div>
          <h2>Hubble Space Telescope Image</h2>
          <img src={imageData.image_files[0].file_url} alt="Hubble Telescope" />
          {/* Agrega más propiedades según sea necesario */}
        </div>
      ) : (
        <p>Loading Hubble image data...</p>
      )}
    </div>
  );
};

export default HubbleImage;
