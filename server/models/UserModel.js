import { Sequelize } from "sequelize";
import db from '../config/db.js';

const { DataTypes } = Sequelize;

const User = db.define('users', {
    id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    role: DataTypes.INTEGER,
    id_lok_tbg: DataTypes.INTEGER,
    nama: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
}, {
    freezeTableName: true
})

export default User;

(async () => {
    await db.sync()
})();