"use strict";
const utils = require("../../util");
const ConnectionConfig = require("../../dbConfig");
const sql = require("mssql");
var fs = require("fs");

sql.connect(ConnectionConfig);


const getById = async (id) => {
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const sqlQueries = await utils.loadSqlQueries("tblDTSHarcamaOnay");
    const getById = await pool
      .request()
      .input("id", sql.Int, id)
      .query(sqlQueries.getById);
    return getById.recordset;
  } catch (error) {
    return error.message;
  }
};

//getUserFiltre

const addData = async (addData) => {
console.log(addData)
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const insertData = await pool
      .request()
      .input("dtsId", sql.Int, addData.dtsId)
      .input("idareAdi", sql.VarChar(150), addData.idareAdi)
      .input("belgeSayisi", sql.VarChar(50), addData.belgeSayisi)
      .input("belgeTarihi", sql.SmallDateTime, addData.belgeTarihi)
      .input("isinAdi", sql.VarChar(500), addData.isinAdi)
      .input("isinNiteligi", sql.VarChar(250), addData.isinNiteligi)
      .input("yatirimNo", sql.VarChar(20), addData.yatirimNo)
      .input("ihaleUsul", sql.VarChar(50), addData.ihaleUsul)
      .input("ilanSekli", sql.VarChar(50), addData.ilanSekli)
      .input("belgeBedeli", sql.Decimal(18,2), addData.belgeBedeli)
      .input("butceTertibi", sql.VarChar(150), addData.butceTertibi)
      .input("tutar", sql.Decimal(18,2), addData.yaklasikMaliyet)
      .input("odenekTutari", sql.Decimal(18,2), addData.odenekTutari)
      .input("aciklama", sql.VarChar(500), addData.aciklama)
      .input("birimBaskani", sql.VarChar(50), addData.birimBaskani)
      .input("bbUnvani", sql.VarChar(50), addData.bbUnvani)
      .input("genelSekreter", sql.VarChar(50), addData.genelSekreter)
      .input("gsUnvani", sql.VarChar(50), addData.gsUnvani)
      .input("insertUser", sql.Int, addData.insertUser)
      .query("EXEC addDTSHarcOnaySP @dtsId=@dtsId, @idareAdi=@idareAdi, "
          + "@belgeSayisi=@belgeSayisi, @belgeTarihi=@belgeTarihi, "
          + "@isinAdi=@isinAdi, @isinNiteligi=@isinNiteligi, "
          + "@yatirimNo=@yatirimNo, @ihaleUsul=@ihaleUsul, @ilanSekli=@ilanSekli , "
          + "@belgeBedeli=@belgeBedeli, @butceTertibi=@butceTertibi, @tutar=@tutar , "
          + "@odenekTutari=@odenekTutari, @aciklama=@aciklama, @birimBaskani=@birimBaskani , "
          + "@bbUnvani=@bbUnvani, @genelSekreter=@genelSekreter, @gsUnvani=@gsUnvani , "
          + "@insertUser=@insertUser");
    return insertData.recordset;
  } catch (error) {
    return error.message;
  }
};

const deleteById = async (id) => {
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const sqlQueries = await utils.loadSqlQueries("tblDTSHarcamaOnay");
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
