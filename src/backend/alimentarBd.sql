
-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-03-2024 a las 18:36:02
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
-- Base de datos: `neurodiver`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `acertijo`
--

CREATE TABLE `acertijo` (
  `id_ac` int(2) NOT NULL,
  `id_juego` int(11) NOT NULL,
  `cancion_url` varchar(255) NOT NULL,
  `imagen_url` varchar(255) NOT NULL,
  `pista` varchar(30) NOT NULL,
  `solucion` varchar(30) NOT NULL,
  `pregunta` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `acertijo`
--

INSERT INTO `acertijo` (`id_ac`, `id_juego`, `cancion_url`, `imagen_url`, `pista`, `solucion`, `pregunta`) VALUES
(4, 1, './assets/audios/gatomontes.mp3', './assets/images/curro.webp;./assets/images/romero.jpg', 'torero', 'curro romero', 'arte puro'),
(6, 1, './assets/audios/hormiguero.mp3', './assets/images/pilar.jpg;./assets/images/rubiojpg.jpg', 'Sergio ramos', 'pilar rubio', 'actriz'),
(7, 1, './assets/audios/adiopapa.mp3', './assets/images/ronaldo.jpg;./assets/images/cristiano.jpg', 'rock', 'los ronaldos', 'que grupo de rock de los 80s'),
(8, 1, './assets/audios/ojodetigre.mp3', './assets/images/ojodetigre.jpg;/assets/images/guantes.jpg', 'boxeo', 'rocky', 'famosa peli'),
(9, 1, './assets/audios/heroes.mp3', './assets/images/heroes.webp;./assets/images/silencio.jpg', 'grupo de los 80s', 'heroes del silencio', 'que grupo de rock'),
(12, 1, './assets/audios/badbany.mp3', './assets/images/badbuny.jpg', 'trap', 'bad buny', 'cantante'),
(13, 1, './assets/audios/camaron.mp3', './assets/images/camaron.webp;./assets/images/isla.jpg', 'ROMPE CAMIZA', 'camaron de la isla', 'cantante'),
(16, 1, './assets/audios/coldplay.mp3', './assets/images/col.jpg;./assets/images/pley.webp', 'no se', 'cold play', 'que grupo de rock americano'),
(17, 1, './assets/audios/nancys.mp3', './assets/images/nancys.jpg;./assets/images/rubia.jpg', 'Alaska', 'nancys rubias', 'que grupo español'),
(18, 1, './assets/audios/amoreno.mp3', './assets/images/azucar.jpg;./assets/images/moreno.jpg', 'bandido', 'azucar moreno', 'qué dúo flamenco canta?'),
(19, 1, './assets/audios/taburete.mp3', './assets/images/taburete.jpg', 'BARCENAS', 'taburete', '¿ Qué banda de rock español?'),
(20, 1, './assets/audios/magodeoz.mp3', './assets/images/tamariz.jpeg;./assets/images/hz.webp', 'rock', 'mago de oz', 'banda de folk metal española'),
(22, 1, './assets/audios/laea.mp3', './assets/images/palloma.jpg;', 'eurovisión 2023', 'blanca paloma', 'quien canta'),
(23, 1, './assets/audios/camilosesto.mp3', './assets/images/camilo7.jpg', 'Jesucristo superstrar', 'camilo sesto', 'cantante español'),
(24, 1, './assets/audios/ctangana.mp3', './assets/images/c.jpg;./assets/images/tanga.jpg;./assets/images/ana.webp', 'mala mujer', 'ctangana', 'este canta rap trap flamenquito, sabes quíen es???'),
(25, 1, './assets/audios/acdc.mp3', './assets/images/ccuerpo.jpg', 'metal', 'ACDC', 'Grupo Metal'),
(26, 1, './assets/audios/pitingo.mp3', './assets/images/numeropi.jpg;./assets/images/twingo.jpg', 'flamenquito', 'pitingo', 'cantante'),
(27, 1, './assets/audios/imagine.mp3', './assets/images/imaginar.jpg;./assets/images/dragones.avif', 'banda americana', 'imagine dragons', 'quien canta');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `juego`
--

CREATE TABLE `juego` (
  `id` int(2) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `descripcion` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `imagen` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `juego`
--

INSERT INTO `juego` (`id`, `nombre`, `descripcion`, `imagen`) VALUES
(1, 'ADIVINA EL PERSONAJE', 'Acertijos nNeurodiver es un gjuego interactivo qu', './assets/images/bombilla.png;'),
(20, '3 letras', 'el juego', './assets/images/numero-pi.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `partida`
--

CREATE TABLE `partida` (
  `id_usuario` int(11) DEFAULT NULL,
  `id_juego` int(11) DEFAULT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `puntos` int(11) DEFAULT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `partida`
--

INSERT INTO `partida` (`id_usuario`, `id_juego`, `fecha`, `puntos`, `id`) VALUES
(183, 1, '2024-02-28 19:11:25', -4, 13),
(183, 1, '2024-02-29 12:40:41', -20, 14),
(218, 1, '2024-02-28 19:11:25', 30, 15),
(219, 1, '2024-02-28 20:30:15', 10, 16),
(220, 1, '2024-02-29 08:45:37', -15, 17),
(222, 1, '2024-03-01 13:20:10', 25, 18),
(223, 1, '2024-03-01 15:05:48', 40, 19),
(224, 1, '2024-03-01 17:55:22', -5, 20),
(225, 1, '2024-03-02 09:10:05', 20, 21),
(226, 1, '2024-03-02 10:45:30', -10, 22),
(227, 1, '2024-03-02 12:20:17', 15, 23),
(228, 1, '2024-03-02 14:00:00', 50, 24),
(229, 1, '2024-03-02 15:30:45', -20, 25),
(230, 1, '2024-03-03 08:15:55', 30, 26),
(231, 1, '2024-03-03 10:40:20', 45, 27),
(232, 1, '2024-03-03 13:05:37', 5, 28),
(233, 1, '2024-03-04 09:30:15', -10, 29),
(234, 1, '2024-03-04 12:20:45', 35, 30),
(235, 1, '2024-03-04 15:00:00', -5, 31),
(233, 1, '2024-03-03 11:05:22', 20, 32),
(183, 1, '2024-02-28 19:21:25', 0, 33),
(183, 1, '2024-02-28 19:11:25', -10, 34),
(183, 1, '2024-03-06 19:11:25', 5, 35),
(183, 1, '2024-03-13 19:11:25', 20, 36),
(183, 1, '2024-03-20 19:11:25', -15, 37),
(183, 1, '2024-03-27 19:11:25', 30, 38),
(183, 1, '2024-04-03 18:11:25', -5, 39),
(183, 1, '2024-04-10 18:11:25', 40, 40),
(183, 1, '2024-04-17 18:11:25', 25, 41),
(183, 1, '2024-04-24 18:11:25', -20, 42),
(183, 1, '2024-05-01 18:11:25', 45, 43),
(183, 1, '2024-05-08 18:11:25', -10, 44),
(183, 1, '2024-05-15 18:11:25', 50, 45),
(183, 1, '2024-05-22 18:11:25', -15, 46),
(183, 1, '2024-05-29 18:11:25', 35, 47),
(183, 1, '2024-06-05 18:11:25', 10, 48),
(217, 1, '2024-02-01 20:30:15', 10, 49),
(217, 1, '2024-02-01 21:30:15', 5, 50),
(217, 1, '2024-02-01 22:30:15', -15, 51),
(217, 1, '2024-02-08 20:30:15', 30, 52),
(217, 1, '2024-02-08 21:30:15', 20, 53),
(217, 1, '2024-02-08 22:30:15', -10, 54),
(217, 1, '2024-02-15 20:30:15', 40, 55),
(217, 1, '2024-02-15 21:30:15', 25, 56),
(217, 1, '2024-02-15 22:30:15', 50, 57),
(217, 1, '2024-02-22 20:30:15', -5, 58),
(217, 1, '2024-02-22 21:30:15', 15, 59),
(217, 1, '2024-02-22 22:30:15', 35, 60),
(217, 1, '2024-02-29 20:30:15', -20, 61),
(217, 1, '2024-02-29 21:30:15', 45, 62),
(217, 1, '2024-02-29 22:30:15', 0, 63),
(217, 1, '2024-03-05 11:28:25', -20, 64),
(183, 1, '2024-03-05 14:24:03', -20, 65),
(183, 1, '2024-03-05 14:26:19', -20, 66),
(183, 1, '2024-03-06 10:21:04', -20, 67),
(183, 1, '2024-03-06 10:22:05', -4, 68),
(183, 1, '2024-03-06 10:23:28', -4, 69),
(217, 1, '2024-03-06 10:36:47', -4, 70),
(183, 1, '2024-03-06 10:40:39', 3, 71),
(183, 1, '2024-03-06 10:49:42', -4, 72),
(217, 1, '2024-03-06 11:41:01', -4, 73),
(217, 1, '2024-03-08 15:26:26', 3, 74),
(183, 1, '2024-03-08 15:35:35', -4, 75),
(183, 1, '2024-03-08 16:04:09', -4, 76),
(183, 1, '2024-03-08 16:25:51', -4, 77),
(183, 1, '2024-03-08 16:33:53', -4, 78);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(2) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `contrasena` varchar(255) DEFAULT NULL,
  `rol` enum('jugador','admin') DEFAULT NULL,
  `tema_interfaz` varchar(50) DEFAULT NULL,
  `idioma` varchar(50) DEFAULT NULL,
  `ultimo_acceso` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `nombre`, `email`, `contrasena`, `rol`, `tema_interfaz`, `idioma`, `ultimo_acceso`) VALUES
(183, 'alexx2', 'alexx2@gmail.com', '$2b$10$R0V6Lq6Dx56TvIDdkieZGO6pwqA291fc2apWrOxBtPcWY2DDyFc.e', 'admin', NULL, NULL, '2024-03-05 11:40:49'),
(217, 'aleii8', 'aleii8@gmail.com', '$2b$10$pYIRpYQ2NO/qOxRGFhJFreyQJqCTLfbdTatIQkyo8AN0uIIqimO7S', 'jugador', NULL, NULL, '2024-03-02 14:44:43'),
(218, 'aeiou2', 'aeiou1@gmail.com', '$2b$10$9gopWuhJu1sCeHQJ4Ee2WuDA/o5EspA72KUnDGG8qWliTcOHAZ.pi', 'jugador', NULL, NULL, '0000-00-00 00:00:00'),
(219, 'aeio1a', 'aeio1@gmail.com', '$2b$10$p63QDiOXaFV3oXR.ah8WheixiAk7uopvK/1/I8KTPE9YJfsR8Cxva', 'jugador', NULL, NULL, '2024-03-02 15:32:38'),
(220, 'aeoi88', 'aeoi88@gmail.com', '$2b$10$29TjfGlQjjczmHAI3o9OF.CiyH3evBrTNDgPlLgf08vSC3NTCZcUG', 'jugador', NULL, NULL, '2024-03-02 15:33:09'),
(222, 'User02', 'usuario2@gmail.com', '$2b$10$9gopWuhJu1sCeHQJ4Ee2WuDA/o5EspA72KUnDGG8qWliTcOHAZ.pi', 'jugador', NULL, NULL, '2024-03-05 10:03:25'),
(223, 'User03', 'usuario3@gmail.com', '$2b$10$9gopWuhJu1sCeHQJ4Ee2WuDA/o5EspA72KUnDGG8qWliTcOHAZ.pi', 'jugador', NULL, NULL, '2024-03-05 10:03:34'),
(224, 'User04', 'usuario4@gmail.com', '$2b$10$9gopWuhJu1sCeHQJ4Ee2WuDA/o5EspA72KUnDGG8qWliTcOHAZ.pi', 'jugador', NULL, NULL, '2024-03-05 10:03:46'),
(225, 'User05', 'usuario5@gmail.com', '$2b$10$9gopWuhJu1sCeHQJ4Ee2WuDA/o5EspA72KUnDGG8qWliTcOHAZ.pi', 'jugador', NULL, NULL, '2024-03-05 10:04:09'),
(226, 'User06', 'usuario6@gmail.com', '$2b$10$9gopWuhJu1sCeHQJ4Ee2WuDA/o5EspA72KUnDGG8qWliTcOHAZ.pi', 'jugador', NULL, NULL, '2024-03-05 10:04:20'),
(227, 'User07', 'usuario7@gmail.com', '$2b$10$9gopWuhJu1sCeHQJ4Ee2WuDA/o5EspA72KUnDGG8qWliTcOHAZ.pi', 'jugador', NULL, NULL, '2024-03-05 10:04:35'),
(228, 'User08', 'usuario8@gmail.com', '$2b$10$9gopWuhJu1sCeHQJ4Ee2WuDA/o5EspA72KUnDGG8qWliTcOHAZ.pi', 'jugador', NULL, NULL, '2024-03-05 10:04:49'),
(229, 'User09', 'usuario9@gmail.com', '$2b$10$9gopWuhJu1sCeHQJ4Ee2WuDA/o5EspA72KUnDGG8qWliTcOHAZ.pi', 'jugador', NULL, NULL, '2024-03-05 10:04:59'),
(230, 'User0b', 'usuario10@gmail.com', '$2b$10$9gopWuhJu1sCeHQJ4Ee2WuDA/o5EspA72KUnDGG8qWliTcOHAZ.pi', 'jugador', NULL, NULL, '2024-03-05 10:05:09'),
(231, 'User0a', 'usuario11@gmail.com', '$2b$10$9gopWuhJu1sCeHQJ4Ee2WuDA/o5EspA72KUnDGG8qWliTcOHAZ.pi', 'jugador', NULL, NULL, '2024-03-05 10:05:18'),
(232, 'Usera1', 'usuario12@gmail.com', '$2b$10$9gopWuhJu1sCeHQJ4Ee2WuDA/o5EspA72KUnDGG8qWliTcOHAZ.pi', 'jugador', NULL, NULL, '2024-03-05 10:05:30'),
(233, 'Usera2', 'usuario13@gmail.com', '$2b$10$9gopWuhJu1sCeHQJ4Ee2WuDA/o5EspA72KUnDGG8qWliTcOHAZ.pi', 'jugador', NULL, NULL, '2024-03-05 10:05:38'),
(234, 'Usera3', 'usuario14@gmail.com', '$2b$10$9gopWuhJu1sCeHQJ4Ee2WuDA/o5EspA72KUnDGG8qWliTcOHAZ.pi', 'jugador', NULL, NULL, '2024-03-05 10:05:46'),
(235, 'Usera4', 'usuario15@gmail.com', '$2b$10$9gopWuhJu1sCeHQJ4Ee2WuDA/o5EspA72KUnDGG8qWliTcOHAZ.pi', 'jugador', NULL, NULL, '2024-03-05 10:05:54'),
(237, 'pepel7', 'pepel7@gmail.com', '$2b$10$s2vcVVTLGNqSA0Xn6cMar.3nYWJWYCpJqRKVy7S2FwfxL4AA7LRMS', 'jugador', NULL, NULL, '2024-03-08 17:25:32'),
(238, 'josel7', 'josel7@gmail.com', '$2b$10$GFxQRzPBGOlpxq8oh9ohk.VxO6OhXpCN7qPZN72RPS2UrES.P54ji', 'jugador', NULL, NULL, '2024-03-08 17:32:08'),
(239, 'josel7', 'josel8@gmail.com', '$2b$10$fmGoyAYflNJSFACMOpnBHuxqMgjb4qgwxaqog2B0mix15FM./O.qu', 'jugador', NULL, NULL, '2024-03-08 17:32:52');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `acertijo`
--
ALTER TABLE `acertijo`
  ADD PRIMARY KEY (`id_ac`),
  ADD KEY `id_juego` (`id_juego`);

--
-- Indices de la tabla `juego`
--
ALTER TABLE `juego`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`);

--
-- Indices de la tabla `partida`
--
ALTER TABLE `partida`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_partida_juego` (`id_juego`),
  ADD KEY `fk_partida_usuario` (`id_usuario`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `acertijo`
--
ALTER TABLE `acertijo`
  MODIFY `id_ac` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `juego`
--
ALTER TABLE `juego`
  MODIFY `id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `partida`
--
ALTER TABLE `partida`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=240;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `acertijo`
--
ALTER TABLE `acertijo`
  ADD CONSTRAINT `fk_acertijo_juego` FOREIGN KEY (`id_juego`) REFERENCES `juego` (`id`);

--
-- Filtros para la tabla `partida`
--
ALTER TABLE `partida`
  ADD CONSTRAINT `fk_partida_juego` FOREIGN KEY (`id_juego`) REFERENCES `juego` (`id`),
  ADD CONSTRAINT `fk_partida_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
