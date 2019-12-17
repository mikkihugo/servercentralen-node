const uuidv4 = require('uuid/v4');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('users', [{
      id: uuidv4(),
      email: 'admin@gmail.com',
      password: 'password',
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
