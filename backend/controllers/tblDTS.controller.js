const tableData = require('../database/tables/tblDTS');

const getAll = async (req, res, next) => {
    try {

        const allList = await tableData.getAll();
        res.send(allList);        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllView = async (req, res, next) => {
    try {
        const data = req.body;
        const getAllView = await tableData.getAllView(data);
        res.send(getAllView);        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const newDTSInfo = async (req, res, next) => {
    try {
        const id = req.params.id
        const newDTSInfo = await tableData.newDTSInfo(id);
        res.send(newDTSInfo);        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getById = async (req, res, next) => {
    try {
        const id = req.params.id;
        if(id) {
            const getByID = await tableData.getById(id);
            res.send(getByID);
        }
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

const updateById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const updatedData = await tableData.updateById(id, data);
        res.send(updatedData);
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

const getUserFiltre = async (req, res, next) => {
    try {
        const id = req.params.id;
    const getUserFiltre = await tableData.getUserFiltre(id);
        res.send(getUserFiltre);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const putPDFPath = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const putPDFPath = await tableData.putPDFPath(id, data);
        res.send(putPDFPath);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const delPDFPath = async (req, res, next) => {
    try {
        const id = req.params.id;
        const delPDFPath = await tableData.delPDFPath(id);
        res.send(delPDFPath);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const putEvrakPath = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const putEvrakPath = await tableData.putEvrakPath(id, data);
        res.send(putEvrakPath);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const putFaturaPDFPath = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const putFaturaPDFPath = await tableData.putFaturaPDFPath(id, data);
        res.send(putFaturaPDFPath);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const putDtsYmcUpdate = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const putDtsYmcUpdate = await tableData.putDtsYmcUpdate(id, data);
        res.send(putDtsYmcUpdate);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getAll,
    getAllView,
    getById,
    addData,
    updateById,
    deleteById,
    getUserFiltre,
    putPDFPath,
    putFaturaPDFPath,
    putDtsYmcUpdate,
    newDTSInfo,
    putEvrakPath,
    delPDFPath
}