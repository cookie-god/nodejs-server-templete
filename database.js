const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'kooki7869^^',
    database: 'testdb'
});

module.exports = {
    pool: pool
};