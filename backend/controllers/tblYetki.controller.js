const tableData = require('../database/tables/tblYetki');

const sorDTSYetki = async (req, res, next) => {
    try {
        const data = req.body;
        const sorDTSYetki = await tableData.sorDTSYetki(data);
        res.send(sorDTSYetki);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const setKomisyonUyelik = async (req, res, next) => {
    try {
        const data = req.body;
        const setKomisyonUyelik = await tableData.setKomisyonUyelik(data);
        res.send(setKomisyonUyelik);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    sorDTSYetki,
    setKomisyonUyelik,
}