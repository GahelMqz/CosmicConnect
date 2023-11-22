-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-11-2023 a las 22:13:28
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cosmicconnect`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contactos`
--

CREATE TABLE `contactos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mensaje` text NOT NULL,
  `fecha_envio` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `contactos`
--

INSERT INTO `contactos` (`id`, `nombre`, `email`, `mensaje`, `fecha_envio`) VALUES
(1, 'EWT', 'emiliano.gscancun@gmail.com', 'mnbkjmhb', '2023-11-16 19:00:10'),
(2, 'EWT', 'emiliano.gscancun@gmail.com', 'mnbkjmhb', '2023-11-16 19:00:12');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `galaxias`
--

CREATE TABLE `galaxias` (
  `id` int(11) NOT NULL,
  `imagen` varchar(255) NOT NULL,
  `comentario` text DEFAULT NULL,
  `fecha_publicacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `galaxias`
--

INSERT INTO `galaxias` (`id`, `imagen`, `comentario`, `fecha_publicacion`) VALUES
(1, 'uploads\\imagen-1700491130699.png', 'asdadasss', '2023-11-20 14:38:50');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `noticias`
--

CREATE TABLE `noticias` (
  `id` int(11) NOT NULL,
  `imagen` varchar(255) NOT NULL,
  `comentario` text DEFAULT NULL,
  `fecha_publicacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `titulo` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `noticias`
--

INSERT INTO `noticias` (`id`, `imagen`, `comentario`, `fecha_publicacion`, `titulo`) VALUES
(5, 'uploads\\imagen-1700512224155.png', 'dsad32323', '2023-11-20 20:30:24', 'dsadsad23232');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `planetas`
--

CREATE TABLE `planetas` (
  `id` int(11) NOT NULL,
  `imagen` varchar(255) NOT NULL,
  `comentario` text DEFAULT NULL,
  `fecha_publicacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `planetas`
--

INSERT INTO `planetas` (`id`, `imagen`, `comentario`, `fecha_publicacion`) VALUES
(1, 'uploads\\imagen-1700490694123.png', 'qweq', '2023-11-20 14:31:34'),
(2, 'uploads\\imagen-1700513049931.jpg', 'asdsad', '2023-11-20 20:44:09'),
(3, 'uploads\\imagen-1700513436231.png', 'dsadsad', '2023-11-20 20:50:36'),
(4, 'uploads\\imagen-1700513843287.jpg', 'dasdsassss', '2023-11-20 20:57:23'),
(6, 'uploads\\imagen-1700514057616.png', 'asdsad', '2023-11-20 21:00:57');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publicaciones`
--

CREATE TABLE `publicaciones` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `comentario` text DEFAULT NULL,
  `fecha_publicacion` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `publicaciones`
--

INSERT INTO `publicaciones` (`id`, `id_usuario`, `imagen`, `comentario`, `fecha_publicacion`) VALUES
(1, NULL, 'uploads\\imagen-1700056943675.png', 'hjgj', '2023-11-15 09:02:23'),
(2, NULL, 'uploads\\imagen-1700057006520.png', 'mira esta imagen !', '2023-11-15 09:03:26'),
(3, NULL, 'uploads\\imagen-1700139324827.png', 'mira esta captura', '2023-11-16 07:55:24'),
(4, NULL, 'uploads\\imagen-1700139401188.png', 'caca', '2023-11-16 07:56:41'),
(5, NULL, 'uploads\\imagen-1700246731619.png', 'hgjg', '2023-11-17 13:45:31'),
(6, NULL, 'uploads\\imagen-1700457179930.png', 'asdsad', '2023-11-20 00:12:59');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `fecha_registro` datetime DEFAULT current_timestamp(),
  `tipo` varchar(100) NOT NULL DEFAULT 'cliente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombre`, `email`, `contrasena`, `fecha_registro`, `tipo`) VALUES
(1, 'emiliano', 'ewt@gmail.com', '$2b$10$vVdjss8j1r9FS1AGCv6nnOCKqa4ZnDFyhaId5h2SeBQD89rKD2uFC', '2023-11-15 07:51:22', 'admin'),
(2, 'chimal', 'ewt1@gmail.com', '$2b$10$j/0mcmfMq6zbu9lqtYnf6ev2ifHaVW4PM5tBd/d8okdKI1uhhDadu', '2023-11-15 07:52:25', 'cliente'),
(3, 'chimal2', 'ewt14@gmail.com', '$2b$10$m.5NCCZ9nW.OqgkzPuGU0OpNv1ViAQbKoOEjPQTv9zRu0EeuI68Qy', '2023-11-15 07:57:08', 'cliente'),
(4, 'lizama', 'lizama@gmail.com', '$2b$10$BBIPtKnxxhsL5psfZnVu/.aJu7psuvNFNF1YQosZvSrh8voukbJv.', '2023-11-15 08:04:29', 'cliente'),
(5, 'ewt01', 'ewt01@gmail.com', '$2b$10$Z401K1sY.qokM8puR7dT7uaU79VQK5HSQLsybCMVimziXC044hGGS', '2023-11-16 07:54:21', 'cliente'),
(6, 'aldair', 'aldair@gmail.com', '$2b$10$m8RDi4crYozuVZ0TNl4BqOUKWBug1iLTtJOTUakqFBEWPW1.SMh4y', '2023-11-16 08:02:37', 'cliente'),
(7, 'admin', 'admin@gmail.com', '$2b$10$KHKrC0bp1Q6TlWtmhYJhluegc7vqutLmKeFHzw1ggMz98cX/D9RyO', '2023-11-19 21:00:33', 'admin'),
(8, 'asdsad', 'hola@gmail.com', '$2b$10$hpFPRNDgqrM4pfKnhZeVqOSXk2mgkhPIeUb6uFgDgQzFOkZdITHDG', '2023-11-19 21:39:01', 'client'),
(9, 'dddd', 'asd@gmail.com', '$2b$10$gwaOp8IN6PDjnN6WqagbNOVs5k85tmThtBR.Ywy5EA/mWxt7QMBWS', '2023-11-19 23:38:14', 'client'),
(10, 'sdfsd', 'sdf@gmail.vom', '$2b$10$jYNJ71JCbtRMhAnQ.fxfAOyQ5bB4ss65ZWl5DwT/EiaHZgD8MZAKe', '2023-11-20 09:22:29', 'client');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `contactos`
--
ALTER TABLE `contactos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `galaxias`
--
ALTER TABLE `galaxias`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `noticias`
--
ALTER TABLE `noticias`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `planetas`
--
ALTER TABLE `planetas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `publicaciones`
--
ALTER TABLE `publicaciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `contactos`
--
ALTER TABLE `contactos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `galaxias`
--
ALTER TABLE `galaxias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `noticias`
--
ALTER TABLE `noticias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `planetas`
--
ALTER TABLE `planetas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `publicaciones`
--
ALTER TABLE `publicaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `publicaciones`
--
ALTER TABLE `publicaciones`
  ADD CONSTRAINT `publicaciones_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
