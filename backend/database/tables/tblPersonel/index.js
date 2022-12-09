"use strict";
const utils = require("../../util");
const ConnectionConfig = require("../../dbConfig");
const sql = require("mssql");
sql.connect(ConnectionConfig);

const getAll = async () => {
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const sqlQueries = await utils.loadSqlQueries("tblPersonel");
    const selectAll = await pool.request().query(sqlQueries.selectAll);
    return selectAll.recordset;
  } catch (error) {
    console.log(error.message);
  }
};

const getUzman = async () => {
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const sqlQueries = await utils.loadSqlQueries("tblPersonel");
    const getUzman = await pool.request().query(sqlQueries.getUzman);
    return getUzman.recordset;
  } catch (error) {
    console.log(error.message);
  }
};


const getById = async (id) => {
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const sqlQueries = await utils.loadSqlQueries("tblPersonel");
    const selectById = await pool
      .request()
      .input("id", sql.Int, id)
      .query(sqlQueries.selectById);
    return selectById.recordset;
  } catch (error) {
    return error.message;
  }
};

const getUser = async (data) => {
//console.log(data)
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const sqlQueries = await utils.loadSqlQueries("tblPersonel");
    const selectByName = await pool
      .request()
      .input("adiSoyadi", sql.NVarChar(75), data.uName)
      .query(sqlQueries.selectByName);
    return selectByName.recordset;
  } catch (error) {
    return error.message;
  }
};

const createData = async (createData) => {
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const insertData = await pool
      .request()
      .input("adiSoyadi", sql.VarChar(75), updateData.adiSoyadi)
      .input("email", sql.VarChar(150), updateData.email)
      .input("tcKimlik", sql.VarChar(11), updateData.tcKimlik)
      .input("sicilNo", sql.VarChar(10), updateData.sicilNo)
      .input("cepTel", sql.VarChar(20), updateData.cepTel)
      .input("iseGiris", sql.SmallDateTime, updateData.iseGirisTarihi)
      .input("dogumGunu", sql.SmallDateTime, updateData.dogumTarihi)
      .input("kanGrubu", sql.VarChar(10), updateData.kanGrubu)
      .input("unvan", sql.VarChar(25), updateData.unvan)
      .input("birim", sql.VarChar(150), updateData.birim)
      .input("username", sql.VarChar(25), updateData.username)
      .input("isMod", sql.VarChar(1), updateData.isMod)
      .query("EXEC addPersonelSP @adiSoyadi=@adiSoyadi, @username=@username"
            +"@email=@email, @tcKimlik=@tcKimlik, @sicilNo=@sicilNo, "
            +"@cepTel=@cepTel, @iseGiris=@iseGiris, @dogumGunu=@dogumGunu, "
            +"@kanGrubu=@kanGrubu, @unvan=@unvan, @birim=@birim, "
            +"@isMod=@isMod");
    return insertData.recordset;
  } catch (error) {
    return error.message;
  }
};

const updateById = async (updateData) => {
//console.log(updateData)
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const updateById = await pool
      .request()
      .input("id", sql.Int, updateData.id)
      .input("adiSoyadi", sql.VarChar(75), updateData.adiSoyadi)
      .input("email", sql.VarChar(150), updateData.email)
      .input("tcKimlik", sql.VarChar(11), updateData.tcKimlik)
      .input("sicilNo", sql.VarChar(10), updateData.sicilNo)
      .input("cepTel", sql.VarChar(20), updateData.cepTel)
      .input("iseGiris", sql.SmallDateTime, updateData.iseGiris)
      .input("dogumGunu", sql.SmallDateTime, updateData.dogumGunu)
      .input("kanGrubu", sql.VarChar(10), updateData.kanGrubu)
      .input("unvan", sql.VarChar(25), updateData.unvan)
      .input("birim", sql.VarChar(150), updateData.birim)
      .input("isMod", sql.VarChar(1), updateData.isMod)
      .query("EXEC updatePersonelSP @id=@id, @adiSoyadi=@adiSoyadi, "
            +"@email=@email, @tcKimlik=@tcKimlik, @sicilNo=@sicilNo, "
            +"@cepTel=@cepTel, @iseGiris=@iseGiris, @dogumGunu=@dogumGunu, "
            +"@kanGrubu=@kanGrubu, @unvan=@unvan, @birim=@birim, "
            +"@isMod=@isMod");
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
      .query("EXEC deletePersonelSP @id=@id");
    return deleteById.recordset;
  } catch (error) {
    return error.message;
  }
};

const putPicture = async (id) => {
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const insertData = await pool
      .request()
      .input("id", sql.Int, id)
      .query("EXEC updatePerPictureSP @id=@id");
    return insertData.recordset;
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
  getUser,
  putPicture,
  getUzman,
};
