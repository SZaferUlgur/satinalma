"use strict";
const utils = require("../../util");
const ConnectionConfig = require("../../dbConfig");
const sql = require("mssql");
sql.connect(ConnectionConfig);

const getNormalById = async (id) => {
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const sqlQueries = await utils.loadSqlQueries("tblPFAYMC");
    const getNormalById = await pool
      .request()
      .input("id", sql.Int, id)
      .query(sqlQueries.getNormalById);
    return getNormalById.recordset;
  } catch (error) {
    return error.message;
  }
};

const getSozluById = async (id) => {
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const sqlQueries = await utils.loadSqlQueries("tblPFAYMC");
    const getSozluById = await pool
      .request()
      .input("id", sql.Int, id)
      .query(sqlQueries.getSozluById);
    return getSozluById.recordset;
  } catch (error) {
    return error.message;
  }
};
 
const getTekKaynakById = async (id) => {
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const sqlQueries = await utils.loadSqlQueries("tblPFAYMC");
    const getTekKaynakById = await pool
      .request()
      .input("id", sql.Int, id)
      .query(sqlQueries.getTekKaynakById);
    return getTekKaynakById.recordset;
  } catch (error) {
    return error.message;
  }
};

const sozluYaklasikMaliyetById = async (id) => {
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const sqlQueries = await utils.loadSqlQueries("tblPFAYMC");
    const sozluYaklasikMaliyetById = await pool
      .request()
      .input("id", sql.Int, id)
      .query(sqlQueries.sozluYaklasikMaliyetById);
    return sozluYaklasikMaliyetById.recordset;
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
      .input("turu", sql.NVarChar(20), createData.turu)
      .input("dtsId", sql.Int, createData.kodID)
      .input("firmaId", sql.Int, createData.firmaID)
      .input("orderID", sql.Int, createData.kalem)
      .input("yaklasikMaliyet", sql.VarChar(20), createData.yakMaliyet)
      .input("fiyatTeklifi", sql.VarChar(20), createData.teklif)
      .input("tarih", sql.SmallDateTime, createData.islemTarihi)
      .input("insertUser", sql.Decimal(18,2), createData.uID)
      .query("EXEC addPFAYMCSP @turu=@turu, @dtsId=@dtsId, @firmaId=@firmaId, "
           + "@orderID=@orderID, @yaklasikMaliyet=@yaklasikMaliyet, "
           + "@fiyatTeklifi=@fiyatTeklifi, @tarih=@tarih, @insertUser=@insertUser");
    return insertData.recordset;
  } catch (error) {
    return error.message;
  }
};

const addSozluBir = async (addData) => {
//console.log(addData)
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const insertData = await pool
      .request()
      .input("turu", sql.VarChar(20), addData.turu)
      .input("dtsId", sql.Int, addData.kodID)
      .input("firmaId", sql.Int, addData.firmaBir.firmaBirId)
      .input("adiSoyadi", sql.VarChar(150), addData.firmaBir.firmaBirSahibi)
      .input("firmaAdi", sql.VarChar(155), addData.firmaBir.firmaBirAdi)
      .input("adres", sql.VarChar(500), addData.firmaBir.firmaBirAdres)
      .input("istekUrun", sql.VarChar(250), addData.ihtiyac)
      .input("adet", sql.Decimal(18,2), addData.miktar)
      .input("yaklasikMaliyet", sql.VarChar(20), addData.firmaBirTeklif)
      .input("fiyatTeklifi", sql.VarChar(20), addData.firmaBirTeklif)
      .input("tarih", sql.SmallDateTime, addData.tarih)
      .input("insertUser", sql.Int, addData.uID)
      .query("EXEC addPFAYMCSozluSP @turu=@turu, @dtsId=@dtsId, @firmaId=@firmaId, "
           + "@adiSoyadi=@adiSoyadi, @firmaAdi=@firmaAdi, @adres=@adres, "
           + "@istekUrun=@istekUrun, @adet=@adet, @yaklasikMaliyet=@yaklasikMaliyet, "
           + "@fiyatTeklifi=@fiyatTeklifi, @tarih=@tarih, @insertUser=@insertUser");
    return insertData.recordset;
  } catch (error) {
    return error.message;
  }
};

const addSozluIki = async (addData) => {
//console.log(addData)
    try {
      let pool = await sql.connect(ConnectionConfig.sql);
      const insertData = await pool
        .request()
        .input("turu", sql.VarChar(20), addData.turu)
        .input("dtsId", sql.Int, addData.kodID)
        .input("firmaId", sql.Int, addData.firmaIki.firmaIkiId)
        .input("adiSoyadi", sql.VarChar(150), addData.firmaIki.firmaIkiSahibi)
        .input("firmaAdi", sql.VarChar(155), addData.firmaIki.firmaIkiAdi)
        .input("adres", sql.VarChar(500), addData.firmaIki.firmaIkiAdres)
        .input("istekUrun", sql.VarChar(250), addData.ihtiyac)
        .input("adet", sql.Decimal(18,2), addData.miktar)
        .input("yaklasikMaliyet", sql.VarChar(20), addData.firmaIkiTeklif)
        .input("fiyatTeklifi", sql.VarChar(20), addData.firmaIkiTeklif)
        .input("tarih", sql.SmallDateTime, addData.tarih)
        .input("insertUser", sql.Int, addData.uID)
        .query("EXEC addPFAYMCSozluSP @turu=@turu, @dtsId=@dtsId, @firmaId=@firmaId, "
             + "@adiSoyadi=@adiSoyadi, @firmaAdi=@firmaAdi, @adres=@adres, "
             + "@istekUrun=@istekUrun, @adet=@adet, @yaklasikMaliyet=@yaklasikMaliyet, "
             + "@fiyatTeklifi=@fiyatTeklifi, @tarih=@tarih, @insertUser=@insertUser");
      return insertData.recordset;
    } catch (error) {
      return error.message;
    }
  };

  
const addSozluUc = async (addData) => {
//console.log(addData)
    try {
      let pool = await sql.connect(ConnectionConfig.sql);
      const insertData = await pool
        .request()
        .input("turu", sql.VarChar(20), addData.turu)
        .input("dtsId", sql.Int, addData.kodID)
        .input("firmaId", sql.Int, addData.firmaUc.firmaUcId)
        .input("adiSoyadi", sql.VarChar(150), addData.firmaUc.firmaUcSahibi)
        .input("firmaAdi", sql.VarChar(155), addData.firmaUc.firmaUcAdi)
        .input("adres", sql.VarChar(500), addData.firmaUc.firmaUcAdres)
        .input("istekUrun", sql.VarChar(250), addData.ihtiyac)
        .input("adet", sql.Decimal(18,2), addData.miktar)
        .input("yaklasikMaliyet", sql.VarChar(20), addData.firmaUcTeklif)
        .input("fiyatTeklifi", sql.VarChar(20), addData.firmaUcTeklif)
        .input("tarih", sql.SmallDateTime, addData.tarih)
        .input("insertUser", sql.Int, addData.uID)
        .query("EXEC addPFAYMCSozluSP @turu=@turu, @dtsId=@dtsId, @firmaId=@firmaId, "
             + "@adiSoyadi=@adiSoyadi, @firmaAdi=@firmaAdi, @adres=@adres, "
             + "@istekUrun=@istekUrun, @adet=@adet, @yaklasikMaliyet=@yaklasikMaliyet, "
             + "@fiyatTeklifi=@fiyatTeklifi, @tarih=@tarih, @insertUser=@insertUser");
      return insertData.recordset;
    } catch (error) {
      return error.message;
    }
  };

const PFARaporByDtsId = async (id) => {
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const sqlQueries = await utils.loadSqlQueries("tblPFAYMC");
    const PFARaporByDtsId = await pool
      .request()
      .input("id", sql.Int, id)
      .query(sqlQueries.PFARaporByDtsId);
    return PFARaporByDtsId.recordset;
  } catch (error) {
    return error.message;
  }
};

const PFAFaturaByDtsId = async (id) => {
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const sqlQueries = await utils.loadSqlQueries("tblPFAYMC");
    const PFAFaturaByDtsId = await pool
      .request()
      .input("id", sql.Int, id)
      .query(sqlQueries.PFAFaturaByDtsId);
    return PFAFaturaByDtsId.recordset;
  } catch (error) {
    return error.message;
  }
};

const kazananFirmaById = async (id) => {
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const sqlQueries = await utils.loadSqlQueries("tblPFAYMC");
    const kazananFirmaById = await pool
      .request()
      .input("id", sql.Int, id)
      .query(sqlQueries.kazananFirmaById);
    return kazananFirmaById.recordset;
  } catch (error) {
    return error.message;
  }
};

const istekUrunById = async (id) => {
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const sqlQueries = await utils.loadSqlQueries("tblPFAYMC");
    const istekUrunById = await pool
      .request()
      .input("id", sql.Int, id)
      .query(sqlQueries.istekUrunById);
    return istekUrunById.recordset;
  } catch (error) {
    return error.message;
  }
};

const firmaTeklifById = async (id) => {
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const sqlQueries = await utils.loadSqlQueries("tblPFAYMC");
    const firmaTeklifById = await pool
      .request()
      .input("id", sql.Int, id)
      .query(sqlQueries.firmaTeklifById);
    return firmaTeklifById.recordset;
  } catch (error) {
    return error.message;
  }
};

const urunListeByFirma = async (id) => {
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const sqlQueries = await utils.loadSqlQueries("tblPFAYMC");
    const urunListeByFirma = await pool
      .request()
      .input("id", sql.Int, id)
      .query(sqlQueries.urunListeByFirma);
    return urunListeByFirma.recordset;
  } catch (error) {
    return error.message;
  }
};

const ortalamaFiyatById = async (id) => {
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const ortalamaFiyatById = await pool
      .request()
      .input("id", sql.Int, id)
      .query("EXEC pfaYmcBilgilerSP @id=@id");
    return ortalamaFiyatById.recordset;
  } catch (error) {
    return error.message;
  }
};

const ymcOrtalama = async (id) => {
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const sqlQueries = await utils.loadSqlQueries("tblPFAYMC");
    const ymcOrtalama = await pool
      .request()
      .input("id", sql.Int, id)
      .query(sqlQueries.ymcOrtalama);
    return ymcOrtalama.recordset;
  } catch (error) {
    return error.message;
  }
};

const deleteById = async (id) => {
//  console.log(id)
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const sqlQueries = await utils.loadSqlQueries("tblPFAYMC");
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
  getNormalById,
  createData,
  deleteById,
  PFARaporByDtsId,
  kazananFirmaById,
  istekUrunById,
  firmaTeklifById,
  urunListeByFirma,
  ortalamaFiyatById,
  ymcOrtalama,
  getSozluById,
  getTekKaynakById,
  addSozluBir,
  addSozluIki,
  addSozluUc,
  sozluYaklasikMaliyetById,
  PFAFaturaByDtsId
};
