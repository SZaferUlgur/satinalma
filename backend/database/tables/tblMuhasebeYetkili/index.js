"use strict";
const utils = require("../../util");
const ConnectionConfig = require("../../dbConfig");
const sql = require("mssql");
sql.connect(ConnectionConfig);

const getAll = async () => {
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const sqlQueries = await utils.loadSqlQueries("tblMuhasebeYetkili");
    const selectAll = await pool.request().query(sqlQueries.selectAll);
    return selectAll.recordset;
  } catch (error) {
    console.log(error.message);
  }
};

const getById = async (id) => {
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const sqlQueries = await utils.loadSqlQueries("tblMuhasebeYetkili");
    const selectById = await pool
      .request()
      .input("id", sql.Int, id)
      .query(sqlQueries.selectById);
    return selectById.recordset;
  } catch (error) {
    return error.message;
  }
};

const putPicture = async (id) => {
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const insertData = await pool
      .request()
      .input("personelId", sql.Int, id)
      .query("EXEC updateMYPictureSP @personelId=@personelId");
    return insertData.recordset;
  } catch (error) {
    return error.message;
  }
};

const createData = async (createData) => {
  //console.log({createData})
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const insertData = await pool
      .request()
      .input("personelId", sql.Int, createData.personelId)
      .input("adiSoyadi", sql.VarChar(75), createData.adiSoyadi)
      .input("sicilNo", sql.VarChar(10), createData.sicilNo)
      .input("ebysSayi", sql.VarChar(75), createData.ebysSayi)
      .query("EXEC addMYSP @personelId=@personelId, @adiSoyadi=@adiSoyadi, "
            +"@sicilNo=@sicilNo, @ebysSayi=@ebysSayi");
    return insertData.recordset;
  } catch (error) {
    return error.message;
  }
};

const updateById = async (updateData) => {
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const updateById = await pool
      .request()
      .input("id", sql.Int, updateData.id)
      .input("personelId", sql.Int, updateData.personelId)
      .input("adiSoyadi", sql.VarChar(75), updateData.adiSoyadi)
      .input("sicilNo", sql.VarChar(10), updateData.sicilNo)
      .input("ebysSayi", sql.VarChar(75), updateData.ebysSayi)
      .query("EXEC updateMYSP @personelId=@personelId, @adiSoyadi=@adiSoyadi, "
            +"@sicilNo=@sicilNo, @ebysSayi=@ebysSayi, @id=@id");
    return updateById.recordset;
  } catch (error) {
    return error.message;
  }
};

const deleteById = async (id) => {
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const sqlQueries = await utils.loadSqlQueries("tblMuhasebeYetkili");
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
  putPicture,
};
