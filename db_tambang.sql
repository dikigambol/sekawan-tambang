-- --------------------------------------------------------
-- Host:                         sql12.freesqldatabase.com
-- Versi server:                 5.5.62-0ubuntu0.14.04.1 - (Ubuntu)
-- OS Server:                    debian-linux-gnu
-- HeidiSQL Versi:               12.4.0.6659
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Membuang struktur basisdata untuk sql12607679
CREATE DATABASE IF NOT EXISTS `db_tambang` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `db_tambang`;

-- membuang struktur untuk table sql12607679.cabang
CREATE TABLE IF NOT EXISTS `cabang` (
  `id_cabang` int(10) NOT NULL AUTO_INCREMENT,
  `nama_cabang` varchar(100) NOT NULL,
  PRIMARY KEY (`id_cabang`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;

-- Membuang data untuk tabel sql12607679.cabang: ~1 rows (lebih kurang)
INSERT INTO `cabang` (`id_cabang`, `nama_cabang`) VALUES
	(2, 'Tambang Malang');

-- membuang struktur untuk table sql12607679.lokasi_tambang
CREATE TABLE IF NOT EXISTS `lokasi_tambang` (
  `id_lok_tbg` int(11) NOT NULL AUTO_INCREMENT,
  `id_cabang` int(11) NOT NULL,
  `nama_lok_tbg` varchar(100) NOT NULL,
  PRIMARY KEY (`id_lok_tbg`),
  KEY `id_cabang` (`id_cabang`),
  CONSTRAINT `relation_cabang` FOREIGN KEY (`id_cabang`) REFERENCES `cabang` (`id_cabang`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

-- Membuang data untuk tabel sql12607679.lokasi_tambang: ~2 rows (lebih kurang)
INSERT INTO `lokasi_tambang` (`id_lok_tbg`, `id_cabang`, `nama_lok_tbg`) VALUES
	(2, 2, 'Pertambangan Dau'),
	(4, 2, 'Pertambangan Martapura');

-- membuang struktur untuk table sql12607679.perusahaan_sewa
CREATE TABLE IF NOT EXISTS `perusahaan_sewa` (
  `id_ps` int(10) NOT NULL AUTO_INCREMENT,
  `nama_ps` varchar(200) NOT NULL,
  PRIMARY KEY (`id_ps`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

-- Membuang data untuk tabel sql12607679.perusahaan_sewa: ~1 rows (lebih kurang)
INSERT INTO `perusahaan_sewa` (`id_ps`, `nama_ps`) VALUES
	(2, 'PT. Warmindar (Warung Peminjaman Kendaraan)');

-- membuang struktur untuk table sql12607679.kendaraan
CREATE TABLE IF NOT EXISTS `kendaraan` (
  `id_kendaraan` int(10) NOT NULL AUTO_INCREMENT,
  `nama_kendaraan` varchar(200) NOT NULL,
  `jenis` varchar(100) NOT NULL,
  `tipe` varchar(100) NOT NULL,
  `id_ps` int(3) DEFAULT NULL,
  `ketersediaan` int(1) NOT NULL,
  PRIMARY KEY (`id_kendaraan`),
  KEY `relation_ps` (`id_ps`),
  CONSTRAINT `relation_ps` FOREIGN KEY (`id_ps`) REFERENCES `perusahaan_sewa` (`id_ps`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;

-- Membuang data untuk tabel sql12607679.kendaraan: ~2 rows (lebih kurang)
INSERT INTO `kendaraan` (`id_kendaraan`, `nama_kendaraan`, `jenis`, `tipe`, `id_ps`, `ketersediaan`) VALUES
	(2, 'Kol N 99 LGX', 'sewa', 'angkutan orang', 2, 1),
	(11, 'Truck N 66 LGC', 'pribadi', 'angkutan barang', NULL, 1);

-- membuang struktur untuk table sql12607679.users
CREATE TABLE IF NOT EXISTS `users` (
  `id_user` int(10) NOT NULL AUTO_INCREMENT,
  `role` int(1) NOT NULL,
  `id_lok_tbg` int(3) DEFAULT NULL,
  `nama` varchar(200) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`id_user`),
  KEY `id_lok_tbg` (`id_lok_tbg`),
  CONSTRAINT `relation_lok_tbg` FOREIGN KEY (`id_lok_tbg`) REFERENCES `lokasi_tambang` (`id_lok_tbg`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4;

-- Membuang data untuk tabel sql12607679.users: ~5 rows (lebih kurang)
INSERT INTO `users` (`id_user`, `role`, `id_lok_tbg`, `nama`, `username`, `password`) VALUES
	(9, 1, NULL, 'Diki Gambol', 'admin', '$2a$10$kycro5c6tMp9Dzt8luozDOHxO1uy4TzY6pyFdIW4ZqrCSGTQusn5u'),
	(10, 2, 2, 'Dendik Wahyu', 'dendik', '$2a$10$0NJZnlr.AagT1b1TptZqZONY6LQp9k0cZfkn8fsQxcpmzi.24N4x2'),
	(11, 2, 2, 'Anti Okta', 'anti', '$2a$10$F8wYkxqowQpONB1NrG5Ds.jYB5yShQy9dUexm7xltKUbLOA1zJDFS'),
	(18, 2, 4, 'Park Jihyo', 'jihyo', '$2a$10$T0v3SduSiUvOiHFqsvNO/.q.hk8Dft/ZafdpbkSR76Bak.rYemCzW'),
	(19, 2, 4, 'Lisa Blekping', 'lisa', '$2a$10$jL.ijlYiGGCxFoQFHelO9uUZHzUlUP/LFqH58Af6gt3YU/vVR5e/e');

-- membuang struktur untuk table sql12607679.drivers
CREATE TABLE IF NOT EXISTS `drivers` (
  `id_driver` int(10) NOT NULL AUTO_INCREMENT,
  `id_lok_tbg` int(3) DEFAULT NULL,
  `nama` varchar(100) NOT NULL,
  PRIMARY KEY (`id_driver`),
  KEY `id_lok_tbg` (`id_lok_tbg`),
  CONSTRAINT `relation_lok_tbg_2` FOREIGN KEY (`id_lok_tbg`) REFERENCES `lokasi_tambang` (`id_lok_tbg`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;

-- Membuang data untuk tabel sql12607679.drivers: ~4 rows (lebih kurang)
INSERT INTO `drivers` (`id_driver`, `id_lok_tbg`, `nama`) VALUES
	(2, 2, 'Gondam Prabowo'),
	(4, 2, 'Diki Akbar'),
	(6, 4, 'Alfat Akbar'),
	(7, 4, 'Brad Pritt');

-- membuang struktur untuk table sql12607679.his_bbm
CREATE TABLE IF NOT EXISTS `his_bbm` (
  `id_bbm` int(10) NOT NULL AUTO_INCREMENT,
  `id_kendaraan` int(3) NOT NULL,
  `tanggal` date NOT NULL,
  `nominal` int(100) NOT NULL,
  PRIMARY KEY (`id_bbm`),
  KEY `id_kendaraan` (`id_kendaraan`),
  CONSTRAINT `relation_kendaraan_1` FOREIGN KEY (`id_kendaraan`) REFERENCES `kendaraan` (`id_kendaraan`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;

-- Membuang data untuk tabel sql12607679.his_bbm: ~0 rows (lebih kurang)
INSERT INTO `his_bbm` (`id_bbm`, `id_kendaraan`, `tanggal`, `nominal`) VALUES
	(13, 2, '2023-03-23', 80000);

-- membuang struktur untuk table sql12607679.his_pemakaian
CREATE TABLE IF NOT EXISTS `his_pemakaian` (
  `id_pemakaian` int(10) NOT NULL AUTO_INCREMENT,
  `id_kendaraan` int(3) NOT NULL,
  `id_driver` int(3) NOT NULL,
  `tanggal` date NOT NULL,
  PRIMARY KEY (`id_pemakaian`),
  KEY `relation_kendaraan_3` (`id_kendaraan`),
  KEY `relation_driver_1` (`id_driver`),
  CONSTRAINT `relation_driver_1` FOREIGN KEY (`id_driver`) REFERENCES `drivers` (`id_driver`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `relation_kendaraan_3` FOREIGN KEY (`id_kendaraan`) REFERENCES `kendaraan` (`id_kendaraan`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;

-- Membuang data untuk tabel sql12607679.his_pemakaian: ~1 rows (lebih kurang)
INSERT INTO `his_pemakaian` (`id_pemakaian`, `id_kendaraan`, `id_driver`, `tanggal`) VALUES
	(6, 2, 4, '2023-03-23'),
	(7, 11, 6, '2023-03-24');

-- membuang struktur untuk table sql12607679.his_service
CREATE TABLE IF NOT EXISTS `his_service` (
  `id_service` int(10) NOT NULL AUTO_INCREMENT,
  `id_kendaraan` int(3) NOT NULL,
  `tanggal` date NOT NULL,
  `keterangan` text NOT NULL,
  PRIMARY KEY (`id_service`),
  KEY `id_kendaraan` (`id_kendaraan`),
  CONSTRAINT `relation_kendaraan_2` FOREIGN KEY (`id_kendaraan`) REFERENCES `kendaraan` (`id_kendaraan`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

-- Membuang data untuk tabel sql12607679.his_service: ~0 rows (lebih kurang)
INSERT INTO `his_service` (`id_service`, `id_kendaraan`, `tanggal`, `keterangan`) VALUES
	(6, 2, '2023-03-23', 'servis mesin');

-- membuang struktur untuk table sql12607679.reservasi_kendaraan
CREATE TABLE IF NOT EXISTS `reservasi_kendaraan` (
  `id_rsv` int(11) NOT NULL AUTO_INCREMENT,
  `id_kendaraan` int(3) NOT NULL,
  `id_driver` int(3) NOT NULL,
  `keperluan` text NOT NULL,
  `tanggal_pinjam` date NOT NULL,
  `tanggal_kembali` date DEFAULT NULL,
  `acc1` int(3) NOT NULL,
  `acc2` int(3) NOT NULL,
  `status` int(1) NOT NULL,
  PRIMARY KEY (`id_rsv`),
  KEY `id_kendaraan` (`id_kendaraan`),
  KEY `id_driver` (`id_driver`),
  CONSTRAINT `relation_driver_rsv` FOREIGN KEY (`id_driver`) REFERENCES `drivers` (`id_driver`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `relation_kendaraan_rsv` FOREIGN KEY (`id_kendaraan`) REFERENCES `kendaraan` (`id_kendaraan`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

-- Membuang data untuk tabel sql12607679.reservasi_kendaraan: ~0 rows (lebih kurang)
INSERT INTO `reservasi_kendaraan` (`id_rsv`, `id_kendaraan`, `id_driver`, `keperluan`, `tanggal_pinjam`, `tanggal_kembali`, `acc1`, `acc2`, `status`) VALUES
	(3, 2, 4, 'Membawa batu bara ke bali', '2023-03-23', '2023-03-25', 11, 10, 4),
	(5, 11, 6, 'Ke Lamongan Bawa Semen', '2023-03-24', '2023-03-25', 18, 19, 4);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
