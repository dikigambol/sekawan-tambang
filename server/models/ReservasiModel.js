import { Sequelize } from "sequelize";
import db from '../config/db.js';

const { DataTypes } = Sequelize;

const Reservasi = db.define('reservasi_kendaraan', {
    id_rsv: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    id_kendaraan: DataTypes.INTEGER,
    id_driver: DataTypes.INTEGER,
    keperluan: DataTypes.TEXT,
    tanggal_pinjam: DataTypes.DATEONLY,
    tanggal_kembali: DataTypes.DATEONLY,
    acc1: DataTypes.INTEGER,
    acc2: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
}, {
    freezeTableName: true
})

export default Reservasi;

(async () => {
    await db.sync()
})();