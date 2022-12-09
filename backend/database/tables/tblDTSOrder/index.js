"use strict";
const utils = require("../../util");
const ConnectionConfig = require("../../dbConfig");
const sql = require("mssql");
var fs = require("fs");

sql.connect(ConnectionConfig);

const getById = async (id) => {
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const sqlQueries = await utils.loadSqlQueries("tblDTSOrder");
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
      .input("istekUrun", sql.VarChar(250), createData.istekUrun)
      .input("adet", sql.VarChar(20), createData.adet)
      .query("EXEC addDTSOrderSP @tarih=@tarih, @dtsId=@dtsId, "
           + "@istekUrun=@istekUrun, @adet=@adet");
    return insertData.recordset;
  } catch (error) {
    return error.message;
  }
};

const deleteById = async (id) => {
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const deleteById = await pool
      .request()
      .input("id", sql.Int, id)
      .query("EXEC [dbo].[delDTSOrderSP] @id=@id");
    return deleteById.recordset;
  } catch (error) {
    return error.message;
  }
};

const putPDFPath = async (id, data) => {
  //console.log({id, data})
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const insertData = await pool
      .request()
      .input("Id", sql.Int, id)
      .input("dosyaAdi", sql.NVarChar(250), data.dosyaAdi)
      .query("EXEC updateDTSOlurPDFSP @Id=@Id, @dosyaAdi=@dosyaAdi");
    return insertData.recordset;
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  getById,
  createData,
  deleteById,
  putPDFPath,
};
