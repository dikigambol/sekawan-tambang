import { Sequelize } from "sequelize";
import Kendaraan from "../models/KendaraanModel.js";
import Psewa from "../models/PsewaModel.js"

export const getKendaraan = async (req, res) => {
    Kendaraan.belongsTo(Psewa, { foreignKey: 'id_ps' });
    try {
        const response = await Kendaraan.findAll({
            include: [
                {
                    model: Psewa,
                    attributes: []
                },
            ],
            attributes: {
                include: [[Sequelize.col("nama_ps"), "nama_ps"]]
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message)
    }
}

export const getKendaraanById = async (req, res) => {
    try {
        const response = await Kendaraan.findOne({
            where: { id_kendaraan: req.params.id }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message)
    }
}

export const createKendaraan = async (req, res) => {
    let { nama_kendaraan, jenis, tipe, id_ps, ketersediaan } = req.body;
    let data = {}
    if (id_ps == "") {
        id_ps = null
        data = {
            nama_kendaraan,
            jenis,
            tipe,
            id_ps,
            ketersediaan
        }
    }else{
        data = {
            nama_kendaraan,
            jenis,
            tipe,
            id_ps,
            ketersediaan
        }
    }
    try {
        await Kendaraan.create(data);
        res.status(200).json({ status: "success" });
    } catch (error) {
        console.log(error.message)
    }
}

export const updateKendaraan = async (req, res) => {
    let { id_kendaraan, nama_kendaraan, jenis, tipe, id_ps, ketersediaan } = req.body;
    let data = {}
    if (id_ps == "") {
        id_ps = null
        data = {
            id_kendaraan,
            nama_kendaraan,
            jenis,
            tipe,
            id_ps,
            ketersediaan
        }
    }else{
        data = {
            id_kendaraan,
            nama_kendaraan,
            jenis,
            tipe,
            id_ps,
            ketersediaan
        }
    }
    try {
        await Kendaraan.update(data, {
            where: { id_kendaraan: req.params.id }
        });
        res.status(200).json({ status: "success" });
    } catch (error) {
        console.log(error.message)
    }
}

export const deleteKendaraan = async (req, res) => {
    try {
        await Kendaraan.destroy({
            where: { id_kendaraan: req.params.id }
        });
        res.status(200).json({ status: "success" });
    } catch (error) {
        console.log(error.message)
    }
}