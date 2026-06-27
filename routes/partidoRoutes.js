const express = require('express');
const {
  getPartidos,
  getPartidoById,
  createPartido,
  updatePartido,
  deletePartido,
} = require('../controllers/partidoController');

const router = express.Router();

router.get('/', getPartidos);
router.get('/:id', getPartidoById);
router.post('/', createPartido);
router.put('/:id', updatePartido);
router.delete('/:id', deletePartido);

module.exports = router;
