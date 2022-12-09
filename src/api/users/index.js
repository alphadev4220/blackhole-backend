const express = require('express');
const router = express.Router();
const users = require("./controller");

router.put('/:id', users.update);
router.post('/create', users.create);
router.post('/:id', users.updateCount);
router.get('/findOne', users.findOne);
router.get('/findAll', users.findAll);
router.delete('/:id', users.delete);

module.exports = router;