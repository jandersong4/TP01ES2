const sequelize = require('../../../database');
const {DataTypes} = require('sequelize');
const Rodada = require('../../rodadas/model/Rodada');

const Product = sequelize.define('Products', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  UserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {model: 'User', key: 'id'},
  },
  // mestre_id,
});

// Product.hasMany(Rodada, {
//   onDelete: 'cascade',
// });

// Rodada.belongsTo(Product);

// Rodada.sync({alter: false, force: false})
//   .then(() => console.log('A tabela Rodadas foi (re)criada'))
//   .catch((error) => console.log(error));


// Product.sync({alter: false, force: false})
//   .then(() => console.log('A tabela Products foi (re)criada'))
//   .catch((error) => console.log(error));

module.exports = Product;
