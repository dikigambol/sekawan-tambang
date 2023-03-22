import { Sequelize } from "sequelize";

const db = new Sequelize('db_tambang', 'root', '', {
    host: 'localhost',
// jika mau pakai db online, tapi sering mati-mati xixixi, soalnya gratis :P
// const db = new Sequelize('sql12607679', 'sql12607679', 'K5ye74mY6f', {
//     host: 'sql12.freesqldatabase.com',
    dialect: 'mysql',
    define: {
        timestamps: false
    },
    logging: console.log
});

export default db;