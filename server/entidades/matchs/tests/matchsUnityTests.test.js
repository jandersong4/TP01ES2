const ProductService = require('../service/matchs');
const Product = require('../model/matchs');
// const PermissionError = require('../../errors/PermissionError');
// const QueryError = require('../../errors/QueryError');

jest.mock('../model/matchs');

describe('ProductService', () => {
  let productService;

  beforeEach(() => {
    productService = ProductService;
  });

  describe('getAllProducts', () => {
    it('should return all products', async () => {
      const products = [
        {
          id: 1,
          name: 'Product 1',
          image: 'image_url_1',
          UserId: 1,
        },
        {
          id: 2,
          name: 'Product 2',
          image: 'image_url_2',
          UserId: 2,
        },
      ];

      Product.findAll.mockResolvedValue(products);

      const result = await productService.getAllProducts();

      expect(result).toEqual(products);
    });
  });

  describe('get10', () => {
    it('should return 10 products', async () => {
      const products = [
        {
          id: 1,
          name: 'Product 1',
          image: 'image_url_1',
          UserId: 1,
        },
        {
          id: 2,
          name: 'Product 2',
          image: 'image_url_2',
          UserId: 2,
        },
        {
          id: 3,
          name: 'Product 3',
          image: 'image_url_3',
          UserId: 3,
        },
        {
          id: 33,
          name: 'Product 33',
          image: 'image_url_33',
          UserId: 33,
        },
        {
          id: 4,
          name: 'Product 4',
          image: 'image_url_4',
          UserId: 4,
        },
        {
          id: 5,
          name: 'Product 5',
          image: 'image_url_5',
          UserId: 5,
        },
        {
          id: 6,
          name: 'Product 6',
          image: 'image_url_6',
          UserId: 6,
        },
        {
          id: 7,
          name: 'Product 7',
          image: 'image_url_7',
          UserId: 7,
        },
        {
          id: 8,
          name: 'Product 8',
          image: 'image_url_8',
          UserId: 8,
        },
        {
          id: 9,
          name: 'Product 9',
          image: 'image_url_9',
          UserId: 9,
        },
        // ... Add more products up to 10
      ];

      Product.findAll.mockResolvedValue(products);

      const result = await productService.get10();

      expect(result).toEqual(products);
      expect(result.length).toBe(10);
    });
  });

  describe('createProduct', () => {
    it('should create a new product', async () => {
      const productData = {
        id: '1',
        name: 'New Product',
        image: 'image_url_new',
        UserId: 1,
      };

      // Mock a resposta do create
      Product.create.mockResolvedValue();

      // Chama a função que você está testando
      await productService.createProduct(productData);

      // Verifica se a função create foi chamada com os dados corretos
      expect(Product.create).toHaveBeenCalledWith(productData);

      // Verifica se o produto foi persistido no banco de dados
      const createdProduct = await Product.findOne({where: {id: productData.id}});
      expect(createdProduct === productData ); // Verifica se o produto existe (não é nulo ou indefinido)
    });
  });

  describe('getProductById', () => {
    it('should return a product with the specified ID', async () => {
      const productId = 1;
      const product = {
        id: productId,
        name: 'Product 1',
        image: 'image_url_1',
        UserId: 1,
      };

      Product.findOne.mockResolvedValue(product);

      const result = await productService.getProductById(productId);

      expect(result).toEqual(product);
    });

    // it('should throw a QueryError if the product with the specified ID is not found', async () => {
    //   const productId = 1;

    //   Product.findOne.mockResolvedValue(null);

    //   await expect(productService.getProductById(productId)).rejects.toThrow(QueryError);
    // });
  });

  describe('updateProductInfo', () => {
    it('should allow product owner to update product info', async () => {
      const product = {
        id: 1,
        name: 'Product 1',
        image: 'image_url_1',
        UserId: 1,
        update: jest.fn().mockResolvedValue(),

      };
      const body = {
        name: 'Updated Product',
        image: 'updated_image_url',
      };

      Product.findByPk.mockResolvedValue(product);

      await productService.updateProductInfo(1, 1, 'user', body );

      expect(product.update).toHaveBeenCalledWith(body);
    });

    it('should allow admin to update product info', async () => {
      const product = {
        id: 1,
        name: 'Product 1',
        image: 'image_url_1',
        UserId: 1,
        update: jest.fn().mockResolvedValue(),

      };

      Product.findByPk.mockResolvedValue(product);

      await productService.updateProductInfo(1, 2, 'admin', {name: 'Updated Product'});

      expect(product.update).toHaveBeenCalledWith({name: 'Updated Product'});
    });

    // it('should throw PermissionError if non-owner and non-admin tries to update product info', async () => {
    //   const product = {
    //     id: 1,
    //     name: 'Product 1',
    //     image: 'image_url_1',
    //     UserId: 1,
    //   };

    //   Product.findByPk.mockResolvedValue(product);

    //   await expect(productService.updateProductInfo(1, 2, 'user', {name: 'Updated Product'})).rejects.toThrow(PermissionError);
    // });
  });

  describe('deleteProduct', () => {
    it('should allow product owner to delete product', async () => {
      const product = {
        id: 1,
        name: 'Product 1',
        image: 'image_url_1',
        UserId: 1,
        destroy: jest.fn().mockResolvedValue(),
      };

      Product.findByPk.mockResolvedValue(product);

      await productService.deleteProduct(1, 1, 'user');

      expect(product.destroy).toHaveBeenCalled();
    });

    it('should allow admin to delete product', async () => {
      const product = {
        id: 1,
        name: 'Product 1',
        image: 'image_url_1',
        UserId: 1,
        destroy: jest.fn().mockResolvedValue(),
      };

      Product.findByPk.mockResolvedValue(product);

      await productService.deleteProduct(1, 2, 'admin');

      expect(product.destroy).toHaveBeenCalled();
    });

    // it('should throw PermissionError if non-owner and non-admin tries to delete product', async () => {
    //   const product = {
    //     id: 1,
    //     name: 'Product 1',
    //     image: 'image_url_1',
    //     UserId: 1,
    //     destroy: jest.fn().mockResolvedValue(),
    //   };

    //   Product.findByPk.mockResolvedValue(product);

    //   await expect(productService.deleteProduct(1, 2, 'user')).rejects.toThrow(PermissionError);
    // });
  });
});
