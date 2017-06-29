module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Groups', [
      {
        name: 'Lagos',
        description: 'talks about andela Nigeria',
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        name: 'Nairobi',
        description: 'talks about andela Kenya',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('Groups', null, {});
  }
};
