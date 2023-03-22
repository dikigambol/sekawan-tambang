import { Op, Sequelize } from "sequelize";
import Pemakaian from "../models/HisPemakaianModel.js";

export const getPemakaian = async (req, res) => {
    let currentDate = new Date();
    let bulan = currentDate.getMonth() + 1;
    let tahun = currentDate.getFullYear();
    try {
        const response = await Pemakaian.findAll({
            attributes: ['tanggal', [Sequelize.fn('COUNT', Sequelize.col('tanggal')), 'total_pemakaian']],
            where: {
                id_kendaraan: req.params.id,
                [Op.and]: [
                    Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('tanggal')), bulan),
                    Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('tanggal')), tahun),
                ]
            },
            group: ['tanggal']
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