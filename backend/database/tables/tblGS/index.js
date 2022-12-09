"use strict";
const utils = require("../../util");
const ConnectionConfig = require("../../dbConfig");
const sql = require("mssql");
sql.connect(ConnectionConfig);

const getAll = async () => {
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const sqlQueries = await utils.loadSqlQueries("tblGS");
    const selectAll = await pool.request().query(sqlQueries.selectAll);
    return selectAll.recordset;
  } catch (error) {
    console.log(error.message);
  }
};

const getById = async (id) => {
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const sqlQueries = await utils.loadSqlQueries("tblGS");
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
      .query("EXEC updateGSPictureSP @personelId=@personelId");
    return insertData.recordset;
  } catch (error) {
    return error.message;
  }
};

const createData = async (createData) => {
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const insertData = await pool
      .request()
      .input("personelId", sql.Int, createData.personelId)
      .input("genelSekreter", sql.VarChar(20), createData.genelSekreter)
      .input("sicilNo", sql.VarChar(20), createData.sicilNo)
      .input("ebysSayi", sql.VarChar(20), createData.ebysSayi)
      .query("EXEC addGSSP @personelId=@personelId, @genelSekreter=@genelSekreter, "
            + "@sicilNo=@sicilNo, @ebysSayi=@ebysSayi");
    return insertData.recordset;
  } catch (error) {
    return error.message;
  }
};

const updateById = async (updateData) => {
 // console.log("Backend: ", updateData)
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const updateById = await pool
      .request()
      .input("id", sql.Int, updateData.id)
      .input("personelId", sql.Int, updateData.personelId)
      .input("genelSekreter", sql.VarChar(20), updateData.genelSekreter)
      .input("sicilNo", sql.VarChar(20), updateData.sicilNo)
      .input("ebysSayi", sql.VarChar(20), updateData.ebysSayi)
      .query("EXEC updateGSSP @personelId=@personelId, @genelSekreter=@genelSekreter, "
            + "@sicilNo=@sicilNo, @ebysSayi=@ebysSayi, @id=@id");
    return updateById.recordset;
  } catch (error) {
    return error.message;
  }
};

const deleteById = async (id) => {
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const sqlQueries = await utils.loadSqlQueries("tblGS");
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
