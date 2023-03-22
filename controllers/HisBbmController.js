import BBM from "../models/HisBbmModel.js";

export const getBBM = async (req, res) => {
    try {
        const response = await BBM.findAll({
            where: { id_kendaraan: req.params.id }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message)
    }
}

export const createBBM = async (req, res) => {
    try {
        await BBM.create(req.body);
        res.status(200).json({ status: "success" });
    } catch (error) {
        console.log(error.message)
    }
}

export const updateBBM = async (req, res) => {
    try {
        await BBM.update(req.body, {
            where: { id_bbm: req.params.id }
        });
        res.status(200).json({ status: "success" });
    } catch (error) {
        console.log(error.message)
    }
}

export const deleteBBM = async (req, res) => {
    try {
        await BBM.destroy({
            where: { id_bbm: req.params.id }
        });
        res.status(200).json({ status: "success" });
    } catch (error) {
        console.log(error.message)
    }
}