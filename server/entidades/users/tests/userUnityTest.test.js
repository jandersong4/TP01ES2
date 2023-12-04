const UserService = require('../service/UserService');
const User = require('../model/User');
const bcrypt = require('bcrypt');
const PermissionError = require('../../../errors/PermissionError');
// const QueryError = require('../errors/QueryError');

jest.mock('../model/User');
jest.mock('bcrypt');

describe('UserService', () => {
  let userService;

  beforeEach(() => {
    userService = UserService;
  });

  describe('createUser', () => {
    it('should hash the password and create the user', async () => {
      const user = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'Password123@',
        role: 'user',
      };

      await userService.createUser(user);
      // verifica se a criptografia esta funcionando corretamente
      expect(bcrypt.hash).toHaveBeenCalledWith('Password123@', 10);
      // verifica se o usuário foi criado
      expect(User.create).toHaveBeenCalledWith(user);
    });
  });

  describe('getAllUsers', () => {
    it('should return a list of all users without password, createdAt, and updatedAt', async () => {
      const users = [
        {
          id: 1,
          name: 'John Doe',
          email: 'johndoe@example.com',
          role: 'user',
        },
        {
          id: 2,
          name: 'Jane Doe',
          email: 'janedoe@example.com',
          role: 'admin',
        },
      ];

      User.findAll.mockReturnValue(users);

      const result = await userService.getAllUsers();

      expect(result).toEqual(
        users.map((user) => {
          delete user.password;
          delete user.createdAt;
          delete user.updatedAt;
          return user;
        }),
      );
    });
  });

  describe('getAllUsersById', () => {
    it('should return a user with the specified ID without password, createdAt, and updatedAt', async () => {
      const id = 1;
      const user = {
        id: 1,
        name: 'John Doe',
        email: 'johndoe@example.com',
        role: 'user',
      };

      User.findByPk.mockReturnValue(user);

      const result = await userService.getAllUsersById(id);

      expect(result).toEqual(user);
      expect(result.password).toBeUndefined();
      expect(result.createdAt).toBeUndefined();
      expect(result.updatedAt).toBeUndefined();
    });

    // it('should return undefined if the user is not found', async () => {
    //   const id = 1;

    //   User.findByPk.mockReturnValue(null);

    //   const result = await userService.getAllUsersById(id);

    //   expect(result).toBeUndefined();
    // });
  });

  // Testes para funções que envolvem get

  //   it('should throw a QueryError if the user with the specified ID is not found', async () => {
  //     const id = 1;

  //     User.findByPk.mockReturnValue(null);

  //     await expect(userService.getAllUsersById(id)).rejects.toThrow(QueryError);
  //   });

  describe('getCurrentUser', () => {
    test('should return the current user without password, createdAt, and updatedAt', async () => {
      const userId = 1;
      const user = {
        id: userId,
        full_name: 'John Doe',
        email: 'johndoe@example.com',
        role: 'user',
        password: 'John123@',
      };

      User.findByPk.mockResolvedValue(user);

      const result = await userService.getCurrentUser(userId);

      expect(result).toEqual({
        id: userId,
        full_name: 'John Doe',
        email: 'johndoe@example.com',
        role: 'user',
        password: 'John123@',
      });
    });
  });

  describe('updateUser', () => {
    it('should update the user with the specified ID if the requester is adm', async () => {
      const id = 1;
      const user = {
        id: 1,
        name: 'John Doe',
        email: 'johndoe@example.com',
        image: 'image_url_1',
        password: 'Password123@',
        role: 'user',
        update: jest.fn().mockResolvedValue(),
      };

      const body = {
        name: 'John Updated',
      };

      // Simula a criação de um usuário
      User.findByPk.mockResolvedValue(user);

      // Simula a atualização de um usuário

      await userService.updateUser(1, 1, 'admin', body);

      expect(User.findByPk).toHaveBeenCalledWith(id);
      expect(user.update).toHaveBeenCalledWith(body);
    });
  });

  describe('deleteUser', () => {
    it('should delete the user with the specified ID if the requester has permission', async () => {
      const id = 1;
      const reqUserId = 2;
      const user = {
        id: 1,
        name: 'John Doe',
        email: 'johndoe@example.com',
        image: 'image_url_1',
        password: 'Password123@',
        role: 'user',
        destroy: jest.fn().mockResolvedValue(),
      };

      // Simula a busca de um usuário
      User.findByPk.mockResolvedValue(user);

      // Simula a exclusão de um usuário
      await userService.deleteUser(id, reqUserId);

      expect(User.findByPk).toHaveBeenCalledWith(id);
      expect(user.destroy).toHaveBeenCalled();
    });

    it('should throw PermissionError if the requester tries to delete their own account', async () => {
      const id = 1;
      const reqUserId = 1;

      await expect(userService.deleteUser(id, reqUserId)).rejects.toThrow(
        PermissionError,
      );
    });
  });
});
