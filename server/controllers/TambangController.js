import Tambang from "../models/TambangModel.js";

export const getTambang = async (req, res) => {
    try {
        const response = await Tambang.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message)
    }
}

export const getTambangById = async (req, res) => {
    try {
        const response = await Tambang.findOne({
            where: { id_lok_tbg: req.params.id }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message)
    }
}

export const createTambang = async (req, res) => {
    try {
        await Tambang.create(req.body);
        res.status(200).json({ status: "success" });
    } catch (error) {
        console.log(error.message)
    }
}

export const updateTambang = async (req, res) => {
    try {
        await Tambang.update(req.body, {
            where: { id_lok_tbg: req.params.id }
        });
        res.status(200).json({ status: "success" });
    } catch (error) {
        console.log(error.message)
    }
}

export const deleteTambang = async (req, res) => {
    try {
        await Tambang.destroy({
            where: { id_lok_tbg: req.params.id }
        });
        res.status(200).json({ status: "success" });
    } catch (error) {
        console.log(error.message)
    }
}