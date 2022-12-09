"use strict";
const utils = require("../../util");
const ConnectionConfig = require("../../dbConfig");
const sql = require("mssql");
sql.connect(ConnectionConfig);

const getById = async (id) => {
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const sqlQueries = await utils.loadSqlQueries("tblFatura");
    const selectById = await pool
      .request()
      .input("id", sql.Int, id)
      .query(sqlQueries.selectById);
    return selectById.recordset;
  } catch (error) {
    return error.message;
  }
};

const createData = async (createData) => {
//console.log(createData)
      try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const insertData = await pool
      .request()
      .input("dtsId", sql.Int, createData.dtsId)
      .input("faturaTarih", sql.SmallDateTime, createData.faturaTarih)
      .input("faturaNo", sql.NVarChar(50), createData.faturaNo)
      .input("faturaTutar", sql.VarChar(20), createData.faturaTutar)
      .input("firmaAdi", sql.NVarChar(200), createData.firmaAdi)
      .input("firmaAdres", sql.NVarChar(200), createData.firmaAdres)
      .input("firmaBanka", sql.NVarChar(150), createData.firmaBanka)
      .input("firmaIban", sql.NVarChar(40), createData.firmaIban)
      .query("EXEC addFaturaSP @dtsId=@dtsId, @faturaTarih=@faturaTarih, "
            +"@faturaNo=@faturaNo, @faturaTutar=@faturaTutar, @firmaAdi=@firmaAdi, "
            +"@firmaAdres=@firmaAdres, @firmaBanka=@firmaBanka, @firmaIban=@firmaIban");
    return insertData.recordset;
  } catch (error) {
    return error.message;
  }
};
 
const deleteById = async (id) => {
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const sqlQueries = await utils.loadSqlQueries("tblFatura");
    const deleteById = await pool
      .request()
      .input("id", sql.Int, id)
      .query(sqlQueries.deleteById);
    return deleteById.recordset;
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  getById,
  createData,
  deleteById,
};
