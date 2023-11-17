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

// Login de usuarios
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
        res.send('Login exitoso');
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







// Iniciar el servidor
app.listen(8081, () => {
    console.log("Servidor iniciado en el puerto 8081");
});


