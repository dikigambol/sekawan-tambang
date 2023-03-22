import { Sequelize } from "sequelize";
import db from '../config/db.js';

const { DataTypes } = Sequelize;

const Servis = db.define('his_service', {
    id_service: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    id_kendaraan: DataTypes.INTEGER,
    tanggal: DataTypes.DATEONLY,
    keterangan: DataTypes.TEXT
}, {
    freezeTableName: true
})

export default Servis;

(async () => {
    await db.sync()
})();