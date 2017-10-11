module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Groups', [{
      name: 'Lagos-all',
      description: 'Talks about tech in Lagos',
      creator: 'jchinonso',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Kenya-Fellows',
      description: 'Talks about tech in Kenya',
      creator: 'jchinonso',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  down(queryInterface) {
    return queryInterface.bulkDelete('Groups', null, {});
  }
};
