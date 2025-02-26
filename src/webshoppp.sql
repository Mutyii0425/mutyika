-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 26, 2025 at 09:14 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `webshoppp`
--

-- --------------------------------------------------------

--
-- Table structure for table `akcio`
--

CREATE TABLE `akcio` (
  `akcios_ar` int(11) NOT NULL,
  `akcio_eleje` date NOT NULL,
  `akcio_vege` date NOT NULL,
  `a_azonosito` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `csoport`
--

CREATE TABLE `csoport` (
  `cs_azonosito` int(30) NOT NULL,
  `cs_nev` varchar(30) NOT NULL,
  `cs_csoport` int(30) NOT NULL,
  `alkategoria` int(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `csoport`
--

INSERT INTO `csoport` (`cs_azonosito`, `cs_nev`, `cs_csoport`, `alkategoria`) VALUES
(1, 'Felsőruházat', 13, 0),
(2, 'Alsóruházat', 13, 0),
(9, 'Póló', 1, 1),
(13, 'Ruha', 0, 0),
(14, 'Rövidujjú', 9, 9),
(15, 'Hosszúujjú', 9, 9),
(16, 'Kiegészítő', 20, 0),
(17, 'Bögre', 16, 0),
(18, 'Cipő', 21, 0);

-- --------------------------------------------------------

--
-- Table structure for table `kategoriak`
--

CREATE TABLE `kategoriak` (
  `cs_azonosito` int(11) NOT NULL,
  `cs_nev` varchar(255) NOT NULL,
  `cs_csoport` int(11) DEFAULT NULL,
  `t_alkategoria` int(11) DEFAULT NULL,
  `fo_kategoria` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `kategoriak`
--

INSERT INTO `kategoriak` (`cs_azonosito`, `cs_nev`, `cs_csoport`, `t_alkategoria`, `fo_kategoria`) VALUES
(1, 'Felsőruházat', NULL, 4, 3),
(2, 'Alsóruházat', NULL, NULL, NULL),
(3, 'Ruha', NULL, 1, NULL),
(4, 'Póló', 1, 6, 1),
(5, 'Pulóver', 1, NULL, 1),
(6, 'Rövidujjú', 4, 1, NULL),
(7, 'Hosszúujjú', 4, 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `kosar`
--

CREATE TABLE `kosar` (
  `azonosito` int(30) NOT NULL,
  `felhasznalo_id` int(30) NOT NULL,
  `termek_id` int(30) NOT NULL,
  `mennyiseg` int(30) NOT NULL,
  `ruhatipus_id` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `rendeles`
--

CREATE TABLE `rendeles` (
  `azonosito` int(30) NOT NULL,
  `vevo` int(30) NOT NULL,
  `termek` varchar(30) NOT NULL,
  `statusz` varchar(30) NOT NULL,
  `mennyiseg` int(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Dumping data for table `rendeles`
--

INSERT INTO `rendeles` (`azonosito`, `vevo`, `termek`, `statusz`, `mennyiseg`) VALUES
(13, 2, '5', 'küldött', 7),
(14, 2, '3', 'küldött', 7),
(15, 4, '2', 'küldött', 7),
(16, 4, '2', 'küldött', 7),
(17, 4, '-3', 'küldött', 3),
(18, 13, '8', 'nem küldött', 9),
(19, 13, '8', 'nem küldött', 9),
(20, 13, '8', 'nem küldött', 7),
(21, 13, '8', 'nem küldött', 7),
(23, 0, '', '', 0);

-- --------------------------------------------------------

--
-- Table structure for table `termekek`
--

CREATE TABLE `termekek` (
  `t_azonosito` int(30) NOT NULL,
  `t_nev` varchar(30) NOT NULL,
  `t_ar` int(30) NOT NULL,
  `egysegar` int(30) NOT NULL,
  `t_csoport` int(30) NOT NULL,
  `termekleiras` varchar(60) NOT NULL,
  `kiszereles` varchar(30) NOT NULL,
  `keszlet` int(60) NOT NULL,
  `akciosar` int(30) NOT NULL,
  `akcios_egysegar` int(30) NOT NULL,
  `akcio_vege` date NOT NULL,
  `akcio_eleje` date NOT NULL,
  `afa_kulcs` varchar(30) NOT NULL,
  `meret` varchar(30) NOT NULL,
  `szin` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Dumping data for table `termekek`
--

INSERT INTO `termekek` (`t_azonosito`, `t_nev`, `t_ar`, `egysegar`, `t_csoport`, `termekleiras`, `kiszereles`, `keszlet`, `akciosar`, `akcios_egysegar`, `akcio_vege`, `akcio_eleje`, `afa_kulcs`, `meret`, `szin`) VALUES
(9, 'Póló', 1500, 2000, 14, 'Ez a polo elég jó és minőségi', 'nagy', 20, 1000, 1000, '2024-12-15', '2024-12-10', '27%', 'XL', 'fehér'),
(10, 'Póló', 1500, 2000, 14, 'Ez a polo elég jó és minőségi', 'nagy', 20, 1000, 1000, '2024-12-15', '2024-12-10', '27%', 'XL', 'fekete'),
(11, 'Póló', 1500, 2000, 14, 'Ez a polo elég jó és minőségi', 'nagy', 20, 1000, 1000, '2024-12-15', '2024-12-10', '27%', 'XL', 'szürke'),
(12, 'Cipő', 10000, 10000, 18, 'ez egy cipő', 'nagy', 30, 0, 0, '2024-12-15', '2024-12-12', '27%', 'XL', 'fekete'),
(13, 'Pulóver', 20000, 20000, 1, 'Ez a púlover minőségi', 'nagy', 30, 0, 0, '0000-00-00', '0000-00-00', '27%', 'XL', 'fekete'),
(14, 'Pulóver', 20000, 20000, 1, 'Ez a púlover minőségi', 'nagy', 30, 0, 0, '0000-00-00', '0000-00-00', '27%', 'XL', 'fekete'),
(15, 'Pulóver', 20000, 20000, 1, 'Ez a púlover minőségi', 'nagy', 30, 0, 0, '0000-00-00', '0000-00-00', '27%', 'XL', 'fekete'),
(16, 'Cipő', 34222, 34222, 18, '....', 'db', 7, 0, 0, '0000-00-00', '0000-00-00', '27%', '37,38,39,40,41,42', ''),
(17, 'Cipő', 34222, 34222, 18, '....', 'db', 7, 0, 0, '0000-00-00', '0000-00-00', '27%', '37,38,39,40,41,42', '');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `felhasznalonev` varchar(30) NOT NULL,
  `jelszo` varchar(60) NOT NULL,
  `email` varchar(50) NOT NULL,
  `f_azonosito` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`felhasznalonev`, `jelszo`, `email`, `f_azonosito`) VALUES
('', 'ikrek', 'adamka.davidka.2005@gmail.com', 1),
('', '$2b$10$KOsKW.EzGGdgzbrzBHWiy.4', 'dubleczbence@gmail.com', 2),
('', '$2b$10$Vdyy4ltXxBuaJCm2v55nne4', 'bence@gmail.com', 3),
('a', '$2b$10$GGtX.5szfBr8rLZiq0NJU.3', 'aa.2005@gmail.com', 4),
('', 'aaassdd', 'csalimate84@gmail.com', 5),
('', '122121', 'csalimate35@gmail.com', 6),
('', '122121', 'csalimate@gmail.com', 7),
('', '122121', 'csalimatee@gmail.com', 8),
('', '122121', 'csalimateee@gmail.com', 9),
('fityma', '122121', 'csalimateeee@gmail.com', 10),
('fityma', '$2b$10$2lV2Ugs9vzoUXiPNBlllu./', 'csalimate355@gmail.com', 11),
('csalimate', '$2b$10$/c9HYRYbl.oT2mQj/9U.0.P', 'ok@gmail.com', 12),
('awd', '$2b$10$VMCBN6Ul9LeVchDSU3nu8OM', 'dddd@gmail.com', 13),
('dwd', '$2b$10$R1u8.oZCzqtFXGT03kvgweh', 'dwd@gmail.com', 14),
('aad', '$2b$10$.oRc1z8/3IIoJmZVu2/E4OV', 'aad@gmail.com', 15),
('nananana', '$2b$10$9H1fU43LclHxyq7KI3beEu1wfpHkIDEBZmrMEjt/kLmb48gXFkgZm', 'nana@gmail.com', 16),
('Pöcs Ödön', '$2b$10$mHstBKpdyewjQgA2tWyQQ.CDcigXrqVNkCxBkAwNnYn4ZfSS4FN6G', 'pocsodon@gmail.com', 17),
('fff', '$2b$10$viID0Xrj6PLNtpO86S5im.PlBAUJ.GTSgUhvWLPzncydOiAGi4YLi', 'fff@gmail.com', 18);

-- --------------------------------------------------------

--
-- Table structure for table `vevo`
--

CREATE TABLE `vevo` (
  `v_azonosito` int(40) NOT NULL,
  `nev` varchar(40) NOT NULL,
  `telefonszam` varchar(40) NOT NULL,
  `email` varchar(40) NOT NULL,
  `jelszo` varchar(40) NOT NULL,
  `szuletesi_datum` date NOT NULL,
  `irsz` int(40) NOT NULL,
  `telepules` varchar(40) NOT NULL,
  `kozterulet` varchar(40) NOT NULL,
  `hazszam` varchar(40) NOT NULL,
  `egyeb` varchar(40) NOT NULL,
  `szamlazasi_nev` varchar(40) NOT NULL,
  `szamlazasai_irsz` int(40) NOT NULL,
  `szamlazasi_telepules` varchar(40) NOT NULL,
  `szamlazasi_kozterulet` varchar(40) NOT NULL,
  `szamlazasi_hazszam` varchar(40) NOT NULL,
  `szamlazasi_egyeb` varchar(40) NOT NULL,
  `adoszam` varchar(40) NOT NULL,
  `szalliatasi_nev` varchar(40) NOT NULL,
  `szallitasi_irsz` int(40) NOT NULL,
  `szallitasi_telepules` varchar(40) NOT NULL,
  `szallitasi_kozterulet` varchar(40) NOT NULL,
  `szallitasi_haszon` varchar(40) NOT NULL,
  `szallitasi_egyeb` varchar(40) NOT NULL,
  `hirlevel` varchar(40) NOT NULL,
  `payment_method` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Dumping data for table `vevo`
--

INSERT INTO `vevo` (`v_azonosito`, `nev`, `telefonszam`, `email`, `jelszo`, `szuletesi_datum`, `irsz`, `telepules`, `kozterulet`, `hazszam`, `egyeb`, `szamlazasi_nev`, `szamlazasai_irsz`, `szamlazasi_telepules`, `szamlazasi_kozterulet`, `szamlazasi_hazszam`, `szamlazasi_egyeb`, `adoszam`, `szalliatasi_nev`, `szallitasi_irsz`, `szallitasi_telepules`, `szallitasi_kozterulet`, `szallitasi_haszon`, `szallitasi_egyeb`, `hirlevel`, `payment_method`) VALUES
(3, 'adam', '311434', 'adam.david.@gmail.com', 'adam', '2006-04-25', 8754, 'keszthely', 'foter', '2', 'emelet', 'Ádám', 8471, 'Káptalanfa', 'emelet', '2', 'aadm', '4456788', 'Ádám', 8471, 'coop', 'dadad', '', 'adad', 'adadda', NULL),
(4, 'adam', '311434', 'adam.david.@gmail.com', 'adam', '2004-12-01', 8754, 'keszthely', 'foter', '2', 'emelet', 'Ádám', 8471, 'Káptalanfa', 'emelet', '2', 'aadm', '4456788', 'Ádám', 8471, 'coop', 'dadad', '', 'adad', 'adadda', NULL),
(5, 'adam', '311434', 'adam.david.@gmail.com', 'adam', '0000-00-00', 8754, 'keszthely', 'foter', '2', 'emelet', 'Ádám', 8471, 'Káptalanfa', 'emelet', '2', '4456788', 'Ádám', 'addddddddddddddddd', 8471, 'Káptalanfa', 'coop', 'aadm', 'adad', 'adadda', NULL),
(6, 'cadadad', '1', 'adada', 'dadad', '0000-00-00', 4232, 'adadad', 'adadad', 'adadad', 'adadad', 'adadada', 4, 'adadad', 'adada', 'dada', 'a', 'addad', 'egegegsd', 5, 'adad', 'fagegfdsh', 'ada', 'awdawdawgtdgs', '', NULL),
(8, 'adam', '36306456286', 'adam.david.@gmail.com', 'auto', '2234-02-02', 6666, 'keszthely', 'foter', '2', 'emelet', 'Ádám', 0, '', '', '', '', 'Ádám', '', 0, '', '', '', '', '', NULL),
(9, 'adam', '36306456286', 'adam.david.@gmail.com', 'auto', '2002-02-02', 6666, 'keszthely', 'foter', '2', 'emelet', 'Ádám', 0, 'adadad', 'gggg', 'gggg', '2222', '2444', '', 54646, '565768', '76878', 'aadm', '787878', '', NULL),
(10, 'adam', '36306456286', 'adam.david.@gmail.com', 'auto', '2222-02-02', 6666, 'keszthely', 'foter', '2', 'emelet', '', 0, '', '', '', '', '', '', 0, '', '', '', '', '', NULL),
(11, 'adam', '36306456286', 'adam.david.@gmail.com', '$2y$10$4RtPVm6dlUrlzIS/sppGJOU3vdeuyQFuV', '2222-02-02', 6666, 'keszthely', 'foter', '2', '', '', 0, '', '', '', '', '', '', 0, '', '', '', '', '', NULL),
(12, '', '', '', '$2y$10$Hz.DmHncY2FYi2hsqFfYuuYgSDiR5z3Vu', '0000-00-00', 0, '', '', '', '', '', 0, '', '', '', '', '', '', 0, '', '', '', '', '', NULL),
(13, '', '', '', '', '0000-00-00', 0, '', '', '', '', '', 0, '', '', '', '', '', '', 0, '', '', '', '', '', NULL),
(14, 'adam', '36306456286', 'adam.david.@gmail.com', '', '2002-02-02', 6666, 'keszthely', 'foter', '2', '', '', 0, '', '', '', '', '', '', 0, '', '', '', '', '', 'bank_card'),
(15, 'adam', '36306456286', 'adam.david.@gmail.com', '', '2002-03-31', 6666, 'keszthely', 'foter', '2', '', '', 0, '', '', '', '', '', '', 0, '', '', '', '', '', 'bank_card'),
(16, 'adam', '36306456286', 'adam.david.@gmail.com', '', '2002-03-31', 6666, 'keszthely', 'foter', '2', '', '', 0, '', '', '', '', '', '', 0, '', '', '', '', '', 'bank_card'),
(17, 'adam', '36306456286', 'adam.david.@gmail.com', '', '2002-03-31', 6666, 'keszthely', 'foter', '2', '', '', 0, '', '', '', '', '', '', 0, '', '', '', '', '', 'bank_card'),
(18, 'adam', '36306456286', 'adam.david.@gmail.com', '', '2002-02-02', 6666, 'keszthely', 'foter', '2', '', '', 0, '', '', '', '', '', '', 0, '', '', '', '', '', 'bank_card'),
(19, 'adam', '36306456286', 'adam.david.@gmail.com', '', '2001-02-02', 2242, 'kaptafa', 'dozsa ter', '24', '', '', 0, '', '', '', '', '', '', 0, '', '', '', '', '', 'bank_card'),
(20, 'adam', '36306456286', 'adam.david.@gmail.com', '', '2000-02-02', 2242, 'kaptafa', 'dozsa ter', '24', '', '', 0, '', '', '', '', '', '', 0, '', '', '', '', '', 'bank_card'),
(21, 'adam', '36306456286', 'adam.david.@gmail.com', '', '1200-12-02', 2242, 'kaptafa', 'dozsa ter', '24', '', '', 0, '', '', '', '', '', '', 0, '', '', '', '', '', 'bank_card'),
(22, 'adam', '36306456286', 'adam.david.@gmail.com', '', '2002-02-02', 2242, 'kaptafa', 'dozsa ter', '24', '', '', 0, '', '', '', '', '', '', 0, '', '', '', '', '', 'bank_card'),
(23, 'toma', '3633333333', 'adam.david.@gmail.com', '', '2024-01-01', 8700, 'bosreostcsok', 'toma ter', '33', '', '', 0, '', '', '', '', '', '', 0, '', '', '', '', '', 'bank_card'),
(24, 'mate', '3630000000', 'davud@2004gmnail.com', '', '2001-02-01', 8400, 'keszthely', 'foter', '10', '', '', 0, '', '', '', '', '', '', 0, '', '', '', '', '', 'bank_card');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `csoport`
--
ALTER TABLE `csoport`
  ADD PRIMARY KEY (`cs_azonosito`);

--
-- Indexes for table `rendeles`
--
ALTER TABLE `rendeles`
  ADD PRIMARY KEY (`azonosito`);

--
-- Indexes for table `termekek`
--
ALTER TABLE `termekek`
  ADD PRIMARY KEY (`t_azonosito`),
  ADD KEY `fk_csoport` (`t_csoport`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`f_azonosito`);

--
-- Indexes for table `vevo`
--
ALTER TABLE `vevo`
  ADD PRIMARY KEY (`v_azonosito`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `csoport`
--
ALTER TABLE `csoport`
  MODIFY `cs_azonosito` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `rendeles`
--
ALTER TABLE `rendeles`
  MODIFY `azonosito` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `termekek`
--
ALTER TABLE `termekek`
  MODIFY `t_azonosito` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `f_azonosito` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `vevo`
--
ALTER TABLE `vevo`
  MODIFY `v_azonosito` int(40) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `termekek`
--
ALTER TABLE `termekek`
  ADD CONSTRAINT `fk_csoport` FOREIGN KEY (`t_csoport`) REFERENCES `csoport` (`cs_azonosito`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
