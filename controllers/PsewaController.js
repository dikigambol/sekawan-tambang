import PSewa from "../models/PsewaModel.js";

export const getPSewa = async (req, res) => {
    try {
        const response = await PSewa.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message)
    }
}

export const getPSewaById = async (req, res) => {
    try {
        const response = await PSewa.findOne({
            where: { id_ps: req.params.id }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message)
    }
}

export const createPSewa = async (req, res) => {
    try {
        await PSewa.create(req.body);
        res.status(200).json({ status: "success" });
    } catch (error) {
        console.log(error.message)
    }
}

export const updatePSewa = async (req, res) => {
    try {
        await PSewa.update(req.body, {
            where: { id_ps: req.params.id }
        });
        res.status(200).json({ status: "success" });
    } catch (error) {
        console.log(error.message)
    }
}

export const deletePSewa = async (req, res) => {
    try {
        await PSewa.destroy({
            where: { id_ps: req.params.id }
        });
        res.status(200).json({ status: "success" });
    } catch (error) {
        console.log(error.message)
    }
}