'use strict';

const utils = require('../util');
const config = require('../dbConfig');
const sql = require('mssql');

const getServer = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('server');
        const connection = await pool.request()
                                .query(sqlQueries.connection);
        return connection.recordset;
    } catch (error) {
        console.log("hata:", error.message);
    }
   
}

module.exports = {
    getServer
}