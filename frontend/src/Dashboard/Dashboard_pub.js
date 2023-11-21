import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DashboardPub() {
  const [publicaciones, setPublicaciones] = useState([]);
  const [nuevaDescripcion, setNuevaDescripcion] = useState('');
  const [imagen, setImagen] = useState(null); // Para la edición de imágenes
  const [editingId, setEditingId] = useState(null); // Para el seguimiento de la publicación en edición

  useEffect(() => {
    cargarPublicaciones();
  }, []);

  const cargarPublicaciones = async () => {
    try {
      const response = await axios.get('http://localhost:8081/obtener-publicaciones');
      setPublicaciones(response.data);
    } catch (error) {
      console.error('Error al cargar las publicaciones:', error);
    }
  };

  const editarDescripcion = async (id) => {
    try {
      // Verificar si estamos editando una publicación
      if (editingId === id) {
        // Realizar la actualización de descripción
        await axios.put(`/editar-publicacion/${id}`, { nuevaDescripcion });
        setEditingId(null); // Terminar la edición
        cargarPublicaciones(); // Recargar las publicaciones después de la edición
      } else {
        // Iniciar la edición
        setEditingId(id);
        setNuevaDescripcion('');
      }
    } catch (error) {
      console.error('Error al editar la descripción:', error);
    }
  };

  const eliminarPublicacion = async (id) => {
    try {
      await axios.delete(`/eliminar-publicacion/${id}`);
      cargarPublicaciones();
    } catch (error) {
      console.error('Error al eliminar la publicación:', error);
    }
  };

  const handleImageChange = (e) => {
    setImagen(e.target.files[0]);
  };

  return (
    <div>
      <h1>Dashboard de Publicaciones</h1>
      <ul>
        {publicaciones.map((publicacion) => (
          <li key={publicacion.id}>
            <img src={publicacion.imagen} alt="Publicación" />
            <p>
              {editingId === publicacion.id ? (
                // Mostrar textarea para editar descripción en modo edición
                <textarea
                  value={nuevaDescripcion}
                  onChange={(e) => setNuevaDescripcion(e.target.value)}
                />
              ) : (
                // Mostrar descripción en modo lectura
                publicacion.comentario
              )}
            </p>
            {editingId === publicacion.id ? (
              // Mostrar botón de "Guardar" en modo edición
              <button onClick={() => editarDescripcion(publicacion.id)}>Guardar</button>
            ) : (
              // Mostrar botón de "Editar" en modo lectura
              <button onClick={() => editarDescripcion(publicacion.id)}>Editar</button>
            )}
            <button onClick={() => eliminarPublicacion(publicacion.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DashboardPub;


