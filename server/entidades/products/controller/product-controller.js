const {jwtMiddleware} = require('../../../middlewares/auth-middlewares');
const productValidate = require('../../../middlewares/product-validator');
const ProductService = require('../service/ProductService');

// CRUD: Create, Read, Update, Delete

require('express').Router().get('/', jwtMiddleware,
  async (req, res, next) =>{
    try {
      const products = await ProductService.getAllProducts();
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  },
);

require('express').Router().get('/ler10', jwtMiddleware,
  async (req, res, next) =>{
    try {
      const products = await ProductService.get10();
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  },
);

require('express').Router().post('/',
  jwtMiddleware,
  (req, res, next) => {
    // Lógica de filtro
    const allowedKeys = ['name', 'image'];
    Object.keys(req.body).forEach((key) => {
      if (!allowedKeys.includes(key)) {
        delete req.body[key];
      }
    });
  },
  productValidate('createProduct'),
  async (req, res, next) => {
    try {
      const product = {
        ...req.body,
        UserId: req.user.id,
      };

      await ProductService.createProduct(product);
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
      const product = await ProductService.getProductById(req.params.id);

      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  },
);

require('express').Router().put('/:id',
  jwtMiddleware,
  (req, res, next) => {
    // Lógica de filtro
    const allowedKeys = ['name', 'image'];
    Object.keys(req.body).forEach((key) => {
      if (!allowedKeys.includes(key)) {
        delete req.body[key];
      }
    });
  },
  productValidate('updateProduct'),
  async (req, res, next) =>{
    try {
      const productId = req.params.id;
      await ProductService.updateProductInfo(
        productId,
        req.user.id,
        req.user.role,
        req.body,
      );

      res.status(204).end();
    } catch (error) {
      next(error);
    }
  },
);

require('express').Router().delete('/:id',
  jwtMiddleware,
  async (req, res, next) => {
    try {
      const productId = req.params.id;
      await ProductService.deleteProduct(
        productId,
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
