"use strict";
const utils = require("../../util");
const ConnectionConfig = require("../../dbConfig");
const sql = require("mssql");
sql.connect(ConnectionConfig);

const getAll = async () => {
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const sqlQueries = await utils.loadSqlQueries("tblBaskan");
    const selectAll = await pool.request().query(sqlQueries.selectAll);
    return selectAll.recordset;
  } catch (error) {
    console.log(error.message);
  }
};

const getById = async (id) => {
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const sqlQueries = await utils.loadSqlQueries("tblBaskan");
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
      .input("birimId", sql.Int, createData.birimId)
      .input("personelId", sql.Int, createData.personelId)
      .input("adiSoyadi", sql.VarChar(75), createData.adiSoyadi)
      .query("EXEC addBaskanSP @personelId=@personelId, "
            +"@adiSoyadi=@adiSoyadi, @birimId=@birimId");
    return insertData.recordset;
  } catch (error) {
    return error.message;
  }
};

const updateById = async (updateData) => {
  console.log(updateData)
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const updateById = await pool
      .request()
      .input("id", sql.Int, updateData.id)
      .input("personelId", sql.Int, updateData.personelId)
      .input("adiSoyadi", sql.VarChar(75), updateData.adiSoyadi)
      .query("EXEC updateBaskanSP @personelId=@personelId, "
            +"@adiSoyadi=@adiSoyadi, @id=@id");
    return updateById.recordset;
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
      .query("EXEC deleteBaskanSP @id=@id");
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
