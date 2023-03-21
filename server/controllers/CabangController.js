import Cabang from "../models/CabangModel.js";

export const getCabang = async (req, res) => {
    try {
        const response = await Cabang.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message)
    }
}

export const getCabangById = async (req, res) => {
    try {
        const response = await Cabang.findOne({
            where: { id_cabang: req.params.id }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message)
    }
}

export const createCabang = async (req, res) => {
    let { nama_cabang } = req.body;
    let newCabang = new Cabang({
        nama_cabang
    });
    try {
        await newCabang.save();
        res.status(200).json({ status: "success" });
    } catch (error) {
        console.log(error.message)
    }
}

export const updateCabang = async (req, res) => {
    try {
        await Cabang.update(req.body, {
            where: { id_cabang: req.params.id }
        });
        res.status(200).json({ status: "success" });
    } catch (error) {
        console.log(error.message)
    }
}

export const deleteCabang = async (req, res) => {
    try {
        await Cabang.destroy({
            where: { id_cabang: req.params.id }
        });
        res.status(200).json({ status: "success" });
    } catch (error) {
        console.log(error.message)
    }
}