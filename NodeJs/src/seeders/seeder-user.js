'use strict';

module.exports = {
  // firstName: DataTypes.STRING,
  // lastName: DataTypes.STRING,
  // email: DataTypes.STRING,
  // password: DataTypes.STRING,
  // address: DataTypes.STRING,
  // gender: DataTypes.BOOLEAN,
  // typeRole: DataTypes.STRING,
  // keyRole: DataTypes.STRING
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'Lam',
      lastName: 'Sang',
      email: 'nguyenlamsang2004@gmail.com',
      password: '123456',
      address: 'Quan 2 Ho Chi Minh City',
      gender: 1,
      typeRole: 'ROLE',
      keyRole: 'R1',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
