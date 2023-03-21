import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";

export const getUsers = async (req, res) => {
    try {
        const response = await User.findAll();
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
    password = bcrypt.hashSync(password, 10);
    try {
        await User.update(
            {
                role,
                id_lok_tbg,
                nama,
                username,
                password
            },
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