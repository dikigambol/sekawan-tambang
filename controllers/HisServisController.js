import Servis from "../models/HisServisModel.js";

export const getServis = async (req, res) => {
    try {
        const response = await Servis.findAll({
            where: { id_kendaraan: req.params.id }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message)
    }
}

export const createServis = async (req, res) => {
    try {
        await Servis.create(req.body);
        res.status(200).json({ status: "success" });
    } catch (error) {
        console.log(error.message)
    }
}

export const updateServis = async (req, res) => {
    try {
        await Servis.update(req.body, {
            where: { id_service: req.params.id }
        });
        res.status(200).json({ status: "success" });
    } catch (error) {
        console.log(error.message)
    }
}

export const deleteServis = async (req, res) => {
    try {
        await Servis.destroy({
            where: { id_service: req.params.id }
        });
        res.status(200).json({ status: "success" });
    } catch (error) {
        console.log(error.message)
    }
}