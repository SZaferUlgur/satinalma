"use strict";
const utils = require("../../util");
const ConnectionConfig = require("../../dbConfig");
const sql = require("mssql");
sql.connect(ConnectionConfig);

const getById = async (id) => {
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const sqlQueries = await utils.loadSqlQueries("tblTalep");
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
  //console.log("Backend: ", createData);
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const insertData = await pool
      .request()
      .input("dtsId", sql.Int, createData.kodID)
      .input("siraNo", sql.Int, createData.siraNo)
      .input("isinAdi", sql.NVarChar(150), createData.isinAdi)
      .input("gerekce", sql.NVarChar(150), createData.gerekce)
      .input("yaklasikMaliyet", sql.VarChar(20), createData.yakMaliyet)
      .input("vergiler", sql.VarChar(20), createData.vergis)
      .input("butceTertibi", sql.NVarChar(250), createData.butceTertibi)
      .input("serbestMiktar", sql.VarChar(20), createData.serMiktar)
      .input("sure", sql.NVarChar(50), createData.suresi)
      .input("aciklama", sql.NVarChar(1000), createData.aciklama)
      .input("birimBaskani", sql.NVarChar(75), createData.birimBaskani)
      .input("bbUnvani", sql.NVarChar(50), createData.bbUnvani)
      .input("tarih", sql.SmallDateTime, createData.tarih)
      .input("muhasebeYetkilisi",sql.NVarChar(75),createData.muhasebeYetkilisi)
      .input("uygunTarih", sql.SmallDateTime, createData.tarih)
      .input("eklerId", sql.Int, createData.eklerId)
      .query("EXEC addDTSTalepSP @dtsId=@dtsId, @siraNo=@siraNo, @isinAdi=@isinAdi, "
           + "@gerekce=@gerekce, @yaklasikMaliyet=@yaklasikMaliyet, "
           + "@vergiler=@vergiler, @butceTertibi=@butceTertibi, "
           + "@serbestMiktar=@serbestMiktar, @sure=@sure, @aciklama=@aciklama, "
           + "@birimBaskani=@birimBaskani, @bbUnvani=@bbUnvani, @tarih=@tarih, "
           + "@muhasebeYetkilisi=@muhasebeYetkilisi, @uygunTarih=@uygunTarih, "
           + "@eklerId=@eklerId");
    return insertData.recordset;
  } catch (error) {
    return error.message;
  }
};

const deleteById = async (id) => {
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const sqlQueries = await utils.loadSqlQueries("tblTalep");
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
};
