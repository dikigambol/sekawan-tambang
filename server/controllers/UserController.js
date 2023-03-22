import User from "../models/UserModel.js";
import Tambang from "../models/TambangModel.js";
import bcrypt from "bcryptjs";
import { Sequelize } from "sequelize";

export const getUsers = async (req, res) => {
    User.belongsTo(Tambang, { foreignKey: 'id_lok_tbg' });
    try {
        const response = await User.findAll({
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

export const getUserById = async (req, res) => {
    try {
        const response = await User.findOne({
            where: { id_user: req.params.id }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message)
    }
}

export const createUser = async (req, res) => {
    let { role, id_lok_tbg, nama, username, password } = req.body;
    password = bcrypt.hashSync(password, 10);
    let newUser = new User({
        role,
        id_lok_tbg,
        nama,
        username,
        password
    });
    try {
        await newUser.save();
        res.status(200).json({ status: "success" });
    } catch (error) {
        console.log(error.message)
    }
}

export const updateUser = async (req, res) => {
    let { role, id_lok_tbg, nama, username, password } = req.body;
    let data = {}
    if (password != "") {
        password = bcrypt.hashSync(password, 10);
        data = {
            role,
            id_lok_tbg,
            nama,
            username,
            password
        }
    } else {
        data = {
            role,
            id_lok_tbg,
            nama,
            username
        }
    }
    try {
        await User.update(
        data,
        {
            where: { id_user: req.params.id }
        });
        res.status(200).json({ status: "success" });
    } catch (error) {
        console.log(error.message)
    }
}

export const deleteUser = async (req, res) => {
    try {
        await User.destroy({
            where: { id_user: req.params.id }
        });
        res.status(200).json({ status: "success" });
    } catch (error) {
        console.log(error.message)
    }
}