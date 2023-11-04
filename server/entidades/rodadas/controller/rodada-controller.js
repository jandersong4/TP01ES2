const {jwtMiddleware} = require('../../middlewares/auth-middlewares');
const RodadaService = require('../service/RodadaService');
const rodadaValidate = require('../../middlewares/rodada-validator');


require('express').Router().get('/', jwtMiddleware,
  async (req, res, next) =>{
    try {
      const rodadas = await RodadaService.getAllRodadas();
      res.status(200).json(rodadas);
    } catch (error) {
      next(error);
    }
  },
);

require('express').Router().post('/',
  jwtMiddleware,
  (req, res, next) => {
    // Lógica de filtro
    const allowedKeys = ['d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'ProducId'];
    Object.keys(req.body).forEach((key) => {
      if (!allowedKeys.includes(key)) {
        delete req.body[key];
      }
    });
  },
  rodadaValidate('createRodada'),
  async (req, res, next) => {
    console.log('---->', req.body);
    try {
      const rodada = {
        ...req.body,
        UserId: req.user.id,
      };

      await RodadaService.createRodada(rodada);
      res.status(201).end();
    } catch (error) {
      next(error);
    }
  },
);

require('express').Router().get('/:id',
  jwtMiddleware,
  async (req, res, next) => {
    try {
      const rodada = await RodadaService.getRodadaById(req.params.id);

      res.status(200).json(rodada);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = require('express').Router();
