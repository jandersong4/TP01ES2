const Product = require('../model/matchs');
const PermissionError = require('../../../errors/PermissionError');
const QueryError = require('../../../errors/QueryError');

class ProductService {
  async getAllProducts() {
    const result = await Product.findAll();
    return result;
  }

  async get10() {
    const result = await Product.findAll({limit: 10});
    return result;
  }

  async createProduct(product) {
    await Product.create(product);
  }

  async getProductById(id) {
    const product = await Product.findOne({where: {id: id},
      include: {association: 'productUserData', attributes: ['username']},
    });


    if (!product) {
      throw new QueryError(`Não foi encontrado uma partida com ID ${id}`);
    }

    return product;
  }

  async updateProductInfo(id, reqUserId, reqUserRole, body) {
    const product = await Product.findByPk(id);
    if (!product) {
      throw new QueryError(`Não foi encontrado um produto com ID ${id}`);
    }

    const isAdmin = reqUserRole === 'admin';
    const isProductOwner = reqUserId === product.UserId;
    console.log(isAdmin, isProductOwner);
    if (!isAdmin && !isProductOwner) {
      throw new PermissionError(
        'Você não tem permissão para editar esse produto',
      );
    }

    await product.update(body);
  }

  async deleteProduct(id, reqUserId, reqUserRole) {
    const product = await Product.findByPk(id);
    if (!product) {
      throw new QueryError(`Não foi encontrado um produto com ID ${id}`);
    }

    const isAdmin = reqUserRole === 'admin';
    const isProductOwner = reqUserId == product.UserId;

    if (!isAdmin && !isProductOwner) {
      throw new PermissionError(
        'Você não tem permissão para deletar esse produto',
      );
    }
    // o certo é destroy ou delete????
    await product.destroy();
  }
}

module.exports = new ProductService;
