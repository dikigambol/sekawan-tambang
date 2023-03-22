import { Sequelize } from "sequelize";

const db = new Sequelize('sql12607679', 'sql12607679', 'K5ye74mY6f', {
    host: 'sql12.freesqldatabase.com',
    dialect: 'mysql',
    define: {
        timestamps: false
    },
    logging: console.log,
});

export default db;