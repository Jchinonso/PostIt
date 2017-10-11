const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(8);
const hashedPassword = bcrypt.hashSync('poly12345', salt);

module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Users', [{
      username: 'johnDoe',
      password: hashedPassword,
      email: 'johnDoe@gmail.com',
      phoneNumber: '08139308818',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'emmanDoe',
      password: hashedPassword,
      email: 'emmaDow@gmail.com',
      phoneNumber: '08139308818',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  down(queryInterface) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
