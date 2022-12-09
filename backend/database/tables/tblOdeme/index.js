"use strict";
const utils = require("../../util");
const ConnectionConfig = require("../../dbConfig");
const sql = require("mssql");
sql.connect(ConnectionConfig);

const getById = async (id) => {
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const sqlQueries = await utils.loadSqlQueries("tblOdeme");
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
      .input("butceYili", sql.Numeric(4,0), createData.butceYili)
      .input("tarih", sql.SmallDateTime, createData.tarih)
      .input("emirNo", sql.Numeric(5,0), createData.emirNo)
      .input("istekliAdi", sql.VarChar(150), createData.istekliAdi)
      .input("tcKimlik", sql.VarChar(20), createData.tcKimlik)
      .input("bankaSubesi", sql.VarChar(150), createData.bankaSubesi)
      .input("ibanNo", sql.VarChar(36), createData.ibanNo)
      .input("belgeNo", sql.Numeric(5,0), createData.belgeNo)
      .input("tutar", sql.VarChar(20), createData.tutar.toString())
      .input("kesintiToplam", sql.VarChar(20), createData.kesintiToplam.toString())
      .input("netOdenecek", sql.VarChar(20), createData.netOdenecek.toString())
      .input("duzenleyen", sql.VarChar(75), createData.duzenleyen)
      .input("harcamaYetkilisi", sql.VarChar(75), createData.harcamaYetkilisi)
      .input("muhasebeYetkilisi", sql.VarChar(75), createData.muhasebeYetkilisi)
      .query("EXEC addOdemeSP @dtsId=@dtsId, @butceYili=@butceYili, "
            +"@tarih=@tarih, @emirNo=@emirNo, @istekliAdi=@istekliAdi, "
            +"@tcKimlik=@tcKimlik, @bankaSubesi=@bankaSubesi, @ibanNo=@ibanNo, "
            +"@belgeNo=@belgeNo, @tutar=@tutar, "
            +"@kesintiToplam=@kesintiToplam, @netOdenecek=@netOdenecek, "
            +"@duzenleyen=@duzenleyen, @harcamaYetkilisi=@harcamaYetkilisi, "
            +"@muhasebeYetkilisi=@muhasebeYetkilisi");
    return insertData.recordset;
  } catch (error) {
    return error.message;
  }
};

const deleteById = async (id) => {
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const sqlQueries = await utils.loadSqlQueries("tblOdeme");
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
