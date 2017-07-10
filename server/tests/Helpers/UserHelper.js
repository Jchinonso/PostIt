import faker from 'faker';

module.exports = {
  goodUser: {
    username: 'johnny19',
	  email: 'chinonso@example.com',
    password: 'abacus3456',
  },
  anotherUser: {
    username: 'jdoe',
	  email: 'jdoe@example.com',
    password: 'abacus3456',
  },
  anotherUserTwo: {
    username: 'jdoe',
	  email: 'mkdoe@example.com',
    password: 'abacus3456',
  },
  userDoesntExist: {
    username: 'mkdim',
	  email: 'mkdim@example.com',
    password: 'abacus3456',
  },

  badUser1: {
    username: 'tayo19',
	  email: 'tayo12@example.com',
  },
  badUser2: {
    username: 'tayo192',
	  email: 'tayo12'
  },
  userName: {
    username: 'jdoe'
  }

};
