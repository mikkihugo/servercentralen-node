const { v4: uuidv4 } = require('uuid');
const helper = require('../helper');

module.exports = {
  up: async (queryInterface) => {
    const password = await helper.encryptPassword('password');

    await queryInterface.bulkInsert('users', [{
      id: uuidv4(),
      email: 'admin@gmail.com',
      password,
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', [{
      email: 'admin@gmail.com',
    }]);
  },
};
