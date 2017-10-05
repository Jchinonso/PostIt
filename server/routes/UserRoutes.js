import UsersController from '../controllers/UserController';
import Auth from '../middleware/Auth';

const UserRoutes = (router) => {
  router.route('/user')
    .get(UsersController.fetchUsers);

  router.route('/user/signup')
    .post(UsersController.signUp);

  router.route('/user/signin')
    .post(UsersController.signIn);

  router.route('/user/signOut')
    .post(UsersController.signOut);

  router.route('/user/googleLogin')
    .post(UsersController.googleSignIn);

  router.route('/user/forgotPassword')
    .post(UsersController.forgotPassword);

  router.route('/user/resetPassword')
    .post(UsersController.resetPassword);
};

export default UserRoutes;
