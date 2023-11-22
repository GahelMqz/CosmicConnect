import express from 'express';
import mysql from 'mysql';
import bcrypt from 'bcrypt'; // Asegúrate de importar bcrypt
import cors from 'cors';
import multer from 'multer';
import path from 'path';

// Configuración de Multer para almacenar archivos subidos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Asegúrate de que este directorio exista
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });
// Crear la instancia Express
const app = express();

// Utilizar cors
app.use(cors());

// Middleware para analizar body de tipo JSON
app.use(express.json());

app.use('/uploads', express.static('uploads'));

//contactoo
app.use(express.urlencoded({ extended: true }));


app.post('/subir-publicacion', upload.single('imagen'), (req, res) => {
    // Aquí necesitarás verificar si el usuario está logueado
    // Esto podría hacerse a través de un token o una sesión

    // req.file contiene la información del archivo subido
    // req.body contendrá el resto de los datos, como el comentario

    const id_usuario = req.body.id_usuario; // Suponiendo que obtienes el id del usuario de alguna manera
    const comentario = req.body.comentario;
    const imagenUrl = req.file.path

    // Insertar en la base de datos
    const query = 'INSERT INTO publicaciones (id_usuario, imagen, comentario) VALUES (?, ?, ?)';
    conexion.query(query, [id_usuario, imagenUrl, comentario], (err, results) => {
        if (err) {
            res.status(500).send('Error en el servidor: ' + err.message);
            return;
        }
        res.status(201).send('Publicación creada con éxito');
    });
});

// Publicaciones
app.get('/obtener-publicaciones', (req, res) => {
    const query = 'SELECT * FROM publicaciones ORDER BY fecha_publicacion DESC';
    conexion.query(query, (err, results) => {
        if (err) {
            res.status(500).send('Error en el servidor: ' + err.message);
            return;
        }
        res.status(200).json(results);
    });
});

app.put('/actualizar-planeta/:id', upload.single('imagen'), (req, res) => {
    const idPlaneta = req.params.id;
    const nombre_planeta = req.body.nombre_planeta;
    const comentario = req.body.comentario;
    let imagenUrl = req.file ? req.file.path : null;

    let query;
    let parametros;

    if (imagenUrl) {
        // Actualizar tanto la imagen como el comentario
        query = 'UPDATE planetas SET nombre_planeta = ?, comentario = ?, imagen = ? WHERE id = ?';
        parametros = [nombre_planeta, comentario, imagenUrl, idPlaneta];
    } else {
        // Actualizar solo el comentario
        query = 'UPDATE planetas SET nombre_planeta = ?, comentario = ? WHERE id = ?';
        parametros = [nombre_planeta, comentario, idPlaneta];
    }

    conexion.query(query, parametros, (err, results) => {
        if (err) {
            res.status(500).send('Error en el servidor: ' + err.message);
            return;
        }
        res.send('Planeta actualizado con éxito');
    });
});


app.delete('/eliminar-planeta/:id', (req, res) => {
    const idPlaneta = req.params.id;

    const query = 'DELETE FROM planetas WHERE id = ?';
    conexion.query(query, [idPlaneta], (err, results) => {
        if (err) {
            res.status(500).send('Error en el servidor: ' + err.message);
            return;
        }
        res.send('Planeta eliminado con éxito');
    });
});


//Noticias
app.post('/subir-noticia', upload.single('imagen'), (req, res) => {
    const titulo = req.body.titulo;
    const imagenUrl = req.file.path
    const comentario = req.body.comentario;

    // Insertar en la base de datos
    const query = 'INSERT INTO noticias (titulo, imagen, comentario) VALUES (?, ?, ?)';
    conexion.query(query, [titulo, imagenUrl, comentario], (err, results) => {
        if (err) {
            res.status(500).send('Error en el servidor: ' + err.message);
            return;
        }
        res.status(201).send('Noticia creada con éxito');
    });
});

app.get('/obtener-noticias', (req, res) => {
    const query = 'SELECT * FROM noticias ORDER BY fecha_publicacion DESC';
    conexion.query(query, (err, results) => {
        if (err) {
            res.status(500).send('Error en el servidor: ' + err.message);
            return;
        }
        res.status(200).json(results);
    });
});


app.delete('/eliminar-noticia/:id', (req, res) => {
    const idNoticia = req.params.id;

    const query = 'DELETE FROM noticias WHERE id = ?';
    conexion.query(query, [idNoticia], (err, results) => {
        if (err) {
            res.status(500).send('Error en el servidor: ' + err.message);
            return;
        }
        res.status(200).send('Noticia eliminada con éxito');
    });
});

app.put('/actualizar-noticia/:id', upload.single('imagen'), (req, res) => {
    const idNoticia = req.params.id;
    const { titulo, comentario } = req.body;
    let imagenUrl = req.file ? req.file.path : null;

    // Lógica para determinar si se proporcionó una nueva imagen
    if (!imagenUrl) {
        // Si no hay una nueva imagen, mantenemos la imagen actual
        // Necesitarás obtener la imagen actual de la base de datos
        const queryImagenActual = 'SELECT imagen FROM noticias WHERE id = ?';
        conexion.query(queryImagenActual, [idNoticia], (err, results) => {
            if (err) {
                res.status(500).send('Error al obtener la imagen actual: ' + err.message);
                return;
            }
            if (results.length > 0) {
                imagenUrl = results[0].imagen;
            }
            // Continuar con la actualización
            actualizarNoticia(idNoticia, titulo, comentario, imagenUrl, res);
        });
    } else {
        // Continuar con la actualización directamente si hay una nueva imagen
        actualizarNoticia(idNoticia, titulo, comentario, imagenUrl, res);
    }
});

function actualizarNoticia(id, titulo, comentario, imagen, res) {
    const query = 'UPDATE noticias SET titulo = ?, comentario = ?, imagen = ? WHERE id = ?';
    conexion.query(query, [titulo, comentario, imagen, id], (err, results) => {
        if (err) {
            res.status(500).send('Error al actualizar la noticia: ' + err.message);
            return;
        }
        res.send('Noticia actualizada con éxito');
    });
}




//Planetas

app.post('/subir-planeta', upload.single('imagen'), (req, res) => {

    const nombre_planeta = req.body.nombre_planeta;
    const imagenUrl = req.file.path
    const comentario = req.body.comentario;

    // Insertar en la base de datos
    const query = 'INSERT INTO planetas (nombre_planeta, imagen, comentario) VALUES (?, ?, ?)';
    conexion.query(query, [nombre_planeta, imagenUrl, comentario], (err, results) => {
        if (err) {
            res.status(500).send('Error en el servidor: ' + err.message);
            return;
        }
        res.status(201).send('Planeta creada con éxito');
    });
});


app.get('/obtener-planetas', (req, res) => {
    const query = 'SELECT * FROM planetas ORDER BY fecha_publicacion DESC';
    conexion.query(query, (err, results) => {
        if (err) {
            res.status(500).send('Error en el servidor: ' + err.message);
            return;
        }
        res.status(200).json(results);
    });
});


// Galaxias 
app.post('/subir-galaxia', upload.single('imagen'), (req, res) => {
    const nombre_galaxia = req.body.nombre_galaxia;
    const imagenUrl = req.file.path
    const comentario = req.body.comentario;

    const query = 'INSERT INTO galaxias (nombre_galaxia, imagen, comentario) VALUES (?, ?, ?)';
    conexion.query(query, [nombre_galaxia, imagenUrl, comentario], (err, results) => {
        if (err) {
            res.status(500).send('Error en el servidor: ' + err.message);
            return;
        }
        res.status(201).send('Planeta creada con éxito');
    });
});


app.get('/obtener-galaxias', (req, res) => {
    const query = 'SELECT * FROM galaxias ORDER BY fecha_publicacion DESC';
    conexion.query(query, (err, results) => {
        if (err) {
            res.status(500).send('Error en el servidor: ' + err.message);
            return;
        }
        res.status(200).json(results);
    });
});





// Crear la conexión a la base de datos
const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cosmicconnect'
});

// Verificar las conexiones
conexion.connect(function (error) {
    if (error) {
        console.log("Error al conectar a la base de datos", error);
    } else {
        console.log("Conectado exitosamente a la base de datos de CosmicConnect");
    }
});

// Registro de usuarios
app.post('/register', async (req, res) => {
    try {
        const { nombre, email, contrasena } = req.body;
        const hashedPassword = await bcrypt.hash(contrasena, 10); // Encriptar contraseña

        const query = 'INSERT INTO usuarios (nombre, email, contrasena) VALUES (?, ?, ?)';
        conexion.query(query, [nombre, email, hashedPassword], (err, results) => {
            if (err) {
                throw err;
            }
            res.status(201).send('Usuario registrado con éxito');
        });
    } catch (error) {
        res.status(500).send('Error en el servidor: ' + error.message);
    }
});

app.post('/login', (req, res) => {
    const { email, contrasena } = req.body;

    const query = 'SELECT * FROM usuarios WHERE email = ?';
    conexion.query(query, [email], async (err, results) => {
        if (err) {
            res.status(500).send('Error en el servidor');
            return;
        }
        if (results.length === 0 || !(await bcrypt.compare(contrasena, results[0].contrasena))) {
            res.status(401).send('Email o contraseña incorrectos');
            return;
        }

        // Enviar el tipo de usuario en la respuesta
        res.json({
            message: 'Login exitoso',
            tipo: results[0].tipo
        });
    });
});


// En tu archivo servidor.js, después de las demás rutas
app.get('/usuarios', (req, res) => {
    const query = 'SELECT * FROM usuarios';
    conexion.query(query, (err, results) => {
        if (err) {
            res.status(500).send('Error en el servidor: ' + err.message);
            return;
        }
        res.status(200).json(results);
    });
});

//agregar usuarios 
app.post('/usuarios', async (req, res) => {
    const { nombre, email, contrasena, tipo } = req.body;
    const hashedPassword = await bcrypt.hash(contrasena, 10); // Encriptar contraseña

    const query = 'INSERT INTO usuarios (nombre, email, contrasena, tipo) VALUES (?, ?, ?, ?)';
    conexion.query(query, [nombre, email, hashedPassword, tipo], (err, results) => {
        if (err) {
            res.status(500).send('Error en el servidor: ' + err.message);
            return;
        }
        res.status(201).send('Usuario registrado con éxito');
    });
});

//actualizar usuario 

app.put('/usuarios/:id', async (req, res) => {
    const { nombre, email, contrasena, tipo } = req.body;
    const id = req.params.id;
    const hashedPassword = await bcrypt.hash(contrasena, 10); // Encriptar contraseña

    const query = 'UPDATE usuarios SET nombre = ?, email = ?, contrasena = ?, tipo = ? WHERE id_usuario = ?';
    conexion.query(query, [nombre, email, hashedPassword, tipo, id], (err, results) => {
        if (err) {
            res.status(500).send('Error en el servidor: ' + err.message);
            return;
        }
        res.send('Usuario actualizado');
    });
});

//eliminar ususario 

app.delete('/usuarios/:id', (req, res) => {
    const id = req.params.id;

    const query = 'DELETE FROM usuarios WHERE id_usuario = ?';
    conexion.query(query, [id], (err, results) => {
        if (err) {
            res.status(500).send('Error en el servidor: ' + err.message);
            return;
        }
        res.send('Usuario eliminado');
    });
});


//formulario de contactanos 

app.post('/contacto', (req, res) => {
    const { nombre, email, mensaje } = req.body;

    const query = 'INSERT INTO contactos (nombre, email, mensaje) VALUES (?, ?, ?)';
    conexion.query(query, [nombre, email, mensaje], (err, results) => {
        if (err) {
            console.error('Error al guardar el mensaje:', err);
            res.status(500).send('Hubo un error al procesar su mensaje');
            return;
        }
        res.send('Mensaje enviado con éxito');
    });
});


app.put('/editar-publicacion/:id', (req, res) => {
    const id = req.params.id;
    const nuevaDescripcion = req.body.nuevaDescripcion; // Obtén la nueva descripción del cuerpo de la solicitud

    // Realiza una consulta SQL para actualizar la descripción de la publicación por su ID
    const query = 'UPDATE publicaciones SET comentario = ? WHERE id = ?';
    conexion.query(query, [nuevaDescripcion, id], (err, results) => {
        if (err) {
            res.status(500).send('Error en el servidor: ' + err.message);
            return;
        }
        res.send('Descripción de la publicación actualizada con éxito');
    });
});



app.delete('/eliminar-publicacion/:id', (req, res) => {
    const id = req.params.id;

    // Realiza una consulta SQL para eliminar la publicación por su ID
    const query = 'DELETE FROM publicaciones WHERE id = ?';
    conexion.query(query, [id], (err, results) => {
        if (err) {
            res.status(500).send('Error en el servidor: ' + err.message);
            return;
        }
        res.send('Publicación eliminada con éxito');
    });
});




app.put('/actualizar-galaxia/:id', upload.single('imagen'), (req, res) => {
    const idGalaxia = req.params.id;
    const nombre_galaxia = req.body.nombre_galaxia;
    const comentario = req.body.comentario;
    let imagenUrl = req.file ? req.file.path : null;

    let query;
    let parametros;

    /*if (imagenUrl) {
        query = 'UPDATE galaxias SET nombre_galaxia = ?, comentario = ?, imagen = ? WHERE id = ?';
        parametros = [nombre_galaxia, comentario, imagenUrl, idGalaxia];
    } else {
        query = 'UPDATE galaxias SET nombre_galaxia = ?, comentario = ? WHERE id = ?';
        parametros = [nombre_galaxia, comentario, idGalaxia];
    }*/
    if (imagenUrl) {
        // Actualizar tanto la imagen como el comentario
        query = 'UPDATE galaxias SET nombre_galaxia = ?, comentario = ?, imagen = ? WHERE id = ?';
        parametros = [nombre_galaxia, comentario, imagenUrl, idGalaxia];
    } else {
        // Actualizar solo el comentario
        query = 'UPDATE galaxias SET nombre_galaxia = ?, comentario = ? WHERE id = ?';
        parametros = [nombre_galaxia, comentario, idGalaxia];
    }

    conexion.query(query, parametros, (err, results) => {
        if (err) {
            res.status(500).send('Error en el servidor: ' + err.message);
            return;
        }
        res.send('Galaxia actualizada con éxito');
    });
});

app.delete('/eliminar-galaxia/:id', (req, res) => {
    const idGalaxia = req.params.id;

    const query = 'DELETE FROM galaxias WHERE id = ?';
    conexion.query(query, [idGalaxia], (err, results) => {
        if (err) {
            res.status(500).send('Error en el servidor: ' + err.message);
            return;
        }
        res.send('Galaxia eliminada con éxito');
    });
});





// Iniciar el servidor
app.listen(8081, () => {
    console.log("Servidor iniciado en el puerto 8081");
});


