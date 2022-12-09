"use strict";
const utils = require("../../util");
const ConnectionConfig = require("../../dbConfig");
const sql = require("mssql");
var fs = require("fs")

sql.connect(ConnectionConfig);

const getById = async (id) => {
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const sqlQueries = await utils.loadSqlQueries("tblDTSTekKaynak");
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

const addData = async (addData) => {
//console.log(addData)
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const insertData = await pool
      .request()
      .input("dtsId", sql.Int, addData.kodID)
      .input("tarih", sql.SmallDateTime, addData.tarih)
      .input("yaklasikBedel", sql.VarChar(20), addData.yaklasikBedel)
      .input("kaynakAdi", sql.NVarChar(250), addData.kaynakAdi)
      .input("adres", sql.NVarChar(250), addData.adres)
      .input("vergiDairesi", sql.NVarChar(100), addData.vergiDairesi)
      .input("vergiNumarasi", sql.NVarChar(20), addData.vergiNumarasi)
      .input("telefon", sql.NVarChar(20), addData.telefon)
      .input("email", sql.NVarChar(150), addData.email)
      .input("ilgiliKisi", sql.NVarChar(50), addData.ilgiliKisi)
      .input("nitelik", sql.NVarChar(1000), addData.nitelik)
      .input("kapsami", sql.NVarChar(500), addData.secimBilgi)
      .input("yapilmaSebebi", sql.NVarChar(500), addData.yapilmaSebebi)
      .input("insertUser", sql.Int, addData.uID)
      .query("EXEC addTekKaynakSP @dtsId=@dtsId, @tarih=@tarih, "
            +"@yaklasikBedel=@yaklasikBedel, @kaynakAdi=@kaynakAdi, @adres=@adres, "
            +"@vergiDairesi=@vergiDairesi, @vergiNumarasi=@vergiNumarasi, "
            +"@telefon=@telefon, @email=@email, @ilgiliKisi=@ilgiliKisi, "
            +"@nitelik=@nitelik, @kapsami=@kapsami, @yapilmaSebebi=@yapilmaSebebi, "
            +"@insertUser=@insertUser");
    return insertData.recordset;
  } catch (error) {
    return error.message;
  }
};

const deleteById = async (id) => {
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const sqlQueries = await utils.loadSqlQueries("tblDTSTekKaynak");
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
  addData,
  deleteById,
};
