'use strict';
const serverData = require('../database/server');

const getConnection = async (req, res, next) => {
    try {
        const serverList = await serverData.getServer();
        res.send(serverList);        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getConnection
}