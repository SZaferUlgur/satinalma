const tableData = require('../database/tables/tblPersonel');

const getAll = async (req, res, next) => {
    try {

        const allList = await tableData.getAll();
        res.send(allList);        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const getByID = await tableData.getById(id);
        res.send(getByID);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getUzman = async (req, res, next) => {
    try {
        const getUzman = await tableData.getUzman();
        res.send(getUzman);
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

const getUser = async (req, res, next) => {
    try {
        const data = req.body;
    const getUser = await tableData.getUser(data);
        res.send(getUser);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateById = async (req, res, next) => {
    try {
        const data = req.body;
        const updatedData = await tableData.updateById(data);
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

const putPicture = async (req, res, next) => {
    try {
        const id = req.params.id;
        const putPicture = await tableData.putPicture(id);
        res.send(putPicture);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getAll,
    getById,
    addData,
    updateById,
    deleteById,
    getUser,
    putPicture,
    getUzman,
}