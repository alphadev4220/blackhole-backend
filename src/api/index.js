const express = require('express');

const users = require('./users');
const collections = require('./collections');
const admin = require('./admin');
const utils = require('./utils');
const checkAuthentication = require('./private_router');

const router = express.Router();

router.use('/users', checkAuthentication, users);
router.use('/collections', checkAuthentication, collections);
router.use('/admin',  checkAuthentication, admin);
router.use('/utils',  checkAuthentication, utils);

module.exports = router;