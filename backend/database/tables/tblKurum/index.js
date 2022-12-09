"use strict";
const utils = require("../../util");
const ConnectionConfig = require("../../dbConfig");
const sql = require("mssql");
sql.connect(ConnectionConfig);

const getAll = async () => {
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const sqlQueries = await utils.loadSqlQueries("tblKurum");
    const selectAll = await pool.request().query(sqlQueries.selectAll);
    return selectAll.recordset;
  } catch (error) {
    console.log(error.message);
  }
};

const getById = async (id) => {
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const sqlQueries = await utils.loadSqlQueries("tblKurum");
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
//console.log("create:", createData)
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const insertData = await pool
      .request()
      .input("kurumAdi", sql.VarChar(150), updateData.kurumAdi)
      .input("adres", sql.VarChar(500), updateData.adres)
      .input("telefon", sql.VarChar(20), updateData.telefon)
      .input("infoMail", sql.VarChar(150), updateData.infoMail)
      .input("vergiDairesi", sql.VarChar(150), updateData.vergiDairesi)
      .input("vergiNo", sql.VarChar(40), updateData.vergiNo)
      .input("ilIlce", sql.VarChar(75), updateData.ilIlce)
      .query("EXEC updateKurumSP @kurumAdi=@kurumAdi, @adres=@adres, "
           + "@telefon=@telefon, @infoMail=@infoMail, @vergiDairesi=@vergiDairesi, "
           + "@vergiNo=@vergiNo, @ilIlce=@ilIlce");
    return insertData.recordset;
  } catch (error) {
    return error.message;
  }
};

const updateById = async (id, updateData) => {
//console.log("Update: ", id, updateData)
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const updateById = await pool
      .request()
      .input("id", sql.Int, id)
      .input("kurumAdi", sql.VarChar(150), updateData.kurumAdi)
      .input("adres", sql.VarChar(500), updateData.adres)
      .input("telefon", sql.VarChar(20), updateData.telefon)
      .input("infoMail", sql.VarChar(150), updateData.infoMail)
      .input("vergiDairesi", sql.VarChar(150), updateData.vergiDairesi)
      .input("vergiNo", sql.VarChar(40), updateData.vergiNo)
      .input("ilIlce", sql.VarChar(75), updateData.ilIlce)
      .query("EXEC updateKurumSP @id=@id, @kurumAdi=@kurumAdi, @adres=@adres, "
           + "@telefon=@telefon, @infoMail=@infoMail, @vergiDairesi=@vergiDairesi, "
           + "@vergiNo=@vergiNo, @ilIlce=@ilIlce");
    return updateById.recordset;
  } catch (error) {
    return error.message;
  }
};

const deleteById = async (id) => {
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const sqlQueries = await utils.loadSqlQueries("tblKurum");
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
  getAll,
  getById,
  createData,
  updateById,
  deleteById,
};
