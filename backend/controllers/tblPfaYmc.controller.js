const tableData = require('../database/tables/tblPFAYMC');

const getNormalById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const getNormalById = await tableData.getNormalById(id);
        res.send(getNormalById);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getSozluById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const getSozluById = await tableData.getSozluById(id);
        res.send(getSozluById);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getTekKaynakById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const getTekKaynakById = await tableData.getTekKaynakById(id);
        res.send(getTekKaynakById);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const addData = async (req, res, next) => {
    try {
        const data = req.body;
        const insertData = await tableData.createData(data);
        res.send(insertData);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const addSozluBir = async (req, res, next) => {
    try {
        const data = req.body;
        const addSozluBir = await tableData.addSozluBir(data);
        res.send(addSozluBir);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const addSozluIki = async (req, res, next) => {
    try {
        const data = req.body;
        const addSozluIki = await tableData.addSozluIki(data);
        res.send(addSozluIki);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const addSozluUc = async (req, res, next) => {
    try {
        const data = req.body;
        const addSozluUc = await tableData.addSozluUc(data);
        res.send(addSozluUc);
    } catch (error) {
        res.status(400).send(error.message);
    }
}


const PFARaporByDtsId = async (req, res, next) => {
    try {
        const id = req.params.id;
        const PFARaporByDtsId = await tableData.PFARaporByDtsId(id);
        res.send(PFARaporByDtsId);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const PFAFaturaByDtsId = async (req, res, next) => {
    try {
        const id = req.params.id;
        const PFAFaturaByDtsId = await tableData.PFAFaturaByDtsId(id);
        res.send(PFAFaturaByDtsId);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const kazananFirmaById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const kazananFirmaById = await tableData.kazananFirmaById(id);
        res.send(kazananFirmaById);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const istekUrunById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const istekUrunById = await tableData.istekUrunById(id);
        res.send(istekUrunById);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const firmaTeklifById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const firmaTeklifById = await tableData.firmaTeklifById(id);
        res.send(firmaTeklifById);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const urunListeByFirma = async (req, res, next) => {
    try {
        const id = req.params.id;
        const urunListeByFirma = await tableData.urunListeByFirma(id);
        res.send(urunListeByFirma);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const ortalamaFiyatById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const ortalamaFiyatById = await tableData.ortalamaFiyatById(id);
        res.send(ortalamaFiyatById);
    } catch (error) {
        res.status(400).send(error.message);
    }
}


const ymcOrtalama = async (req, res, next) => {
    try {
        const id = req.params.id;
        const ymcOrtalama = await tableData.ymcOrtalama(id);
        res.send(ymcOrtalama);
    } catch (error) {
        res.status(400).send(error.message);
    }
}


const deleteById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const deleteById = await tableData.deleteById(id);
        res.send(deleteById);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const sozluYaklasikMaliyetById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const sozluYaklasikMaliyetById = await tableData.sozluYaklasikMaliyetById(id);
        res.send(sozluYaklasikMaliyetById);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getNormalById,
    addData,
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
    PFAFaturaByDtsId,
}