import {Sequelize} from "sequelize"
import mysql2 from "mysql2";

const database = process.env.DATABASE_MYSQL;
const username= process.env.USER_MYSQL;
const password= process.env.PASS_MYSQL;
const host = process.env.HOST_MYSQL;

const sequelize = new Sequelize(database, username, password, {
    host: host,
    dialect : 'mysql',
    dialectModule: mysql2,
});

export default sequelize;

