const express = require('express');
const router = express.Router();
const diarioController = require('../controllers/diarioController');


router.get('/diarios', diarioController.listarDiario);
router.post('/diarios', diarioController.createDiario);
router.put('/diarios/:id', diarioController.updateDiario);
router.delete('/diarios/:id', diarioController.deleteDiario);
router.get('/diarios/:id', diarioController.umDiario);

module.exports = router;