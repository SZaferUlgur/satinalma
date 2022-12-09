"use strict";
const utils = require("../../util");
const ConnectionConfig = require("../../dbConfig");
const sql = require("mssql");
var fs = require("fs");

sql.connect(ConnectionConfig);

const getById = async (id) => {
  //console.log(id)
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const sqlQueries = await utils.loadSqlQueries("tblDTSKomisyon");
    const selectById = await pool
      .request()
      .input("id", sql.Int, id)
      .query(sqlQueries.selectById);
    return selectById.recordset;
  } catch (error) {
    return error.message;
  }
};

//getUserFiltre

const createData = async (createData) => {
  //console.log(createData)
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const insertData = await pool
      .request()
      .input("tarih", sql.SmallDateTime, createData.tarih)
      .input("dtsId", sql.Int, createData.dtsId)
      .input("pfaBaskan", sql.NVarChar(50), createData.pfaBaskan)
      .input("pfaUyeBir", sql.NVarChar(50), createData.pfaUyeBir)
      .input("pfaUyeIki", sql.NVarChar(50), createData.pfaUyeIki)
      .input("mkBaskan", sql.NVarChar(50), createData.mkBaskan)
      .input("mkUyeBir", sql.NVarChar(50), createData.mkUyeBir)
      .input("mkUyeIki", sql.NVarChar(50), createData.mkUyeIki)
      .query(
        "EXEC addDTSKomisyonSP @tarih=@tarih, @dtsId=@dtsId, @pfaBaskan=@pfaBaskan, @pfaUyeBir=@pfaUyeBir, @pfaUyeIki=@pfaUyeIki, @mkBaskan=@mkBaskan, @mkUyeBir=@mkUyeBir, @mkUyeIki=@mkUyeIki"
      );
    return insertData.recordset;
  } catch (error) {
    return error.message;
  }
};

const updateById = async (updateData) => {
//console.log(updateData)
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const insertData = await pool
      .request()
      .input("tarih", sql.SmallDateTime, updateData.tarih)
      .input("dtsId", sql.Int, updateData.dtsId)
      .input("pfaBaskan", sql.NVarChar(50), updateData.pfaBaskan)
      .input("pfaUyeBir", sql.NVarChar(50), updateData.pfaUyeBir)
      .input("pfaUyeIki", sql.NVarChar(50), updateData.pfaUyeIki)
      .input("mkBaskan", sql.NVarChar(50), updateData.mkBaskan)
      .input("mkUyeBir", sql.NVarChar(50), updateData.mkUyeBir)
      .input("mkUyeIki", sql.NVarChar(50), updateData.mkUyeIki)
      .query(
        "EXEC updateDTSKomisyonSP @tarih=@tarih, @dtsId=@dtsId, @pfaBaskan=@pfaBaskan, @pfaUyeBir=@pfaUyeBir, @pfaUyeIki=@pfaUyeIki, @mkBaskan=@mkBaskan, @mkUyeBir=@mkUyeBir, @mkUyeIki=@mkUyeIki"
      );
    return insertData.recordset;
  } catch (error) {
    return error.message;
  }
};

const deleteById = async (id) => {
  //console.log(id)
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const sqlQueries = await utils.loadSqlQueries("tblDTSKomisyon");
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
  updateById,
};
