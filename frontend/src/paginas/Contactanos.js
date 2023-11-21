import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../css/contactanos.css';
import Header from "../Componentes/Header";
import Footer from "../Componentes/Footer";
import axios from "axios";

function Contactanos() {
  const [contacto, setContacto] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8081/contacto', contacto);
      // Manejo después del envío exitoso
      console.log('Mensaje enviado con éxito');
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
    }
  };

  const handleChange = (e) => {
    // Actualiza el estado a medida que el usuario escribe en el formulario
    setContacto({ ...contacto, [e.target.name]: e.target.value });
  };

  return (
    <>
      <body>
        <Header />

        <nav style={{ background: "lightgray" }}>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li
              className="breadcrumb-item active"
              style={{ fontSize: "medium" }}
              aria-current="page"
            >
              Contactanos
            </li>
          </ol>
        </nav>

        <div className="section-one">
          <h1>Contáctanos</h1>
          <p className="p-contactanos">¿Tienes alguna pregunta o comentario?</p>
          <p className="p-contactanos">¡Háznoslo saber!</p>
          <div className="container-img">
            <img className='img-one-home' src={require("../imgs/satelite.png")} alt="Satélite" />
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#430D4B" fillOpacity="1"
              d="M0,224L34.3,229.3C68.6,235,137,245,206,208C274.3,171,343,85,411,80C480,75,549,149,617,197.3C685.7,245,754,267,823,240C891.4,213,960,139,1029,96C1097.1,53,1166,43,1234,53.3C1302.9,64,1371,96,1406,112L1440,128L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z">
            </path>
          </svg>
        </div>

        <div className="section-two">
          <div className='section-sub-contactanos'>
            <div className="wrapper-contactanos">
              <form onSubmit={handleSubmit}> {/* Cambio en el atributo action */}
                <h1>Formulario</h1>
                <div className="input-box-contactanos">
                  <input type="text" name="nombre" placeholder="Nombre completo" required="" value={contacto.nombre} onChange={handleChange} /> {/* Añadir name y value */}
                  <i className="bx bxs-user" />
                </div>
                <div className="input-box-contactanos">
                  <input type="email" name="email" placeholder="Correo electrónico" required="" value={contacto.email} onChange={handleChange} /> {/* Añadir name y value */}
                  <i className="bx bxs-lock-alt" />
                </div>
                <div className="input-box-contactanos-mensaje">
                  <textarea name="mensaje" placeholder="Mensaje..." cols={30} rows={10} defaultValue={contacto.mensaje} onChange={handleChange} /> {/* Añadir name y value */}
                </div>
                <button type="submit" className="btn-login">
                  ¡Enviar!
                </button>
              </form>
            </div>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#210535" fillOpacity="1"
              d="M0,224L34.3,229.3C68.6,235,137,245,206,208C274.3,171,343,85,411,80C480,75,549,149,617,197.3C685.7,245,754,267,823,240C891.4,213,960,139,1029,96C1097.1,53,1166,43,1234,53.3C1302.9,64,1371,96,1406,112L1440,128L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z">
            </path>
          </svg>
        </div>
        <Footer />
      </body>
    </>
  );
}

export default Contactanos;
