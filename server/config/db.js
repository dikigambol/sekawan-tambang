import { Sequelize } from "sequelize";

const db = new Sequelize('db_tambang', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false
    },
    logging: console.log,
});

export default db;