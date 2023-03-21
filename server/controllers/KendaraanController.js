import Kendaraan from "../models/KendaraanModel.js";

export const getKendaraan = async (req, res) => {
    try {
        const response = await Kendaraan.findAll();
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
    try {
        await Kendaraan.create(req.body);
        res.status(200).json({ status: "success" });
    } catch (error) {
        console.log(error.message)
    }
}

export const updateKendaraan = async (req, res) => {
    try {
        await Kendaraan.update(req.body, {
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