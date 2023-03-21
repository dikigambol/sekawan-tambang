import { Sequelize } from "sequelize";
import db from '../config/db.js';

const { DataTypes } = Sequelize;

const BBM = db.define('his_bbm', {
    id_bbm: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    id_kendaraan: DataTypes.INTEGER,
    tanggal: DataTypes.DATEONLY,
    nominal: DataTypes.INTEGER
}, {
    freezeTableName: true
})

export default BBM;

(async () => {
    await db.sync()
})();