import { Sequelize } from "sequelize";
import db from '../config/db.js';

const { DataTypes } = Sequelize;

const Tambang = db.define('lokasi_tambang', {
    id_lok_tbg: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    id_cabang: DataTypes.INTEGER,
    nama_lok_tbg: DataTypes.STRING
}, {
    freezeTableName: true
})

export default Tambang;

(async () => {
    await db.sync()
})();