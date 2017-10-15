// import moxios from 'moxios';
// import thunk from 'redux-thunk';
// import configureMockStore from 'redux-mock-store';
// import expect from 'expect';
// import authActions from '../../actions/authActions';

// const middleware = [thunk];
// const mockStore = configureMockStore(middleware);

// describe('User Actions', () => {
//   beforeEach(() => moxios.install());
//   afterEach(() => moxios.uninstall());

//   describe('Signup Action', () => {
//     it('Should make a post request to sign up users', (done) => {
//       moxios.stubRequest('/api/v1/user/signup', {
//         status: 201,
//         response: {
//           message: 'Registration successful'
//         }
//       });
//       const store = mockStore({});

//       store.dispatch(UserActions.registerUser('akinoau', 'akin@gmail.com',
//         'nigeria123', '07045324156'))
//         .then(() => {
//           expect(store.getActions()).toEqual(expectedAction);
//         });
//       done();
//     });
//     it(
//       'Should dispatch appropraite action type if invalid username is supplied',
//       (done) => {
//         moxios.stubRequest('/api/v1/user/signup', {
//           status: 400,
//           response: {
//             message: 'Username should contain only letters'
//           }
//         });
//         const store = mockStore({});
//         const expectedAction = [
//           {
//             type: 'REGISTRATION_BEGINS'
//           },
//           {
//             type: 'REGISTRATION_UNSUCCESSFUL',
//             payload: {
//               message: 'Username should contain only letters'
//             }
//           }];
//         store.dispatch(UserActions.registerUser('akinoau43', 'akin@gmail.com',
//           'nigeria123', '97856432567'))
//           .then(() => {
//             expect(store.getActions()).toEqual(expectedAction);
//           });
//         done();
//       });
//     it('Should dispatch appropraite action type if an unexpected error occured',
//       (done) => {
//         moxios.stubRequest('/api/v1/user/signup', {
//           status: 500
//         });
//         const store = mockStore({});
//         const expectedAction = [
//           {
//             type: 'REGISTRATION_BEGINS'
//           },
//           {
//             type: 'REGISTRATION_REJECTED',
//           }];
//         store.dispatch(UserActions.registerUser('akinoau', 'akin@gmail.com',
//           'nigeria123', '97856432567'))
//           .then(() => {
//             expect(store.getActions()).toEqual(expectedAction);
//           });
//         done();
//       });
//   });
//   describe('Login Action', () => {
//     it('Should make a post request to sign in users', (done) => {
//       moxios.stubRequest('/api/v1/user/signin', {
//         status: 200,
//         response: {
//           message: 'You are now logged in',
//           user: {
//             id: 1,
//             user: 'akinoau',
//             email: 'akin@gmail.com',
//             token: 'something'
//           }
//         }
//       });
//       const store = mockStore({});
//       const expectedAction = [
//         {
//           type: 'LOGIN_BEGINS'
//         },
//         {
//           type: 'LOGIN_SUCCESSFUL',
//           payload:
//           {
//             message: 'You are now logged in',
//             user: {
//               id: 1,
//               user: 'akinoau',
//               email: 'akin@gmail.com',
//               token: 'something'
//             }
//           }
//         }];
//       store.dispatch(UserActions.loginUser('akinoau',
//         'nigeria123')).then(() => {
//         expect(store.getActions()).toEqual(expectedAction);
//       });
//       done();
//     });
//     it('Should dispatch appropraite action type if an invalid user tries to sign in',
//       (done) => {
//         moxios.stubRequest('/api/v1/user/signin', {
//           status: 400
//         });
//         const store = mockStore({});
//         const expectedAction = [
//           {
//             type: 'LOGIN_BEGINS'
//           },
//           {
//             type: 'LOGIN_UNSUCCESSFUL'
//           }];
//         store.dispatch(UserActions.loginUser('akinoau',
//           'nigeria123')).then(() => {
//           expect(store.getActions()).toEqual(expectedAction);
//         });
//         done();
//       });
//     it("Should dispatch appropraite action type if there's an unexpected error",
//       (done) => {
//         moxios.stubRequest('/api/v1/user/signin', {
//           status: 500
//         });
//         const store = mockStore({});
//         const expectedAction = [
//           {
//             type: 'LOGIN_BEGINS'
//           },
//           {
//             type: 'LOGIN_REJECTED'
//           }];
//         store.dispatch(UserActions.loginUser('akinoau',
//           'nigeria123')).then(() => {
//           expect(store.getActions()).toEqual(expectedAction);
//         });
//         done();
//       });
//   });
//   describe('getGroupMembers Action', () => {
//     it('Should make a get request to get members(users) in a group', (done) => {
//       moxios.stubRequest('/api/v1/group/12/users', {
//         status: 200,
//         response: {
//           users: [{
//             id: 1, username: 'noordean', email: 'ebroyeem90@gmail.com' }]
//         }
//       });
//       const store = mockStore({});
//       const expectedAction = [
//         {
//           type: 'GOT_MEMBERS',
//           payload: [{ id: 1,
//             username: 'noordean',
//             email: 'ebroyeem90@gmail.com' }]
//         }];
//       store.dispatch(UserActions.getGroupMembers(12)).then(() => {
//         expect(store.getActions()).toEqual(expectedAction);
//       });
//       done();
//     });
//     it(
//       'Should dispatch appropraite action type if there\'s an unexpected error',
//       (done) => {
//         moxios.stubRequest('/api/v1/group/12/users', {
//           status: 400,
//           response: { message: 'Couldnt get members' }
//         });
//         const store = mockStore({});
//         const expectedAction = [
//           {
//             type: 'GET_MEMBERS_FAILED',
//             payload: 'Couldnt get members'
//           }];
//         store.dispatch(UserActions.getGroupMembers(12)).then(() => {
//           expect(store.getActions()).toEqual(expectedAction);
//         });
//         done();
//       });
//   });
// });
