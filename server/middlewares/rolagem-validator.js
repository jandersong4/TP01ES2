const {body} = require('express-validator');
const validate = require('./validate');

function getValidations(method) {
  switch (method) {
  case 'createRolagem': {
    return [
      body('d4')
        .exists()
        .withMessage('Você deve enviar um dado para a partida!')
        .notEmpty()
        .withMessage('O dado da partida não pode ficar vazio!'),
      body('d6')
        .exists()
        .withMessage('Você deve enviar um dado para a partida!')
        .notEmpty()
        .withMessage('O dado da partida não pode ficar vazio!'),
      body('d8')
        .exists()
        .withMessage('Você deve enviar um dado para a partida!')
        .notEmpty()
        .withMessage('O dado da partida não pode ficar vazio!'),
      body('d10')
        .exists()
        .withMessage('Você deve enviar um dado para a partida!')
        .notEmpty()
        .withMessage('O dado da partida não pode ficar vazio!'),
      body('d12')
        .exists()
        .withMessage('Você deve enviar um dado para a partida!')
        .notEmpty()
        .withMessage('O dado da partida não pode ficar vazio!'),
      body('d20')
        .exists()
        .withMessage('Você deve enviar um dado para a partida!')
        .notEmpty()
        .withMessage('O dado da partida não pode ficar vazio!'),
      body('IdDoProduto')
        .exists()
        .withMessage('Você deve enviar um ProductId para a partida!')
        .notEmpty()
        .withMessage('O ProductId da partida não pode ficar vazio!'),
    ];
  };

//   case 'updateProduct': {
//     return [
//       body('name')
//         .optional()
//         .notEmpty()
//         .withMessage('O nome da partida não pode ficar vazio!'),
//       body('image')
//         .optional()
//         .isURL()
//         .withMessage('A imagem deve ser uma URL!'),
//     ];
//   }
  }
}


function rolagemValidate(method) {
  const validations = getValidations(method);
  return validate(validations);
}

module.exports = rolagemValidate;
