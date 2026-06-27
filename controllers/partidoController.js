const Partido = require('../models/partido');

const getPartidos = async (req, res) => {
  try {
    const partidos = await Partido.find().limit(20);
    res.status(200).json(partidos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPartidoById = async (req, res) => {
  try {
    const partido = await Partido.findById(req.params.id);

    if (!partido) {
      return res.status(404).json({ message: 'Partido no encontrado' });
    }

    res.status(200).json(partido);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPartido = async (req, res) => {
  try {
    const partido = await Partido.create(req.body);
    res.status(201).json(partido);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updatePartido = async (req, res) => {
  try {
    const partido = await Partido.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!partido) {
      return res.status(404).json({ message: 'Partido no encontrado' });
    }

    res.status(200).json(partido);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deletePartido = async (req, res) => {
  try {
    const partido = await Partido.findByIdAndDelete(req.params.id);

    if (!partido) {
      return res.status(404).json({ message: 'Partido no encontrado' });
    }

    res.status(200).json({ message: 'Partido eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPartidosByTorneo = async (req, res) => {
  try {
    const partidos = await Partido.find({ tournament: req.params.torneo });
    res.status(200).json(partidos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPartidosByEquipo = async (req, res) => {
  try {
    const equipo = req.params.equipo;
    const partidos = await Partido.find({
      $or: [{ home_team: equipo }, { away_team: equipo }],
    });

    res.status(200).json(partidos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPartidosByFecha = async (req, res) => {
  try {
    const match = req.params.rango.match(/^(\d{4}-\d{2}-\d{2})-(\d{4}-\d{2}-\d{2})$/);

    if (!match) {
      return res.status(400).json({ message: 'Rango de fechas invalido' });
    }

    const [, fechaInicio, fechaFin] = match;
    const partidos = await Partido.find({
      date: {
        $gte: fechaInicio,
        $lte: fechaFin,
      },
    });

    res.status(200).json(partidos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPartidos,
  getPartidoById,
  createPartido,
  updatePartido,
  deletePartido,
  getPartidosByTorneo,
  getPartidosByEquipo,
  getPartidosByFecha,
};
