"use strict";
const utils = require("../../util");
const ConnectionConfig = require("../../dbConfig");
const sql = require("mssql");
var fs = require("fs");

sql.connect(ConnectionConfig);

const getAll = async () => {
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const sqlQueries = await utils.loadSqlQueries("tblDTS");
    const selectAll = await pool.request().query(sqlQueries.selectAll);
    return selectAll.recordset;
  } catch (error) {
    console.log(error.message);
  }
};

const getAllView = async (data) => {
// console.log(data) 
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const getUserById = await pool
      .request()
      .input("perName", sql.NVarChar(75), data.perName)
      .input("perMod", sql.NVarChar(1), data.uMod)
      .query("EXEC sorDTSSP @perName=@perName, @perMod=@perMod");
    return getUserById.recordset;
  } catch (error) {
    console.log(error.message);
  }
};

const newDTSInfo = async (id) => {
   //console.log(data)
   try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const getUserById = await pool
      .request()
      .input("id", sql.Int, id)
      .query("EXEC newDtsInfoSP @perId=@id");
    return getUserById.recordset;
  } catch (error) {
    console.log(error.message);
  }
}

const getUserFiltre = async (id) => {
  //console.log(id)
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const sqlQueries = await utils.loadSqlQueries("tblDTS");
    const getUserById = await pool
      .request()
      .input("id", sql.Int, id)
      .query(sqlQueries.getUserFiltre);
    return getUserById.recordset;
  } catch (error) {
    console.log(error.message);
  }
};

const getById = async (id) => {
 //console.log(id)
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const sqlQueries = await utils.loadSqlQueries("tblDTS");
    const selectById = await pool
      .request()
      .input("id", sql.Int, id)
      .query(sqlQueries.selectById);
    return selectById.recordset;
  } catch (error) {
    return error.message;
  }
};

//getUserFiltre

const createData = async (createData) => {
//console.log(createData)
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const insertData = await pool
      .request()
      .input("personelAdiSoyadi", sql.NVarChar(75), createData.personelAdiSoyadi)
      .input("idareAdi", sql.NVarChar(150), createData.kurumAdi)
      .input("idareAmiri", sql.NVarChar(75), createData.genelSekreter)
      .input("gorevi", sql.NVarChar(50), createData.gorevi)
      .input("birim", sql.NVarChar(75), createData.birim)
      .input("birimBaskani", sql.NVarChar(75), createData.birimBaskani)
      //.input("unvani", sql.NVarChar(150), createData.unvani)
      .input("muhasebeYetkilisi", sql.NVarChar(75), createData.muhasebeYetkilisi)
      .input("turu", sql.NVarChar(100), createData.turu)
      .input("butce", sql.NVarChar(150), createData.butce)
      .input("bakiye", sql.VarChar(20), createData.bakiye.toString())
      .input("isinAdi", sql.NVarChar(500), createData.isinAdi)
      .input("olurTarihi", sql.SmallDateTime, createData.olurTarihi)
      .input("olurSayisi", sql.NVarChar(50), createData.olurSayisi)
      .input("insertUser", sql.Int, createData.insertUser)
      .query("EXEC addDTSSP @idareAdi=@idareAdi, @idareAmiri=@idareAmiri, " +
          "@gorevi=@gorevi, @birim=@birim, @birimBaskani=@birimBaskani, " +
          "@turu=@turu, @butce=@butce, @bakiye=@bakiye, @personelAdiSoyadi=@personelAdiSoyadi, " +
          "@muhasebeYetkilisi=@muhasebeYetkilisi, @isinAdi=@isinAdi, " +
          "@olurTarihi=@olurTarihi, @olurSayisi=@olurSayisi, " +
          "@insertUser=@insertUser");
    const talepDirName = insertData.recordset[0].SonKayNo;
    try {
      fs.mkdirSync(`./frontend/src/files/dts/${talepDirName}`);
      //console.log("Klasör Açıldı")
    } catch (error) {
      if (error.code === "EEXIST") {
        //console.log("Klasör Zaten Var..")
      } else {
        //console.log(error)
      }
    }
    return insertData.recordset;
  } catch (error) {
    return error.message;
  }
};

const deleteById = async (id) => {
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const sqlQueries = await utils.loadSqlQueries("tblDTS");
    const deleteById = await pool
      .request()
      .input("id", sql.Int, id)
      .query(sqlQueries.deleteById);
    return deleteById.recordset;
  } catch (error) {
    return error.message;
  }
};

const putPDFPath = async (id, data) => {
//  console.log(data)
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const insertData = await pool
      .request()
      .input("Id", sql.Int, id)
      .input("dosyaAdi", sql.NVarChar(250), data.newname)
      .query("EXEC updateDTSOlurPDFSP @Id=@Id, @dosyaAdi=@dosyaAdi");
    return insertData.recordset;
  } catch (error) {
    return error.message;
  }
};

const delPDFPath = async (id) => {
//  console.log("NULL id:",id)
    try {
      let pool = await sql.connect(ConnectionConfig.sql);
      const insertData = await pool
        .request()
        .input("id", sql.Int, id)
        .query("EXEC deleteDTSOlurPDFSP @id=@id");
      return insertData.recordset;
    } catch (error) {
      return error.message;
    }
  };
  

const putEvrakPath = async (id, data) => {
  //console.log({id, data})
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const insertData = await pool
      .request()
      .input("Id", sql.Int, id)
      .input("dosyaAdi", sql.NVarChar(250), data.dosyaAdi)
      .query("EXEC updateEvrakPDFSP @Id=@Id, @dosyaAdi=@dosyaAdi");
    return insertData.recordset;
  } catch (error) {
    return error.message;
  }
};

const putFaturaPDFPath = async (id, data) => {
// console.log({id, data})
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const insertData = await pool
      .request()
      .input("Id", sql.Int, id)
      .input("dosyaAdi", sql.NVarChar(250), data.newname)
      .query("EXEC updateDTSFaturaPDFSP @Id=@Id, @dosyaAdi=@dosyaAdi");
    return insertData.recordset;
  } catch (error) {
    return error.message;
  }
};

const putDtsYmcUpdate = async (id, data) => {
  //console.log({id, data})
  try {
    let pool = await sql.connect(ConnectionConfig.sql);
    const updateData = await pool
      .request()
      .input("id", sql.Int, id)
      .input("ymcTutar", sql.NVarChar(250), data.ymcTutar)
      .query("EXEC updateYMDTSSP @dtsId=@id, @yaklasikMaliyet=@ymcTutar");
    return updateData.recordset;
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  getAll,
  getAllView,
  getById,
  createData,
  deleteById,
  getUserFiltre,
  putPDFPath,
  putFaturaPDFPath,
  putDtsYmcUpdate,
  newDTSInfo,
  putEvrakPath,
  delPDFPath
};
