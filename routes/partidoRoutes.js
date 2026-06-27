const express = require('express');
const {
  getPartidos,
  getPartidoById,
  createPartido,
  updatePartido,
  deletePartido,
  getPartidosByTorneo,
  getPartidosByEquipo,
  getPartidosByFecha,
} = require('../controllers/partidoController');

const router = express.Router();

router.get('/', getPartidos);
router.get('/torneo/:torneo', getPartidosByTorneo);
router.get('/equipo/:equipo', getPartidosByEquipo);
router.get('/fecha/:rango', getPartidosByFecha);
router.get('/:id', getPartidoById);
router.post('/', createPartido);
router.put('/:id', updatePartido);
router.delete('/:id', deletePartido);

module.exports = router;
