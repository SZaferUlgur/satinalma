"use strict";
const utils = require("../../util");
const ConnectionConfig = require("../../dbConfig");
const sql = require("mssql");
sql.connect(ConnectionConfig);

const getById = async (id) => {
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const sqlQueries = await utils.loadSqlQueries("tblKabul");
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
      .input("dtsId", sql.Int, createData.dtsId)
      .input("isinAdi", sql.VarChar(150), createData.isinAdi)
      .input("istekliAdi", sql.VarChar(150), createData.istekliAdi)
      .input("teslimTarihi", sql.SmallDateTime, createData.teslimTarihi)
      .input("faturaTarihi", sql.SmallDateTime, createData.faturaTarihi)
      .input("faturaNo", sql.VarChar(50), createData.faturaNo)
      .input("olurTarihi", sql.SmallDateTime, createData.olurTarihi)
      .input("olurSayisi", sql.VarChar(50), createData.olurSayisi)
      .input("kesinKarar", sql.VarChar(100), createData.kesinKarar)
      .input("mkBaskan", sql.VarChar(75), createData.mkBaskan)
      .input("mkUyeBir", sql.VarChar(75), createData.mkUyeBir)
      .input("mkUyeIki", sql.VarChar(75), createData.mkUyeIki)
      .input("genelSekreter", sql.VarChar(75), createData.genelSekreter)
      .input("gsUnvan", sql.VarChar(50), createData.gsUnvan)
      .query("EXEC addKabulSP @dtsId=@dtsId, @isinAdi=@isinAdi, "
            +"@istekliAdi=@istekliAdi, @teslimTarihi=@teslimTarihi, "
            +"@faturaTarihi=@faturaTarihi, @faturaNo=@faturaNo, "
            +"@olurTarihi=@olurTarihi, @olurSayisi=@olurSayisi, "
            +"@kesinKarar=@kesinKarar, @mkBaskan=@mkBaskan, "
            +"@mkUyeBir=@mkUyeBir, @mkUyeIki=@mkUyeIki, "
            +"@genelSekreter=@genelSekreter, @gsUnvan=@gsUnvan");
    return insertData.recordset;
  } catch (error) {
    return error.message;
  }
};
 
const deleteById = async (id) => {
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const sqlQueries = await utils.loadSqlQueries("tblKabul");
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
