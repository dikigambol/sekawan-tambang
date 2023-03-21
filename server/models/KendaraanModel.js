import { Sequelize } from "sequelize";
import db from '../config/db.js';

const { DataTypes } = Sequelize;

const Kendaraan = db.define('kendaraan', {
    id_kendaraan: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    nama_kendaraan: DataTypes.STRING,
    jenis: DataTypes.STRING,
    id_ps: DataTypes.INTEGER
}, {
    freezeTableName: true
})

export default Kendaraan;

(async () => {
    await db.sync()
})();