import { Sequelize } from "sequelize";
import db from '../config/db.js';

const { DataTypes } = Sequelize;

const Driver = db.define('drivers', {
    id_driver: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    id_lok_tbg: DataTypes.INTEGER,
    nama: DataTypes.STRING
}, {
    freezeTableName: true
})

export default Driver;

(async () => {
    await db.sync()
})();