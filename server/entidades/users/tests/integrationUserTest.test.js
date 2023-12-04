// __tests__/userService.test.js
const superTest = require('supertest');
const app = require('../../../config/express-config');
const UserService = require('../service/UserService');
const request = superTest.agent(app);


describe('User Service Integration Tests', () => {
  let userId = 0;
  const admToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJyb2xlIjoiYWRtaW4ifSwiaWF0IjoxNzAxNjQ4NDc1LCJleHAiOjE3MDQyNDA0NzV9.ksbKOUMlEeTsuAKGkC0tIo4KW6nJAf8BHAaF6b8xg7o';

  test('should login successfully', async () => {
    const response = await request
      .post('/users/login')
      .send({email: 'adm@gmail.com', password: 'Adm123@'});

    expect(response.status).toBe(204);
    expect(response.headers).toHaveProperty('set-cookie');
  });

  test('should create a new user', async () => {
    const newUser = {
      full_name: 'John Doe',
      username: 'johndoexxx',
      email: 'john@example.com',
      password: 'Password123@',
      image: 'profile.jpg',
      role: 'user',
    };

    const response = await request
      .post('/users')
      .send(newUser);
    userId = response._body.user.id;
    expect(response.status).toBe(201);
  });


  // Teste para a função getAllUsers
  test('should get all users', async () => {
    const response = await request
      .get('/users');

    expect(response.status).toBe(200);
  });

  test('should edit an existing user', async () => {
    // Definir os dados para atualização
    const updatedUserData = {
      full_name: 'John Doe Jr',
      username: 'johndoejr',
      email: 'john@example.com',
      image: 'updatedprofile.com',
    };

    const response = await request
      .put(`/users/user/${userId}`)
      .send(updatedUserData);

    // Assegurar que o usuário foi editado com sucesso
    expect(response.status).toBe(200);


    // // Assegurar que os dados foram atualizados conforme esperado
    expect(response.body.username).toBe(updatedUserData.username);
    expect(response.body.email).toBe(updatedUserData.email);
    expect(response.body.image).toBe(updatedUserData.image);
  });

  test('deleteUser', async () => {
    const response = await request
      .delete(`/users/user/${userId}`);
    expect(response.statusCode).toBe(204);
  });


  // Add more tests for other UserService methods as needed
});
