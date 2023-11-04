const {jwtMiddleware} = require('../../../middlewares/auth-middlewares');
const PlayService = require('../Service/PlayService');
const playValidate = require('../../../middlewares/play-validator');
const requestFilter = require('../../../middlewares/object-filter');


require('express').Router().post('/',
  jwtMiddleware,
  requestFilter('body', ['IdDaPartida', 'd4', 'd8', 'd6', 'd10', 'd12', 'd20']),
  playValidate('createPlay'),
  async (req, res, next) => {
    try {
      const play = {
        ...req.body,
        UserId: req.user.id,
      };

      await PlayService.createPlay(play);
      res.status(201).end();
    } catch (error) {
      next(error);
    }
  }
  ,
);

require('express').Router().get('/', jwtMiddleware,
  async (req, res, next) =>{
    try {
      const plays = await PlayService.getAllPlays();
      res.status(200).json(plays);
    } catch (error) {
      next(error);
    }
  },
);

require('express').Router().get('/:id',
  jwtMiddleware,
  async (req, res, next) => {
    try {
      const play = await PlayService.getPlayById(req.params.id);

      res.status(200).json(play);
    } catch (error) {
      next(error);
    }
  },
);

require('express').Router().get('/listaJogadas/:idDaPartida',
  jwtMiddleware,
  async (req, res, next) => {
    try {
      const play = await PlayService.getPlayByIdDaPartida(
        req.params.idDaPartida);

      res.status(200).json(play);
    } catch (error) {
      next(error);
    }
  },
);


require('express').Router().delete('/:id',
  jwtMiddleware,
  async (req, res, next) => {
    try {
      const playId = req.params.id;
      await PlayService.deletePlay(
        playId,
        req.user.id,
        req.user.role,
      );

      res.status(204).end();
    } catch (error) {
      next(error);
    }
  },
);

module.exports = require('express').Router();
