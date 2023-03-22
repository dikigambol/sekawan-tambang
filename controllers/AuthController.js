import User from "../models/UserModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import Driver from "../models/DriverModel.js";
import Tambang from "../models/TambangModel.js";
import Kendaraan from "../models/KendaraanModel.js";
import Reservasi from "../models/ReservasiModel.js";

export const signIn = async (req, res) => {
    let { username, password } = req.body;
    try {
        const response = await User.findOne({
            where: { username: username }
        });
        if (response) {
            const login = await bcrypt.compare(password, response.password);
            if (login) {
                const token = jwt.sign(
                    { id_user: response.id_user, role: response.role },
                    "gambol"
                );
                return res.json({
                    token: token,
                    user: jwt.verify(token, "gambol"),
                    username: username
                });
            } else {
                return res.json({ error: "Invalid username or password" });
            }
        } else {
            return res.json({ error: "Invalid username or password" });
        }
    } catch (error) {
        console.log(error.message)
    }
}

export const countDashboard = async (req, res) => {
    try {
        const resTambang = await Tambang.count();
        const resDriver = await Driver.count();
        const resKendaraan = await Kendaraan.count();
        const resReservasi = await Reservasi.count();
        let data = {
            ttambang: resTambang,
            tdriver: resDriver,
            tkendaraan: resKendaraan,
            treservasi: resReservasi
        }
        res.status(200).json(data);
    } catch (error) {
        console.log(error.message)
    }
}