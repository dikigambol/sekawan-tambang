import Reservasi from "../models/ReservasiModel.js";
import Kendaraan from "../models/KendaraanModel.js";
import Driver from "../models/DriverModel.js";
import User from "../models/UserModel.js";
import User2 from "../models/UserModel.js";
import { Sequelize } from "sequelize";


export const getReservasi = async (req, res) => {
    Reservasi.belongsTo(Kendaraan, { foreignKey: 'id_kendaraan', logging: console.log });
    Reservasi.belongsTo(Driver, { foreignKey: 'id_driver', logging: console.log });
    Reservasi.belongsTo(User, { foreignKey: 'acc1' })

    try {
        const response = await Reservasi.findAll({
            include: [
                {
                    model: Kendaraan,
                    attributes: []
                },
                {
                    model: Driver,
                    attributes: []
                },
                {
                    model: User,
                    on: {
                        [Sequelize.or]: [
                            {
                                id_user: Sequelize.col("reservasi_kendaraan.acc1"),
                            },
                            {
                                id_user: Sequelize.col("reservasi_kendaraan.acc2")
                            }
                        ]
                    },

                }
            ],
            attributes: {
                include: [[Sequelize.col("nama_kendaraan"), "nama_kendaraan"], [Sequelize.col("Driver.nama"), "nama"]]
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message)
    }
}

export const getReservasiById = async (req, res) => {
    try {
        const response = await Reservasi.findOne({
            where: { id_rsv: req.params.id }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message)
    }
}

export const createReservasi = async (req, res) => {
    let { id_kendaraan, id_driver, keperluan, tanggal_pinjam, tanggal_kembali, acc1, acc2 } = req.body;
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
        res.status(200).json({ status: "success" });
    } catch (error) {
        console.log(error.message)
    }
}

export const updateReservasi = async (req, res) => {
    try {
        await Reservasi.update(req.body, {
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