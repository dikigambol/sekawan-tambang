import { Sequelize } from "sequelize";
import db from '../config/db.js';

const { DataTypes } = Sequelize;

const PSewa = db.define('perusahaan_sewa', {
    id_ps: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    nama_ps: DataTypes.STRING
}, {
    freezeTableName: true
})

export default PSewa;

(async () => {
    await db.sync()
})();