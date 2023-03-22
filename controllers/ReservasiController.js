import Reservasi from "../models/ReservasiModel.js";
import db from "../config/db.js";


export const getReservasi = async (req, res) => {
    const response = await db.query("SELECT `reservasi_kendaraan`.`id_rsv`, `reservasi_kendaraan`.`id_kendaraan`, `reservasi_kendaraan`.`id_driver`, `reservasi_kendaraan`.`keperluan`, `reservasi_kendaraan`.`tanggal_pinjam`, `reservasi_kendaraan`.`tanggal_kembali`, `reservasi_kendaraan`.`acc1`, `reservasi_kendaraan`.`acc2`, `reservasi_kendaraan`.`status`, `nama_kendaraan` AS `nama_kendaraan`, `driver`.`nama` AS `nama_driver`, `atasan1`.`nama` AS `atasan_1_nama`, `atasan2`.`nama` AS `atasan_2_nama` FROM `reservasi_kendaraan` AS `reservasi_kendaraan` LEFT OUTER JOIN `kendaraan` AS `kendaraan` ON `reservasi_kendaraan`.`id_kendaraan` = `kendaraan`.`id_kendaraan` LEFT OUTER JOIN `drivers` AS `driver` ON `reservasi_kendaraan`.`id_driver` = `driver`.`id_driver` LEFT OUTER JOIN `users` AS `atasan1` ON `reservasi_kendaraan`.`acc1` = `atasan1`.`id_user` LEFT OUTER JOIN `users` AS `atasan2` ON `reservasi_kendaraan`.`acc2` = `atasan2`.`id_user`")
    if (response.length > 0) {
        res.status(200).json(response[0])
    }
}

export const getReservasiById = async (req, res) => {
    try {
        const response = await db.query(`SELECT reservasi_kendaraan.id_rsv, reservasi_kendaraan.id_kendaraan, reservasi_kendaraan.id_driver, reservasi_kendaraan.keperluan, reservasi_kendaraan.tanggal_pinjam, reservasi_kendaraan.tanggal_kembali, reservasi_kendaraan.acc1, reservasi_kendaraan.acc2, reservasi_kendaraan.status, nama_kendaraan AS nama_kendaraan, driver.nama AS nama_driver, atasan1.nama AS atasan_1_nama, atasan2.nama AS atasan_2_nama FROM reservasi_kendaraan AS reservasi_kendaraan LEFT OUTER JOIN kendaraan AS kendaraan ON reservasi_kendaraan.id_kendaraan = kendaraan.id_kendaraan LEFT OUTER JOIN drivers AS driver ON reservasi_kendaraan.id_driver = driver.id_driver LEFT OUTER JOIN users AS atasan1 ON reservasi_kendaraan.acc1 = atasan1.id_user LEFT OUTER JOIN users AS atasan2 ON reservasi_kendaraan.acc2 = atasan2.id_user WHERE (acc1 = ${req.params.id} AND status = 1) OR (acc2 = ${req.params.id} AND status = 2)`)
        if (response.length > 0) {
            res.status(200).json(response[0])
        }
    } catch (error) {
        console.log(error.message)
    }
}

export const createReservasi = async (req, res) => {
    let { id_kendaraan, id_driver, keperluan, tanggal_pinjam, tanggal_kembali, acc1, acc2 } = req.body;
    let tgl_back = tanggal_kembali == "" ? null : tanggal_kembali
    tanggal_kembali = tgl_back
    let status = 1;
    let newRsv = new Reservasi({
        id_kendaraan,
        id_driver,
        keperluan,
        tanggal_pinjam,
        tanggal_kembali,
        acc1,
        acc2,
        status
    });
    try {
        await newRsv.save();
        res.status(200).json({ status: tgl_back });
    } catch (error) {
        console.log(error.message)
    }
}

export const updateReservasi = async (req, res) => {
    let { id_rsv, id_kendaraan, id_driver, keperluan, tanggal_pinjam, tanggal_kembali, acc1, acc2, status } = req.body;
    let tgl_back = tanggal_kembali == "" ? null : tanggal_kembali
    tanggal_kembali = tgl_back
    if (status == 4) {
        await db.query(`UPDATE kendaraan SET ketersediaan = '1' WHERE kendaraan.id_kendaraan = ${id_kendaraan}`)
    }
    let datas = {
        id_rsv,
        id_kendaraan,
        id_driver,
        keperluan,
        tanggal_pinjam,
        tanggal_kembali,
        acc1,
        acc2,
        status
    };
    try {
        await Reservasi.update(datas, {
            where: { id_rsv: req.params.id }
        });
        res.status(200).json({ status: "success" });
    } catch (error) {
        console.log(error.message)
    }
}

export const deleteReservasi = async (req, res) => {
    try {
        await Reservasi.destroy({
            where: { id_rsv: req.params.id }
        });
        res.status(200).json({ status: "success" });
    } catch (error) {
        console.log(error.message)
    }
}

export const setujuReservasi = async (req, res) => {
    let { id, status, id_kendaraan, id_driver, tanggal } = req.body
    let newstatus = ""
    if (status == 1) {
        newstatus = 2
    } else if (status == 2) {
        newstatus = 3
        await db.query(`UPDATE kendaraan SET ketersediaan = '0' WHERE kendaraan.id_kendaraan = ${id_kendaraan}`)
        await db.query(`INSERT INTO his_pemakaian (id_pemakaian, id_kendaraan, id_driver, tanggal) VALUES (NULL, ${id_kendaraan}, ${id_driver},'${tanggal}')`)
    }
    try {
        await db.query(`UPDATE reservasi_kendaraan SET status = ${newstatus} WHERE reservasi_kendaraan.id_rsv = ${id}`)
        res.status(200).json({ status: "success" });
    } catch (error) {
        console.log(error.message)
    }
}

export const tolakReservasi = async (req, res) => {
    let { id, status } = req.body
    try {
        await db.query(`UPDATE reservasi_kendaraan SET status = '0' WHERE reservasi_kendaraan.id_rsv = ${id}`)
        res.status(200).json({ status: "success" });
    } catch (error) {
        console.log(error.message)
    }
}