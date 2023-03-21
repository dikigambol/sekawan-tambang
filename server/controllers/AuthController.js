import User from "../models/UserModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";

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
                const encode = jwt.verify(token, "gambol");
                return res.json({
                    token: token,
                    user: {
                        id_user: response.id_user,
                        role: response.role
                    },
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