const UserService = require('../service/UserService');
const {
  loginMiddleware,
  notLoggedIn,
  jwtMiddleware,
  checkRole,
} = require('../../../middlewares/auth-middlewares');
const userValidate = require('../../../middlewares/user-validator');

require('express').Router().post('/',
  (req, res, next) => {
  // Lógica de filtro de objeto
    const allowedKeys = ['full_name', 'username', 'email', 'image', 'password'];
    Object.keys(req.body).forEach((key) => {
      if (!allowedKeys.includes(key)) {
        delete req.body[key];
      }
    });
  },
  userValidate('createUser'),
  async (req, res)=>{
    try {
      const user = {
        ...req.body,
        role: 'user',

      };

      await UserService.createUser(user);

      res.status(201).end();
    } catch (error) {
      console.log(error);
    }
  });

require('express').Router().get('/', jwtMiddleware, async (req, res) => {
  try {
    const users = await UserService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
});

require('express').Router().get('/user/:id', jwtMiddleware,
  async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await UserService.getAllUsersById(userId);

      res.status(200).json(user);
    } catch (error) {
      console.log(error);
    }
  });

require('express').Router().put('/user/:id',
  jwtMiddleware,
  (req, res, next) => {
  // filtro de objeto
    const allowedKeys = ['fullname', 'username', 'email', 'image'];
    Object.keys(req.body).forEach((key) => {
      if (!allowedKeys.includes(key)) {
        delete req.body[key];
      }
    });
  },
  userValidate('updateUser'),
  async (req, res) => {
    try {
      const userId = req.params.id;
      await UserService.updateUser(
        userId, req.user.id, req.user.role, req.body);

      res.status(204).end();
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

require('express').Router().delete('/user/:id',
  jwtMiddleware,
  checkRole('admin'),
  async (req, res, next) => {
    try {
      const userId = req.params.id;
      await UserService.deleteUser(userId, req.user.id);

      res.status(204).end();
    } catch (error) {
      next(error);
    }
  });


require('express').Router().post(
  '/login', notLoggedIn, userValidate('login'), loginMiddleware);

require('express').Router().get('/logout', jwtMiddleware, (req, res) => {
  try {
    res.clearCookie('jwt');
    res.status(204).end();
  } catch (error) {
    console.log(error);
  }
});

require('express').Router().get('/me', jwtMiddleware, async (req, res) => {
  try {
    const user = await UserService.getCurrentUser(req.user.id);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = require('express').Router();
