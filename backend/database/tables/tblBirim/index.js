"use strict";
const utils = require("../../util");
const ConnectionConfig = require("../../dbConfig");
const sql = require("mssql");
sql.connect(ConnectionConfig);

const getAll = async () => {
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const sqlQueries = await utils.loadSqlQueries("tblBirim");
    const selectAll = await pool.request().query(sqlQueries.selectAll);
    return selectAll.recordset;
  } catch (error) {
    console.log(error.message);
  }
};

const getById = async (id) => {
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const sqlQueries = await utils.loadSqlQueries("tblBirim");
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
      .input("birimAdi", sql.VarChar(150), createData.birimAdi)
      .query("EXEC addBirimSP @birimAdi=@birimAdi");
    return insertData.recordset;
  } catch (error) {
    return error.message;
  }
};

const updateById = async (id, updateData) => {
  //console.log(updateData)
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const updateById = await pool
      .request()
      .input("id", sql.Int, id)
      .input("birimAdi", sql.VarChar(150), updateData.birimAdi)
      .query("EXEC updateBirimSP @birimAdi=@birimAdi, @id=@id");
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
      .query("EXEC deleteBirimSP @id=@id");
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
