import React, { useState } from "react";
import TwitterLogin from "react-twitter-login";
import axios from "axios";

const TwitterLoginComponent = () => {
  const [token, setToken] = useState(null);

  const authHandler = async (err, data) => {
    if (err) {
      console.error("Error durante la autenticación:", err);
    } else {
      console.log("Datos de autenticación:", data);
      setToken(data?.credentials?.token); // Almacena el token de acceso

      // Hacer una solicitud a la API de Twitter usando el token de acceso
      try {
        const response = await axios.get("https://api.twitter.com/2/tweets", {
          headers: {
            Authorization: `Bearer ${data?.credentials?.token}`
          }
        });

        console.log("Respuesta de la API de Twitter:", response.data);
      } catch (error) {
        console.error("Error al hacer la solicitud a la API de Twitter:", error);
      }
    }
  };

  return (
    <div>
      <TwitterLogin
        authCallback={authHandler}
        consumerKey={"FncyAMG7iYXiasb5eELRIxTGu"}
        consumerSecret={"ezLCImR26r2R0LSdpGun5bhc3IAxK5VsGymqqTICi1WmLVdbh0"}
      />

      {token && <p>Token de Acceso: {token}</p>}
    </div>
  );
};

export default TwitterLoginComponent;

