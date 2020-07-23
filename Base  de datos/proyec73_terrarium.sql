-- phpMyAdmin SQL Dump
-- version 4.9.4
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 27-05-2020 a las 11:19:59
-- Versión del servidor: 5.6.41-84.1
-- Versión de PHP: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proyec73_terrarium`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `parameters`
--

CREATE TABLE `parameters` (
  `idterrarium` int(11) NOT NULL,
  `minTemp` float NOT NULL,
  `maxTemp` float NOT NULL,
  `minHumidity` float NOT NULL,
  `maxHumidity` float NOT NULL,
  `minSoilMoisture` float NOT NULL,
  `maxSoilMoisture` float NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `parameters`
--

INSERT INTO `parameters` (`idterrarium`, `minTemp`, `maxTemp`, `minHumidity`, `maxHumidity`, `minSoilMoisture`, `maxSoilMoisture`) VALUES
(1, 50, 60, 50, 60, 80, 95);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pets`
--

CREATE TABLE `pets` (
  `idpet` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `image` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `characteristics` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `pets`
--

INSERT INTO `pets` (`idpet`, `name`, `image`, `characteristics`) VALUES
(1, 'Basilisco', 'basilisco.jpg', 'Temperature 27 -30 °C\r\nHumidity 80%-100%\r\nSoilMoisture 75-85%'),
(2, 'Camaleon', 'camaleon.jpg', 'Temperature 27 -29 °C\r\nHumidity 90%-100%\r\nSoilMoisture 80-90%'),
(3, 'Escorpeon', 'escorpeon.jpg', 'Temperature 27 -29 °C\r\nHumidity 80%-90%\r\nSoilMoisture 70-75%'),
(4, 'Gecko', 'gecko.jpg', 'Temperature 29-31 °C\r\nHumidity 70%-80%\r\nSoilMoisture 60-70%'),
(5, 'Iguana', 'iguana.jpg', 'Temperature 24- 30 °C\r\nHumidity 50%-60%\r\nSoilMoisture 50-60%'),
(6, 'Piton', 'piton.jpg', 'Temperature 26- 32 °C\r\nHumidity 50%-60%\r\nSoilMoisture 50-60%'),
(7, 'Tarantula', 'tarantula.jpg', 'Temperature 18 - 30 °C\r\nHumidity 50%-60%\r\nSoilMoisture 50-60%'),
(8, 'Tortuga sulcata', 'tortuga.jpg', 'Temperature 30 - 35 °C\r\nHumidity 60%-70%\r\nSoilMoisture 50-70%'),
(9, 'Rana pacman', 'ranapacman.jpg', 'Temperature 22- 27 °C\r\nHumidity 80%-95%\r\nSoilMoisture 80-90%');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sensor`
--

CREATE TABLE `sensor` (
  `humidity` float NOT NULL,
  `soilmoisture` float NOT NULL,
  `temperature` float NOT NULL,
  `idterrarium` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `sensor`
--

INSERT INTO `sensor` (`humidity`, `soilmoisture`, `temperature`, `idterrarium`) VALUES
(37, 88, 27.6, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sensor_record`
--

CREATE TABLE `sensor_record` (
  `idterrarium` int(11) NOT NULL,
  `temperature` float NOT NULL,
  `soilmoisture` float NOT NULL,
  `humidity` float NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `sensor_record`
--

INSERT INTO `sensor_record` (`idterrarium`, `temperature`, `soilmoisture`, `humidity`, `date`) VALUES
(1, 32, 67, 50, '2020-05-07 01:53:22'),
(1, 33, 68, 70, '2020-05-07 01:53:22'),
(0, 25, 40, 55, '2020-05-05 05:00:00'),
(0, 44, 46, 48, '2020-05-07 19:22:26'),
(1, 28, 65, 41, '2020-05-05 05:00:00'),
(1, 33, 55, 69, '2020-05-04 05:00:00'),
(1, 20, 66, 59, '2020-04-23 05:00:00'),
(1, 24, 66, 65, '2020-03-27 06:00:00'),
(1, 22, 47, 60, '2020-04-30 05:00:00'),
(1, 27.2, 85, 16, '2020-05-26 05:38:30');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `pass` varchar(50) NOT NULL,
  `email` varchar(20) NOT NULL,
  `lastname` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `pass`, `email`, `lastname`) VALUES
(3, 'Jonathan', '12345678', 'jona@gmail.com', 'Ramirez'),
(4, 'Daniel', 'sd6f56sd5f65sd6f', 'danielp@hotmail.com', 'Perez'),
(5, 'Juan', 'df54sd4f5sf', 'lopez@gmail.com', 'Lopez'),
(6, 'Alejandro', '12345678', 'alejandro@gmail.com', 'Morales');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `parameters`
--
ALTER TABLE `parameters`
  ADD PRIMARY KEY (`idterrarium`);

--
-- Indices de la tabla `pets`
--
ALTER TABLE `pets`
  ADD PRIMARY KEY (`idpet`);

--
-- Indices de la tabla `sensor`
--
ALTER TABLE `sensor`
  ADD PRIMARY KEY (`idterrarium`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `parameters`
--
ALTER TABLE `parameters`
  MODIFY `idterrarium` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `pets`
--
ALTER TABLE `pets`
  MODIFY `idpet` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `sensor`
--
ALTER TABLE `sensor`
  MODIFY `idterrarium` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
