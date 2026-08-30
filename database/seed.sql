-- --------------------------------------------------------
-- Hôte:                         127.0.0.1
-- Version du serveur:           10.4.32-MariaDB - mariadb.org binary distribution
-- SE du serveur:                Win64
-- HeidiSQL Version:             12.21.0.7344
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Listage des données de la table inventaire_1.category : ~2 rows (environ)
INSERT INTO `category` (`id`, `name`) VALUES
	(1, 'Laptop'),
	(2, 'Desktop');

-- Listage des données de la table inventaire_1.items : ~4 rows (environ)
INSERT INTO `items` (`id`, `name`, `serial_number`, `category_id`, `location_id`, `status`, `description`) VALUES
	(12, 'efefeffdf', 'fefefef', 1, 8, 'En Stock', 'ededffefefef'),
	(15, 'dsdsdsd', 'sdsdsdEERER', 2, 11, 'En production', 'sdsdsd'),
	(17, 'deddd', 'efefe', 1, 10, 'En production', 'efef'),
	(18, 'testt', 't33434', 2, 8, 'En Stock', 'EFEFEF');

-- Listage des données de la table inventaire_1.locations : ~11 rows (environ)
INSERT INTO `locations` (`id`, `name`) VALUES
	(1, 'Bureau Directrice'),
	(2, 'Open Office Gauche'),
	(3, 'Open Office Droite'),
	(4, 'Bureau Direction Cuisine'),
	(5, 'Bureau Direction cave'),-- --------------------------------------------------------
-- Hôte:                         127.0.0.1
-- Version du serveur:           10.4.32-MariaDB - mariadb.org binary distribution
-- SE du serveur:                Win64
-- HeidiSQL Version:             12.21.0.7344
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Listage des données de la table inventaire_1.category : ~2 rows (environ)
INSERT INTO `category` (`id`, `name`) VALUES
	(1, 'Laptop'),
	(2, 'Desktop');

-- Listage des données de la table inventaire_1.items : ~6 rows (environ)
INSERT INTO `items` (`id`, `name`, `serial_number`, `category_id`, `location_id`, `status`, `description`) VALUES
	(36, 'Dell OptiPlex 7020', 'DO-2026-004d', 2, 6, 'En production', 'Bureau Gauche'),
	(37, 'HP ProDesk 400', 'HP-2026-005', 1, 10, 'En Stock', 'Gerät zur Reparatur'),
	(38, 'Lenovo ThinkCentre', 'LN-2026-006', 2, 7, 'En production', 'Reservegerät'),
	(44, 'Test-Laptop 1', 'LN-2026-006d', 2, 8, 'En Stock', 'test'),
	(46, 'Test-Laptop 2', 'LN-2026-007', 1, 6, 'En Stock', 'Test'),
	(47, 'Test-Laptop 3 ', 'LN-2026-0063d', 2, 8, 'En Stock', 'dedeed');

-- Listage des données de la table inventaire_1.locations : ~11 rows (environ)
INSERT INTO `locations` (`id`, `name`) VALUES
	(1, 'Bureau Directrice'),
	(2, 'Open Office Gauche'),
	(3, 'Open Office Droite'),
	(4, 'Bureau Direction Cuisine'),
	(5, 'Bureau Direction cave'),
	(6, 'Bureau Gauche'),
	(7, 'Bureau Droite'),
	(8, 'Bureau Direction'),
	(9, 'Cave'),
	(10, 'Open Space'),
	(11, 'Salle de Réunion');

-- Listage des données de la table inventaire_1.users : ~3 rows (environ)
INSERT INTO `users` (`id`, `name`, `password`, `role`) VALUES
	(1, 'admin', '$2b$10$O8fAQUR2RJ1A/auYRwrIbO/Vuslsn.IZWm50RYtZuU9CX/p5W2h2S', 'admin'),
	(5, 'theo', '$2b$10$Tx1mU5bkPoLV.SoJ1DJTFe.fiqLjUXfOPv2V0UTTeEyVMvLqmslJG', 'user'),
	(12, 'test', '$2b$10$o4Mu4ySzbEos1aI./5q6A.RjVgrRdw1tvkzplK2pJwpMPrI8taH86', 'user');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;

	(6, 'Bureau Gauche'),
	(7, 'Bureau Droite'),
	(8, 'Bureau Direction'),
	(9, 'Cave'),
	(10, 'Open Space'),
	(11, 'Salle de Réunion');

-- Listage des données de la table inventaire_1.users : ~4 rows (environ)
INSERT INTO `users` (`id`, `name`, `password`, `role`) VALUES
	(1, 'admin', '$2b$10$O8fAQUR2RJ1A/auYRwrIbO/Vuslsn.IZWm50RYtZuU9CX/p5W2h2S', 'admin'),
	(3, 'test', '$2b$10$q0r3k5wGKoaGFR74nUndn.ocjIgvBd.PqmXHo3JkZJVodNPpycLGy', 'user'),
	(5, 'theo', '$2b$10$Tx1mU5bkPoLV.SoJ1DJTFe.fiqLjUXfOPv2V0UTTeEyVMvLqmslJG', 'user'),
	(8, 'addmin', '$2b$10$8DoFIdGCxiRHf53N3MneFer/i2Um2B.PgLzLF5CeR.eXUzsGtcc56', 'admin');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
