import { Sequelize } from "sequelize";
import db from '../config/db.js';

const { DataTypes } = Sequelize;

const Pemakaian = db.define('his_pemakaian', {
    id_pemakaian: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    id_kendaraan: DataTypes.INTEGER,
    id_driver: DataTypes.INTEGER,
    tanggal: DataTypes.DATEONLY
}, {
    freezeTableName: true
})

export default Pemakaian;

(async () => {
    await db.sync()
})();