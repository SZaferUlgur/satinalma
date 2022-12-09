'use strict';

const express = require('express');
const serverControll = require('../controllers/server.controller');
const router = express.Router();

router.get('/', serverControll.getConnection);

module.exports = {
    routes: router
}