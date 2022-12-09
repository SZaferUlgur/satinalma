var cors = require("cors");
const express = require("express");
const dotenv = require("dotenv");
const fileUpload = require('express-fileupload');
const path = require("path");
const fs = require("fs")

// import routes
const serverRoutes = require("./backend/routes/ServerRoutes");
const faaliyetRoutes = require("./backend/routes/FaaliyetRoutes");
const dtsFaturaRoutes = require("./backend/routes/FaturaRoutes");
const istekliRoutes = require("./backend/routes/IstekliRoutes");
const sektorRoutes = require("./backend/routes/SektorRoutes");
const bankaRoutes = require("./backend/routes/BankaRoutes");
const lokasyonRoutes = require("./backend/routes/LokasyonRoutes");
const birimRoutes = require("./backend/routes/BirimRoutes");
const personelRoutes = require("./backend/routes/PersonelRoutes");
const baskanRoutes = require("./backend/routes/BaskanRoutes");
const gsekreterRoutes = require("./backend/routes/GSekreterRoutes");
const kurumRoutes = require("./backend/routes/KurumRoutes");
const muhYetkiliRoutes = require("./backend/routes/MuhYetkiliRoutes");
const dtsRoutes = require("./backend/routes/DtsRoutes");
const dtsOrderRoutes = require("./backend/routes/DtsOrderRoutes");
const dtsKomisyonRoutes = require("./backend/routes/DtsKomisyonRoutes");
const pfaYmcRoutes = require("./backend/routes/PfaYmcRoutes");
const tekKaynakRoutes = require("./backend/routes/TekKaynakRoutes");
const harcamaOnayRoutes = require("./backend/routes/HarcamaOnayRoutes");

const talepRoutes = require("./backend/routes/TalepRoutes");
const FaturaRoutes = require("./backend/routes/FaturaRoutes");
const KabulRoutes = require("./backend/routes/KabulRoutes");
const OdemeRoutes = require("./backend/routes/OdemeRoutes");
const YetkiRoutes = require("./backend/routes/YetkiRoutes");

dotenv.config();
const PORT = process.env.PORT;

const app = express();

// Init middleware
app.use(express.json());
app.use(express.json({ extended: false }));

app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use("/", express.static(path.join(__dirname, "backend/public")));
app.use("/", require("./backend/routes/Rotas"));

app.use("/api/auth", require("./backend/routes/api/auth"));
app.use("/api/register", require("./backend/routes/api/register"));
//routes

app.use("/api", serverRoutes.routes);
app.use("/api/faaliyet", faaliyetRoutes.routes);
app.use("/api/dtsfatura", dtsFaturaRoutes.routes);
app.use("/api/istekli", istekliRoutes.routes);
app.use("/api/sektor", sektorRoutes.routes);
app.use("/api/banka", bankaRoutes.routes);
app.use("/api/lokasyon", lokasyonRoutes.routes);
app.use("/api/birim", birimRoutes.routes);
app.use("/api/personel", personelRoutes.routes);
app.use("/api/baskan", baskanRoutes.routes);
app.use("/api/gs", gsekreterRoutes.routes);
app.use("/api/kurum", kurumRoutes.routes);
app.use("/api/sayman", muhYetkiliRoutes.routes);
app.use("/api/dts", dtsRoutes.routes);
app.use("/api/dtsorder", dtsOrderRoutes.routes);
app.use("/api/dtskomisyon", dtsKomisyonRoutes.routes);
app.use("/api/pfaymc", pfaYmcRoutes.routes);
app.use("/api/tekkaynak", tekKaynakRoutes.routes);
app.use("/api/harcamaonay", harcamaOnayRoutes.routes);
app.use("/api/talep", talepRoutes.routes);
app.use("/api/fatura", FaturaRoutes.routes);
app.use("/api/kabul", KabulRoutes.routes);
app.use("/api/odeme", OdemeRoutes.routes);
app.use("/api/dtsyetki", YetkiRoutes.routes);


//personel resim yükleme
app.use(fileUpload());
app.post('/api/perpicupload', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }
  const file = req.files.file;
  const newname = req.headers.newname
  file.mv(`${__dirname}/frontend/src/assets/personelpictures/${newname}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    res.json({ fileName: file.name, filePath: `${__dirname}/frontend/src/assets/personelpictures/${file.name}` });
  });
});

//dts dosya yükleme
app.post('/api/dosyaupload', (req, res) => {
 // console.log(req.headers)
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }
  const file = req.files.file;
  const talepDirName = req.headers.talepid
  const newname = req.headers.newname

  var dir = __dirname + `/frontend/src/files/dts/${talepDirName}`
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}
  file.mv(`${__dirname}/frontend/src/files/dts/${talepDirName}/${newname}`, 
      err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    res.json({ fileName: file.name, 
      filePath: `${__dirname}/frontend/src/files/dts/${talepDirName}/${file.name}` });
  });
});

//dts dosya yükleme
app.post('/api/dosyasil', (req, res) => {
  //console.log(req.body)
   const talepDirName = req.body.kodID
   const newname = req.body.newname
   var filePath = __dirname + `/frontend/src/files/dts/${talepDirName}/${newname}`
   if(filePath) {
    fs.unlinkSync(filePath);
   }
   () => dtsRoutes.routes("/deldtspdfpath/:id").post(auth, delPDFPath)
 });

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "backend/views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.listen(PORT, () => console.log(`MSSQLServer ${PORT} Portunda Çalışıyor`));
