import { Sequelize } from "sequelize";
import Driver from "../models/DriverModel.js";
import Tambang from "../models/TambangModel.js";

export const getDriver = async (req, res) => {
    Driver.belongsTo(Tambang, { foreignKey: 'id_lok_tbg' });
    try {
        const response = await Driver.findAll({
            include: [
                {
                    model: Tambang,
                    attributes: []
                },
            ],
            attributes: {
                include: [[Sequelize.col("nama_lok_tbg"), "nama_lok_tbg"]]
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message)
    }
}

export const getDriverById = async (req, res) => {
    try {
        const response = await Driver.findOne({
            where: { id_driver: req.params.id }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message)
    }
}

export const createDriver = async (req, res) => {
    try {
        await Driver.create(req.body);
        res.status(200).json({ status: "success" });
    } catch (error) {
        console.log(error.message)
    }
}

export const updateDriver = async (req, res) => {
    try {
        await Driver.update(req.body, {
            where: { id_driver: req.params.id }
        });
        res.status(200).json({ status: "success" });
    } catch (error) {
        console.log(error.message)
    }
}

export const deleteDriver = async (req, res) => {
    try {
        await Driver.destroy({
            where: { id_driver: req.params.id }
        });
        res.status(200).json({ status: "success" });
    } catch (error) {
        console.log(error.message)
    }
}