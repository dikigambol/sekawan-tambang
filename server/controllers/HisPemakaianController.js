import Pemakaian from "../models/HisPemakaianModel.js";

export const getPemakaian = async (req, res) => {
    try {
        const response = await BBM.findAll({
            where: { id_kendaraan: req.params.id }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message)
    }
}

export const createPemakaian = async (req, res) => {
    try {
        await Pemakaian.create(req.body);
        res.status(200).json({ status: "success" });
    } catch (error) {
        console.log(error.message)
    }
}

export const updatePemakaian = async (req, res) => {
    try {
        await Pemakaian.update(req.body, {
            where: { id_pemakaian: req.params.id }
        });
        res.status(200).json({ status: "success" });
    } catch (error) {
        console.log(error.message)
    }
}

export const deletePemakaian = async (req, res) => {
    try {
        await Pemakaian.destroy({
            where: { id_pemakaian: req.params.id }
        });
        res.status(200).json({ status: "success" });
    } catch (error) {
        console.log(error.message)
    }
}