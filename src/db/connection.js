const mysql = require('mysql');
const dbConfig = require('../config/db');
const { isTableAvailable } = require('./tables');

const pool;

function returnDB() {
    if (!pool) {
        pool = mysql.createPool(dbConfig);
    }

    pool.getItems = async function (tableName) {

        if (isTableAvailable(tableName)) {
            return this.query(`SELECT * FROM ${tableName} WHERE valid = 1`)
        }
    }

    return pool;
}

module.exports = returnDB();
