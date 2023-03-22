import { Sequelize } from "sequelize";
import db from '../config/db.js';

const { DataTypes } = Sequelize;

const Cabang = db.define('cabang', {
    id_cabang: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    nama_cabang: DataTypes.STRING
}, {
    freezeTableName: true
})

export default Cabang;

(async () => {
    await db.sync()
})();