"use strict";
const utils = require("../../util");
const ConnectionConfig = require("../../dbConfig");
const sql = require("mssql");
sql.connect(ConnectionConfig);

const getAll = async () => {
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const sqlQueries = await utils.loadSqlQueries("tblIstekli");
    const selectAll = await pool.request().query(sqlQueries.selectAll);
    return selectAll.recordset;
  } catch (error) {
    console.log(error.message);
  }
};

const getById = async (id) => {
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const sqlQueries = await utils.loadSqlQueries("tblIstekli");
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
      .input("adiSoyadi", sql.NVarChar(150), createData.adiSoyadi)
      .input("firmaAdi", sql.NVarChar(150), createData.firmaAdi)
      .input("tcKimlikNo", sql.NVarChar(11), createData.tcKimlikNo)
      .input("vergiNo", sql.NVarChar(25), createData.vergiNo)
      .input("vergiDairesi", sql.NVarChar(150), createData.vergiDairesi)
      .input("ibanNo", sql.NVarChar(40), createData.ibanNo)
      .input("sektorAdi", sql.NVarChar(150), createData.sektorAdi)
      .input("bankaAdi", sql.NVarChar(150), createData.bankaAdi)
      .input("adres", sql.NVarChar(150), createData.adres)
      .input("lokasyonAdi", sql.NVarChar(150), createData.lokasyonAdi)
      .input("telefon", sql.NVarChar(20), createData.telefon)
      .input("email", sql.NVarChar(150), createData.email)
      .query("EXEC addFirmaSP @adiSoyadi=@adiSoyadi, @firmaAdi=@firmaAdi, "
            +"@tcKimlikNo=@tcKimlikNo, @vergiNo=@vergiNo, @vergiDairesi=@vergiDairesi, "
            +"@ibanNo=@ibanNo, @sektorAdi=@sektorAdi, @bankaAdi=@bankaAdi, @adres=@adres, "
            +"@lokasyonAdi=@lokasyonAdi, @telefon=@telefon, @email=@email");
  return insertData.recordset;
  } catch (error) {
    return error.message;
  }
};

const updateById = async (data) => {
//console.log(data)
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const updateById = await pool
      .request()
      .input("id", sql.Int, data.id)
      .input("adiSoyadi", sql.NVarChar(150), data.adiSoyadi)
      .input("firmaAdi", sql.NVarChar(150), data.firmaAdi)
      .input("tcKimlikNo", sql.NVarChar(11), data.tcKimlikNo)
      .input("vergiNo", sql.NVarChar(25), data.vergiNo)
      .input("vergiDairesi", sql.NVarChar(150), data.vergiDairesi)
      .input("ibanNo", sql.NVarChar(40), data.ibanNo)
      .input("sektorAdi", sql.NVarChar(150), data.sektorAdi)
      .input("bankaAdi", sql.NVarChar(150), data.bankaAdi)
      .input("adres", sql.NVarChar(150), data.adres)
      .input("lokasyonAdi", sql.NVarChar(150), data.lokasyonAdi)
      .input("telefon", sql.NVarChar(20), data.telefon)
      .input("email", sql.NVarChar(150), data.email)
      .query("EXEC updateFirmaSP @adiSoyadi=@adiSoyadi, @firmaAdi=@firmaAdi, "
            +"@tcKimlikNo=@tcKimlikNo, @vergiNo=@vergiNo, @vergiDairesi=@vergiDairesi, "
            +"@ibanNo=@ibanNo, @sektorAdi=@sektorAdi, @bankaAdi=@bankaAdi, @adres=@adres, "
            +"@lokasyonAdi=@lokasyonAdi, @id=@id, @telefon=@telefon, @email=@email");
    return updateById.recordset;
  } catch (error) {
    return error.message;
  }
};

const deleteById = async (id) => {
  //console.log("Backend: ", id)
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const deleteById = await pool
      .request()
      .input("id", sql.Int, id)
      .query("EXEC [dbo].[deleteFirmaSP] @id=@id");
    return deleteById.recordset;
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  getAll,
  getById,
  createData,
  updateById,
  deleteById,
};
