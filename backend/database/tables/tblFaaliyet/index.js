"use strict";
const utils = require("../../util");
const ConnectionConfig = require("../../dbConfig");
const sql = require("mssql");
sql.connect(ConnectionConfig);

const getAll = async () => {
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const sqlQueries = await utils.loadSqlQueries("tblFaaliyet");
    const selectAll = await pool.request().query(sqlQueries.selectAll);
    return selectAll.recordset;
  } catch (error) {
    console.log(error.message);
  }
};

const getById = async (id) => {
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const sqlQueries = await utils.loadSqlQueries("tblFaaliyet");
    const selectById = await pool
      .request()
      .input("id", sql.Int, id)
      .query(sqlQueries.selectById);
    return selectById.recordset;
  } catch (error) {
    return error.message;
  }
};

const getAdi = async (data) => {
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const sqlQueries = await utils.loadSqlQueries("tblFaaliyet");
    const selectById = await pool
      .request()
      .input("faaliyetAdi", sql.NVarChar(250), data.faaliyetAdi)
      .query(sqlQueries.getAdi);
    return selectById.recordset;
  } catch (error) {
    return error.message;
  }
};

const createData = async (createData) => {
// console.log(createData)
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const insertData = await pool
      .request()
      .input("donem", sql.Int, createData.donem)
      .input("baslangicTarihi", sql.SmallDateTime, createData.baslangicTarihi)
      .input("bitisTarihi", sql.SmallDateTime, createData.bitisTarihi)
      .input("btKodu", sql.VarChar(20), createData.btKodu)
      .input("btAdi", sql.VarChar(150), createData.btAdi)
      .input("oncelik", sql.VarChar(150), createData.oncelik)
      .input("tedbir", sql.VarChar(150), createData.tedbir)
      .input("faaliyet", sql.VarChar(150), createData.faaliyet)
      .input("sorumluBirim", sql.VarChar(150), createData.sorumluBirim)
      .input("fonksiyonelDuzey", sql.VarChar(150), createData.fonksiyonelDuzey)
      .input("butceTutar", sql.VarChar(20), createData.butceTutar.toString())
      .input("kullanilanTutar", sql.VarChar(20), createData.kullanilanTutar.toString())
      .input("blokeTutar", sql.VarChar(20), createData.blokeTutar.toString())
      .input("kalanTutar", sql.VarChar(20), createData.kalanTutar.toString())
      .query("EXEC addFaaliyetSP @donem=@donem, @baslangicTarihi=@baslangicTarihi, "
            +"@bitisTarihi=@bitisTarihi, @btKodu=@btKodu, @btAdi=@btAdi, @oncelik=@oncelik, "
            +"@tedbir=@tedbir, @faaliyet=@faaliyet, @sorumluBirim=@sorumluBirim, "
            +"@fonksiyonelDuzey=@fonksiyonelDuzey, @butceTutar=@butceTutar, "
            + "@kullanilanTutar=@kullanilanTutar, @blokeTutar=@blokeTutar, "
            +"@kalanTutar=@kalanTutar");
    return insertData.recordset;
  } catch (error) {
    return error.message;
  }
};

const updateById = async (id, updateData) => {
//console.log(id, updateData)
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const updateById = await pool
      .request()
      .input("id", sql.Int, id)
      .input("donem", sql.Int, updateData.faaliyetData.donem)
      .input("baslangicTarihi", sql.SmallDateTime, updateData.faaliyetData.basTarihi)
      .input("bitisTarihi", sql.SmallDateTime, updateData.faaliyetData.bitTarihi)
      .input("btKodu", sql.VarChar(20), updateData.faaliyetData.btKodu)
      .input("btAdi", sql.VarChar(150), updateData.faaliyetData.btAdi)
      .input("oncelik", sql.VarChar(150), updateData.faaliyetData.oncelik)
      .input("tedbir", sql.VarChar(150), updateData.faaliyetData.tedbir)
      .input("faaliyet", sql.VarChar(150), updateData.faaliyetData.faaliyet)
      .input("sorumluBirim", sql.VarChar(150), updateData.faaliyetData.sorumluBirim)
      .input("fonksiyonelDuzey", sql.VarChar(150), updateData.faaliyetData.fonksiyonelDuzey)
      .input("butceTutar", sql.VarChar(20), updateData.faaliyetData.butceTutar.toString())
      .input("kullanilanTutar", sql.VarChar(20), updateData.faaliyetData.kullanilanTutar.toString())
      .input("blokeTutar", sql.VarChar(20), updateData.faaliyetData.blokeTutar.toString())
      .input("kalanTutar", sql.VarChar(20), updateData.faaliyetData.kalanTutar.toString())
      .query("EXEC updateFaaliyetSP @id=@id, @donem=@donem, @baslangicTarihi=@baslangicTarihi, "
            +"@bitisTarihi=@bitisTarihi, @btKodu=@btKodu, @btAdi=@btAdi, @oncelik=@oncelik, "
            +"@tedbir=@tedbir, @faaliyet=@faaliyet, @sorumluBirim=@sorumluBirim, "
            +"@fonksiyonelDuzey=@fonksiyonelDuzey, @butceTutar=@butceTutar, "
            + "@kullanilanTutar=@kullanilanTutar, @blokeTutar=@blokeTutar, "
            +"@kalanTutar=@kalanTutar");
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
      .query("EXEC deleteFaaliyetSP @id=@id");
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
  getAdi,
};
