"use strict";
const utils = require("../../util");
const ConnectionConfig = require("../../dbConfig");
const sql = require("mssql");
sql.connect(ConnectionConfig);

const sorDTSYetki = async (data) => {
//console.log(data);
    try {
      let pool = await sql.connect(ConnectionConfig.sql);
      const insertData = await pool
        .request()
        .input("dtsId", sql.Int, data.dtsId)
        .input("perName", sql.NVarChar(75), data.perName)
        .query("EXEC sorDTSSP @dtsId=@dtsId, @perName=@perName");
      return insertData.recordset;
    } catch (error) {
      return error.message;
    }
  };

  const setKomisyonUyelik = async (data) => {
 //   console.log(data);
        try {
          let pool = await sql.connect(ConnectionConfig.sql);
          const insertData = await pool
            .request()
            .input("dtsId", sql.Int, data.id)
            .input("perName", sql.NVarChar(75), data.perName)
            .query("EXEC komisyonUyelikDTSSP @dtsId=@dtsId, @perName=@perName");
          return insertData.recordset;
        } catch (error) {
          return error.message;
        }
      };

module.exports = {
  sorDTSYetki,
  setKomisyonUyelik,
};
